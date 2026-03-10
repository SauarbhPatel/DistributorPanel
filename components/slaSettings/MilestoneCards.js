import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import {
    MaterialIcons,
    FontAwesome5,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const { width } = Dimensions.get("window");

const milestones = [
    {
        id: 1,
        title: "Accept Order",
        start: "ORDER_CREATED",
        end: "STATUS_REACHED",
        duration: "120 min",
        durationTitle: "BUSINESS_HOURS",
        grace: "15 min",
        severity: "HIGH",
        icon: <MaterialIcons name="check-circle" size={20} color="#ffffff" />,
        color: "#10B981", // Green
    },
    {
        id: 2,
        title: "Pack Order",
        start: "STATUS_ENTERED",
        end: "STATUS_REACHED",
        duration: "720 min",
        durationTitle: "CALENDAR_HOURS",
        grace: "30 min",
        severity: "HIGH",
        icon: (
            <MaterialCommunityIcons
                name="package-variant-closed"
                size={20}
                color="#ffffff"
            />
        ),
        color: "#4C6EF5", // Blue
    },
    {
        id: 3,
        title: "Ready to Dispatch",
        start: "STATUS_ENTERED",
        end: "COURIER_EVENT_PICKUP_CONFIRMED",
        duration: "1440 min",
        durationTitle: "CALENDAR_HOURS",
        grace: "60 min",
        severity: "MEDIUM",
        icon: <MaterialIcons name="bolt" size={20} color="#ffffff" />,
        color: "#BE4BDB", // Purple/Pink
    },
    {
        id: 4,
        title: "In Transit",
        start: "COURIER_EVENT_PICKUP_CONFIRMED",
        end: "COURIER_EVENT_FIRST_SCAN",
        duration: "480 min",
        durationTitle: "CALENDAR_HOURS",
        grace: "60 min",
        severity: "LOW",
        icon: (
            <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={20}
                color="#ffffff"
            />
        ),
        color: "#F97316", // Orange
    },
    {
        id: 5,
        title: "Delivered",
        start: "COURIER_EVENT_PICKUP_CONFIRMED",
        end: "COURIER_EVENT_DELIVERED",
        duration: "4320 min",
        durationTitle: "CALENDAR_HOURS",
        grace: "120 min",
        severity: "HIGH",
        icon: <MaterialIcons name="location-on" size={20} color="#ffffff" />,
        color: "#00ACC1", // Teal/Cyan
    },
];

const MilestoneCards = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.heading}>Milestones</Text>
                    <Text style={styles.subHeading}>
                        Start/end triggers, duration, and severity.
                    </Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                    <MaterialIcons name="add" size={18} color="#fff" />
                    <Text style={styles.addBtnText}>Add</Text>
                </TouchableOpacity>
            </View>

            {milestones.map((item, index) => (
                <View
                    key={index}
                    style={[styles.card, { borderLeftColor: item.color }]}
                >
                    {/* Top Row: ID, Icon, Title, Actions */}
                    <View style={styles.topRow}>
                        <View style={styles.titleSection}>
                            <View
                                style={[
                                    styles.iconBox,
                                    { backgroundColor: item.color },
                                ]}
                            >
                                {item.icon}
                            </View>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <View style={styles.actionSection}>
                            <TouchableOpacity>
                                <MaterialIcons
                                    name="edit"
                                    size={18}
                                    color="#94A3B8"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10 }}>
                                <MaterialIcons
                                    name="delete"
                                    size={18}
                                    color="#FA5252"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Triggers Section */}
                    <View style={styles.triggerRow}>
                        <View style={styles.triggerBadgeStart}>
                            <View style={styles.dotStart} />
                            <Text style={styles.triggerTextStart}>
                                {item.start}
                            </Text>
                        </View>
                        <MaterialIcons
                            name="arrow-forward"
                            size={14}
                            color="#CBD5E1"
                        />
                        <View style={styles.triggerBadgeEnd}>
                            <View style={styles.dotEnd} />
                            <Text style={styles.triggerTextEnd}>
                                {item.end}
                            </Text>
                        </View>
                    </View>

                    {/* Meta Info: Duration, Grace, Severity */}
                    <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                            <MaterialCommunityIcons
                                name="clock-outline"
                                size={14}
                                color="#64748B"
                            />
                            <Text style={styles.metaValue}>
                                {item.duration}
                            </Text>
                            <Text style={styles.metaLabel}>
                                {item.durationTitle}
                            </Text>
                        </View>

                        <View style={styles.metaItem}>
                            <MaterialCommunityIcons
                                name="lightning-bolt-outline"
                                size={14}
                                color="#F59E0B"
                            />
                            <Text style={styles.metaValue}>{item.grace}</Text>
                            <View
                                style={[
                                    styles.severityBadge,
                                    {
                                        backgroundColor:
                                            item.severity === "HIGH"
                                                ? "#FFF1F2"
                                                : "#FEF3C7",
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.severityText,
                                        {
                                            color:
                                                item.severity === "HIGH"
                                                    ? "#E11D48"
                                                    : "#D97706",
                                        },
                                    ]}
                                >
                                    {item.severity}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: Sizes.fixPadding * 2,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Sizes.fixPadding * 2,
    },
    heading: { ...Fonts.blackColor18Bold },
    subHeading: { ...Fonts.grayColor12Medium, color: "#64748B", marginTop: 2 },
    addBtn: {
        flexDirection: "row",
        backgroundColor: Colors.primaryColor || "#3f51b5",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: "center",
    },
    addBtnText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
        marginLeft: 4,
    },
    card: {
        width: width - 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: Sizes.fixPadding + 2,
        marginBottom: Sizes.fixPadding,
        // borderWidth: 1,
        borderLeftWidth: 4.5,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleSection: { flexDirection: "row", alignItems: "center", flex: 1 },
    idBadge: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    idText: { fontSize: 10, fontWeight: "bold", color: "#64748B" },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    title: { ...Fonts.blackColor15Bold, flex: 1 },
    actionSection: { flexDirection: "row" },
    triggerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        flexWrap: "wrap",
        gap: 10,
    },
    triggerBadgeStart: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0FDF4",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#DCFCE7",
    },
    triggerBadgeEnd: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F9FF",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#E0F2FE",
    },
    dotStart: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#22C55E",
        marginRight: 6,
    },
    dotEnd: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#3B82F6",
        marginRight: 6,
    },
    triggerTextStart: { fontSize: 10, fontWeight: "600", color: "#166534" },
    triggerTextEnd: { fontSize: 10, fontWeight: "600", color: "#075985" },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#F8FAFC",
    },
    metaItem: { flexDirection: "row", alignItems: "center" },
    metaValue: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#1E293B",
        marginLeft: 5,
    },
    metaLabel: {
        fontSize: 10,
        color: "#94A3B8",
        marginLeft: 5,
        fontWeight: "600",
    },
    severityBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 8,
    },
    severityText: { fontSize: 9, fontWeight: "bold" },
});

export default MilestoneCards;
