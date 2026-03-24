import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";

const B2BSettingStatusManagementList = ({ navigation }) => {
    const data = [
        {
            id: "1",
            name: "New Order",
            code: "NEW_ORDER",
            type: "OPEN",
            typeColor: "#e0f2fe",
            typeText: "#0369a1",
            terminal: false,
            sort: 10,
            status: "Active",
            active: true,
        },
        {
            id: "2",
            name: "Processing",
            code: "PROCESSING",
            type: "IN PROGRESS",
            typeColor: "#fef3c7",
            typeText: "#92400e",
            terminal: false,
            sort: 20,
            status: "Active",
            active: false,
        },
        {
            id: "3",
            name: "Delivered",
            code: "DELIVERED",
            type: "CLOSED",
            typeColor: "#f1f5f9",
            typeText: "#475569",
            terminal: true,
            sort: 60,
            status: "Active",
            active: false,
        },
    ];

    const renderStatusCard = ({ item }) => (
        <View style={[styles.card, item.active && styles.activeCard]}>
            <View
                style={[
                    styles.accentBar,
                    { backgroundColor: item.active ? "#0070ba" : "#14b8a6" },
                ]}
            />

            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <View style={styles.activeBadge}>
                        <Text style={styles.activeBadgeText}>
                            {item.status}
                        </Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.codeBadge}>
                        <Text style={styles.codeText}>{item.code}</Text>
                    </View>
                    <View
                        style={[
                            styles.typeBadge,
                            { backgroundColor: item.typeColor },
                        ]}
                    >
                        <Text
                            style={[styles.typeText, { color: item.typeText }]}
                        >
                            {item.type}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>TERMINAL</Text>
                        {item.terminal ? (
                            <AntDesign
                                name="checkcircle"
                                size={16}
                                color="#10b981"
                            />
                        ) : (
                            <AntDesign
                                name="closecircleo"
                                size={16}
                                color="#cbd5e1"
                            />
                        )}
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>SORT</Text>
                        <Text style={styles.detailValue}>{item.sort}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>VISIBLE TO</Text>
                        <Text style={styles.detailValue} numberOfLines={1}>
                            Admin, Seller...
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Feather name="edit-2" size={16} color="#64748b" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Feather name="trash-2" size={16} color="#ef4444" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.push("B2BSettingManageSecondary")
                        }
                        style={{
                            ...styles.actionBtn,
                            backgroundColor: "#0369a1",
                            borderRadius: 5,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                padding: 3,
                                paddingHorizontal: 10,
                                color: "#fff",
                            }}
                        >
                            Manage secondary
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderStatusCard}
                contentContainerStyle={styles.listPadding}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8fafc" },
    listPadding: { paddingHorizontal: 10 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    activeCard: { backgroundColor: "#f0f9ff", borderColor: "#0070ba" },
    accentBar: { width: 4, height: "100%" },
    content: { flex: 1, padding: 16 },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    nameText: { fontSize: 16, fontWeight: "700", color: "#1e293b" },
    activeBadge: {
        backgroundColor: "#dcfce7",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    activeBadgeText: { color: "#16a34a", fontSize: 11, fontWeight: "700" },
    infoRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
    codeBadge: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    codeText: { fontSize: 11, color: "#64748b", fontWeight: "500" },
    typeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    typeText: { fontSize: 10, fontWeight: "800" },
    detailsGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
    },
    detailItem: { flex: 1 },
    detailLabel: {
        fontSize: 9,
        fontWeight: "800",
        color: "#94a3b8",
        marginBottom: 4,
    },
    detailValue: { fontSize: 12, color: "#475569", fontWeight: "600" },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 15,
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
    },
    actionBtn: { padding: 4 },
});

export default B2BSettingStatusManagementList;
