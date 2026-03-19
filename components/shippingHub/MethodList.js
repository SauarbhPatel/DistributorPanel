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

const MethodCard = ({
    name,
    courier,
    mode,
    weightKg,
    chargeModel,
    categories,
    status,
}) => {
    const accentColor = mode === "Air" ? "#A855F7" : "#0071BC";

    return (
        <View style={styles.card}>
            <View
                style={[styles.accentBorder, { backgroundColor: accentColor }]}
            />

            <View style={styles.cardContent}>
                <View style={styles.header}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.methodName}>{name}</Text>
                        <View
                            style={[
                                styles.modeTag,
                                {
                                    backgroundColor:
                                        mode === "Air" ? "#F5F3FF" : "#EFF6FF",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.modeTagText,
                                    { color: accentColor },
                                ]}
                            >
                                {mode.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Feather name="trash-2" size={18} color="#FF5252" />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>COURIER</Text>
                            <View style={styles.courierBadge}>
                                <Text style={styles.courierText}>
                                    {courier}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>WEIGHT (KG)</Text>
                            <Text style={styles.valueText}>{weightKg} kg</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>CHARGE MODEL</Text>
                            <Text style={styles.valueText}>{chargeModel}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>CATEGORIES</Text>
                            <Text style={styles.valueText} numberOfLines={1}>
                                {categories.join(", ")}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.statusRow}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>
                            {status.toUpperCase()}
                        </Text>
                    </View>

                    <TouchableOpacity>
                        <LinearGradient
                            // colors={["#0071BC", "#005A96"]}
                            colors={[accentColor, accentColor + "CC"]}
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

const MethodList = ({ onChange }) => {
    const methodsData = [
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
            {methodsData.length > 0 ? (
                methodsData.map((method, index) => (
                    <MethodCard key={index} {...method} />
                ))
            ) : (
                <NoDataCard
                    onCreatePress={() => onChange({ isShowCreate: true })}
                    title="No Shipping Methods Found"
                    subTitle="You haven't configured any delivery options yet. Create a method to define couriers, weight limits, and shipping rates."
                    buttonName="Create Your First Method"
                    icon={
                        <MaterialCommunityIcons
                            name={"truck-delivery-outline"}
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
    scrollContent: { padding: 16, gap: 16 },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    accentBorder: { width: 6, height: "100%" },
    cardContent: { flex: 1, padding: 16 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    titleWrapper: { flex: 1 },
    methodName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 4,
    },
    modeTag: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    modeTagText: { fontSize: 10, fontWeight: "800" },
    infoContainer: { marginBottom: 16 },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    infoItem: { flex: 1 },
    label: {
        fontSize: 10,
        fontWeight: "800",
        color: "#94A3B8",
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    valueText: { fontSize: 13, color: "#475569", fontWeight: "600" },
    courierBadge: {
        backgroundColor: "#F8FAFB",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "#F1F5F9",
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
    statusRow: { flexDirection: "row", alignItems: "center" },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#10B981",
        marginRight: 6,
    },
    statusText: { fontSize: 12, fontWeight: "700", color: "#64748B" },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
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

export default MethodList;
