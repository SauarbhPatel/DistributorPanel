import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

/* 🔹 Reusable Step Input */
const StepInput = ({ value, onChange, placeholder }) => {
    const increase = () => {
        const num = parseFloat(value) || 0;
        onChange(String(num + 1));
    };

    const decrease = () => {
        const num = parseFloat(value) || 0;
        if (num > 0) onChange(String(num - 1));
    };

    return (
        <View style={styles.stepContainer}>
            <TextInput
                style={styles.stepInput}
                placeholder={placeholder}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
            />

            <View style={styles.stepButtons}>
                <TouchableOpacity style={styles.stepBtn} onPress={increase}>
                    <Feather name="chevron-up" size={14} color="#6b7280" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.stepBtn} onPress={decrease}>
                    <Feather name="chevron-down" size={14} color="#6b7280" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Form6 = ({ state, updateState }) => {
    const updateTier = (index, key, value) => {
        const updated = [...state.sellerTierOverrides];
        updated[index][key] = value;
        updateState({ sellerTierOverrides: updated });
    };

    const addTier = () => {
        const newTier = {
            sellerTier: "",
            commissionPercentage: "",
        };
        updateState({
            sellerTierOverrides: [...state.sellerTierOverrides, newTier],
        });
    };

    const removeTier = (index) => {
        const updated = [...state.sellerTierOverrides];
        updated.splice(index, 1);
        updateState({ sellerTierOverrides: updated });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                        Commission & Pricing Control
                    </Text>
                    <Text style={styles.subtitle}>
                        Set revenue rules per category.
                    </Text>
                </View>
                <Feather name="info" size={18} color="#3b82f6" />
            </View>

            <View style={styles.body}>
                <View
                    style={{
                        gap: 10,
                        marginBottom: 16,
                    }}
                >
                    <View style={styles.flex}>
                        <Text style={styles.label}>
                            Commission Percentage (%)
                        </Text>
                        <StepInput
                            value={state.commissionPercentage}
                            onChange={(val) => {
                                let num = Number(val);

                                if (isNaN(num)) num = 0;

                                if (num < 0) num = 0;
                                if (num > 100) num = 100;
                                updateState({
                                    commissionPercentage: String(num),
                                });
                            }}
                            placeholder="eg 10"
                        />
                    </View>

                    <View style={styles.flex}>
                        <Text style={styles.label}>Closing Fee (₹)</Text>
                        <StepInput
                            value={state.closingFees}
                            onChange={(val) =>
                                updateState({ closingFees: val })
                            }
                            placeholder="eg 25"
                        />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>SELLER TIER OVERRIDES</Text>

                {state?.sellerTierOverrides?.map((tier, index) => (
                    <View key={index + "Selller"} style={styles.tierCard}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <View style={styles.tierBadge}>
                                <Text style={styles.tierText}>
                                    T{index + 1}
                                </Text>
                            </View>

                            <TextInput
                                style={styles.tierInput}
                                placeholder="Tier name (e.g. Gold)"
                                value={tier.sellerTier}
                                onChangeText={(val) =>
                                    updateTier(index, "sellerTier", val)
                                }
                            />
                        </View>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <View style={{ flex: 1 }}>
                                <StepInput
                                    value={tier.commissionPercentage}
                                    onChange={(val) => {
                                        let num = Number(val);

                                        if (isNaN(num)) num = 0;

                                        if (num < 0) num = 0;
                                        if (num > 100) num = 100;

                                        updateTier(
                                            index,
                                            "commissionPercentage",
                                            String(num),
                                        );
                                    }}
                                    placeholder="%"
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.deleteBtn}
                                onPress={() => removeTier(index)}
                            >
                                <AntDesign
                                    name="delete"
                                    size={16}
                                    color="#ef4444"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={styles.addBtn} onPress={addTier}>
                    <AntDesign name="plus" size={16} color="#374151" />
                    <Text style={styles.addText}>Add Tier Override</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Feather name="message-square" size={14} color="#9ca3af" />
                <Text style={styles.footerText}>
                    Set the default commission percentage and closing fee for
                    this category.
                </Text>
            </View>
        </View>
    );
};

export default Form6;

/* 🔹 Styles */
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

    row: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 16,
    },

    flex: {
        flex: 1,
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 6,
    },

    sectionTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#6b7280",
        marginBottom: 10,
    },

    tierCard: {
        gap: 8,
        backgroundColor: "#f9fafb",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        marginBottom: 10,
    },

    tierBadge: {
        backgroundColor: "#fef3c7",
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#92410e5b",
    },

    tierText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#92400e",
    },

    tierInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 8,
        padding: 8,
        paddingVertical: 14,
        fontSize: 13,
        backgroundColor: "#fff",
    },

    deleteBtn: {
        padding: 6,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#fee2e2",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#920e0e5b",
    },

    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        alignSelf: "flex-start",
    },

    addText: {
        fontSize: 13,
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

    /* Step Input Styles */
    stepContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#fff",
    },

    stepInput: {
        flex: 1,
        padding: 10,
        fontSize: 14,
    },

    stepButtons: {
        borderLeftWidth: 1,
        borderLeftColor: "#e5e7eb",
        justifyContent: "center",
    },

    stepBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});
