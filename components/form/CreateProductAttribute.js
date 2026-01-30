import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import BottomPopup from "../common/BottomPopup";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Loader, TextAreaBox } from "../../modules";
import { __patchApiData, __postApiData } from "../../utils/api";

const CreateProductAttribute = ({
    onClose = () => {},
    isEdit = false,
    item = null,
}) => {
    const [state, setState] = useState({
        isShowCreate: false,
        attributeName: "",
        slug: "",
        valueInput: "",
        values: [],
        isActive: true,
        loading: false,
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        loading,
        isShowCreate,
        attributeName,
        slug,
        valueInput,
        values,
        isActive,
    } = state;

    const validateForm = () => {
        if (!attributeName?.trim()) {
            Alert.alert("Validation Error", "Attribute name is required");
            return false;
        }

        if (attributeName?.trim().length < 2) {
            Alert.alert(
                "Validation Error",
                "Attribute name must be at least 2 characters",
            );
            return false;
        }

        if (values?.length === 0) {
            Alert.alert(
                "Validation Error",
                "Please add at least one allowed value",
            );
            return false;
        }

        return true;
    };
    const addValue = () => {
        if (valueInput?.trim()) {
            updateState({
                values: [...values, ...valueInput?.split(",")],
                valueInput: "",
            });
        }
    };
    const removeValue = (index) => {
        // const updatedValues = values.filter((_, i) => i !== index);
        // updateState({ values: updatedValues });
        Alert.alert(
            "Remove Value",
            "Are you sure you want to remove this value?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => {
                        const updatedValues = values.filter(
                            (_, i) => i !== index,
                        );
                        updateState({ values: updatedValues });
                    },
                },
            ],
        );
    };

    const __handleSave = () => {
        if (!validateForm()) return;
        updateState({ loading: true });

        __postApiData("/productAttributes/createAttribute", {
            name: attributeName,
            type: "SELECT",
            allowedValues: values,
            isFilterable: isActive,
            isVariant: isActive,
            status: isActive,
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

        __patchApiData("/productAttributes/updateAttibuteBy/" + item?._id, {
            name: attributeName,
            type: "SELECT",
            allowedValues: values,
            isFilterable: isActive,
            isVariant: isActive,
            status: isActive,
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
            updateState({
                attributeName: item?.name,
                values: item?.allowedValues,
                isActive: item?.status,
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
                            title="Attribute Name"
                            placeholder="e.g., Color, Size"
                            required
                            value={attributeName}
                            valuekey="attributeName"
                            onChangeText={updateState}
                            titleCustomStyle={{ marginHorizontal: 0 }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                        />

                        {/* <TextAreaBox
                            title="Slug (Optional)"
                            placeholder="e.g., color"
                            value={slug}
                            valuekey="slug"
                            onChangeText={updateState}
                            titleCustomStyle={{ marginHorizontal: 0 }}
                            inputCustomStyle={inputStyle}
                            customStyle={{ flex: 1 }}
                        /> */}
                    </View>

                    <TextAreaBox
                        title="Allowed Values"
                        placeholder="Type and press Enter (e.g., Red, Blue)"
                        value={valueInput}
                        onSubmitEditing={addValue}
                        // inputCustomStyle={inputStyle}
                        valuekey="valueInput"
                        onChangeText={updateState}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        customStyle={{ flex: 1 }}
                    />
                </View>

                {/* Value Chips */}
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 8,
                    }}
                >
                    {values.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => removeValue(index)}
                            key={index}
                            style={styles.chip}
                        >
                            <Text style={styles.chipText}>{item}</Text>

                            <View style={{ marginLeft: 6 }}>
                                <FontAwesome
                                    name="close"
                                    size={12}
                                    color="#555"
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={hintText}>* Press Enter to save a value.</Text>

                {/* Active Status */}
                <View style={styles.statusBox}>
                    <View>
                        <Text style={Fonts.blackColor15Medium}>
                            Active Status
                        </Text>
                        <Text
                            style={{ ...Fonts.grayColor14Medium, fontSize: 10 }}
                        >
                            Enable or disable this attribute
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
                        <Text style={styles.createText}>
                            {isEdit ? "Update" : "Create"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default CreateProductAttribute;
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
