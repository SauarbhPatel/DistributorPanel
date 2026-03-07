// import {
//     SafeAreaView,
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     TextInput,
//     FlatList,
//     Alert,
// } from "react-native";
// import { Colors, Fonts, Sizes } from "../../constants/styles";
// import { Feather, MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useEffect, useState } from "react";
// import CommonHeader from "../../components/common/CommonHeader";
// import { __deleteApiData, __getApiData, __postApiData } from "../../utils/api";
// import { __formatDate } from "../../utils/funtion";
// import { Loader } from "../../modules";

// const OnboardingDetails = ({ navigation, route }) => {
//     const [search, setSearch] = useState("");
//     const [state, setState] = useState({
//         loading: false,
//     });

//     const updateState = (data) => setState((state) => ({ ...state, ...data }));

//     const { loading } = state;

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
//             <CommonHeader
//                 title={route?.params?.item?.name}
//                 subTitle={"Missing fields: 0 · Categories: Health, Pharma"}
//                 navigation={navigation}
//             />
//             <Loader isShow={loading} />
//             <ScrollView
//                 contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
//             ></ScrollView>
//         </SafeAreaView>
//     );
// };

// export default OnboardingDetails;

// const styles = StyleSheet.create({});

import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CommonHeader from "../../components/common/CommonHeader";

const CompanyReviewDetail = ({ navigation, route }) => {
    const renderSectionHeader = (icon, title) => (
        <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name={icon} size={20} color="#1f2937" />
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    const renderInfoRow = (label, value) => (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );

    const renderCheckItem = (label, status) => (
        <View style={styles.checkItem}>
            <Text style={styles.checkLabel}>{label}</Text>
            <View
                style={[
                    styles.badge,
                    {
                        backgroundColor:
                            status === "verified" ? "#E0F8E9" : "#F3F4F6",
                    },
                ]}
            >
                <Text
                    style={[
                        styles.badgeText,
                        {
                            color:
                                status === "verified" ? "#10B981" : "#6B7280",
                        },
                    ]}
                >
                    {status}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
            <CommonHeader
                title={route?.params?.item?.name}
                subTitle={"Missing fields: 0 · Categories: Health, Pharma"}
                navigation={navigation}
            />
            <ScrollView
                contentContainerStyle={{ padding: 15, paddingBottom: 40 }}
            >
                {/* Company Details Card */}
                <View style={styles.card}>
                    {renderSectionHeader("office-building", "Company details")}
                    {renderInfoRow("GSTIN", "29AABCT1234A1Z5")}
                    {renderInfoRow("PAN", "AABCT1234A")}
                    {renderInfoRow("Legal name", "Delta Pharma Ltd")}
                    {renderInfoRow(
                        "Warehouse",
                        "Plot 5, Industrial Area, Hyderabad",
                    )}
                </View>

                {/* Verification Checklist Card */}
                <View style={styles.card}>
                    {renderSectionHeader(
                        "checkbox-marked-circle-outline",
                        "Verification checklist",
                    )}
                    {renderCheckItem("Business identity verified", "verified")}
                    {renderCheckItem("Brand authorization letter", "verified")}
                    {renderCheckItem(
                        "Bank verification (penny-drop)",
                        "pending",
                    )}
                    {renderCheckItem(
                        "Warehouse address verification",
                        "verified",
                    )}
                    {renderCheckItem("Category compliance docs", "pending")}

                    <TouchableOpacity style={styles.outlineBtn}>
                        <Text style={styles.outlineBtnText}>
                            Request clarification
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Approval Conditions Card */}
                <View style={styles.card}>
                    {renderSectionHeader(
                        "clock-outline",
                        "Approval conditions",
                    )}
                    <Text style={styles.conditionText}>
                        • category_limit: Health, Pharma only
                    </Text>
                    <Text style={styles.conditionText}>
                        • cod_block: Block COD until bank verified
                    </Text>
                </View>

                {/* Contract & Terms Card */}
                <View style={styles.card}>
                    {renderSectionHeader(
                        "file-document-outline",
                        "Contract & terms",
                    )}
                    <Text style={styles.conditionText}>
                        Commission: Standard 12%
                    </Text>
                    <Text style={styles.conditionText}>
                        Payment terms: Net 15
                    </Text>
                    <Text style={styles.conditionText}>
                        Penalty rules: SLA breach as per policy
                    </Text>

                    <TouchableOpacity
                        style={[styles.outlineBtn, { marginTop: 10 }]}
                    >
                        <Text style={styles.outlineBtnText}>
                            Upload agreement
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Final Decision Section */}
                <Text style={styles.finalDecisionTitle}>Final decision</Text>
                <View style={styles.decisionContainer}>
                    <TouchableOpacity
                        style={[
                            styles.decisionBtn,
                            { backgroundColor: "#2563EB" },
                        ]}
                    >
                        <Text style={styles.decisionBtnText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.decisionBtn,
                            { backgroundColor: "#EF4444" },
                        ]}
                    >
                        <Text style={styles.decisionBtnText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.decisionBtn,
                            {
                                backgroundColor: "white",
                                borderWidth: 1,
                                borderColor: "#D1D5DB",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.decisionBtnText,
                                { color: "#1f2937" },
                            ]}
                        >
                            Hold
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 8,
    },
    sectionHeaderText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1f2937",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    infoLabel: {
        fontSize: 13,
        color: "#6B7280",
        width: "35%",
    },
    infoValue: {
        fontSize: 13,
        color: "#111827",
        fontWeight: "500",
        flex: 1,
        textAlign: "right",
    },
    checkItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    checkLabel: {
        fontSize: 13,
        color: "#374151",
        flex: 1,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: "700",
    },
    outlineBtn: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 5,
    },
    outlineBtnText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#374151",
    },
    conditionText: {
        fontSize: 13,
        color: "#4B5563",
        marginBottom: 4,
        lineHeight: 18,
    },
    finalDecisionTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#111827",
        marginTop: 10,
        marginBottom: 12,
    },
    decisionContainer: {
        flexDirection: "row",
        gap: 10,
    },
    decisionBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    decisionBtnText: {
        color: "white",
        fontSize: 14,
        fontWeight: "700",
    },
});

export default CompanyReviewDetail;
