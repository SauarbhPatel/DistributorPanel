import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import {
    MaterialCommunityIcons,
    Feather,
    MaterialIcons,
} from "@expo/vector-icons";

const BreakdownItem = ({ label, subLabel, count, icon, avatar, color }) => (
    <View style={styles.breakdownRow}>
        <View style={styles.breakdownLeft}>
            {icon ? (
                <View style={[styles.miniIconBox, { backgroundColor: color }]}>
                    <MaterialCommunityIcons
                        name={icon}
                        size={22}
                        color="#fff"
                    />
                </View>
            ) : (
                <View style={[styles.avatar, { backgroundColor: color }]}>
                    <Text style={[styles.avatarText]}>{avatar}</Text>
                </View>
            )}
            <View>
                <Text style={[styles.breakdownLabel, { color: color }]}>
                    {label}
                </Text>
                <Text style={styles.breakdownSubLabel}>{subLabel}</Text>
            </View>
        </View>
        <View style={[styles.countBadge, { backgroundColor: color }]}>
            <Text style={styles.countBadgeText}>{count}</Text>
        </View>
    </View>
);

const SlaComplianceSummary = () => {
    return (
        <View style={styles.mainContainer}>
            {/* 1. FILTER BAR */}
            <View style={styles.filterBar}>
                <View style={styles.filterLeft}>
                    <Feather name="filter" size={18} color="#94a3b8" />
                    <Text style={styles.filterText}>FILTER BY SELLER</Text>
                </View>
                <TouchableOpacity style={styles.filterDropdown}>
                    <Feather name="chevron-down" size={20} color="#cbd5e1" />
                </TouchableOpacity>
            </View>

            {/* 2. SUMMARY METRIC CARDS */}
            <View style={styles.summaryGrid}>
                {/* Orders At Risk */}
                <View style={[styles.card, styles.riskCard]}>
                    <View style={styles.cardHeader}>
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: "#f59e0b" },
                            ]}
                        >
                            <MaterialCommunityIcons
                                name="alert-outline"
                                size={22}
                                color="#fff"
                            />
                        </View>
                        <View style={styles.trendRow}>
                            <Feather
                                name="trending-up"
                                size={12}
                                color="#d97706"
                            />
                            <Text style={styles.trendText}>+3 this week</Text>
                        </View>
                    </View>
                    <Text style={[styles.mainCount, { color: "#f59e0b" }]}>
                        12
                    </Text>
                    <Text style={styles.cardTitle}>Orders at risk</Text>
                    <Text style={styles.cardSubtitle}>
                        Orders approaching SLA deadline
                    </Text>
                </View>

                {/* Breached Orders */}
                <View style={[styles.card, styles.breachCard]}>
                    <View style={styles.cardHeader}>
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: "#ef4444" },
                            ]}
                        >
                            <MaterialCommunityIcons
                                name="clock-outline"
                                size={22}
                                color="#fff"
                            />
                        </View>
                        <View style={styles.criticalBadge}>
                            <Text style={styles.criticalText}>CRITICAL</Text>
                        </View>
                    </View>
                    <Text style={[styles.mainCount, { color: "#ef4444" }]}>
                        5
                    </Text>
                    <Text style={styles.cardTitle}>Breached orders</Text>
                    <Text style={styles.cardSubtitle}>
                        Orders that missed SLA deadline
                    </Text>
                </View>
            </View>

            {/* 3. BREAKDOWN SECTIONS */}
            <View style={styles.breakdownContainer}>
                {/* Breach by Milestone */}
                <View style={styles.breakdownSection}>
                    <View style={styles.sectionHeader}>
                        <MaterialCommunityIcons
                            name="target"
                            size={18}
                            color="#3f51b5"
                        />
                        <Text style={styles.sectionTitle}>
                            Breach by milestone
                        </Text>
                        <View style={styles.blueBadge}>
                            <Text style={styles.blueBadgeText}>5</Text>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.listCard,
                            { backgroundColor: "#fff9f0" },
                        ]}
                    >
                        <BreakdownItem
                            label="Accept Order"
                            subLabel="SLA milestone breach"
                            count="2"
                            icon="check-circle-outline"
                            color="#ef4444"
                        />
                        <BreakdownItem
                            label="Pack Order"
                            subLabel="SLA milestone breach"
                            count="2"
                            icon="package-variant"
                            color="#f59e0b"
                        />
                        <BreakdownItem
                            label="Delivered"
                            subLabel="SLA milestone breach"
                            count="1"
                            icon="truck-delivery-outline"
                            color="#f59e0b"
                        />
                    </View>
                </View>

                {/* Breach by Seller */}
                <View style={styles.breakdownSection}>
                    <View style={styles.sectionHeader}>
                        <Feather name="users" size={18} color="#a855f7" />
                        <Text style={styles.sectionTitle}>
                            Breach by seller
                        </Text>
                        <View style={styles.purpleBadge}>
                            <Text style={styles.purpleBadgeText}>3</Text>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.listCard,
                            { backgroundColor: "#fcfaff" },
                        ]}
                    >
                        <BreakdownItem
                            label="Acme Retail"
                            subLabel="Seller account"
                            count="2"
                            avatar="A"
                            color="#8b5cf6"
                        />
                        <BreakdownItem
                            label="Global Supplies"
                            subLabel="Seller account"
                            count="1"
                            avatar="G"
                            color="#ec4899"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1 },

    // Filter Bar
    filterBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        margin: 16,
        marginHorizontal: 0,
        paddingHorizontal: 16,
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    filterLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
    filterText: { fontSize: 12, fontWeight: "700", color: "#64748b" },
    filterDropdown: {
        width: 60,
        alignItems: "flex-end",
        borderLeftWidth: 1,
        borderLeftColor: "#f1f5f9",
    },

    // Summary Cards
    summaryGrid: { gap: 12 },
    card: { flex: 1, padding: 16, borderRadius: 16, borderWidth: 1 },
    riskCard: { backgroundColor: "#fffbeb", borderColor: "#fef3c7" },
    breachCard: { backgroundColor: "#fef2f2", borderColor: "#fee2e2" },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        // marginBottom: 12,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    mainCount: { fontSize: 38, fontWeight: "800" },
    cardTitle: { fontSize: 14, fontWeight: "700", color: "#1e293b" },
    cardSubtitle: { fontSize: 11, color: "#64748b", marginTop: 2 },
    trendRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    trendText: { fontSize: 10, fontWeight: "700", color: "#d97706" },
    criticalBadge: {
        backgroundColor: "#fee2e2",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 30,
        alignSelf: "center",
    },
    criticalText: { fontSize: 9, fontWeight: "800", color: "#ef4444" },

    // Breakdown Lists
    breakdownContainer: { padding: 16, gap: 12, paddingHorizontal: 0 },
    breakdownSection: { flex: 1 },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 10,
    },
    sectionTitle: { fontSize: 13, fontWeight: "700", color: "#1e293b" },
    blueBadge: {
        backgroundColor: "#dbeafe",
        paddingHorizontal: 6,
        borderRadius: 10,
    },
    blueBadgeText: { fontSize: 10, color: "#2563eb", fontWeight: "bold" },
    purpleBadge: {
        backgroundColor: "#f3e8ff",
        paddingHorizontal: 6,
        borderRadius: 10,
    },
    purpleBadgeText: { fontSize: 10, color: "#9333ea", fontWeight: "bold" },
    listCard: { borderRadius: 12, padding: 12, gap: 12 },

    // List Items
    breakdownRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    breakdownLeft: { flexDirection: "row", gap: 10, alignItems: "center" },
    miniIconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
    breakdownLabel: { fontSize: 14, fontWeight: "700", color: "#1e293b" },
    breakdownSubLabel: { fontSize: 11, color: "#94a3b8" },
    countBadge: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    countBadgeText: { color: "#fff", fontSize: 13, fontWeight: "bold" },
});

export default SlaComplianceSummary;
