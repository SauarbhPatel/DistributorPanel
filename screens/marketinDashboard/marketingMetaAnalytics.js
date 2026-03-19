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
import ProductTableHeader from "../../components/marketing/ProductTableHeader";
import DemoModeBanner from "../../components/marketing/DemoModeBanner";
import MetaAnalyticsTabs from "../../components/marketing/MetaAnalyticsTabs";
import MetaAnalyticsStats from "../../components/marketing/MetaAnalyticsStats";
import FunnelAnalytics from "../../components/marketing/FunnelAnalytics";
import TopProductsByROAS from "../../components/marketing/TopProductsByROAS";
import CampaignsDashboardList from "../../components/marketing/CampaignsDashboardList";
import ProductPerformanceList from "../../components/marketing/ProductPerformanceList";
import ProductTitleHeader from "../../components/marketing/ProductTitleHeader";
import InsightStatsList from "../../components/marketing/InsightStatsList";
import FunnelDashboardStats from "../../components/marketing/FunnelDashboardStats";
import ConversionFunnel from "../../components/marketing/ConversionFunnel";
import DeviceBreakdown from "../../components/marketing/DeviceBreakdown";
import UserTypeBreakdown from "../../components/marketing/UserTypeBreakdown";
import VerticalActionButtons from "../../components/marketing/FunnelActionButtons";
import PixelStatus from "../../components/marketing/PixelStatus";
import CapiDeduplication from "../../components/marketing/CapiDeduplication";
import AttributionConfiguration from "../../components/marketing/AttributionConfiguration";
import CustomReports from "../../components/marketing/CustomReports";
import ExportOptions from "../../components/marketing/ExportOptions";
import ScheduledExports from "../../components/marketing/ScheduledExports";

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
                                />
                            </View>
                        </>
                    )}
                    {activeTab == "funnel" && (
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
                                    title={`Funnel Analytics`}
                                    subTitle={`ViewContent → AddToCart → InitiateCheckout → Purchase. Breakdowns: device, zone, category, new vs returning.`}
                                />
                                <FunnelDashboardStats />
                                <ConversionFunnel />
                                <DeviceBreakdown />
                                <UserTypeBreakdown />
                                <VerticalActionButtons />
                                <DemoModeBanner
                                    title="Pro Tip: Optimize Your Funnel"
                                    subTitle="The biggest drop-off is from ViewContent to AddToCart (83.1%). Focus on improving product pages, pricing clarity, and trust signals to increase add-to-cart rates."
                                    buttonName="Learn more"
                                    icon={
                                        <Ionicons
                                            name="sparkles-outline"
                                            size={24}
                                            color="white"
                                        />
                                    }
                                    isShowLearnMore={false}
                                    colors={["#FF6900", "#FB2C36", "#F6339A"]}
                                />
                            </View>
                        </>
                    )}
                    {activeTab == "attribution_events" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    headerIcon={
                                        <Ionicons
                                            name="pulse"
                                            size={24}
                                            color="white"
                                        />
                                    }
                                    title={`Attribution & Events Quality`}
                                    subTitle={`Attribution windows, event health, and CAPI web parameters.`}
                                />
                                <PixelStatus />
                                <CapiDeduplication />
                                <AttributionConfiguration />
                            </View>
                        </>
                    )}
                    {activeTab == "cohorts" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    headerIcon={
                                        <Ionicons
                                            name="pulse"
                                            size={24}
                                            color="white"
                                        />
                                    }
                                    title={`Cohorts`}
                                    subTitle={`New vs returning buyers (demo).`}
                                />
                                <PixelStatus />
                                <CapiDeduplication />
                                <AttributionConfiguration />
                            </View>
                        </>
                    )}
                    {activeTab == "reports_builder" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    headerIcon={
                                        <Ionicons
                                            name="pulse"
                                            size={24}
                                            color="white"
                                        />
                                    }
                                    title={`Reports Builder`}
                                    subTitle={`Select dimensions (campaign, adset, ad, SKU, category, brand), metrics (spend, purchases, ROAS), filters and grouping.`}
                                />
                                <CustomReports />
                            </View>
                        </>
                    )}
                    {activeTab == "exports" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    headerIcon={
                                        <Ionicons
                                            name="pulse"
                                            size={24}
                                            color="white"
                                        />
                                    }
                                    title={`Reports Builder`}
                                    subTitle={`Select dimensions (campaign, adset, ad, SKU, category, brand), metrics (spend, purchases, ROAS), filters and grouping.`}
                                />
                                <ExportOptions />
                                <ScheduledExports />
                                <DemoModeBanner
                                    title="Pro Tip: Automate Your Reporting"
                                    subTitle="Set up scheduled exports to receive automated reports in your inbox. With template versioning, you can track changes over time and ensure consistent reporting across your team."
                                    buttonName="Learn more"
                                    icon={
                                        <Ionicons
                                            name="sparkles-outline"
                                            size={24}
                                            color="white"
                                        />
                                    }
                                    isShowLearnMore={false}
                                    colors={["#2B7FFF", "#00B8DB", "#00BBA7"]}
                                />
                            </View>
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
