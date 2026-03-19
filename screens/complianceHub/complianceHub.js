import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { __generateRandomString } from "../../utils/funtion";
import { TouchableOpacity } from "react-native";
import { __makeGetBlogGetRequest } from "../../utils/api";
import { useState } from "react";
import { ScrollView } from "react-native";
import SetupBanner from "../../components/complianceHub/SetupBanner";
import DashboardGrid from "../../components/complianceHub/DashboardGrid";
import ConfigurationWorkflow from "../../components/complianceHub/ConfigurationWorkflow";
const { width } = Dimensions.get("window");
const PRODUCT_MENU = [
    {
        title: "Jurisdictions",
        icon: "location-on",
        screen: "TaxJurisdiction",
    },
    {
        title: "Document Master",
        icon: "description",
        screen: "DocumentMaster",
    },
    {
        title: "Category Conditions",
        icon: "local-offer",
        screen: "CategoryConditions",
    },
    {
        title: "Seller Requirement",
        icon: "person-outline",
        screen: "SellerRequirement",
    },
    {
        title: "Buyer Requirement",
        icon: "people-outline",
        screen: "BuyerRequirement",
    },
    {
        title: "Brand Requirement",
        icon: "verified",
        screen: "BrandRequirement",
    },
    {
        title: "Marketplace Policies",
        icon: "menu-book",
        screen: "MarketplacePolicies",
    },
    {
        title: "Compliance SETS",
        icon: "layers",
        screen: "ComplianceSets",
    },
    {
        title: "Risk Monitoring",
        icon: "warning-amber",
        screen: "RiskMonitoring",
    },
    {
        title: "Reports",
        icon: "bar-chart",
        screen: "ReportsCompliance",
    },
    {
        title: "Audit Logs",
        icon: "assignment",
        screen: "AuditLogsCompliance",
    },
];

const ComplianceHub = ({ navigation }) => {
    // const [state, setState] = useState({
    //     loading: false,
    // });

    // const updateState = (data) => setState((state) => ({ ...state, ...data }));

    // const { loading, active } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView contentContainerStyle={styles.container}>
                    <SetupBanner />
                    <DashboardGrid />
                    <ConfigurationWorkflow navigation={navigation} />
                    {/* <View style={styles.grid}>
                        {PRODUCT_MENU.map((item) => (
                            <TouchableOpacity
                                key={__generateRandomString(8)}
                                activeOpacity={0.8}
                                style={styles.card}
                                onPress={() => navigation.navigate(item.screen)}
                            >
                                <MaterialIcons
                                    name={item.icon}
                                    size={28}
                                    color={Colors.primaryColor}
                                />
                                <Text style={styles.cardText}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View> */}
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
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.blackColor18Bold,
                        flex: 1,
                    }}
                >
                    Compliance Hub
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        elevation: 2.0,
    },

    container: {
        padding: Sizes.fixPadding,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    card: {
        width: width / 2 - Sizes.fixPadding * 1.5,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding * 2,
        paddingHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        alignItems: "center",
        elevation: 2,
        borderWidth: 1,
        borderColor: Colors.borderColor,
    },

    cardText: {
        marginTop: Sizes.fixPadding,
        textAlign: "center",
        ...Fonts.blackColor14Medium,
    },
});

export default ComplianceHub;
