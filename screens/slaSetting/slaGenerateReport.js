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
import GenerateReportForm from "../../components/slaSettings/GenerateReportForm";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import SlaComplianceSummary from "../../components/slaSettings/SlaComplianceSummary";

const SlaGenerateReport = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"Generate report"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <GenerateReportForm />
                    <SlaHeader
                        title="SLA Compliance Summary"
                        subTitle="Performance overview across all sellers. Track orders at risk, breached orders, and identify patterns by milestone and seller for proactive SLA management."
                        stats={[
                            {
                                value: "12",
                                label: "at risk",
                                icon: "alert-outline",
                                iconColor: "#ff922b",
                            },
                            {
                                value: "5",
                                label: "breached",
                                icon: "clock-outline",
                                iconColor: "#ff8787",
                            },
                        ]}
                        headerIcon={
                            <MaterialCommunityIcons
                                name="inbox-full"
                                size={24}
                                color="#fff"
                            />
                        }
                    />
                    <SlaComplianceSummary />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SlaGenerateReport;

const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding,
    },
});
