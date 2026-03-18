import React from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const VerticalSpendCard = ({ label, value, icon, iconColors, bgColors }) => (
    <View style={[styles.card, { backgroundColor: bgColors[0] }]}>
        <View style={styles.cardContent}>
            <LinearGradient colors={iconColors} style={styles.iconBox}>
                <MaterialCommunityIcons name={icon} size={24} color="#FFF" />
            </LinearGradient>

            <View style={styles.textContainer}>
                <Text style={styles.cardLabel}>{label}</Text>
                <Text style={styles.cardValue}>{value}</Text>
            </View>
        </View>
    </View>
);

const BillingDashboard = () => {
    return (
        <View style={styles.container}>
            {/* 1. Page Header */}
            <View style={styles.header}>
                <LinearGradient
                    colors={["#6366F1", "#A855F7"]}
                    style={styles.headerIconBox}
                >
                    <MaterialCommunityIcons
                        name="chart-bar"
                        size={22}
                        color="#FFF"
                    />
                </LinearGradient>
                <View>
                    <Text style={styles.headerTitle}>Billing / Spend</Text>
                    <Text style={styles.headerSubtitle}>
                        Read-only view of ad spend (demo).
                    </Text>
                </View>
            </View>

            <View style={styles.verticalStack}>
                <VerticalSpendCard
                    label="Spend today"
                    value="₹1,200"
                    icon="eye-outline"
                    bgColors={["#EFF6FF"]}
                    iconColors={["#2B7FFF", "#00B8DB"]}
                />

                <VerticalSpendCard
                    label="Spend this week"
                    value="₹18,500"
                    icon="cart-outline"
                    bgColors={["#FAF5FF"]}
                    iconColors={["#AD46FF", "#F6339A"]}
                />

                <VerticalSpendCard
                    label="Spend this month"
                    value="₹62,400"
                    icon="account-group-outline"
                    bgColors={["#F0FDF4"]}
                    iconColors={["#00C950", "#00BC7D"]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 5,
    },
    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerIconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
    },
    verticalStack: { gap: 16, padding: 16 },
    card: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.03)",
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
    },
    textContainer: { flex: 1 },
    cardLabel: {
        fontSize: 12,
        color: "#64748B",
        fontWeight: "600",
        marginBottom: 4,
    },
    cardValue: {
        fontSize: 16,
        fontWeight: "800",
        color: "#1E293B",
    },
});

export default BillingDashboard;
