import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
const actions = [
    {
        id: 1,
        title: "Connect Google Ads (Demo)",
        subTitle: "Link workspace to Google Ads test or production account.",
        link: "App Setup →",
        icon: "email",
        color: "#2563EB",
        colors: ["#51A2FF", "#2B7FFF"],
    },
    {
        id: 2,
        title: "Connect Merchant Center (Demo)",
        subTitle: "Link test or production Merchant Center for feed.",
        link: "App Setup →",
        icon: "cart",
        colors: ["#C27AFF", "#AD46FF"],
        color: "#9333EA",
    },
    {
        id: 3,
        title: "Run Feed Validation",
        subTitle: "Check product eligibility and feed diagnostics.",
        link: "Product Catalog Sync →",
        icon: "file-document",
        color: "#10B981",
        colors: ["#05DF72", "#00C950"],
    },
    {
        id: 4,
        title: "Create First Campaign (Wizard)",
        subTitle: "Guided campaign creation with product sets.",
        link: "Campaigns & Ads →",
        icon: "bullhorn-outline",
        color: "#F97316",
        colors: ["#FF8904", "#FF6900"],
    },
    {
        id: 5,
        title: "Product Ads Monitor (Admin)",
        subTitle: "Product-wise view: what is advertised and why.",
        link: "Campaigns & Ads →",
        icon: "chart-bar",
        color: "#F97316",
        colors: ["#45556C", "#314158"],
    },
];

const QuickActions = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Feather name="zap" size={18} color="#1E293B" />
                <Text style={styles.headerTitle}>Quick actions</Text>
            </View>
            <Text style={styles.headerSub}>
                One-click routes to the correct setup section.
            </Text>
            <View style={styles.grid}>
                {actions.map((item) => (
                    <View key={item.id} style={styles.actionCard}>
                        <LinearGradient
                            style={[
                                styles.iconBox,
                                // { backgroundColor: item.color },
                            ]}
                            colors={item?.colors || ["#2563EB", "#9333EA"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <MaterialCommunityIcons
                                name={item.icon}
                                size={22}
                                color="white"
                            />
                        </LinearGradient>
                        <View
                            style={{
                                width: width - 100,
                            }}
                        >
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardSubTitle}>
                                {item.subTitle}
                            </Text>
                            <TouchableOpacity>
                                <Text
                                    style={[
                                        styles.linkText,
                                        { color: item.color },
                                    ]}
                                >
                                    {item.link}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};
export default QuickActions;
const styles = StyleSheet.create({
    container: {},
    header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginLeft: 8,
    },
    headerSub: {
        fontSize: 13,
        color: "#64748B",
        marginBottom: 16,
    },
    grid: {
        // flexDirection: "row",
        // flexWrap: "wrap",
        // justifyContent: "space-between",
    },
    actionCard: {
        // width: cardWidth,
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        flexDirection: "row",
        gap: 10,
        flex: 1,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1E293B",
        marginBottom: 10,
    },
    linkText: { fontSize: 12, fontWeight: "700" },
    // Funnel Styles
    funnelCard: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 16,
        margin: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 20,
    },
    cardSubTitle: {
        fontSize: 13,
        color: "#64748B",
        marginBottom: 10,
        flex: 1,
    },
    funnelRow: { marginBottom: 15 },
    labelRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    labelText: { fontSize: 13, color: "#64748B" },
    valueText: { fontSize: 13, fontWeight: "700", color: "#1E293B" },
    barBackground: {
        height: 35,
        backgroundColor: "#F8FAFC",
        borderRadius: 10,
        overflow: "hidden",
    },
    progressBar: { height: "100%", borderRadius: 10 },
});
