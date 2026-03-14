import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
    MaterialCommunityIcons,
    AntDesign,
    Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const YouTubePolicyCard = ({ stepNumber }) => {
    const options = [
        {
            id: 1,
            title: "Seller may use seller assets (Custom/default)",
            subtitle:
                "Sellers can choose between custom or default platform assets",
            selected: true,
        },
        {
            id: 2,
            title: "Seller uploads assets to Creative Library",
            subtitle: "Sellers upload their own creative assets for campaigns",
            selected: false,
        },
        {
            id: 3,
            title: "Admin provides default YouTube assets",
            subtitle:
                "Platform admin manages and provides default YouTube assets",
            selected: false,
        },
    ];

    return (
        <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.headerRow}>
                <View style={styles.iconWrapper}>
                    <AntDesign name="youtube" size={20} color="#ef4444" />
                </View>

                <View style={styles.titleContainer}>
                    <View style={styles.badgeRow}>
                        <Text style={styles.titleText}>
                            YouTube asset policy (optional)
                        </Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>OPTIONAL</Text>
                        </View>
                    </View>
                    <Text style={styles.descriptionText}>
                        If you may enable ad placements (skippable In-feed to
                        Children Library, seller provides default assets, or
                        selects placeholders.
                    </Text>
                </View>

                <LinearGradient
                    colors={["#f87171", "#ef4444"]}
                    style={styles.stepBadge}
                >
                    <Text style={styles.stepNumberText}>{stepNumber}</Text>
                </LinearGradient>
            </View>

            {/* Selection Area */}
            <View style={styles.selectionArea}>
                <View style={styles.sectionHeader}>
                    <Ionicons
                        name="sparkles-outline"
                        size={16}
                        color="#ef4444"
                    />
                    <Text style={styles.sectionTitle}>Asset Source Policy</Text>
                </View>

                {options.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.radioOption,
                            option.selected && styles.selectedRadioOption,
                        ]}
                        activeOpacity={0.7}
                    >
                        <View
                            style={[
                                styles.radioButton,
                                option.selected && styles.selectedRadioButton,
                            ]}
                        >
                            {option.selected && (
                                <View style={styles.radioInner} />
                            )}
                        </View>
                        <View style={styles.radioTextContainer}>
                            <Text style={styles.optionTitle}>
                                {option.title}
                            </Text>
                            <Text style={styles.optionSubtitle}>
                                {option.subtitle}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        backgroundColor: "#fef2f2",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        flex: 1,
        marginLeft: 12,
        paddingRight: 35,
    },
    badgeRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 6,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
        marginRight: 8,
    },
    badge: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 10,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#45556C",
    },
    descriptionText: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 18,
    },
    stepBadge: {
        width: 32,
        height: 32,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: -5,
        top: 0,
    },
    stepNumberText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    selectionArea: {
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "#475569",
        marginLeft: 8,
    },
    radioOption: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        alignItems: "center",
        marginBottom: 10,
    },
    selectedRadioOption: {
        borderColor: "#fecaca", // Reddish tint for selected YouTube policy
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#cbd5e1",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        marginBottom: "auto",
        marginTop: 5,
    },
    selectedRadioButton: {
        borderColor: "#10b981", // Matches the teal/green select in your image
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#10b981",
    },
    radioTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1e293b",
    },
    optionSubtitle: {
        fontSize: 11,
        color: "#94a3b8",
        marginTop: 2,
    },
});

export default YouTubePolicyCard;
