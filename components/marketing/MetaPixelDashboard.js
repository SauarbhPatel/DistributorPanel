import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
    MaterialCommunityIcons,
    Feather,
    Octicons,
    Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ActionButton = ({ label, secondary = false, icon, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
            styles.buttonBase,
            secondary ? styles.buttonSecondary : styles.buttonPrimary,
        ]}
    >
        {icon && (
            <MaterialCommunityIcons
                name={icon}
                size={20}
                color={secondary ? "#64748B" : "#FFF"}
                style={{ marginRight: 6 }}
            />
        )}
        <Text
            style={[
                styles.buttonText,
                secondary
                    ? styles.buttonTextSecondary
                    : styles.buttonTextPrimary,
            ]}
        >
            {label}
        </Text>
    </TouchableOpacity>
);

const MetaPixelDashboard = () => {
    const pixelID = "1234567890123456";

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                {/* Header */}
                <View style={styles.header}>
                    <LinearGradient
                        colors={["#AD46FF", "#F6339A"]}
                        style={styles.iconBox}
                    >
                        <Octicons name="pulse" size={24} color="#ffffff" />
                    </LinearGradient>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>
                            Meta Pixel (Web events)
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            Pixel base code in header; standard events:
                            ViewContent, AddToCart, InitiateCheckout, Purchase.
                        </Text>
                    </View>
                </View>

                {/* Pixel Info Text */}
                <Text style={styles.pixelNameText}>
                    Baofeng Web Pixel · ID: {pixelID}
                </Text>

                {/* ID Field */}
                <View style={styles.idContainer}>
                    <View style={styles.idInputBox}>
                        <Text style={styles.idText}>{pixelID}</Text>
                    </View>
                    <TouchableOpacity style={styles.copyButton}>
                        <Feather name="copy" size={18} color="#64748B" />
                    </TouchableOpacity>
                </View>

                {/* Events Card */}
                <View style={styles.eventsCard}>
                    <View style={styles.eventsLabelContainer}>
                        <MaterialCommunityIcons
                            name="lightning-bolt"
                            size={20}
                            color="#C026D3"
                        />
                        <Text style={styles.eventsLabelText}>
                            Events today:
                        </Text>
                    </View>
                    <Text style={styles.eventCountText}>1,247</Text>
                </View>

                {/* Primary Action Buttons Row */}
                <View style={styles.buttonRow}>
                    <LinearGradient
                        colors={["#9810FA", "#E60076"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButtonWrapper}
                    >
                        <TouchableOpacity style={styles.transparentButton}>
                            <Text style={styles.buttonTextPrimary}>
                                Test events
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <ActionButton
                        label="Event log"
                        secondary
                        onPress={() => {}}
                    />
                </View>
            </View>

            {/* Bottom Status Section */}
            <View style={styles.statusSection}>
                <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color="#A855F7"
                />
                <Text style={styles.statusText}>Active & tracking</Text>
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
        marginTop: 5,
    },
    topSection: {
        padding: 16,
        backgroundColor: "#FDF4FF",
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 20,
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
    headerTextContainer: {
        flex: 1,
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
    pixelNameText: {
        fontSize: 14,
        color: "#64748B",
        marginBottom: 10,
    },
    idContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 8,
    },
    idInputBox: {
        flex: 1,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    idText: {
        fontSize: 14,
        color: "#334155",
        fontFamily: "System",
    },
    copyButton: {
        width: 44,
        height: 44,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
    },
    eventsCard: {
        backgroundColor: "#FAF5FF",
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#E9D4FF",
        padding: 20,
        marginBottom: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    eventsLabelContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    eventsLabelText: {
        fontSize: 15,
        color: "#64748B",
        fontWeight: "500",
    },
    eventCountText: {
        fontSize: 25,
        fontWeight: "700",
        color: "#1E293B",
    },
    buttonRow: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    gradientButtonWrapper: {
        flex: 1,
        borderRadius: 12,
    },
    transparentButton: {
        height: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonBase: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    buttonSecondary: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
    },
    buttonTextPrimary: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "600",
    },
    buttonTextSecondary: {
        color: "#1E293B",
    },
    statusSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
    },
    statusText: {
        fontSize: 15,
        color: "#A855F7", // Purple status color
        fontWeight: "600",
    },
});

export default MetaPixelDashboard;
