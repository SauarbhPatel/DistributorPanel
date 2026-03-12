import React from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import CommonHeader from "../../components/common/CommonHeader";
import { LinearGradient } from "expo-linear-gradient";
import SearchFilterBar from "../../components/slaSettings/SearchFilterBar";
import OrderAtRiskModal from "../../components/slaSettings/OrderAtRiskModal";

const options = [
    {
        orderId: "ORD-1001",
        milestone: "Accept Order",
        severity: "HIGH",
        severityColor: "#fa5252",
        status: "OPEN",
        statusColor: "#007bff",
        dueTime: "2/15/2025, 7:30:00 PM",
        breachTime: "2/15/2025, 9:00:00 PM",
        assignee: "John Smith",
        reason: "Delayed acceptance",
    },
    {
        orderId: "ORD-1003",
        milestone: "Accept Order",
        severity: "MEDIUM",
        severityColor: "#fd7e14",
        status: "WAIVED",
        statusColor: "#20c997",
        dueTime: "2/14/2025, 5:30:00 PM",
        breachTime: "2/14/2025, 7:30:00 PM",
        assignee: "Sarah Johnson",
        reason: "System downtime",
    },
];

const SlaBreachedOrders = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"Breached Orders"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <SlaHeader
                        colors={["#E7000B", "#FF2056", "#F6339A"]}
                        title="Breached Orders"
                        subTitle="Breached orders with reason and next action. Option to request waiver for exceptional circumstances."
                        stats={[
                            { value: "4", label: "total breaches" },
                            { value: "3", label: "open" },
                            { value: "2", label: "high severity" },
                        ]}
                        headerIcon={
                            <MaterialCommunityIcons
                                name="inbox-full"
                                size={24}
                                color="#fff"
                            />
                        }
                        status="Export Report"
                    />
                    <SearchFilterBar Severity={true} />
                    <View style={{ marginTop: 10 }} />
                    {options.map((item, index) => (
                        <OptionCard item={item} key={index} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SlaBreachedOrders;

const OptionCard = ({ item }) => {
    const getSeverityStyle = (severity) => {
        switch (severity?.toUpperCase()) {
            case "HIGH":
                return { bg: "#FFF5F5", border: "#FFC1C1" };
            case "MEDIUM":
                return { bg: "#FFF9DB", border: "#FFE066" };
            case "LOW":
                return { bg: "#F8F9FA", border: "#DEE2E6" };
            default:
                return { bg: "#FFFFFF", border: "#E9ECEF" };
        }
    };

    const severityStyle = getSeverityStyle(item.severity);

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: severityStyle.bg,
                    borderColor: severityStyle.border,
                },
            ]}
        >
            <View style={styles.headerRow}>
                <View style={styles.headerLeft}>
                    <Text style={styles.orderId}>{item.orderId}</Text>
                    <View style={styles.milestoneBadge}>
                        <Text style={styles.milestoneBadgeText}>
                            {item.milestone}
                        </Text>
                    </View>
                </View>

                <View style={styles.statusGroup}>
                    <View style={styles.severityIndicator}>
                        <View
                            style={[
                                styles.dot,
                                { backgroundColor: item.severityColor },
                            ]}
                        />
                        <Text
                            style={[
                                styles.indicatorText,
                                { color: item.severityColor },
                            ]}
                        >
                            SEVERITY: {item.severity}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.statusPill,
                            { backgroundColor: item.statusColor + "20" },
                        ]}
                    >
                        <Feather
                            name="info"
                            size={10}
                            color={item.statusColor}
                        />
                        <Text
                            style={[
                                styles.statusPillText,
                                { color: item.statusColor },
                            ]}
                        >
                            STATUS: {item.status}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                    <View style={styles.infoLabelGroup}>
                        <Feather name="clock" size={12} color="#868e96" />
                        <Text style={styles.infoLabel}>DUE</Text>
                    </View>
                    <Text style={styles.infoValue}>{item.dueTime}</Text>
                </View>
                <View style={styles.infoItem}>
                    <View style={styles.infoLabelGroup}>
                        <MaterialIcons
                            name="warning-amber"
                            size={12}
                            color="#fa5252"
                        />
                        <Text style={[styles.infoLabel, { color: "#fa5252" }]}>
                            BREACHED
                        </Text>
                    </View>
                    <Text style={styles.infoValue}>{item.breachTime}</Text>
                </View>
                <View style={styles.infoItem}>
                    <View style={styles.infoLabelGroup}>
                        <Feather name="box" size={12} color="#868e96" />
                        <Text style={styles.infoLabel}>BUYER</Text>
                    </View>
                    <Text style={styles.infoValue}>
                        {item.assignee || "John Smith"}
                    </Text>
                </View>
                <View style={styles.infoItem}>
                    <TouchableOpacity style={styles.requestBtn}>
                        <MaterialCommunityIcons
                            name="shield-outline"
                            size={14}
                            color="#495057"
                        />
                        <Text style={styles.requestBtnText}>
                            Request waiver
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.reasonBox}>
                <View style={styles.infoLabelGroup}>
                    <MaterialCommunityIcons
                        name="file-document-outline"
                        size={12}
                        color="#868e96"
                    />
                    <Text style={styles.infoLabel}>REASON</Text>
                </View>
                <Text style={styles.reasonText}>
                    {item.reason || "Delayed acceptance"}
                </Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding,
    },
    card: {
        borderRadius: 12,
        borderWidth: 1,
        padding: 16,
        marginBottom: 16,
        position: "relative",
    },
    headerRow: {
        flexDirection: "column",
        gap: 10,
        marginBottom: 15,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    orderId: {
        fontSize: 18,
        fontWeight: "800",
        color: "#212529",
    },
    milestoneBadge: {
        backgroundColor: "#ff4d4d",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    milestoneBadgeText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "bold",
    },
    statusGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    severityIndicator: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    indicatorText: {
        fontSize: 10,
        fontWeight: "bold",
    },
    statusPill: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        gap: 4,
    },
    statusPillText: {
        fontSize: 10,
        fontWeight: "bold",
    },
    requestBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#dee2e6",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 6,
        elevation: 1,
    },
    requestBtnText: {
        fontSize: 12,
        color: "#495057",
        fontWeight: "600",
    },
    infoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 15,
        gap: 10,
    },
    infoItem: {
        minWidth: "45%",
    },
    infoLabelGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 4,
    },
    infoLabel: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#868e96",
    },
    infoValue: {
        fontSize: 12,
        color: "#495057",
        fontWeight: "500",
    },
    reasonBox: {
        backgroundColor: "rgba(255,255,255,0.6)",
        borderWidth: 1,
        borderColor: "#e9ecef",
        borderRadius: 8,
        padding: 10,
    },
    reasonText: {
        fontSize: 13,
        color: "#495057",
        marginTop: 2,
    },
});
