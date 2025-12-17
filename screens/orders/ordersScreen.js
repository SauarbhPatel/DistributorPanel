import {
    StatusBar,
    SafeAreaView,
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
import { __makeGetOrderListGetRequest } from "../../utils/api";
import { __formatDate, __generateRandomString } from "../../utils/funtion";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalizedString } from "../../utils/language/localizationService";

const OrdersScreen = ({ navigation }) => {
    const [orderList, setorderList] = useState(null);

    const __handleGetorderList = () => {
        AsyncStorage.getItem("token")
            .then((data) => {
                __makeGetOrderListGetRequest(data)
                    .then((res) => {
                        console.log("Order", JSON.stringify(res));
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
                onPress={() => {
                    navigation.push("orderDetails", { id: item._id });
                }}
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
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 10,
                            marginBottom: 10,
                        }}
                    >
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: Colors.lightGrayColor,
                                borderRadius: 10,
                                overflow: "hidden",
                            }}
                        >
                            <Image
                                source={{
                                    uri: item?.productDetails[0]?.mainImage_url
                                        ?.url,
                                }}
                                style={{ width: 100, height: 90 }}
                            />
                        </View>
                        <Text
                            style={{
                                ...Fonts.blackColor15SemiBold,
                                flex: 1,
                                marginEnd: 10,
                            }}
                            numberOfLines={5}
                        >
                            {item?.productDetails[0]?.name}
                        </Text>
                    </View>
                    <Text
                        style={{
                            // maxWidth: width - 150,
                            ...Fonts.blackColor15SemiBold,
                        }}
                    >
                        Order No: {item.referenceNo}
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: Sizes.fixPadding - 2.0,
                            marginTop: 8,
                        }}
                    >
                        <Text style={{ ...Fonts.lightGrayColor13Medium }}>
                            Order Date:
                        </Text>
                        <Text
                            style={{
                                marginHorizontal: Sizes.fixPadding,
                                ...Fonts.blueColor13SemiBold,
                            }}
                        >
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
                            Delivery Type:
                        </Text>
                        <Text
                            style={{
                                marginHorizontal: Sizes.fixPadding,
                                ...Fonts.blueColor13SemiBold,
                            }}
                        >
                            {item.deliveryType}
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
                            Order Amount:
                        </Text>
                        <Text
                            style={{
                                marginHorizontal: Sizes.fixPadding,
                                ...Fonts.blueColor13SemiBold,
                            }}
                        >
                            {item?.currency?.symbol || "₹"} {item.Balance}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            // marginBottom: Sizes.fixPadding - 2.0,
                        }}
                    >
                        <Text style={{ ...Fonts.lightGrayColor13Medium }}>
                            Order Payment Status:
                        </Text>
                        <Text
                            style={{
                                marginHorizontal: Sizes.fixPadding,
                                ...Fonts.blueColor13SemiBold,
                            }}
                        >
                            COD
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor:
                            item.status[0].orderStatusName == "Out for Delivery"
                                ? Colors.blueColor
                                : item.status[0].orderStatusName == "Pending"
                                ? Colors.yellowColor
                                : Colors.greenColor,
                        ...styles.orderStatusWrapStyle,
                    }}
                >
                    <Text style={{ ...Fonts.whiteColor11Medium }}>
                        {item.status[0].orderStatusName}
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
                    {getLocalizedString("My Orders")}
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

export default OrdersScreen;
