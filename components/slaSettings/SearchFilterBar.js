import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const SearchFilterBar = ({
    onSearch,
    onStatusPress,
    onReset,
    Severity = false,
}) => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <View style={styles.container}>
            {/* Search Input Section */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>SEARCH</Text>
                <View style={styles.searchWrapper}>
                    <Feather
                        name="search"
                        size={18}
                        color="#94a3b8"
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Order ID, seller, milestone..."
                        placeholderTextColor="#94a3b8"
                        value={searchValue}
                        onChangeText={(text) => {
                            setSearchValue(text);
                            onSearch?.(text);
                        }}
                    />
                </View>
            </View>

            <View style={styles.statusContainer}>
                <Text style={styles.label}>SEVERITY</Text>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={onStatusPress}
                    activeOpacity={0.7}
                >
                    <Text style={styles.dropdownText}>All Severity</Text>
                    <Feather name="chevron-down" size={18} color="#94a3b8" />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    alignItems: "flex-end",
                }}
            >
                {/* Status Dropdown Section */}
                <View style={styles.statusContainer}>
                    <Text style={styles.label}>STATUS</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={onStatusPress}
                        activeOpacity={0.7}
                    >
                        <Feather
                            name="filter"
                            size={16}
                            color="#94a3b8"
                            style={styles.icon}
                        />
                        <Text style={styles.dropdownText}>All Statuses</Text>
                        <Feather
                            name="chevron-down"
                            size={18}
                            color="#94a3b8"
                        />
                    </TouchableOpacity>
                </View>

                {/* Reset Button */}
                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => {
                        setSearchValue("");
                        onReset?.();
                    }}
                >
                    <Ionicons name="refresh" size={22} color="#3b82f6" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
        // alignItems: "flex-end",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        gap: 12,
        marginTop: 10,
    },
    label: {
        fontSize: 10,
        fontWeight: "700",
        color: "#64748b",
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    inputContainer: {
        flex: 2, // Takes up more space
    },
    searchWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 48,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#1e293b",
        marginLeft: 8,
    },
    statusContainer: {
        flex: 1.2,
    },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 48,
    },
    dropdownText: {
        flex: 1,
        fontSize: 14,
        color: "#64748b",
        marginLeft: 8,
    },
    resetButton: {
        backgroundColor: "#eff6ff",
        width: 48,
        height: 48,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dbeafe",
    },
});

export default SearchFilterBar;
