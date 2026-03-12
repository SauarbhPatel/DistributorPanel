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
    Dimensions,
} from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const OrderAtRiskModal = ({ visible, onClose, orderData }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <SafeAreaView style={styles.modalContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.headerIconBg}>
                            <Ionicons
                                name="add-circle"
                                size={20}
                                color="#fff"
                            />
                        </View>
                        <Text style={styles.headerTitle}>Order at risk</Text>
                    </View>
                    <Text style={styles.headerOrderId}>
                        {orderData?.orderId || "ORD-2024-002505"}
                    </Text>
                </View>

                <ScrollView style={styles.content}>
                    <View style={styles.mainCard}>
                        {/* Section 1: Order & SLA */}
                        <SectionHeader
                            icon="check-circle"
                            title="Order & SLA"
                            color="#339af0"
                        />
                        <View style={styles.slaDetailsCard}>
                            <View style={styles.detailsRow}>
                                <InfoItem
                                    icon="user"
                                    label="Buyer"
                                    value={
                                        orderData?.assignee || "Suresh Pillai"
                                    }
                                    iconColor="#339af0"
                                />
                                <InfoItem
                                    icon="calendar"
                                    label="Order date"
                                    value="17 Feb 2024, 06:00 pm"
                                    iconColor="#20c997"
                                />
                            </View>
                            <View style={styles.detailsRow}>
                                <InfoItem
                                    icon="shopping-bag"
                                    label="Seller"
                                    value={orderData?.sellerName || "GadgetHub"}
                                    iconColor="#ae3ec9"
                                />
                                <View style={styles.infoBox}>
                                    <View
                                        style={[
                                            styles.iconSmall,
                                            { backgroundColor: "#ff6b6b" },
                                        ]}
                                    >
                                        <Feather
                                            name="clock"
                                            size={12}
                                            color="#fff"
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.infoLabel}>
                                            SLA due
                                        </Text>
                                        <Text
                                            style={[
                                                styles.infoValue,
                                                {
                                                    color: "#fa5252",
                                                    fontWeight: "700",
                                                },
                                            ]}
                                        >
                                            Overdue by 1h 23m
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.detailsRow}>
                                <View style={styles.infoBox}>
                                    <View
                                        style={[
                                            styles.iconSmall,
                                            { backgroundColor: "#fd7e14" },
                                        ]}
                                    >
                                        <Feather
                                            name="alert-circle"
                                            size={12}
                                            color="#fff"
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.infoLabel}>
                                            Status
                                        </Text>
                                        <View style={styles.statusPill}>
                                            <Text style={styles.statusPillText}>
                                                New Order
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Section 2: Items */}
                        <SectionHeader
                            icon="package"
                            title="Items"
                            color="#7048e8"
                        />
                        <View style={styles.itemCard}>
                            <View style={styles.itemIconBox}>
                                <Feather name="box" size={20} color="#7048e8" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemNameText}>
                                    Smart Band × 1
                                </Text>
                                <Text style={styles.itemSubText}>
                                    Wearable Technology
                                </Text>
                            </View>
                            <View style={styles.skuBadge}>
                                <Feather name="tag" size={10} color="#868e96" />
                                <Text style={styles.skuText}>SKU: WT-03</Text>
                            </View>
                        </View>

                        {/* Section 3: Inputs */}
                        <Text style={styles.inputLabel}>
                            Send reminder to seller
                        </Text>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Optional note to include with reminder..."
                            multiline
                        />

                        {/* Section 4: Actions Grid */}
                        <SectionHeader
                            icon="alert-triangle"
                            title="Actions"
                            color="#20c997"
                        />
                        <View style={styles.actionsGrid}>
                            <ActionButton
                                icon="bell"
                                label="Send reminder"
                                color="#339af0"
                            />
                            <ActionButton
                                icon="alert-circle"
                                label="Escalate to seller"
                                color="#ff6b6b"
                            />
                            <ActionButton
                                icon="user-plus"
                                label="Assign to support"
                                color="#ae3ec9"
                            />
                            <ActionButton
                                icon="truck"
                                label="Request pickup"
                                color="#20c997"
                            />
                            <ActionButton
                                icon="x-circle"
                                label="Mark as exception"
                                color="#fd7e14"
                            />
                        </View>

                        <Text style={[styles.inputLabel, { marginTop: 20 }]}>
                            Internal note
                        </Text>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Add a note for internal use..."
                            multiline
                        />
                    </View>

                    <TouchableOpacity style={styles.externalLinkBtn}>
                        <Text style={styles.externalLinkText}>
                            Open in Order Management
                        </Text>
                        <Feather name="chevron-right" size={20} color="#fff" />
                    </TouchableOpacity>
                </ScrollView>

                {/* Footer Actions */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.cancelBtn}
                    >
                        <Feather
                            name="chevron-left"
                            size={20}
                            color="#868e96"
                        />
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn}>
                        <Text style={styles.saveBtnText}>Save note</Text>
                        <Feather name="chevron-right" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};
export default OrderAtRiskModal;

// Sub-components to keep code clean
const SectionHeader = ({ icon, title, color }) => (
    <View style={styles.sectionHeaderRow}>
        <View style={[styles.sectionIcon, { backgroundColor: color }]}>
            <Feather name={icon} size={14} color="#fff" />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
    </View>
);

const InfoItem = ({ icon, label, value, iconColor }) => (
    <View style={styles.infoBox}>
        <View style={[styles.iconSmall, { backgroundColor: iconColor }]}>
            <Feather name={icon} size={16} color="#fff" />
        </View>
        <View style={{}}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

const ActionButton = ({ icon, label, color }) => (
    <TouchableOpacity style={[styles.actionBtn, { borderColor: color + "30" }]}>
        <View style={[styles.actionIconCircle, { backgroundColor: color }]}>
            <Feather name={icon} size={16} color="#fff" />
        </View>
        <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    modalContainer: { flex: 1, backgroundColor: "#f8f9fa" },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        alignItems: "center",
    },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
    headerIconBg: { backgroundColor: "#339af0", padding: 5, borderRadius: 20 },
    headerTitle: { fontSize: 18, fontWeight: "800", color: "#1a1b1e" },
    headerOrderId: { color: "#868e96", fontSize: 14 },

    content: { flex: 1, paddingHorizontal: 15 },
    mainCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e9ecef",
    },

    sectionHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginVertical: 15,
    },
    sectionIcon: { padding: 6, borderRadius: 8 },
    sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1a1b1e" },

    slaDetailsCard: {
        backgroundColor: "#f1f7ff",
        borderRadius: 12,
        padding: 15,
        gap: 15,
    },
    detailsRow: { flexDirection: "row", justifyContent: "space-between" },
    infoBox: { flexDirection: "row", gap: 10, flex: 1 },
    iconSmall: {
        width: 30,
        height: 30,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    infoLabel: {
        fontSize: 9,
        color: "#868e96",
        textTransform: "uppercase",
        fontWeight: "600",
    },
    infoValue: {
        fontSize: 11.5,
        color: "#495057",
        fontWeight: "600",
        width: width / 3.9,
    },

    statusPill: {
        backgroundColor: "#fff4e6",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 4,
        alignSelf: "flex-start",
    },
    statusPillText: { color: "#fd7e14", fontSize: 10, fontWeight: "700" },

    itemCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#7048e830",
        backgroundColor: "#fff",
    },
    itemIconBox: {
        backgroundColor: "#f3f0ff",
        padding: 10,
        borderRadius: 10,
        marginRight: 12,
    },
    itemNameText: { fontSize: 14, fontWeight: "700", color: "#495057" },
    itemSubText: { fontSize: 11, color: "#adb5bd" },
    skuBadge: { flexDirection: "row", alignItems: "center", gap: 4 },
    skuText: { fontSize: 10, color: "#868e96" },

    inputLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#495057",
        marginTop: 20,
        marginBottom: 8,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#e9ecef",
        borderRadius: 8,
        padding: 12,
        height: 80,
        textAlignVertical: "top",
    },

    actionsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    actionBtn: {
        width: "31%", // Three column grid
        backgroundColor: "#fff",
        borderWidth: 1,
        padding: 10,
        borderRadius: 12,
        alignItems: "center",
        gap: 8,
    },
    actionIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    actionLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: "#495057",
        textAlign: "center",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e9ecef",
    },
    cancelBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
    cancelText: { color: "#868e96", fontWeight: "600" },
    saveBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0070ba",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        gap: 8,
    },
    saveBtnText: { color: "#fff", fontWeight: "700" },

    externalLinkBtn: {
        backgroundColor: "#0070ba",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        // marginHorizontal: 20,
        marginBottom: 20,
        gap: 8,
        marginTop: 10,
    },
    externalLinkText: { color: "#fff", fontWeight: "700" },
});
