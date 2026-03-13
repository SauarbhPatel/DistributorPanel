import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const FunnelCard = () => {
    const data = [
        {
            label: "Visitors",
            value: 100,
            colors: ["#3B82F6", "#2563EB"], // Blue gradient
        },
        {
            label: "Add to Cart",
            value: 65,
            colors: ["#A855F7", "#7C3AED"], // Purple gradient
        },
        {
            label: "Checkout",
            value: 45,
            colors: ["#F97316", "#EA580C"], // Orange gradient
        },
        {
            label: "Orders",
            value: 28,
            colors: ["#10B981", "#059669"], // Green gradient
        },
    ];

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Conversion funnel</Text>

            {data.map((item, index) => (
                <View key={index} style={styles.funnelItem}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={styles.percentage}>{item.value}%</Text>
                    </View>

                    <View style={styles.barContainer}>
                        {/* The actual progress bar with Gradient */}
                        <LinearGradient
                            colors={item.colors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[
                                styles.barFill,
                                { width: `${item.value}%` },
                            ]}
                        />
                    </View>
                </View>
            ))}
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
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 24,
    },
    funnelItem: {
        marginBottom: 20,
    },
    labelRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    label: {
        color: "#6B7280",
        fontSize: 12,
        fontWeight: "500",
    },
    percentage: {
        color: "#111827",
        fontSize: 12,
        fontWeight: "700",
    },
    barContainer: {
        height: 38,
        width: "100%",
        backgroundColor: "transparent",
    },
    barFill: {
        height: "100%",
        borderRadius: 12, // More rounded for that modern look
    },
});

export default FunnelCard;
