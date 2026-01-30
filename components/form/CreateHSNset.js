import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import BottomPopup from "../common/BottomPopup";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";
import { __getCountryList, __getHsnCodeList } from "../../utils/api/commonApi";

const CreateHSNset = ({ onClose = () => {}, isEdit = false, item = null }) => {
    const [state, setState] = useState({
        isLoading: false,
        country: [],
        description: "",
        code: "",
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
        //
        countryList,
    } = state;

    const validateForm = () => {
        if (!code?.trim()) {
            Alert.alert("Validation Error", "Tax code is required");
            return false;
        }

        if (country?.length == 0) {
            Alert.alert("Validation Error", "Please select HSN codes");
            return false;
        }

        return true;
    };

    const __handleSave = () => {
        if (!validateForm()) return;
        try {
            const payload = {
                name: code,
                description: description,
                hsnCodes: country?.map((hsn) => hsn?.id),
            };
            updateState({ isLoading: true });

            __postApiData("/hsnSets/createHsnSet", payload)
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
        } catch (error) {}
    };

    const __handleEditSave = () => {
        if (!validateForm()) return;
        updateState({ isLoading: true });
        __patchApiData("/hsnSets/updateHsnSetById/" + item?._id, {
            name: code,
            description: description,
            hsnCodes: country?.map((hsn) => hsn?.id),
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
                country: item?.hsnCodes?.map((hsn) => ({
                    ...item,
                    id: hsn?._id,
                    name: hsn?.code,
                })),
                description: item?.description,
                code: item?.name,
            });
        }
    }, [isEdit, item]);

    const __handleGetData = async () => {
        try {
            const country = await __getHsnCodeList();
            console.log("country", country);
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
                            title="HSN Set Name"
                            placeholder="Electronics HSN Set"
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
                        <DropDownTextAreaBox
                            type="select_multi"
                            title={"HSN Codes"}
                            placeholder={"Select GST Rate (%)"}
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
                            customStyle={{
                                marginBottom: 5,
                                flex: 1,
                            }}
                        />
                    </View>
                    <TextAreaBox
                        title="Description"
                        placeholder="HSN set for electronics"
                        value={description}
                        valuekey="description"
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

export default CreateHSNset;
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
