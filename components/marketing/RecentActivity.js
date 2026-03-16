import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const ActivityItem = ({ title, subtitle, time, dotColor }) => (
    <View style={styles.activityItem}>
        <View style={styles.itemLeftContent}>
            {/* The Status Dot */}
            <View style={[styles.dot, { backgroundColor: dotColor }]} />
            <View>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemSubtitle}>{subtitle}</Text>
            </View>
        </View>
        <Text style={styles.timeText}>{time}</Text>
    </View>
);

const RecentActivity = () => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Feather name="activity" size={20} color="#3B82F6" />
                <Text style={styles.headerTitle}>Recent Activity</Text>
            </View>

            {/* List Section */}
            <View style={styles.listContainer}>
                <ActivityItem
                    title="Catalog synced"
                    subtitle="24 products updated"
                    time="2h ago"
                    dotColor="#10B981" // Green
                />
                <ActivityItem
                    title="Campaign launched"
                    subtitle="Summer Sale 2026"
                    time="5h ago"
                    dotColor="#3B82F6" // Blue
                />
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
        marginTop: 15,
    },
    header: {
        backgroundColor: "#F0F9FF",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 18,
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    listContainer: {
        padding: 16,
        gap: 12,
    },
    activityItem: {
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    itemLeftContent: {
        flexDirection: "row",
        // alignItems: "center",
        gap: 12,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1E293B",
    },
    itemSubtitle: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 2,
    },
    timeText: {
        fontSize: 13,
        color: "#94A3B8",
    },
});

export default RecentActivity;
