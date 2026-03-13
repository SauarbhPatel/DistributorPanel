import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Sizes } from "../../constants/styles";

const { width } = Dimensions.get("window");
const cardWidth = (width - Sizes.fixPadding * 2 - 15) / 2;

const adsData = [
    {
        id: 1,
        title: "SELLERS RUNNING ADS",
        value: "3",
        sub: "Marketplace - Live",
        colors: ["#2B7FFF", "#155DFC"],
        icon: "person",
    },
    {
        id: 2,
        title: "ACTIVE CAMPAIGNS",
        value: "4",
        sub: "Last 30 days",
        colors: ["#AD46FF", "#9810FA"],
        icon: "email",
    },
    {
        id: 3,
        title: "TOTAL SPEND",
        value: "₹15,520",
        sub: "All spend - 30d",
        colors: ["#FF6900", "#F54900"],
        icon: "description",
    },
    {
        id: 4,
        title: "ORDERS",
        value: "88",
        sub: "From ads - 30d",
        colors: ["#00C950", "#00A63E"],
        icon: "shopping-cart",
    },
    {
        id: 5,
        title: "REVENUE",
        value: "₹79,680",
        sub: "Attributed - 30d",
        colors: ["#F6339A", "#E60076"],
        icon: "trending-up",
    },
];

const SellerAdsSnapshot = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons
                    name="chart-bar"
                    size={20}
                    color="#1E293B"
                />
                <Text style={styles.headerTitle}>Seller Ads Snapshot</Text>
            </View>
            <Text style={styles.headerSub}>
                Marketplace summary: sellers running ads, active campaigns,
                spend, orders, revenue (demo - updates with selection).
            </Text>

            <View style={styles.gridContainer}>
                {adsData.map((item) => (
                    <LinearGradient
                        key={item.id}
                        colors={item.colors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.adCard}
                    >
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <View style={styles.iconOverlay}>
                                <MaterialIcons
                                    name={item.icon}
                                    size={18}
                                    color="white"
                                />
                            </View>
                        </View>

                        <View style={styles.valueContainer}>
                            <Text style={styles.cardValue}>{item.value}</Text>
                            <Text style={styles.cardSub}>{item.sub}</Text>
                        </View>
                    </LinearGradient>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginLeft: 8,
    },
    headerSub: {
        fontSize: 13,
        color: "#64748B",
        marginBottom: 16,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    adCard: {
        width: cardWidth,
        borderRadius: 16,
        padding: 15,
        marginBottom: 15,
        justifyContent: "space-between",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: "800",
        color: "rgba(255, 255, 255, 0.9)",
        flex: 1,
    },
    iconOverlay: {
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        padding: 5,
        borderRadius: 8,
    },
    valueContainer: {
        marginTop: 10,
    },
    cardValue: {
        fontSize: 22,
        fontWeight: "800",
        color: "#FFFFFF",
    },
    cardSub: {
        fontSize: 9,
        color: "rgba(255, 255, 255, 0.8)",
        marginTop: 2,
    },
});

export default SellerAdsSnapshot;
