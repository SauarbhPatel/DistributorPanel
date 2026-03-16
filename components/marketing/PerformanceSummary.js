import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StatRow = ({ label, value, valueColor = "#1E293B" }) => (
    <View style={styles.statRow}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
    </View>
);

const PerformanceSummary = () => {
    return (
        <View style={styles.container}>
            {/* Header Section with Purple Tint */}
            <View style={styles.header}>
                <MaterialCommunityIcons
                    name="trending-up"
                    size={20}
                    color="#8B5CF6"
                />
                <Text style={styles.headerTitle}>Performance Summary</Text>
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
                <StatRow label="Impressions" value="12.4K" />
                <StatRow label="Clicks" value="847" />
                <StatRow
                    label="CTR"
                    value="6.82%"
                    valueColor="#10B981" // Green for positive metric
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    header: {
        backgroundColor: "#FAF5FF",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 18,
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    statsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: 25,
    },
    statRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
    },
    statLabel: {
        fontSize: 14,
        color: "#64748B",
        fontWeight: "500",
    },
    statValue: {
        fontSize: 14,
        fontWeight: "600",
    },
});

export default PerformanceSummary;
