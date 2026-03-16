import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const OverviewCard = ({
    title,
    value,
    linkText,
    icon,
    trend,
    trendValue,
    colors,
    iconColors,
}) => (
    <View style={styles.cardContainer}>
        <View style={[styles.cardTop, { backgroundColor: colors.bg }]}>
            <View style={styles.cardHeaderRow}>
                <View style={styles.textGroup}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardValue}>{value}</Text>
                </View>
                <LinearGradient colors={iconColors} style={styles.iconBox}>
                    <MaterialCommunityIcons
                        name={icon}
                        size={24}
                        color="#FFF"
                    />
                </LinearGradient>
            </View>

            <TouchableOpacity style={styles.linkButton} activeOpacity={0.7}>
                <Text style={[styles.linkText, { color: colors.link }]}>
                    {linkText} →
                </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.cardBottom}>
            <View style={styles.trendRow}>
                <Feather name="arrow-up-right" size={14} color="#10B981" />
                <Text style={styles.trendText}>{trendValue}</Text>
            </View>
            <Text style={styles.comparisonText}>vs last month</Text>
        </View>
    </View>
);

const MetaOverview = () => {
    const data = [
        {
            id: 1,
            title: "ACTIVE CAMPAIGNS",
            value: "2",
            linkText: "View campaigns",
            icon: "send",
            trendValue: "+1",
            colors: { bg: "#F0F9FF", link: "#0EA5E9" },
            iconColors: ["#2B7FFF", "#00B8DB"],
        },
        {
            id: 2,
            title: "CATALOG PRODUCTS",
            value: "24",
            linkText: "Sync catalog",
            icon: "package-variant-closed",
            trendValue: "+4",
            colors: { bg: "#F0FDF4", link: "#22C55E" },
            iconColors: ["#10B981", "#22C55E"],
        },
        {
            id: 3,
            title: "PIXEL EVENTS TODAY",
            value: "1,247",
            linkText: "Pixel & CAPI",
            icon: "pulse",
            trendValue: "+18%",
            colors: { bg: "#FAF5FF", link: "#A855F7" },
            iconColors: ["#D946EF", "#A855F7"],
        },
        {
            id: 4,
            title: "SPEND (MONTH)",
            value: "₹62k",
            linkText: "Billing",
            icon: "currency-usd",
            trendValue: "+12%",
            colors: { bg: "#FFFBEB", link: "#F59E0B" },
            iconColors: ["#F97316", "#F59E0B"],
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {data.map((item) => (
                    <OverviewCard key={item.id} {...item} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F8FAFC",
        marginTop: 15,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },
    cardContainer: {
        width: "48%",
        backgroundColor: "#FFF",
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    cardTop: {
        padding: 16,
        height: 130,
        justifyContent: "space-between",
    },
    cardHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    textGroup: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 11,
        fontWeight: "700",
        color: "#475569",
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    cardValue: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1E293B",
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    linkButton: {
        marginTop: 10,
    },
    linkText: {
        fontSize: 13,
        fontWeight: "600",
    },
    cardBottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    trendRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    trendText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#10B981",
    },
    comparisonText: {
        fontSize: 11,
        color: "#94A3B8",
        fontWeight: "500",
    },
});

export default MetaOverview;
