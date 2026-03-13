import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

const AccessControlCard = () => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <LinearGradient
                        colors={["#FF8A00", "#FF5C00"]}
                        style={styles.stepBadge}
                    >
                        <Text style={styles.stepText}>5</Text>
                    </LinearGradient>
                    <View>
                        <Text style={styles.title}>
                            Access Control & Permissions
                        </Text>
                        <Text style={styles.subtitle}>
                            Configure seller permissions and approval workflows
                        </Text>
                    </View>
                </View>
            </View>

            {/* Body Section */}
            <View style={styles.body}>
                <View style={styles.row}>
                    {/* Sellers Creation Box */}
                    <TouchableOpacity
                        style={[styles.optionBox, styles.blueBox]}
                    >
                        <View style={styles.optionHeader}>
                            <Feather name="lock" size={18} color="#2563EB" />
                            <Text style={styles.optionTitle}>
                                Sellers can create campaigns
                            </Text>
                        </View>
                        <Text style={styles.optionDesc}>
                            Allow sellers to create and edit their own
                            advertising campaigns
                        </Text>
                    </TouchableOpacity>

                    {/* Admin Approval Box */}
                    <TouchableOpacity
                        style={[styles.optionBox, styles.purpleBox]}
                    >
                        <View style={styles.optionHeader}>
                            <Feather name="shield" size={18} color="#7C3AED" />
                            <Text style={styles.optionTitle}>
                                Require admin approval
                            </Text>
                        </View>
                        <Text style={styles.optionDesc}>
                            Campaigns must be approved before going live
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderRadius: 12,

        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        // elevation: 2,
        marginTop: 10,
    },
    headerContainer: {
        backgroundColor: "#FFFBEB", // Warm amber tint
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    stepBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
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
    body: {
        padding: 10,
        paddingTop: 15,
    },
    row: {
        gap: 16,
    },
    optionBox: {
        flex: 1,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
    },
    blueBox: {
        backgroundColor: "#F0F9FF",
        borderColor: "#BAE6FD",
    },
    purpleBox: {
        backgroundColor: "#FAF5FF",
        borderColor: "#E9D5FF",
    },
    optionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    optionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
        marginLeft: 10,
    },
    optionDesc: {
        fontSize: 13,
        color: "#64748B",
        lineHeight: 18,
        marginLeft: 28, // Aligns text under the title, not the icon
    },
});

export default AccessControlCard;
