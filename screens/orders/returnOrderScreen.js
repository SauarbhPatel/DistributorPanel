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
import {
    __makeBillingAddressGetRequest,
    __makeGetresionListGetRequest,
    __makeReturnPostRequest,
    __makeShipingAddressGetRequest,
} from "../../utils/api";
import { __generateRandomString } from "../../utils/funtion";
import { FlatList } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";
const width = Dimensions.get("window").width;

const ReturnOrderScreen = ({ navigation, route }) => {
    const [address, setAddress] = useState(null);
    const [ression, setRession] = useState(null);
    const [addressType, setAddressType] = useState("1");
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [priority, setpriority] = useState("");
    const [resolution_type, setresolution_type] = useState("");
    const [selectResion, setselectResion] = useState("");

    const isFocused = useIsFocused();

    const __handleGetBillingAddress = () => {
        AsyncStorage.getItem("token")
            .then((data) => {
                if (!data) {
                    return Alert.alert(
                        "",
                        "You are not Login. Please login first."
                    );
                }
                __makeBillingAddressGetRequest(data)
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
    const __handleGetShippingAddress = () => {
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
    const __handleRessionAddress = () => {
        AsyncStorage.getItem("token")
            .then((data) => {
                if (!data) {
                    return Alert.alert(
                        "",
                        "You are not Login. Please login first."
                    );
                }
                __makeGetresionListGetRequest(data)
                    .then((res) => {
                        console.warn(JSON.stringify(res));
                        setRession(res);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const __handleReturn = () => {
        AsyncStorage.getItem("token")
            .then((data) => {
                if (!data) {
                    return Alert.alert(
                        "",
                        "You are not Login. Please login first."
                    );
                }
                __makeReturnPostRequest(
                    {
                        orderId: route?.params.orderId,
                        product_id: route?.params.product_id,
                        variant_id: route?.params.variant_id,
                        reason: selectResion,

                        returnPickupAddress: address,
                        pickupTime: priority,
                        resolution_type: resolution_type,
                    },
                    data
                )
                    .then((res) => {
                        console.log(JSON.stringify(res));
                        Alert.alert("", "Success");
                        navigation.pop();
                    })
                    .catch((error) => {
                        console.log(JSON.stringify(error));
                        Alert.alert("", "Order must be Delivery");
                    });
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("", "Order must be Delivery");
            });
    };

    useEffect(() => {
        isFocused &&
            setTimeout(() => {
                __handleGetBillingAddress();
                __handleRessionAddress();
            }, 200);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsHorizontalScrollIndicator={false}>
                    {resolution()}
                    {pickuptime()}
                    {ressionCom()}
                    {addressbtn()}
                    {(address?.length > 0 || !address) &&
                        address &&
                        addressList()}
                </ScrollView>
                {address?.length == 0 && noData()}
                {totalPriceAndPayButton()}
            </View>
        </SafeAreaView>
    );

    function ressionCom(params) {
        return (
            <View style={{ paddingHorizontal: 10 }}>
                <Text
                    style={{
                        ...Fonts.blackColor15Bold,
                        marginVertical: 10,
                    }}
                >
                    Reason
                </Text>
                <FlatList
                    data={ression}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setselectResion(item._id);
                            }}
                            style={[
                                styles.slotContainerStyle,
                                {
                                    backgroundColor:
                                        selectResion == item._id
                                            ? Colors.primaryColor
                                            : Colors.whiteColor,
                                    borderColor:
                                        selectResion == item._id
                                            ? Colors.primaryColor
                                            : Colors.grayColor,

                                    borderRadius: 5,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    ...Fonts.blackColor12Medium,
                                    textTransform: "uppercase",
                                    color:
                                        selectResion == item._id
                                            ? Colors.whiteColor
                                            : Colors.grayColor,
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => __generateRandomString(10)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: Sizes.fixPadding,
                    }}
                    // numColumns={}
                />
            </View>
        );
    }
    function resolution(params) {
        return (
            <View style={{ paddingHorizontal: 10 }}>
                <Text
                    style={{
                        ...Fonts.blackColor15Bold,
                        marginVertical: 10,
                    }}
                >
                    Resolution Type
                </Text>
                <FlatList
                    data={["Refund", "Cancel"]}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setresolution_type(item);
                            }}
                            style={[
                                styles.slotContainerStyle,
                                {
                                    backgroundColor:
                                        resolution_type == item
                                            ? Colors.primaryColor
                                            : Colors.whiteColor,
                                    borderColor:
                                        resolution_type == item
                                            ? Colors.primaryColor
                                            : Colors.grayColor,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    ...Fonts.blackColor13Bold,
                                    textTransform: "uppercase",
                                    color:
                                        resolution_type == item
                                            ? Colors.whiteColor
                                            : Colors.grayColor,
                                }}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => __generateRandomString(10)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: Sizes.fixPadding,
                    }}
                    numColumns={3}
                />
            </View>
        );
    }
    function pickuptime(params) {
        return (
            <View style={{ paddingHorizontal: 10 }}>
                <Text
                    style={{
                        ...Fonts.blackColor15Bold,
                        marginVertical: 10,
                    }}
                >
                    Pickup Time
                </Text>
                <FlatList
                    data={["Morning", "After_noon", "Evening", "night"]}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setpriority(item);
                            }}
                            style={[
                                styles.slotContainerStyle,
                                {
                                    backgroundColor:
                                        priority == item
                                            ? Colors.primaryColor
                                            : Colors.whiteColor,
                                    borderColor:
                                        priority == item
                                            ? Colors.primaryColor
                                            : Colors.grayColor,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    ...Fonts.blackColor13Bold,
                                    textTransform: "uppercase",
                                    color:
                                        priority == item
                                            ? Colors.whiteColor
                                            : Colors.grayColor,
                                }}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => __generateRandomString(10)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: Sizes.fixPadding,
                    }}
                    numColumns={3}
                />
            </View>
        );
    }

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

    function addressbtn(params) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                    }}
                    onPress={() => {
                        setAddressType("1");
                        __handleGetBillingAddress();
                    }}
                >
                    <MaterialIcons
                        name={addressType == "1" ? "check-box" : "crop-square"}
                        color={
                            addressType == "1"
                                ? Colors.primaryColor
                                : Colors.grayColor
                        }
                        size={25}
                    />
                    <Text
                        style={{
                            ...Fonts.grayColor14Medium,
                            paddingHorizontal: 5,
                        }}
                    >
                        From Billing
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                    }}
                    onPress={() => {
                        setAddressType("2");
                        __handleGetShippingAddress();
                    }}
                >
                    <MaterialIcons
                        name={addressType == "2" ? "check-box" : "crop-square"}
                        color={
                            addressType == "2"
                                ? Colors.primaryColor
                                : Colors.grayColor
                        }
                        size={25}
                    />
                    <Text
                        style={{
                            ...Fonts.grayColor14Medium,
                            paddingHorizontal: 5,
                        }}
                    >
                        From Shipping
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function addressList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setSelectedAddress(item)}
                style={{
                    borderWidth: 1,
                    width: width - 20,
                    marginBottom: 10,
                    paddingVertical: 10,
                    borderColor:
                        selectedAddress?._id == item._id ? "green" : "gray",
                    backgroundColor:
                        selectedAddress?._id == item._id ? "#4caf501f" : "#fff",
                    borderRadius: 10,
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
                    Address
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
                        onPress={() => {
                            __handleReturn();
                        }}
                        style={{
                            ...styles.payNowButtonStyle,
                            backgroundColor:
                                selectedAddress &&
                                resolution_type &&
                                priority &&
                                selectResion
                                    ? Colors.primaryColor
                                    : Colors.lightGrayColor,
                        }}
                    >
                        <Text style={{ ...Fonts.whiteColor14Bold }}>
                            RETURN
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
                    Return Details
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
    },
    slotContainerStyle: {
        alignItems: "center",
        borderRadius: Sizes.fixPadding,
        alignItems: "center",
        marginBottom: Sizes.fixPadding,
        justifyContent: "center",
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding,
        minHeight: 30.0,
        minWidth: 80.0,
        paddingHorizontal: 10,
    },
});

export default ReturnOrderScreen;
