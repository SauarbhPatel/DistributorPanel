import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import {
    Feather,
    MaterialCommunityIcons,
    FontAwesome5,
    Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const MetricCard = ({ item, isFullWidth }) => (
    <View
        style={[
            styles.card,
            isFullWidth ? styles.fullWidth : styles.halfWidth,
            { backgroundColor: item.bgColor },
        ]}
    >
        <View style={styles.cardHeader}>
            <View>
                <View style={styles.titleRow}>
                    <item.iconType
                        name={item.icon}
                        size={14}
                        color={item.accentColor}
                    />
                    <Text
                        style={[styles.cardTitle, { color: item.accentColor }]}
                    >
                        {item.label}
                    </Text>
                </View>
                <Text style={styles.value}>{item.value}</Text>
            </View>

            <LinearGradient
                colors={item?.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.iconBadge]}
            >
                <item.iconType name={item.icon} size={18} color="#FFF" />
            </LinearGradient>
        </View>

        <View style={styles.timeRow}>
            {!item?.iconPulse && (
                <Feather name="clock" size={12} color="#64748B" />
            )}
            {item?.iconPulse && (
                <Ionicons name="pulse" size={12} color="#64748B" />
            )}
            <Text style={styles.timeText}>{item.timeframe}</Text>
        </View>

        <View style={styles.footer}>
            <View style={styles.trendRow}>
                {!item?.iconPulse && (
                    <Feather name="arrow-up-right" size={14} color="#10B981" />
                )}
                {item?.iconPulse && (
                    <Ionicons name="pulse" size={14} color="#155DFC" />
                )}
                <Text
                    style={[
                        styles.trendText,
                        item.trend == "Connected" && { color: "#155DFC" },
                    ]}
                >
                    {item.trend}
                </Text>
            </View>
            <Text style={styles.comparisonText}>
                {item?.iconPulse ? "Status: Active" : "vs last hour"}
            </Text>
        </View>
    </View>
);

const AnalyticsGrid = () => {
    const [gridMode, setGridMode] = useState("1x1"); // "1x1" or "2x2"

    const metrics = [
        {
            id: 1,
            label: "ACTIVE USERS",
            value: "9",
            trend: "+12.5%",
            timeframe: "Last 30 min",
            icon: "users",
            iconType: Feather,
            bgColor: "#EFF6FF",
            accentColor: "#2B7FFF",
            gradientColors: ["#2B7FFF", "#00B8DB"],
        },
        {
            id: 2,
            label: "PAGE VIEWS",
            value: "37",
            trend: "+8.3%",
            timeframe: "Last 40 min",
            icon: "eye",
            iconType: Feather,
            bgColor: "#F0FDFA",
            accentColor: "#00B8DB",
            gradientColors: ["#00BBA7", "#00B8DB"],
        },
        {
            id: 3,
            label: "EVENTS",
            value: "44",
            trend: "+15.7%",
            timeframe: "Last 30 min",
            icon: "bolt",
            iconType: FontAwesome5,
            bgColor: "#FAF5FF",
            accentColor: "#AD46FF",
            gradientColors: ["#AD46FF", "#F6339A"],
        },
        {
            id: 4,
            label: "PURCHASE",
            value: "1",
            trend: "+100%",
            timeframe: "Last 30 min",
            icon: "shopping-cart",
            iconType: Feather,
            bgColor: "#FEF2F2",
            accentColor: "#FB2C36",
            gradientColors: ["#FB2C36", "#FF2056"],
        },
        {
            id: 5,
            label: "REVENUE VALUE",
            value: "₹1,587",
            trend: "+23.8%",
            timeframe: "Last 30 min",
            icon: "dollar-sign",
            iconType: Feather,
            bgColor: "#ECFDF5",
            accentColor: "#00BC7D",
            gradientColors: ["#00BC7D", "#00C950"],
        },
        {
            id: 6,
            label: "DATA SOURCE",
            value: "Demo API",
            trend: "Connected",
            timeframe: "Auto refresh 5s",
            icon: "globe",
            iconType: Feather,
            bgColor: "#FFFBEB",
            accentColor: "#FE9A00",
            gradientColors: ["#FE9A00", "#FF6900"],
            iconPulse: true,
        },
    ];

    return (
        <View style={styles.container}>
            {/* <View style={styles.controls}>
                <Text style={styles.sectionTitle}>Real-time Insights</Text>
                <View style={styles.toggleGroup}>
                    <TouchableOpacity
                        style={[
                            styles.toggleBtn,
                            gridMode === "1x1" && styles.activeToggle,
                        ]}
                        onPress={() => setGridMode("1x1")}
                    >
                        <MaterialCommunityIcons
                            name="view-stream"
                            size={18}
                            color={gridMode === "1x1" ? "#FFF" : "#64748B"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.toggleBtn,
                            gridMode === "2x2" && styles.activeToggle,
                        ]}
                        onPress={() => setGridMode("2x2")}
                    >
                        <MaterialCommunityIcons
                            name="view-grid"
                            size={18}
                            color={gridMode === "2x2" ? "#FFF" : "#64748B"}
                        />
                    </TouchableOpacity>
                </View>
            </View> */}

            <ScrollView contentContainerStyle={styles.gridContainer}>
                <View style={styles.row}>
                    {metrics.map((item) => (
                        <MetricCard
                            key={item.id}
                            item={item}
                            isFullWidth={gridMode === "1x1"}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
    toggleGroup: {
        flexDirection: "row",
        backgroundColor: "#E2E8F0",
        borderRadius: 8,
        padding: 2,
    },
    toggleBtn: { padding: 8, borderRadius: 6 },
    activeToggle: { backgroundColor: "#3B82F6" },
    gridContainer: { marginTop: 15 },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.05)",
        overflow: "hidden",
    },
    fullWidth: { width: "100%" },
    halfWidth: { width: (width - 32) / 2 - 5 },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    cardTitle: { fontSize: 11, fontWeight: "800", letterSpacing: 0.5 },
    iconBadge: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    value: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 4,
        marginTop: 5,
        marginBottom: 15,
    },
    timeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 16,
    },
    timeText: { fontSize: 12, color: "#64748B" },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.05)",
        backgroundColor: "#fff",
        marginBottom: -16,
        marginHorizontal: -16,
    },
    trendRow: { flexDirection: "row", alignItems: "center", gap: 2 },
    trendText: { fontSize: 12, fontWeight: "700", color: "#10B981" },
    comparisonText: { fontSize: 11, color: "#94A3B8" },
});

export default AnalyticsGrid;
