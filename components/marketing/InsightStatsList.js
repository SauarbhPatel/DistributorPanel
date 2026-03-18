import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const InsightCard = ({ item }) => {
    return (
        <LinearGradient
            colors={item.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
        >
            {/* Icon Wrapper with semi-transparent glass effect */}
            <View style={styles.iconWrapper}>
                <MaterialCommunityIcons
                    name={item.icon}
                    size={26}
                    color="#fff"
                />
            </View>

            {/* Text Content */}
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.valueText} numberOfLines={1}>
                {item.value}
            </Text>

            {/* Frosted Badge */}
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
        </LinearGradient>
    );
};

const InsightStatsList = () => {
    const stats = [
        {
            id: "1",
            label: "Top Performer",
            value: "Wireless Bluetooth Earphones",
            badge: "ROAS 18.2",
            icon: "trending-up",
            gradient: ["#2B7FFF", "#00B8DB", "#155DFC"],
        },
        {
            id: "2",
            label: "Average ROAS",
            value: "Across all products",
            badge: "15.4",
            icon: "inbox-outline",
            gradient: ["#AD46FF", "#F6339A", "#9810FA"],
        },
        {
            id: "3",
            label: "Total Products",
            value: "In catalog",
            badge: "5 SKUs",
            icon: "cart-outline",
            gradient: ["#00C950", "#00BC7D", "#00A63E"],
        },
    ];

    return (
        <View style={styles.scrollContainer}>
            {stats.map((item) => (
                <InsightCard key={item.id} item={item} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        marginTop: 16,
        gap: 16,
    },
    card: {
        width: "100%",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    iconWrapper: {
        width: 52,
        height: 52,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: "700",
        color: "#ffffff",
        marginBottom: 4,
    },
    valueText: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.85)",
        marginBottom: 16,
        textAlign: "center",
    },
    badge: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingHorizontal: 22,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    badgeText: {
        color: "#ffffff",
        fontWeight: "800",
        fontSize: 14,
    },
});

export default InsightStatsList;
