import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const InfoCard = ({ label, value, badge, colorConfig, showCopy = true }) => (
    <View
        style={[
            styles.card,
            {
                backgroundColor: colorConfig.bg,
                borderColor: colorConfig.border,
            },
        ]}
    >
        <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>{label}</Text>
            {badge && (
                <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>{badge}</Text>
                </View>
            )}
        </View>
        <View style={styles.cardContent}>
            <View
                style={[
                    styles.valueContainer,
                    !showCopy && {
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                        paddingHorizontal: 0,
                    },
                ]}
            >
                <Text style={styles.cardValue}>{value}</Text>
            </View>
            {showCopy && (
                <TouchableOpacity style={styles.copyButton}>
                    <Feather name="copy" size={16} color="#64748B" />
                </TouchableOpacity>
            )}
        </View>
    </View>
);

const WorkspaceDetails = () => {
    const cardThemes = {
        white: { bg: "#F8FAFC", border: "#E2E8F0" },
        purple: { bg: "#F5F3FF", border: "#DDD6FE" },
        blue: { bg: "#F0F9FF", border: "#BAE6FD" },
        green: { bg: "#F0FDF4", border: "#BBF7D0" },
        pink: { bg: "#FFF1F2", border: "#FECDD3" },
        orange: { bg: "#FFFBEB", border: "#FEF3C7" },
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerSection}>
                <View style={styles.headerLeft}>
                    <LinearGradient
                        colors={["#4F46E5", "#3B82F6"]}
                        style={styles.logoBox}
                    >
                        <MaterialCommunityIcons
                            name="account-box-outline"
                            size={20}
                            color="#FFF"
                        />
                    </LinearGradient>
                    <View style={{}}>
                        <Text style={styles.title}>
                            Meta Marketing Workspace
                        </Text>
                        <Text style={styles.subtitle}>
                            Single workspace for one Meta Business{"\n"}
                            portfolio + ad account + pixel + catalog.
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.editButton}>
                    <Feather name="edit-2" size={14} color="#1E293B" />
                    <Text style={styles.editButtonText}>Edit workspace</Text>
                </TouchableOpacity>
            </View>

            {/* Grid Layout */}
            <View style={styles.grid}>
                <InfoCard
                    label="Workspace name"
                    value="Baofeng Meta Workspace"
                    badge="ACTIVE"
                    colorConfig={cardThemes.white}
                    showCopy={false}
                />
                <InfoCard
                    label="Ad Account ID"
                    value="act_987654321"
                    colorConfig={cardThemes.blue}
                />
                <InfoCard
                    label="Instagram ID"
                    value="200987654321"
                    colorConfig={cardThemes.pink}
                />

                <InfoCard
                    label="Business ID"
                    value="DEMO-BIZ-123456"
                    colorConfig={cardThemes.purple}
                />
                <InfoCard
                    label="Page ID"
                    value="100123456789"
                    colorConfig={cardThemes.green}
                />
                <InfoCard
                    label="Currency / Timezone"
                    value="INR · Asia/Kolkata"
                    colorConfig={cardThemes.orange}
                    showCopy={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 5,
    },
    headerSection: {
        padding: 16,
        backgroundColor: "#EFF6FF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
        gap: 15,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    logoBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
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
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    editButtonText: {
        fontSize: 13,
        fontWeight: "600",
        marginLeft: 6,
        color: "#1E293B",
    },
    grid: {
        padding: 15,
        gap: 15,
    },
    column: {
        flex: 1,
        gap: 10,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        minHeight: 100,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    cardLabel: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E293B",
    },
    activeBadge: {
        backgroundColor: "#3B82F6",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    activeBadgeText: {
        color: "#FFF",
        fontSize: 10,
        fontWeight: "800",
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    valueContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.05)",
    },
    cardValue: {
        fontSize: 14,
        color: "#475569",
        fontWeight: "500",
    },
    copyButton: {
        marginLeft: 8,
        padding: 4,
    },
});

export default WorkspaceDetails;
