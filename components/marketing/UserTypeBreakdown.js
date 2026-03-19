import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DeviceRow = ({ label, count, percentage, colors }) => (
    <View style={styles.rowContainer}>
        <View style={styles.textRow}>
            <Text style={styles.deviceLabel}>{label}</Text>
            <View style={styles.statsRow}>
                <Text style={styles.countText}>{count.toLocaleString()}</Text>
                <LinearGradient
                    colors={colors}
                    style={styles.percentBadge}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.percentText}>{percentage}%</Text>
                </LinearGradient>
            </View>
        </View>

        <View style={styles.track}>
            <LinearGradient
                colors={colors}
                style={[styles.fill, { width: `${percentage}%` }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
        </View>
    </View>
);

const UserTypeBreakdown = () => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#615FFF", "#AD46FF"]}
                    style={styles.headerIcon}
                >
                    <MaterialCommunityIcons
                        name="chart-bar"
                        size={20}
                        color="white"
                    />
                </LinearGradient>
                <View>
                    <Text style={styles.headerTitle}>
                        Breakdown by User Type
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        ViewContent distribution
                    </Text>
                </View>
            </View>
            <View style={{ padding: 16 }}>
                <DeviceRow
                    label="New"
                    count={8466}
                    percentage={72}
                    colors={["#00C950", "#00BC7D"]}
                />
                <DeviceRow
                    label="Returning"
                    count={3112}
                    percentage={25}
                    colors={["#615FFF", "#AD46FF"]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
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
        backgroundColor: "#F8FAFC",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerIcon: {
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
    rowContainer: { marginBottom: 24 },
    textRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    statsRow: { flexDirection: "row", alignItems: "center" },
    deviceLabel: { fontSize: 15, fontWeight: "500", color: "#334155" },
    countText: { fontSize: 15, color: "#64748B", marginRight: 12 },

    percentBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        minWidth: 45,
        alignItems: "center",
    },
    percentText: { color: "white", fontWeight: "bold", fontSize: 13 },

    track: {
        height: 8,
        backgroundColor: "#F1F5F9",
        borderRadius: 4,
        overflow: "hidden",
    },
    fill: {
        height: "100%",
        borderRadius: 4,
    },
});
export default UserTypeBreakdown;
