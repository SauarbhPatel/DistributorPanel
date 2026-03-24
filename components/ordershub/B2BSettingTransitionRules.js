import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    LayoutAnimation,
    Platform,
    UIManager,
} from "react-native";
import {
    Feather,
    MaterialCommunityIcons,
    FontAwesome5,
} from "@expo/vector-icons";

// Enable LayoutAnimation for smooth accordion toggle
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const B2BSettingTransitionRules = () => {
    const [expandedId, setExpandedId] = useState("1");

    const data = [
        {
            id: "1",
            title: "New Order",
            slug: "NEW_ORDER",
            icon: "box-variant-plus",
            iconFamily: "MaterialCommunityIcons",
            color: "#0070ba",
            bgColor: "#f0f9ff",
            rules: [
                {
                    from: "New Orders",
                    to: "Verified Orders",
                    code: "NEW_ORDER_ALL",
                },
                {
                    from: "Unverified Orders",
                    to: null,
                    code: "NEW_ORDER_UNVERIFIED",
                },
                {
                    from: "Verified Orders",
                    to: "Processing → Labeling",
                    code: "NEW_ORDER_VERIFIED",
                },
            ],
        },
        {
            id: "2",
            title: "Processing",
            slug: "PROCESSING",
            icon: "clock-outline",
            iconFamily: "MaterialCommunityIcons",
            color: "#b45309",
            bgColor: "#fffbeb",
        },
        {
            id: "3",
            title: "Ready to Pick",
            slug: "READY_TO_PICK",
            icon: "package-variant",
            iconFamily: "MaterialCommunityIcons",
            color: "#7c3aed",
            bgColor: "#f5f3ff",
        },
        {
            id: "4",
            title: "In Transit",
            slug: "IN_TRANSIT",
            icon: "truck-delivery-outline",
            iconFamily: "MaterialCommunityIcons",
            color: "#2563eb",
            bgColor: "#eff6ff",
        },
        {
            id: "5",
            title: "Delivered",
            slug: "DELIVERED",
            icon: "check-circle-outline",
            iconFamily: "MaterialCommunityIcons",
            color: "#059669",
            bgColor: "#ecfdf5",
        },
        {
            id: "6",
            title: "Cancelled",
            slug: "CANCELLED",
            icon: "close-circle-outline",
            iconFamily: "MaterialCommunityIcons",
            color: "#dc2626",
            bgColor: "#fef2f2",
        },
    ];

    const toggleExpand = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <View style={styles.container}>
            {data.map((item) => {
                const isExpanded = expandedId === item.id;
                return (
                    <View
                        key={item.id}
                        style={[
                            styles.accordionCard,
                            {
                                borderColor: isExpanded
                                    ? item.color
                                    : "#e2e8f0",
                            },
                        ]}
                    >
                        <TouchableOpacity
                            onPress={() => toggleExpand(item.id)}
                            style={[
                                styles.header,
                                { backgroundColor: item.bgColor },
                            ]}
                            activeOpacity={0.7}
                        >
                            <Feather
                                name={
                                    isExpanded
                                        ? "chevron-down"
                                        : "chevron-right"
                                }
                                size={20}
                                color="#64748b"
                            />

                            <View style={styles.iconBox}>
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={22}
                                    color={item.color}
                                />
                            </View>

                            <View style={styles.headerText}>
                                <View style={styles.titleRow}>
                                    <Text style={styles.title}>
                                        {item.title}
                                    </Text>
                                    <View
                                        style={[
                                            styles.slugBadge,
                                            {
                                                backgroundColor: "#fff",
                                                borderColor: item.color + "40",
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.slugText,
                                                { color: item.color },
                                            ]}
                                        >
                                            {item.slug}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.subtitle}>
                                    Primary → 1 target(s)
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {isExpanded && (
                            <View style={styles.expandedContent}>
                                <View style={styles.subHeader}>
                                    <Text style={styles.ruleLabel}>
                                        Primary rules:{" "}
                                        <Text style={styles.rulePath}>
                                            From {item.title} → Processing
                                        </Text>
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.addPrimaryBtn}
                                    >
                                        <Feather
                                            name="plus"
                                            size={14}
                                            color="#fff"
                                        />
                                        <Text style={styles.addPrimaryText}>
                                            Add primary rule
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {item.rules?.map((rule, idx) => (
                                    <View key={idx} style={styles.ruleCard}>
                                        <View style={styles.ruleMain}>
                                            <View style={styles.ruleInfo}>
                                                <Text style={styles.ruleTitle}>
                                                    {rule.from}
                                                </Text>
                                                <View style={styles.miniSlug}>
                                                    <Text
                                                        style={
                                                            styles.miniSlugText
                                                        }
                                                    >
                                                        {rule.code}
                                                    </Text>
                                                </View>
                                            </View>

                                            <Feather
                                                name="arrow-right"
                                                size={16}
                                                color="#94a3b8"
                                            />

                                            <View style={styles.ruleTarget}>
                                                {rule.to ? (
                                                    <View
                                                        style={
                                                            styles.targetBadge
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.targetText
                                                            }
                                                        >
                                                            {rule.to}
                                                        </Text>
                                                    </View>
                                                ) : (
                                                    <TouchableOpacity
                                                        style={
                                                            styles.addTransitionLink
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.addTransitionLinkText
                                                            }
                                                        >
                                                            Add transition
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        </View>

                                        <View style={styles.ruleActions}>
                                            <TouchableOpacity>
                                                <Feather
                                                    name="edit-2"
                                                    size={16}
                                                    color="#64748b"
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Feather
                                                    name="trash-2"
                                                    size={16}
                                                    color="#ef4444"
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.addBtnSmall}
                                            >
                                                <Text
                                                    style={
                                                        styles.addBtnSmallText
                                                    }
                                                >
                                                    Add transition
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8fafc", paddingHorizontal: 10 },
    content: { padding: 16, paddingBottom: 40 },
    accordionCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 12,
    },
    iconBox: {
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    headerText: { flex: 1 },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    title: { fontSize: 16, fontWeight: "700", color: "#1e293b" },
    slugBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        borderWidth: 1,
    },
    slugText: { fontSize: 10, fontWeight: "800" },
    subtitle: { fontSize: 12, color: "#64748b", marginTop: 2 },

    expandedContent: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
    },
    subHeader: {
        marginBottom: 16,
    },
    ruleLabel: { fontSize: 12, color: "#64748b" },
    rulePath: { fontWeight: "700", color: "#1e293b" },
    addPrimaryBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0070ba",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        gap: 4,
        marginTop: 10,
        justifyContent: "center",
    },
    addPrimaryText: { color: "#fff", fontSize: 11, fontWeight: "600" },

    ruleCard: {
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        marginBottom: 10,
    },
    ruleMain: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    ruleInfo: { flex: 1 },
    ruleTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#334155",
        marginBottom: 4,
    },
    miniSlug: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    miniSlugText: { fontSize: 9, color: "#94a3b8", fontWeight: "700" },

    ruleTarget: { flex: 1, alignItems: "flex-end" },
    targetBadge: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    targetText: { fontSize: 12, color: "#475569", fontWeight: "500" },
    addTransitionLink: {
        borderWidth: 1,
        borderColor: "#0070ba",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    addTransitionLinkText: {
        color: "#0070ba",
        fontSize: 12,
        fontWeight: "500",
    },

    ruleActions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        paddingTop: 10,
    },
    addBtnSmall: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    addBtnSmallText: { fontSize: 11, color: "#475569", fontWeight: "600" },
});

export default B2BSettingTransitionRules;
