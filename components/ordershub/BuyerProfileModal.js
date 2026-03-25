import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const StatCard = ({ icon, label, count, color }) => (
    <View style={styles.statCard}>
        <View style={[styles.iconCircle, { backgroundColor: color + "10" }]}>
            <MaterialCommunityIcons name={icon} size={22} color={color} />
        </View>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statCount}>{count}</Text>
    </View>
);

const BuyerProfileModal = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <View style={styles.avatarIcon}>
                            <Ionicons name="person" size={16} color="#FFF" />
                        </View>
                        <Text style={styles.headerTitle}>Buyer Profile</Text>
                    </View>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.profileCard}>
                        <Text style={styles.buyerName}>Suresh Pillai</Text>

                        <View style={styles.contactRow}>
                            <Feather name="map-pin" size={14} color="#94A3B8" />
                            <Text style={styles.contactText}>
                                11, Statue Road, Thiruvananthapuram, Kerala
                                695001
                            </Text>
                        </View>

                        <View style={styles.contactRow}>
                            <Feather name="phone" size={14} color="#94A3B8" />
                            <Text style={styles.contactText}>
                                +91 56789 01234
                            </Text>
                        </View>

                        <View style={styles.contactRow}>
                            <Feather name="mail" size={14} color="#94A3B8" />
                            <Text style={styles.contactText}>
                                suresh.p@email.com
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.sectionHeading}>Dashboard</Text>
                    <View style={styles.statsGrid}>
                        <StatCard
                            icon="package-variant"
                            label="Total Orders"
                            count="1"
                            color="#3B82F6"
                        />
                        <StatCard
                            icon="cube-outline"
                            label="Active Orders"
                            count="0"
                            color="#10B981"
                        />
                        <StatCard
                            icon="refresh"
                            label="Return in Process"
                            count="0"
                            color="#F59E0B"
                        />
                        <StatCard
                            icon="reload"
                            label="Refund in Process"
                            count="0"
                            color="#A855F7"
                        />
                        <StatCard
                            icon="pulse"
                            label="Replacement in Process"
                            count="0"
                            color="#EF4444"
                        />
                        <StatCard
                            icon="ticket-confirmation-outline"
                            label="Active Tickets"
                            count="0"
                            color="#6366F1"
                        />
                    </View>

                    <Text style={styles.sectionHeading}>Recent Orders</Text>
                    <TouchableOpacity style={styles.orderRow}>
                        <Text style={styles.orderId}>ORD-2024-002505</Text>
                        <Text style={styles.orderAmount}>₹2,657</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 15,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    backButton: { marginRight: 12 },
    headerTitleContainer: { flexDirection: "row", alignItems: "center" },
    avatarIcon: {
        width: 30,
        height: 30,
        borderRadius: 16,
        backgroundColor: "#3B82F6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    headerTitle: { fontSize: 18, fontWeight: "800", color: "#1E293B" },
    content: { flex: 1, padding: 16 },
    profileCard: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 16,
    },
    buyerName: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 15,
    },
    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    contactText: { marginLeft: 10, fontSize: 13, color: "#64748B" },
    sectionHeading: {
        fontSize: 16,
        fontWeight: "800",
        color: "#1E293B",
        marginBottom: 10,
    },
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 16,
    },
    statCard: {
        width: "48%", // 2 columns
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    statLabel: {
        fontSize: 12,
        color: "#64748B",
        fontWeight: "600",
        marginBottom: 4,
    },
    statCount: { fontSize: 22, fontWeight: "800", color: "#1E293B" },
    orderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 100,
    },
    orderId: { fontSize: 14, color: "#3B82F6", fontWeight: "600" },
    orderAmount: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
});

export default BuyerProfileModal;
