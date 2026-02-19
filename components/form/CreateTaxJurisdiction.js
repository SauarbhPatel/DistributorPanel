import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";
import { __getCountryList, __getTaxList } from "../../utils/api/commonApi";

const CreateTaxJurisdiction = ({
    onClose = () => {},
    isEdit = false,
    item = null,
    parentId = null,
}) => {
    const [state, setState] = useState({
        isLoading: false,
        country: null,
        jurisdictionsName: "",
        code: "",
        isActive: true,

        //
        countryList: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const { isLoading, country, jurisdictionsName, code, isActive } = state;

    const validateForm = () => {
        if (!code?.trim()) {
            Alert.alert("Validation Error", "Tax code is required");
            return false;
        }

        if (!country) {
            Alert.alert("Validation Error", "Please select trademark country");
            return false;
        }

        return true;
    };

    const __handleSave = () => {
        if (!validateForm()) return;
        try {
            const payload = {
                name: jurisdictionsName,
                code: code,
                type: country?.id,
                isActive: isActive,
                ...(parentId && {
                    parentId: parentId,
                }),
            };
            console.log(payload);
            updateState({ isLoading: true });

            __postApiData("/jurisdictions/createJurisdiction", payload)
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
        __patchApiData("/jurisdictions/getJurisdictionById/" + item?._id, {
            name: jurisdictionsName,
            code: code,
            type: country?.id,
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
                jurisdictionsName: item?.name,
                country: item?.type
                    ? {
                          name: item?.type,
                          id: item?.type,
                      }
                    : null,
                isActive: item?.isActive,
            });
        }
    }, [isEdit, item]);

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
                            title="Name"
                            placeholder="e.g. Maharashtra"
                            value={jurisdictionsName}
                            valuekey="jurisdictionsName"
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
                            placeholder="e.g., MH"
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
                            type="select"
                            title={"Type"}
                            placeholder={"Select Type"}
                            list={[
                                { id: "COUNTRY", name: "COUNTRY" },
                                { id: "STATE", name: "STATE" },
                                { id: "PROVINCE", name: "PROVINCE" },
                                { id: "DISTRICT", name: "DISTRICT" },
                                { id: "CITY", name: "CITY" },
                                { id: "OTHER", name: "OTHER" },
                            ]}
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
                    </View>
                </View>
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

export default CreateTaxJurisdiction;
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
