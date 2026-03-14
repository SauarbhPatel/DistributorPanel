import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import TablePagination from "./TablePagination";

const ProductDataCard = ({ item, isSelected }) => {
    return (
        <View style={[styles.card, isSelected && styles.selectedCard]}>
            <View style={styles.headerRow}>
                <View style={styles.leftHeader}>
                    <TouchableOpacity style={styles.checkbox}>
                        <MaterialCommunityIcons
                            name={
                                isSelected
                                    ? "checkbox-marked"
                                    : "checkbox-blank-outline"
                            }
                            size={20}
                            color={isSelected ? "#10b981" : "#cbd5e1"}
                        />
                    </TouchableOpacity>
                    <View style={styles.skuBadge}>
                        <Text style={styles.skuText}>{item.sku}</Text>
                    </View>
                </View>

                <View style={styles.statusRow}>
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={16}
                        color="#10b981"
                    />
                    <Text style={styles.statusText}>OK</Text>
                </View>
            </View>

            <View style={styles.mainContent}>
                <View style={styles.imagePlaceholder}>
                    <Feather name="headphones" size={24} color="#94a3b8" />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.titleText} numberOfLines={2}>
                        {item.title}
                    </Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceText}>₹{item.price}</Text>
                        <View style={styles.stockBadge}>
                            <Text style={styles.stockText}>in stock</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Bottom Section: Links */}
            <View style={styles.linkSection}>
                <View style={styles.linkItem}>
                    <Text style={styles.linkLabel}>link:</Text>
                    <Text style={styles.linkValue} numberOfLines={1}>
                        {item.link}
                    </Text>
                </View>
                <View style={styles.linkItem}>
                    <Text style={styles.linkLabel}>image_link:</Text>
                    <Text style={styles.linkValue} numberOfLines={1}>
                        {item.imageLink}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const ProductList = () => {
    const data = [
        {
            id: 1,
            sku: "SKU-WB-PARENT",
            title: "Wireless Bluetooth Earphones (Parent)",
            price: "2499",
            link: "/p/list-active-1",
            imageLink: "",
            isSelected: true,
        },
        {
            id: 2,
            sku: "SKU-SSD-1TB",
            title: "Wireless Bluetooth Earphones (Parent)",
            price: "2499",
            link: "/p/list-active-1",
            imageLink: "",
            isSelected: false,
        },
    ];

    return (
        <>
            <View style={styles.container}>
                {data.map((item) => (
                    <ProductDataCard
                        key={item.id}
                        item={item}
                        isSelected={item.isSelected}
                    />
                ))}
            </View>
            <TablePagination />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    selectedCard: {
        borderColor: "#2563eb",
        backgroundColor: "#eff6ff",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    leftHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    checkbox: {
        marginRight: 4,
    },
    skuBadge: {
        backgroundColor: "#f1f5f9",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    skuText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#475569",
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#10b981",
    },
    mainContent: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 12,
    },
    imagePlaceholder: {
        width: 60,
        height: 60,
        backgroundColor: "#f1f5f9",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    infoContainer: {
        flex: 1,
        justifyContent: "center",
    },
    titleText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1e293b",
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    priceText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1e293b",
    },
    stockBadge: {
        backgroundColor: "#dcfce7",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    stockText: {
        fontSize: 11,
        color: "#166534",
        fontWeight: "500",
    },
    linkSection: {
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        paddingTop: 10,
        gap: 4,
    },
    linkItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    linkLabel: {
        fontSize: 11,
        color: "#94a3b8",
        width: 70,
    },
    linkValue: {
        fontSize: 11,
        color: "#2563eb",
        flex: 1,
    },
});

export default ProductList;
