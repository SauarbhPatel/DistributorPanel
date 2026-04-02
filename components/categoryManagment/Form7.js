import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { DropDownTextAreaBox } from "../../modules";

const Form7 = ({ state, updateState }) => {
    const removeDoc = (index) => {
        const updated = [...state.shippingZoneIds];
        updated.splice(index, 1);
        updateState({ shippingZoneIds: updated });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Shipping & Logistics Rules</Text>
                    <Text style={styles.subtitle}>
                        Select a shipping template created in Manage Shipping
                        Methods. It is assigned to this category at creation.
                    </Text>
                </View>
                <Feather name="info" size={18} color="#3b82f6" />
            </View>

            {/* Body */}
            <View style={styles.body}>
                {/* Dropdown */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Shipping Zones * </Text>

                    <DropDownTextAreaBox
                        type="select"
                        placeholder={"Select Shipping Zones..."}
                        list={state?.shippingZoneList}
                        value={null}
                        isSearchable
                        inputCustomStyle={{}}
                        onSelected={(value) => {
                            updateState({
                                shippingZoneIds: state.shippingZoneIds.find(
                                    (ids) => ids?.id == value?.id,
                                )
                                    ? state.shippingZoneIds
                                    : [...state.shippingZoneIds, value],
                            });
                        }}
                        customStyle={{ marginBottom: 5, flex: 1 }}
                    />
                </View>

                {state?.shippingZoneIds?.length > 0 && (
                    <View style={styles.selectedBox}>
                        <Text style={styles.selectedTitle}>
                            • Selected shipping zones (
                            {state?.shippingZoneIds?.length})
                        </Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.tagContainer}
                        >
                            {state?.shippingZoneIds?.map((doc, index) => (
                                <View key={index} style={styles.tag}>
                                    <Text style={styles.tagText}>
                                        {doc?.name}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => removeDoc(index)}
                                    >
                                        <AntDesign
                                            name="closecircle"
                                            size={14}
                                            color="#ef4444"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>

            <View style={styles.footer}>
                <Feather name="message-square" size={14} color="#9ca3af" />
                <Text style={styles.footerText}>
                    Select the shipping template to define delivery rules for
                    this category.
                </Text>
            </View>
        </View>
    );
};

export default Form7;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        overflow: "hidden",
        marginVertical: 10,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f9fafb",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 4,
    },

    body: {
        padding: 16,
    },

    inputGroup: {
        marginBottom: 16,
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 6,
    },

    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        padding: 12,
    },

    placeholder: {
        fontSize: 14,
        color: "#9ca3af",
    },

    helper: {
        fontSize: 11,
        color: "#9ca3af",
        marginTop: 5,
    },

    selectedBox: {
        backgroundColor: "#f3f4f6",
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    selectedTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#2563eb",
        marginBottom: 8,
        textTransform: "uppercase",
    },

    tagContainer: {
        flexDirection: "row",
        gap: 8,
    },

    tag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e5e7eb",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        gap: 6,
    },

    tagText: {
        fontSize: 12,
        color: "#374151",
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        backgroundColor: "#f9fafb",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        gap: 6,
    },

    footerText: {
        fontSize: 11,
        color: "#6b7280",
        flex: 1,
    },
});
