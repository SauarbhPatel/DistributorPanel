import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
    __makeCartGetRequest,
    __makeGetAbndtRequest,
    __makeOrderCheckoutPostRequest,
    __makeOrderPostRequest,
} from "../../utils/api";
import {
    __getLocalization,
    __getToken,
    __setLocalization,
} from "../../utils/localization";
import { __generateRandomString } from "../../utils/funtion";
import { TextAreaBox } from "../../modules";
import SummeryCard from "../../components/payments/SummeryCard";
import CardList from "../../components/payments/CardList";

const { width, height } = Dimensions.get("window");

const PaymentScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            {/* {loading && <Loader />} */}
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SummeryCard />

                    <TextAreaBox
                        value={""}
                        onChangeText={(value) => {
                            // updateState(value);
                        }}
                        placeholder={"Search"}
                        valuekey={"res"}
                        titleCustomStyle={{
                            marginHorizontal: 0,
                        }}
                        inputCustomStyle={{
                            marginHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#c1c1c1ff",
                            elevation: 0,
                            backgroundColor: Colors.whiteColor,
                            paddingVertical: 5,
                        }}
                        leftIcon={
                            <Feather
                                name="search"
                                size={20}
                                color={Colors.lightGrayColor}
                            />
                        }
                        rightIcon={
                            <FontAwesome
                                name="filter"
                                size={20}
                                color={Colors.primaryColor}
                            />
                        }
                        customStyle={{ marginBottom: 5, marginTop: 10 }}
                    />
                    <CardList navigation={navigation} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.blackColor}
                    size={25}
                    onPress={() => navigation.pop()}
                />
                <Text
                    style={{
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.blackColor18Bold,
                    }}
                >
                    Payments
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        elevation: 2.0,
    },
});

export default PaymentScreen;
