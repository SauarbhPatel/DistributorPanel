import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TargetingPolicyCard = ({ stepNumber, onPress }) => {
    return (
        <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.headerRow}>
                <View style={styles.iconWrapper}>
                    <Feather name="target" size={20} color="#f59e0b" />
                </View>

                <View style={styles.titleContainer}>
                    <View style={styles.badgeRow}>
                        <Text style={styles.titleText}>
                            Targeting policy defaults (marketplace governance)
                        </Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>GOVERNANCE</Text>
                        </View>
                    </View>
                    <Text style={styles.descriptionText}>
                        Default parameters to prevent scoping overly.
                        Serviceable shipping zones, restricted categories,
                        budget caps per seller.
                    </Text>
                </View>

                <LinearGradient
                    colors={["#fbbf24", "#f59e0b"]}
                    style={styles.stepBadge}
                >
                    <Text style={styles.stepNumberText}>{stepNumber}</Text>
                </LinearGradient>
            </View>

            {/* Shipping Zones Box */}
            <View style={styles.zoneBox}>
                <View style={styles.zoneHeader}>
                    <Feather name="shield" size={16} color="#d97706" />
                    <Text style={styles.zoneHeaderText}>
                        Allow targeting only in serviceable shipping zones
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.checkboxRow}
                    activeOpacity={0.7}
                >
                    <View style={styles.checkbox}>
                        <MaterialCommunityIcons
                            name="check"
                            size={14}
                            color="#fff"
                        />
                    </View>
                    <Text style={styles.checkboxLabel}>
                        Restrict campaigns to zones
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Multi-Input Grid */}
            <View style={styles.inputGrid}>
                <View style={styles.inputColumn}>
                    <View style={styles.labelRow}>
                        <Text style={styles.inputLabel}>
                            Restricted categories
                        </Text>
                        <Feather name="info" size={14} color="#94a3b8" />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., Alcohol, Tobacco"
                        placeholderTextColor="#cbd5e1"
                    />

                    <View style={styles.alertBox}>
                        <Ionicons
                            name="sparkles-outline"
                            size={16}
                            color="#d97706"
                        />
                        <Text style={styles.alertText}>
                            Budget limits help maintain fair marketplace
                            competition
                        </Text>
                    </View>
                </View>

                <View style={styles.inputColumn}>
                    <View style={styles.labelRow}>
                        <Text style={styles.inputLabel}>
                            Daily budget cap/ seller (₹)
                        </Text>
                        <Feather name="info" size={14} color="#94a3b8" />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="5000"
                        placeholderTextColor="#94a3b8"
                    />

                    <View style={[styles.labelRow, { marginTop: 12 }]}>
                        <Text style={styles.inputLabel}>
                            Monthly budget cap/ seller (₹)
                        </Text>
                        <Feather name="info" size={14} color="#94a3b8" />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="150000"
                        placeholderTextColor="#94a3b8"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        backgroundColor: "#fffbeb",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        flex: 1,
        marginLeft: 12,
        paddingRight: 35,
    },
    badgeRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 6,
    },
    titleText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
        marginRight: 8,
    },
    badge: {
        backgroundColor: "#fef3c7",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 10,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#b45309",
    },
    descriptionText: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 18,
    },
    stepBadge: {
        width: 32,
        height: 32,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: -5,
        top: 0,
    },
    stepNumberText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    zoneBox: {
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        marginBottom: 20,
    },
    zoneHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    zoneHeaderText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1e293b",
        marginLeft: 10,
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 26,
    },
    checkbox: {
        width: 18,
        height: 18,
        backgroundColor: "#10b981",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 14,
        color: "#64748b",
    },
    inputGrid: {
        // flexDirection: "row",
        gap: 16,
    },
    inputColumn: {
        flex: 1,
    },
    labelRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#475569",
        marginRight: 6,
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
        fontSize: 14,
        color: "#1e293b",
    },
    alertBox: {
        flexDirection: "row",
        backgroundColor: "#fffbeb",
        borderRadius: 8,
        padding: 12,
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#fef3c7",
        alignItems: "center",
    },
    alertText: {
        fontSize: 11,
        color: "#696969",
        marginLeft: 8,
        flex: 1,
    },
});

export default TargetingPolicyCard;
