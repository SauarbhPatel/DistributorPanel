import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// --- Sub-Component: Summary Stat Cards (Image 2) ---
const SummaryStat = ({ label, value, icon, iconColors, bgColors }) => (
    <LinearGradient colors={bgColors} style={styles.summaryCard}>
        <View style={styles.summaryContent}>
            <View>
                <Text style={styles.summaryLabel}>{label}</Text>
                <Text style={styles.summaryValue}>{value}</Text>
            </View>
            <LinearGradient colors={iconColors} style={styles.summaryIconBox}>
                {icon}
            </LinearGradient>
        </View>
    </LinearGradient>
);

const RulesAndAutomation = () => {
    return (
        <View style={styles.container}>
            {/* 1. Main Header */}
            <View style={styles.header}>
                <LinearGradient
                    colors={["#6366F1", "#A855F7"]}
                    style={styles.headerIconBox}
                >
                    <MaterialCommunityIcons
                        name="chart-timeline-variant"
                        size={22}
                        color="#FFF"
                    />
                </LinearGradient>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerTitle}>Rules & Automation</Text>
                    <Text style={styles.headerSubtitle}>
                        Spend limits, approval workflows, and automated rules.
                    </Text>
                </View>
            </View>
            <View style={{ padding: 16 }}>
                <View style={styles.policyCard}>
                    <View style={styles.cardHeader}>
                        <LinearGradient
                            colors={["#0EA5E9", "#3B82F6"]}
                            style={styles.policyIconBox}
                        >
                            <MaterialCommunityIcons
                                name="shield-check-outline"
                                size={22}
                                color="#FFF"
                            />
                        </LinearGradient>
                        <View>
                            <Text style={styles.cardTitle}>
                                Policy & governance
                            </Text>
                            <Text style={styles.cardSubtitle}>
                                Catalog sales
                            </Text>
                        </View>
                    </View>

                    <View style={styles.policyStatsRow}>
                        <View style={styles.whiteStatTile}>
                            <View style={styles.tileHeader}>
                                <MaterialCommunityIcons
                                    name="currency-usd"
                                    size={14}
                                    color="#3B82F6"
                                />
                                <Text style={styles.tileLabel}>
                                    Daily spend limit
                                </Text>
                            </View>
                            <Text style={styles.tileValue}>₹12,500</Text>
                        </View>
                        <View style={styles.whiteStatTile}>
                            <View style={styles.tileHeader}>
                                <Text style={styles.tileLabel}>
                                    Approval workflow
                                </Text>
                            </View>
                            <Text style={styles.tileValue}>Optional — Off</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.configureBtn}>
                        <MaterialCommunityIcons
                            name="cog-outline"
                            size={16}
                            color="#4F46E5"
                        />
                        <Text style={styles.configureBtnText}>
                            Configure rules
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.automationCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.automationIconBox}>
                            <Ionicons name="flash" size={20} color="#FFF" />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text style={styles.cardTitle}>Automation</Text>
                            <View style={styles.demoBadge}>
                                <Text style={styles.demoText}>demo</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.automationDesc}>
                        Auto-pause underperforming campaigns; budget pacing.
                    </Text>

                    <View style={styles.emptyStateBox}>
                        <Ionicons
                            name="sparkles-outline"
                            size={32}
                            color="#C084FC"
                            style={{ marginBottom: 10 }}
                        />
                        <Text style={styles.emptyText}>
                            No active rules. Add rules to automate campaign and
                            budget actions.
                        </Text>
                        <TouchableOpacity style={styles.addRuleBtn}>
                            <LinearGradient
                                colors={["#0284C7", "#0369A1"]}
                                style={styles.addRuleGradient}
                            >
                                <Ionicons name="add" size={20} color="#FFF" />
                                <Text style={styles.addRuleText}>Add rule</Text>
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
        overflow: "hidden",
        marginTop: 5,
    },
    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerIconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
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
        maxWidth: "85%",
    },
    infoBanner: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F7FF",
        borderWidth: 1,
        borderColor: "#D8E9FF",
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
    },
    bannerIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    bannerText: { flex: 1, fontSize: 12, color: "#334155", fontWeight: "500" },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        gap: 12,
    },
    summaryCard: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.8)",
    },
    summaryContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    summaryLabel: {
        fontSize: 11,
        color: "#64748B",
        fontWeight: "600",
        marginBottom: 4,
    },
    summaryValue: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
    summaryIconBox: {
        width: 34,
        height: 34,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    policyCard: {
        backgroundColor: "#F0F9FF",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E0F2FE",
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    policyIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    cardTitle: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
    cardSubtitle: { fontSize: 12, color: "#64748B" },

    policyStatsRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
    whiteStatTile: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    tileHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
    tileLabel: {
        fontSize: 11,
        color: "#94A3B8",
        fontWeight: "600",
        marginLeft: 4,
    },
    tileValue: {
        marginLeft: 4,
        fontSize: 13,
        fontWeight: "700",
        color: "#1E293B",
    },
    configureBtn: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    configureBtnText: {
        color: "#4F46E5",
        fontSize: 12,
        fontWeight: "700",
        marginLeft: 6,
    },

    automationCard: {
        backgroundColor: "#F1F5F9",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    automationIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#0369A1",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    demoBadge: {
        backgroundColor: "#F3E8FF",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: 8,
    },
    demoText: { color: "#7E22CE", fontSize: 10, fontWeight: "800" },
    automationDesc: { fontSize: 12, color: "#64748B", marginBottom: 20 },
    emptyStateBox: {
        backgroundColor: "rgba(255,255,255,0.5)",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "#C084FC",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 12,
        color: "#64748B",
        marginBottom: 20,
        lineHeight: 18,
    },
    addRuleBtn: { borderRadius: 12, overflow: "hidden", elevation: 2 },
    addRuleGradient: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    addRuleText: { color: "#FFF", fontWeight: "700", marginLeft: 8 },
});

export default RulesAndAutomation;
