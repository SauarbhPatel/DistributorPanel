import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
    MaterialIcons,
    Feather,
    Ionicons,
    MaterialCommunityIcons,
    Entypo,
    AntDesign,
    FontAwesome,
} from "@expo/vector-icons";
import CommonHeader from "../../components/common/CommonHeader";
import GoogleHeader from "../../components/marketing/GoogleHeader";
import { useState } from "react";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import MetaTabs from "../../components/marketing/MetaTabs";
import MetaOverview from "../../components/marketing/MetaOverview";
import NextStepsComponent from "../../components/marketing/NextStepsComponent";
import RecentActivity from "../../components/marketing/RecentActivity";
import PerformanceSummary from "../../components/marketing/PerformanceSummary";
import MetaQuickActions from "../../components/marketing/MetaQuickActions";
import WorkspaceDetails from "../../components/marketing/WorkspaceDetails";
import DomainVerification from "../../components/marketing/DomainVerification";
import MetaPixelCard from "../../components/marketing/MetaPixelCard";
import ProductCatalog from "../../components/marketing/ProductCatalog";
import ProductTableHeader from "../../components/marketing/ProductTableHeader";
import ProductList from "../../components/marketing/ProductList";
import ConversionSetupCard from "../../components/marketing/ConversionSetupCard";
import MetaPixelDashboard from "../../components/marketing/MetaPixelDashboard";
import ConversionsAPI from "../../components/marketing/ConversionsAPI";
import StandardEventsMapping from "../../components/marketing/StandardEventsMapping";
import AllAudiences from "../../components/marketing/AllAudiences";
import DemoModeBanner from "../../components/marketing/DemoModeBanner";
import ProductSelectionBanner from "../../components/marketing/ProductSelectionBanner";
import DashboardStats from "../../components/marketing/CampaignsDashboardStats";
import CampaignDashboard from "../../components/marketing/CampaignDashboard";
import CreativesLibrary from "../../components/marketing/CreativesLibrary";
import RulesAndAutomation from "../../components/marketing/RulesAndAutomation";
import BillingDashboard from "../../components/marketing/BillingDashboard";
import ActivityDashboard from "../../components/marketing/ActivityDashboard";
import MetaAnalyticsTabs from "../../components/marketing/MetaAnalyticsTabs";
import MetaAnalyticsStats from "../../components/marketing/MetaAnalyticsStats";
import FunnelAnalytics from "../../components/marketing/FunnelAnalytics";
import TopProductsByROAS from "../../components/marketing/TopProductsByROAS";
import CampaignsDashboardList from "../../components/marketing/CampaignsDashboardList";
import ProductPerformanceList from "../../components/marketing/ProductPerformanceList";
import ProductTitleHeader from "../../components/marketing/ProductTitleHeader";
import InsightStatsList from "../../components/marketing/InsightStatsList";

const { width } = Dimensions.get("window");

const MarketingMetaAnalytics = ({ navigation }) => {
    const [state, setState] = useState({
        activeTab: "overview",
        campaignsTab: "list",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { activeTab, campaignsTab } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"Meta Analytics"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <GoogleHeader
                        title="Meta Analytics"
                        subTitle="Real-time data (demo) · Marketplace Admin"
                        icon={
                            <MaterialCommunityIcons
                                name="domino-mask"
                                size={30}
                                color="white"
                            />
                        }
                    />
                    <MetaAnalyticsTabs
                        activeTab={activeTab}
                        setActiveTab={(tab) => updateState({ activeTab: tab })}
                    />

                    {activeTab == "overview" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    headerIcon={
                                        <FontAwesome
                                            name="bar-chart-o"
                                            size={24}
                                            color="white"
                                        />
                                    }
                                    title={"Meta Analytics"}
                                    subTitle={`Performance by campaign, product, funnel, and attribution (demo).\nMeta Ads + Store Outcomes`}
                                    linkName="Open Meta Marketing"
                                />

                                <MetaAnalyticsStats />
                                <FunnelAnalytics />
                                <TopProductsByROAS />
                                <DemoModeBanner
                                    title="Pro Tip: Attribution Analysis"
                                    subTitle="Track your funnel conversion rates to identify drop-off points. Focus on optimizing stages with the highest abandonment for better ROAS."
                                    buttonName="Learn more"
                                    icon={
                                        <Ionicons
                                            name="sparkles-outline"
                                            size={24}
                                            color="white"
                                        />
                                    }
                                    isShowLearnMore={false}
                                    colors={["#00BC7D", "#00BBA7", "#00B8DB"]}
                                />
                            </View>
                        </>
                    )}
                    {activeTab == "performance" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    headerIcon={
                                        <FontAwesome
                                            name="bar-chart-o"
                                            size={24}
                                            color="white"
                                        />
                                    }
                                    title={`Performance by Campaign\n/ Ad Set / Ad`}
                                    subTitle={`Campaign-level metrics (demo). Filter by date, placement, seller.`}
                                />
                                <View style={{ height: 16 }} />

                                <ProductTableHeader hideTitle hideSubTitle />
                                <CampaignsDashboardList />
                            </View>
                        </>
                    )}
                    {activeTab == "product_performance" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <ProductTableHeader hideTitle hideSubTitle />
                                <ProductTitleHeader />
                                <ProductPerformanceList />
                                <InsightStatsList />
                                <DemoModeBanner
                                    title="Pro Tip: Product Optimization"
                                    subTitle="Focus your ad spend on products with ROAS above 15.0. Consider pausing or optimizing products with ROAS below 10.0 to maximize overall campaign performance."
                                    buttonName="Learn more"
                                    icon={
                                        <Ionicons
                                            name="sparkles-outline"
                                            size={24}
                                            color="white"
                                        />
                                    }
                                    isShowLearnMore={false}
                                    // colors={["#00BC7D", "#00BBA7", "#00B8DB"]}
                                />
                            </View>
                        </>
                    )}
                    {activeTab == "funnel" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}></View>
                        </>
                    )}
                    {activeTab == "attribution_events" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}></View>
                        </>
                    )}
                    {activeTab == "cohorts" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}></View>
                        </>
                    )}
                    {activeTab == "reports_builder" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}></View>
                        </>
                    )}
                    {activeTab == "exports" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}></View>
                        </>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // paddingVertical: Sizes.fixPadding,
        paddingBottom: 50,
    },
});

export default MarketingMetaAnalytics;
