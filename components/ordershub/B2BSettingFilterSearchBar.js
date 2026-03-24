import React, { useState } from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const B2BSettingFilterSearchBar = () => {
    const [search, setSearch] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.searchWrapper}>
                <Feather
                    name="search"
                    size={18}
                    color="#94a3b8"
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search name, code, description..."
                    placeholderTextColor="#94a3b8"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <View style={styles.selectorsRow}>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Active</Text>
                    <Ionicons name="chevron-down" size={16} color="#64748b" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Terminal</Text>
                    <Ionicons name="chevron-down" size={16} color="#64748b" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
        paddingTop: 10,
    },
    searchWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        paddingHorizontal: 12,
        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#1e293b",
    },
    selectorsRow: {
        flexDirection: "row",
        gap: 8,
    },
    dropdown: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        paddingHorizontal: 16,
        height: 48,
    },
    dropdownText: {
        fontSize: 14,
        color: "#475569",
        fontWeight: "500",
    },
});

export default B2BSettingFilterSearchBar;
