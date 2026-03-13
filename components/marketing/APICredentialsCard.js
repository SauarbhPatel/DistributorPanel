import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const APICredentialsCard = () => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <View style={styles.stepBadge}>
                        <Text style={styles.stepText}>3</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>
                            API Credentials & Configuration
                        </Text>
                        <Text style={styles.subtitle}>
                            Developer token and OAuth keys for secure access
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.body}>
                {/* Top Grid: Token and Client ID */}
                <View style={styles.gridRow}>
                    <View style={styles.inputCard}>
                        <View style={styles.inputHeader}>
                            <Feather name="lock" size={18} color="#475569" />
                            <Text style={styles.inputLabel}>
                                Developer Token
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Google Ads developer token"
                            placeholderTextColor="#94A3B8"
                        />
                        <Text style={styles.inputHint}>
                            Production environment requires valid token
                        </Text>
                    </View>

                    <View style={styles.inputCard}>
                        <View style={styles.inputHeader}>
                            <Feather name="shield" size={18} color="#475569" />
                            <Text style={styles.inputLabel}>
                                OAuth Client ID
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Google application credentials"
                            placeholderTextColor="#94A3B8"
                        />
                        <Text style={styles.inputHint}>
                            OAuth 2.0 client from Google Cloud Console
                        </Text>
                    </View>
                </View>

                {/* Bottom Section: Test Connection */}
                <View style={styles.testConnectionCard}>
                    <View style={styles.inputHeader}>
                        <MaterialCommunityIcons
                            name="target"
                            size={20}
                            color="#2563EB"
                        />
                        <Text style={[styles.inputLabel, { color: "#1E293B" }]}>
                            Test Connection
                        </Text>
                    </View>

                    <View style={styles.testInputWrapper}>
                        <TextInput
                            style={[styles.input, { flex: 1, marginBottom: 0 }]}
                            placeholder="Enter test email or account ID"
                            placeholderTextColor="#94A3B8"
                        />
                        <TouchableOpacity activeOpacity={0.8}>
                            <LinearGradient
                                colors={["#3B82F6", "#2563EB"]}
                                style={styles.testButton}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <MaterialCommunityIcons
                                    name="lightning-bolt"
                                    size={16}
                                    color="white"
                                />
                                <Text style={styles.buttonText}>Test Now</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginTop: 10,
        overflow: "hidden",
    },
    headerContainer: {
        backgroundColor: "#F0F9FF", // Subtle blue tint
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    stepBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#0EA5E9",
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
    gridRow: {
        // flexDirection: "row",
        gap: 12,
        marginBottom: 16,
    },
    inputCard: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    inputHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    inputLabel: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: "600",
        color: "#334155",
    },
    input: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: "#1E293B",
        marginBottom: 8,
    },
    inputHint: {
        fontSize: 11,
        color: "#94A3B8",
    },
    testConnectionCard: {
        backgroundColor: "#F0F9FF",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#BAE6FD",
    },
    testInputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    testButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "600",
        marginLeft: 6,
        fontSize: 14,
    },
});

export default APICredentialsCard;
