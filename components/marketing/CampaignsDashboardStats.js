import React from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
    MaterialCommunityIcons,
    FontAwesome5,
    Feather,
} from "@expo/vector-icons";

const { width } = Dimensions.get("window");
// Adjusting width to fit 2 cards per row with padding
const CARD_WIDTH = (width - 36) / 2;

const StatCard = ({ label, value, icon, bgColors, iconColors }) => (
    <LinearGradient
        colors={bgColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
    >
        <View style={styles.contentRow}>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.valueText}>{value}</Text>
            </View>
            <LinearGradient colors={iconColors} style={styles.iconContainer}>
                {icon}
            </LinearGradient>
        </View>
    </LinearGradient>
);

const DashboardStats = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.row}>
                <StatCard
                    label="Total Campaigns"
                    value="3"
                    icon={
                        <MaterialCommunityIcons
                            name="bullhorn-variant-outline"
                            size={18}
                            color="white"
                        />
                    }
                    bgColors={["#E3F5FF", "#F0F9FF"]}
                    iconColors={["#2B7FFF", "#00B8DB"]}
                />

                <StatCard
                    label="Total Spend"
                    value="₹24,700"
                    icon={
                        <FontAwesome5
                            name="rupee-sign"
                            size={16}
                            color="white"
                        />
                    }
                    bgColors={["#FDF2F8", "#F5F3FF"]}
                    iconColors={["#C084FC", "#DB2777"]}
                />

                <StatCard
                    label="Total Purchases"
                    value="135"
                    icon={
                        <MaterialCommunityIcons
                            name="cart-outline"
                            size={20}
                            color="white"
                        />
                    }
                    bgColors={["#F0FDF4", "#DCFCE7"]}
                    iconColors={["#4ADE80", "#00C853"]}
                />

                <StatCard
                    label="Avg ROAS"
                    value="12.00"
                    icon={
                        <Feather name="trending-up" size={18} color="white" />
                    }
                    bgColors={["#FFFBEB", "#FEF3C7"]}
                    iconColors={["#FB923C", "#F97316"]}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        width: CARD_WIDTH,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    contentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 13,
        color: "#475569",
        fontWeight: "600",
        marginBottom: 12,
    },
    valueText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1E293B",
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 4,
        elevation: 1,
    },
});

export default DashboardStats;
