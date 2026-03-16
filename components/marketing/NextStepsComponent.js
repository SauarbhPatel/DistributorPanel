import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const StepCard = ({
    title,
    description,
    linkText,
    icon,
    iconColors,
    statusIcon,
    statusColor,
    bg,
}) => (
    <View style={[styles.stepCard, { backgroundColor: bg }]}>
        <View style={styles.cardTopRow}>
            <LinearGradient colors={iconColors} style={styles.iconBox}>
                <MaterialCommunityIcons name={icon} size={24} color="#FFF" />
            </LinearGradient>
            <View
                style={[styles.statusBadge, { backgroundColor: statusColor }]}
            >
                <Ionicons name={statusIcon} size={18} color="#FFF" />
            </View>
        </View>

        <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDescription}>{description}</Text>
        </View>

        <TouchableOpacity>
            <Text style={[styles.cardLink, { color: iconColors[0] }]}>
                {linkText}
            </Text>
        </TouchableOpacity>
    </View>
);

const NextStepsComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#D946EF", "#C026D3"]}
                    style={styles.headerIconContainer}
                >
                    <MaterialCommunityIcons
                        name="lightning-bolt"
                        size={20}
                        color="#FFF"
                    />
                </LinearGradient>
                <View>
                    <Text style={styles.headerTitle}>Your next steps</Text>
                    <Text style={styles.headerSubtitle}>
                        Connect assets and launch campaigns.
                    </Text>
                </View>
            </View>

            <View style={styles.stepsContainer}>
                <StepCard
                    title="Connections"
                    description="Business, Ad Account, Domain verification"
                    linkText="View details"
                    icon="link-variant"
                    iconColors={["#0EA5E9", "#3B82F6"]}
                    statusIcon="checkmark-circle-outline"
                    statusColor="#10B981"
                    bg="#F0F9FF"
                />
                <StepCard
                    title="Product Catalog Sync"
                    description="Feed from My Listings, validation"
                    linkText="Continue setup"
                    icon="package-variant-closed"
                    iconColors={["#10B981", "#22C55E"]}
                    statusIcon="time-outline"
                    statusColor="#F59E0B"
                    bg="#F0FDF4"
                />
                <StepCard
                    title="Campaigns"
                    description="Create catalog & conversion campaigns"
                    linkText="Get started"
                    icon="target"
                    iconColors={["#D946EF", "#C026D3"]}
                    statusIcon="chevron-forward"
                    statusColor="#94A3B8"
                    bg="#FAF5FF"
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
        backgroundColor: "#F8FAFC",
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
    stepsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 16,
    },
    stepCard: {
        borderRadius: 12,
        padding: 16,
        justifyContent: "space-between",
    },
    cardTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    statusBadge: {
        width: 30,
        height: 30,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#FFF",
    },
    cardContent: {
        marginVertical: 12,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
    },
    cardDescription: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 4,
        lineHeight: 18,
    },
    cardLink: {
        fontSize: 13,
        fontWeight: "600",
    },
});

export default NextStepsComponent;
