import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const CAMPAIGNS = [
    {
        id: "1",
        title: "Summer Sale - Catalog",
        subtitle: "Catalog sales",
        icon: "cart",
        iconColors: ["#3B82F6", "#06B6D4"],
        status: "ACTIVE",
        isPaused: false,
        metrics: { spend: "₹12,500", purchases: "89", roas: "15.84" },
    },
    {
        id: "2",
        title: "Retargeting - Cart Abandoners",
        subtitle: "Sales (website conversions)",
        icon: "target",
        iconColors: ["#AD46FF", "#F6339A"],
        status: "ACTIVE",
        isPaused: false,
        metrics: { spend: "₹4,200", purchases: "34", roas: "17.14" },
    },
    {
        id: "3",
        title: "Traffic - New Arrivals",
        subtitle: "Traffic",
        icon: "eye",
        iconColors: ["#F97316", "#FB923C"],
        status: "PAUSED",
        isPaused: true,
        metrics: { spend: "₹8,000", purchases: "12", roas: "3.00" },
    },
];

const StatBox = ({ label, value, icon, iconColor }) => (
    <View style={styles.statBox}>
        <View style={styles.statLabelRow}>
            <MaterialCommunityIcons name={icon} size={14} color={iconColor} />
            <Text style={styles.statLabel}>{label}</Text>
        </View>
        <Text style={styles.statValue}>{value}</Text>
    </View>
);

const CampaignCard = ({ item }) => {
    const bgColor = item.iconColors[0] + "08";

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: bgColor,
                    borderColor: item.iconColors[0] + "40",
                },
            ]}
        >
            <View style={styles.cardHeader}>
                <View style={styles.titleContainer}>
                    <LinearGradient
                        colors={item.iconColors}
                        style={styles.iconWrapper}
                    >
                        <MaterialCommunityIcons
                            name={item.icon}
                            size={22}
                            color="#FFF"
                        />
                    </LinearGradient>
                    <View>
                        <Text style={styles.campaignTitle}>{item.title}</Text>
                        <Text style={styles.campaignSubtitle}>
                            {item.subtitle}
                        </Text>
                    </View>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        item.isPaused ? styles.pausedBadge : styles.activeBadge,
                    ]}
                >
                    {!item.isPaused && (
                        <Feather
                            name="activity"
                            size={10}
                            color="#FFF"
                            style={{ marginRight: 4 }}
                        />
                    )}
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.statsGrid}>
                <StatBox
                    label="Spend"
                    value={item.metrics.spend}
                    icon="currency-usd"
                    iconColor="#3B82F6"
                />
                <StatBox
                    label="Purchases"
                    value={item.metrics.purchases}
                    icon="cart-outline"
                    iconColor="#AD46FF"
                />
                <StatBox
                    label="ROAS"
                    value={item.metrics.roas}
                    icon="trending-up"
                    iconColor="#22C55E"
                />
            </View>

            <View style={styles.actionBar}>
                <TouchableOpacity style={styles.secondaryBtn}>
                    <Ionicons
                        name={item.isPaused ? "play" : "pause"}
                        size={16}
                        color="#64748B"
                    />
                    <Text style={styles.secondaryBtnText}>
                        {item.isPaused ? "Resume" : "Pause"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryBtnContainer}>
                    <LinearGradient
                        colors={["#4F46E5", "#9333EA"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.primaryBtn}
                    >
                        <MaterialCommunityIcons
                            name="pencil"
                            size={16}
                            color="#FFF"
                        />
                        <Text style={styles.primaryBtnText}>Edit</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteBtn}>
                    <Ionicons name="trash-outline" size={18} color="#94A3B8" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const CampaignDashboard = () => {
    return (
        <View style={styles?.container}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#6366F1", "#A855F7"]}
                    style={styles.headerIconBox}
                >
                    <MaterialCommunityIcons
                        name="chart-bar"
                        size={22}
                        color="#FFF"
                    />
                </LinearGradient>
                <View>
                    <Text style={styles.headerTitle}>All Campaigns</Text>
                    <Text style={styles.headerSubtitle}>
                        Monitor performance and manage your active campaigns.
                    </Text>
                </View>
            </View>

            <FlatList
                data={CAMPAIGNS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CampaignCard item={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
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
    },
    listContent: { padding: 16, gap: 16 },
    card: {
        borderRadius: 12,
        padding: 16,
        // marginBottom: 16,
        borderWidth: 1.5,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    titleContainer: { flexDirection: "row", alignItems: "center", flex: 1 },
    iconWrapper: {
        width: 45,
        height: 45,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },
    campaignTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E293B",
        marginTop: 4,
    },
    campaignSubtitle: { fontSize: 12, color: "#94A3B8", marginTop: 2 },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        position: "absolute",
        top: -10,
        right: -10,
    },
    activeBadge: { backgroundColor: "#22C55E" },
    pausedBadge: { backgroundColor: "#94A3B8" },
    statusText: { color: "#FFF", fontSize: 9, fontWeight: "900" },

    statsGrid: { gap: 10, marginBottom: 16 },
    statBox: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 14,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    statLabelRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    statLabel: {
        fontSize: 12,
        color: "#64748B",
        marginLeft: 6,
        fontWeight: "600",
    },
    statValue: { fontSize: 17, fontWeight: "800", color: "#1E293B" },

    actionBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 8,
    },
    secondaryBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    secondaryBtnText: {
        color: "#64748B",
        fontWeight: "700",
        marginLeft: 6,
        fontSize: 13,
    },
    primaryBtnContainer: { borderRadius: 12, overflow: "hidden" },
    primaryBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    primaryBtnText: {
        color: "#FFF",
        fontWeight: "700",
        marginLeft: 6,
        fontSize: 13,
    },
    deleteBtn: {
        padding: 10,
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
});

export default CampaignDashboard;
