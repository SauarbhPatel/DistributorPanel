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
import { Feather, MaterialIcons } from "@expo/vector-icons";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import CommonHeader from "../../components/common/CommonHeader";

const policies = [
    {
        name: "Standard B2C SLA India",
        desc: "Express and standard delivery zones",
        status: "ACTIVE",
        icon: "clock",
        iconColor: "#4C6EF5",
        iconBg: "#EEF2FF",

        rules: [
            {
                title: "Express zones",
                priority: 10,
                detail: "Seller: ALL · Category: ALL · Zone: SELECTED · Courier: — · Service: EXPRESS",
            },
            {
                title: "Default B2C",
                priority: 0,
                detail: "Seller: ALL · Category: ALL · Zone: ALL · Courier: ALL · Service: BOTH",
                default: true,
            },
        ],
    },
    {
        name: "B2B SLA India",
        desc: "Business-to-business delivery policies",
        status: "ACTIVE",
        icon: "briefcase",
        iconColor: "#AE3EC9",
        iconBg: "#F8EEFF",
        rules: [],
    },
    {
        name: "Express SLA",
        desc: "Fast delivery options",
        status: "DRAFT",
        icon: "zap",
        iconColor: "#495057",
        iconBg: "#F1F3F5",
        rules: [],
    },
];

const SlaRulesAndPriority = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"SLA Rules & Priority"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <SlaHeader
                        title="SLA Rules & Priority"
                        subTitle="Configure where and when a policy applies. Rule conditions: seller,  category, zone, courier, service mode, order value. Most specific rule  wins; if tie, highest priority wins."
                    />

                    {policies.map((item, index) => (
                        <PolicyCard key={index} item={item} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const PolicyCard = ({ item }) => {
    const [open, setOpen] = useState(true);

    return (
        <View style={styles.policyCard}>
            {/* HEADER */}
            <View
                style={[
                    styles.policyHeader,
                    {
                        backgroundColor: item.iconColor + "10",
                    },
                ]}
            >
                <View
                    style={[
                        styles.iconBox,
                        {
                            backgroundColor: item.iconBg,
                            borderWidth: 1,
                            borderColor: item.iconColor + "40",
                        },
                    ]}
                >
                    <Feather
                        name={item.icon}
                        size={18}
                        color={item.iconColor}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.policyTitle}>{item.name}</Text>
                    <Text style={styles.policyDesc}>{item.desc}</Text>
                </View>

                <View style={styles.rightHeader}>
                    <View
                        style={[
                            styles.statusBadge,
                            {
                                backgroundColor:
                                    item.status === "ACTIVE"
                                        ? "#D3F9D8"
                                        : "#FFF3BF",
                            },
                        ]}
                    >
                        <Text
                            style={{
                                fontSize: 11,
                                fontWeight: "600",
                                color:
                                    item.status === "ACTIVE"
                                        ? "#2B8A3E"
                                        : "#E67700",
                            }}
                        >
                            {item.status}
                        </Text>
                    </View>

                    {/* Expand Button */}
                    <TouchableOpacity
                        style={styles.expandBtn}
                        onPress={() => setOpen(!open)}
                    >
                        <Feather
                            name={open ? "chevron-up" : "chevron-down"}
                            size={16}
                            color="#495057"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* COLLAPSIBLE CONTENT */}
            {open && (
                <View style={{ padding: Sizes.fixPadding }}>
                    {item.rules.length > 0 ? (
                        <>
                            <Text style={styles.ruleHeader}>
                                ACTIVE RULES {item.rules.length}
                            </Text>

                            {item.rules.map((rule, index) => (
                                <RuleCard
                                    rule={rule}
                                    key={index}
                                    iconColor={item.iconColor}
                                />
                            ))}
                        </>
                    ) : (
                        <View style={styles.emptyBox}>
                            <Feather name="info" size={22} color="#adb5bd" />

                            <Text style={styles.emptyText}>
                                No rules — default policy may apply.
                            </Text>

                            <TouchableOpacity
                                style={[
                                    styles.addBtn,
                                    { backgroundColor: item.iconColor },
                                ]}
                            >
                                <Text style={styles.addText}>+ Add Rule</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};
const RuleCard = ({ rule, iconColor }) => {
    return (
        <View
            style={[
                styles.ruleCard,
                { borderLeftWidth: 4.5, borderColor: iconColor },
            ]}
        >
            <View style={styles.ruleRow}>
                <View
                    style={[
                        styles.priorityBadge,
                        { backgroundColor: iconColor + "20" },
                    ]}
                >
                    <Text style={[styles.priorityText, { color: iconColor }]}>
                        Priority {rule.priority}
                    </Text>
                </View>

                {rule.default && (
                    <View
                        style={[
                            styles.defaultBadge,
                            { backgroundColor: iconColor },
                        ]}
                    >
                        <Text style={styles.defaultText}>default</Text>
                    </View>
                )}
            </View>

            <Text style={styles.ruleTitle}>{rule.title}</Text>

            <Text style={styles.ruleDetail}>{rule.detail}</Text>
        </View>
    );
};

export default SlaRulesAndPriority;

const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding,
        gap: 10,
    },

    policyCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        // padding: Sizes.fixPadding,
        borderWidth: 1,
        borderColor: "#e9ecef",
        overflow: "hidden",
    },

    policyHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: Sizes.fixPadding,
    },

    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 14,
        backgroundColor: "#EEF2FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    policyTitle: {
        ...Fonts.blackColor14Bold,
    },

    policyDesc: {
        fontSize: 12,
        color: "#868e96",
    },

    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },

    ruleHeader: {
        fontSize: 12,
        fontWeight: "700",
        color: "#868e96",
        marginBottom: 6,
    },

    ruleCard: {
        backgroundColor: "#F8F9FA",
        padding: 10,
        borderRadius: 14,
        marginBottom: 8,
    },

    ruleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },

    priorityBadge: {
        backgroundColor: "#E7F5FF",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginRight: 6,
    },

    priorityText: {
        fontSize: 11,
        color: "#1971C2",
        fontWeight: "600",
    },

    defaultBadge: {
        backgroundColor: "#4C6EF5",
        paddingHorizontal: 6,
        borderRadius: 5,
    },

    defaultText: {
        fontSize: 10,
        color: "#fff",
    },

    ruleTitle: {
        fontSize: 13,
        fontWeight: "600",
    },

    ruleDetail: {
        fontSize: 11,
        color: "#868e96",
        marginTop: 2,
    },

    emptyBox: {
        backgroundColor: "#F8F9FA",
        borderWidth: 1,
        borderColor: "#E9ECEF",
        borderRadius: 10,
        paddingVertical: 25,
        alignItems: "center",
        marginTop: 10,
    },

    emptyText: {
        fontSize: 12,
        color: "#868E96",
        marginVertical: 8,
        textAlign: "center",
    },
    addBtn: {
        backgroundColor: "#7048E8",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 6,
    },

    addText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    rightHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    expandBtn: {
        marginLeft: 8,
        width: 26,
        height: 26,
        borderRadius: 6,
        backgroundColor: "#F1F3F5",
        justifyContent: "center",
        alignItems: "center",
    },
});
