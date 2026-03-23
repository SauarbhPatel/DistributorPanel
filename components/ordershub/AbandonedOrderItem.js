import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const AbandonedOrderItem = ({ item }) => {
    const getTravelTheme = (status) => {
        switch (status) {
            case "Contact entered":
                return { bg: "#F0FDF4", text: "#16A34A" };
            case "Payment failed":
                return { bg: "#FEF2F2", text: "#EF4444" };
            case "Address entered":
                return { bg: "#F5F3FF", text: "#7C3AED" };
            default:
                return { bg: "#F8FAFC", text: "#64748B" };
        }
    };

    const travelStyle = getTravelTheme(item.travelStatus);

    return (
        <View style={styles.card}>
            <View
                style={[
                    styles.statusBorder,
                    {
                        backgroundColor: item.isAssigned
                            ? "#3B82F6"
                            : "#F97316",
                    },
                ]}
            />

            <View style={styles.cardContent}>
                <View style={styles.headerRow}>
                    <TouchableOpacity>
                        <Feather
                            name="check-square"
                            size={18}
                            color="#3B82F6"
                        />
                    </TouchableOpacity>
                    <View style={styles.idContainer}>
                        <Text style={styles.orderId}>{item.id}</Text>
                        <TouchableOpacity>
                            <Text style={styles.detailsLink}>
                                Product details
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[
                            styles.travelBadge,
                            { backgroundColor: travelStyle.bg },
                        ]}
                    >
                        <Text
                            style={[
                                styles.travelText,
                                { color: travelStyle.text },
                            ]}
                        >
                            {item.travelStatus}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoGrid}>
                    <View style={styles.gridItem}>
                        <Text style={styles.label}>BUYER / SESSION</Text>
                        <Text style={styles.buyerName}>{item.buyer}</Text>
                        <Text style={styles.sessionText}>{item.sessionId}</Text>
                    </View>

                    <View style={styles.gridItem}>
                        <Text style={styles.label}>LAST ACTIVITY</Text>
                        <Text style={styles.valueText}>
                            {item.lastActivityDate}
                        </Text>
                        <Text style={styles.valueText}>
                            {item.lastActivityTime}
                        </Text>
                    </View>

                    <View style={styles.gridItem}>
                        <Text style={styles.label}>CART</Text>
                        <Text style={styles.cartValue}>₹ {item.cartValue}</Text>
                        <View style={styles.itemsRow}>
                            <Feather name="box" size={12} color="#64748B" />
                            <Text style={styles.itemCount}>
                                {" "}
                                {item.itemCount} Items
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.rowBetween}>
                    <View style={styles.contactInfo}>
                        <View style={styles.contactRow}>
                            <Feather name="mail" size={12} color="#94A3B8" />
                            <Text style={styles.contactText}>{item.email}</Text>
                        </View>
                        <View style={styles.contactRow}>
                            <Feather name="phone" size={12} color="#94A3B8" />
                            <Text style={styles.contactText}>{item.phone}</Text>
                        </View>
                    </View>

                    <View style={styles.statusGroup}>
                        <Text style={styles.label}>ATTEMPTS</Text>
                        <View style={styles.attemptBadge}>
                            <Text style={styles.attemptText}>
                                {item.attempts}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.actionFooter}>
                    <View style={styles.statusPill}>
                        <Text style={styles.statusPillText}>{item.status}</Text>
                    </View>
                    <View style={styles.iconActions}>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Ionicons
                                name="eye-outline"
                                size={18}
                                color="#64748B"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Feather name="edit-2" size={16} color="#64748B" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Feather name="trash-2" size={16} color="#64748B" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.recoverBtn}>
                            <MaterialCommunityIcons
                                name="refresh"
                                size={16}
                                color="#fff"
                            />
                            <Text style={styles.recoverText}>Recover</Text>
                        </TouchableOpacity>
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
        marginBottom: 16,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    statusBorder: { width: 4 },
    cardContent: { flex: 1, padding: 12 },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    idContainer: { flex: 1, marginLeft: 10 },
    orderId: { fontSize: 13, fontWeight: "700", color: "#2563EB" },
    detailsLink: {
        fontSize: 11,
        color: "#94A3B8",
        textDecorationLine: "underline",
    },
    travelBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    travelText: { fontSize: 11, fontWeight: "600" },
    divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 10 },
    infoGrid: { flexDirection: "row", justifyContent: "space-between" },
    gridItem: { flex: 1 },
    label: {
        fontSize: 10,
        color: "#94A3B8",
        fontWeight: "800",
        marginBottom: 4,
    },
    buyerName: { fontSize: 13, fontWeight: "700", color: "#1E293B" },
    sessionText: { fontSize: 11, color: "#94A3B8" },
    valueText: { fontSize: 11, color: "#1E293B", fontWeight: "500" },
    cartValue: { fontSize: 13, fontWeight: "800", color: "#0F172A" },
    itemsRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
    itemCount: { fontSize: 11, color: "#64748B" },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    contactInfo: { gap: 4 },
    contactRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    contactText: { fontSize: 11, color: "#64748B" },
    statusGroup: { alignItems: "flex-end" },
    attemptBadge: {
        backgroundColor: "#F5F3FF",
        width: 24,
        height: 24,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    attemptText: { color: "#7C3AED", fontSize: 12, fontWeight: "800" },
    actionFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
    },
    statusPill: {
        backgroundColor: "#FFF7ED",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusPillText: { color: "#C2410C", fontSize: 11, fontWeight: "700" },
    iconActions: { flexDirection: "row", alignItems: "center", gap: 12 },
    iconBtn: { padding: 4 },
    recoverBtn: {
        backgroundColor: "#2563EB",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        gap: 4,
    },
    recoverText: { color: "#fff", fontSize: 12, fontWeight: "700" },
});

export default AbandonedOrderItem;
