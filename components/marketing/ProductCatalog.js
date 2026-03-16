import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const CatalogRow = ({ label, value }) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
    </View>
);

const ProductCatalog = () => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <LinearGradient
                    colors={["#FE9A00", "#F54900"]}
                    style={styles.iconBox}
                >
                    <MaterialCommunityIcons
                        name="package-variant-closed"
                        size={24}
                        color="#FFF"
                    />
                </LinearGradient>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>Product Catalog</Text>
                    <Text style={styles.headerSubtitle}>
                        Connected catalog for dynamic ads.
                    </Text>
                </View>
            </View>

            {/* Body Content */}
            <View style={styles.body}>
                <Text style={styles.catalogName}>Baofeng Product Catalog</Text>

                {/* Status Badge */}
                <View style={styles.syncedBadge}>
                    <Text style={styles.syncedText}>SYNCED</Text>
                </View>

                {/* Data Card */}
                <View style={styles.dataCard}>
                    <CatalogRow label="Products" value="24" />
                    <View style={styles.separator} />
                    <CatalogRow label="Last sync" value="3/11/2026" />
                </View>

                {/* Action Button */}
                <TouchableOpacity activeOpacity={0.8}>
                    <LinearGradient
                        colors={["#E17100", "#F54900"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.actionButton}
                    >
                        <Text style={styles.actionButtonText}>
                            View in Catalog Sync
                        </Text>
                        <Feather name="external-link" size={16} color="#FFF" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    header: {
        backgroundColor: "#FFF7ED",
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
    },
    body: {
        padding: 15,
    },
    catalogName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#64748B",
        marginBottom: 8,
    },
    syncedBadge: {
        backgroundColor: "#10B981",
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        marginBottom: 16,
    },
    syncedText: {
        color: "#FFF",
        fontSize: 10,
        fontWeight: "800",
    },
    dataCard: {
        backgroundColor: "#FFF7ED",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#FFEDD5",
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
    },
    rowLabel: {
        fontSize: 12,
        color: "#64748B",
        fontWeight: "500",
    },
    rowValue: {
        fontSize: 12,
        color: "#475569",
        fontWeight: "600",
    },
    separator: {
        height: 1,
        backgroundColor: "#FFEDD5",
    },
    actionButton: {
        flexDirection: "row",
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    actionButtonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "600",
    },
});

export default ProductCatalog;
