import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const GoogleHeader = ({
    title = "Google & YouTube Marketing",
    subTitle = "Overview - Marketplace Admin",
    icon = <AntDesign name="youtube" size={26} color="white" />,
}) => {
    return (
        <View style={styles.container}>
            {/* Top Row: Icon and Titles */}
            <View style={styles.headerRow}>
                <View style={styles.iconContainer}>{icon}</View>
                <View style={styles.titleContainer}>
                    <Text style={styles.mainTitle}>{title}</Text>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </View>
            </View>

            {/* Bottom Row: Inline Filters */}
            <View style={styles.filterRow}>
                <Text style={styles.viewAsText}>View as:</Text>

                <TouchableOpacity
                    style={styles.dropdownButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.dropdownText}>All</Text>
                    <Feather name="chevron-down" size={16} color="#94A3B8" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.dropdownButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.dropdownText}>All Users</Text>
                    <Feather name="chevron-down" size={16} color="#94A3B8" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        margin: 10,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 0.5,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: "#2B7FFF",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        marginLeft: 16,
    },
    mainTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#1E293B",
        letterSpacing: -0.5,
    },
    subTitle: {
        fontSize: 12,
        color: "#94A3B8",
        marginTop: 2,
    },
    filterRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAsText: {
        fontSize: 14,
        color: "#64748B",
        marginRight: 12,
    },
    dropdownButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 10,
        minWidth: 100,
        justifyContent: "space-between",
    },
    dropdownText: {
        fontSize: 14,
        color: "#64748B",
        fontWeight: "500",
    },
});

export default GoogleHeader;
