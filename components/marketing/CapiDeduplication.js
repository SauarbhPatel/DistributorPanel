import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SubStat = ({ label, value }) => (
    <View style={styles.subStatCard}>
        <Text style={styles.subStatLabel}>{label}</Text>
        <Text style={styles.subStatValue}>{value.toLocaleString()}</Text>
    </View>
);

const CapiDeduplication = () => {
    const dedupRatio = 92;

    return (
        <View style={styles.card}>
            {/* Top Section - Light Teal Background */}
            <View style={styles.topSection}>
                <View style={styles.header}>
                    <LinearGradient
                        colors={["#00C9A7", "#009D83"]}
                        style={styles.iconBox}
                    >
                        <MaterialCommunityIcons
                            name="server-network"
                            size={20}
                            color="white"
                        />
                    </LinearGradient>
                    <View>
                        <Text style={styles.headerTitle}>
                            CAPI & deduplication
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            Server events and match quality.
                        </Text>
                    </View>
                </View>

                <View style={styles.mainStats}>
                    <Text style={styles.bigNumber}>456</Text>
                    <Text style={styles.mainLabel}>CAPI events today</Text>
                </View>

                {/* Dedup Ratio Bar */}
                <View style={styles.ratioContainer}>
                    <View style={styles.ratioTextRow}>
                        <Text style={styles.ratioLabel}>Dedup ratio</Text>
                        <Text style={styles.ratioValue}>{dedupRatio}%</Text>
                    </View>
                    <View style={styles.track}>
                        <View
                            style={[styles.fill, { width: `${dedupRatio}%` }]}
                        />
                    </View>
                </View>
            </View>

            {/* Bottom Section - White Background */}
            <View style={styles.bottomSection}>
                <View style={styles.subStatRow}>
                    <SubStat label="Pixel Events" value={1247} />
                    <SubStat label="Server Events" value={456} />
                </View>
            </View>
        </View>
    );
};

export default CapiDeduplication;

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
        backgroundColor: "#F0FDF4",
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
    headerTitle: { fontSize: 16, fontWeight: "bold", color: "#064E3B" },
    headerSubtitle: { fontSize: 12, color: "#065F46", opacity: 0.7 },

    mainStats: { marginBottom: 20 },
    bigNumber: { fontSize: 36, fontWeight: "bold", color: "#047857" },
    mainLabel: { fontSize: 14, color: "#334155" },

    ratioContainer: { marginBottom: 10 },
    ratioTextRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    ratioLabel: { fontSize: 13, color: "#64748B" },
    ratioValue: { fontSize: 13, fontWeight: "bold", color: "#059669" },
    track: {
        height: 8,
        backgroundColor: "#E2E8F0",
        borderRadius: 10,
        overflow: "hidden",
    },
    fill: {
        height: "100%",
        backgroundColor: "#00B894",
        borderRadius: 10,
    },

    bottomSection: {
        padding: 20,
        backgroundColor: "white",
    },
    subStatRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    subStatCard: {
        flex: 1,
        backgroundColor: "white",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    subStatLabel: { fontSize: 13, color: "#64748B", marginBottom: 6 },
    subStatValue: { fontSize: 18, fontWeight: "bold", color: "#1E293B" },
});
