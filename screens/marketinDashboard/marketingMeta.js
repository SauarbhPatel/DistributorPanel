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

const { width } = Dimensions.get("window");

const MarketingMeta = ({ navigation }) => {
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
                <CommonHeader title={"Meta insta"} navigation={navigation} />

                <ScrollView contentContainerStyle={styles.container}>
                    <GoogleHeader
                        title="Meta Marketing"
                        subTitle="Real-time data (demo) · Marketplace Admin"
                        icon={
                            <MaterialCommunityIcons
                                name="domino-mask"
                                size={30}
                                color="white"
                            />
                        }
                    />
                    <MetaTabs
                        activeTab={activeTab}
                        setActiveTab={(tab) => updateState({ activeTab: tab })}
                    />

                    {activeTab == "overview" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    headerIcon={
                                        <MaterialCommunityIcons
                                            name="domino-mask"
                                            size={24}
                                            color="white"
                                        />
                                    }
                                    title={"Baofeng Meta Workspace"}
                                    subTitle="Ad account: act_987654321  •  INR  •  Asia/Kolkata"
                                    linkName="Open Meta Analytics"
                                />
                                <MetaOverview />
                                <NextStepsComponent />
                                <RecentActivity />
                                <PerformanceSummary />
                                <MetaQuickActions />
                            </View>
                        </>
                    )}
                    {activeTab == "connections" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <WorkspaceDetails />
                                <DomainVerification />
                                <MetaPixelCard />
                                <ProductCatalog />
                            </View>
                        </>
                    )}
                    {activeTab == "sync" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    headerIcon={
                                        <Ionicons
                                            name="settings-outline"
                                            size={24}
                                            color="white"
                                        />
                                    }
                                    title={"Baofeng Product Catalog"}
                                    subTitle="5 products from My Listings · Last sync: Never"
                                    syncButton={true}
                                    feedButton={true}
                                    reportButton={true}
                                />
                                <View style={{ height: 16 }} />
                                <ProductTableHeader
                                    title="Feed field mapping (demo)"
                                    subTitle="Your product model → Meta required fields. Products from My Listings."
                                />
                                <ProductList />
                                <ConversionSetupCard
                                    title="Feed generation modes"
                                    subTitle="Demo supports: Scheduled feed URL (hosted CSV/XML), Manual upload. In production add Push updates via API."
                                    isShowButton={false}
                                />
                            </View>
                        </>
                    )}
                    {activeTab == "pixel" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <MetaPixelDashboard />
                                <ConversionsAPI />
                                <StandardEventsMapping />
                            </View>
                        </>
                    )}
                    {activeTab == "audiences" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <AllAudiences />
                                <DemoModeBanner />
                            </View>
                        </>
                    )}
                    {activeTab == "campaigns" && <></>}
                    {activeTab == "creatives" && <></>}
                    {activeTab == "rules" && <></>}
                    {activeTab == "billing" && <></>}
                    {activeTab == "logs" && <></>}
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

export default MarketingMeta;
