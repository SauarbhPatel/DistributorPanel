import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
    MaterialCommunityIcons,
    Feather,
    Octicons,
    Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ConversionsAPI = () => {
    return (
        <View style={styles.container}>
            {/* Top Header Section */}
            <View style={styles.header}>
                <LinearGradient
                    colors={["#00BC7D", "#00B8DB"]}
                    style={styles.iconBox}
                >
                    <MaterialCommunityIcons
                        name="server-network"
                        size={24}
                        color="#FFF"
                    />
                </LinearGradient>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>
                        Conversions API (CAPI)
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Server-side events for reliable attribution. Use
                        event_id for deduplication with Pixel.
                    </Text>
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                {/* Status Badge Row */}
                <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Status:</Text>
                    <View style={styles.enabledBadge}>
                        <Ionicons
                            name="checkmark-circle"
                            size={16}
                            color="#FFF"
                        />
                        <Text style={styles.enabledText}>Enabled</Text>
                    </View>
                </View>

                {/* Stats Card */}
                <View style={styles.statsCard}>
                    <View style={styles.statLine}>
                        <View style={styles.statLabelGroup}>
                            <Octicons name="pulse" size={18} color="#10B981" />
                            <Text style={styles.statLabel}>Events today:</Text>
                        </View>
                        <Text style={styles.statValueBig}>456</Text>
                    </View>

                    <View style={[styles.statLine, { marginTop: 12 }]}>
                        <Text style={styles.statLabel}>Dedup ratio:</Text>
                        <View style={styles.trendContainer}>
                            <Feather
                                name="trending-up"
                                size={14}
                                color="#10B981"
                            />
                            <Text style={styles.trendText}>92%</Text>
                        </View>
                    </View>
                </View>

                {/* Info/Warning Box */}
                <View style={styles.infoBox}>
                    <Ionicons
                        name="information-circle-outline"
                        size={18}
                        color="#3B82F6"
                    />
                    <Text style={styles.infoText}>
                        Required web params: action_source, event_source_url,
                        client_user_agent
                    </Text>
                </View>

                {/* Action Button */}
                <TouchableOpacity activeOpacity={0.8}>
                    <LinearGradient
                        colors={["#009966", "#0092B8"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.configureButton}
                    >
                        <Text style={styles.configureButtonText}>
                            Configure CAPI
                        </Text>
                        <Feather name="external-link" size={16} color="#FFF" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            {/* Footer Section */}
            <View style={styles.footer}>
                <Ionicons
                    name="checkmark-circle-outline"
                    size={18}
                    color="#059669"
                />
                <Text style={styles.footerText}>Server events active</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F0FDF4",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
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
    content: {
        padding: 16,
        paddingTop: 0,
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
    },
    statusLabel: {
        fontSize: 14,
        color: "#64748B",
        fontWeight: "500",
    },
    enabledBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#10B981",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        gap: 6,
    },
    enabledText: {
        color: "#FFF",
        fontSize: 13,
        fontWeight: "700",
    },
    statsCard: {
        backgroundColor: "#F0FDF4",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#BBF7D0",
        padding: 16,
        marginBottom: 16,
    },
    statLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    statLabelGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    statLabel: {
        fontSize: 13,
        color: "#314158",
    },
    statValueBig: {
        fontSize: 25,
        fontWeight: "700",
        color: "#1E293B",
    },
    trendContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    trendText: {
        color: "#10B981",
        fontWeight: "600",
        fontSize: 14,
    },
    infoBox: {
        flexDirection: "row",
        backgroundColor: "#EFF6FF",
        borderWidth: 1,
        borderColor: "#DBEAFE",
        borderRadius: 12,
        padding: 12,
        gap: 10,
        marginBottom: 20,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: "#314158",
        lineHeight: 18,
    },
    configureButton: {
        flexDirection: "row",
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    configureButtonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        padding: 16,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
    },
    footerText: {
        fontSize: 14,
        color: "#059669",
        fontWeight: "600",
    },
});

export default ConversionsAPI;
