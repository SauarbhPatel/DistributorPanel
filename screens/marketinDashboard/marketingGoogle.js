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
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
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

const { width } = Dimensions.get("window");

const MarketingGoogle = ({ navigation }) => {
    const [state, setState] = useState({
        activeTab: "overview",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { activeTab } = state;

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
