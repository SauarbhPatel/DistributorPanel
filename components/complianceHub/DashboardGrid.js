import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARD_WIDTH = width / 2 - 15;

const StatCard = ({ title, count, icon, color, bgColor }) => (
    <View style={[styles.card, { borderTopColor: color }]}>
        <View style={[styles.iconWrapper, { backgroundColor: bgColor }]}>
            <MaterialCommunityIcons name={icon} size={20} color={color} />
        </View>

        <Text style={styles.countText}>{count}</Text>
        <Text style={styles.titleText}>{title}</Text>
    </View>
);

const DashboardGrid = () => {
    const stats = [
        {
            id: 1,
            title: "Jurisdictions",
            count: 3,
            icon: "web",
            color: "#2563EB",
            bgColor: "#EFF6FF",
        },
        {
            id: 2,
            title: "Document Types",
            count: 4,
            icon: "file-document-outline",
            color: "#059669",
            bgColor: "#ECFDF5",
        },
        {
            id: 3,
            title: "Compliance Sets",
            count: 0,
            icon: "shield-outline",
            color: "#D97706",
            bgColor: "#FFFBEB",
        },
        {
            id: 4,
            title: "Active Policies",
            count: 0,
            icon: "check-circle-outline",
            color: "#E11D48",
            bgColor: "#FFF1F2",
        },
    ];

    return (
        <View style={styles.gridContainer}>
            {stats.map((item) => (
                <StatCard key={item.id} {...item} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
        marginTop: 10,
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        borderTopWidth: 4,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    countText: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 4,
    },
    titleText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#6B7280",
    },
});

export default DashboardGrid;
