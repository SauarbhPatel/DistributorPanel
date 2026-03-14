import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const FieldMappingCard = () => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.contentRow}>
                {/* Left Icon Section */}
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="settings-outline"
                        size={22}
                        color="#2563eb"
                    />
                </View>

                {/* Text Section */}
                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.titleText}>
                            Step 2–5: Field mapping, feed mode, validation &
                            scheduling
                        </Text>
                        <View style={styles.stepBadge}>
                            <Text style={styles.stepBadgeText}>STEPS 2-5</Text>
                        </View>
                    </View>

                    <Text style={styles.descriptionText}>
                        5 products from{" "}
                        <Text style={{ fontWeight: "600" }}>My Listings</Text> ·
                        Last sync:{" "}
                        <Text style={{ fontWeight: "600", color: "#1e293b" }}>
                            Never
                        </Text>
                    </Text>
                </View>
            </View>

            {/* Action Buttons Row */}
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    activeOpacity={0.8}
                >
                    <MaterialCommunityIcons
                        name="sync"
                        size={18}
                        color="#fff"
                    />
                    <Text style={styles.primaryButtonText}>Sync Feed</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton}>
                    <Feather name="file-text" size={16} color="#1e293b" />
                    <Text style={styles.secondaryButtonText}>
                        Validation Report
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ ...styles.buttonRow, marginTop: 10 }}>
                <TouchableOpacity style={styles.secondaryButton}>
                    <Feather name="link-2" size={16} color="#1e293b" />
                    <Text style={styles.secondaryButtonText}>Feed URL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton}>
                    <Feather name="external-link" size={16} color="#1e293b" />
                    <Text style={styles.secondaryButtonText}>
                        Open My Listings
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    contentRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    iconContainer: {
        backgroundColor: "#eff6ff",
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 4,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
        marginRight: 10,
    },
    stepBadge: {
        backgroundColor: "#dbeafe",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 10,
    },
    stepBadgeText: {
        fontSize: 9,
        fontWeight: "700",
        color: "#2563eb",
    },
    descriptionText: {
        fontSize: 13,
        color: "#64748b",
    },
    buttonRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    primaryButton: {
        backgroundColor: "#1d4ed8",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        gap: 8,
        flex: 1,
        borderWidth: 1,
        borderColor: "#1d4ed8",
        justifyContent: "center",
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },
    secondaryButton: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        gap: 8,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        flex: 1,
        justifyContent: "center",
    },
    secondaryButtonText: {
        color: "#1e293b",
        fontSize: 13,
        fontWeight: "500",
    },
});

export default FieldMappingCard;
