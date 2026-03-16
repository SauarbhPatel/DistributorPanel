import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GoogleAccountCard = () => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.mainContent}>
                <View style={styles.headerRow}>
                    <LinearGradient
                        colors={["#FB2C36", "#FF6900"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.logoBox}
                    >
                        <Text style={styles.logoText}>G</Text>
                    </LinearGradient>
                    <Text style={styles.title}>Google Account</Text>
                </View>

                <Text style={styles.emailText}>support@baofengradios.com</Text>

                <TouchableOpacity
                    style={styles.disconnectButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.disconnectText}>Disconnect</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Connected Google services:{" "}
                    <Text style={styles.countText}>0</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    mainContent: {
        padding: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    logoBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    logoText: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "bold",
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    emailText: {
        fontSize: 14,
        color: "#64748B",
        marginBottom: 20,
    },
    disconnectButton: {
        width: "100%",
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#FDA4AF",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    disconnectText: {
        color: "#E11D48",
        fontSize: 15,
        fontWeight: "600",
    },
    footer: {
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    footerText: {
        fontSize: 13,
        color: "#64748B",
        fontWeight: "500",
    },
    countText: {
        color: "#1E293B",
        fontWeight: "700",
    },
});

export default GoogleAccountCard;
