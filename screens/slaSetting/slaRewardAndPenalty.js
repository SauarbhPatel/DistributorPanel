import React from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

import CommonHeader from "../../components/common/CommonHeader";
import RewardPenaltyForm from "../../components/slaSettings/RewardPenaltyForm";

const SlaRewardAndPenalty = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"Reward & Penalty"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <RewardPenaltyForm />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SlaRewardAndPenalty;

const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding,
    },
});
