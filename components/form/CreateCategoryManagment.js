import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";
import {
    __getAttributeSetList,
    __getHsnCodeList,
    __getHsnSetList,
} from "../../utils/api/commonApi";
import SingleSelectTab from "../common/SingleSelectTab";

const CreateCategoryManagment = ({
    onClose = () => {},
    isEdit = false,
    item = null,
    parentId = null,
}) => {
    const [state, setState] = useState({
        metaTitle: "",
        metaDescription: "",
        categoryName: "",
        code: "",
        hsnsetId: null,
        attributeSetId: null,
        displayOrder: "1",
        isActive: true,
        status: true,
        loading: false,
        //
        hsnCodeList: [],
        attributeList: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        loading,
        metaTitle,
        metaDescription,
        categoryName,
        code,
        displayOrder,
        isActive,
        hsnsetId,
        attributeSetId,
        status,
        //
        hsnCodeList,
        attributeList,
    } = state;

    const validateForm = () => {
        if (!categoryName?.trim()) {
            Alert.alert("Validation Error", "category name is required");
            return false;
        }
        if (!code?.trim()) {
            Alert.alert("Validation Error", "code is required");
            return false;
        }
        if (!attributeSetId) {
            Alert.alert("Validation Error", "attribute set is required");
            return false;
        }
        if (!hsnsetId) {
            Alert.alert("Validation Error", "HSN code is required");
            return false;
        }

        if (categoryName?.trim().length < 2) {
            Alert.alert(
                "Validation Error",
                "category name must be at least 2 characters",
            );
            return false;
        }

        return true;
    };

    const __handleSave = () => {
        if (!validateForm()) return;
        updateState({ loading: true });
        console.log({
            name: categoryName,
            code,
            parentId: parentId,
            displayOrder: Number(displayOrder),
            enabled: isActive,
            isActive: isActive,
            metaTitle: metaTitle,
            metaDescription: metaDescription,
            hsnsetId: hsnsetId?.id || null,
            attributeSetId: attributeSetId?.id || null,
        });

        __postApiData("/categories/createCategory", {
            name: categoryName,
            code,
            parentId: parentId,
            displayOrder: Number(displayOrder),
            enabled: isActive,
            isActive: isActive,
            metaTitle: metaTitle,
            metaDescription: metaDescription,
            hsnsetId: hsnsetId?.id || null,
            attributeSetId: attributeSetId?.id || null,
        })
            .then((res) => {
                console.log(JSON.stringify(res));
                if (res?.success) {
                    // setError(res.message);
                    Alert.alert("", res.message);
                    onClose();
                } else {
                    Alert.alert("", res.message);
                }
                updateState({ loading: false });
            })
            .catch((error) => {
                Alert.alert("", "Failed");
                updateState({ loading: false });
            });
    };

    const __handleEditSave = () => {
        if (!validateForm()) return;
        try {
            updateState({ loading: true });

            __patchApiData("/categories/updateCategoryById/" + item?._id, {
                name: categoryName,
                code,
                displayOrder: Number(displayOrder),
                enabled: isActive,
                isActive: isActive,
                metaTitle: metaTitle,
                metaDescription: metaDescription,
                hsnsetId: hsnsetId?.id || null,
                attributeSetId: attributeSetId?.id || null,
            })
                .then((res) => {
                    console.log(JSON.stringify(res));
                    if (res?.success) {
                        // setError(res.message);
                        Alert.alert("", res.message);
                        onClose();
                    } else {
                        Alert.alert("", res.message);
                    }
                    updateState({ loading: false });
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert("", "Failed");
                    updateState({ loading: false });
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isEdit) {
            console.log(item);
            updateState({
                categoryName: item?.name,
                code: item?.code,
                metaTitle: item?.metaTitle,
                metaDescription: item?.metaDescription,
                hsnsetId: item?.hsnsetId
                    ? { id: item?.hsnsetId, name: item?.hsnSetName }
                    : null,
                attributeSetId: item?.attributeSetId
                    ? { id: item?.attributeSetId, name: item?.attributeSetName }
                    : null,
                displayOrder: String(item?.displayOrder) || "1",
                isActive: item?.isActive || false,
            });
        }
    }, [isEdit, item]);

    const __handleGetData = async () => {
        try {
            const code = await __getHsnSetList(true);
            const attra = await __getAttributeSetList(true);
            updateState({ hsnCodeList: code, attributeList: attra });
        } catch (error) {}
    };

    useEffect(() => {
        __handleGetData();
    }, []);

    return (
        <>
            <Loader isShow={loading} />

            <View
                style={{
                    paddingBottom: 100,
                    backgroundColor: Colors.whiteColor,
                    paddingHorizontal: 12,
                    paddingTop: 10,
                    gap: 12,
                }}
            >
                <View
                    style={{
                        ...inputStyle,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={hintText}>Basic Information</Text>

                    <View style={{}}>
                        <TextAreaBox
                            title="Category Name"
                            placeholder="e.g., Electronics, Fashion"
                            required
                            value={categoryName}
                            valuekey="categoryName"
                            onChangeText={updateState}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                        />
                        <TextAreaBox
                            title="Code"
                            placeholder=""
                            required
                            value={code}
                            valuekey="code"
                            onChangeText={updateState}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                        />

                        <TextAreaBox
                            title="Display Order"
                            placeholder=""
                            value={displayOrder}
                            valuekey="displayOrder"
                            onChangeText={updateState}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                            keyboardType="numeric"
                        />
                    </View>
                    {/* Active Status */}
                    <View style={styles.statusBox}>
                        <View>
                            <Text style={Fonts.blackColor15Medium}>
                                Enabled
                            </Text>
                            <Text
                                style={{
                                    ...Fonts.grayColor14Medium,
                                    fontSize: 10,
                                }}
                            >
                                Category is visible to customers
                            </Text>
                        </View>
                        <Switch
                            value={isActive}
                            onValueChange={(value) =>
                                updateState({ isActive: value })
                            }
                            trackColor={{
                                false: "#ccc",
                                true: Colors.primaryColor,
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        ...inputStyle,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={hintText}>HSN Set & Attribute Set</Text>
                    <DropDownTextAreaBox
                        type="select"
                        title={"HSN Set"}
                        placeholder={"Select HSN Set"}
                        required
                        list={hsnCodeList}
                        value={hsnsetId}
                        isSearchable
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        onSelected={(value) => {
                            updateState({
                                hsnsetId: value,
                            });
                        }}
                        editable={!isEdit}
                    />
                    <DropDownTextAreaBox
                        type="select"
                        title={"Attribute Set"}
                        required
                        placeholder={"Select Attribute Set"}
                        list={attributeList}
                        value={attributeSetId}
                        isSearchable
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        onSelected={(value) => {
                            updateState({
                                attributeSetId: value,
                            });
                        }}
                        editable={!isEdit}
                    />
                </View>
                <View
                    style={{
                        ...inputStyle,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        paddingBottom: 10,
                    }}
                >
                    <Text style={hintText}>SEO Settings</Text>

                    <TextAreaBox
                        title="Meta Title"
                        placeholder="SEO title for search engines"
                        value={metaTitle}
                        valuekey="metaTitle"
                        onChangeText={updateState}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        customStyle={{ flex: 1 }}
                    />
                    <TextAreaBox
                        title="Meta Description"
                        placeholder="Brief summary for search results"
                        value={metaDescription}
                        valuekey="metaDescription"
                        onChangeText={updateState}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        customStyle={{ flex: 1 }}
                    />
                </View>

                {/* Action Buttons */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={onClose}
                    >
                        <Text style={Fonts.blackColor14Medium}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.createBtn}
                        onPress={() =>
                            isEdit ? __handleEditSave() : __handleSave()
                        }
                    >
                        <Text style={styles.createText}>
                            {isEdit ? "Update" : "Create"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default CreateCategoryManagment;
const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};

const labelStyle = {
    ...Fonts.blackColor14Medium,
};

const hintText = {
    ...Fonts.grayColor11Regular,
};

const styles = {
    chip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },
    chipText: {
        fontSize: 12,
    },

    statusBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginTop: 10,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
        marginTop: 20,
    },

    cancelBtn: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },

    createBtn: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 8,
    },

    createText: {
        color: Colors.whiteColor,
        ...Fonts.blackColor14Bold,
    },
};
