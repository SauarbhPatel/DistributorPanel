import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Optional: for the header background
import TrendChart from "./TrendChart";

const SlaTrendDashboard = () => {
    const data = [
        { date: "2025-02-11", breached: 1, atRisk: 8 },
        { date: "2025-02-12", breached: 0, atRisk: 5 },
        { date: "2025-02-13", breached: 2, atRisk: 10 },
        { date: "2025-02-14", breached: 1, atRisk: 7 },
        { date: "2025-02-15", breached: 1, atRisk: 12 },
        { date: "2025-02-16", breached: 0, atRisk: 9 },
        { date: "2025-02-17", breached: 0, atRisk: 12 },
    ];

    return (
        <View style={styles.container}>
            {/* Header Chart Section */}
            <View style={styles.chartWrapper}>
                <LinearGradient
                    colors={["#3b3eb1", "#4d90f5"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.header}
                >
                    <View style={styles.headerTitleRow}>
                        <View style={styles.iconBackground}>
                            <MaterialCommunityIcons
                                name="chart-timeline-variant"
                                size={18}
                                color="#fff"
                            />
                        </View>
                        <Text style={styles.headerTitle}>Trend</Text>
                        <Text style={styles.headerSubtitle}>last 7 days</Text>
                    </View>

                    <View style={styles.legendRow}>
                        <View style={styles.legendItem}>
                            <View
                                style={[
                                    styles.dot,
                                    { backgroundColor: "#ff5a5a" },
                                ]}
                            />
                            <Text style={styles.legendText}>Breached</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View
                                style={[
                                    styles.dot,
                                    { backgroundColor: "#ffbb33" },
                                ]}
                            />
                            <Text style={styles.legendText}>At Risk</Text>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.chartArea}>{/* <TrendChart /> */}</View>
            </View>

            {/* Table Section */}
            <View style={styles.tableCard}>
                <View style={styles.tableHeader}>
                    <Text style={styles.columnLabel}>DATE</Text>
                    <Text
                        style={[
                            styles.columnLabel,
                            { color: "#ef4444", textAlign: "center" },
                        ]}
                    >
                        BREACHED
                    </Text>
                    <Text
                        style={[
                            styles.columnLabel,
                            {
                                color: "#f59e0b",
                                textAlign: "center",
                            },
                        ]}
                    >
                        AT RISK
                    </Text>
                </View>

                {data.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.dateText}>{item.date}</Text>
                        <View style={styles.badgeContainer}>
                            <View
                                style={[
                                    styles.countBadge,
                                    { backgroundColor: "#fff1f2" },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.countText,
                                        { color: "#ef4444" },
                                    ]}
                                >
                                    {item.breached}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.badgeContainer}>
                            <View
                                style={[
                                    styles.countBadge,
                                    { backgroundColor: "#fffbeb" },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.countText,
                                        { color: "#f59e0b" },
                                    ]}
                                >
                                    {item.atRisk}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8fafc" },
    chartWrapper: {
        backgroundColor: "#fff",
        marginVertical: 12,
        borderRadius: 16,
        overflow: "hidden",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitleRow: { flexDirection: "row", alignItems: "center" },
    iconBackground: {
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 6,
        borderRadius: 8,
        marginRight: 10,
    },
    headerTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    headerSubtitle: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 12,
        marginLeft: 8,
    },
    legendRow: { flexDirection: "row", gap: 12 },
    legendItem: { flexDirection: "row", alignItems: "center", gap: 4 },
    dot: { width: 8, height: 8, borderRadius: 4 },
    legendText: { color: "#fff", fontSize: 11, fontWeight: "500" },
    chartArea: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    placeholderText: { color: "#94a3b8", fontSize: 12, fontStyle: "italic" },

    // Table Styles
    tableCard: {
        backgroundColor: "#fff",
        marginBottom: 20,
        borderRadius: 16,
        padding: 16,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
        paddingBottom: 12,
        marginBottom: 8,
    },
    columnLabel: {
        flex: 1,
        fontSize: 11,
        fontWeight: "bold",
        color: "#64748b",
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f8fafc",
    },
    dateText: { flex: 1, fontSize: 13, color: "#334155", fontWeight: "500" },
    badgeContainer: { flex: 1, alignItems: "center" },
    countBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        minWidth: 35,
        alignItems: "center",
    },
    countText: { fontSize: 13, fontWeight: "bold" },
});

export default SlaTrendDashboard;
