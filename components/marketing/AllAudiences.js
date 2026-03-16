import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const AudienceCard = ({
    title,
    size,
    source,
    type,
    icon,
    gradientColors,
    progress,
    progressColor,
}) => (
    <View style={[styles.card, { backgroundColor: gradientColors[0] + 10 }]}>
        <View style={styles.cardHeader}>
            {/* Icon with Linear Gradient */}
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBox}
            >
                <MaterialCommunityIcons name={icon} size={20} color="#FFF" />
            </LinearGradient>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.badge}
            >
                <Text style={styles.badgeText}>{type}</Text>
            </LinearGradient>
        </View>

        <Text style={styles.audienceTitle}>{title}</Text>

        <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Size:</Text>
            <Text style={styles.statValue}>{size}</Text>
        </View>

        <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Source:</Text>
            <Text style={styles.statValue}>{source}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
            <View
                style={[
                    styles.progressBarBackground,
                    { opacity: 0.1, backgroundColor: progressColor },
                ]}
            />
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.progressBarFill,
                    { width: `${progress}%`, backgroundColor: progressColor },
                ]}
            ></LinearGradient>
        </View>
    </View>
);

const AllAudiences = () => {
    return (
        <View style={styles.container}>
            {/* Main Header */}
            <View style={styles.header}>
                <LinearGradient
                    colors={["#6366F1", "#A855F7"]}
                    style={styles.headerIconBox}
                >
                    <Ionicons name="stats-chart" size={20} color="#FFF" />
                </LinearGradient>
                <View>
                    <Text style={styles.headerTitle}>All Audiences</Text>
                    <Text style={styles.headerSubtitle}>
                        Manage your targeting audiences for campaigns.
                    </Text>
                </View>
            </View>

            <View style={styles.verticalStack}>
                <AudienceCard
                    title="Website visitors (30d)"
                    size="15,420"
                    source="Pixel"
                    type="CUSTOM"
                    icon="eye-outline"
                    gradientColors={["#3B82F6", "#2DD4BF"]}
                    progress={65}
                    progressColor="#06B6D4"
                />
                <AudienceCard
                    title="AddToCart not Purchase"
                    size="3,200"
                    source="Pixel"
                    type="CUSTOM"
                    icon="cart-outline"
                    gradientColors={["#AD46FF", "#F6339A"]}
                    progress={40}
                    progressColor="#AD46FF"
                />
                <AudienceCard
                    title="Past purchasers (60d)"
                    size="890"
                    source="CAPI"
                    type="CUSTOM"
                    icon="account-group"
                    gradientColors={["#00C950", "#00BC7D"]}
                    progress={25}
                    progressColor="#00C950"
                />
                <AudienceCard
                    title="Lookalike 1%"
                    size="500,000"
                    source="Purchasers"
                    type="LOOKALIKE"
                    icon="target"
                    gradientColors={["#615FFF", "#AD46FF"]}
                    progress={85}
                    progressColor="#615FFF"
                />
                <AudienceCard
                    title="India 18-45"
                    size="12.0M"
                    source="Location + Age"
                    type="CORE"
                    icon="web"
                    gradientColors={["#00BC7D", "#00BBA7"]}
                    progress={100}
                    progressColor="#00BC7D"
                />
            </View>
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
        marginTop: 5,
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
    verticalStack: {
        flexDirection: "column",
        gap: 16,
        padding: 16,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        width: "100%",
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        color: "#FFF",
        fontSize: 9,
        fontWeight: "800",
    },
    audienceTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: "#64748B",
    },
    statValue: {
        fontSize: 12,
        fontWeight: "600",
        color: "#475569",
    },
    progressBarContainer: {
        height: 6,
        width: "100%",
        marginTop: 16,
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
    },
    progressBarBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    progressBarFill: {
        height: "100%",
        borderRadius: 3,
    },
});

export default AllAudiences;
