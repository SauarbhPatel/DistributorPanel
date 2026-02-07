import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";
import {
    __getAttributeSetList,
    __getHsnCodeList,
} from "../../utils/api/commonApi";

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
        updateState({ loading: true });

        __patchApiData("/api/categories/updateCategoryById/" + item?._id, {
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

    useEffect(() => {
        if (isEdit) {
            console.log(item);
            updateState({
                // categoryName: item?.name,
                // values: item?.allowedValues,
                // isActive: item?.status,
                metaTitle: item?.name,
                metaDescription: item?.name,
                categoryName: item?.name,
                code: item?.name,
                hsnsetId: item?.name,
                attributeSetId: item?.name,
                displayOrder: String(item?.displayOrder) || "1",
                isActive: item?.isActive || false,
            });
        }
    }, [isEdit, item]);

    const __handleGetData = async () => {
        try {
            const code = await __getHsnCodeList(true);
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
                    <Text style={hintText}>HSN Code & Attribute Set</Text>
                    <DropDownTextAreaBox
                        type="select"
                        title={"HSN Code (includes Tax)"}
                        placeholder={"Select HSN Code (includes Tax)"}
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
                    />
                    <DropDownTextAreaBox
                        type="select"
                        title={"Attribute Set"}
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
                        placeholder="e.g., color"
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
                        placeholder="e.g., color"
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
