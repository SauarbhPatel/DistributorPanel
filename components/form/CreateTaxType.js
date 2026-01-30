import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";

const CreateTaxType = ({ onClose = () => {}, isEdit = false, item = null }) => {
    const [state, setState] = useState({
        taxTypeName: "",
        taxTypeCode: "",
        isActive: true,
        loading: false,
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const { loading, taxTypeName, taxTypeCode, isActive } = state;

    const validateForm = () => {
        if (!taxTypeName?.trim()) {
            Alert.alert("Validation Error", "Tax Type Name is required");
            return false;
        }

        if (taxTypeName?.trim().length < 2) {
            Alert.alert(
                "Validation Error",
                "Tax Type Name must be at least 2 characters",
            );
            return false;
        }
        if (!taxTypeCode?.trim()) {
            Alert.alert("Validation Error", "Tax Type Code is required");
            return false;
        }

        if (taxTypeCode?.trim().length < 2) {
            Alert.alert(
                "Validation Error",
                "Tax Type Code must be at least 2 characters",
            );
            return false;
        }

        return true;
    };

    const __handleSave = () => {
        if (!validateForm()) return;
        updateState({ loading: true });

        __postApiData("/taxTypes/createTaxType", {
            name: taxTypeName,
            code: taxTypeCode,
        })
            .then((res) => {
                if (res?.success) {
                    Alert.alert("", res.message);
                    onClose();
                } else {
                    Alert.alert("Failed", res.message);
                }
                updateState({ loading: false });
            })
            .catch((error) => {
                Alert.alert("Failed", "Tax Type name or code already exists");
                updateState({ loading: false });
            });
    };

    const __handleEditSave = () => {
        if (!validateForm()) return;
        updateState({ loading: true });

        __postApiData("/taxTypes/updateTaxTypeById/" + item?._id, {
            name: taxTypeName,
            code: taxTypeCode,
        })
            .then((res) => {
                if (res?.success) {
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
            updateState({
                taxTypeName: item?.name,
                taxTypeCode: item?.code,
            });
        }
    }, [isEdit, item]);

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
                <View>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <TextAreaBox
                            title="Tax Type Name"
                            placeholder="e.g., GSTs"
                            required
                            value={taxTypeName}
                            valuekey="taxTypeName"
                            onChangeText={updateState}
                            titleCustomStyle={{ marginHorizontal: 0 }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                        />
                        <TextAreaBox
                            title="Tax Type Code"
                            required
                            placeholder="e.g., GST_18"
                            value={taxTypeCode}
                            valuekey="taxTypeCode"
                            onChangeText={updateState}
                            titleCustomStyle={{ marginHorizontal: 0 }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                        />
                    </View>
                </View>

                {/* Active Status */}
                {/* <View style={styles.statusBox}>
                    <View>
                        <Text style={Fonts.blackColor15Medium}>
                            Active Status
                        </Text>
                        <Text
                            style={{ ...Fonts.grayColor14Medium, fontSize: 10 }}
                        >
                            Enable or disable this tax type
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
                </View> */}

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

export default CreateTaxType;
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
