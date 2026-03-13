import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
    MaterialCommunityIcons,
    FontAwesome5,
    Ionicons,
} from "@expo/vector-icons";

const EnvironmentBox = () => {
    const options = [
        {
            icon: (
                <MaterialCommunityIcons
                    name="play-circle-outline"
                    size={32}
                    color="white"
                />
            ),
            name: "Demo Mode",
            description:
                "Simulated calls, campaigns created internally, extreme convenience for QA and testing.",
            tags: [
                { text: "NO BILLING", color: "#F3E5F5", textColor: "#9C27B0" },
                {
                    text: "INSTANT SETUP",
                    color: "#E8F5E9",
                    textColor: "#4CAF50",
                },
            ],
            colors: ["#C27AFF", "#AD46FF"],
        },
        {
            icon: <FontAwesome5 name="flask" size={26} color="white" />,
            name: "Test Mode",
            description:
                "Google Ads API test accounts, make campaigns safely without billing or risk.",
            tags: [
                { text: "SANDBOX", color: "#E3F2FD", textColor: "#2196F3" },
                {
                    text: "SAFE TESTING",
                    color: "#FFF3E0",
                    textColor: "#FF9800",
                },
            ],
            colors: ["#51A2FF", "#00B8DB"],
        },
        {
            icon: (
                <MaterialCommunityIcons
                    name="rocket-launch-outline"
                    size={30}
                    color="white"
                />
            ),
            name: "Production",
            description:
                "Real Google Ads with Merchant Center, live campaigns and actual billing.",
            tags: [
                { text: "LIVE MODE", color: "#FFEBEE", textColor: "#F44336" },
                {
                    text: "REAL BILLING",
                    color: "#E8F5E9",
                    textColor: "#4CAF50",
                },
            ],
            colors: ["#FF8904", "#FB2C36"],
        },
    ];

    return (
        <View style={styles.outerContainer}>
            <View style={styles.headerRow}>
                <View style={styles.stepBadge}>
                    <Text style={styles.stepText}>1</Text>
                </View>
                <View>
                    <Text style={styles.title}>Select Environment Mode</Text>
                    <Text style={styles.subtitle}>
                        Choose how you want to interact with Google Ads
                    </Text>
                </View>
            </View>

            <View style={styles.cardsRow}>
                {options.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.card}>
                        <LinearGradient
                            colors={item.colors}
                            style={styles.iconBox}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {item.icon}
                        </LinearGradient>

                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardDesc}>{item.description}</Text>

                        <View style={styles.tagWrapper}>
                            {item.tags.map((tag, tIdx) => (
                                <View
                                    key={tIdx}
                                    style={[
                                        styles.tag,
                                        { backgroundColor: tag.color },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.tagText,
                                            { color: tag.textColor },
                                        ]}
                                    >
                                        {tag.text}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginTop: 10,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 15,
        backgroundColor: "#EFF6FF",
        padding: 16,
    },
    stepBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        marginTop: 2,
    },
    stepText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 14,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    subtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
    },
    cardsRow: {
        justifyContent: "space-between",
        gap: 12,
        marginHorizontal: 10,
        marginBottom: 15,
    },
    card: {
        flex: 1,
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 0.5,
    },
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#334155",
        marginBottom: 8,
    },
    cardDesc: {
        fontSize: 13,
        color: "#64748B",
        lineHeight: 18,
        marginBottom: 16,
    },
    tagWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        marginTop: "auto",
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 10,
        fontWeight: "800",
    },
});

export default EnvironmentBox;
