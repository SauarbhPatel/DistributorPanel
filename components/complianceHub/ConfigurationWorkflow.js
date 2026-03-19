import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WorkflowCard = ({
    number,
    title,
    description,
    status,
    isConfigured,
    navigation,
    path = null,
}) => (
    <View style={styles.card}>
        <View style={styles.headerRow}>
            {/* Step Number */}
            <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{number}</Text>
            </View>

            {/* Status Badge */}
            <View
                style={[
                    styles.statusBadge,
                    isConfigured ? styles.bgSuccess : styles.bgMuted,
                ]}
            >
                <Text
                    style={[
                        styles.statusText,
                        isConfigured ? styles.textSuccess : styles.textMuted,
                    ]}
                >
                    {status}
                </Text>
            </View>
        </View>

        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>

        {/* Action Link */}
        <TouchableOpacity
            style={styles.actionButton}
            onPress={() => path && navigation.push(path)}
        >
            <Text style={styles.actionText}>Configure</Text>
            <MaterialCommunityIcons
                name="arrow-right"
                size={16}
                color="#5C5CFF"
            />
        </TouchableOpacity>
    </View>
);

const ConfigurationWorkflow = ({ navigation }) => {
    const steps = [
        {
            number: 1,
            title: "Regulatory Jurisdiction",
            description:
                "Country and regional compliance scope with multi-country support for cross-border enforcement.",
            status: "3 configured",
            isConfigured: true,
            path: "TaxJurisdiction",
        },
        {
            number: 2,
            title: "Compliance Document Master",
            description:
                "Central registry for name, code, issuing authority, validity, expiry, renewal, and licence capture.",
            status: "4 configured",
            isConfigured: true,
            path: "DocumentMaster",
        },
        {
            number: 3,
            title: "Compliance SETS (Rule Bundles)",
            description:
                "Versioned bundles covering jurisdiction, documents, category conditions, seller/buyer/brand requirements.",
            status: "Not started",
            isConfigured: false,
            path: "ComplianceSets",
        },
        {
            number: 4,
            title: "Category Conditions",
            description:
                "Attribute-based triggers for automated compliance decisions at the product category level.",
            status: "Not started",
            isConfigured: false,
            path: "CategoryConditions",
        },
        {
            number: 5,
            title: "Seller Compliance",
            description:
                "KYC, tax, and import/export verification. Seller must be authorized before any listing goes live.",
            status: "Not started",
            isConfigured: false,
            path: "SellerRequirement",
        },
        {
            number: 6,
            title: "Brand Compliance",
            description:
                "Brand authorization documents that restrict listing rights to approved sellers only.",
            status: "Not started",
            isConfigured: false,
            path: "BrandRequirement",
        },
        {
            number: 7,
            title: "Validation Workflow",
            description:
                "Draft → Uploaded → Under Review → Approved / Rejected. Managed by Compliance, Legal, and Admin roles.",
            status: "Not started",
            isConfigured: false,
            // path: "",
        },
        {
            number: 8,
            title: "Expiry & Renewal",
            description:
                "Configure reminder days and auto-block behavior on expiry via Document Master settings.",
            status: "Not started",
            isConfigured: false,
            // path: "",
        },
        {
            number: 9,
            title: "Product Enforcement Gate",
            description:
                "Category + seller + brand + documents + expiry + conditional rules. Blocks activation on any failure.",
            status: "Not started",
            isConfigured: false,
            // path: "",
        },
    ];

    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleSection}>
                <Text style={styles.mainHeading}>Configuration Workflow</Text>
            </View>

            {steps.map((step) => (
                <WorkflowCard
                    key={step.number}
                    {...step}
                    navigation={navigation}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    titleSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 16,
    },
    mainHeading: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1F2937",
    },
    subHeading: {
        fontSize: 14,
        color: "#9CA3AF",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    numberBadge: {
        width: 28,
        height: 28,
        backgroundColor: "#EEF2FF",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    numberText: {
        color: "#5C5CFF",
        fontWeight: "700",
        fontSize: 14,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    bgSuccess: { backgroundColor: "#DCFCE7" },
    bgMuted: { backgroundColor: "#F3F4F6" },
    statusText: { fontSize: 11, fontWeight: "600" },
    textSuccess: { color: "#166534" },
    textMuted: { color: "#6B7280" },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 13,
        color: "#6B7280",
        lineHeight: 20,
        marginBottom: 16,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionText: {
        color: "#5C5CFF",
        fontWeight: "600",
        fontSize: 14,
        marginRight: 4,
    },
});

export default ConfigurationWorkflow;
