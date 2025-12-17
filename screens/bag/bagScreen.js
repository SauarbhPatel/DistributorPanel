import React, { useState, useRef } from "react";
import {
    SafeAreaView,
    Animated,
    Image,
    TouchableOpacity,
    Dimensions,
    View,
    StatusBar,
    StyleSheet,
    Text,
    Alert,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { Snackbar } from "react-native-paper";
import { useEffect } from "react";
import {
    __makeApplyCoupenPostRequest,
    __makeCartGetRequest,
    __makeCheckoutRequest,
    __makeDeleteCartItemDeleteRequest,
    __makeDeleteToCartDeleteRequest,
    __makeGetCoupenGetRequest,
    __makeUpdateCartItemRequest,
} from "../../utils/api";
import Loader from "../../components/loader";
import { getLocalizedString } from "../../utils/language/localizationService";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import { Dialog } from "@rneui/themed";
import { __getLocalization, __getToken } from "../../utils/localization";
import { __generateRandomString } from "../../utils/funtion";

const { width } = Dimensions.get("window");

const BagScreen = ({ navigation }) => {
    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(null);
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [showCoupons, setshowCoupons] = useState(false);
    const [selectedCoupons, setSelectedCoupons] = useState("");
    const [couponsList, setCouponsList] = useState();

    const __handleGetCart = () => {
        const token = __getToken();
        const cart = __getLocalization("cart");
        if (!token) {
            return Alert.alert("", "You are not Login. Please login first.");
        }
        setLoading(true);
        __makeCartGetRequest(token, cart)
            .then((res) => {
                setDetails(res);
                res?.cart?.products
                    ? setListData(res?.cart?.products)
                    : setListData([]);
                setLoading(false);
            })
            .catch((error) => {
                setListData([]);
                setLoading(false);
            });
    };
    const __handleGetCoupen = () => {
        __makeGetCoupenGetRequest()
            .then((res) => {
                setCouponsList(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const __handleDeleteCartItem = (index) => {
        setLoading(true);

        const token = __getToken();
        const cart = __getLocalization("cart");
        if (!token) {
            return Alert.alert("", "You are not Login. Please login first.");
        }
        __makeDeleteCartItemDeleteRequest(token, cart, index)
            .then((res) => {
                __handleGetCart();
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };
    const __handleUpdateQtyCartItem = (index, qty) => {
        try {
            setLoading(true);

            const token = __getToken();
            const cart = __getLocalization("cart");
            if (!token) {
                return Alert.alert(
                    "",
                    "You are not Login. Please login first."
                );
            }
            __makeUpdateCartItemRequest({ index, qty }, token, cart)
                .then((res) => {
                    __handleGetCart();
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const __handleDeleteCart = () => {
        const token = __getToken();
        const cart = __getLocalization("cart");
        if (!token) {
            return Alert.alert("", "You are not Login. Please login first.");
        }
        setLoading(true);
        __makeDeleteToCartDeleteRequest(token, cart)
            .then((res) => {
                __handleGetCart();
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };
    const __handleApplyCoupen = () => {
        setshowCoupons(false);
        setLoading(true);
        __makeApplyCoupenPostRequest({ coupon: selectedCoupons })
            .then((res) => {
                __handleGetCart();
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            __handleGetCart();
            __handleGetCoupen();
        }, 200);
    }, []);

    const __hanldeCheckOut = () => {
        const token = __getToken();
        const cart = __getLocalization("cart");
        if (!token) {
            return Alert.alert("", "You are not Login. Please login first.");
        }
        setLoading(true);

        __makeCheckoutRequest(token, cart)
            .then((res) => {
                setLoading(false);
                console.log(res);
                res?.abndnt &&
                    navigation.push("shipping", {
                        //   type: "billing",
                        type: "shipping",
                        abndnt: res.abndnt,
                    });
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const renderItem = ({ item, index }) => (
        <View>
            <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                <View style={styles.productWrapStyle}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            borderWidth: 1.5,
                            borderColor: Colors.backColor,
                            borderRadius: 10,
                            alignSelf: "center",
                        }}
                    >
                        <Image
                            source={{
                                uri: item?.variant?.mainImage_url?.url,
                            }}
                            style={styles.productImageStyle}
                            resizeMode="center"
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            marginVertical: Sizes.fixPadding,
                            marginLeft: Sizes.fixPadding,
                            flex: 1,
                        }}
                    >
                        <Text
                            style={{
                                maxWidth: width - 150,
                                ...Fonts.blackColor15SemiBold,
                            }}
                            numberOfLines={2}
                        >
                            {item?.name}
                        </Text>
                        <View
                            style={{
                                marginTop: Sizes.fixPadding - 5.0,
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
                                Price:
                            </Text>
                            <Text style={{ ...Fonts.blueColor13SemiBold }}>
                                {details?.currency?.symbol || "₹"}{" "}
                                {item?.price?.mrp}
                            </Text>
                        </View>
                        <View
                            style={{
                                marginTop: Sizes.fixPadding - 5.0,

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
                                Variation:
                            </Text>
                            <Text style={{ ...Fonts.blueColor13SemiBold }}>
                                {item?.variant?.weight}
                            </Text>
                        </View>
                        <View
                            style={{
                                marginTop: Sizes.fixPadding - 5.0,

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
                                {getLocalizedString("Tax Amount")}:
                            </Text>
                            <Text style={{ ...Fonts.blueColor13SemiBold }}>
                                {details?.currency?.symbol || "₹"} {item?.tax}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: Sizes.fixPadding - 5.0,
                            }}
                        >
                            <Text
                                style={{
                                    ...Fonts.lightGrayColor13Medium,
                                    textTransform: "capitalize",
                                }}
                            >
                                {getLocalizedString("TOTAL")}:
                            </Text>
                            <Text
                                style={{
                                    marginHorizontal: Sizes.fixPadding,
                                    marginRight: Sizes.fixPadding * 1.0,
                                    ...Fonts.blueColor13SemiBold,
                                }}
                            >
                                {details?.currency?.symbol || "₹"} {item?.total}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => __handleDeleteCartItem(index)}
                                style={styles.removeButtonStyle}
                            >
                                <Feather
                                    name="trash-2"
                                    color={Colors.whiteColor}
                                    size={18}
                                    // onPress={() =>
                                    // setQty((prv) => prv + 1)
                                    // }
                                />
                            </TouchableOpacity>

                            <Octicons
                                name="dash"
                                color={Colors.blackColor}
                                size={25}
                                onPress={() => {
                                    item?.qty != 1 &&
                                        __handleUpdateQtyCartItem(
                                            index,
                                            item?.qty - 1
                                        );
                                }}
                                style={{ marginStart: 15 }}
                            />
                            <View
                                style={{
                                    backgroundColor: Colors.primaryColor,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingHorizontal: 10,
                                    marginHorizontal: 10,
                                    borderRadius: 50,
                                }}
                            >
                                <Text
                                    style={{
                                        ...Fonts.whiteColor14Bold,
                                    }}
                                >
                                    {item?.qty}
                                </Text>
                            </View>

                            <MaterialIcons
                                name="add"
                                color={Colors.blackColor}
                                size={25}
                                onPress={() =>
                                    __handleUpdateQtyCartItem(
                                        index,
                                        item?.qty + 1
                                    )
                                }
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            {loading && <Loader />}

            <View style={{ flex: 1 }}>
                {header()}
                <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                    {listData ? (
                        listData?.length == 0 ? (
                            <>{bagEmptyInfo()}</>
                        ) : (
                            <FlatList
                                data={listData}
                                renderItem={renderItem}
                                keyExtractor={() => __generateRandomString(10)}
                            />
                        )
                    ) : null}
                    {listData &&
                        listData?.length != 0 &&
                        totalPriceAndPayButton()}
                    <Snackbar
                        style={styles.snackBarStyle}
                        visible={showSnackBar}
                        onDismiss={() => setShowSnackBar(false)}
                        elevation={0}
                    >
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Item Removed
                        </Text>
                    </Snackbar>
                    {coupons()}
                </View>
            </View>
        </SafeAreaView>
    );
    function coupons() {
        return (
            <Dialog
                visible={showCoupons}
                onRequestClose={() => {
                    setshowCoupons(false);
                }}
                overlayStyle={styles.dialogWrapStyle}
            >
                <View style={{ backgroundColor: Colors.whiteColor }}>
                    <ScrollView
                        contentContainerStyle={{ paddingHorizontal: 24 }}
                    >
                        <FlatList
                            data={couponsList}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedCoupons(item.code);
                                    }}
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 2,
                                        alignItems: "center",
                                        borderWidth:
                                            selectedCoupons == item.code
                                                ? 1
                                                : 0.3,
                                        borderColor:
                                            selectedCoupons == item.code
                                                ? "green"
                                                : "black",
                                    }}
                                >
                                    <Image
                                        source={{ uri: item?.icon?.url }}
                                        style={{
                                            width: 60,
                                            height: 40,
                                            backgroundColor: "white",
                                            marginRight: 10,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            ...Fonts.blackColor12Medium,
                                            marginRight: 10,
                                        }}
                                    >
                                        {item.code}
                                    </Text>
                                    <Text
                                        style={{
                                            ...Fonts.grayColor14Medium,
                                            fontSize: 10,
                                        }}
                                    >
                                        ({item.discount} {item.discount_type})
                                    </Text>
                                </TouchableOpacity>
                            )}
                            ListFooterComponent={
                                <View
                                    style={{
                                        justifyContent: "flex-end",
                                        flexDirection: "row",
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => setshowCoupons(false)}
                                    >
                                        <Text
                                            style={{
                                                ...Fonts.primaryColor14Bold,
                                                paddingVertical: 10,
                                                marginRight: 10,
                                            }}
                                        >
                                            Close
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={__handleApplyCoupen}
                                    >
                                        <Text
                                            style={{
                                                ...Fonts.primaryColor14Bold,
                                                paddingVertical: 10,
                                                marginLeft: 10,
                                            }}
                                        >
                                            Apply
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </ScrollView>
                </View>
            </Dialog>
        );
    }

    function bagEmptyInfo() {
        return (
            <View style={styles.noBagsItemsWrapStyle}>
                <Image
                    source={require("../../assets/images/empty_bag.png")}
                    style={{ width: 150.0, height: 150.0 }}
                    resizeMode="contain"
                />
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Hey, it feels so light!
                </Text>
                <Text style={styles.nothingInBagTextStyle}>
                    {`There is nothing in your bag.Let's add some items.`}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push("Home")}
                    style={styles.addItemsToBagButtonStyle}
                >
                    <Text style={{ ...Fonts.primaryColor16Bold }}>
                        ADD ITEMS TO BAG
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function totalPriceAndPayButton() {
        return (
            <>
                <View style={{ backgroundColor: "white", marginBottom: 1 }}>
                    <Text
                        style={{
                            ...Fonts.blackColor15Bold,
                            marginVertical: 10,
                            marginHorizontal: 10,
                        }}
                    >
                        {getLocalizedString("Price Details")}
                    </Text>

                    <View style={{ paddingHorizontal: Sizes.fixPadding * 7.0 }}>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                {getLocalizedString("Subtotal")}:
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {details?.currency?.symbol}{" "}
                                {details?.cart?.subTotal}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                {getLocalizedString("Shipping")}:
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {details?.currency?.symbol} {"0"}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                {getLocalizedString("GST")}:
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {details?.currency?.symbol} {details?.cart?.tax}
                            </Text>
                        </View>
                    </View>
                </View>
                {couponsList && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            backgroundColor: Colors.whiteColor,
                            marginBottom: 1,
                        }}
                        onPress={() => setshowCoupons(true)}
                    >
                        <MaterialIcons
                            name="crop-square"
                            color={Colors.grayColor}
                            size={25}
                            onPress={() => ""}
                        />
                        <Text
                            style={{
                                ...Fonts.grayColor14Medium,
                                paddingHorizontal: 5,
                            }}
                        >
                            Apply Coupon
                        </Text>
                    </TouchableOpacity>
                )}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View style={styles.totalPriceButtonStyle}>
                        <Text
                            style={{
                                marginRight: Sizes.fixPadding,
                                ...Fonts.blackColor13Bold,
                            }}
                        >
                            {getLocalizedString("TOTAL")}:
                        </Text>
                        <Text style={{ ...Fonts.primaryColor14Bold }}>
                            {details?.currency?.symbol}
                            {details?.cart?.total}
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        // onPress={() =>
                        //     listData && listData?.length != 0
                        //         ? navigation.push("Delivery")
                        //         : null
                        // }
                        // onPress={() =>
                        //     listData && listData?.length != 0
                        //         ? navigation.push("shipping", {
                        //               //   type: "billing",
                        //               type: "shipping",
                        //           })
                        //         : null
                        // }
                        onPress={() => __hanldeCheckOut()}
                        style={{
                            ...styles.payNowButtonStyle,
                            backgroundColor: listData
                                ? listData?.length == 0
                                    ? Colors.lightGrayColor
                                    : Colors.primaryColor
                                : Colors.lightGrayColor,
                        }}
                    >
                        <Text style={{ ...Fonts.whiteColor14Bold }}>
                            {getLocalizedString("PAY NOW")}
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
                    {getLocalizedString("My Bag")}
                </Text>
                {listData && listData?.length > 0 && (
                    <TouchableOpacity
                        style={{ position: "absolute", right: 10 }}
                        onPress={() => {
                            Alert.alert(
                                "",
                                "Are you sure you want to clear your bag?",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () =>
                                            console.log("Cancel Pressed"),
                                        style: "cancel",
                                    },
                                    {
                                        text: "YES",
                                        onPress: () => __handleDeleteCart(),
                                    },
                                ]
                            );
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: Sizes.fixPadding + 5.0,
                                ...Fonts.blackColor13Bold,
                            }}
                        >
                            {getLocalizedString("Clear All")}
                        </Text>
                    </TouchableOpacity>
                )}
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
    productWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: "row",
        marginHorizontal: Sizes.fixPadding - 5.0,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding - 5.0,
        padding: 10,
    },
    productImageStyle: {
        height: 160.0,
        width: 140.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
    },
    removeButtonStyle: {
        // backgroundColor: "#9E9E9E",
        backgroundColor: Colors.redColor,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: Sizes.fixPadding - 6.0,
        paddingVertical: Sizes.fixPadding - 7.0,
        borderRadius: 5,
        marginEnd: 10,
    },

    addItemsToBagButtonStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    snackBarStyle: {
        position: "absolute",
        bottom: 40.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: "#333333",
    },
    rowBack: {
        alignItems: "center",
        // backgroundColor: Colors.primaryColor,
        flex: 1,
    },
    noBagsItemsWrapStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.backColor,
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
    nothingInBagTextStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding + 3.0,
        textAlign: "center",
        ...Fonts.lightGrayColor13Medium,
    },
    priceDetailsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Sizes.fixPadding - 5.0,
    },
    dialogWrapStyle: {
        width: width - 50,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 4.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    closeAndLogoutTextWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: Sizes.fixPadding * 3.0,
    },
});

export default BagScreen;
