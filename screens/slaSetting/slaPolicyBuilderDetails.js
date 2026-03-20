import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import CommonHeader from "../../components/common/CommonHeader";
import MilestoneCards from "../../components/slaSettings/MilestoneCards";
import SlaRules from "../../components/slaSettings/SlaRules";
import MilestoneModal from "../../components/slaSettings/MilestoneModal";
import SLARuleModal from "../../components/slaSettings/SLARuleModal";

const SlaPolicyBuilderDetails = ({ navigation, route }) => {
    // const item = route.params;
    const [state, setState] = useState({
        loading: false,
        isShowCreate: false,
        isShowCreate1: false,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const { loading, isShowCreate } = state;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={route.params?.title}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <SlaHeader
                        title={route.params?.title}
                        subTitle="Create and manage SLA policies. Define milestones, triggers, duration, and severity."
                        buttonName="Edit"
                        status={route.params?.status}
                    />
                    <MilestoneCards />
                    <SlaRules />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SlaPolicyBuilderDetails;

const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding,
    },
});
