import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const DashboardHeader = ({ isShowFilter = false, title, subTitle }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textGroup}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subTitle}</Text>
            </View>

            {isShowFilter && (
                <TouchableOpacity style={styles.dropdown} activeOpacity={0.7}>
                    <Text style={styles.dropdownText}>All Categories</Text>
                    <Feather name="chevron-down" size={18} color="#94A3B8" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F1F5FF",
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 20,
        paddingRight: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 10,
    },
    textGroup: {
        flex: 1,
        paddingRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: "#64748B",
    },
    dropdown: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        // elevation: 2,
    },
    dropdownText: {
        fontSize: 12,
        color: "#64748B",
        marginRight: 8,
        fontWeight: "500",
    },
});

export default DashboardHeader;
