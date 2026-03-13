import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const readinessData = [
    {
        id: 1,
        title: "Google Ads",
        status: "Demo - Not connected",
        icon: "alert-circle-outline",
        color: "#F97316", // Orange
        bgColor: "#ffffff",
        borderColor: "#FFEDD5",
    },
    {
        id: 2,
        title: "Merchant Center",
        status: "Demo - Not connected",
        icon: "alert-circle-outline",
        color: "#F97316", // Orange
        bgColor: "#ffffff",
        borderColor: "#FFEDD5",
    },
    {
        id: 3,
        title: "Product sync",
        status: "Never synced",
        icon: "close-circle-outline",
        color: "#64748B", // Slate
        bgColor: "#ffffff",
        borderColor: "#E2E8F0",
    },
    {
        id: 4,
        title: "Conversion tracking",
        status: "Configured",
        icon: "check-circle-outline",
        color: "#10B981", // Green
        bgColor: "#F0FDF4",
        borderColor: "#DCFCE7",
    },
];

const ReadinessCheck = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Feather name="info" size={18} color="#1E293B" />
                <Text style={styles.headerTitle}>Readiness check</Text>
            </View>
            <Text style={styles.headerSub}>
                A single screen verifies readiness before campaigns are created.
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {readinessData.map((item) => (
                    <View
                        key={item.id}
                        style={[
                            styles.statusCard,
                            {
                                backgroundColor: item.bgColor,
                                borderColor: item.borderColor,
                            },
                        ]}
                    >
                        <View style={styles.cardTop}>
                            <View
                                style={[
                                    styles.iconBox,
                                    { backgroundColor: item.borderColor },
                                ]}
                            >
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={20}
                                    color={item.color}
                                />
                            </View>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                        </View>
                        <Text
                            style={[styles.statusText, { color: item.color }]}
                        >
                            {item.status}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginLeft: 8,
    },
    headerSub: {
        fontSize: 13,
        color: "#64748B",
        marginBottom: 16,
    },
    scrollContainer: {
        paddingRight: 20,
    },
    statusCard: {
        width: 220,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        marginRight: 12,
        justifyContent: "center",
    },
    cardTop: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
    },
    statusText: {
        fontSize: 12,
        fontWeight: "500",
    },
});

export default ReadinessCheck;
