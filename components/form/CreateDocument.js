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
const CreateDocument = ({
    onClose = () => {},
    isEdit = false,
    item = null,
}) => {
    const [state, setState] = useState({
        isLoading: false,
        name: "",
        code: "",
        issuingAuthority: "",
        taxJurId: null,
        renewalReminderDays: "30",
        userMustProvide: "DOCUMENT",
        applicableOn: "SELLER",
        status: "DRAFT",
        validityRequired: true,
        mandatoryExpiryDate: true,
        autoBlockListingOnExpiry: false,
        //
        taxJurisdictionsList: [],
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        isLoading,
        name,
        code,
        issuingAuthority,
        taxJurId,
        renewalReminderDays,
        userMustProvide,
        applicableOn,
        status,
        validityRequired,
        mandatoryExpiryDate,
        autoBlockListingOnExpiry,
        //
        taxJurisdictionsList,
    } = state;

    const validateForm = () => {
        // 1. String & Text Field Validations
        if (!name?.trim()) {
            Alert.alert("Validation Error", "Name is required");
            return false;
        }
        if (name?.trim().length < 2) {
            Alert.alert(
                "Validation Error",
                "Name must be at least 2 characters",
            );
            return false;
        }
        if (!code?.trim()) {
            Alert.alert("Validation Error", "Code is required");
            return false;
        }
        if (!issuingAuthority?.trim()) {
            Alert.alert("Validation Error", "Issuing authority is required");
            return false;
        }

        // 2. Dropdown / Object Reference Validations
        if (!taxJurId || !taxJurId.id) {
            Alert.alert("Validation Error", "Jurisdiction is required");
            return false;
        }
        if (!status) {
            Alert.alert("Validation Error", "Status is required");
            return false;
        }
        if (!applicableOn) {
            // Update this check if applicableOn is an array: if (!applicableOn || applicableOn.length === 0)
            Alert.alert("Validation Error", "Applicable on is required");
            return false;
        }

        // 3. Numeric Field Validations
        const reminderDays = Number(renewalReminderDays);
        if (
            renewalReminderDays === "" ||
            renewalReminderDays === null ||
            isNaN(reminderDays) ||
            reminderDays < 0
        ) {
            Alert.alert(
                "Validation Error",
                "Renewal reminder days must be a valid positive number",
            );
            return false;
        }

        // 4. Boolean / Logic Checks (Optional but recommended)
        // If validity is required, you might want to enforce that a mandatory expiry date makes sense
        if (
            validityRequired &&
            typeof mandatoryExpiryDate !== "boolean" &&
            !mandatoryExpiryDate
        ) {
            // Adjust this logic based on whether mandatoryExpiryDate is a boolean toggle or an actual Date string
            Alert.alert(
                "Validation Error",
                "Please specify the mandatory expiry date setting",
            );
            return false;
        }

        // If all checks pass
        return true;
    };

    const __handleSave = () => {
        if (!validateForm()) return;
        try {
            updateState({ isLoading: true });

            const payload = {
                name: name.trim(),
                code: code.trim(),
                issuingAuthority: issuingAuthority,
                jurisdiction: taxJurId
                    ? {
                          jurisdictionId: taxJurId?.id,
                          name: taxJurId?.name,
                      }
                    : null,
                validityRequired: validityRequired,
                mandatoryExpiryDate: mandatoryExpiryDate,
                autoBlockListingOnExpiry: autoBlockListingOnExpiry,
                renewalReminderDays: Number(renewalReminderDays),
                userMustProvide: userMustProvide,
                applicableOn: applicableOn,
                status: status,
            };

            __postApiData(
                "/complianceDocument/createComplianceDocument",
                payload,
            )
                .then((res) => {
                    updateState({ isLoading: false });

                    if (res?.success) {
                        Alert.alert("Success", res.message);
                        onClose();
                    } else {
                        Alert.alert("Error", res?.message || "Failed");
                        updateState({ isLoading: false });
                    }
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
        const payload = {
            name: name.trim(),
            code: code.trim(),
            issuingAuthority: issuingAuthority,
            jurisdiction: taxJurId
                ? {
                      jurisdictionId: taxJurId?.id,
                      name: taxJurId?.name,
                  }
                : null,
            validityRequired: validityRequired,
            mandatoryExpiryDate: mandatoryExpiryDate,
            autoBlockListingOnExpiry: autoBlockListingOnExpiry,
            renewalReminderDays: Number(renewalReminderDays),
            userMustProvide: userMustProvide,
            applicableOn: applicableOn,
            status: status,
        };

        __patchApiData(
            "/complianceDocument/updateComplianceDocumentById/" + item?._id,
            payload,
        )
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
            console.log(JSON.stringify(item));
            updateState({
                name: item?.name,
                code: item?.code,
                issuingAuthority: item?.issuingAuthority,
                taxJurId: item?.jurisdiction
                    ? {
                          ...item?.jurisdiction,
                          id: item?.jurisdiction?.jurisdictionId,
                      }
                    : null,

                renewalReminderDays: String(item?.renewalReminderDays),
                userMustProvide: item?.userMustProvide,
                applicableOn: item?.applicableOn,
                status: item?.status,
                validityRequired: item?.validityRequired,
                mandatoryExpiryDate: item?.mandatoryExpiryDate,
                autoBlockListingOnExpiry: item?.autoBlockListingOnExpiry,
            });
        }
    }, [isEdit, item]);

    const __handleGetData = async () => {
        try {
            const taxJur = await __getTaxJurisdictionsList();
            updateState({
                taxJurisdictionsList: taxJur,
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
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <TextAreaBox
                            title="Document name"
                            placeholder="e.g. BIS Certificate"
                            required
                            value={name}
                            valuekey="name"
                            onChangeText={updateState}
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                        />
                        <TextAreaBox
                            title="Document code"
                            placeholder="e.g. BIS_CERT"
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
                    </View>
                    <TextAreaBox
                        title="Issuing authority"
                        placeholder="e.g. Bureau of Indian Standards"
                        value={issuingAuthority}
                        valuekey="issuingAuthority"
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
                            required
                            type="select"
                            title={"Applicable On"}
                            placeholder={"Select"}
                            list={[
                                { id: "SELLER", name: "SELLER" },
                                { id: "BUYER", name: "BUYER" },
                                { id: "BRAND", name: "BRAND" },
                            ]}
                            value={
                                applicableOn
                                    ? { id: applicableOn, name: applicableOn }
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
                                    applicableOn: value?.id,
                                });
                            }}
                            customStyle={{ marginBottom: 5, flex: 1 }}
                        />
                        <DropDownTextAreaBox
                            required
                            type="select"
                            title={"Jurisdiction"}
                            placeholder={"Select Jurisdiction"}
                            list={taxJurisdictionsList}
                            value={taxJurId}
                            isSearchable
                            titleCustomStyle={{
                                marginHorizontal: 0,
                                marginTop: 10,
                            }}
                            inputCustomStyle={inputStyle}
                            onSelected={(value) => {
                                updateState({
                                    taxJurId: value,
                                });
                            }}
                            customStyle={{ marginBottom: 5, flex: 1 }}
                        />
                    </View>
                </View>
                {/* Active Status */}
                <View style={styles.statusBox}>
                    <Text style={Fonts.blackColor15Medium}>
                        Validity required
                    </Text>
                    <Switch
                        value={validityRequired}
                        onValueChange={(value) =>
                            updateState({ validityRequired: value })
                        }
                        trackColor={{
                            false: "#ccc",
                            true: Colors.primaryColor,
                        }}
                    />
                </View>
                <View style={styles.statusBox}>
                    <Text style={Fonts.blackColor15Medium}>
                        Mandatory expiry date
                    </Text>
                    <Switch
                        value={mandatoryExpiryDate}
                        onValueChange={(value) =>
                            updateState({ mandatoryExpiryDate: value })
                        }
                        trackColor={{
                            false: "#ccc",
                            true: Colors.primaryColor,
                        }}
                    />
                </View>
                <View style={styles.statusBox}>
                    <Text style={Fonts.blackColor15Medium}>
                        Auto-block listing on expiry
                    </Text>
                    <Switch
                        value={autoBlockListingOnExpiry}
                        onValueChange={(value) =>
                            updateState({ autoBlockListingOnExpiry: value })
                        }
                        trackColor={{
                            false: "#ccc",
                            true: Colors.primaryColor,
                        }}
                    />
                </View>

                <TextAreaBox
                    title="Renewal reminder (days before expiry)"
                    required
                    value={renewalReminderDays}
                    valuekey="renewalReminderDays"
                    onChangeText={updateState}
                    titleCustomStyle={{ marginHorizontal: 0, marginTop: 0 }}
                    inputCustomStyle={{
                        ...inputStyle,
                    }}
                    keyboardType="number-pad"
                />
                <DropDownTextAreaBox
                    required
                    type="select"
                    title={"User must provide"}
                    placeholder={"Select"}
                    list={[
                        { id: "DOCUMENT", name: "DOCUMENT" },
                        { id: "NUMBER", name: "NUMBER" },
                        { id: "BOTH", name: "BOTH" },
                    ]}
                    value={
                        userMustProvide
                            ? { id: userMustProvide, name: userMustProvide }
                            : null
                    }
                    isSearchable
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 0,
                    }}
                    inputCustomStyle={inputStyle}
                    onSelected={(value) => {
                        updateState({
                            userMustProvide: value.id,
                        });
                    }}
                    customStyle={{ marginBottom: 5, flex: 1 }}
                />
                <DropDownTextAreaBox
                    required
                    type="select"
                    title={"Status"}
                    placeholder={"Select"}
                    list={[
                        { id: "ACTIVE", name: "ACTIVE" },
                        { id: "INACTIVE", name: "INACTIVE" },
                        { id: "DRAFT", name: "DRAFT" },
                    ]}
                    value={status ? { id: status, name: status } : null}
                    isSearchable
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 0,
                    }}
                    inputCustomStyle={inputStyle}
                    onSelected={(value) => {
                        updateState({
                            status: value?.id,
                        });
                    }}
                    customStyle={{ marginBottom: 5, flex: 1 }}
                />

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

export default CreateDocument;
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
