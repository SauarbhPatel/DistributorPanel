import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

const ConnectAccountsCard = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <View
                        style={[
                            styles.stepBadge,
                            { backgroundColor: "#10B981" },
                        ]}
                    >
                        <Text style={styles.stepText}>4</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>
                            Connect Google Accounts
                        </Text>
                        <Text style={styles.subtitle}>
                            Link Google Ads and Merchant Center
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.body}>
                {/* Google Ads Section (Connected) */}
                <View style={styles.connectedCard}>
                    <View style={styles.rowBetween}>
                        <View style={styles.iconRow}>
                            <LinearGradient
                                colors={["#10B981", "#059669"]}
                                style={styles.serviceIcon}
                            >
                                <MaterialCommunityIcons
                                    name="check-circle"
                                    size={20}
                                    color="white"
                                />
                            </LinearGradient>
                            <View>
                                <View style={styles.badgeRow}>
                                    <Text style={styles.serviceTitle}>
                                        Google Ads Account
                                    </Text>
                                    <View style={styles.statusBadgeGreen}>
                                        <Text
                                            style={styles.statusBadgeTextGreen}
                                        >
                                            CONNECTED
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.serviceSub}>
                                    Manage advertising campaigns and budgets
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.gridRow}>
                        <View style={styles.flex1}>
                            <Text style={styles.label}>
                                support@baofengradios.com
                            </Text>
                            <View style={styles.dropdownInput}>
                                <Text style={styles.placeholderText}>
                                    e.g. 123456789
                                </Text>
                                <Feather
                                    name="chevron-down"
                                    size={18}
                                    color="#64748B"
                                />
                            </View>
                        </View>
                        <View style={styles.flex1}>
                            <Text style={styles.label}>
                                Account ID (optional)
                            </Text>
                            <View style={styles.dropdownInput}>
                                <Text style={styles.placeholderText}>
                                    e.g. 123456789
                                </Text>
                                <Feather
                                    name="chevron-down"
                                    size={18}
                                    color="#64748B"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.outlineButton}>
                            <Text style={styles.outlineButtonText}>
                                Analyze
                            </Text>
                        </TouchableOpacity>
                        <LinearGradient
                            colors={["#10B981", "#059669"]}
                            style={styles.greenButton}
                        >
                            <TouchableOpacity>
                                <Text style={styles.buttonTextWhite}>
                                    Update
                                </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>

                {/* Merchant Center Section (Not Connected) */}
                <View style={styles.merchantContainer}>
                    <View style={styles.iconRow}>
                        <LinearGradient
                            colors={["#51A2FF", "#615FFF"]}
                            style={styles.serviceIcon}
                        >
                            <MaterialCommunityIcons
                                name="cube-outline"
                                size={20}
                                color="white"
                            />
                        </LinearGradient>
                        <View>
                            <View style={styles.badgeRow}>
                                <Text style={styles.serviceTitle}>
                                    Merchant Center
                                </Text>
                                <View style={styles.statusBadgeGray}>
                                    <Text style={styles.statusBadgeTextGray}>
                                        NOT CONNECTED
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.serviceSub}>
                                Product catalog and feed management
                            </Text>
                        </View>
                    </View>

                    <View style={styles.gridRow}>
                        <View style={styles.flex1}>
                            <Text style={styles.label}>
                                Merchant Center ID *
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. 123456789"
                                placeholderTextColor="#94A3B8"
                            />
                        </View>
                        <View style={styles.flex1}>
                            <Text style={styles.label}>
                                Merchant Center ID *
                            </Text>
                            <View style={styles.dropdownInput}>
                                <Text style={styles.placeholderText}>
                                    e.g. 123456789
                                </Text>
                                <Feather
                                    name="chevron-down"
                                    size={18}
                                    color="#64748B"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Store Requirements Nested Box */}
                    <View style={styles.nestedBox}>
                        <View style={styles.nestedHeader}>
                            <MaterialCommunityIcons
                                name="file-document-outline"
                                size={16}
                                color="#475569"
                            />
                            <Text style={styles.nestedTitle}>
                                Store Requirements
                            </Text>
                            <Text style={styles.websiteLabel}>
                                Website URL *
                            </Text>
                        </View>
                        <TextInput
                            style={styles.nestedInput}
                            placeholder="Store URL *"
                            placeholderTextColor="#94A3B8"
                        />
                        <TextInput
                            style={styles.nestedInput}
                            placeholder="Contact email *"
                            placeholderTextColor="#94A3B8"
                        />
                        <TextInput
                            style={styles.nestedInput}
                            placeholder="Refund / Terms / Shipping URLs (Optional)"
                            placeholderTextColor="#94A3B8"
                        />
                    </View>

                    {/* Recommended Setup Box */}
                    <View style={styles.recommendBox}>
                        <View style={styles.nestedHeader}>
                            <MaterialCommunityIcons
                                name="gift-outline"
                                size={16}
                                color="#2563EB"
                            />
                            <Text
                                style={[
                                    styles.nestedTitle,
                                    { color: "#1E3A8A" },
                                ]}
                            >
                                Recommended Setup
                            </Text>
                        </View>
                        <Text style={styles.recommendText}>
                            Enable product-feed with Merchant Center
                        </Text>
                        <Text style={styles.recommendText}>
                            Enable free listings on Google Shopping
                        </Text>
                    </View>

                    {/* Terms Info Box */}
                    <View style={styles.termsBox}>
                        <Text style={styles.termsText}>
                            I agree to the Google & YouTube advertising terms
                            and conditions
                        </Text>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.outlineButton}>
                            <Text style={styles.outlineButtonText}>
                                Analyze
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                            <LinearGradient
                                colors={["#2B7FFF", "#4F39F6"]}
                                style={styles.blueButton}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.buttonTextWhite}>
                                    Connect Merchant Center
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        // elevation: 2,
        marginTop: 10,
    },
    headerContainer: {
        backgroundColor: "#F0FDF4",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerContent: { flexDirection: "row", alignItems: "center" },
    stepBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    stepText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
    title: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
    subtitle: { fontSize: 12, color: "#64748B", marginTop: 2 },
    body: { padding: 10, paddingTop: 15 },
    connectedCard: {
        backgroundColor: "#F0FDF4",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#DCFCE7",
        marginBottom: 20,
    },
    merchantContainer: {
        borderWidth: 1,
        borderColor: "#F1F5F9",
        marginTop: 10,
        borderRadius: 12,
        padding: 16,
    },
    iconRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    serviceIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    badgeRow: { flexDirection: "row", alignItems: "center" },
    serviceTitle: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
    statusBadgeGreen: {
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 8,
    },
    statusBadgeTextGreen: { color: "#166534", fontSize: 10, fontWeight: "800" },
    statusBadgeGray: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 8,
    },
    statusBadgeTextGray: { color: "#64748B", fontSize: 10, fontWeight: "800" },
    serviceSub: { fontSize: 12, color: "#64748B", marginTop: 2 },
    gridRow: { gap: 12, marginVertical: 16 },
    flex1: { flex: 1 },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#475569",
        marginBottom: 8,
    },
    dropdownInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        padding: 10,
    },
    textInput: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
    },
    placeholderText: { color: "#94A3B8", fontSize: 14 },
    nestedBox: {
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        marginBottom: 12,
    },
    nestedHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    nestedTitle: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: "700",
        color: "#334155",
    },
    websiteLabel: {
        marginLeft: "auto",
        fontSize: 12,
        fontWeight: "700",
        color: "#475569",
    },
    nestedInput: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#F1F5F9",
        borderRadius: 6,
        padding: 10,
        marginBottom: 8,
        fontSize: 13,
    },
    recommendBox: {
        backgroundColor: "#EFF6FF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    recommendText: { fontSize: 13, color: "#000000", marginBottom: 4 },
    termsBox: {
        backgroundColor: "#FFFBEB",
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    termsText: { fontSize: 13, color: "#92400E", textAlign: "center" },
    buttonRow: { flexDirection: "row", gap: 10 },
    outlineButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        backgroundColor: "#FFF",
    },
    outlineButtonText: { color: "#475569", fontWeight: "600" },
    greenButton: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    },
    blueButton: { paddingHorizontal: 10, paddingVertical: 10, borderRadius: 8 },
    buttonTextWhite: { color: "#FFF", fontWeight: "600" },
});

export default ConnectAccountsCard;
