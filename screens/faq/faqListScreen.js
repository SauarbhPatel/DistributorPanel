import React from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { __generateRandomString } from "../../utils/funtion";
import { useEffect } from "react";
import { useState } from "react";
import { __makeGetFAQDetailsGetRequest } from "../../utils/api";

const FaqListScreen = ({ navigation, route }) => {
    const [list, setlist] = useState([]);
    const __handleGetWishList = () => {
        __makeGetFAQDetailsGetRequest(route.params.uid)
            .then((res) => {
                console.log(res);
                setlist(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        setTimeout(() => {
            __handleGetWishList();
        }, 200);
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    data={list}
                    renderItem={({ item }) => (
                        <View style={styles.returnAndExchangeItemInfoWrapStyle}>
                            <Text
                                style={{
                                    ...Fonts.blackColor13SemiBold,
                                    paddingTop: 15,
                                    paddingHorizontal: 10,
                                }}
                            >
                                {item.question}
                            </Text>
                            <View style={{ marginTop: 5.0 }}>
                                <Text
                                    style={{
                                        ...Fonts.lightGrayColor12Medium,
                                        paddingHorizontal: 10,
                                        paddingBottom: 15,
                                        textAlign: "justify",
                                    }}
                                >
                                    {item.answer}
                                </Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={() => __generateRandomString(10)}
                />
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
                    FAQ Details
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
    replacementProcessForOrderInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        margin: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        elevation: 3.0,
    },
    addDeliveryAddressToAccountInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        elevation: 3.0,
    },
    returnAndExchangeItemInfoWrapStyle: {
        margin: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        borderBottomWidth: 0.2,
    },
});

export default FaqListScreen;
