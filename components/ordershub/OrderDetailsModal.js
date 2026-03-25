import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const OrderDetailsModal = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerNav}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.headerIconBtn}>
                            <Feather name="printer" size={18} color="#64748B" />
                            <Text style={styles.headerIconText}>Print</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.headerIconBtn, { marginLeft: 12 }]}
                        >
                            <Feather
                                name="download"
                                size={18}
                                color="#64748B"
                            />
                            <Text style={styles.headerIconText}>Download</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainCard}>
                        <Text style={styles.orderIdTitle}>Order Details</Text>
                        <Text style={styles.orderNumber}>
                            Order #ORD-2024-002505
                        </Text>
                        <View style={styles.statusRow}>
                            <View style={styles.verifiedBadge}>
                                <Feather
                                    name="check-circle"
                                    size={12}
                                    color="#10B981"
                                />
                                <Text style={styles.verifiedText}>
                                    Verified
                                </Text>
                            </View>
                            <Text style={styles.dateText}>
                                Placed on March 4, 2026
                            </Text>
                        </View>
                    </View>

                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>
                            Buyer Information
                        </Text>
                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons
                                name="package-variant-closed"
                                size={20}
                                color="#94A3B8"
                            />
                            <Text style={styles.infoText}>Suresh Pillai</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Feather name="map-pin" size={18} color="#94A3B8" />
                            <Text style={styles.infoText}>
                                11, Statue Road, Thiruvananthapuram, Kerala
                                695001
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Feather name="phone" size={18} color="#94A3B8" />
                            <Text style={styles.infoText}>+91 56789 01234</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Feather name="mail" size={18} color="#94A3B8" />
                            <Text style={styles.infoText}>
                                suresh.p@email.com
                            </Text>
                        </View>
                    </View>

                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>Order Items</Text>
                        <View style={styles.itemRow}>
                            <View style={styles.itemImagePlaceholder}>
                                <MaterialCommunityIcons
                                    name="image-outline"
                                    size={24}
                                    color="#CBD5E1"
                                />
                            </View>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>Smart Band</Text>
                                <Text style={styles.itemSku}>
                                    SKU: SKU-WT-03
                                </Text>
                                <Text style={styles.itemQty}>Quantity: 1</Text>
                            </View>
                            <Text style={styles.itemPrice}>₹2,199</Text>
                        </View>
                    </View>

                    <View style={[styles.sectionCard, { marginBottom: 30 }]}>
                        <Text style={styles.sectionTitle}>Order Summary</Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>₹2,199</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping</Text>
                            <Text style={styles.summaryValue}>₹40</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tax</Text>
                            <Text style={styles.summaryValue}>₹418</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>₹2,657</Text>
                        </View>

                        <View style={styles.paymentInfoBox}>
                            <Text style={styles.paymentStatusText}>
                                Payment completed successfully on March 4, 2026
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ width: "100%" }}
                    >
                        <LinearGradient
                            colors={["#0071BC", "#0369A1"]}
                            style={styles.editOrderBtn}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Feather name="edit" size={18} color="#FFF" />
                            <Text style={styles.editOrderText}>Edit Order</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    headerNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#FFF",
    },
    backButton: { padding: 4 },
    headerActions: { flexDirection: "row" },
    headerIconBtn: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    headerIconText: {
        marginLeft: 6,
        fontSize: 12,
        color: "#64748B",
        fontWeight: "600",
    },
    content: { flex: 1, padding: 16 },
    mainCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 16,
    },
    orderIdTitle: { fontSize: 24, fontWeight: "800", color: "#1E293B" },
    orderNumber: { fontSize: 14, color: "#64748B", marginTop: 4 },
    statusRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
    verifiedBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0FDF4",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#DCFCE7",
    },
    verifiedText: {
        color: "#16A34A",
        fontSize: 11,
        fontWeight: "700",
        marginLeft: 4,
    },
    dateText: { marginLeft: 12, fontSize: 12, color: "#94A3B8" },
    sectionCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    infoText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        color: "#475569",
        lineHeight: 20,
    },
    itemRow: { flexDirection: "row", alignItems: "center" },
    itemImagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: "#F1F5F9",
        justifyContent: "center",
        alignItems: "center",
    },
    itemDetails: { flex: 1, marginLeft: 12 },
    itemName: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
    itemSku: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
    itemQty: { fontSize: 12, color: "#64748B", marginTop: 2 },
    itemPrice: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    summaryLabel: { fontSize: 14, color: "#94A3B8" },
    summaryValue: { fontSize: 14, color: "#1E293B", fontWeight: "600" },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingTop: 12,
        marginTop: 4,
    },
    totalLabel: { fontSize: 18, fontWeight: "700", color: "#1E293B" },
    totalValue: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
    paymentInfoBox: {
        marginTop: 20,
        backgroundColor: "#F8FAFC",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    paymentStatusText: { fontSize: 11, color: "#94A3B8", textAlign: "center" },
    footer: {
        padding: 16,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
    },
    editOrderBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 14,
        borderRadius: 10,
    },
    editOrderText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 16,
        marginLeft: 10,
    },
});

export default OrderDetailsModal;
