import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import TablePagination from "./TablePagination";

const CampaignCard = ({ item }) => {
    const isSelected = item.isSelected;

    return (
        <View style={[styles.card, isSelected && styles.selectedCard]}>
            {/* Top Row: Checkbox, Name and Status */}
            <View style={styles.headerRow}>
                <TouchableOpacity style={styles.checkbox}>
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

                <View style={styles.titleContainer}>
                    <Text style={styles.campaignName} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <View style={styles.objectiveBadge}>
                        <Text style={styles.objectiveText}>
                            {item.objective}
                        </Text>
                    </View>
                </View>

                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Metrics Grid */}
            <View style={styles.metricsGrid}>
                <MetricItem
                    label="Spend"
                    value={`₹${item.spend}`}
                    icon="payments"
                    isMoney
                />
                <MetricItem
                    label="Impressions"
                    value={item.impressions}
                    icon="visibility"
                />
                <MetricItem
                    label="Clicks"
                    value={item.clicks}
                    icon="touch-app"
                />
                <MetricItem
                    label="Purchases"
                    value={item.purchases}
                    icon="shopping-basket"
                />
                <MetricItem
                    label="Revenue"
                    value={`₹${item.revenue}`}
                    isMoney
                />
                <MetricItem
                    label="ROAS"
                    value={item.roas}
                    isHighlight
                    icon="trending-up"
                />
            </View>
        </View>
    );
};

const MetricItem = ({ label, value, icon, isHighlight, isMoney }) => (
    <View style={styles.metricBox}>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text
            style={[
                styles.metricValue,
                isHighlight && styles.highlightValue,
                isMoney && { color: "#1e293b" },
            ]}
        >
            {value}
        </Text>
    </View>
);

const MobileCampaignList = () => {
    const data = [
        {
            id: 1,
            name: "Summer Sale - Catalog",
            objective: "Catalog sales",
            status: "ACTIVE",
            spend: "12,500",
            impressions: "245k",
            clicks: "1,200",
            purchases: "28",
            revenue: "1,98,000",
            roas: "15.84",
            isSelected: false,
        },
        {
            id: 2,
            name: "Retargeting - Cart",
            objective: "Sales",
            status: "ACTIVE",
            spend: "8,200",
            impressions: "110k",
            clicks: "850",
            purchases: "14",
            revenue: "92,000",
            roas: "11.21",
            isSelected: false,
        },
    ];

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => <CampaignCard item={item} />}
            ListFooterComponent={
                <>
                    <TablePagination />
                </>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {},
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
        borderWidth: 2,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    checkbox: {
        marginTop: 2,
    },
    titleContainer: {
        flex: 1,
        gap: 4,
    },
    campaignName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
    },
    objectiveBadge: {
        backgroundColor: "#f1f5f9",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        alignSelf: "flex-start",
    },
    objectiveText: {
        fontSize: 11,
        color: "#64748b",
        fontWeight: "600",
    },
    statusBadge: {
        backgroundColor: "#dcfce7",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#10b981",
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginVertical: 16,
    },
    metricsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 16,
    },
    metricBox: {
        width: "33.33%", // 3 columns
    },
    metricLabel: {
        fontSize: 10,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 4,
        fontWeight: "600",
    },
    metricValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#334155",
    },
    highlightValue: {
        color: "#10b981",
        fontSize: 16,
    },
});

export default MobileCampaignList;
