import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import NoDataCard from "../common/NoDataCard";

const PartnerCard = ({
    name,
    courier,
    mode,
    weightKg,
    chargeModel,
    categories,
    status,
}) => {
    // Visual logic: Air = Purple, Surface = Blue
    const themeColor = mode === "Air" ? "#A855F7" : "#0071BC";

    return (
        <View style={styles.card}>
            {/* Left Accent Border */}
            <View
                style={[styles.accentBorder, { backgroundColor: themeColor }]}
            />

            <View style={styles.cardContent}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.partnerName}>{name}</Text>
                        <View
                            style={[
                                styles.modeBadge,
                                {
                                    backgroundColor:
                                        mode === "Air" ? "#F5F3FF" : "#EFF6FF",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.modeBadgeText,
                                    { color: themeColor },
                                ]}
                            >
                                {mode.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.deleteBtn}>
                        <Feather name="trash-2" size={18} color="#FF5252" />
                    </TouchableOpacity>
                </View>

                {/* Info Grid (Matches ZoneList Structure) */}
                <View style={styles.grid}>
                    <View style={styles.gridRow}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>COURIER</Text>
                            <View style={styles.courierTag}>
                                <Text style={styles.courierText}>
                                    {courier}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>WEIGHT LIMIT</Text>
                            <Text style={styles.valueText}>{weightKg} kg</Text>
                        </View>
                    </View>

                    <View style={styles.gridRow}>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>CHARGE MODEL</Text>
                            <Text style={styles.valueText}>{chargeModel}</Text>
                        </View>
                        <View style={styles.gridItem}>
                            <Text style={styles.label}>CATEGORIES</Text>
                            <Text style={styles.valueText} numberOfLines={1}>
                                {categories.join(", ")}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Footer Actions */}
                <View style={styles.footer}>
                    <View style={styles.statusWrapper}>
                        <View
                            style={[
                                styles.statusDot,
                                {
                                    backgroundColor:
                                        status === "Active"
                                            ? "#10B981"
                                            : "#94A3B8",
                                },
                            ]}
                        />
                        <Text style={styles.statusText}>
                            {status.toUpperCase()}
                        </Text>
                    </View>

                    <TouchableOpacity activeOpacity={0.8}>
                        <LinearGradient
                            colors={[themeColor, themeColor + "CC"]}
                            style={styles.editButton}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Feather name="edit-3" size={14} color="#FFF" />
                            <Text style={styles.editButtonText}>Edit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const PartnersList = ({ onChange = () => {} }) => {
    const partnersData = [
        {
            name: "Standard Ground",
            courier: "FedEx",
            mode: "Surface",
            weightKg: "0 - 15",
            chargeModel: "Flat Rate",
            categories: ["All"],
            status: "Active",
        },
        {
            name: "Express Overnight",
            courier: "DHL",
            mode: "Air",
            weightKg: "0 - 5",
            chargeModel: "Per kg",
            categories: ["Electronics", "Documents"],
            status: "Active",
        },
        {
            name: "Heavy Freight",
            courier: "UPS",
            mode: "Surface",
            weightKg: "> 50",
            chargeModel: "Zone-based",
            categories: ["Furniture", "Appliances"],
            status: "Active",
        },
        {
            name: "Local Same Day",
            courier: "Delhivery",
            mode: "Surface",
            weightKg: "Up to 2",
            chargeModel: "Flat Rate",
            categories: ["Groceries", "Perishables"],
            status: "Active",
        },
    ];

    return (
        <View style={styles.container}>
            {partnersData.length > 0 ? (
                partnersData.map((item, index) => (
                    <PartnerCard key={index} {...item} />
                ))
            ) : (
                <NoDataCard
                    onCreatePress={() => onChange({ isShowCreate: true })}
                    title="No Courier Partners Linked"
                    subTitle="Connect your preferred shipping carriers to automate label generation and real-time tracking for your orders."
                    buttonName="Link a Courier Partner"
                    icon={
                        <MaterialCommunityIcons
                            name="truck-fast-outline"
                            size={32}
                            color="#94A3B8"
                        />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        marginHorizontal: 10,
        marginTop: 10,
        marginBlockStart: 40,
        gap: 10,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    accentBorder: { width: 6, height: "100%" },
    cardContent: { flex: 1, padding: 16 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    partnerName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 4,
    },
    modeBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    modeBadgeText: { fontSize: 10, fontWeight: "800" },
    grid: { gap: 12, marginBottom: 16 },
    gridRow: { flexDirection: "row", justifyContent: "space-between" },
    gridItem: { flex: 1 },
    label: {
        fontSize: 10,
        fontWeight: "800",
        color: "#94A3B8",
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    valueText: { fontSize: 13, color: "#475569", fontWeight: "600" },
    courierTag: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: "flex-start",
    },
    courierText: { fontSize: 12, color: "#1E293B", fontWeight: "700" },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    statusWrapper: { flexDirection: "row", alignItems: "center" },
    statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
    statusText: { fontSize: 12, fontWeight: "700", color: "#64748B" },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },
    editButtonText: {
        color: "#FFF",
        fontSize: 13,
        fontWeight: "600",
        marginLeft: 6,
    },
});

export default PartnersList;
