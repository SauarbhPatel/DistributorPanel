import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const StatRow = ({ label, value }) => (
    <View style={styles.statRow}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
    </View>
);

const QuickStats = () => {
    return (
        <LinearGradient
            colors={["#4F39F6", "#9810FA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Feather name="trending-up" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.headerTitle}>Quick Stats</Text>
            </View>

            {/* Stats List */}
            <View style={styles.statsContainer}>
                <StatRow label="Active Campaigns" value="3" />
                <StatRow label="Total Sellers" value="12" />
                <StatRow label="This Month Spend" value="₹45,230" />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        padding: 16,
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    statsContainer: {
        gap: 12,
    },
    statRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    statLabel: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.9)",
        fontWeight: "500",
    },
    statValue: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "700",
    },
});

export default QuickStats;
