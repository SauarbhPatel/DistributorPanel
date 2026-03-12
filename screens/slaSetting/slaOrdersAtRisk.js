import React, { useState } from "react";
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
        orderId: "ORD-2024-002585",
        milestone: "S", // Initial for Suresh
        assignee: "Suresh Pillai",
        severity: "HIGH",
        severityColor: "#fa5252",
        sellerName: "GadgetHub",
        sellerColor: "#be4bdb",
        dueTime: "17 Feb 2024, 06:00 pm",
        breachTime: "11h 1m left",
        status: "OPEN", // Maps to "New Order"
        statusColor: "#339af0", // Blue left border
    },
    {
        orderId: "ORD-BF-2024-001",
        milestone: "R", // Initial for Rajesh
        assignee: "Rajesh Kumar",
        severity: "HIGH",
        severityColor: "#fa5252",
        sellerName: "BAOFENG",
        sellerColor: "#9c36b5",
        dueTime: "17 Feb 2024, 12:30 pm",
        breachTime: "11h 1m left",
        status: "VERIFIED", // Custom status
        statusColor: "#20c997", // Green left border
    },
    {
        orderId: "ORD-BF-2024-003",
        milestone: "M", // Initial for Manoj
        assignee: "Manoj Tiwari",
        severity: "MEDIUM",
        severityColor: "#fd7e14",
        sellerName: "BAOFENG",
        sellerColor: "#9c36b5",
        dueTime: "16 Feb 2024, 09:30 pm",
        breachTime: "11h 1m left",
        status: "LABELING",
        statusColor: "#ae3ec9", // Purple left border
    },
    {
        orderId: "ORD-BF-2024-004",
        milestone: "L", // Initial for Lakshmi
        assignee: "Lakshmi Narayanan",
        severity: "LOW",
        severityColor: "#40c057",
        sellerName: "BAOFENG",
        sellerColor: "#9c36b5",
        dueTime: "16 Feb 2024, 04:30 pm",
        breachTime: "11h 1m left",
        status: "UNVERIFIED",
        statusColor: "#fab005", // Yellow/Orange left border
    },
    {
        orderId: "ORD-2024-001847",
        milestone: "R", // Initial for Rahul
        assignee: "Rahul Sharma",
        severity: "CRITICAL",
        severityColor: "#c92a2a",
        sellerName: "ElectroMart",
        sellerColor: "#15aabf",
        dueTime: "15 Feb 2024, 04:00 pm",
        breachTime: "11h 1m left",
        status: "VERIFIED",
        statusColor: "#20c997",
    },
];

const SlaOrdersAtRisk = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"At-Risk Orders"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <SlaHeader
                        colors={["#F54900", "#FE9A00", "#F0B100"]}
                        title="Orders at Risk"
                        subTitle="Orders approaching their SLA deadline. Take action now to prevent breaches and maintain compliance."
                        stats={[
                            { value: "11", label: "at risk orders" },
                            { value: "3", label: "high urgency" },
                            { label: "+3 in last hour", icon: "trending-up" },
                        ]}
                        headerIcon={
                            <MaterialCommunityIcons
                                name="inbox-full"
                                size={24}
                                color="#fff"
                            />
                        }
                        status="Export CSV"
                    />
                    <SearchFilterBar />
                    <View style={{ marginTop: 10 }} />
                    {options.map((item, index) => (
                        <OptionCard item={item} key={index} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SlaOrdersAtRisk;

const OptionCard = ({ item }) => {
    // Determine status color for the badge and left border
    const statusTheme = {
        OPEN: {
            bg: "#e7f5ff",
            text: "#1971c2",
            dot: "#339af0",
            label: "New Order",
        },
        ASSIGNED: {
            bg: "#f3f0ff",
            text: "#845ef7",
            dot: "#9775fa",
            label: "Verified",
        },
        WAIVED: {
            bg: "#fff4e6",
            text: "#fd7e14",
            dot: "#ffa94d",
            label: "Unverified",
        },
    };

    const theme = statusTheme[item.status] || statusTheme.OPEN;
    const [isShowModel, setIsShowModel] = useState(false);

    return (
        <View
            style={[
                styles.card,
                { borderLeftColor: item.statusColor || "#14B8A6" },
            ]}
        >
            <OrderAtRiskModal
                visible={isShowModel}
                onClose={() => setIsShowModel(false)}
            />

            {/* Top Row: Order ID and Action Buttons */}
            <View style={styles.rowTop}>
                <Text
                    style={styles.orderIdText}
                    onPress={() => setIsShowModel(true)}
                >
                    {item.orderId}
                </Text>
            </View>

            {/* Middle Section: Milestone and Seller */}
            <View style={styles.metaRow}>
                <View style={styles.milestoneGroup}>
                    <View
                        style={[
                            styles.avatarCircle,
                            { backgroundColor: item.statusColor || "#3b5bdb" },
                        ]}
                    >
                        <Text style={styles.avatarLetter}>
                            {item.assignee ? item.assignee.charAt(0) : "S"}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.labelTitle}>MILESTONE</Text>
                        <Text style={styles.milestoneValue}>
                            {item.assignee || "Unassigned"}
                        </Text>
                    </View>
                </View>

                <View style={styles.sellerGroup}>
                    <MaterialCommunityIcons
                        name="storefront-outline"
                        size={18}
                        color="#be4bdb"
                    />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={styles.labelTitle}>SELLER</Text>
                        <Text style={styles.metaValue}>{item.sellerName}</Text>
                    </View>
                </View>
            </View>

            {/* Status and Time Row */}
            <View style={styles.footerRow}>
                <View
                    style={[styles.statusBadge, { backgroundColor: theme.bg }]}
                >
                    <View
                        style={[
                            styles.statusDot,
                            { backgroundColor: theme.dot },
                        ]}
                    />
                    <Text
                        style={[styles.statusBadgeText, { color: theme.text }]}
                    >
                        {theme.label}
                    </Text>
                </View>

                <View style={styles.timerContainer}>
                    <View style={styles.timerBadge}>
                        <Feather name="clock" size={12} color="#fd7e14" />
                        <Text style={styles.timerText}>11h 1m left</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Feather name="calendar" size={12} color="#adb5bd" />
                        <Text style={styles.dateText}>17 Feb, 06:00 pm</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 5,
        // Shadow for premium look
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    rowTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    orderIdText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#007bff",
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    primaryBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0061f2",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        gap: 4,
    },
    primaryBtnText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
    },
    waiveBtn: {
        padding: 4,
    },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    labelTitle: {
        fontSize: 10,
        color: "#adb5bd",
        fontWeight: "800",
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    milestoneGroup: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    avatarCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    avatarLetter: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    milestoneValue: {
        fontSize: 13,
        fontWeight: "600",
        color: "#495057",
    },
    sellerGroup: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end",
    },
    metaValue: {
        fontSize: 13,
        fontWeight: "600",
        color: "#495057",
    },
    footerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#f1f3f5",
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusBadgeText: {
        fontSize: 11,
        fontWeight: "700",
    },
    timerContainer: {
        alignItems: "flex-end",
    },
    timerBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff4e6",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        marginBottom: 4,
    },
    timerText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#d9480f",
        marginLeft: 4,
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    dateText: {
        fontSize: 10,
        color: "#adb5bd",
    },
});
