import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Sizes, Fonts } from "../../constants/styles";

const SourcePerformanceCard = ({ item }) => {
    return (
        <View
            style={[
                styles.card,
                { borderColor: item.accentColor || "#14B8A6" },
            ]}
        >
            <View style={styles.rowTop}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.sourceName}>{item.source}</Text>
                </View>

                <View style={styles.revenueBadge}>
                    <Text style={styles.revenueText}>₹{item.revenue}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>VISITORS</Text>
                    <Text style={styles.statValue}>{item.visitors}</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>NEW USERS</Text>
                    <Text style={styles.statValue}>{item.newUsers}</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>REPEAT</Text>
                    <Text style={styles.statValue}>{item.repeatUsers}</Text>
                </View>
            </View>

            <View style={styles.footerRow}>
                <View style={styles.footerItem}>
                    <Text style={styles.statLabel}>ORDERS</Text>
                    <Text style={styles.footerValue}>{item.orders}</Text>
                </View>

                <View style={styles.footerItem}>
                    <Text style={styles.statLabel}>ADD TO CART</Text>
                    <Text style={styles.footerValue}>{item.addToCart}</Text>
                </View>

                <View style={styles.convContainer}>
                    <Text style={styles.statLabel}>CONV. %</Text>
                    <View style={styles.convCircle}>
                        <Text style={styles.convText}>{item.convRate}%</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: Sizes.fixPadding + 5,
        marginBottom: Sizes.fixPadding,
        borderColor: "#e9ecef",
        borderLeftWidth: 5,
        marginHorizontal: 10,
    },

    rowTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sourceName: {
        ...Fonts.blackColor16Bold,
        color: "#1E293B",
    },
    subText: {
        fontSize: 12,
        color: "#94A3B8",
    },
    revenueBadge: {
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    revenueText: {
        color: "#15803D",
        fontSize: 14,
        fontWeight: "700",
    },
    divider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginVertical: 12,
    },
    statsGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    statBox: { flex: 1 },
    statLabel: {
        fontSize: 10,
        color: "#64748B",
        fontWeight: "700",
        marginBottom: 4,
    },
    statValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#334155",
    },
    footerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        padding: 12,
        borderRadius: 10,
    },
    footerItem: { flex: 1 },
    footerValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E293B",
    },
    convContainer: {
        alignItems: "center",
    },
    convCircle: {
        backgroundColor: "#DBEAFE",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 2,
    },
    convText: {
        color: "#1D4ED8",
        fontSize: 12,
        fontWeight: "700",
    },
});

export default SourcePerformanceCard;
