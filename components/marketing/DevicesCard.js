import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const DeviceItem = ({ title, usage, userCount, icon, colors, progress }) => (
    <View style={styles.itemContainer}>
        <View style={styles.infoRow}>
            <View style={[styles.iconBadge, { backgroundColor: colors[0] }]}>
                <MaterialCommunityIcons name={icon} size={16} color="#FFF" />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.deviceTitle}>{title}</Text>
                <Text style={styles.usageText}>{usage}% usage</Text>
            </View>
            <View style={[styles.userBadge, { backgroundColor: colors[0] }]}>
                <Text style={styles.userBadgeText}>{userCount} users</Text>
            </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: `${progress}%` }]}
            />
        </View>
    </View>
);

const DevicesCard = () => {
    const deviceData = [
        {
            id: 1,
            title: "Mobile",
            usage: 90,
            userCount: 5,
            icon: "cellphone",
            progress: 90,
            colors: ["#3B82F6", "#22D3EE"],
        },
        {
            id: 2,
            title: "Desktop",
            usage: 60,
            userCount: 3,
            icon: "monitor",
            progress: 60,
            colors: ["#A855F7", "#EC4899"],
        },
        {
            id: 3,
            title: "Tablet",
            usage: 20,
            userCount: 1,
            icon: "tablet-android",
            progress: 20,
            colors: ["#10B981", "#34D399"],
        },
    ];

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#FF6900", "#FE9A00"]}
                    style={styles.headerIconContainer}
                >
                    <Feather name="smartphone" size={20} color="#FFF" />
                </LinearGradient>
                <View>
                    <Text style={styles.headerTitle}>Devices</Text>
                    <Text style={styles.headerSubtitle}>
                        Active users by device
                    </Text>
                </View>
            </View>

            <View style={styles.list}>
                {deviceData.map((item) => (
                    <DeviceItem key={item.id} {...item} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#FFF7ED",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerIconContainer: {
        width: 40,
        height: 40,
        backgroundColor: "#FFF",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
    },
    headerTitle: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
    headerSubtitle: { fontSize: 12, color: "#64748B", marginTop: 2 },
    list: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 20,
    },
    itemContainer: {
        width: "100%",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    iconBadge: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    titleContainer: {
        flex: 1,
    },
    deviceTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
    },
    usageText: {
        fontSize: 12,
        color: "#94A3B8",
    },
    userBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    userBadgeText: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: "700",
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: "#F1F5F9",
        borderRadius: 4,
        width: "100%",
    },
    progressBarFill: {
        height: "100%",
        borderRadius: 4,
    },
});

export default DevicesCard;
