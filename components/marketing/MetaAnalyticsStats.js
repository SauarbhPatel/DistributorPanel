import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
const StatCard = ({ label, value, icon, iconColors, bgColors }) => (
    <View style={[styles.card, { backgroundColor: bgColors[0] }]}>
        <View style={styles.contentRow}>
            <View style={styles.textStack}>
                <Text style={styles.label}>{label.toUpperCase()}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
            <LinearGradient
                colors={iconColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBox}
            >
                <MaterialCommunityIcons name={icon} size={16} color="#FFF" />
            </LinearGradient>
        </View>
    </View>
);

const MetaAnalyticsStats = () => {
    const statsData = [
        {
            label: "Spend",
            value: "₹24,700",
            icon: "currency-usd",
            iconColors: ["#2B7FFF", "#00B8DB"],
            bgColors: ["#F0F9FF"],
        },
        {
            label: "Purchases",
            value: "135",
            icon: "cart-outline",
            iconColors: ["#34D399", "#059669"],
            bgColors: ["#F0FDF4"],
        },
        {
            label: "ROAS",
            value: "11.90",
            icon: "trending-up",
            iconColors: ["#A855F7", "#D946EF"],
            bgColors: ["#FAF5FF"],
        },
        {
            label: "Revenue",
            value: "₹2,94,000",
            icon: "cash-multiple",
            iconColors: ["#FB923C", "#F97316"],
            bgColors: ["#FFF7ED"],
        },
    ];

    return (
        <View style={styles.gridContainer}>
            {statsData.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 16,
        gap: 10,
    },
    card: {
        width: (width - 30) / 2,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
    },
    contentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    textStack: {
        flex: 1,
        marginRight: 4,
    },
    label: {
        fontSize: 10,
        fontWeight: "700",
        color: "#64748B",
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    value: {
        fontSize: 16,
        fontWeight: "800",
        color: "#1E293B",
    },
    iconBox: {
        width: 28,
        height: 28,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default MetaAnalyticsStats;
