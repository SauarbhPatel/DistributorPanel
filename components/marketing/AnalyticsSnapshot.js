import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const AnalyticsSnapshot = () => {
    const metrics = [
        {
            label: "WoW Revenue (all period)",
            value: "7.5x",
            color: "#3B82F6",
            bgColor: "#EFF6FF",
            trend: "trending-up",
        },
        {
            label: "Bounce rate (daily)",
            value: "55.2%",
            color: "#A855F7",
            bgColor: "#FAF5FF",
            trend: "trending-down",
        },
        {
            label: "WoW Conversion rate",
            value: "32.0%",
            color: "#10B981",
            bgColor: "#F0FDF4",
            trend: "trending-up",
        },
        {
            label: "Avg session / user (daily)",
            value: "83.4%",
            color: "#F97316",
            bgColor: "#FFF7ED",
            trend: "trending-up",
        },
    ];

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <MaterialCommunityIcons
                    name="chart-bar"
                    size={20}
                    color="#3B82F6"
                />
                <Text style={styles.title}>Analytics snapshot</Text>
            </View>

            {metrics.map((item, index) => (
                <View
                    key={index}
                    style={[
                        styles.metricRow,
                        { backgroundColor: item.bgColor },
                    ]}
                >
                    <View>
                        <Text style={styles.metricLabel}>{item.label}</Text>
                        <Text
                            style={[styles.metricValue, { color: item.color }]}
                        >
                            {item.value}
                        </Text>
                    </View>
                    <Feather name={item.trend} size={24} color={item.color} />
                </View>
            ))}

            <TouchableOpacity style={styles.footerLink}>
                <Text style={styles.footerText}>Open Google Analytics </Text>
                <Feather name="arrow-right" size={14} color="#3B82F6" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 20,
        margin: 10,
        borderWidth: 1,
        borderColor: "#F3F4F6",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1F2937",
        marginLeft: 8,
    },
    metricRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    metricLabel: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 20,
        fontWeight: "700",
    },
    footerLink: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    footerText: {
        color: "#3B82F6",
        fontWeight: "600",
        fontSize: 14,
    },
});

export default AnalyticsSnapshot;
