import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { DropDownTextAreaBox } from "../../modules";
const { width } = Dimensions.get("window");

const CategorySearch = ({
    isLoading,
    search,
    onChange = () => {},
    dropDown1List = [],
    dropDown1 = null,
    onExpandAll = () => {},
    onCollapseAll = () => {},
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchWrapper}>
                <Feather
                    name="search"
                    size={16}
                    color="#9CA3AF"
                    style={{ marginRight: 8 }}
                />
                <TextInput
                    placeholder={"Search categories..."}
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                    value={search}
                    onChangeText={(text) => onChange({ search: text })}
                />
                {isLoading ? <ActivityIndicator /> : null}
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
                <DropDownTextAreaBox
                    type="select"
                    placeholder={"All Status"}
                    list={dropDown1List}
                    value={dropDown1}
                    isSearchable
                    inputCustomStyle={{
                        ...styles.dropdownBtn,
                        width: (width - 65) / 3,
                    }}
                    onSelected={(value) => {
                        onChange({ dropDown1: value });
                    }}
                />
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
    statusDropdown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
        width: 110,
    },
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
        paddingHorizontal: 5,
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
