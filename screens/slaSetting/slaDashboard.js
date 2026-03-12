import React from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CommonHeader from "../../components/common/CommonHeader";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import SlaDashboardOverview from "../../components/slaSettings/SlaDashboardOverview";
import SlaTrendDashboard from "../../components/slaSettings/SlaTrendDashboard";

const SlaDashboard = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader title={"SLA Dashboard"} navigation={navigation} />

                <ScrollView contentContainerStyle={styles.container}>
                    <SlaHeader
                        title="SLA Dashboard"
                        subTitle="Global view of platform SLA health. Monitor orders at risk, breached orders, breach patterns by milestone, seller, courier and zone — click any order number to open details."
                        stats={[
                            {
                                value: "37",
                                label: "at risk",
                            },
                            {
                                value: "3",
                                label: "breached",
                            },
                            {
                                value: "2",
                                label: "milestones",
                            },
                            {
                                value: "2",
                                label: "sellers",
                            },
                        ]}
                        headerIcon={
                            <MaterialCommunityIcons
                                name="inbox-full"
                                size={24}
                                color="#fff"
                            />
                        }
                        openBreachQueueButton={true}
                        settingsButton={true}
                    />
                    <SlaDashboardOverview />
                    <SlaTrendDashboard />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SlaDashboard;

const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding,
    },
});
