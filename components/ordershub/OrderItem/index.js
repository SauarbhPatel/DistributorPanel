import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import OrderDetailsModal from "../OrderDetailsModal";
import BuyerProfileModal from "../BuyerProfileModal";
import UpdateOrderModal from "../UpdateOrderModal";
import ActionButtons from "./ActionButtons";

// ─── Ribbon color map ─────────────────────────────────────────────────────────
const RIBBON_COLORS = {
    "NEW ORDER": "#2D9CDB",
    LABELING: "#2D9CDB",
    MANIFEST: "#6D28D9",
    PACKING: "#6D28D9",
    VERIFIED: "#10B981",
    MANIFESTING: "#00BBA2",
    "PRINT MANIFEST": "#00BBA2",
    MANIFESTED: "#00BBA2",
    DELIVERED: "#00BBA2",
    CANCELLED: "#EF4444",
    UNVERIFIED: "#EF4444",
};

const getRibbonColor = (statusType) => RIBBON_COLORS[statusType] ?? "#64748B";

// ─── SLA Badge ────────────────────────────────────────────────────────────────
const SlaBadge = ({ sla, isBreached }) => (
    <View
        style={[
            styles.slaBadge,
            isBreached ? styles.slaBreached : styles.slaActive,
        ]}
    >
        <Feather
            name="clock"
            size={11}
            color={isBreached ? "#DC2626" : "#2563EB"}
        />
        <Text
            style={[
                styles.slaText,
                { color: isBreached ? "#DC2626" : "#2563EB" },
            ]}
        >
            {sla}
        </Text>
    </View>
);

// ─── Status Pill ──────────────────────────────────────────────────────────────
const StatusPill = ({ label, color }) => (
    <View style={styles.statusPill}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.pillText}>{label}</Text>
    </View>
);

// ─── OrderItem ────────────────────────────────────────────────────────────────
const OrderItem = ({ item, onRefresh }) => {
    const [modal, setModal] = useState({
        details: false,
        update: false,
        buyer: false,
    });

    const toggle = (key, val) =>
        setModal((prev) => ({ ...prev, [key]: val ?? !prev[key] }));

    // Attach onUpdate callback so ActionButtons can trigger update modal
    const itemWithCallback = {
        ...item,
        onUpdate: () => toggle("update", true),
    };

    return (
        <View style={styles.card}>
            {/* Ribbon */}
            <View
                style={[
                    styles.ribbon,
                    { backgroundColor: getRibbonColor(item.statusType) },
                ]}
            >
                <Text style={styles.ribbonText}>{item.statusType}</Text>
            </View>

            {/* Modals */}
            <OrderDetailsModal
                visible={modal.details}
                onClose={() => toggle("details", false)}
            />
            <BuyerProfileModal
                visible={modal.buyer}
                onClose={() => toggle("buyer", false)}
            />
            <UpdateOrderModal
                visible={modal.update}
                onClose={() => toggle("update", false)}
            />

            <View style={styles.cardContent}>
                {/* Top row: checkbox + image + product info */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.checkbox}>
                        <Feather name="square" size={20} color="#CBD5E1" />
                    </TouchableOpacity>

                    <Image
                        source={
                            item.image
                                ? { uri: item.image }
                                : { uri: "https://via.placeholder.com/64" }
                        }
                        style={styles.productImage}
                        resizeMode="cover"
                    />

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => toggle("details", true)}
                        >
                            <Text style={styles.productName} numberOfLines={1}>
                                {item.productName}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.skuText}>SKU: {item.sku}</Text>
                        <View style={styles.sellerBadge}>
                            <Text style={styles.sellerText}>
                                {item.sellerName}
                            </Text>
                        </View>
                        <Text style={styles.dateText}>{item.date}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Order meta row */}
                <View style={styles.rowBetween}>
                    <View>
                        <TouchableOpacity
                            onPress={() => toggle("details", true)}
                        >
                            <Text style={styles.orderId}>{item.orderId}</Text>
                        </TouchableOpacity>
                        <View style={styles.statusPills}>
                            <StatusPill
                                label={item.status}
                                color={getRibbonColor(item.statusType)}
                            />
                            {item.payment && (
                                <StatusPill
                                    label={item.payment}
                                    color={
                                        item.payment === "COD"
                                            ? "#F59E0B"
                                            : "#10B981"
                                    }
                                />
                            )}
                        </View>
                    </View>
                    <View style={styles.alignEnd}>
                        <SlaBadge sla={item.sla} isBreached={item.isBreached} />
                        <Text style={styles.totalAmount}>{item.total}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Buyer info */}
                <TouchableOpacity onPress={() => toggle("buyer", true)}>
                    <Text style={styles.buyerName}>{item.buyerName}</Text>
                    <Text style={styles.buyerAddress}>{item.buyerAddress}</Text>
                    <Text style={styles.buyerPhone}>{item.phone}</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                {/* Action buttons with API */}
                <ActionButtons item={itemWithCallback} onRefresh={onRefresh} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    orderId: {
        fontSize: 13,
        fontWeight: "700",
        color: "#1E40AF",
        textDecorationLine: "underline",
    },
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
        marginTop: 4,
    },
    statusPills: {
        flexDirection: "row",
        gap: 6,
        marginTop: 10,
        flexWrap: "wrap",
    },
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
    buyerName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2563EB",
        marginBottom: 2,
        textDecorationLine: "underline",
    },
    buyerAddress: { fontSize: 12, color: "#64748B", lineHeight: 18 },
    buyerPhone: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
        fontWeight: "500",
    },
    alignEnd: { alignItems: "flex-end" },
});

export default OrderItem;
