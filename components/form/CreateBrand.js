import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import BottomPopup from "../common/BottomPopup";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";
import { __getCountryList } from "../../utils/api/commonApi";

const CreateBrand = ({ onClose = () => {}, isEdit = false, item = null }) => {
    const [state, setState] = useState({
        isLoading: false,
        name: "",
        ownerName: "",
        registrationNumber: "",
        country: null,
        brandType: null,
        values: [],
        isActive: true,
        //
        countryList: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        isLoading,
        name,
        ownerName,
        registrationNumber,
        country,
        brandType,
        values,
        isActive,
        //
        countryList,
    } = state;

    const validateForm = () => {
        if (!name?.trim()) {
            Alert.alert("Validation Error", "Brand name is required");
            return false;
        }

        if (name.trim().length < 2) {
            Alert.alert(
                "Validation Error",
                "Brand name must be at least 2 characters",
            );
            return false;
        }

        if (!ownerName?.trim()) {
            Alert.alert("Validation Error", "Owner name is required");
            return false;
        }

        if (!registrationNumber?.trim()) {
            Alert.alert("Validation Error", "Registration number is required");
            return false;
        }

        if (!country) {
            Alert.alert("Validation Error", "Please select trademark country");
            return false;
        }

        if (!brandType) {
            Alert.alert("Validation Error", "Please select brand type");
            return false;
        }

        return true;
    };

    const __handleSave = () => {
        if (!validateForm()) return;
        try {
            const payload = {
                name: name.trim(),
                ownerName: ownerName.trim(),
                metaTitle: "",
                metaDescription: "",
                brandType: brandType?.id || null,
                logo: "",
                logoAlt: "",
                trademarkCountry: country?.id || null,
                registrationNumber: registrationNumber.trim(),
                trademarkCertificate: "",
                isActive: isActive,
            };
            console.log(payload);

            __postApiData("/brands/createBrand", payload)
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
        __patchApiData("/productAttributes/updateAttibuteBy/" + item?._id, {
            name: name,
            type: "SELECT",
            allowedValues: values,
            isFilterable: isActive,
            isVariant: isActive,
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
                name: item?.name,
                values: item?.allowedValues,
            });
        }
    }, [isEdit, item]);

    const __handleGetData = async () => {
        try {
            const country = await __getCountryList();
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
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <TextAreaBox
                            title="Brand Name"
                            placeholder="e.g., Samsung"
                            required
                            value={name}
                            valuekey="name"
                            onChangeText={updateState}
                            titleCustomStyle={{ marginHorizontal: 0 }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                        />

                        {/* <TextAreaBox
                            title="Slug"
                            placeholder="brand slug"
                            value={slug}
                            valuekey="slug"
                            onChangeText={updateState}
                            titleCustomStyle={{ marginHorizontal: 0 }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                        /> */}
                    </View>

                    <TextAreaBox
                        title="Owner Name"
                        placeholder="Owner Name"
                        value={ownerName}
                        valuekey="ownerName"
                        onChangeText={updateState}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        customStyle={{ flex: 1 }}
                    />

                    <TextAreaBox
                        title="Registration Number"
                        placeholder="Registration Number"
                        value={registrationNumber}
                        valuekey="registrationNumber"
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
                            title={"Trademark Country"}
                            placeholder={"Select Country"}
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
                        <DropDownTextAreaBox
                            type="select"
                            title={"Brand Type"}
                            placeholder={"Select Type"}
                            list={[
                                { id: "Generic", name: "Generic" },
                                { id: "OEM", name: "OEM" },
                                { id: "ODM", name: "ODM" },
                            ]}
                            value={brandType}
                            isSearchable
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            onSelected={(value) => {
                                updateState({
                                    brandType: value,
                                });
                            }}
                            customStyle={{ marginBottom: 5, flex: 1 }}
                        />
                    </View>
                </View>

                {/* Active Status */}
                <View style={styles.statusBox}>
                    <View>
                        <Text style={Fonts.blackColor15Medium}>
                            Active Status
                        </Text>
                        <Text
                            style={{ ...Fonts.grayColor14Medium, fontSize: 10 }}
                        >
                            Toggle brand visibility
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

export default CreateBrand;
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
