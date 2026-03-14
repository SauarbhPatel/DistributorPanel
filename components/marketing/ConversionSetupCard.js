import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ConversionSetupCard = () => {
    return (
        <View style={styles.container}>
            {/* Warning Banner */}
            <View style={styles.bannerContainer}>
                <View style={styles.orangeLeftAccent} />

                <View style={styles.bannerContent}>
                    <View style={styles.headerRow}>
                        <View style={styles.warningIconBox}>
                            <Ionicons
                                name="alert-circle-outline"
                                size={24}
                                color="#fff"
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.bannerTitle}>
                                Finish conversion measurement setup
                            </Text>
                            <Text style={styles.bannerDescription}>
                                Complete the conversion measurement flow to
                                enable ad creation and unlock advanced campaign
                                analytics.
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.setupButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.setupButtonText}>
                            Set up conversion measurement
                        </Text>
                        <Feather
                            name="external-link"
                            size={14}
                            color="#7c2d12"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Action Buttons Row */}
            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.manageButton}>
                    <Feather name="menu" size={18} color="#1e293b" />
                    <Text style={styles.manageButtonText}>
                        Manage existing ads
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.9}>
                    <LinearGradient
                        colors={["#2563eb", "#3b82f6"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.createButton}
                    >
                        <Feather name="plus" size={18} color="#fff" />
                        <Text style={styles.createButtonText}>
                            Create new ad
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingTop: 15,
    },
    bannerContainer: {
        backgroundColor: "#fff7ed", // Very light orange
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#fed7aa",
        flexDirection: "row",
        overflow: "hidden",
        marginBottom: 16,
    },
    orangeLeftAccent: {
        width: 6,
        backgroundColor: "#f97316",
    },
    bannerContent: {
        flex: 1,
        padding: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    warningIconBox: {
        backgroundColor: "#f97316",
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#f97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    textContainer: {
        flex: 1,
        marginLeft: 14,
    },
    bannerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#7c2d12",
        marginBottom: 4,
    },
    bannerDescription: {
        fontSize: 13,
        color: "#9a3412",
        lineHeight: 18,
    },
    setupButton: {
        backgroundColor: "#fff",
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fdba74",
        gap: 8,
    },
    setupButtonText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#7c2d12",
    },
    actionRow: {
        flexDirection: "row",
        gap: 12,
    },
    manageButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    manageButtonText: {
        fontSize: 12.5,
        fontWeight: "600",
        color: "#1e293b",
    },
    createButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
        shadowColor: "#2563eb",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    createButtonText: {
        fontSize: 12.5,
        fontWeight: "600",
        color: "#fff",
    },
});

export default ConversionSetupCard;
