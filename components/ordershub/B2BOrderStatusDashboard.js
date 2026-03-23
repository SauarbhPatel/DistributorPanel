import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {
    Feather,
    MaterialCommunityIcons,
    FontAwesome5,
} from "@expo/vector-icons";

const B2BOrderStatusDashboard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View style={styles.infoIconCircle}>
                    <Feather name="info" size={14} color="#3b82f6" />
                </View>
                <View>
                    <Text style={styles.headerTitle}>ORDER STATUS</Text>
                    <Text style={styles.headerSubtitle}>
                        Quick overview of your order management system health
                    </Text>
                </View>
            </View>

            <View style={styles.cardsScroll}>
                {/* INCOMING SECTION */}
                <View
                    style={[
                        styles.sectionWrapper,
                        { backgroundColor: "#FFFBEB", borderColor: "#FEF3C7" },
                    ]}
                >
                    <View style={styles.sectionHeader}>
                        <View
                            style={[styles.dot, { backgroundColor: "#F59E0B" }]}
                        />
                        <Text
                            style={[styles.sectionLabel, { color: "#B45309" }]}
                        >
                            INCOMING
                        </Text>
                    </View>
                    <View style={styles.statRow}>
                        <StatCard
                            icon="bell"
                            iconColor="#F59E0B"
                            bgColor="#FFF7ED"
                            label="New Orders"
                            count="20"
                            // highlight
                        />
                        <StatCard
                            icon="hourglass"
                            iconColor="#EA580C"
                            bgColor="#FFF7ED"
                            label="Processing"
                            count="17"
                        />
                    </View>
                </View>

                <View
                    style={[
                        styles.sectionWrapper,
                        { backgroundColor: "#F0FDF4", borderColor: "#DCFCE7" },
                    ]}
                >
                    <View style={styles.sectionHeader}>
                        <View
                            style={[styles.dot, { backgroundColor: "#10B981" }]}
                        />
                        <Text
                            style={[styles.sectionLabel, { color: "#047857" }]}
                        >
                            FULFILLMENT
                        </Text>
                    </View>
                    <View style={styles.statRow}>
                        <StatCard
                            icon="package"
                            iconColor="#EF4444"
                            bgColor="#FEF2F2"
                            label="Ready Pick"
                            count="5"
                        />
                        <StatCard
                            icon="truck"
                            iconColor="#10B981"
                            bgColor="#F0FDF4"
                            label="In Transit"
                            count="16"
                        />
                        <StatCard
                            icon="check-circle"
                            iconColor="#14B8A6"
                            bgColor="#F0FDFA"
                            label="Delivered"
                            count="16"
                        />
                    </View>
                </View>

                <View
                    style={[
                        styles.sectionWrapper,
                        { backgroundColor: "#F5F3FF", borderColor: "#EDE9FE" },
                    ]}
                >
                    <View style={styles.sectionHeader}>
                        <View
                            style={[styles.dot, { backgroundColor: "#8B5CF6" }]}
                        />
                        <Text
                            style={[styles.sectionLabel, { color: "#6D28D9" }]}
                        >
                            OVERVIEW
                        </Text>
                    </View>
                    <View style={styles.statRow}>
                        <StatCard
                            icon="slash"
                            iconColor="#8B5CF6"
                            bgColor="#F5F3FF"
                            label="Cancelled"
                            count="5"
                        />
                        <StatCard
                            icon="grid"
                            iconColor="#3B82F6"
                            bgColor="#EFF6FF"
                            label="All Orders"
                            count="220"
                            isBlue
                        />
                    </View>
                </View>
            </View>

            <View style={styles.footerContainer}>
                <View style={styles.footerTopRow}>
                    <Text style={styles.footerTitle}>SUB-FILTERS:</Text>
                    <Text style={styles.selectionText}>
                        6 ORDER(S) SELECTED
                    </Text>
                </View>

                <View>
                    <View style={styles.actionsScrollContent}>
                        <FilterBtn label="New Orders (7)" color="#0369A1" />
                        <FilterBtn
                            label="Unverified Orders (6)"
                            color="#EF4444"
                        />
                        <FilterBtn label="Verified Orders(7)" color="#059669" />
                        {/* <View style={styles.divider} /> */}
                        <ActionBtn
                            label="Mark Verified All"
                            color="#10B981"
                            icon="check"
                        />
                        <ActionBtn
                            label="Mark Unverified All"
                            color="#EF4444"
                            icon="x"
                        />
                        <ActionBtn
                            label="Cancel All"
                            color="#991B1B"
                            icon="trash-2"
                        />
                        <TouchableOpacity style={styles.downloadBtn}>
                            <Feather
                                name="download"
                                size={16}
                                color="#475569"
                            />
                            <Text style={styles.downloadText}>
                                Download Orders
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const StatCard = ({
    icon,
    iconColor,
    bgColor,
    label,
    count,
    highlight,
    isBlue,
}) => (
    <View style={[styles.statCard, highlight && styles.highlightedCard]}>
        <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
            <Feather name={icon} size={18} color={iconColor} />
        </View>
        <View style={styles.statContent}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={[styles.statCount, isBlue && { color: "#2563EB" }]}>
                {count}
            </Text>
        </View>
    </View>
);

const FilterBtn = ({ label, color }) => (
    <TouchableOpacity style={[styles.filterBtn, { backgroundColor: color }]}>
        <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
);

const ActionBtn = ({ label, color, icon }) => (
    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: color }]}>
        <Feather
            name={icon}
            size={14}
            color="#fff"
            style={{ marginRight: 4 }}
        />
        <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginHorizontal: 10,
        marginTop: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        gap: 10,
    },
    infoIconCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#BFDBFE",
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: { fontSize: 16, fontWeight: "800", color: "#1F2937" },
    headerSubtitle: {
        fontSize: 12,
        color: "#9CA3AF",
        width: "90%",
    },
    cardsScroll: { marginBottom: 20, gap: 10 },
    sectionWrapper: {
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginRight: 12,
        minWidth: 200,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 6,
    },
    dot: { width: 6, height: 6, borderRadius: 3 },
    sectionLabel: { fontSize: 12, fontWeight: "800", letterSpacing: 0.5 },
    statRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
    statCard: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        minWidth: 110,
        borderWidth: 1,
        borderColor: "#F3F4F6",
        flex: 1,
    },
    highlightedCard: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 0.5,
    },
    iconBox: {
        width: 34,
        height: 34,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    statLabel: { fontSize: 11, color: "#4B5563", fontWeight: "500" },
    statCount: { fontSize: 20, fontWeight: "700", color: "#1F2937" },
    footerContainer: {
        backgroundColor: "#F0F7FF",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#DBEAFE",
    },
    footerTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    footerTitle: { fontSize: 12, fontWeight: "800", color: "#1E40AF" },
    selectionText: { fontSize: 12, fontWeight: "800", color: "#1D4ED8" },
    actionsRow: { flexDirection: "row" },
    actionsScrollContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
    },
    filterBtn: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
        flex: 1,
        alignItems: "center",
        minWidth: 100,
    },
    actionBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
        flex: 1,
        justifyContent: "center",
        minWidth: 100,
    },
    btnText: { color: "#fff", fontSize: 10, fontWeight: "600" },
    divider: {
        width: 1,
        height: 30,
        backgroundColor: "#BFDBFE",
        marginHorizontal: 4,
    },
    downloadBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        flex: 1,
        justifyContent: "center",
        minWidth: 100,
    },
    downloadText: {
        marginLeft: 6,
        color: "#475569",
        fontSize: 12,
        fontWeight: "600",
    },
});

export default B2BOrderStatusDashboard;
