// import { MaterialIcons } from "@expo/vector-icons";
// import { useState } from "react";
// import {
//     FlatList,
//     Image,
//     SafeAreaView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     View,
// } from "react-native";
// import { Colors, Fonts, Sizes } from "../../constants/styles";

// import {
//     __generateRandomString,
//     __getRendomColor,
//     __splitProductAndVarianat,
// } from "../../utils/funtion";
// import { __makeProductsGetRequest } from "../../utils/api";
// import OverviewFilterCard from "../../components/home/OverviewFilterCard";
// import SalesData from "../../components/home/SalesData";
// import HomeFooter from "../../components/home/HomeFooter";
// import ShippingData from "../../components/home/ShippingData";
// import ReportsData from "../../components/home/ReportsData";
// import CustomersData from "../../components/home/CustomersData";

// const HomeScreen = ({ navigation, route }) => {
//     // const backAction = () => {
//     //     backClickCount == 1 ? BackHandler.exitApp() : _spring();
//     //     return true;
//     // };

//     // useFocusEffect(
//     //     useCallback(() => {
//     //         BackHandler.addEventListener("hardwareBackPress", backAction);
//     //         return () =>
//     //             BackHandler.removeEventListener(
//     //                 "hardwareBackPress",
//     //                 backAction
//     //             );
//     //     }, [backAction])
//     // );

//     function _spring() {
//         setBackClickCount(1);
//         setTimeout(() => {
//             setBackClickCount(0);
//         }, 1000);
//     }

//     const [backClickCount, setBackClickCount] = useState(0);
//     const [activeIndex, setActiveIndex] = useState(0);

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
//             <StatusBar
//                 translucent={false}
//                 backgroundColor={Colors.primaryColor}
//             />
//             <View style={{ flex: 1 }}>
//                 {header()}
//                 <FlatList
//                     ListHeaderComponent={
//                         <>
//                             <OverviewFilterCard
//                                 activeIndex={activeIndex}
//                                 onChangeIndex={setActiveIndex}
//                             />

//                             {activeIndex == 0 && <SalesData />}
//                             {activeIndex == 1 && <ShippingData />}
//                             {activeIndex == 2 && <CustomersData />}
//                             {activeIndex == 3 && <ReportsData />}
//                         </>
//                     }
//                     contentContainerStyle={{
//                         paddingBottom: Sizes.fixPadding * 5.0,
//                     }}
//                     showsVerticalScrollIndicator={false}
//                 />
//                 <HomeFooter
//                     activeIndex={activeIndex}
//                     onChangeIndex={setActiveIndex}
//                 />
//             </View>
//             {backClickCount == 1 ? (
//                 <View style={[styles.animatedView]}>
//                     <Text style={{ ...Fonts.whiteColor14SemiBold }}>
//                         Press Back Once Again to Exit
//                     </Text>
//                 </View>
//             ) : null}
//         </SafeAreaView>
//     );

//     function header() {
//         return (
//             <View style={styles.headerWrapStyle}>
//                 <View
//                     style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                         flex: 1.5,
//                     }}
//                 >
//                     <MaterialIcons
//                         name="menu"
//                         size={25}
//                         color="black"
//                         style={{ marginRight: Sizes.fixPadding * 2.0 }}
//                         onPress={() => navigation.openDrawer()}
//                     />
//                     <Image
//                         source={require("../../assets/images/baofeng_radios.png")}
//                         style={{ width: 120.0, height: 30.0 }}
//                         resizeMode="contain"
//                     />
//                 </View>
//             </View>
//         );
//     }
// };

// const styles = StyleSheet.create({
//     headerWrapStyle: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingLeft: Sizes.fixPadding * 2.0,
//         paddingRight: Sizes.fixPadding + 1.0,
//         backgroundColor: Colors.whiteColor,
//         paddingVertical: Sizes.fixPadding + 5.0,
//         elevation: 2.0,
//     },

//     animatedView: {
//         backgroundColor: "#333333",
//         position: "absolute",
//         bottom: 40,
//         alignSelf: "center",
//         borderRadius: Sizes.fixPadding - 5.0,
//         paddingHorizontal: Sizes.fixPadding + 5.0,
//         paddingVertical: Sizes.fixPadding,
//         justifyContent: "center",
//         alignItems: "center",
//     },
// });

// export default HomeScreen;
import {
    MaterialIcons,
    MaterialCommunityIcons,
    FontAwesome,
} from "@expo/vector-icons";
import { useState, useCallback } from "react";
import {
    BackHandler,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import OverviewFilterCard from "../../components/home/OverviewFilterCard";
import SalesData from "../../components/home/SalesData";
import ShippingData from "../../components/home/ShippingData";
import ReportsData from "../../components/home/ReportsData";
import CustomersData from "../../components/home/CustomersData";

// ─── Quick Shortcuts (from real drawer menu) ──────────────────────────────────
const SHORTCUTS = [
    {
        id: "orders",
        label: "Orders",
        icon: "list-alt",
        lib: "MaterialIcons",
        color: "#3B82F6",
        bg: "#EFF6FF",
        route: "OrdersManagement",
    },
    {
        id: "products",
        label: "Products",
        icon: "inventory",
        lib: "MaterialIcons",
        color: "#10B981",
        bg: "#ECFDF5",
        route: "ProductManagement",
    },
    {
        id: "inventory",
        label: "Inventory",
        icon: "cube-outline",
        lib: "MaterialCommunityIcons",
        color: "#F59E0B",
        bg: "#FFFBEB",
        route: "InventoryMaster",
    },
    {
        id: "shipping",
        label: "Shipping",
        icon: "truck-delivery-outline",
        lib: "MaterialCommunityIcons",
        color: "#06B6D4",
        bg: "#ECFEFF",
        route: "ShippingHub",
    },
    {
        id: "payments",
        label: "Payments",
        icon: "cash-multiple",
        lib: "MaterialCommunityIcons",
        color: "#8B5CF6",
        bg: "#F5F3FF",
        route: "Payment",
    },
    {
        id: "marketing",
        label: "Marketing",
        icon: "campaign",
        lib: "MaterialIcons",
        color: "#EC4899",
        bg: "#FDF2F8",
        route: "MarketinDashboard",
    },
    {
        id: "reports",
        label: "Reports",
        icon: "bar-chart",
        lib: "MaterialIcons",
        color: "#0EA5E9",
        bg: "#F0F9FF",
        route: "Reports",
    },
    {
        id: "production",
        label: "Production",
        icon: "precision-manufacturing",
        lib: "MaterialIcons",
        color: "#EF4444",
        bg: "#FEF2F2",
        route: "Production",
    },
    {
        id: "tax",
        label: "Tax",
        icon: "receipt-long",
        lib: "MaterialIcons",
        color: "#64748B",
        bg: "#F8FAFC",
        route: "TaxManagment",
    },
    {
        id: "approvals",
        label: "Approvals",
        icon: "check-circle-outline",
        lib: "MaterialIcons",
        color: "#16A34A",
        bg: "#F0FDF4",
        route: "Approvals",
    },
    {
        id: "tasks",
        label: "Tasks",
        icon: "task-alt",
        lib: "MaterialIcons",
        color: "#D97706",
        bg: "#FFFBEB",
        route: "TaskDashboard",
    },
    {
        id: "bi",
        label: "Analytics",
        icon: "insights",
        lib: "MaterialIcons",
        color: "#7C3AED",
        bg: "#F5F3FF",
        route: "BusinessIntelligence",
    },
];

// ─── Stat Summary Cards (replace values with real API data) ──────────────────
const STATS = [
    {
        label: "Today's Orders",
        value: "128",
        change: "+12%",
        up: true,
        icon: "list-alt",
    },
    {
        label: "Revenue",
        value: "₹84.2K",
        change: "+8.4%",
        up: true,
        icon: "trending-up",
    },
    {
        label: "Pending",
        value: "23",
        change: "-3",
        up: false,
        icon: "pending-actions",
    },
    {
        label: "Customers",
        value: "1.4K",
        change: "+5%",
        up: true,
        icon: "people-alt",
    },
];

// ─── Recent Activity (replace with real API data) ─────────────────────────────
const RECENT = [
    {
        id: "1",
        label: "New order #10234 placed",
        time: "2 min ago",
        color: "#3B82F6",
    },
    {
        id: "2",
        label: "Payment received ₹4,200",
        time: "14 min ago",
        color: "#10B981",
    },
    {
        id: "3",
        label: "Low stock alert: SKU-009",
        time: "1 hr ago",
        color: "#F59E0B",
    },
    {
        id: "4",
        label: "Return request #R-441 opened",
        time: "3 hr ago",
        color: "#EF4444",
    },
];

const HomeScreen = ({ navigation }) => {
    const [backClickCount, setBackClickCount] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    // const backAction = useCallback(() => {
    //     if (backClickCount === 1) {
    //         BackHandler.exitApp();
    //     } else {
    //         setBackClickCount(1);
    //         setTimeout(() => setBackClickCount(0), 1000);
    //     }
    //     return true;
    // }, [backClickCount]);

    // useFocusEffect(
    //     useCallback(() => {
    //         BackHandler.addEventListener("hardwareBackPress", backAction);
    //         return () =>
    //             BackHandler.removeEventListener(
    //                 "hardwareBackPress",
    //                 backAction,
    //             );
    //     }, [backAction]),
    // );

    // ── Icon renderer (supports both libs) ────────────────────────────────
    const renderIcon = (item, size = 22) => {
        if (item.lib === "MaterialCommunityIcons") {
            return (
                <MaterialCommunityIcons
                    name={item.icon}
                    size={size}
                    color={item.color}
                />
            );
        }
        return (
            <MaterialIcons name={item.icon} size={size} color={item.color} />
        );
    };

    // ── Shortcut card ──────────────────────────────────────────────────────
    const renderShortcut = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.push(item.route)}
            style={[styles.shortcutCard, { backgroundColor: item.bg }]}
        >
            <View
                style={[
                    styles.shortcutIconWrap,
                    { backgroundColor: item.color + "22" },
                ]}
            >
                {renderIcon(item, 20)}
            </View>
            <Text
                style={[styles.shortcutLabel, { color: item.color }]}
                numberOfLines={1}
            >
                {item.label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F1F5F9" }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />

            <View style={{ flex: 1 }}>
                {header()}

                <FlatList
                    data={[]}
                    keyExtractor={() => "main"}
                    renderItem={null}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 6.0,
                    }}
                    ListHeaderComponent={
                        <>
                            {statStrip()}
                            {quickShortcuts()}
                            {recentActivity()}
                            {/* {dashboardSection()} */}
                        </>
                    }
                />
            </View>

            {backClickCount === 1 && (
                <View style={styles.toast}>
                    <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                        Press Back Once Again to Exit
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );

    // ── Header ───────────────────────────────────────────────────────────
    function header() {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={styles.headerBtn}
                >
                    <MaterialIcons name="menu" size={24} color="#fff" />
                </TouchableOpacity>

                <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.headerSub}>Welcome back 👋</Text>
                    <Text style={styles.headerTitle}>Dashboard</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity
                        style={styles.headerBtn}
                        // onPress={() => navigation.push("TaskDashboard")}
                    >
                        <FontAwesome
                            name="user-circle"
                            size={21}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={styles.headerBtn}
                        // onPress={() => navigation.push("TaskDashboard")}
                    >
                        <MaterialIcons name="task-alt" size={21} color="#fff" />
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity
                        style={styles.headerBtn}
                        onPress={() => navigation.push("Notifications")}
                    >
                        <MaterialIcons
                            name="notifications-none"
                            size={21}
                            color="#fff"
                        />
                    </TouchableOpacity> */}
                </View>
            </View>
        );
    }

    // ── Stat Strip ───────────────────────────────────────────────────────
    function statStrip() {
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.statScroll}
            >
                {STATS.map((s, i) => (
                    <View key={i} style={styles.statCard}>
                        <View style={styles.statIconWrap}>
                            <MaterialIcons
                                name={s.icon}
                                size={17}
                                color={Colors.primaryColor}
                            />
                        </View>
                        <Text style={styles.statValue}>{s.value}</Text>
                        <Text style={styles.statLabel}>{s.label}</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 2,
                                marginTop: 4,
                            }}
                        >
                            <MaterialIcons
                                name={s.up ? "arrow-upward" : "arrow-downward"}
                                size={10}
                                color={s.up ? "#10B981" : "#EF4444"}
                            />
                            <Text
                                style={[
                                    styles.statChange,
                                    { color: s.up ? "#10B981" : "#EF4444" },
                                ]}
                            >
                                {s.change}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        );
    }

    // ── Quick Shortcuts ──────────────────────────────────────────────────
    function quickShortcuts() {
        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Quick Access</Text>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Text
                            style={[
                                styles.cardSeeAll,
                                { color: Colors.primaryColor },
                            ]}
                        >
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={SHORTCUTS}
                    keyExtractor={(item) => item.id}
                    numColumns={4}
                    scrollEnabled={false}
                    renderItem={renderShortcut}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginBottom: 10,
                    }}
                />
            </View>
        );
    }

    // ── Recent Activity ──────────────────────────────────────────────────
    function recentActivity() {
        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Recent Activity</Text>
                    <TouchableOpacity
                    // onPress={() => navigation.push("Notifications")}
                    >
                        <Text
                            style={[
                                styles.cardSeeAll,
                                { color: Colors.primaryColor },
                            ]}
                        >
                            View All
                        </Text>
                    </TouchableOpacity>
                </View>
                {RECENT.map((item) => (
                    <View key={item.id} style={styles.activityRow}>
                        <View
                            style={[
                                styles.activityDot,
                                { backgroundColor: item.color },
                            ]}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.activityText}>
                                {item.label}
                            </Text>
                        </View>
                        <Text style={styles.activityTime}>{item.time}</Text>
                    </View>
                ))}
            </View>
        );
    }

    // ── Dashboard Tabs Section ───────────────────────────────────────────
    function dashboardSection() {
        return (
            <View
                style={[
                    styles.card,
                    { paddingHorizontal: 0, paddingBottom: 0 },
                ]}
            >
                <Text
                    style={[
                        styles.cardTitle,
                        { paddingHorizontal: 16, paddingBottom: 8 },
                    ]}
                >
                    Overview
                </Text>
                <OverviewFilterCard
                    activeIndex={activeIndex}
                    onChangeIndex={setActiveIndex}
                />
                <View style={{ paddingBottom: 16 }}>
                    {activeIndex === 0 && <SalesData />}
                    {activeIndex === 1 && <ShippingData />}
                    {activeIndex === 2 && <CustomersData />}
                    {activeIndex === 3 && <ReportsData />}
                </View>
            </View>
        );
    }
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 4,
        backgroundColor: Colors.primaryColor,
        elevation: 5,
        shadowColor: Colors.primaryColor,
        shadowOpacity: 0.35,
        shadowRadius: 8,
    },
    headerBtn: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    headerSub: {
        fontSize: 11,
        color: "rgba(255,255,255,0.75)",
        fontWeight: "400",
    },
    headerTitle: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "700",
        letterSpacing: 0.3,
    },

    // Stat
    statScroll: {
        paddingHorizontal: Sizes.fixPadding * 1.0,
        paddingTop: 14,
        paddingBottom: 6,
        gap: 10,
    },
    statCard: {
        width: 128,
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    statIconWrap: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: Colors.primaryColor + "18",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    statValue: { fontSize: 20, fontWeight: "700", color: "#1E293B" },
    statLabel: {
        fontSize: 10,
        color: "#94A3B8",
        fontWeight: "500",
        marginTop: 2,
    },
    statChange: { fontSize: 10, fontWeight: "700" },

    // Card
    card: {
        backgroundColor: "#fff",
        marginHorizontal: Sizes.fixPadding * 1.0,
        marginTop: 12,
        borderRadius: 16,
        padding: 16,
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },
    cardTitle: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
    cardSeeAll: { fontSize: 12, fontWeight: "600" },

    // Shortcuts
    shortcutCard: {
        flex: 1,
        alignItems: "center",
        borderRadius: 12,
        paddingVertical: 11,
        marginHorizontal: 3,
    },
    shortcutIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
    },
    shortcutLabel: {
        fontSize: 9.5,
        fontWeight: "700",
        textAlign: "center",
    },

    // Activity
    activityRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 9,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
        gap: 10,
    },
    activityDot: {
        width: 9,
        height: 9,
        borderRadius: 5,
    },
    activityText: { fontSize: 12, color: "#334155", fontWeight: "500" },
    activityTime: { fontSize: 10, color: "#94A3B8", fontWeight: "500" },

    // Toast
    toast: {
        backgroundColor: "#333",
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomeScreen;
