import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { DropDownTextAreaBox, Loader, TextAreaBox } from "../../modules";

const CreateUoMUnit = ({ onClose = () => {}, isEdit = false, item = null }) => {
    const [state, setState] = useState({
        isLoading: false,
        name: "",
        abbreviation: "",
        category: { name: "Other" },
        type: { name: "Base" },
        status: { name: "Active" },
        baseUnit: { name: "Select Base Unit" },
        conversion: "1",
    });

    // Sync with edit item if provided
    useEffect(() => {
        if (isEdit && item) {
            updateState({
                name: item.name,
                abbreviation: item.abbreviation,
                category: { name: item.category },
                type: {
                    name:
                        item.type.charAt(0).toUpperCase() + item.type.slice(1),
                },
                status: {
                    name:
                        item.status.charAt(0).toUpperCase() +
                        item.status.slice(1),
                },
                baseUnit: { name: item.baseUnit || "" },
                conversion: item.conversion?.toString() || "1",
            });
        }
    }, [isEdit, item]);

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const {
        isLoading,
        name,
        abbreviation,
        category,
        type,
        status,
        baseUnit,
        conversion,
    } = state;

    const __handleSave = () => {
        console.log("Saving UoM Data:", state);
    };

    return (
        <>
            <Loader isShow={isLoading} />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100,
                    backgroundColor: Colors.whiteColor,
                    paddingHorizontal: 12,
                    paddingTop: 10,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Name and Abbreviation Row */}
                <View style={rowStyle}>
                    <TextAreaBox
                        title="Name"
                        placeholder="e.g. Kilogram"
                        value={name}
                        valuekey="name"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                    <TextAreaBox
                        title="Abbreviation"
                        placeholder="e.g. kg"
                        value={abbreviation}
                        valuekey="abbreviation"
                        onChangeText={updateState}
                        customStyle={{ flex: 1 }}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                    />
                </View>

                {/* Category and Type Row */}
                <View style={[rowStyle, { marginTop: 0 }]}>
                    <View style={{ flex: 1 }}>
                        <DropDownTextAreaBox
                            type="select"
                            title="Category"
                            list={[
                                { name: "Count" },
                                { name: "Weight" },
                                { name: "Length" },
                                { name: "Temperature" },
                                { name: "Other" },
                            ]}
                            value={category}
                            onSelected={(value) =>
                                updateState({ category: value })
                            }
                            titleCustomStyle={titleStyle}
                            inputCustomStyle={inputStyle}
                            isSearchable
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <DropDownTextAreaBox
                            type="select"
                            title="Type"
                            list={[{ name: "Base" }, { name: "Derived" }]}
                            value={type}
                            onSelected={(value) => updateState({ type: value })}
                            titleCustomStyle={titleStyle}
                            inputCustomStyle={inputStyle}
                            isSearchable
                        />
                    </View>
                </View>

                {/* Conditional Fields for Derived Units */}
                {type.name === "Derived" && (
                    <View style={[rowStyle, { marginTop: 0 }]}>
                        <View style={{ flex: 1 }}>
                            <DropDownTextAreaBox
                                type="select"
                                title="Base Unit"
                                list={[
                                    { name: "Metre (m)" },
                                    { name: "Gram (g)" },
                                ]}
                                value={baseUnit}
                                onSelected={(value) =>
                                    updateState({ baseUnit: value })
                                }
                                titleCustomStyle={titleStyle}
                                inputCustomStyle={inputStyle}
                                isSearchable
                            />
                        </View>
                        <TextAreaBox
                            title="Conversion Factor"
                            placeholder="1"
                            value={conversion}
                            valuekey="conversion"
                            onChangeText={updateState}
                            keyboardType="numeric"
                            customStyle={{ flex: 1 }}
                            titleCustomStyle={titleStyle}
                            inputCustomStyle={inputStyle}
                        />
                    </View>
                )}

                {/* Status Dropdown */}
                <View style={{ marginTop: 0 }}>
                    <DropDownTextAreaBox
                        type="select"
                        title="Status"
                        list={[{ name: "Active" }, { name: "Inactive" }]}
                        value={status}
                        onSelected={(value) => updateState({ status: value })}
                        titleCustomStyle={titleStyle}
                        inputCustomStyle={inputStyle}
                        isSearchable
                    />
                </View>

                {/* Footer Buttons */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={onClose}
                    >
                        <Text style={Fonts.blackColor14Medium}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.createBtn}
                        onPress={__handleSave}
                    >
                        <Text style={styles.createText}>
                            {isEdit ? "Update" : "Save changes"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

export default CreateUoMUnit;

// Internal styles remain the same as your provided snippet...
const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};

const titleStyle = {
    marginHorizontal: 0,
};

const rowStyle = {
    flexDirection: "row",
    gap: 12,
};

const styles = {
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
        marginTop: 40,
    },
    cancelBtn: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    createBtn: {
        backgroundColor: Colors.primaryColor || "#2563EB",
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 8,
    },
    createText: {
        color: Colors.whiteColor,
        ...Fonts.blackColor14Bold,
    },
};
