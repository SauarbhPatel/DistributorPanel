import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const B2BSearchFilterBar = ({
    onSupplierSelect,
    onFulfilledBySelect,
    onLocationSelect,
    onClearFilters,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.filterGroup}>
                <Text style={styles.label}>Select Supplier</Text>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => onSupplierSelect?.()}
                >
                    <Text style={styles.dropdownText} numberOfLines={1}>
                        Search or select seller...
                    </Text>
                    <Feather name="chevron-down" size={16} color="#cbd5e1" />
                </TouchableOpacity>
            </View>

            <View style={styles.filterGroup}>
                <Text style={styles.label}>Order Fulfilled by</Text>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => onFulfilledBySelect?.()}
                >
                    <Text style={styles.dropdownText}>Select</Text>
                    <Feather name="chevron-down" size={16} color="#cbd5e1" />
                </TouchableOpacity>
            </View>

            <View style={styles.filterGroup}>
                <Text style={styles.label}>Location</Text>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => onLocationSelect?.()}
                >
                    <Text style={styles.dropdownText}>Select Location</Text>
                    <Feather name="chevron-down" size={16} color="#cbd5e1" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.clearButton}
                onPress={onClearFilters}
                activeOpacity={0.7}
            >
                <Text style={styles.clearButtonText}>Clear Filters</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        gap: 12,
        flexWrap: "wrap",
        marginHorizontal: 10,
        marginTop: 6,
    },
    filterGroup: {
        flex: 1,
        minWidth: 150,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#475569",
        marginBottom: 8,
    },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
        backgroundColor: "#fff",
    },
    dropdownText: {
        fontSize: 14,
        color: "#94a3b8",
        flex: 1,
    },
    clearButton: {
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#f0f7ff",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e0eefe",
    },
    clearButtonText: {
        color: "#0066A2",
        fontSize: 14,
        fontWeight: "700",
    },
});

export default B2BSearchFilterBar;
