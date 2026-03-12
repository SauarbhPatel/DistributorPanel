import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import {
    Feather,
    MaterialIcons,
    Ionicons,
    AntDesign,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const { width } = Dimensions.get("window");

const cards = [
    {
        title: "SLA Policy Builder",
        desc: "Create and manage SLA policies, milestones, start/end triggers, duration, grace period, and severity.",
        icon: (
            <MaterialCommunityIcons
                name="rocket-launch-outline"
                size={20}
                color="#4C6EF5"
            />
        ),
        color: "#4C6EF5",
        count: 3,
        path: "SlaPolicyBuilder",
    },
    {
        title: "Milestone dropdown options",
        desc: "Create and manage options for Start trigger, End trigger, Duration type, and Severity.",
        icon: (
            <MaterialCommunityIcons
                name="store-outline"
                size={20}
                color="#0D9488"
            />
        ),
        color: "#0D9488",
        count: 2,
        path: "SlaMilestoneDropdownOptions",
    },
    {
        title: "SLA Rules & Priority",
        desc: "Configure where and when a policy applies: seller, category, zone, courier.",
        icon: (
            <MaterialCommunityIcons
                name="clipboard-check-outline"
                size={20}
                color="#059669"
            />
        ),
        color: "#059669",
        count: 2,
        path: "SlaRulesAndPriority",
    },
    {
        title: "Courier cut-off for pickup",
        desc: "Create and manage SLA policies, milestones, start/end triggers.",
        icon: (
            <MaterialCommunityIcons
                name="play-circle-outline"
                size={20}
                color="#EA580C"
            />
        ),
        color: "#EA580C",
        count: 4,
        path: "SlaCourierCut",
    },
    {
        title: "Holiday & Working Hours",
        desc: "Working days, working hours, daily cutoff, holiday calendar by region.",
        icon: (
            <MaterialCommunityIcons
                name="chart-bar"
                size={20}
                color="#7950F2"
            />
        ),
        color: "#7950F2",
        count: 3,
        path: "SlaHolidayWorkingHours",
    },
    {
        title: "SLA Dashboard",
        desc: "Global view: orders at risk, breached orders, breach by milestone.",
        icon: (
            <MaterialCommunityIcons
                name="chart-bar"
                size={20}
                color="#FA5252"
            />
        ),
        color: "#FA5252",
        count: 3,
        path: "SlaDashboard",
    },
    {
        title: "SLA Breach Queue",
        desc: "Action center: assign, escalate, waive, apply penalty.",
        icon: (
            <MaterialCommunityIcons
                name="chart-bar"
                size={20}
                color="#BE4BDB"
            />
        ),
        color: "#BE4BDB",
        count: 3,
        path: "SlaBreachQueue",
    },
    {
        title: "Reward & Penalty",
        desc: "Apply fixed or % penalties when SLA is breached.",
        icon: <Feather name="award" size={20} color="#FA5252" />,
        color: "#FA5252",
        count: 3,
        path: "SlaRewardAndPenalty",
    },
    {
        title: "SLA Reports",
        desc: "Compliance %, average time per milestone, breach report.",
        icon: (
            <MaterialCommunityIcons
                name="chart-bar"
                size={20}
                color="#748FFC"
            />
        ),
        color: "#748FFC",
        count: 3,
        path: "SlaGenerateReport",
    },
];

const SlaAdminConfigCards = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Admin — Configuration & operations
            </Text>
            <Text style={styles.subHeading}>
                One-click routes to the correct setup section.
            </Text>

            <View style={styles.grid}>
                {cards.map((item, index) => (
                    <View
                        key={index}
                        style={[
                            styles.card,
                            { borderColor: item.color + "50" },
                        ]}
                    >
                        <View
                            style={[
                                styles.iconBox,
                                { backgroundColor: item.color + "20" },
                            ]}
                        >
                            {item.icon}
                        </View>

                        <Text style={styles.title}>{item.title}</Text>

                        <Text style={styles.desc}>{item.desc}</Text>

                        <View style={styles.bottomRow}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                                onPress={() =>
                                    item?.path && navigation.push(item?.path)
                                }
                            >
                                <Text
                                    style={[
                                        styles.openNow,
                                        { color: item.color },
                                    ]}
                                >
                                    Open Now
                                </Text>
                                <AntDesign
                                    name="right"
                                    size={13}
                                    color={item.color}
                                    style={{ marginLeft: 4, marginTop: 2 }}
                                />
                            </TouchableOpacity>

                            <View style={styles.countBox}>
                                <Text style={styles.count}>{item.count}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default SlaAdminConfigCards;

const styles = StyleSheet.create({
    container: {
        marginTop: Sizes.fixPadding * 2,
    },

    heading: {
        ...Fonts.blackColor18Bold,
    },

    subHeading: {
        ...Fonts.greenColor12Medium,
        marginTop: 4,
        marginBottom: Sizes.fixPadding * 2,
        color: "#64748B",
    },

    grid: {
        // flexDirection: "row",
        // flexWrap: "wrap",
        // justifyContent: "space-between",
    },

    card: {
        width: width - 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: Sizes.fixPadding + 4,
        marginBottom: Sizes.fixPadding,
        borderWidth: 1,
        borderLeftWidth: 4.5,
    },

    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },

    title: {
        ...Fonts.blackColor15Bold,
    },

    desc: {
        ...Fonts.greenColor12Medium,
        color: "#64748B",
        marginTop: 4,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },

    openNow: {
        fontSize: 13,
        fontWeight: "600",
    },

    countBox: {
        backgroundColor: "#f1f3f5",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },

    count: {
        fontSize: 12,
        fontWeight: "600",
    },
});
