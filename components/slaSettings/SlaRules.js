import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Ionicons, Feather } from "@expo/vector-icons";
import SlaHeader from "./SlaHeader";

const rulesData = [
    {
        id: 1,
        title: "Express zones",
        priority: 10,
        isDefault: false,
        conditions: { seller: "ALL", category: "ALL", zone: "SELECTED" },
        color: "#BE4BDB", // Purple
    },
    {
        id: 2,
        title: "Default B2C",
        priority: 0,
        isDefault: true,
        conditions: { seller: "ALL", category: "ALL", zone: "ALL" },
        color: "#4C6EF5", // Blue
    },
];

const SlaRules = ({ navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: Colors.bodyColor,
                marginBottom: 20,
            }}
        >
            <SlaHeader
                title={"SLA Rules"}
                subTitle="Conditions and priority for this policy. Most specific rule wins."
                buttonName="Add rule"
            />

            <View style={styles.container}>
                {rulesData.map((item) => (
                    <View
                        key={item.id}
                        style={[
                            styles.ruleCard,
                            { borderColor: item.color + "40" },
                        ]}
                    >
                        {/* Priority Badge Section */}
                        <View style={styles.prioritySection}>
                            <View
                                style={[
                                    styles.priorityBadge,
                                    { backgroundColor: item.color },
                                ]}
                            >
                                <Ionicons
                                    name="star-outline"
                                    size={14}
                                    color="#fff"
                                />
                                <Text style={styles.priorityText}>
                                    Priority {item.priority}
                                </Text>
                            </View>
                            {item.isDefault && (
                                <View style={styles.defaultLabel}>
                                    <Text style={styles.defaultLabelText}>
                                        DEFAULT
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Rule Content Section */}
                        <View style={styles.contentSection}>
                            <View style={styles.titleRow}>
                                <View
                                    style={[
                                        styles.iconBox,
                                        { backgroundColor: item.color + "15" },
                                    ]}
                                >
                                    <Feather
                                        name="filter"
                                        size={18}
                                        color={item.color}
                                    />
                                </View>
                                <Text style={styles.ruleTitle}>
                                    {item.title}
                                </Text>
                            </View>

                            {/* Conditions Row */}
                            <View style={styles.conditionsRow}>
                                <ConditionTag
                                    icon="storefront-outline"
                                    label="Seller"
                                    value={item.conditions.seller}
                                />
                                <ConditionTag
                                    icon="pricetag-outline"
                                    label="Category"
                                    value={item.conditions.category}
                                />
                                <ConditionTag
                                    icon="location-outline"
                                    label="Zone"
                                    value={item.conditions.zone}
                                    highlight={item.conditions.zone !== "ALL"}
                                />
                            </View>
                        </View>
                    </View>
                ))}

                {/* Footer Summary */}
                <View style={styles.footerRow}>
                    <View style={styles.summaryItem}>
                        <View
                            style={[styles.dot, { backgroundColor: "#BE4BDB" }]}
                        />
                        <Text style={styles.summaryText}>
                            Total Rules:{" "}
                            <Text style={{ fontWeight: "bold" }}>2</Text>
                        </Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <View
                            style={[styles.dot, { backgroundColor: "#4C6EF5" }]}
                        />
                        <Text style={styles.summaryText}>
                            Default Rules:{" "}
                            <Text style={{ fontWeight: "bold" }}>1</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const ConditionTag = ({ icon, label, value, highlight }) => (
    <View style={[styles.tag, highlight && styles.tagHighlight]}>
        <Ionicons
            name={icon}
            size={14}
            color={highlight ? "#10B981" : "#94A3B8"}
        />
        <Text style={[styles.tagText, highlight && styles.tagTextHighlight]}>
            {label}: <Text style={{ fontWeight: "bold" }}>{value}</Text>
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginTop: 10,
    },
    ruleCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: Sizes.fixPadding,
        flexDirection: "row",
        padding: Sizes.fixPadding,
        borderWidth: 1,
    },
    prioritySection: {
        alignItems: "center",
        paddingRight: Sizes.fixPadding,
        borderRightWidth: 1,
        borderRightColor: "#F1F5F9",
        justifyContent: "center",
    },
    priorityBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    priorityText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "bold",
        marginLeft: 4,
    },
    defaultLabel: {
        backgroundColor: "#4C6EF5",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginTop: 6,
    },
    defaultLabelText: {
        color: "#fff",
        fontSize: 9,
        fontWeight: "bold",
    },
    contentSection: {
        flex: 1,
        paddingLeft: Sizes.fixPadding,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    ruleTitle: {
        ...Fonts.blackColor16Bold,
    },
    conditionsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    tag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    tagHighlight: {
        backgroundColor: "#F0FDF4",
        borderColor: "#BBF7D0",
    },
    tagText: {
        fontSize: 10,
        color: "#64748B",
        marginLeft: 4,
    },
    tagTextHighlight: {
        color: "#166534",
    },
    footerRow: {
        flexDirection: "row",
        marginTop: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
    },
    summaryItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    summaryText: {
        fontSize: 12,
        color: "#64748B",
    },
});

export default SlaRules;
