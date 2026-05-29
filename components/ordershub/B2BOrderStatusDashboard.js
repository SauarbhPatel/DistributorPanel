import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from "react-native";
import {
    Feather,
    MaterialCommunityIcons,
    FontAwesome5,
} from "@expo/vector-icons";
import { getOrderStatusCounts } from "../../utils/api/commonApi";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const SkeletonBlock = ({ width = "100%", height = 16, radius = 6, style }) => {
    const anim = React.useRef(new Animated.Value(0.4)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(anim, {
                    toValue: 0.4,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);
    return (
        <Animated.View
            style={[
                {
                    width,
                    height,
                    borderRadius: radius,
                    backgroundColor: "#E2E8F0",
                    opacity: anim,
                },
                style,
            ]}
        />
    );
};

const DashboardSkeleton = () => (
    <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
            <SkeletonBlock width={22} height={22} radius={11} />
            <View style={{ flex: 1, gap: 6, marginLeft: 10 }}>
                <SkeletonBlock width="35%" height={12} />
                <SkeletonBlock width="70%" height={10} />
            </View>
        </View>
        {/* 3 section skeletons */}
        {[1, 2, 3].map((s) => (
            <View
                key={s}
                style={[
                    styles.sectionWrapper,
                    {
                        backgroundColor: "#F8FAFC",
                        borderColor: "#E2E8F0",
                        marginBottom: 10,
                    },
                ]}
            >
                <SkeletonBlock
                    width="30%"
                    height={10}
                    style={{ marginBottom: 12 }}
                />
                <View style={styles.statRow}>
                    {[1, 2].map((c) => (
                        <View key={c} style={[styles.statCard, { flex: 1 }]}>
                            <SkeletonBlock
                                width={34}
                                height={34}
                                radius={8}
                                style={{ marginRight: 8 }}
                            />
                            <View style={{ flex: 1, gap: 6 }}>
                                <SkeletonBlock width="60%" height={10} />
                                <SkeletonBlock width="40%" height={18} />
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        ))}
        {/* Footer skeleton */}
        <View style={[styles.footerContainer]}>
            <View style={styles.footerTopRow}>
                <SkeletonBlock width="30%" height={12} />
                <SkeletonBlock width="40%" height={12} />
            </View>
            <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                {[1, 2, 3, 4].map((i) => (
                    <SkeletonBlock key={i} width={100} height={36} radius={8} />
                ))}
            </View>
        </View>
    </View>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const B2BOrderStatusDashboard = ({
    onStatusSelect = () => {},
    selectedStatus,
}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getOrderStatusCounts();
            if (res?.success) {
                setData(res.data);
            }
        } catch (e) {
            console.error("B2BOrderStatusDashboard fetch error:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <DashboardSkeleton />;

    // Build lookup maps from API response
    const statusMap = {};
    (data?.byStatus || []).forEach((s) => {
        statusMap[s.status] = s.count;
    });

    const verifyMap = {};
    (data?.byVerificationStatus || []).forEach((v) => {
        verifyMap[v.verificationStatus] = v.count;
    });

    const totalOrders = data?.totalOrders ?? 0;

    return (
        <View style={styles.container}>
            {/* ── Header (original UI) ── */}
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
                {/* ── INCOMING SECTION ── */}
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
                            count={statusMap["PENDING"] ?? 0}
                            onPress={() => onStatusSelect("PENDING")}
                            active={selectedStatus == "PENDING"}
                        />
                        <StatCard
                            icon="hourglass"
                            iconColor="#EA580C"
                            bgColor="#FFF7ED"
                            label="Processing"
                            count={statusMap["PROCESSING"] ?? 0}
                            onPress={() => onStatusSelect("PROCESSING")}
                            active={selectedStatus == "PROCESSING"}
                        />
                    </View>
                </View>

                {/* ── FULFILLMENT SECTION ── */}
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
                            label="Ready To Pick"
                            count={statusMap["READY_TO_PICKUP"] ?? 0}
                            onPress={() => onStatusSelect("READY_TO_PICKUP")}
                            active={selectedStatus == "READY_TO_PICKUP"}
                        />
                        <StatCard
                            icon="truck"
                            iconColor="#10B981"
                            bgColor="#F0FDF4"
                            label="In Transit"
                            count={statusMap["IN_TRANSIT"] ?? 0}
                            onPress={() => onStatusSelect("IN_TRANSIT")}
                            active={selectedStatus == "IN_TRANSIT"}
                        />
                        <StatCard
                            icon="check-circle"
                            iconColor="#14B8A6"
                            bgColor="#F0FDFA"
                            label="Delivered"
                            count={statusMap["DELIVERED"] ?? 0}
                            onPress={() => onStatusSelect("DELIVERED")}
                            active={selectedStatus == "DELIVERED"}
                        />
                    </View>
                </View>

                {/* ── OVERVIEW SECTION ── */}
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
                            count={statusMap["CANCELLED"] ?? 0}
                            onPress={() => onStatusSelect("CANCELLED")}
                            active={selectedStatus == "CANCELLED"}
                        />
                        <StatCard
                            icon="grid"
                            iconColor="#3B82F6"
                            bgColor="#EFF6FF"
                            label="All Orders"
                            count={totalOrders}
                            isBlue
                            onPress={() => onStatusSelect(null)}
                            active={selectedStatus == null}
                        />
                    </View>
                </View>
            </View>

            {/* ── Footer (original UI, counts from API) ── */}
            <View style={styles.footerContainer}>
                <View style={styles.footerTopRow}>
                    <Text style={styles.footerTitle}>SUB-FILTERS:</Text>
                    {/* <Text style={styles.selectionText}>
                        {totalOrders} ORDER(S) TOTAL
                    </Text> */}
                </View>

                <View>
                    <View style={styles.actionsScrollContent}>
                        {selectedStatus == "PENDING" ? (
                            <>
                                <FilterBtn
                                    label={`New Orders (${verifyMap["NEW"] ?? 0})`}
                                    color="#0369A1"
                                    onPress={() => onStatusSelect(null, "NEW")}
                                />
                                <FilterBtn
                                    label={`Unverified Orders (${verifyMap["UNVERIFIED"] ?? 0})`}
                                    color="#EF4444"
                                    onPress={() =>
                                        onStatusSelect(null, "UNVERIFIED")
                                    }
                                />
                                <FilterBtn
                                    label={`Verified Orders (${verifyMap["VERIFIED"] ?? 0})`}
                                    color="#01A78F"
                                    onPress={() =>
                                        onStatusSelect(null, "VERIFIED")
                                    }
                                />
                            </>
                        ) : null}
                        {selectedStatus == "PROCESSING" ? (
                            <>
                                <FilterBtn
                                    label={`Labeling (6)`}
                                    color="#2B99D9"
                                />
                                <FilterBtn
                                    label={`Packing(6)`}
                                    color="#795ABD"
                                />
                                <FilterBtn
                                    label={`Manifesting(5)`}
                                    color="#00BBA2"
                                />
                            </>
                        ) : null}
                        {selectedStatus == "READY_TO_PICKUP" ? (
                            <>
                                <FilterBtn
                                    label={`Print Manifest (6)`}
                                    color="#2B99D9"
                                />
                                <FilterBtn
                                    label={`Manifesting(5)`}
                                    color="#00BBA2"
                                />
                            </>
                        ) : null}
                        {selectedStatus == "IN_TRANSIT" ? (
                            <>
                                <FilterBtn
                                    label={`Transit(6)`}
                                    color="#2B99D9"
                                />
                                <FilterBtn label={`RTO (5)`} color="#00BBA2" />
                                <FilterBtn
                                    label={`Out of Delivery (6)`}
                                    color="#795ABD"
                                />
                            </>
                        ) : null}
                        {selectedStatus == "DELIVERED" ? (
                            <>
                                <FilterBtn
                                    label={`Last 30 Days(6)`}
                                    color="#2B99D9"
                                />
                                <FilterBtn
                                    label={`Last 7 Days(6)`}
                                    color="#00BBA2"
                                />
                                <FilterBtn
                                    label={`Payment Ready(6)`}
                                    color="#795ABD"
                                />
                            </>
                        ) : null}
                        {selectedStatus == "CANCELLED" ? (
                            <>
                                <FilterBtn
                                    label={`Canceled (5)`}
                                    color="#795ABD"
                                />
                            </>
                        ) : null}
                        {selectedStatus == null ? (
                            <>
                                <FilterBtn
                                    label={`New Orders (${verifyMap["NEW"] ?? 0})`}
                                    color="#0369A1"
                                    onPress={() => onStatusSelect(null, "NEW")}
                                />
                                <FilterBtn
                                    label={`Unverified Orders (${verifyMap["UNVERIFIED"] ?? 0})`}
                                    color="#EF4444"
                                    onPress={() =>
                                        onStatusSelect(null, "UNVERIFIED")
                                    }
                                />
                                <FilterBtn
                                    label={`Verified Orders (${verifyMap["VERIFIED"] ?? 0})`}
                                    color="#01A78F"
                                    onPress={() =>
                                        onStatusSelect(null, "VERIFIED")
                                    }
                                />
                            </>
                        ) : null}

                        {/* <ActionBtn
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
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        </View>
    );
};

// ─── Sub-components (original, unchanged) ────────────────────────────────────
const StatCard = ({
    icon,
    iconColor,
    bgColor,
    label,
    count,
    highlight,
    isBlue,
    onPress,
    active,
}) => (
    <TouchableOpacity
        activeOpacity={0.75}
        onPress={onPress}
        style={[
            styles.statCard,
            (highlight || active) && {
                ...styles.highlightedCard,
                borderColor: iconColor,
                elevation: 4,
            },
        ]}
    >
        {active ? (
            <View
                style={{
                    width: 8,
                    height: 8,
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: iconColor,
                    borderRadius: 5,
                }}
            />
        ) : null}
        <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
            <Feather name={icon} size={18} color={iconColor} />
        </View>
        <View style={styles.statContent}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={[styles.statCount, isBlue && { color: "#2563EB" }]}>
                {count}
            </Text>
        </View>
    </TouchableOpacity>
);

const FilterBtn = ({ label, color, onPress }) => (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.filterBtn, { backgroundColor: color }]}
    >
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

// ─── Styles (original, untouched) ─────────────────────────────────────────────
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
    headerSubtitle: { fontSize: 12, color: "#9CA3AF", width: "90%" },
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
    statContent: { flex: 1 },
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
