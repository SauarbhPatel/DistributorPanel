import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PixelStatus = () => {
    return (
        <View style={styles.card}>
            <View style={styles.topSection}>
                <View style={styles.header}>
                    <LinearGradient
                        colors={["#A855F7", "#7C3AED"]}
                        style={styles.iconBox}
                    >
                        <MaterialCommunityIcons
                            name="flash"
                            size={20}
                            color="white"
                        />
                    </LinearGradient>
                    <View>
                        <Text style={styles.headerTitle}>Pixel status</Text>
                        <Text style={styles.headerSubtitle}>
                            Events per day; sudden drops indicate tracking
                            issues.
                        </Text>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <Text style={styles.bigNumber}>1,247</Text>
                    <Text style={styles.eventsLabel}>Events today</Text>
                </View>

                <View style={styles.badge}>
                    <MaterialCommunityIcons
                        name="check-circle-outline"
                        size={14}
                        color="#22C55E"
                    />
                    <Text style={styles.badgeText}>Healthy</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.bottomSection}>
                <View style={styles.chartFooter}>
                    <Text style={styles.footerDate}>7 days ago</Text>
                    <Text style={styles.footerDate}>Today</Text>
                </View>
            </View>
        </View>
    );
};

export default PixelStatus;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    topSection: {
        padding: 16,
        backgroundColor: "#FAF5FF",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    iconBox: {
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
        maxWidth: "85%",
    },
    statsContainer: { marginBottom: 12 },
    bigNumber: { fontSize: 36, fontWeight: "bold", color: "#7C3AED" },
    eventsLabel: { fontSize: 14, color: "#64748B" },

    badge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    badgeText: {
        color: "#15803D",
        fontWeight: "bold",
        marginLeft: 4,
        fontSize: 13,
    },

    divider: { height: 1, backgroundColor: "#F1F5F9" },

    bottomSection: {
        backgroundColor: "white",
        padding: 20,
        justifyContent: "space-between",
    },
    chartPlaceholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: { color: "#E2E8F0", fontSize: 12 },
    chartFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    footerDate: { fontSize: 12, color: "#94A3B8" },
});
