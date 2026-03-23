import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    MaterialCommunityIcons,
    Feather,
    Ionicons,
    MaterialIcons,
    FontAwesome,
} from "@expo/vector-icons";
import OrderAtRiskModal from "./OrderAtRiskModal";

const SummaryCard = ({
    count,
    title,
    items,
    color,
    bgColor,
    icon,
    status,
    topRightIcon,
    isSecondaryCard,
}) => (
    <View
        style={[
            styles.card,
            { backgroundColor: bgColor, borderColor: color + "20" },
        ]}
    >
        <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: color }]}>
                <MaterialCommunityIcons name={icon} size={20} color="#fff" />
            </View>

            {status ? (
                <View style={styles.statusBadge}>
                    <Text style={[styles.statusText, { color: color }]}>
                        {status}
                    </Text>
                </View>
            ) : topRightIcon ? (
                <MaterialCommunityIcons
                    name={topRightIcon}
                    size={20}
                    color={color}
                />
            ) : null}
        </View>

        <Text style={[styles.mainCount, { color: color }]}>{count}</Text>
        <Text style={styles.cardTitle}>{title}</Text>

        <View style={styles.itemList}>
            {items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                    <View style={styles.itemRowLeft}>
                        {!isSecondaryCard && (
                            <Feather
                                name={"chevron-right"}
                                size={12}
                                color={color}
                            />
                        )}
                        {isSecondaryCard && (
                            <FontAwesome
                                name={"circle"}
                                size={10}
                                color={color}
                            />
                        )}
                        <Text
                            style={[
                                styles.itemText,
                                isSecondaryCard && styles.textBlack,
                            ]}
                        >
                            {typeof item === "object" ? item.label : item}
                        </Text>
                    </View>

                    {isSecondaryCard && typeof item === "object" && (
                        <View
                            style={{
                                backgroundColor: color,
                                width: 15,
                                height: 15,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 7.5,
                            }}
                        >
                            <Text style={styles.itemCountText}>
                                {item.value}
                            </Text>
                        </View>
                    )}
                </View>
            ))}
        </View>
    </View>
);

const DetailSection = ({ title, total, icon, color, data }) => {
    const [isShowModel, setIsShowModel] = useState(false);
    return (
        <View style={styles.detailSection}>
            <OrderAtRiskModal
                title="Order details"
                visible={isShowModel}
                onClose={() => setIsShowModel(false)}
                hideReminder
                hideNote
                hideOpenManagment
            />
            <View style={[styles.detailHeader, { backgroundColor: color }]}>
                <View style={styles.headerLeft}>
                    <MaterialCommunityIcons
                        name={icon}
                        size={20}
                        color="#fff"
                    />
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>
                <View style={styles.totalBadge}>
                    <Text style={styles.totalBadgeText}>{total} total</Text>
                </View>
            </View>
            <View style={styles.detailBody}>
                {data.map((item, idx) => (
                    <View key={idx} style={styles.detailRow}>
                        <View style={styles.rowTop}>
                            <View style={styles.rowLabelGroup}>
                                <View
                                    style={[
                                        styles.indicator,
                                        {
                                            backgroundColor:
                                                item.indicatorColor,
                                        },
                                    ]}
                                />
                                <Text style={styles.rowLabel}>
                                    {item.label}
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.rowBadge,
                                    { backgroundColor: item.indicatorColor },
                                ]}
                            >
                                <Text style={styles.rowBadgeText}>
                                    {item.count}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.orderLinks}>
                            {item.orders.map((ord, oIdx) => (
                                <TouchableOpacity
                                    key={oIdx}
                                    style={styles.orderButton}
                                    onPress={() => setIsShowModel(true)}
                                >
                                    <Text style={styles.orderLinkText}>
                                        {ord}
                                    </Text>
                                    <MaterialIcons
                                        name="open-in-new"
                                        size={12}
                                        color="#3b82f6"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const SlaDashboardOverview = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={{ paddingVertical: 12 }}>
                <View style={styles.summaryGrid}>
                    <SummaryCard
                        count="37"
                        title="Orders at risk"
                        icon="alert-decagram"
                        color="#ef4444"
                        bgColor="#fff1f2"
                        status="LIVE"
                        items={[
                            "ORD-2024-002585",
                            "ORD-2024-002504",
                            "ORD-2024-002503",
                        ]}
                    />
                    <SummaryCard
                        count="3"
                        title="Breached orders"
                        icon="shield-alert"
                        color="#f59e0b"
                        bgColor="#fffbeb"
                        status="ALERT"
                        items={["ORD-1002", "ORD-1001", "ORD-1003"]}
                    />
                </View>

                <View style={[styles.summaryGrid, { marginTop: 12 }]}>
                    <SummaryCard
                        count="2"
                        title="Milestones with breaches"
                        icon="target"
                        color="#2563eb"
                        bgColor="#eff6ff"
                        topRightIcon="minus"
                        isSecondaryCard={true}
                        items={[
                            { label: "Pack Order", value: "1" },
                            { label: "Accept Order", value: "2" },
                        ]}
                    />
                    <SummaryCard
                        count="2"
                        title="Sellers with breaches"
                        icon="account-group"
                        color="#a855f7"
                        bgColor="#faf5ff"
                        topRightIcon="trending-up"
                        isSecondaryCard={true}
                        items={[
                            { label: "Global Supplies", value: "1" },
                            { label: "Acme Retail", value: "2" },
                        ]}
                    />
                </View>

                <DetailSection
                    title="Breach by milestone"
                    total="3"
                    icon="target"
                    color="#ff4d2d"
                    data={[
                        {
                            label: "Pack Order",
                            count: 1,
                            indicatorColor: "#ff6b6b",
                            orders: ["ORD-1002"],
                        },
                        {
                            label: "Accept Order",
                            count: 2,
                            indicatorColor: "#f59e0b",
                            orders: ["ORD-1001", "ORD-1003"],
                        },
                    ]}
                />

                <DetailSection
                    title="Breach by seller"
                    total="3"
                    icon="account-group"
                    color="#d322d3"
                    data={[
                        {
                            label: "Global Supplies",
                            count: 1,
                            indicatorColor: "#a855f7",
                            orders: ["ORD-1002"],
                        },
                        {
                            label: "Acme Retail",
                            count: 2,
                            indicatorColor: "#f472b6",
                            orders: ["ORD-1001", "ORD-1003"],
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#f8fafc" },
    summaryGrid: { flexDirection: "row", gap: 12 },
    card: {
        flex: 1,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        minHeight: 200,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    statusBadge: {
        backgroundColor: "#fff",
        paddingHorizontal: 6,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#e2e8f0",
    },
    statusText: { fontSize: 9, fontWeight: "bold" },
    mainCount: { fontSize: 32, fontWeight: "bold", marginVertical: 4 },
    cardTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "#64748b",
        marginBottom: 12,
    },
    itemList: { gap: 8 },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    itemRowLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    itemText: { fontSize: 11, color: "#3b82f6" },
    textBlack: { color: "#1e293b", fontWeight: "500" },
    itemCountText: { fontSize: 8.5, fontWeight: "700", color: "#ffffff" },

    detailSection: {
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        elevation: 2,
    },
    detailHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        alignItems: "center",
    },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
    headerTitle: { color: "#fff", fontWeight: "bold", fontSize: 15 },
    totalBadge: {
        backgroundColor: "rgba(255,255,255,0.3)",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    totalBadgeText: { color: "#fff", fontSize: 11, fontWeight: "600" },
    detailBody: { padding: 16 },
    detailRow: { marginBottom: 20 },
    rowTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    rowLabelGroup: { flexDirection: "row", alignItems: "center", gap: 8 },
    indicator: { width: 6, height: 18, borderRadius: 3 },
    rowLabel: { fontSize: 15, fontWeight: "600", color: "#1e293b" },
    rowBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    rowBadgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
    orderLinks: { flexDirection: "row", gap: 10, paddingLeft: 14 },
    orderButton: { flexDirection: "row", alignItems: "center", gap: 4 },
    orderLinkText: {
        fontSize: 13,
        color: "#3b82f6",
        textDecorationLine: "underline",
    },
});

export default SlaDashboardOverview;
