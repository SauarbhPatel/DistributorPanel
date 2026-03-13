import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from "react-native";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40) / 2;

const marketingChannels = [
    {
        id: "1",
        title: "Google YouTube",
        desc: "View data on revenue and traffic, set-up ads, video metrics",
        icon: "youtube",
        colors: ["#FB2C36", "#E7000B"],
        type: "feather",
        path: "MarketingGoogle",
    },
    {
        id: "2",
        title: "Google Analytics",
        desc: "View site traffic, page performance, user behavior, demographics",
        icon: "bar-chart-2",
        colors: ["#1864ab", "#1864ab"],
        type: "feather",
    },
    {
        id: "3",
        title: "Meta Insta",
        desc: "View engagement, reach, story metrics, post performance, ad data",
        icon: "instagram",
        colors: ["#F6339A", "#9810FA"],
        type: "feather",
    },
    {
        id: "4",
        title: "Meta Analytics",
        desc: "View ads revenue, set ads budget, view pages performance",
        icon: "facebook",
        colors: ["#155DFC", "#4F39F6"],
        type: "feather",
    },
    {
        id: "5",
        title: "WhatsApp",
        desc: "Messaging assistant messaging, order contact, WhatsApp for commerce",
        icon: "whatsapp",
        colors: ["#00C950", "#00A63E"],
        type: "material",
    },
    {
        id: "6",
        title: "Email Settings",
        desc: "Transactional, on marketing, email, campaigns, newsletter, CRM, email API",
        icon: "mail",
        colors: ["#FF6900", "#F54900"],
        type: "feather",
    },
    {
        id: "7",
        title: "SMS Settings",
        desc: "Transactional on marketing SMS, Configure SMS, setup SMS API",
        icon: "message-square",
        colors: ["#AD46FF", "#9810FA"],
        type: "feather",
    },
    {
        id: "8",
        title: "Data",
        desc: "Streaming & bulk, real warehouse engine export sales, order reports, Product",
        icon: "database",
        colors: ["#62748E", "#45556C"],
        type: "feather",
    },
];
const stats = [
    {
        label: "Sales",
        value: "₹1,24,500",
        change: "+12.5%",
        icon: "trending-up",
        colors: ["#00D492", "#00BBA7"],
    },
    {
        label: "Orders",
        value: "₹6,92,000",
        change: "+8.2%",
        icon: "shopping-cart",
        colors: ["#51A2FF", "#2B7FFF"],
    },
    {
        label: "Visitor",
        value: "3,620",
        change: "+15.3%",
        icon: "eye",
        colors: ["#C27AFF", "#AD46FF"],
    },
    {
        label: "Add-cart",
        value: "46,600",
        change: "+5.8%",
        icon: "mouse-pointer",
        colors: ["#FB64B6", "#F6339A"],
    },
    {
        label: "Checkout",
        value: "12,800",
        change: "-2.1%",
        icon: "clock",
        colors: ["#ffd200", "#FF8904"],
    },
];

const StatCard = ({ item }) => (
    <View style={styles.statCard}>
        <View style={styles.statHeader}>
            <LinearGradient colors={item.colors} style={styles.iconBox}>
                <Feather name={item.icon} size={18} color="#fff" />
            </LinearGradient>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.change}</Text>
            </View>
        </View>
        <Text style={styles.statLabel}>{item.label}</Text>
        <Text style={styles.statValue}>{item.value}</Text>
    </View>
);

const ChannelCard = ({ item, navigation }) => (
    <TouchableOpacity
        onPress={() => item?.path && navigation?.push(item?.path)}
        style={[styles.channelCard, { borderColor: item.colors[0] + "40" }]}
    >
        <View style={styles.cardHeader}>
            <LinearGradient
                colors={item?.colors || ["#000", "#000"]}
                style={styles.iconContainer}
            >
                {item.type === "feather" ? (
                    <Feather name={item.icon} size={20} color="#fff" />
                ) : (
                    <MaterialCommunityIcons
                        name={item.icon}
                        size={20}
                        color="#fff"
                    />
                )}
            </LinearGradient>

            <Feather name="external-link" size={14} color="#adb5bd" />
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc} numberOfLines={3}>
            {item.desc}
        </Text>
    </TouchableOpacity>
);

const MarketingDashboardOverview = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.mainTitle}>Marketing Dashboard</Text> */}
            <Text style={styles.subTitle}>
                Google Analytics, Meta, WhatsApp, Email, SMS, orders, orders,
                Contact pop-ups on, run insights. Use the links below to open
                Google YouTube, Google Analytics, Meta Social, Email, SMS
                settings, configure bulk API, sync provders and sub → check.
            </Text>
            <Text style={styles.sectionLabel}>MARKETING CHANNELS</Text>
            <FlatList
                data={marketingChannels}
                renderItem={({ item }) => (
                    <ChannelCard navigation={navigation} item={item} />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.gridPadding}
                columnWrapperStyle={styles.rowGap}
            />
            <Text style={styles.sectionLabel}>Overview</Text>
            s
            <FlatList
                data={stats}
                renderItem={({ item }) => <StatCard item={item} />}
                keyExtractor={(item) => item.label}
                numColumns={2}
                contentContainerStyle={styles.gridPadding}
                columnWrapperStyle={styles.rowGap}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1a1b1e",
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 13,
        color: "#868e96",
        lineHeight: 18,
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: "800",
        color: "#868e96",
        letterSpacing: 1,
        marginBottom: 15,
        textTransform: "uppercase",
    },

    gridPadding: { paddingBottom: 20 },
    rowGap: { justifyContent: "space-between", marginBottom: 12 },

    channelCard: {
        width: CARD_WIDTH,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1.5,
        padding: 15,
        // elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    iconContainer: { padding: 8, borderRadius: 8 },
    cardTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#212529",
        marginBottom: 4,
    },
    cardDesc: { fontSize: 11, color: "#868e96", lineHeight: 15 },
    // Stat Card Styles
    statCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        width: 160,
        marginRight: 15,
        borderWidth: 1,
        borderColor: "#f1f3f5",
        elevation: 1,
    },
    statHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    iconBox: { padding: 10, borderRadius: 12 },
    badge: {
        backgroundColor: "#ebfbee",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        alignSelf: "center",
    },
    badgeText: { color: "#2b8a3e", fontSize: 10, fontWeight: "bold" },
    statLabel: { fontSize: 13, color: "#868e96", marginBottom: 4 },
    statValue: { fontSize: 18, fontWeight: "800", color: "#212529" },
});

export default MarketingDashboardOverview;
