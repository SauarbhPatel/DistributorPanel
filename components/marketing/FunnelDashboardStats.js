import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Built into Expo

const StatCard = ({ title, value, iconName, colors }) => (
    <View style={styles.card}>
        <View style={styles.contentContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.valueText}>{value}</Text>
        </View>

        <LinearGradient colors={colors} style={styles.iconBox}>
            <MaterialCommunityIcons name={iconName} size={28} color="white" />
        </LinearGradient>
    </View>
);

const FunnelDashboardStats = () => {
    return (
        <View style={styles.container}>
            <StatCard
                title="Overall Conversion Rate"
                value="1.25%"
                iconName="percent"
                colors={["#1DA1F2", "#00D2FF"]}
            />
            <StatCard
                title="Average Drop-off"
                value="74.4%"
                iconName="trending-down"
                colors={["#FF5F6D", "#FFC371"]}
            />
            <StatCard
                title="Total Users"
                value="12,450"
                iconName="account-group"
                colors={["#D633FF", "#FF33B5"]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        gap: 16,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    contentContainer: {
        flex: 1,
    },
    titleText: {
        fontSize: 14,
        color: "#64748b",
        marginBottom: 8,
        fontWeight: "500",
    },
    valueText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1e293b",
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,
    },
});
export default FunnelDashboardStats;
