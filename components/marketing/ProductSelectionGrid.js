import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 45) / 2;

const ProductGridItem = ({ item }) => (
    <View style={styles.productCard}>
        <View
            style={[styles.imageContainer, { backgroundColor: item.bgColor }]}
        >
            <Feather name={item.icon} size={32} color="#475569" />
        </View>
        <Text style={styles.productTitle} numberOfLines={2}>
            {item.title}
        </Text>
        <View style={styles.skuBadge}>
            <Text style={styles.skuText}>{item.sku}</Text>
        </View>
        <View style={styles.priceContainer}>
            <Text style={[styles.priceText, { color: item.priceColor }]}>
                ₹{item.price}
            </Text>
            <Text style={styles.pieceText}> / piece</Text>
        </View>
    </View>
);

const ProductSelectionGrid = () => {
    const products = [
        {
            id: "1",
            title: "Wireless Bluetooth Earphones (Parent)",
            sku: "SKU-WB-PARENT",
            price: "2,499",
            icon: "headphones",
            bgColor: "#eff6ff",
            priceColor: "#2563eb",
        },
        {
            id: "2",
            title: "Portable SSD 1TB",
            sku: "SKU-SSD-1TB",
            price: "5,499",
            icon: "hard-drive",
            bgColor: "#fff1f2",
            priceColor: "#db2777",
        },
        {
            id: "3",
            title: "Noise Cancelling Headphones",
            sku: "SKU-NCH-01",
            price: "3,499",
            icon: "headphones",
            bgColor: "#f5f3ff",
            priceColor: "#7c3aed",
        },
        {
            id: "4",
            title: "Phone Holder Car Mount",
            sku: "SKU-PH-01",
            price: "899",
            icon: "smartphone",
            bgColor: "#fffbeb",
            priceColor: "#d97706",
        },
        {
            id: "5",
            title: "Smart Band Fitness Tracker",
            sku: "SKU-SB-01",
            price: "2,199",
            icon: "watch",
            bgColor: "#f0fdf4",
            priceColor: "#16a34a",
        },
    ];

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <LinearGradient
                        colors={["#2B7FFF", "#AD46FF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.mainIconBox}
                    >
                        <MaterialCommunityIcons
                            name="package-variant-closed"
                            size={24}
                            color="#FFFFFF"
                        />
                    </LinearGradient>
                    <View>
                        <Text style={styles.mainTitle}>
                            Products from My Listings
                        </Text>
                        <Text style={styles.subTitle}>
                            Select products to include in your new campaign.
                        </Text>
                    </View>
                </View>

                <View style={styles.searchRow}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by title, SKU, keywords..."
                        placeholderTextColor="#94a3b8"
                    />
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.outlineBtn}>
                            <Text style={styles.btnText}>Select all</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.outlineBtn}>
                            <Text style={styles.btnText}>Open My Listings</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.gridWrapper}>
                {products.map((item) => (
                    <ProductGridItem key={item.id} item={item} />
                ))}
            </View>

            <View style={styles.footer}>
                <View style={styles.countBadge}>
                    <Text style={styles.countText}>0 product(s) selected</Text>
                </View>
                <TouchableOpacity style={styles.disabledBtn} disabled>
                    <Ionicons
                        name="sparkles-outline"
                        size={14}
                        color="#94a3b8"
                    />
                    <Text style={styles.disabledBtnText}>
                        Create campaign with selected products
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 5,
    },
    header: {
        // padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    mainIconBox: {
        width: 40,
        height: 40,
        backgroundColor: "#6366f1",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        backgroundColor: "#F8FAFC",
        borderBottomWidth: 1,
        borderColor: "#F1F5F9",
        padding: 16,
    },
    mainTitle: { fontSize: 16, fontWeight: "700", color: "#1e293b" },
    subTitle: { fontSize: 12, color: "#64748b" },
    searchRow: { gap: 12, paddingHorizontal: 16, paddingBottom: 16 },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 13,
    },
    actionButtons: { flexDirection: "row", gap: 8 },
    outlineBtn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        backgroundColor: "#F8FAF0",
    },
    btnText: { fontSize: 12, fontWeight: "600", color: "#1e293b" },
    gridWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 8,
        justifyContent: "space-between",
    },
    productCard: {
        width: COLUMN_WIDTH,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 8,
        backgroundColor: "#fff",
    },
    imageContainer: {
        height: 100,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    productTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1e293b",
        height: 36,
    },
    skuBadge: {
        backgroundColor: "#F1F5F9",
        alignSelf: "flex-start",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginVertical: 6,
    },
    skuText: { fontSize: 10, color: "#64748b", fontWeight: "bold" },
    priceContainer: { flexDirection: "row", alignItems: "baseline" },
    priceText: { fontSize: 14, fontWeight: "700" },
    pieceText: { fontSize: 10, color: "#94a3b8" },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        flexDirection: "column",
        gap: 12,
    },
    countBadge: {
        backgroundColor: "#F1F5F9",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    countText: { fontSize: 12, color: "#475569", fontWeight: "600" },
    disabledBtn: {
        flexDirection: "row",
        backgroundColor: "#F1F5F9",
        padding: 12,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    disabledBtnText: { color: "#94a3b8", fontSize: 13, fontWeight: "600" },
});

export default ProductSelectionGrid;
