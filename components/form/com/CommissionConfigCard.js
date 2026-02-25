import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextAreaBox } from "../../../modules";
import { Colors } from "../../../constants/styles";
import { useEffect } from "react";

const CommissionConfigCard = ({ data, onChange = () => {} }) => {
    // 1. Updated to use index for finding the item to update
    const updateTier = (index, key, value) => {
        const updated = data.sellerTierOverrides.map((item, i) =>
            i === index ? { ...item, [key]: value } : item,
        );
        onChange({ sellerTierOverrides: updated });
    };

    const addTier = () => {
        onChange({
            sellerTierOverrides: [
                ...data.sellerTierOverrides,
                {
                    sellerTier: "",
                    commissionPercentage: "",
                },
            ],
        });
    };

    // 2. Updated to filter out the item by its index
    const removeTier = (index) => {
        onChange({
            sellerTierOverrides: data.sellerTierOverrides.filter(
                (_, i) => i !== index,
            ),
        });
    };

    const { commissionPercentage, closingFees, sellerTierOverrides } = data;
    return (
        <View style={styles.card}>
            {/* Top Fields */}
            <View style={styles.row}>
                <TextAreaBox
                    title="Commission Percentage (%)"
                    placeholder="e.g. 10"
                    value={commissionPercentage}
                    valuekey="commissionPercentage"
                    onChangeText={onChange}
                    keyboardType="numeric"
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                />

                <TextAreaBox
                    title="Closing Fee (₹)"
                    placeholder="e.g. 25"
                    value={closingFees}
                    valuekey="closingFees"
                    onChangeText={onChange}
                    keyboardType="numeric"
                    titleCustomStyle={{
                        marginHorizontal: 0,
                        marginTop: 10,
                    }}
                    inputCustomStyle={inputStyle}
                    customStyle={{ flex: 1 }}
                />
            </View>

            {/* Seller Tier Overrides */}
            <Text style={styles.sectionTitle}>Seller Tier Overrides</Text>

            {sellerTierOverrides.map((item, index) => (
                <View key={index} style={styles.tierRow}>
                    <TextAreaBox
                        title="Tier Name"
                        placeholder="e.g. Gold"
                        value={item.sellerTier}
                        valuekey="name"
                        onChangeText={(text) =>
                            updateTier(index, "sellerTier", text?.name)
                        }
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        customStyle={{ flex: 1.8 }}
                    />

                    <TextAreaBox
                        title="Commission (%)"
                        placeholder=""
                        value={item.commissionPercentage}
                        valuekey="name"
                        onChangeText={(text) =>
                            updateTier(
                                index,
                                "commissionPercentage",
                                text?.name,
                            )
                        }
                        keyboardType="numeric"
                        titleCustomStyle={{
                            marginHorizontal: 0,
                            marginTop: 10,
                        }}
                        inputCustomStyle={inputStyle}
                        customStyle={{ flex: 1 }}
                    />

                    <TouchableOpacity
                        onPress={() => removeTier(index)}
                        style={styles.deleteBtn}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={20}
                            color="#EF4444"
                        />
                    </TouchableOpacity>
                </View>
            ))}

            {/* Add Tier Button */}
            <TouchableOpacity
                style={styles.addBtn}
                onPress={addTier}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={18} color="#2563EB" />
                <Text style={styles.addText}>Add Tier Override</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CommissionConfigCard;

const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};
const styles = StyleSheet.create({
    card: {},

    row: {
        flexDirection: "row",
        marginBottom: 16,
        gap: 10,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 10,
        color: "#111827",
    },

    tierRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#DBEAFE",
        borderRadius: 8,
        gap: 10,
        paddingHorizontal: 5,
        paddingBottom: 10,
    },

    deleteBtn: {
        marginTop: 18,
    },

    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DBEAFE",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        alignSelf: "flex-start",
        marginTop: 6,
    },

    addText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "500",
        color: "#2563EB",
    },
});
