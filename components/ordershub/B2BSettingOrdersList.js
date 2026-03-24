import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";

const B2BSettingOrdersList = () => {
    const data = [
        {
            id: "B2B-DEMO-001",
            supplier: "Manufacturer: Shopperclue",
            buyer: "GS Tele",
            status: "NEW_ORDER",
            total: "₹24,190",
            active: true,
            color: "#0070ba",
            date: "24 Mar, 2026",
        },
        {
            id: "B2B-DEMO-002",
            supplier: "Supplier: Reliance Retail",
            buyer: "Digital World",
            status: "PROCESSING",
            total: "₹12,450",
            active: false,
            color: "#f59e0b",
            date: "23 Mar, 2026",
        },
        {
            id: "B2B-DEMO-003",
            supplier: "Manufacturer: Samsung Ind.",
            buyer: "Mobile Hub",
            status: "SHIPPED",
            total: "₹89,000",
            active: false,
            color: "#10b981",
            date: "22 Mar, 2026",
        },
        {
            id: "B2B-DEMO-004",
            supplier: "Wholesaler: Global Tech",
            buyer: "Enterprises Ltd",
            status: "CANCELLED",
            total: "₹5,200",
            active: false,
            color: "#ef4444",
            date: "21 Mar, 2026",
        },
        {
            id: "B2B-DEMO-005",
            supplier: "Manufacturer: Apple Inc.",
            buyer: "iStore Central",
            status: "DELIVERED",
            total: "₹1,45,000",
            active: false,
            color: "#6366f1",
            date: "20 Mar, 2026",
        },
        {
            id: "B2B-DEMO-006",
            supplier: "Distributor: Brightstar",
            buyer: "Telelinks",
            status: "PENDING_PAYMENT",
            total: "₹32,100",
            active: false,
            color: "#8b5cf6",
            date: "19 Mar, 2026",
        },
    ];

    const renderOrderCard = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.card, item.active && styles.activeCard]}
        >
            <View style={[styles.accentBar, { backgroundColor: item.color }]} />

            <View style={styles.contentContainer}>
                <View style={styles.rowBetween}>
                    <Text style={styles.orderIdText}>{item.id}</Text>
                    <View style={styles.buyerBadge}>
                        <Text style={styles.buyerText}>{item.buyer}</Text>
                    </View>
                </View>

                <View style={styles.supplierContainer}>
                    <MaterialCommunityIcons
                        name="factory"
                        size={14}
                        color="#94a3b8"
                    />
                    <Text style={styles.supplierText}>{item.supplier}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.rowBetween}>
                    <View style={styles.statusGroup}>
                        <Text style={styles.statusLabel}>STATUS</Text>
                        <Text style={styles.statusValue}>{item.status}</Text>
                    </View>

                    <View style={styles.priceBadge}>
                        <Text style={styles.priceText}>{item.total}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderCard}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1e293b",
    },
    viewAllText: {
        fontSize: 14,
        color: "#0070ba",
        fontWeight: "600",
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    activeCard: {
        backgroundColor: "#f0f9ff",
        borderColor: "#0070ba",
    },
    accentBar: {
        width: 5,
        height: "100%",
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    orderIdText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#334155",
    },
    buyerBadge: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    buyerText: {
        fontSize: 12,
        color: "#64748b",
        fontWeight: "500",
    },
    supplierContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        gap: 6,
    },
    supplierText: {
        fontSize: 13,
        color: "#64748b",
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginVertical: 12,
    },
    statusGroup: {
        gap: 2,
    },
    statusLabel: {
        fontSize: 10,
        fontWeight: "800",
        color: "#94a3b8",
        letterSpacing: 0.5,
    },
    statusValue: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1e293b",
    },
    priceBadge: {
        backgroundColor: "#e0f2fe",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    priceText: {
        color: "#0070ba",
        fontWeight: "700",
        fontSize: 14,
    },
});

export default B2BSettingOrdersList;
