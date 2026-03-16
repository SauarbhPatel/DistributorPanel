import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const PageItem = ({ rank, title, users, trend, trendValue, colors, total }) => (
    <View style={styles.itemContainer}>
        <LinearGradient colors={colors} style={styles.rankBadge}>
            <Text style={styles.rankText}>{rank}</Text>
        </LinearGradient>

        <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{title}</Text>
            <View style={styles.statsRow}>
                <Text style={styles.statsText}>{users} users</Text>
                <View style={styles.dot} />
                <Feather
                    name={
                        trend === "up" ? "arrow-up-right" : "arrow-down-right"
                    }
                    size={12}
                    color={trend === "up" ? "#10B981" : "#EF4444"}
                />
                <Text
                    style={[
                        styles.trendText,
                        { color: trend === "up" ? "#10B981" : "#EF4444" },
                    ]}
                >
                    {trendValue}
                </Text>
            </View>
        </View>

        <View
            style={[
                styles.totalBadge,
                {
                    borderColor: colors[1],
                },
            ]}
        >
            <Text style={[styles.totalText, { color: colors[1] }]}>
                {total}
            </Text>
        </View>
    </View>
);

const TopPagesCard = () => {
    const pages = [
        {
            id: 1,
            rank: 1,
            title: "Home",
            users: 7,
            trend: "up",
            trendValue: "+12%",
            colors: ["#2B7FFF", "#00B8DB"],
            total: 7,
        },
        {
            id: 2,
            rank: 2,
            title: "Product listing",
            users: 6,
            trend: "up",
            trendValue: "+8%",
            colors: ["#C026D3", "#9333EA"],
            total: 6,
        },
        {
            id: 3,
            rank: 3,
            title: "Wireless Bluetooth Earphones",
            users: 5,
            trend: "down",
            trendValue: "-3%",
            colors: ["#8B5CF6", "#6D28D9"],
            total: 5,
        },
        {
            id: 4,
            rank: 4,
            title: "Cart",
            users: 4,
            trend: "up",
            trendValue: "+15%",
            colors: ["#10B981", "#059669"],
            total: 4,
        },
        {
            id: 5,
            rank: 5,
            title: "Checkout",
            users: 3,
            trend: "up",
            trendValue: "+22%",
            colors: ["#F59E0B", "#D97706"],
            total: 3,
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#2B7FFF", "#00B8DB"]}
                    style={styles.iconContainer}
                >
                    <MaterialCommunityIcons
                        name="file-document-outline"
                        size={22}
                        color="#FFF"
                    />
                </LinearGradient>
                <View>
                    <Text style={styles.headerTitle}>
                        Top pages (real-time)
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        By active users · last 30 min
                    </Text>
                </View>
            </View>

            <View style={styles.list}>
                {pages.map((item) => (
                    <PageItem key={item.id} {...item} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#F0F9FF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: "#FFF",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
    },
    maskContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    headerTitle: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
    headerSubtitle: { fontSize: 12, color: "#64748B", marginTop: 2 },
    list: { padding: 12, gap: 8 },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#F8FAFC",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    rankBadge: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    rankText: { color: "#FFF", fontSize: 14, fontWeight: "700" },
    itemInfo: { flex: 1 },
    itemTitle: { fontSize: 14, fontWeight: "600", color: "#1E293B" },
    statsRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
    statsText: { fontSize: 12, color: "#94A3B8" },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: "#CBD5E1",
        marginHorizontal: 6,
    },
    trendText: { fontSize: 12, fontWeight: "600", marginLeft: 2 },
    totalBadge: {
        width: 28,
        height: 28,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
    },
    totalText: { fontSize: 12, fontWeight: "700" },
});

export default TopPagesCard;
