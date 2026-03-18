import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { MaterialCommunityIcons, Feather, Octicons } from "@expo/vector-icons";
import TablePagination from "./TablePagination";

const ProductCampaignCard = ({ item }) => {
    const isSelected = item.isSelected;

    return (
        <View style={[styles.card, isSelected && styles.selectedCard]}>
            {/* Top Section: Selection & ID Info */}
            <View style={styles.headerRow}>
                <View style={styles.leftHeader}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons
                            name={
                                isSelected
                                    ? "checkbox-marked"
                                    : "checkbox-blank-outline"
                            }
                            size={22}
                            color={isSelected ? "#2563eb" : "#cbd5e1"}
                        />
                    </TouchableOpacity>
                    <Text style={styles.skuText}>{item.sku}</Text>
                </View>

                {/* ROAS Badge - Vibrant Gradient Style */}
                <View
                    style={[
                        styles.roasBadge,
                        { backgroundColor: item.badgeColor || "#0ea5e9" },
                    ]}
                >
                    <Feather name="trending-up" size={14} color="#fff" />
                    <Text style={styles.roasValue}>{item.roas}</Text>
                </View>
            </View>

            {/* Product Title */}
            <Text style={styles.titleText} numberOfLines={2}>
                {item.title}
            </Text>

            <View style={styles.divider} />

            {/* Metrics Row: Impressions, Clicks, Purchases */}
            <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                    <Feather name="eye" size={14} color="#94a3b8" />
                    <Text style={styles.metricValue}>{item.impressions}</Text>
                </View>

                <View style={styles.metricItem}>
                    <Feather
                        name="navigation"
                        size={13}
                        color="#94a3b8"
                        style={styles.clickIcon}
                    />
                    <Text style={styles.metricValue}>{item.clicks}</Text>
                </View>

                <View style={styles.metricItem}>
                    <Feather name="shopping-cart" size={14} color="#94a3b8" />
                    <Text style={styles.metricValue}>{item.purchases}</Text>
                </View>
            </View>

            {/* Revenue Section */}
            <View style={styles.revenueContainer}>
                <Text style={styles.revenueLabel}>REVENUE</Text>
                <Text style={styles.revenueValue}>₹{item.revenue}</Text>
            </View>
        </View>
    );
};

const ProductPerformanceList = () => {
    const data = [
        {
            id: "1",
            sku: "SKU-UB-PARENT",
            title: "Wireless Bluetooth Earphones",
            impressions: "45,000",
            clicks: "1,200",
            purchases: "28",
            revenue: "69,972",
            roas: "18.2",
            badgeColor: "#0ea5e9", // Sky Blue
            isSelected: true,
        },
        {
            id: "2",
            sku: "SKU-UB-PARENT",
            title: "Wireless Bluetooth Earphones",
            impressions: "45,000",
            clicks: "1,200",
            purchases: "28",
            revenue: "69,972",
            roas: "16.5",
            badgeColor: "#c026d3", // Purple/Magenta
            isSelected: false,
        },
        {
            id: "3",
            sku: "SKU-UB-PARENT",
            title: "Wireless Bluetooth Earphones",
            impressions: "45,000",
            clicks: "1,200",
            purchases: "28",
            revenue: "69,972",
            roas: "14.1",
            badgeColor: "#00c853", // Green
            isSelected: false,
        },
    ];

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => <ProductCampaignCard item={item} />}
            ListFooterComponent={
                <>
                    <TablePagination />
                </>
            }
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {},
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    selectedCard: {
        borderColor: "#2563eb",
        backgroundColor: "#f0f7ff",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    leftHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    skuText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#2563eb",
        textDecorationLine: "underline",
    },
    roasBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        gap: 6,
    },
    roasValue: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    titleText: {
        fontSize: 15,
        color: "#475569",
        fontWeight: "500",
        marginBottom: 12,
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginBottom: 12,
    },
    metricsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    metricItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    metricValue: {
        fontSize: 13,
        color: "#334155",
        fontWeight: "600",
    },
    clickIcon: {
        transform: [{ rotate: "45deg" }],
    },
    revenueContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        padding: 10,
        borderRadius: 8,
    },
    revenueLabel: {
        fontSize: 11,
        fontWeight: "800",
        color: "#94a3b8",
    },
    revenueValue: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1e293b",
    },
});

export default ProductPerformanceList;
