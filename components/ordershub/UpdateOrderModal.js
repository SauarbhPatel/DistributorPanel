import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
} from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const UpdateOrderModal = ({
    visible,
    onClose,
    orderId = "ORD-2024-002101",
}) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <View>
                            <Text style={styles.headerTitle}>Update Order</Text>
                            <Text style={styles.headerSub}>
                                Modify address, items, or apply a discount
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.closeBtn}
                        >
                            <Feather name="x" size={24} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.orderBadge}>
                        <Text style={styles.orderIdText}>{orderId}</Text>
                        <TouchableOpacity style={{ marginLeft: 8 }}>
                            <MaterialCommunityIcons
                                name="content-copy"
                                size={14}
                                color="#94A3B8"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.sectionHeader}>
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: "#EFF6FF" },
                            ]}
                        >
                            <Ionicons
                                name="location-outline"
                                size={18}
                                color="#3B82F6"
                            />
                        </View>
                        <Text style={styles.sectionTitle}>
                            Delivery Address
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.addressCard}>
                        <Text style={styles.addressText}>
                            22, MG Road, Kochi, Kerala 682011
                        </Text>
                        <Feather
                            name="chevron-right"
                            size={20}
                            color="#94A3B8"
                        />
                    </TouchableOpacity>
                    <Text style={styles.comingSoonText}>
                        Edit address in full order form (coming soon)
                    </Text>

                    <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: "#F5F3FF" },
                            ]}
                        >
                            <MaterialCommunityIcons
                                name="cube-outline"
                                size={18}
                                color="#8B5CF6"
                            />
                        </View>
                        <Text style={styles.sectionTitle}>Items</Text>
                    </View>

                    <View style={styles.itemCard}>
                        <View style={styles.itemImagePlaceholder}>
                            <MaterialCommunityIcons
                                name="speaker"
                                size={24}
                                color="#94A3B8"
                            />
                        </View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>
                                Bluetooth Speaker
                            </Text>
                            <Text style={styles.itemQty}>Qty: 1</Text>
                        </View>
                        <Text style={styles.itemPrice}>₹1,599</Text>
                    </View>
                    <Text style={styles.comingSoonText}>
                        Add/remove products in full order form (coming soon)
                    </Text>

                    <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: "#FFFBEB" },
                            ]}
                        >
                            <MaterialCommunityIcons
                                name="tag-outline"
                                size={18}
                                color="#F59E0B"
                            />
                        </View>
                        <Text style={styles.sectionTitle}>
                            Discount / Coupon
                        </Text>
                    </View>

                    <View style={styles.couponContainer}>
                        <TextInput
                            style={styles.couponInput}
                            placeholder="Enter coupon code"
                            placeholderTextColor="#CBD5E1"
                        />
                        <TouchableOpacity style={styles.applyBtn}>
                            <Text style={styles.applyBtnText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.comingSoonText}>
                        Apply discount (coming soon)
                    </Text>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.footerBackBtn}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={20}
                            color="#64748B"
                        />
                        <Text style={styles.footerBackText}>Back to Order</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    header: {
        padding: 20,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "#1E293B" },
    headerSub: { fontSize: 13, color: "#64748B", marginTop: 4 },
    orderBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    orderIdText: { fontSize: 13, fontWeight: "600", color: "#64748B" },
    content: { flex: 1, padding: 20 },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    sectionTitle: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
    addressCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    addressText: { flex: 1, fontSize: 14, color: "#475569", fontWeight: "500" },
    itemCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    itemImagePlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: "#F1F5F9",
        justifyContent: "center",
        alignItems: "center",
    },
    itemInfo: { flex: 1, marginLeft: 12 },
    itemName: { fontSize: 14, fontWeight: "600", color: "#1E293B" },
    itemQty: { fontSize: 12, color: "#94A3B8", marginTop: 2 },
    itemPrice: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
    comingSoonText: {
        fontSize: 11,
        color: "#94A3B8",
        marginTop: 8,
        fontStyle: "italic",
    },
    couponContainer: { flexDirection: "row", gap: 10 },
    couponInput: {
        flex: 1,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 45,
        fontSize: 14,
    },
    applyBtn: {
        backgroundColor: "#93C5FD",
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    applyBtnText: { color: "#FFF", fontWeight: "700", fontSize: 14 },
    footer: {
        padding: 20,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    footerBackBtn: { flexDirection: "row", alignItems: "center" },
    footerBackText: {
        marginLeft: 5,
        fontSize: 15,
        fontWeight: "700",
        color: "#64748B",
    },
});

export default UpdateOrderModal;
