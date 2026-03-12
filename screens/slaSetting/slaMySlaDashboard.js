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

const ActionCard = ({ icon, color, bgColor, count, title, actionNeeded }) => (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
        <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
                <MaterialCommunityIcons name={icon} size={22} color="#fff" />
            </View>
            {actionNeeded && (
                <View style={styles.actionNeededBadge}>
                    <MaterialCommunityIcons
                        name="trending-up"
                        size={12}
                        color="#ef4444"
                    />
                    <Text style={styles.actionNeededText}>Action needed</Text>
                </View>
            )}
        </View>
        <Text style={[styles.cardCount, { color: color }]}>{count}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
    </View>
);

const SlaMySlaDashboard = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"My SLA Dashboard"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <SlaHeader
                        title="My SLA Dashboard"
                        subTitle="Your SLA health: orders to accept today, to pack within SLA, ready to ship pending, breaches, average processing times."
                    />

                    <View style={styles.row}>
                        <ActionCard
                            icon="package-variant-closed"
                            color="#3b82f6"
                            bgColor="#eff6ff"
                            count="—"
                            title="Orders to accept today"
                        />
                        <ActionCard
                            icon="clock-outline"
                            color="#d946ef"
                            bgColor="#fdf4ff"
                            count="—"
                            title="To pack within SLA"
                        />
                    </View>

                    <View style={styles.row}>
                        <ActionCard
                            icon="truck-delivery-outline"
                            color="#10b981"
                            bgColor="#ecfdf5"
                            count="—"
                            title="Ready to ship pending"
                        />
                        <ActionCard
                            icon="alert-outline"
                            color="#ef4444"
                            bgColor="#fef2f2"
                            count="2"
                            title="Breaches (your queue)"
                            actionNeeded={true}
                        />
                    </View>

                    <View style={styles.quickActionContainer}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.blueDot} />
                            <Text style={styles.sectionTitle}>
                                Quick actions
                            </Text>
                        </View>

                        <View style={styles.actionRow}>
                            <TouchableOpacity style={{ flex: 1 }}>
                                <LinearGradient
                                    colors={["#3b82f6", "#6366f1"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradientButton}
                                >
                                    <View style={styles.actionContent}>
                                        <View style={styles.actionIconBox}>
                                            <MaterialCommunityIcons
                                                name="alert-outline"
                                                size={18}
                                                color="#fff"
                                            />
                                        </View>
                                        <Text style={styles.actionTextWhite}>
                                            View at-risk orders
                                        </Text>
                                    </View>
                                    <Feather
                                        name="chevron-right"
                                        size={18}
                                        color="#fff"
                                    />
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.outlineButton}>
                                <View style={styles.actionContent}>
                                    <View
                                        style={[
                                            styles.actionIconBox,
                                            { backgroundColor: "#fef2f2" },
                                        ]}
                                    >
                                        <MaterialCommunityIcons
                                            name="package-variant"
                                            size={18}
                                            color="#ef4444"
                                        />
                                    </View>
                                    <Text style={styles.actionTextBlack}>
                                        Breached orders
                                    </Text>
                                    <View style={styles.countBadge}>
                                        <Text style={styles.countBadgeText}>
                                            2
                                        </Text>
                                    </View>
                                </View>
                                <Feather
                                    name="chevron-right"
                                    size={18}
                                    color="#64748b"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SlaMySlaDashboard;

const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Sizes.fixPadding,
        gap: 12,
        marginTop: 10,
    },
    card: {
        flex: 1,
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 10,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    actionNeededBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#fee2e2",
    },
    actionNeededText: {
        fontSize: 10,
        color: "#ef4444",
        fontWeight: "bold",
        marginLeft: 2,
    },
    cardCount: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 5,
    },
    cardTitle: {
        fontSize: 12,
        color: "#475569",
        fontWeight: "500",
    },
    // Quick Actions
    quickActionContainer: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    blueDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#3b82f6",
        marginRight: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1e293b",
    },
    actionRow: {
        // flexDirection: "row",
        gap: 12,
    },
    gradientButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderRadius: 12,
    },
    outlineButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    actionContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    actionTextWhite: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },
    actionTextBlack: {
        color: "#334155",
        fontSize: 13,
        fontWeight: "600",
    },
    countBadge: {
        backgroundColor: "#ef4444",
        borderRadius: 10,
        paddingHorizontal: 6,
        marginLeft: 6,
    },
    countBadgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
});
