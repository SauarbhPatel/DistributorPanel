import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const ProductPerformanceCard = ({ item }) => {
    return (
        <View
            style={[
                styles.card,
                { borderColor: item.accentColor || "#10B981" },
            ]}
        >
            <View style={styles.rowTop}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.productName} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <View style={styles.convBadge}>
                    <Text style={styles.convText}>{item.convRate}%</Text>
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
                <View style={styles.orderContainer}>
                    <Text style={styles.statLabel}>ORDERS</Text>
                    <View style={styles.orderBadge}>
                        <Text style={styles.orderText}>{item.orders}</Text>
                    </View>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.statLabel}>REVENUE</Text>
                    <Text style={styles.revenueText}>₹{item.revenue}</Text>
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
        alignItems: "flex-start",
    },
    productName: {
        ...Fonts.blackColor14Bold,
        fontSize: 15,
        marginBottom: 2,
    },
    categoryText: {
        fontSize: 12,
        color: "#94A3B8",
    },
    convBadge: {
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    convText: {
        color: "#15803D",
        fontSize: 12,
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
    statBox: {
        flex: 1,
    },
    statLabel: {
        fontSize: 10,
        color: "#64748B",
        fontWeight: "700",
        letterSpacing: 0.5,
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
        padding: 10,
        borderRadius: 8,
    },
    orderContainer: {
        flexDirection: "column",
    },
    orderBadge: {
        backgroundColor: "#E0E7FF",
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 5,
        alignSelf: "flex-start",
        marginTop: 2,
    },
    orderText: {
        color: "#4F46E5",
        fontSize: 13,
        fontWeight: "700",
    },
    revenueText: {
        fontSize: 16,
        fontWeight: "800",
        color: "#1E293B",
    },
});

export default ProductPerformanceCard;
