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
    AntDesign,
    FontAwesome,
} from "@expo/vector-icons";
import CommonHeader from "../../components/common/CommonHeader";
import GoogleHeader from "../../components/marketing/GoogleHeader";
import { useState } from "react";
import SlaHeader from "../../components/slaSettings/SlaHeader";

import DemoModeBanner from "../../components/marketing/DemoModeBanner";
import AnalyticsGrid from "../../components/marketing/AnalyticsGrid";
import TopPagesCard from "../../components/marketing/TopPagesCard";
import TopEventsCard from "../../components/marketing/TopEventsCard";
import TrafficSourcesCard from "../../components/marketing/TrafficSourcesCard";
import DevicesCard from "../../components/marketing/DevicesCard";

const { width } = Dimensions.get("window");

const MarketingGoogleAnalytics = ({ navigation }) => {
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
                    title={"Google Analytics"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <GoogleHeader
                        title="Google Analytics"
                        subTitle="Real-time data (demo) · Marketplace Admin"
                    />

                    <View style={{ marginHorizontal: 10 }}>
                        <SlaHeader
                            headerIcon={
                                <FontAwesome
                                    name="bar-chart"
                                    size={24}
                                    color="#fff"
                                />
                            }
                            title={"Google Analytics"}
                            subTitle="Real-time data (demo) • Marketplace Admin"
                            isLiveShow={true}
                            // property="Baofeng E-commerce (Demo)"
                            // propertyID="GA4-DEMO-123456"
                        />

                        <AnalyticsGrid />
                        <TopPagesCard />
                        <TopEventsCard />
                        <TrafficSourcesCard />
                        <DevicesCard />
                        <DemoModeBanner />
                    </View>
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

export default MarketingGoogleAnalytics;
