import React from "react";
import {
    StatusBar,
    SafeAreaView,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    View,
    Text,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";
import {
    __makeGetOrderListGetRequest,
    __makeGetRMAGetRequest,
} from "../../utils/api";
import { __formatDate, __generateRandomString } from "../../utils/funtion";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalizedString } from "../../utils/language/localizationService";

const { width } = Dimensions.get("window");

const RMAScreen = ({ navigation }) => {
    const [orderList, setorderList] = useState(null);

    const __handleGetorderList = () => {
        AsyncStorage.getItem("token")
            .then((data) => {
                __makeGetRMAGetRequest(data)
                    .then((res) => {
                        console.log(JSON.stringify(res));
                        setorderList(res);
                    })
                    .catch((error) => {
                        console.error(error);
                        setorderList([]);
                    });
            })
            .catch((error) => {
                console.error(error);
                setorderList([]);
            });
    };
    useEffect(() => {
        setTimeout(() => {
            __handleGetorderList();
        }, 200);
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {orders()}
            </View>
        </SafeAreaView>
    );

    function orders() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                onPress={() => {}}
                activeOpacity={0.9}
                style={styles.orderInfoWrapStyle}
            >
                <View
                    style={{
                        marginVertical: Sizes.fixPadding,
                        marginLeft: Sizes.fixPadding,
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            // maxWidth: width - 150,
                            ...Fonts.blackColor15SemiBold,
                        }}
                    >
                        Date: {item.product_id?.name}
                    </Text>
                    <View
                        style={{
                            marginVertical: Sizes.fixPadding - 2.0,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                marginRight: Sizes.fixPadding,
                                ...Fonts.lightGrayColor13Medium,
                            }}
                        >
                            Order Id:
                        </Text>
                        <Text style={{ ...Fonts.blueColor13SemiBold }}>
                            {item._id}
                        </Text>
                    </View>
                    <View
                        style={{
                            marginVertical: Sizes.fixPadding - 2.0,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                marginRight: Sizes.fixPadding,
                                ...Fonts.lightGrayColor13Medium,
                            }}
                        >
                            Date:
                        </Text>
                        <Text style={{ ...Fonts.blueColor13SemiBold }}>
                            {__formatDate(item.createdAt)}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: Sizes.fixPadding - 2.0,
                        }}
                    >
                        <Text style={{ ...Fonts.lightGrayColor13Medium }}>
                            Weight:
                        </Text>
                        <Text
                            style={{
                                marginHorizontal: Sizes.fixPadding,
                                ...Fonts.blueColor13SemiBold,
                            }}
                        >
                            {item.variant_id?.weight}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: Sizes.fixPadding - 2.0,
                        }}
                    >
                        <Text style={{ ...Fonts.lightGrayColor13Medium }}>
                            Resulution Type:
                        </Text>
                        <Text
                            style={{
                                marginHorizontal: Sizes.fixPadding,
                                ...Fonts.blueColor13SemiBold,
                            }}
                        >
                            {item.resulution_type}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: Sizes.fixPadding - 2.0,
                        }}
                    >
                        <Text style={{ ...Fonts.lightGrayColor13Medium }}>
                            Delivery Time:
                        </Text>
                        <Text
                            style={{
                                marginHorizontal: Sizes.fixPadding,
                                ...Fonts.blueColor13SemiBold,
                            }}
                        >
                            {item.pickupTime}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            // alignItems: "center",
                            marginBottom: Sizes.fixPadding - 2.0,
                        }}
                    >
                        <Text style={{ ...Fonts.lightGrayColor13Medium }}>
                            reason:
                        </Text>
                        <Text
                            style={{
                                marginHorizontal: Sizes.fixPadding,
                                ...Fonts.blueColor13SemiBold,
                                width: 300,
                            }}
                        >
                            {item?.reason[0]?.name}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor:
                            item.status == "Out for Delivery"
                                ? Colors.blueColor
                                : item.status == "Pending"
                                ? Colors.yellowColor
                                : Colors.greenColor,
                        ...styles.orderStatusWrapStyle,
                    }}
                >
                    <Text style={{ ...Fonts.whiteColor11Medium }}>
                        {item.status}
                    </Text>
                </View>
            </TouchableOpacity>
        );
        return (
            <FlatList
                data={orderList}
                keyExtractor={(item) => __generateRandomString(10)}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
            />
        );
    }

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
                    {getLocalizedString("RMA")}
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
    orderStatusWrapStyle: {
        position: "absolute",
        right: 0.0,
        top: 0.0,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    orderInfoWrapStyle: {
        flexDirection: "row",
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding - 5.0,
        elevation: 5.0,
        alignItems: "center",
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        paddingLeft: Sizes.fixPadding - 7.0,
        marginBottom: Sizes.fixPadding,
    },
});

export default RMAScreen;
