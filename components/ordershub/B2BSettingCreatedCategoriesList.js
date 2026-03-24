import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const B2BSettingCreatedCategoriesList = () => {
    const data = [
        {
            id: "1",
            category: "New Order",
            slug: "NEW_ORDER",
            color: "#0070ba",
            isActive: true,
        },
        {
            id: "2",
            category: "Processing",
            slug: "PROCESSING",
            color: "#14b8a6",
            isActive: false,
        },
    ];

    const renderItem = ({ item }) => (
        <View style={[styles.card, item.isActive && styles.activeCardBorder]}>
            <View style={[styles.indicator, { backgroundColor: item.color }]} />

            <View style={styles.cardContent}>
                <View style={styles.infoSection}>
                    <Text style={styles.categoryLabel}>CATEGORY</Text>
                    <Text style={styles.categoryValue}>{item.category}</Text>

                    <View style={styles.slugContainer}>
                        <Text style={styles.slugLabel}>SLUG</Text>
                        <View style={styles.slugBadge}>
                            <Text style={styles.slugText}>{item.slug}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.actionSection}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Feather name="edit-2" size={18} color="#64748b" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <MaterialCommunityIcons
                            name="delete-outline"
                            size={20}
                            color="#ef4444"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons
                    name="view-grid-outline"
                    size={20}
                    color="#475569"
                />
                <Text style={styles.headerTitle}>Already created</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listPadding}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
        marginLeft: 8,
    },
    listPadding: {
        paddingBottom: 20,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        overflow: "hidden",
    },
    activeCardBorder: {
        borderColor: "#0070ba",
        backgroundColor: "#f0f9ff",
    },
    indicator: {
        width: 6,
        height: "100%",
    },
    cardContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    infoSection: {
        flex: 1,
    },
    categoryLabel: {
        fontSize: 10,
        fontWeight: "700",
        color: "#94a3b8",
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    categoryValue: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1e293b",
        marginBottom: 10,
    },
    slugContainer: {
        marginTop: 4,
    },
    slugLabel: {
        fontSize: 10,
        fontWeight: "700",
        color: "#94a3b8",
        marginBottom: 4,
    },
    slugBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    slugText: {
        fontSize: 12,
        color: "#64748b",
        fontWeight: "500",
    },
    actionSection: {
        alignItems: "center",
        gap: 12,
    },
    iconButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
});

export default B2BSettingCreatedCategoriesList;
