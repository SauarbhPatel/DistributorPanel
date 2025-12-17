import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Text,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { __makeShipingAddressGetRequest } from "../../utils/api";
import { __generateRandomString } from "../../utils/funtion";
import { FlatList } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { getLocalizedString } from "../../utils/language/localizationService";
import { Alert } from "react-native";
const width = Dimensions.get("window").width;

const ShippingAddressScreen = ({ navigation }) => {
    const [address, setAddress] = useState(null);
    const isFocused = useIsFocused();

    const __handleGetAddress = () => {
        AsyncStorage.getItem("token")
            .then((data) => {
                if (!data) {
                    return Alert.alert(
                        "",
                        "You are not Login. Please login first."
                    );
                }
                __makeShipingAddressGetRequest(data)
                    .then((res) => {
                        console.log(JSON.stringify(res));
                        setAddress(res.address);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        isFocused &&
            setTimeout(() => {
                __handleGetAddress();
            }, 200);
    }, [isFocused]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {(address?.length > 0 || !address) && (
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        {address && addressList()}
                    </ScrollView>
                )}
                {address?.length == 0 && noData()}
                {totalPriceAndPayButton()}
            </View>
        </SafeAreaView>
    );

    function noData() {
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ ...Fonts.blackColor13Bold }}>
                        No Address Found
                    </Text>
                </View>
            </>
        );
    }

    function addressList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => ""}
                style={{
                    borderWidth: 1,
                    width: width - 20,
                    marginBottom: 10,
                    paddingVertical: 10,
                }}
            >
                <View style={{}}>
                    <View
                        style={{
                            ...styles.priceDetailsItem,
                        }}
                    >
                        <Text style={{ ...Fonts.blackColor12Medium }}>
                            Full-Address 1
                        </Text>
                        <Text style={{ ...Fonts.blackColor13Bold }}>
                            {item?.addressLine1}
                        </Text>
                    </View>
                    <View
                        style={{
                            ...styles.priceDetailsItem,
                        }}
                    >
                        <Text style={{ ...Fonts.blackColor12Medium }}>
                            Full-Address 2
                        </Text>
                        <Text style={{ ...Fonts.blackColor13Bold }}>
                            {item?.addressLine2}
                        </Text>
                    </View>
                    <View
                        style={{
                            ...styles.priceDetailsItem,
                        }}
                    >
                        <Text style={{ ...Fonts.blackColor12Medium }}>
                            Country
                        </Text>
                        <Text style={{ ...Fonts.blackColor13Bold }}>
                            {item?.country}
                        </Text>
                    </View>
                    {item?.state && (
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                State
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {item?.state}
                            </Text>
                        </View>
                    )}
                    {item?.phone && (
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Phone
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {item?.phone}
                            </Text>
                        </View>
                    )}
                    {item?.zip && (
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                zip Code
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {item?.zip}
                            </Text>
                        </View>
                    )}
                    {item?.email && (
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Email
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {item?.email}
                            </Text>
                        </View>
                    )}
                    {item?.firstname && (
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                First Name
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {item?.firstname}
                            </Text>
                        </View>
                    )}
                    {item?.lastname && (
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Last Name
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {item?.lastname}
                            </Text>
                        </View>
                    )}
                    {item?.province && (
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Province
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {item?.province}
                            </Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );

        return (
            <View>
                <Text
                    style={{
                        ...Fonts.blackColor15Bold,
                        marginVertical: 10,
                        marginHorizontal: 10,
                    }}
                >
                    {getLocalizedString("Address")}
                </Text>
                <FlatList
                    data={address}
                    keyExtractor={() => __generateRandomString(10)}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }

    function totalPriceAndPayButton() {
        return (
            <>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() =>
                            navigation.push("addAdress", { type: "shipping" })
                        }
                        style={{
                            ...styles.payNowButtonStyle,
                            backgroundColor: Colors.primaryColor,
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.whiteColor14Bold,
                                textTransform: "uppercase",
                            }}
                        >
                            {getLocalizedString("add new address")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
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
                        textTransform: "uppercase",
                    }}
                >
                    {getLocalizedString("My Shipping Address")}
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
    gotoPaymentButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding + 5.0,
        elevation: 10.0,
    },

    priceDetailsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    totalPriceButtonStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    payNowButtonStyle: {
        flex: 1,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
});

export default ShippingAddressScreen;
