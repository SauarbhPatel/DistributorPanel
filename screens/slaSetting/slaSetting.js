import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SlaAdminConfigCards from "../../components/slaSettings/SlaAdminConfigCards";
import SlaSellerPanelCards from "../../components/slaSettings/SlaSellerPanelCards";
import SlaEngineInfoCard from "../../components/slaSettings/SlaEngineInfoCard";

const { width } = Dimensions.get("window");

const SlaSetting = ({ navigation }) => {
    const stats = [
        {
            title: "SLA POLICIES",
            value: "3",
            colors: ["#4c6ef5", "#5f9cff"],
            icon: <Feather name="users" size={22} color="#fff" />,
        },
        {
            title: "ACTIVE POLICIES",
            value: "9",
            colors: ["#7b4dff", "#b388ff"],
            icon: <Feather name="send" size={22} color="#fff" />,
        },
        {
            title: "ORDERS AT RISK",
            value: "12",
            colors: ["#ff7a18", "#ffb347"],
            icon: <Feather name="credit-card" size={22} color="#fff" />,
        },
        {
            title: "BREACHED ORDERS",
            value: "93",
            colors: ["#2F9E44", "#51CF66"],
            icon: <Feather name="shopping-cart" size={22} color="#fff" />,
        },
        {
            title: "OPEN BREACH RECORDS",
            value: "32",
            colors: ["#e91e63", "#ff6b9a"],
            icon: <Feather name="trending-up" size={22} color="#fff" />,
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                {header()}

                <ScrollView contentContainerStyle={styles.container}>
                    {bannerCard()}

                    {snapshotSection()}

                    <View style={styles.gridWrap}>
                        {stats.map((item, index) => statCard(item, index))}
                    </View>
                    <SlaAdminConfigCards navigation={navigation} />
                    <SlaSellerPanelCards />
                    <SlaEngineInfoCard />
                </ScrollView>
            </View>
        </SafeAreaView>
    );

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.blackColor}
                    size={25}
                    onPress={() => navigation.pop()}
                />
                <Text
                    style={{
                        marginLeft: Sizes.fixPadding + 5,
                        ...Fonts.blackColor18Bold,
                        flex: 1,
                    }}
                >
                    SLA Settings
                </Text>
            </View>
        );
    }

    function bannerCard() {
        return (
            <LinearGradient
                colors={["#3f51b5", "#4da3ff"]}
                style={styles.bannerCard}
            >
                {/* Background Circles */}
                <View style={styles.bannerCircle1} />
                <View style={styles.bannerCircle2} />

                <Text style={styles.bannerTitle}>SLA Settings</Text>

                <Text style={styles.bannerDesc}>
                    Manage and create Google & YouTube ads. Follow the setup
                    flow: Workspace → App Setup → Configure → Product Catalog
                    Sync → Campaigns.
                </Text>

                <View style={styles.bannerInner}>
                    <Text style={styles.bannerInnerText}>
                        Create a Marketing Workspace first in App Setup to
                        unlock connections and campaigns.
                    </Text>

                    <TouchableOpacity style={styles.setupBtn}>
                        <Text style={styles.setupText}>Go to App Setup</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }

    function snapshotSection() {
        return (
            <View style={styles.snapshotWrap}>
                <View style={styles.snapshotIconBox}>
                    <Feather name="users" size={18} color="#5B6BFF" />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.snapshotTitle}>
                        Seller Ads Snapshot
                    </Text>

                    <Text style={styles.snapshotText}>
                        Marketplace summary: sellers running ads, active
                        campaigns, spend, orders, revenue (demo · updates with
                        selection).
                    </Text>
                </View>
            </View>
        );
    }

    function statCard(item, index) {
        return (
            <LinearGradient
                key={index}
                colors={item.colors}
                style={styles.statCard}
            >
                {/* background circles */}
                <View style={styles.circle1} />
                {/* <View style={styles.circle2} /> */}

                {/* icon */}
                <View style={styles.iconWrap}>{item.icon}</View>

                <Text style={styles.statTitle}>{item.title}</Text>

                <Text style={styles.statValue}>{item.value}</Text>
            </LinearGradient>
        );
    }
};

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5,
        paddingHorizontal: Sizes.fixPadding + 5,
        elevation: 2,
    },

    container: {
        padding: Sizes.fixPadding,
    },

    bannerCard: {
        borderRadius: 16,
        padding: Sizes.fixPadding * 2,
    },

    bannerTitle: {
        ...Fonts.whiteColor15Bold,
        marginBottom: 8,
        fontSize: 18,
    },

    bannerDesc: {
        ...Fonts.whiteColor12Medium,
        lineHeight: 20,
        opacity: 0.9,
    },

    bannerInner: {
        marginTop: Sizes.fixPadding * 2,
        backgroundColor: "rgba(255,255,255,0.15)",
        padding: Sizes.fixPadding,
        borderRadius: 10,
    },

    bannerInnerText: {
        ...Fonts.whiteColor12Medium,
        marginBottom: Sizes.fixPadding,
    },

    setupBtn: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 6,
    },

    setupText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#3f51b5",
    },

    snapshotWrap: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: Sizes.fixPadding * 2,
    },

    snapshotIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#EEF2FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    snapshotTitle: {
        ...Fonts.blackColor16Bold,
    },

    snapshotText: {
        ...Fonts.greenColor12Medium,
        marginTop: 4,
        color: "#9196AB",
        lineHeight: 17,
    },

    gridWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: Sizes.fixPadding * 2,
    },

    statCard: {
        width: (width - 40) / 2,
        borderRadius: 14,
        padding: Sizes.fixPadding * 1.5,
        marginBottom: Sizes.fixPadding,
        overflow: "hidden",
    },

    statTitle: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
        letterSpacing: 0.5,
        opacity: 0.9,
    },

    statValue: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 10,
    },
    bannerCircle1: {
        position: "absolute",
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "rgba(255,255,255,0.15)",
        top: -30,
        right: -30,
    },

    bannerCircle2: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(255,255,255,0.12)",
        bottom: -20,
        right: 40,
    },

    circle1: {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "rgba(255,255,255,0.15)",
        top: -30,
        right: -20,
    },

    circle2: {
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "rgba(255,255,255,0.12)",
        bottom: -10,
        right: 20,
    },

    iconWrap: {
        position: "absolute",
        right: 15,
        bottom: 15,
        opacity: 0.3,
    },
});

export default SlaSetting;
