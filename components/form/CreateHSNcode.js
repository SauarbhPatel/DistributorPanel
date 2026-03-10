import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";
import { __getCountryList, __getTaxList } from "../../utils/api/commonApi";

const CreateHSNcode = ({ onClose = () => {}, isEdit = false, item = null }) => {
    const [state, setState] = useState({
        isLoading: false,
        isActive: true,
        country: null,
        description: "",
        code: "",
        productType: "",
        //
        countryList: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        isLoading,
        name,
        country,
        values,
        description,
        code,
        isActive,
        productType,
        //
        countryList,
    } = state;

    const validateForm = () => {
        if (!code?.trim()) {
            Alert.alert("Validation Error", "HSN / SAC Code is required");
            return false;
        }
        console.log(code.length);
        if (code.length < 3) {
            Alert.alert(
                "Validation Error",
                "Code must be longer than or equal to 4 characters",
            );
            return false;
        }

        if (!country) {
            Alert.alert("Validation Error", "Please select Tax Slab");
            return false;
        }
        if (!productType.trim()) {
            Alert.alert("Validation Error", "Product Type is required");
            return false;
        }
        if (!description.trim()) {
            Alert.alert("Validation Error", "Description is required");
            return false;
        }

        return true;
    };

    const __handleSave = () => {
        if (!validateForm()) return;
        try {
            const payload = {
                code: code,
                description: description,
                taxRate: country?.rate || null,
                TaxSlabId: country?.id,
                productType: productType,
                isActive: isActive,
            };
            console.log(payload);
            updateState({ isLoading: true });

            __postApiData("/hsnCodes/createHsnCode", payload)
                .then((res) => {
                    if (res?.success) {
                        Alert.alert("Success", res.message);
                        onClose();
                    } else {
                        Alert.alert("Error", res?.message || "Failed");
                    }
                    updateState({ isLoading: false });
                })
                .catch(() => {
                    Alert.alert("Error", "Something went wrong");
                    updateState({ isLoading: false });
                });
        } catch (error) {
            updateState({ isLoading: false });
        }
    };

    const __handleEditSave = () => {
        if (!validateForm()) return;
        updateState({ isLoading: true });
        __patchApiData("/hsnCodes/updateHsnCodeById/" + item?._id, {
            code: code,
            description: description,
            taxRate: country?.rate || null,
            TaxSlabId: country?.id,
            productType: productType,
            isActive: isActive,
        })
            .then((res) => {
                console.log(JSON.stringify(res));
                updateState({ isLoading: false });

                if (res?.success) {
                    // setError(res.message);
                    Alert.alert("", res.message);
                    onClose();
                } else {
                    Alert.alert("", res.message);
                }
            })
            .catch((error) => {
                Alert.alert("", "Failed");
                updateState({ isLoading: false });
            });
    };

    useEffect(() => {
        if (isEdit) {
            updateState({
                code: item?.code,
                description: item?.description,
                country: item?.TaxSlabId
                    ? {
                          ...item?.TaxSlabId,
                          name: item?.TaxSlabId?.rate + "%",
                          id: item?.TaxSlabId?._id,
                      }
                    : null,
                isActive: item?.isActive,
                productType: item?.productType,
            });
        }
    }, [isEdit, item]);

    const __handleGetData = async () => {
        try {
            const country = await __getTaxList();
            updateState({ countryList: country });
        } catch (error) {}
    };

    useEffect(() => {
        __handleGetData();
    }, []);

    return (
        <>
            <Loader isShow={isLoading} />
            <View
                style={{
                    paddingBottom: 100,
                    backgroundColor: Colors.whiteColor,
                    paddingHorizontal: 12,
                    paddingTop: 10,
                    gap: 12,
                }}
            >
                <View>
                    <View style={{}}>
                        <TextAreaBox
                            title="HSN / SAC Code"
                            placeholder="e.g., 8517"
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
                            keyboardType="number-pad"
                        />
                    </View>
                    <TextAreaBox
                        title="Description"
                        required
                        placeholder="e.g. Telecommunication equipment"
                        value={description}
                        valuekey="description"
                        onChangeText={updateState}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={{
                            ...inputStyle,
                            height: 100,
                            textAlignVertical: "top",
                        }}
                        customInputProps={{
                            textAlignVertical: "top",
                            multiline: true,
                            numberOfLines: 6,
                        }}
                        customStyle={{ flex: 1 }}
                    />
                    <DropDownTextAreaBox
                        type="select"
                        required
                        title={"Default Tax Slab"}
                        placeholder={"Select Tax Slab"}
                        list={countryList}
                        value={country}
                        isSearchable
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        onSelected={(value) => {
                            updateState({
                                country: value,
                            });
                        }}
                        customStyle={{ marginBottom: 5, flex: 1 }}
                    />
                    <TextAreaBox
                        required
                        title="Product Type"
                        placeholder="Enter Product Type"
                        value={productType}
                        valuekey="productType"
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
                    <Text style={Fonts.blackColor15Medium}>Active</Text>
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
                        <Text style={styles.createText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default CreateHSNcode;
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
