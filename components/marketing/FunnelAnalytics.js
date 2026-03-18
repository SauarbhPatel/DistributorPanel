import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
    MaterialCommunityIcons,
    Ionicons,
    FontAwesome5,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const FunnelStep = ({
    label,
    value,
    percentage,
    icon,
    iconColors,
    barColor,
}) => (
    <View style={styles.stepRow}>
        <View style={styles.labelRow}>
            <View style={styles.iconAndText}>
                <LinearGradient colors={iconColors} style={styles.stepIconBox}>
                    {icon}
                </LinearGradient>
                <Text style={styles.stepLabelText}>{label}</Text>
            </View>
            <Text style={styles.stepValueText}>{value}</Text>
        </View>

        {/* Progress Bar Track */}
        <View style={styles.progressTrack}>
            <LinearGradient
                colors={barColor}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${percentage}%` }]}
            />
        </View>
    </View>
);

const FunnelAnalytics = () => {
    return (
        <View style={styles.cardContainer}>
            {/* Header Section */}
            <View style={styles.header}>
                <LinearGradient
                    colors={["#6366F1", "#A855F7"]}
                    style={styles.headerIcon}
                >
                    <MaterialCommunityIcons
                        name="target"
                        size={20}
                        color="#FFF"
                    />
                </LinearGradient>
                <View>
                    <Text style={styles.headerTitle}>Funnel (last 30d)</Text>
                    <Text style={styles.headerSubtitle}>
                        ViewContent → AddToCart → InitiateCheckout → Purchase
                    </Text>
                </View>
            </View>

            {/* Funnel Steps */}
            <View style={styles.stepsContainer}>
                <FunnelStep
                    label="ViewContent"
                    value="12,450"
                    percentage={100}
                    icon={<Ionicons name="eye" size={16} color="#FFF" />}
                    iconColors={["#2B7FFF", "#00B8DB"]}
                    barColor={["#2B7FFF", "#00B8DB"]}
                />

                <FunnelStep
                    label="AddToCart"
                    value="2,100"
                    percentage={25}
                    icon={
                        <MaterialCommunityIcons
                            name="cart"
                            size={16}
                            color="#FFF"
                        />
                    }
                    iconColors={["#AD46FF", "#F6339A"]}
                    barColor={["#AD46FF", "#F6339A"]}
                />

                <FunnelStep
                    label="InitiateCheckout"
                    value="890"
                    percentage={12}
                    icon={
                        <FontAwesome5
                            name="mouse-pointer"
                            size={14}
                            color="#FFF"
                        />
                    }
                    iconColors={["#F97316", "#FB923C"]}
                    barColor={["#F97316", "#FB923C"]}
                />

                <FunnelStep
                    label="Purchase"
                    value="156"
                    percentage={3}
                    icon={
                        <MaterialCommunityIcons
                            name="credit-card"
                            size={16}
                            color="#FFF"
                        />
                    }
                    iconColors={["#22C55E", "#10B981"]}
                    barColor={["#22C55E", "#10B981"]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerIcon: {
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
    stepsContainer: {
        padding: 16,
        gap: 20,
    },
    stepRow: {
        width: "100%",
    },
    labelRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    iconAndText: {
        flexDirection: "row",
        alignItems: "center",
    },
    stepIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    stepLabelText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#334155",
    },
    stepValueText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E293B",
    },
    progressTrack: {
        height: 6,
        backgroundColor: "#F1F5F9",
        borderRadius: 3,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 3,
    },
});

export default FunnelAnalytics;
