import React from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CommonHeader from "../../components/common/CommonHeader";
const { width } = Dimensions.get("window");

const TaxManagment = ({ navigation }) => {
    const renderMetricCard = (title, count, isActive = false) => (
        <View style={[styles.metricCard, isActive && styles.activeMetricCard]}>
            <Text style={styles.metricTitle}>{title}</Text>
            <Text style={styles.metricCount}>{count}</Text>
            <View
                style={[styles.underline, isActive && styles.activeUnderline]}
            />
        </View>
    );

    const renderStepItem = (
        icon,
        title,
        subtitle,
        stepText,
        themeColor = "#D4A017",
        bgColor = "#FFF9E6",
        path = null,
    ) => (
        <TouchableOpacity
            style={styles.stepCard}
            activeOpacity={0.7}
            onPress={() => path && navigation.push(path)}
        >
            <View style={styles.stepLeftContent}>
                <View
                    style={[styles.iconContainer, { backgroundColor: bgColor }]}
                >
                    <MaterialCommunityIcons
                        name={icon}
                        size={24}
                        color={themeColor}
                    />
                </View>
                <View style={styles.stepTextContainer}>
                    <Text style={styles.stepTitle}>{title}</Text>
                    <Text style={styles.stepSubtitle}>{subtitle}</Text>
                </View>
            </View>
            <View style={styles.stepRightContent}>
                <View
                    style={[
                        styles.stepBadge,
                        {
                            backgroundColor: bgColor,
                            borderColor: themeColor + "40",
                        },
                    ]}
                >
                    <Text style={[styles.stepBadgeText, { color: themeColor }]}>
                        {stepText}
                    </Text>
                </View>
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color="#CCC"
                />
            </View>
        </TouchableOpacity>
    );

    const renderSectionHeader = (title) => (
        <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.bodyColor || "#F5F7F9" }}
        >
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <CommonHeader title={"Tax manager"} navigation={navigation} />
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.headerStub}>
                        <Text style={styles.headerTitle}>
                            Tax Command Center
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            GST / VAT / Sales Tax — jurisdictions, slabs, HSN
                            mapping, and calculation engine. Unified dashboard.
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: 10,
                        }}
                    >
                        {renderMetricCard("TAX KINDS", "3")}
                        {renderMetricCard("HSN SETS", "2")}
                        {renderMetricCard("JURISDICTIONS", "5")}
                        {renderMetricCard("TAX SLABS", "4")}
                        {renderMetricCard("HSN Codes", "5")}
                    </View>

                    {renderSectionHeader("Setup Phase")}
                    {renderStepItem(
                        "tag-outline",
                        "Tax Kind Master",
                        "Define tax kinds — GST, VAT, etc.",
                        "Step 0",
                        "#B45309",
                        "#FEF3C7",
                        "TaxKindMaster",
                    )}
                    {renderStepItem(
                        "layers-outline",
                        "HSN Set Master",
                        "Group HSN / SAC codes into reusable sets.",
                        "Step 0.5",
                        "#B45309",
                        "#FEF3C7",
                        "HsnSet",
                    )}
                    {renderStepItem(
                        "earth",
                        "Tax Jurisdictions",
                        "Configure countries, states, and regions.",
                        "Step 1",
                        "#B45309",
                        "#FEF3C7",
                        "TaxJurisdiction",
                    )}

                    {renderSectionHeader("Configuration")}
                    {renderStepItem(
                        "percent",
                        "Tax Types",
                        "GST, VAT, CGST+SGST, IGST.",
                        "Step 2",
                        "#1D4ED8",
                        "#DBEAFE",
                        "TaxTypes",
                    )}
                    {renderStepItem(
                        "chart-bar",
                        "Tax Slabs",
                        "Tax percentage groups and effective dates.",
                        "Step 3",
                        "#1D4ED8",
                        "#DBEAFE",
                        "TaxMaster",
                    )}
                    {renderStepItem(
                        "pound",
                        "HSN / SAC Master",
                        "Code master and default tax slab mapping.",
                        "Step 4",
                        "#1D4ED8",
                        "#DBEAFE",
                        "HsnCodes",
                    )}
                    {renderSectionHeader("Mapping Rules")}
                    {renderStepItem(
                        "vector-combine",
                        "Category Tax Mapping",
                        "Assign default tax rules to categories.",
                        "Step 5",
                        "#2E7D32",
                        "#E8F5E9",
                    )}

                    {renderSectionHeader("Calculation Engine")}
                    <View style={styles.row}>
                        {renderStepItem(
                            "calculator",
                            "Tax Calculation Engine",
                            "Inclusive/exclusive pricing, rounding, formula reference.",
                            "Step 10",
                            "#7B1FA2",
                            "#F3E5F5",
                        )}
                        {renderStepItem(
                            "file-document-outline",
                            "Invoice Template",
                            "Invoice layout and tax display.",
                            "Step 11",
                            "#7B1FA2",
                            "#F3E5F5",
                            "InvoiceTemplate",
                        )}
                    </View>

                    {renderStepItem(
                        "reload",
                        "Reverse Charge",
                        "Reverse charge scenarios.",
                        "Step 12",
                        "#7B1FA2",
                        "#F3E5F5",
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding || 15,
        paddingBottom: 40,
    },
    headerStub: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1A237E",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#777",
        marginTop: 4,
    },
    metricsRow: {
        flexDirection: "row",
        marginBottom: 20,
    },
    metricCard: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 8,
        width: width / 2 - 15,
        borderWidth: 1,
        borderColor: "#EEE",
    },
    activeMetricCard: {
        borderColor: "#2196F3",
        borderWidth: 2,
    },
    metricTitle: {
        fontSize: 10,
        fontWeight: "600",
        color: "#555",
    },
    metricCount: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 8,
    },
    underline: {
        height: 3,
        width: 20,
        backgroundColor: "#2196F3",
        borderRadius: 2,
    },
    activeUnderline: {
        width: 35,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15,
    },
    sectionIndicator: {
        width: 4,
        height: 20,
        backgroundColor: "#2196F3",
        marginRight: 10,
        borderRadius: 2,
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
    },
    stepCard: {
        backgroundColor: "#FFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#F0F0F0",
    },
    stepLeftContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    iconContainer: {
        width: 45,
        height: 45,
        backgroundColor: "#FFF9E6",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    stepTextContainer: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },
    stepSubtitle: {
        fontSize: 12,
        color: "#888",
        marginTop: 2,
    },
    stepRightContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    stepBadge: {
        backgroundColor: "#FFF9E6",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
        borderWidth: 1,
        borderColor: "#FFE082",
    },
    stepBadgeText: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#D4A017",
    },
});

export default TaxManagment;
