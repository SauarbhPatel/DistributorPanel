import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const B2BSettingMSListing = () => {
    const secondaryStatuses = [
        {
            id: "1",
            name: "New Orders",
            code: "NEW_ORDER",
            assignment: "MANUAL",
            sort: 10,
            active: true,
            color: "#0070ba",
        },
        {
            id: "2",
            name: "Unverified Orders",
            code: "PROCESSING",
            assignment: "AUTO",
            sort: 20,
            active: false,
            color: "#14b8a6",
        },
        {
            id: "3",
            name: "Verified Orders",
            code: "PROCESSING",
            assignment: "AUTO",
            sort: 30,
            active: false,
            color: "#14b8a6",
        },
        {
            id: "4",
            name: "Awaiting Action",
            code: "PROCESSING",
            assignment: "AUTO",
            sort: 40,
            active: false,
            color: "#14b8a6",
        },
    ];

    const renderItem = ({ item }) => (
        <View style={[styles.card, item.active && styles.activeCard]}>
            <View style={[styles.indicator, { backgroundColor: item.color }]} />

            <View style={styles.cardBody}>
                <View style={styles.topRow}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <View style={styles.codeContainer}>
                            <Text style={styles.codeText}>{item.code}</Text>
                        </View>
                    </View>

                    <View style={styles.actionGroup}>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Feather name="edit-2" size={16} color="#64748b" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Feather name="trash-2" size={16} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>ASSIGNMENT</Text>
                        <View
                            style={[
                                styles.assignmentBadge,
                                item.assignment === "MANUAL"
                                    ? styles.manualBg
                                    : styles.autoBg,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.assignmentText,
                                    item.assignment === "MANUAL"
                                        ? styles.manualText
                                        : styles.autoText,
                                ]}
                            >
                                {item.assignment}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>SORT</Text>
                        <Text style={styles.valueText}>{item.sort}</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>STATUS</Text>
                        <View style={styles.activeBadge}>
                            <Text style={styles.activeText}>Active</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={secondaryStatuses}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listPadding}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    listPadding: {
        padding: 10,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        overflow: "hidden",
    },
    activeCard: {
        borderColor: "#0070ba",
        backgroundColor: "#f0f9ff",
    },
    indicator: {
        width: 4,
    },
    cardBody: {
        flex: 1,
        padding: 16,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    nameText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1e293b",
    },
    codeContainer: {
        backgroundColor: "#f1f5f9",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    codeText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#64748b",
    },
    actionGroup: {
        flexDirection: "row",
        gap: 12,
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginBottom: 12,
    },
    infoGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoItem: {
        flex: 1,
    },
    label: {
        fontSize: 9,
        fontWeight: "800",
        color: "#94a3b8",
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    valueText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#475569",
    },
    assignmentBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    manualBg: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    autoBg: {
        backgroundColor: "#eff6ff",
        borderWidth: 1,
        borderColor: "#bfdbfe",
    },
    assignmentText: { fontSize: 10, fontWeight: "700" },
    manualText: { color: "#64748b" },
    autoText: { color: "#0070ba" },
    activeBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#dcfce7",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        alignSelf: "flex-start",
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#16a34a",
        marginRight: 6,
    },
    activeText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#16a34a",
    },
});

export default B2BSettingMSListing;
