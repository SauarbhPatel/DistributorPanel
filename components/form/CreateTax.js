import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";
import {
    __getTaxJurisdictionsList,
    __getTaxTypeList,
} from "../../utils/api/commonApi";
import { __formatDate, __formatDate2 } from "../../utils/funtion";
import { FontAwesome6 } from "@expo/vector-icons";

const CreateTax = ({ onClose = () => {}, isEdit = false, item = null }) => {
    const [state, setState] = useState({
        isLoading: false,
        name: "",
        code: "",
        rate: "",
        effectiveFrom: null,
        taxTypeId: null,
        effectiveUpTo: null,
        description: "",
        isActive: true,
        //
        taxTypeList: [],
        taxJurisdictionsList: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        isLoading,
        name,
        code,
        rate,
        effectiveFrom,
        taxTypeId,
        effectiveUpTo,
        description,
        isActive,
        //
        taxTypeList,
        taxJurisdictionsList,
    } = state;

    const validateForm = () => {
        if (!name?.trim()) {
            Alert.alert("Validation Error", "Tax name is required");
            return false;
        }

        if (name.trim().length < 2) {
            Alert.alert(
                "Validation Error",
                "Tax name must be at least 2 characters",
            );
            return false;
        }

        if (!rate?.trim()) {
            Alert.alert("Validation Error", "Rate(%) is required");
            return false;
        }

        if (!effectiveFrom) {
            Alert.alert("Validation Error", "Please select Effective From");
            return false;
        }
        if (!effectiveUpTo) {
            Alert.alert("Validation Error", "Please select Effective UpTo");
            return false;
        }

        if (!taxTypeId) {
            Alert.alert("Validation Error", "Please select tax type");
            return false;
        }
        if (!description?.trim()) {
            Alert.alert("Validation Error", "description should not be empty");
            return false;
        }

        return true;
    };

    const __handleSave = () => {
        if (!validateForm()) return;
        try {
            updateState({ isLoading: true });

            const payload = {
                name: name.trim(),
                code: code.trim(),
                rate: Number(rate.trim()),
                taxTypeId: taxTypeId?.id,
                taxTypeName: taxTypeId?.name,
                effectiveFrom: new Date(effectiveFrom),
                ...(effectiveUpTo && {
                    effectiveUpTo: new Date(effectiveUpTo),
                }),
                description: description,
                isActive: isActive,
            };

            __postApiData("/taxes/createTaxSlab", payload)
                .then((res) => {
                    if (res?.success) {
                        Alert.alert("Success", res.message);
                        onClose();
                    } else {
                        Alert.alert("Error", res?.message || "Failed");
                    }
                })
                .catch(() => {
                    Alert.alert("Error", "Something went wrong");
                });
        } catch (error) {}
    };

    const __handleEditSave = () => {
        if (!validateForm()) return;
        updateState({ isLoading: true });

        __patchApiData("/taxes/updateTaxSlabById/" + item?._id, {
            name: name.trim(),
            code: code.trim(),
            rate: Number(rate.trim()),
            taxTypeId: taxTypeId?.id,
            taxTypeName: taxTypeId?.name,
            effectiveFrom: new Date(effectiveFrom),
            ...(effectiveUpTo && {
                effectiveUpTo: new Date(effectiveUpTo),
            }),
            description: description,
            isActive: isActive,
        })
            .then((res) => {
                console.log(JSON.stringify(res));
                updateState({ isLoading: false });

                if (res?.success) {
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
                name: item?.name,
                code: item?.code,
                rate: String(item?.rate),
                effectiveFrom: item?.effectiveFrom,
                effectiveUpTo: item?.effectiveUpTo || null,
                taxTypeId: item?.taxTypeId
                    ? {
                          ...item?.taxTypeId,
                          id: item?.taxTypeId?._id,
                      }
                    : null,
                description: item?.description,
                isActive: item?.isActive,
            });
        }
    }, [isEdit, item]);

    const __handleGetData = async () => {
        try {
            const taxType = await __getTaxTypeList();
            updateState({
                taxTypeList: taxType,
            });
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
                    <TextAreaBox
                        title="Tax Name"
                        placeholder="e.g., GST 18%, UAE VAT"
                        required
                        value={name}
                        valuekey="name"
                        onChangeText={updateState}
                        titleCustomStyle={{ marginHorizontal: 0 }}
                        inputCustomStyle={inputStyle}
                        customStyle={{ flex: 1 }}
                    />

                    <TextAreaBox
                        title="Code"
                        placeholder="Enter Code"
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
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <DropDownTextAreaBox
                            type="select"
                            title={"Tax Type"}
                            placeholder={"Select Type"}
                            list={taxTypeList}
                            value={taxTypeId}
                            isSearchable
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            onSelected={(value) => {
                                updateState({
                                    taxTypeId: value,
                                });
                            }}
                            customStyle={{ marginBottom: 5, flex: 1 }}
                        />
                        <TextAreaBox
                            title="Rate (%)"
                            placeholder="0"
                            value={rate}
                            valuekey="rate"
                            onChangeText={updateState}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                            rightIcon={<Text>%</Text>}
                            keyboardType="number-pad"
                        />
                    </View>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <DropDownTextAreaBox
                            type="date"
                            title={"Effective From"}
                            required
                            placeholder={"Pick Date"}
                            value={
                                effectiveFrom
                                    ? __formatDate2(effectiveFrom)
                                    : null
                            }
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            onSelected={(value) => {
                                updateState({
                                    effectiveFrom: value,
                                });
                            }}
                            customStyle={{ marginBottom: 5, flex: 1 }}
                            rightIcon={
                                <FontAwesome6
                                    name="calendar-days"
                                    size={20}
                                    color={Colors.lightGrayColor}
                                />
                            }
                        />
                        <DropDownTextAreaBox
                            type="date"
                            title={"Effective To (optional)"}
                            placeholder={"Pick Date"}
                            required
                            value={
                                effectiveUpTo
                                    ? __formatDate2(effectiveUpTo)
                                    : null
                            }
                            isSearchable
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            onSelected={(value) => {
                                updateState({
                                    effectiveUpTo: value,
                                });
                            }}
                            customStyle={{ marginBottom: 5, flex: 1 }}
                            rightIcon={
                                <FontAwesome6
                                    name="calendar-days"
                                    size={20}
                                    color={Colors.lightGrayColor}
                                />
                            }
                        />
                    </View>
                </View>

                <TextAreaBox
                    title="Description"
                    placeholder="e.g. Standard rate (electronics)"
                    required
                    value={description}
                    valuekey="description"
                    onChangeText={updateState}
                    titleCustomStyle={{ marginHorizontal: 0, marginTop: 0 }}
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
                />

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
                        <Text style={styles.createText}>
                            {isEdit ? "Update" : "Create"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default CreateTax;
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
