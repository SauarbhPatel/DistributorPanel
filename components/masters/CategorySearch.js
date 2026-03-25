import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const CategorySearch = ({
    onExpandAll = () => {},
    onCollapseAll = () => {},
    onSearchChange = () => {},
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.searchWrapper}>
                <Feather
                    name="search"
                    size={18}
                    color="#64748b"
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search categories..."
                    placeholderTextColor="#94a3b8"
                    value={searchQuery}
                    onChangeText={(text) => {
                        setSearchQuery(text);
                        if (onSearchChange) onSearchChange(text);
                    }}
                />
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                    style={styles.dropdownBtn}
                    activeOpacity={0.7}
                >
                    <Text style={styles.dropdownText}>All Status</Text>
                    <Feather name="chevron-down" size={16} color="#64748b" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={onExpandAll}
                    activeOpacity={0.7}
                >
                    <Text style={styles.actionBtnText}>Expand All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={onCollapseAll}
                    activeOpacity={0.7}
                >
                    <Text style={styles.actionBtnText}>Collapse All</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 10,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        marginBottom: 10,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 12,
    },
    searchWrapper: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#1e293b",
        fontWeight: "500",
    },
    dropdownBtn: {
        flex: 1.2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
    },
    dropdownText: {
        fontSize: 13,
        color: "#64748b",
        fontWeight: "600",
    },
    actionBtn: {
        paddingHorizontal: 14,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    actionBtnText: {
        fontSize: 13,
        color: "#64748b",
        fontWeight: "600",
    },
});

export default CategorySearch;
