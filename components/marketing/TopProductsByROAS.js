import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ProductRow = ({ name, roas, badgeColors }) => (
    <View style={styles.productCard}>
        <Text style={styles.productName}>{name}</Text>
        <LinearGradient
            colors={badgeColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.roasBadge}
        >
            <Text style={styles.roasText}>ROAS {roas}</Text>
        </LinearGradient>
    </View>
);

const TopProductsByROAS = () => {
    const products = [
        {
            id: "1",
            name: "Wireless Bluetooth Earphones",
            roas: "18.2",
            colors: ["#3B82F6", "#2DD4BF"], // Blue-Teal
        },
        {
            id: "2",
            name: "Wireless Bluetooth Earphones - Black",
            roas: "16.5",
            colors: ["#A855F7", "#EC4899"], // Purple-Pink
        },
        {
            id: "3",
            name: "Portable Bluetooth Speaker",
            roas: "14.1",
            colors: ["#22C55E", "#10B981"], // Green
        },
        {
            id: "4",
            name: "Wireless Bluetooth Earphones - White",
            roas: "15.2",
            colors: ["#F97316", "#FACC15"], // Orange-Yellow
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#AD46FF", "#F6339A"]}
                    style={styles.headerIcon}
                >
                    <MaterialCommunityIcons
                        name="package-variant-closed"
                        size={20}
                        color="#FFF"
                    />
                </LinearGradient>
                <View>
                    <Text style={styles.headerTitle}>
                        Top products by ROAS (demo)
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        SKU-level performance from catalog ads + store orders.
                    </Text>
                </View>
            </View>

            {/* List Section */}
            <View style={styles.listContainer}>
                {products.map((item) => (
                    <ProductRow
                        key={item.id}
                        name={item.name}
                        roas={item.roas}
                        badgeColors={item.colors}
                    />
                ))}
            </View>

            {/* Footer Section */}
            <TouchableOpacity style={styles.viewAllBtn}>
                <Text style={styles.viewAllText}>View all</Text>
                <Feather name="chevron-right" size={16} color="#64748B" />
            </TouchableOpacity>
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
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
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
        maxWidth: "85%",
    },
    listContainer: {
        padding: 16,
        gap: 16,
    },
    productCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    productName: {
        fontSize: 13,
        fontWeight: "500",
        color: "#334155",
        flex: 1,
        marginRight: 10,
    },
    roasBadge: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        minWidth: 100,
        alignItems: "center",
    },
    roasText: {
        color: "#FFF",
        fontSize: 13,
        fontWeight: "700",
    },
    viewAllBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        margin: 16,
        marginTop: 0,
        borderRadius: 12,
    },
    viewAllText: {
        fontSize: 14,
        color: "#64748B",
        fontWeight: "600",
        marginRight: 4,
    },
});

export default TopProductsByROAS;
