import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const EventItem = ({
    title,
    count,
    icon,
    iconType,
    bgColor,
    iconColor,
    textColor,
}) => (
    <View style={[styles.itemContainer, { backgroundColor: bgColor }]}>
        <View style={[styles.iconBadge, { backgroundColor: iconColor }]}>
            {iconType === "material" ? (
                <MaterialCommunityIcons name={icon} size={16} color="#FFF" />
            ) : iconType === "ionicons" ? (
                <Ionicons name={icon} size={16} color="#FFF" />
            ) : (
                <Feather name={icon} size={16} color="#FFF" />
            )}
        </View>

        <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.statsText}>{count} occurrences</Text>
        </View>

        <View style={[styles.countBadge, { borderColor: textColor }]}>
            <Text style={[styles.countText, { color: textColor }]}>
                {count}
            </Text>
        </View>
    </View>
);

const TopEventsCard = () => {
    const events = [
        {
            id: 1,
            title: "Page View",
            count: 37,
            icon: "eye-outline",
            iconType: "material",
            bgColor: "#F0F9FF",
            iconColor: "#0EA5E9",
            textColor: "#0EA5E9",
        },
        {
            id: 2,
            title: "Session Start",
            count: 9,
            icon: "cursor-default-click-outline",
            iconType: "material",
            bgColor: "#FAF5FF",
            iconColor: "#A855F7",
            textColor: "#A855F7",
        },
        {
            id: 3,
            title: "Add To Cart",
            count: 6,
            icon: "cart-outline",
            iconType: "material",
            bgColor: "#F0FDF4",
            iconColor: "#22C55E",
            textColor: "#22C55E",
        },
        {
            id: 4,
            title: "Begin Checkout",
            count: 3,
            icon: "target",
            iconType: "material",
            bgColor: "#FFFBEB",
            iconColor: "#F59E0B",
            textColor: "#F59E0B",
        },
        {
            id: 5,
            title: "Purchase",
            count: 1,
            icon: "cart",
            iconType: "material",
            bgColor: "#FEF2F2",
            iconColor: "#EF4444",
            textColor: "#EF4444",
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#AD46FF", "#F6339A"]}
                    style={styles.headerIconContainer}
                >
                    <MaterialCommunityIcons
                        name="lightning-bolt"
                        size={20}
                        color="#FFF"
                    />
                </LinearGradient>
                <View>
                    <Text style={styles.headerTitle}>
                        Top events (real-time)
                    </Text>
                    <Text style={styles.headerSubtitle}>Last 30 min</Text>
                </View>
            </View>

            <View style={styles.list}>
                {events.map((item) => (
                    <EventItem key={item.id} {...item} />
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
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#FAF5FF",
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
    list: { padding: 12, gap: 8 },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    iconBadge: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
    },
    statsText: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 2,
    },
    countBadge: {
        width: 28,
        height: 28,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    countText: {
        fontSize: 12,
        fontWeight: "700",
    },
});

export default TopEventsCard;
