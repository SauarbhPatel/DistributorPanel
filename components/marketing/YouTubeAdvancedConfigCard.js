import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Linking,
} from "react-native";
import { MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const YouTubeAdvancedConfigCard = ({ stepNumber }) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <View style={styles.iconWrapper}>
                    <AntDesign name="youtube" size={20} color="#ef4444" />
                </View>

                <View style={styles.titleContainer}>
                    <View style={styles.badgeRow}>
                        <Text style={styles.titleText}>
                            YouTube configuration — push videos to channel
                        </Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>ADVANCED</Text>
                        </View>
                    </View>
                    <Text style={styles.descriptionText}>
                        Configure these requirements for players can be posted
                        directly from this panel to your YouTube channel via the
                        YouTube Data API:
                    </Text>
                </View>

                <LinearGradient
                    colors={["#E7000B", "#C10007"]}
                    style={styles.stepBadge}
                >
                    <Text style={styles.stepNumberText}>{stepNumber}</Text>
                </LinearGradient>
            </View>

            <View style={styles.warningBox}>
                <View style={styles.warningHeader}>
                    <MaterialCommunityIcons
                        name="alert-circle-outline"
                        size={18}
                        color="#ef4444"
                    />
                    <Text style={styles.warningTitle}>
                        Requirements (from YouTube / Google Cloud):
                    </Text>
                </View>
                <View style={styles.bulletList}>
                    <Text style={styles.bulletItem}>
                        • Google Cloud Project with YouTube Data API enabled
                    </Text>
                    <Text style={styles.bulletItem}>
                        • OAuth 2.0 credentials (type: applicant for Desktop app
                        / for channel authorization)
                    </Text>
                    <Text style={styles.bulletItem}>
                        • Authorize that project to upload/post to your YouTube
                        channel (detailed instructions)
                    </Text>
                    <Text style={styles.bulletItem}>
                        • Channel owner must authorize the app once to the
                        channel for players
                    </Text>
                </View>
            </View>

            <View style={styles.inputGrid}>
                <View style={styles.inputColumn}>
                    <View style={styles.labelRow}>
                        <Text style={styles.inputLabel}>
                            Google Cloud Project ID
                        </Text>
                        <Feather name="info" size={14} color="#94a3b8" />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., my-project-12345"
                        placeholderTextColor="#cbd5e1"
                    />
                    <TouchableOpacity
                        onPress={() =>
                            Linking.openURL("https://console.cloud.google.com")
                        }
                    >
                        <Text style={styles.helperLink}>
                            Create in{" "}
                            <Text style={styles.linkBold}>
                                Google Cloud Console → APIs & Services
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputColumn}>
                    <View style={styles.labelRow}>
                        <Text style={styles.inputLabel}>
                            OAuth 2.0 Client ID (optional for direct)
                        </Text>
                        <Feather name="info" size={14} color="#94a3b8" />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="xxxxx.apps.googleusercontent.com"
                        placeholderTextColor="#cbd5e1"
                    />
                    <TouchableOpacity
                        onPress={() =>
                            Linking.openURL("https://console.cloud.google.com")
                        }
                    >
                        <Text style={styles.helperLink}>
                            Create/view →{" "}
                            <Text style={styles.linkBold}>
                                OAuth 2.0 Client IDs
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoBanner}>
                <Feather name="info" size={16} color="#3b82f6" />
                <Text style={styles.infoText}>
                    Visit the link to add an owner access to your channel. They
                    will be redirected to Google sign in and consent.
                </Text>
            </View>

            <View style={[styles.labelRow, { marginTop: 16 }]}>
                <Text style={styles.inputLabel}>
                    YouTube channel codeference
                </Text>
                <Feather name="info" size={14} color="#94a3b8" />
            </View>
            <TextInput
                style={[styles.input, { marginBottom: 20 }]}
                placeholder="Enter channel reference"
                placeholderTextColor="#cbd5e1"
            />

            <TouchableOpacity activeOpacity={0.8}>
                <LinearGradient
                    colors={["#E7000B", "#C10007"]}
                    style={styles.actionButton}
                >
                    <AntDesign
                        name="youtube"
                        size={18}
                        color="#fff"
                        style={{ marginRight: 10 }}
                    />
                    <Text style={styles.buttonText}>
                        Configure YouTube Integration
                    </Text>
                    <MaterialCommunityIcons
                        name="open-in-new"
                        size={16}
                        color="#fff"
                        style={{ marginLeft: 8 }}
                    />
                </LinearGradient>
            </TouchableOpacity>
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
        marginBottom: 16,
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
        backgroundColor: "#fee2e2",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 10,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#ef4444",
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
    warningBox: {
        backgroundColor: "#fff5f5",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#fee2e2",
        marginBottom: 20,
    },
    warningHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    warningTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#1e293b",
        marginLeft: 8,
    },
    bulletList: {
        paddingLeft: 26,
    },
    bulletItem: {
        fontSize: 12,
        color: "#4b5563",
        lineHeight: 18,
        marginBottom: 4,
    },
    inputGrid: {
        // flexDirection: "row",
        gap: 16,
        marginBottom: 16,
    },
    inputColumn: {
        flex: 1,
    },
    labelRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#475569",
        marginRight: 6,
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
        fontSize: 14,
    },
    helperLink: {
        fontSize: 11,
        color: "#64748b",
        marginTop: 6,
    },
    linkBold: {
        color: "#ef4444",
        fontWeight: "600",
    },
    infoBanner: {
        flexDirection: "row",
        backgroundColor: "#f0f7ff",
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e0f2fe",
        alignItems: "center",
    },
    infoText: {
        fontSize: 12,
        color: "#0369a1",
        marginLeft: 10,
        flex: 1,
    },
    actionButton: {
        height: 48,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
    },
});

export default YouTubeAdvancedConfigCard;
