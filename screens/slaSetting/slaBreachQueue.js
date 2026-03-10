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
import SearchFilterBar from "../../components/slaSettings/SearchFilterBar";

const options = [
    {
        orderId: "ORD-1002",
        milestone: "Pack Order",
        severity: "HIGH",
        severityColor: "#fa5252",
        sellerName: "Global Supplies",
        sellerColor: "#be4bdb",
        dueTime: "2/16/2025, 1:30:00 PM",
        breachTime: "2/16/2025, 3:30:00 PM",
        status: "ASSIGNED",
        assignee: "Sarah M.",
        statusColor: "#007bff",
    },
    {
        orderId: "ORD-1001",
        milestone: "Accept Order",
        severity: "HIGH",
        severityColor: "#fa5252",
        sellerName: "Acme Retail",
        sellerColor: "#da77f2",
        dueTime: "2/15/2025, 7:30:00 PM",
        breachTime: "2/15/2025, 9:00:00 PM",
        status: "OPEN",
        assignee: null,
        statusColor: "#20c997",
    },
    {
        orderId: "ORD-1003",
        milestone: "Accept Order",
        severity: "MEDIUM",
        severityColor: "#fd7e14",
        sellerName: "Acme Retail",
        sellerColor: "#da77f2",
        dueTime: "2/14/2025, 5:30:00 PM",
        breachTime: "2/14/2025, 7:30:00 PM",
        status: "WAIVED",
        assignee: "John D.",
        statusColor: "#adb5bd",
    },
    {
        orderId: "ORD-1005",
        milestone: "Accept Order",
        severity: "LOW",
        severityColor: "#40c057",
        sellerName: "Global Supplies",
        sellerColor: "#be4bdb",
        dueTime: "2/13/2025, 3:00:00 PM",
        breachTime: "2/13/2025, 4:15:00 PM",
        status: "OPEN",
        assignee: null,
        statusColor: "#20c997",
    },
    {
        orderId: "ORD-1009",
        milestone: "Ready to Ship",
        severity: "CRITICAL",
        severityColor: "#c92a2a",
        sellerName: "Tech Hub",
        sellerColor: "#15aabf",
        dueTime: "2/12/2025, 10:00:00 AM",
        breachTime: "2/12/2025, 10:30:00 AM",
        status: "ASSIGNED",
        assignee: "Mike Ross",
        statusColor: "#007bff",
    },
];

const SlaBreachQueue = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"SLA Breach Queue"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <SlaHeader
                        title="SLA Breach Queue"
                        subTitle="Real-time view of all breached orders requiring action. Assign, resolve, or waive breaches. Filter by severity, seller, milestone, or status."
                        stats={[
                            { value: "4", label: "total breaches" },
                            { value: "2", label: "open" },
                            { value: "2", label: "high severity" },
                        ]}
                        headerIcon={
                            <MaterialCommunityIcons
                                name="inbox-full"
                                size={24}
                                color="#fff"
                            />
                        }
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

export default SlaBreachQueue;

const OptionCard = ({ item }) => {
    return (
        <View
            style={[
                styles.card,
                { borderLeftColor: item.statusColor || "#007bff" },
            ]}
        >
            <View style={styles.rowTop}>
                <Text style={styles.code}>{item.orderId}</Text>
                <View style={styles.actions}>
                    {item.status === "OPEN" && (
                        <TouchableOpacity style={styles.primaryBtn}>
                            <Feather name="user-plus" size={14} color="#fff" />
                            <Text style={styles.primaryBtnText}>Assign</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.waiveBtn}>
                        <Feather name="x-circle" size={14} color="#495057" />
                        <Text style={styles.waiveBtnText}>Waive</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.metaRow}>
                <View style={styles.milestoneGroup}>
                    <View style={styles.iconBox}>
                        <Feather name="box" size={14} color="#007bff" />
                    </View>
                    <Text style={styles.milestoneText}>{item.milestone}</Text>
                </View>

                <View
                    style={[
                        styles.severityBadge,
                        { backgroundColor: item.severityColor + "15" },
                    ]}
                >
                    <Feather
                        name="alert-circle"
                        size={12}
                        color={item.severityColor}
                    />
                    <Text
                        style={[
                            styles.severityText,
                            { color: item.severityColor },
                        ]}
                    >
                        {item.severity}
                    </Text>
                </View>
            </View>

            <View style={styles.metaRow}>
                <View style={styles.sellerGroup}>
                    <View
                        style={[
                            styles.avatar,
                            { backgroundColor: item.sellerColor },
                        ]}
                    >
                        <Text style={styles.avatarText}>
                            {item.sellerName.charAt(0)}
                        </Text>
                    </View>
                    <Text style={styles.metaValue}>{item.sellerName}</Text>
                </View>

                {item.assignee && (
                    <View style={styles.assigneeGroup}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusLabel}>{item.status}: </Text>
                        <Text style={styles.assigneeName}>{item.assignee}</Text>
                    </View>
                )}
            </View>

            <View style={styles.timeContainer}>
                <View style={styles.timeItem}>
                    <Feather name="clock" size={12} color="#666" />
                    <Text style={styles.timeText}>{item.dueTime}</Text>
                </View>
                <View style={styles.timeItem}>
                    <Feather name="alert-triangle" size={12} color="#fa5252" />
                    <Text
                        style={[
                            styles.timeText,
                            { color: "#fa5252", fontWeight: "700" },
                        ]}
                    >
                        {item.breachTime}
                    </Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding,
    },

    dropdownBox: {
        marginVertical: Sizes.fixPadding,
        backgroundColor: "#fff",
        padding: Sizes.fixPadding,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e9ecef",
    },

    dropdownLabel: {
        ...Fonts.blackColor14Medium,
        marginBottom: 6,
    },

    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
    },

    tableHeader: {
        flexDirection: "row",
        marginTop: Sizes.fixPadding * 2,
        marginBottom: 6,
    },

    headerText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#495057",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: Sizes.fixPadding + 6,
        marginBottom: Sizes.fixPadding,
        borderLeftWidth: 4.5,
        borderLeftColor: "#14B8A6",
    },

    rowTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    code: {
        fontSize: 16,
        fontWeight: "800",
        color: "#212529",
    },
    actions: {
        flexDirection: "row",
        gap: 8,
    },
    primaryBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0061f2",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        gap: 4,
    },
    primaryBtnText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    waiveBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        borderWidth: 1,
        borderColor: "#dee2e6",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        gap: 4,
    },
    waiveBtnText: {
        color: "#495057",
        fontSize: 12,
        fontWeight: "600",
    },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    milestoneGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    iconBox: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: "#e7f1ff",
        justifyContent: "center",
        alignItems: "center",
    },
    milestoneText: {
        fontSize: 14,
        color: "#495057",
        fontWeight: "500",
    },
    severityBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        gap: 4,
    },
    severityText: {
        fontSize: 11,
        fontWeight: "bold",
    },
    sellerGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    metaValue: {
        fontSize: 13,
        color: "#495057",
    },
    assigneeGroup: {
        flexDirection: "row",
        alignItems: "center",
    },
    statusLabel: {
        fontSize: 12,
        color: "#868e96",
    },
    assigneeName: {
        fontSize: 12,
        fontWeight: "600",
        color: "#495057",
    },
    timeContainer: {
        marginTop: 8,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#f1f3f5",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    timeItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    timeText: {
        fontSize: 11,
        color: "#868e96",
    },
});
