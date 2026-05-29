import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const B2BAdvancedSearchFilterBar = ({ onClearFilters }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.filterItem, { flex: 1.5 }]}>
                <View style={styles.searchWrapper}>
                    <Feather name="search" size={18} color="#94a3b8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Search order ID, buyer..."
                        placeholderTextColor="#94a3b8"
                    />
                </View>
            </View>

            <View style={styles.filterItem}>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.placeholderText}>mm/dd/yyyy</Text>
                    <MaterialCommunityIcons
                        name="calendar-month-outline"
                        size={20}
                        color="#94a3b8"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.filterItem}>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.placeholderText}>mm/dd/yyyy</Text>
                    <MaterialCommunityIcons
                        name="calendar-month-outline"
                        size={20}
                        color="#94a3b8"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.filterItem}>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownValue}>Category</Text>
                    <Feather name="chevron-down" size={18} color="#64748b" />
                </TouchableOpacity>
            </View>
            <View style={styles.filterItem}>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownValue}>All Sources</Text>
                    <Feather name="chevron-down" size={18} color="#64748b" />
                </TouchableOpacity>
            </View>
            <View style={styles.filterItem}>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownValue}>All Platforms</Text>
                    <Feather name="chevron-down" size={18} color="#64748b" />
                </TouchableOpacity>
            </View>
            {/* <View
                style={{
                    flex: 1,
                    width: "100%",
                }}
            /> */}
            <TouchableOpacity
                style={[styles.clearButton, { backgroundColor: "#0284c7" }]}
                onPress={onClearFilters}
            >
                <Text style={[styles.clearText, { color: "#ffffff" }]}>
                    Apply
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.clearButton}
                onPress={onClearFilters}
            >
                <Text style={styles.clearText}>Clear Filters</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        gap: 10,
        flexWrap: "wrap",
        marginHorizontal: 10,
        marginTop: 16,
    },
    filterItem: {
        flex: 1,
        minWidth: 140,
    },
    searchWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#1e293b",
        marginLeft: 8,
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
    },
    placeholderText: {
        fontSize: 14,
        color: "#94a3b8",
    },
    dropdownValue: {
        fontSize: 14,
        color: "#64748b",
    },
    clearButton: {
        backgroundColor: "#f0f9ff",
        paddingHorizontal: 16,
        height: 44,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e0f2fe",
        flex: 1,
        minWidth: 140,
    },
    clearText: {
        color: "#0284c7",
        fontSize: 14,
        fontWeight: "700",
    },
});

export default B2BAdvancedSearchFilterBar;
