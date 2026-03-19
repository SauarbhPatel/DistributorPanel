import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const FunnelStep = ({
    icon,
    title,
    subtitle,
    count,
    percentage,
    dropoff,
    color,
    barWidth,
}) => (
    <View style={styles.stepContainer}>
        <View style={styles.row}>
            <LinearGradient
                colors={[color, color + "CC"]}
                style={styles.iconBox}
            >
                <MaterialCommunityIcons name={icon} size={20} color="white" />
            </LinearGradient>

            <View style={styles.titleArea}>
                <Text style={styles.stepTitle}>{title}</Text>
                <Text style={styles.stepSubtitle}>{subtitle}</Text>
            </View>

            <View style={styles.statsArea}>
                <Text style={styles.countText}>{count.toLocaleString()}</Text>
                {dropoff ? (
                    <View style={styles.dropoffRow}>
                        <MaterialCommunityIcons
                            name="trending-down"
                            size={12}
                            color="#ff4d4d"
                        />
                        <Text style={styles.dropoffText}>{dropoff} drop</Text>
                    </View>
                ) : null}
            </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBg}>
            <View
                style={[
                    styles.progressBarFill,
                    { width: `${barWidth}%`, backgroundColor: color },
                ]}
            >
                <View
                    style={[
                        styles.percentagePill,
                        {
                            backgroundColor: color,
                            minWidth: 40,
                            alignSelf: "center",
                        },
                    ]}
                >
                    <Text style={styles.percentageText}>{percentage}</Text>
                </View>
            </View>
        </View>
    </View>
);

const ConversionFunnel = () => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <LinearGradient
                        colors={["#AD46FF", "#2B7FFF"]}
                        style={styles.funnelIcon}
                    >
                        <MaterialCommunityIcons
                            name="filter-outline"
                            size={20}
                            color="#ffffff"
                        />
                    </LinearGradient>
                    <View>
                        <Text style={styles.headerTitle}>Conversion path</Text>
                        <Text style={styles.headerSubtitle}>
                            Funnel counts (demo) .{"\n"}Last 30 days.
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <MaterialCommunityIcons
                        name="filter-outline"
                        size={16}
                        color="#64748b"
                    />
                    <Text style={styles.filterText}>Filters</Text>
                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={16}
                        color="#64748b"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.stepsContainer}>
                <FunnelStep
                    icon="eye-outline"
                    title="ViewContent"
                    subtitle="100.0% of initial"
                    count={12450}
                    percentage="100.0%"
                    color="#00a8ff"
                    barWidth={100}
                />
                <FunnelStep
                    icon="cart-outline"
                    title="AddToCart"
                    subtitle="16.9% of initial"
                    count={2100}
                    percentage="16.90%"
                    dropoff="83.1%"
                    color="#d633ff"
                    barWidth={16.9}
                />
                <FunnelStep
                    icon="cursor-default-outline"
                    title="InitiateCheckout"
                    subtitle="7.1% of initial"
                    count={890}
                    percentage="7.1%"
                    dropoff="57.6%"
                    color="#ff8c00"
                    barWidth={7.1}
                />
                <FunnelStep
                    icon="credit-card-outline"
                    title="Purchase"
                    subtitle="1.3% of initial"
                    count={156}
                    percentage="1.3%"
                    dropoff="82.5%"
                    color="#00c853"
                    barWidth={5}
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
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
        padding: 16,
        backgroundColor: "#F8FAFC",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerLeft: { flexDirection: "row", alignItems: "center" },
    funnelIcon: {
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
    filterBtn: {
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
    },
    filterText: { marginHorizontal: 4, fontSize: 12, color: "#64748b" },
    stepsContainer: {
        padding: 16,
    },
    stepContainer: { marginBottom: 25 },
    row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    titleArea: { flex: 1 },
    stepTitle: { fontWeight: "bold", color: "#1e293b", fontSize: 14 },
    stepSubtitle: { fontSize: 12, color: "#94a3b8" },
    statsArea: { alignItems: "flex-end" },
    countText: { fontWeight: "bold", color: "#1e293b", fontSize: 15 },
    dropoffRow: { flexDirection: "row", alignItems: "center" },
    dropoffText: { fontSize: 11, color: "#ff4d4d", marginLeft: 2 },

    progressBarBg: {
        height: 6,
        backgroundColor: "#f1f5f9",
        borderRadius: 10,
        width: "100%",
        position: "relative",
        justifyContent: "center",
    },
    progressBarFill: {
        height: "100%",
        borderRadius: 10,
        position: "relative",
    },
    percentagePill: {
        position: "absolute",
        right: -15,
        top: -6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "white",
    },
    percentageText: {
        color: "white",
        fontSize: 9,
        fontWeight: "bold",
    },
});
export default ConversionFunnel;
