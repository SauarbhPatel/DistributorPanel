import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
    MaterialCommunityIcons,
    FontAwesome5,
    Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const SourceItem = ({
    title,
    reach,
    count,
    icon,
    iconType,
    colors,
    progress,
}) => (
    <View style={styles.itemContainer}>
        <View style={styles.infoRow}>
            <View style={[styles.iconBadge, { backgroundColor: colors[0] }]}>
                {iconType === "material" ? (
                    <MaterialCommunityIcons
                        name={icon}
                        size={18}
                        color="#FFF"
                    />
                ) : iconType === "font-awesome" ? (
                    <FontAwesome5 name={icon} size={16} color="#FFF" />
                ) : (
                    <Ionicons name={icon} size={18} color="#FFF" />
                )}
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.sourceTitle}>{title}</Text>
                <Text style={styles.reachText}>{reach}% reach</Text>
            </View>
            <View style={[styles.countBadge, { backgroundColor: colors[0] }]}>
                <Text style={styles.countText}>{count}</Text>
            </View>
        </View>

        {/* Progress Bar Container */}
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

const TrafficSourcesCard = () => {
    const sources = [
        {
            id: 1,
            title: "Google",
            reach: 100,
            count: 3,
            icon: "magnify",
            iconType: "material",
            progress: 100,
            colors: ["#3B82F6", "#22D3EE"],
        },
        {
            id: 2,
            title: "Direct",
            reach: 67,
            count: 2,
            icon: "link-variant",
            iconType: "material",
            progress: 67,
            colors: ["#A855F7", "#EC4899"],
        },
        {
            id: 3,
            title: "Facebook",
            reach: 33,
            count: 1,
            icon: "users",
            iconType: "font-awesome",
            progress: 33,
            colors: ["#615FFF", "#2B7FFF"],
        },
        {
            id: 4,
            title: "Youtube",
            reach: 0,
            count: 0,
            icon: "television-classic",
            iconType: "material",
            progress: 2,
            colors: ["#EF4444", "#F87171"],
        },
        {
            id: 5,
            title: "Others",
            reach: 33,
            count: 1,
            icon: "web",
            iconType: "material",
            progress: 33,
            colors: ["#10B981", "#34D399"],
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#00C950", "#00BC7D"]}
                    style={styles.headerIconContainer}
                >
                    <Ionicons name="globe-outline" size={22} color="#FFF" />
                </LinearGradient>

                <View>
                    <Text style={styles.headerTitle}>Traffic sources</Text>
                    <Text style={styles.headerSubtitle}>
                        Active users by source
                    </Text>
                </View>
            </View>

            <View style={styles.list}>
                {sources.map((item) => (
                    <SourceItem key={item.id} {...item} />
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
        backgroundColor: "#F0FDF4",
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerIconContainer: {
        width: 40,
        height: 40,
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
        marginBottom: 8,
    },
    iconBadge: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    titleContainer: {
        flex: 1,
    },
    sourceTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
    },
    reachText: {
        fontSize: 12,
        color: "#94A3B8",
    },
    countBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    countText: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: "800",
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: "#F1F5F9",
        borderRadius: 4,
        width: "100%",
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        borderRadius: 4,
    },
});

export default TrafficSourcesCard;
