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
} from "@expo/vector-icons";
import CommonHeader from "../../components/common/CommonHeader";
import GoogleHeader from "../../components/marketing/GoogleHeader";
import { useState } from "react";
import GoogleTabs from "../../components/marketing/GoogleTabs";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import ReadinessCheck from "../../components/marketing/ReadinessCheck";
import SellerAdsSnapshot from "../../components/marketing/SellerAdsSnapshot";
import QuickActions from "../../components/marketing/QuickActions";
import EnvironmentBox from "../../components/marketing/EnvironmentBox";
import WorkspaceCard from "../../components/marketing/WorkspaceCard";
import APICredentialsCard from "../../components/marketing/APICredentialsCard";
import ConnectAccountsCard from "../../components/marketing/ConnectAccountsCard";
import AccessControlCard from "../../components/marketing/AccessControlCard";
import ConversionBanner from "../../components/marketing/ConversionBanner";
import ConfigureBox from "../../components/marketing/ConfigureBox";
import ExtraConfigurations from "../../components/marketing/ExtraConfigurations";
import IntegrationCard from "../../components/marketing/IntegrationCard";
import ConversionConfigurationCard from "../../components/marketing/ConversionConfigurationCard";
import TargetingPolicyCard from "../../components/marketing/TargetingPolicyCard";
import YouTubePolicyCard from "../../components/marketing/YouTubePolicyCard";
import YouTubeAdvancedConfigCard from "../../components/marketing/YouTubeAdvancedConfigCard";
import ProductEligibilityCard from "../../components/marketing/ProductEligibilityCard";
import ProductTableHeader from "../../components/marketing/ProductTableHeader";
import FieldMappingCard from "../../components/marketing/FieldMappingCard";
import ProductList from "../../components/marketing/ProductList";
import CampaignsTabs from "../../components/marketing/CampaignsTabs";
import ConversionSetupCard from "../../components/marketing/ConversionSetupCard";
import ProductSelectionGrid from "../../components/marketing/ProductSelectionGrid";
import RBACPermissions from "../../components/marketing/RBACPermissions";
import SpendLimitsSafeguards from "../../components/marketing/SpendLimitsSafeguards";
import LoggingAudit from "../../components/marketing/LoggingAudit";
import GoogleAccountCard from "../../components/marketing/GoogleAccountCard";
import ConversionMeasurement from "../../components/marketing/ConversionMeasurement";
import QuickStats from "../../components/marketing/QuickStats";
import SupportCardsBox from "../../components/marketing/SupportCardsBox";
import DemoSetupGuide from "../../components/marketing/DemoSetupGuide";
import GettingStarted from "../../components/marketing/GettingStarted";
import GoogleAndYoutube from "../../components/marketing/GoogleAndYoutube";
import ProductSyncing from "../../components/marketing/ProductSyncing";
import TroubleshootingLibrary from "../../components/marketing/TroubleshootingLibrary";
import DiagnosticsExport from "../../components/marketing/DiagnosticsExport";
import ContactSupport from "../../components/marketing/ContactSupport";

const { width } = Dimensions.get("window");

const MarketingGoogle = ({ navigation }) => {
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
                    title={"Google YouTube"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <GoogleHeader />
                    <GoogleTabs
                        activeTab={activeTab}
                        setActiveTab={(tab) => updateState({ activeTab: tab })}
                    />

                    {activeTab == "overview" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    title={"Google & YouTube Marketing"}
                                    subTitle="Manage and create Google & YouTube ads. Workspace → App Setup → Configure → Product Catalog Sync → Campaigns."
                                    goToAppSetup={true}
                                />
                                <ReadinessCheck />
                                <SellerAdsSnapshot />
                                <QuickActions />
                            </View>
                        </>
                    )}
                    {activeTab == "setup" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    title={"App Setup"}
                                    subTitle="Complete environment in order listed: mode → workspace → accounts → configuration. Follow the steps below to connect your Google Ads and Merchant Center"
                                    isShowProgress={true}
                                    progress={15}
                                />
                                <EnvironmentBox />
                                <WorkspaceCard />
                                <APICredentialsCard />
                                <ConnectAccountsCard />
                                <AccessControlCard />
                                <ConversionBanner />
                            </View>
                        </>
                    )}
                    {activeTab == "configure" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <ConfigureBox />
                                <ExtraConfigurations />
                                <IntegrationCard
                                    stepNumber="6"
                                    title="Account linking (Merchant Center as Google Ads)"
                                    badgeText="INTEGRATION"
                                    description="Associate tax product upload permission. Your organic details (eg. status and violations) is before campaign creation."
                                    infoMessage="Linking your Merchant Center to Google Ads enables Shopping campaigns and improves product feed performance tracking."
                                    buttonText="Link Merchant Center to Google Ads"
                                    onPress={() => console.log("Link Pressed")}
                                />
                                <ConversionConfigurationCard
                                    stepNumber="7"
                                    title="Conversion tracking configuration"
                                    badgeText="CONFIGURED"
                                    description="Select how you measure performance. Get basic Google Ads conversion tag, or enhanced conversions (optional)."
                                    optionTitle="Enhanced conversions"
                                    optionSubtitle="More accurate conversion tracking with first-party data"
                                    buttonText="Add a conversion tracking configuration"
                                    onPress={() =>
                                        console.log("Added Configuration")
                                    }
                                />
                                <TargetingPolicyCard
                                    stepNumber="8"
                                    onPress={() =>
                                        console.log("Added Configuration")
                                    }
                                />
                                <YouTubePolicyCard
                                    stepNumber="9"
                                    onPress={() =>
                                        console.log("Added Configuration")
                                    }
                                />
                                <YouTubeAdvancedConfigCard
                                    stepNumber="10"
                                    onPress={() =>
                                        console.log("Added Configuration")
                                    }
                                />
                            </View>
                        </>
                    )}
                    {activeTab == "sync" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    headerIcon={
                                        <MaterialCommunityIcons
                                            name="cylinder"
                                            size={24}
                                            color="#fff"
                                        />
                                    }
                                    isShowFeed={true}
                                    title={"Product Catalog Sync"}
                                    subTitle="Seller listings as source-of-truth. Complete: eligibility rules → field mapping → feed mode → validation → sync scheduling."
                                />
                                <ProductEligibilityCard />
                                <FieldMappingCard />
                                <ProductTableHeader />
                                <ProductList />
                            </View>
                        </>
                    )}
                    {activeTab == "campaigns" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    headerIcon={
                                        <MaterialCommunityIcons
                                            name="lightning-bolt-outline"
                                            size={24}
                                            color="#fff"
                                        />
                                    }
                                    title={"Campaigns & Ads"}
                                    subTitle="Create high-converting Google & YouTube ads from your product listings. Powered by intelligent targeting and real-time optimization."
                                />
                                <CampaignsTabs
                                    activeTab={campaignsTab}
                                    setActiveTab={(tab) =>
                                        updateState({ campaignsTab: tab })
                                    }
                                />
                                <ConversionSetupCard />
                                <ProductSelectionGrid />
                            </View>
                        </>
                    )}
                    {activeTab == "settings" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    headerIcon={
                                        <MaterialCommunityIcons
                                            name="lock-outline"
                                            size={24}
                                            color="#fff"
                                        />
                                    }
                                    title={"Settings"}
                                    subTitle="RBAC and seller permissions, spend limits and safeguards, logging and audit."
                                />
                                <RBACPermissions />
                                <SpendLimitsSafeguards />
                                <LoggingAudit />
                                <GoogleAccountCard />
                                <ConversionMeasurement />
                                <QuickStats />
                            </View>
                        </>
                    )}
                    {activeTab == "help" && (
                        <>
                            <View style={{ marginHorizontal: 10 }}>
                                <SlaHeader
                                    colors={["#0092B8", "#155DFC", "#4F39F6"]}
                                    headerIcon={
                                        <MaterialCommunityIcons
                                            name="lightbulb-outline"
                                            size={24}
                                            color="#fff"
                                        />
                                    }
                                    title={"Help Centre"}
                                    subTitle="Demo/test setup guides, troubleshooting resources, and diagnostics export tools."
                                />
                                <SupportCardsBox />
                                <DemoSetupGuide />
                                <GettingStarted />
                                <GoogleAndYoutube />
                                <ProductSyncing />
                                <TroubleshootingLibrary />
                                <DiagnosticsExport />
                                <ContactSupport />
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

export default MarketingGoogle;
