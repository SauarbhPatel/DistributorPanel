import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const ORDER_DATA = [
    {
        id: "ORD-2024-002502",
        product: "Phone Holder",
        image: "https://images.unsplash.com/photo-1621535706240-a19f61b7b752?q=80&w=300",
        sku: "SKU-TS-202 · FashionStore",
        seller: "GadgetHub",
        date: "15 Feb 2024, 03:00 pm",
        buyer: "Anjali Mehta",
        address: "3, T Nagar, Chennai, Tamil Nadu 600017",
        phone: "+91 89012 34567",
        total: "₹1,121",
        status: "New Order",
        statusType: "NEW ORDER", // Blue ribbon
        payment: "COD",
        sla: "Breached 4h 17m",
        isBreached: true,
    },
    {
        id: "ORD-BF-2024-005",
        product: "Pro Radio Unit",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=300",
        sku: "SKU-BF-05 · BAOFENG",
        seller: "GadgetHub",
        date: "15 Feb 2024, 08:00 pm",
        buyer: "Preeti Sharma",
        address: "Sohna Road, Gurgaon, Haryana 122001",
        phone: "+91 95556 78901",
        total: "₹6,183",
        status: "Manifested",
        statusType: "MANIFEST", // Purple ribbon
        payment: "Prepaid",
        sla: "10h 7m left",
        isBreached: false,
    },
    {
        id: "ORD-2024-002202",
        product: "Polo T-Shirt",
        image: "https://images.unsplash.com/photo-1576566152374-946765790240?q=80&w=300",
        sku: "SKU-TS-202 · PoloClub",
        seller: "ClothingStore",
        date: "14 Feb 2024, 11:30 am",
        buyer: "Rahul Gupta",
        address: "42, Civil Lines, Nagpur, Maharashtra 440001",
        phone: "+91 98887 65432",
        total: "₹2,327",
        status: "Verified",
        statusType: "VERIFIED", // Green ribbon
        payment: "Prepaid",
        sla: "2d 1h left",
        isBreached: false,
    },
    {
        id: "ORD-2026-000841",
        product: "Laptop Stand Pro",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=300",
        sku: "SKU-LT-P03 · TechGear",
        seller: "GadgetHub",
        date: "14 Feb 2024, 05:45 pm",
        buyer: "Vikram Singh",
        address: "15, Indiranagar, Bangalore, Karnataka 560038",
        phone: "+91 97771 23456",
        total: "₹3,499",
        status: "Cancelled",
        statusType: "CANCELLED", // Red ribbon
        payment: "Prepaid",
        sla: "Cancelled",
        isBreached: true,
    },
];

const OrderItem = ({ item }) => {
    const getRibbonColor = () => {
        switch (item.statusType) {
            case "NEW ORDER":
                return "#0A4AE4";
            case "MANIFEST":
                return "#6D28D9";
            case "VERIFIED":
                return "#10B981";
            case "CANCELLED":
                return "#EF4444";
            default:
                return "#64748B";
        }
    };

    return (
        <View style={styles.card}>
            <View
                style={[styles.ribbon, { backgroundColor: getRibbonColor() }]}
            >
                <Text style={styles.ribbonText}>{item.statusType}</Text>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.checkbox}>
                        <Feather name="square" size={20} color="#CBD5E1" />
                    </TouchableOpacity>

                    <Image
                        source={{ uri: item.image }}
                        style={styles.productImage}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={styles.productName} numberOfLines={1}>
                            {item.product}
                        </Text>
                        <Text style={styles.skuText} numberOfLines={1}>
                            {item.sku}
                        </Text>
                        <View style={styles.sellerBadge}>
                            <Text style={styles.sellerText}>
                                Seller: {item.seller}
                            </Text>
                        </View>
                        <Text style={styles.dateText}>{item.date}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View
                    style={{
                        marginVertical: 8,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={styles.orderId}>{item.id}</Text>
                        <View
                            style={[
                                styles.slaBadge,
                                item.isBreached
                                    ? styles.slaBreached
                                    : styles.slaActive,
                            ]}
                        >
                            <MaterialCommunityIcons
                                name="clock-outline"
                                size={12}
                                color={item.isBreached ? "#EF4444" : "#3B82F6"}
                            />
                            <Text
                                style={[
                                    styles.slaText,
                                    {
                                        color: item.isBreached
                                            ? "#EF4444"
                                            : "#3B82F6",
                                    },
                                ]}
                            >
                                {item.sla}
                            </Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <View style={styles.statusPills}>
                            <View style={styles.statusPill}>
                                <View
                                    style={[
                                        styles.dot,
                                        { backgroundColor: getRibbonColor() },
                                    ]}
                                />
                                <Text style={styles.pillText}>
                                    {item.status}
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.statusPill,
                                    {
                                        backgroundColor:
                                            item.payment === "COD"
                                                ? "#FEF3C7"
                                                : "#DCFCE7",
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.dot,
                                        {
                                            backgroundColor:
                                                item.payment === "COD"
                                                    ? "#F59E0B"
                                                    : "#10B981",
                                        },
                                    ]}
                                />
                                <Text
                                    style={[
                                        styles.pillText,
                                        {
                                            color:
                                                item.payment === "COD"
                                                    ? "#B45309"
                                                    : "#059669",
                                        },
                                    ]}
                                >
                                    {item.payment}
                                </Text>
                            </View>
                            <Text style={styles.totalAmount}>{item.total}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.buyerInfo}>
                    <Text style={styles.buyerName}>{item.buyer}</Text>
                    <Text style={styles.buyerAddress}>{item.address}</Text>
                    <Text style={styles.buyerPhone}>{item.phone}</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.actionGrid}>
                    <ActionButton
                        label="Mark Verified"
                        color="#F0FDF4"
                        textColor="#16A34A"
                    />
                    <ActionButton
                        label="Update Details"
                        color="#EFF6FF"
                        textColor="#2563EB"
                    />
                    <ActionButton
                        label="Mark Unverified"
                        color="#FEF2F2"
                        textColor="#DC2626"
                    />
                    <ActionButton
                        label="Cancel Order"
                        color="#FFF1F2"
                        textColor="#E11D48"
                    />
                </View>
            </View>
        </View>
    );
};

const ActionButton = ({ label, color, textColor }) => (
    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: color }]}>
        <Text style={[styles.actionBtnText, { color: textColor }]}>
            {label}
        </Text>
    </TouchableOpacity>
);

const B2BOrderListing = () => {
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={ORDER_DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <OrderItem item={item} />}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#F8FAFC" },
    listContainer: { padding: 10, marginTop: 5 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 16,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    ribbon: { width: 20, justifyContent: "center", alignItems: "center" },
    ribbonText: {
        color: "#fff",
        fontSize: 8,
        fontWeight: "900",
        transform: [{ rotate: "-90deg" }],
        width: 200,
        textAlign: "center",
        letterSpacing: 0.5,
    },
    cardContent: { flex: 1, padding: 16 },
    row: { flexDirection: "row", gap: 12 },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginVertical: 8,
    },
    checkbox: { marginTop: 4 },
    productImage: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: "#F3F4F6",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginRight: 4,
    },
    productName: { fontSize: 16, fontWeight: "700", color: "#111827" },
    skuText: { fontSize: 12, color: "#64748B", marginTop: 2 },
    sellerBadge: {
        backgroundColor: "#EFF6FF",
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 4,
    },
    sellerText: { fontSize: 11, color: "#2563EB", fontWeight: "600" },
    dateText: { fontSize: 11, color: "#94A3B8", marginTop: 4 },
    divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 12 },
    orderId: { fontSize: 13, fontWeight: "700", color: "#1E40AF" },
    slaBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    slaActive: { backgroundColor: "#EFF6FF" },
    slaBreached: { backgroundColor: "#FEF2F2" },
    slaText: { fontSize: 11, fontWeight: "700" },
    totalAmount: {
        fontSize: 19,
        fontWeight: "800",
        color: "#111827",
        textAlign: "right",
        letterSpacing: -0.5,
        marginStart: "auto",
    },
    statusPills: { flexDirection: "row", gap: 6, marginTop: 6, marginTop: 10 },
    statusPill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    dot: { width: 7, height: 7, borderRadius: 3.5 },
    pillText: { fontSize: 11, fontWeight: "700", color: "#4B5563" },
    buyerInfo: { paddingRight: 10 },
    buyerName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2563EB",
        marginBottom: 2,
    },
    buyerAddress: { fontSize: 12, color: "#64748B", lineHeight: 18 },
    buyerPhone: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
        fontWeight: "500",
    },
    actionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    actionScroll: { marginTop: 10, gap: 10, flexDirection: "row" },
    actionBtn: {
        flex: 1,
        minWidth: "45%",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#E5E7EB",
    },
    actionBtnText: { fontSize: 12, fontWeight: "700" },
    alignEnd: { alignItems: "flex-end" },
});

export default B2BOrderListing;
