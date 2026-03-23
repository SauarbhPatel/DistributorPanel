import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const B2BDashboardBanner = ({
    liveText = "LIVE B2B DASHBOARD",
    title = "B2B Orders Management System",
    subTitle = `Manage and track bulk business orders efficiently.\nFollow the workflow: RFQ → Quote Approval → PO Confirmation → Production → Dispatch → In Transit → Delivered → Invoiced.`,
    cardTitle = "Quick Tip Card Title",
    cardSubTitle = "Use bulk actions to process multiple purchase orders, update shipment statuses, and generate invoices faster.",
    cardButtonText = "View B2B Guide",
}) => {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={["#1E3A8A", "#3B82F6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.banner}
            >
                <View style={styles.statusRow}>
                    <View style={styles.greenDot} />
                    <Text style={styles.statusText}>{liveText}</Text>
                </View>

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.workflowText}>{subTitle}</Text>

                <View style={styles.quickTipCard}>
                    <View style={styles.iconContainer}>
                        <View style={styles.iconCircle}>
                            <Feather
                                name="box"
                                size={18}
                                color="#fff"
                                opacity={0.8}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, maxWidth: "80%", gap: 10 }}>
                        <View style={styles.tipContent}>
                            <Text style={styles.tipTitle}>{cardTitle}</Text>
                            <Text style={styles.tipDescription}>
                                {cardSubTitle}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.guideButton}>
                            <Text style={styles.guideButtonText}>
                                {cardButtonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 0,
    },
    banner: {
        borderRadius: 12,
        padding: 16,
        overflow: "hidden",
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    greenDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#10B981",
        marginRight: 8,
    },
    statusText: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#FFFFFF",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.9)",
        marginBottom: 4,
    },
    workflowText: {
        fontSize: 13,
        color: "rgba(255, 255, 255, 0.7)",
        lineHeight: 20,
        marginBottom: 24,
    },
    quickTipCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
    },
    iconContainer: {
        marginRight: 12,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    tipContent: {},
    tipTitle: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 2,
    },
    tipDescription: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 12,
        lineHeight: 16,
    },
    guideButton: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
    },
    guideButtonText: {
        color: "#2563EB",
        fontSize: 13,
        fontWeight: "700",
        textAlign: "center",
    },
});

export default B2BDashboardBanner;
