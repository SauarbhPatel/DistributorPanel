import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    Dimensions,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    Alert,
    FlatList,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Dialog } from "@rneui/themed";
import {
    __makeCartGetRequest,
    __makeGetAbndtRequest,
    __makeOrderCheckoutPostRequest,
    __makeOrderPostRequest,
} from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../components/loader";
import {
    __getLocalization,
    __getToken,
    __setLocalization,
} from "../../utils/localization";
import { getLocalizedString } from "../../utils/language/localizationService";
import { __generateRandomString } from "../../utils/funtion";

const { width, height } = Dimensions.get("window");

const paymentOptionsList = [
    {
        _id: "68f7713a7589f41625252349",
        paymentGat_method: "Razorpay",
        log_url:
            "https://specialsellerbucket.s3.ap-south-1.amazonaws.com/image-1763466925990.png",
        isDisabled: false,
    },
    {
        _id: "691d6596f3fc89cb60a52a84",
        paymentGat_method: "COD",
        log_url:
            "https://baofengradios.s3.ap-south-1.amazonaws.com/image-1763529753579.png",
        isDisabled: false,
    },
];

import RazorpayCheckout from "react-native-razorpay";
const PaymentScreen = ({ navigation, route }) => {
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
        useState(null);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [cardDetails, setCardDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const [orderDetails, setOrderDetails] = useState(null);

    const __handleAddToWishlist = () => {
        setLoading(true);
        const cart = __getLocalization("cart");
        AsyncStorage.getItem("token")
            .then((data) => {
                __makeOrderPostRequest(
                    {
                        abndnt: route?.params.abndnt,
                        shipping_Address: {
                            btype: route?.params.shipping?.type,
                            bcountry: route?.params.shipping?.country,
                            bstate: route?.params.shipping?.state,
                            bcity: route?.params.shipping?.city,
                            bzip: route?.params.shipping?.zip,
                            bfirstname: route?.params.shipping?.firstname,
                            blastname: route?.params.shipping?.lastname,
                            baddressLine1: route?.params.shipping?.addressLine1,
                            baddressLine2: route?.params.shipping?.addressLine2,
                            bcompany: route?.params.shipping?.company,
                            bprovince: route?.params.shipping?.province,
                            blandmark: route?.params.shipping?.landmark,
                            bdeliveryType: route?.params.shipping?.deliveryType,
                            bemail: route?.params.shipping?.email,
                            bmobile: route?.params.shipping?.phone,
                            userid: route?.params.shipping?.userid,
                        },
                        billAddress: route?.params.billing,
                        Seller:
                            cardDetails?.cart?.products[0]?.price?.seller_id ||
                            null,
                        Delivery_Status: "Pending",
                        trans_type: selectedPaymentMethodId,
                        Payment_method: selectedPaymentMethodId,
                        Payment_Status: "Unpaid",
                        orderStatus: "Not Processed",
                        billAddress_Active: true,
                    },
                    data,
                    cart
                )
                    .then((res) => {
                        if (selectedPaymentMethodId == "Razorpay") {
                            return __handleProcessPayment(res.data);
                        }
                        setOrderDetails(res);
                        setShowSuccessDialog(true);

                        __setLocalization({ cart: null });
                        // setTimeout(() => {
                        //     setShowSuccessDialog(false);
                        //     navigation.push("Home");
                        // }, 4000);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setLoading(false);
                    });
            })
            .catch((error) => {
                console.error("data error");
                setLoading(false);
            });
    };

    const __handleGetCart = () => {
        const token = __getToken();
        if (!token) {
            return Alert.alert("", "You are not Login. Please login first.");
        }
        setLoading(true);
        __makeGetAbndtRequest(token, route?.params.abndnt)
            .then((res) => {
                setCardDetails(res);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            __handleGetCart();
        }, 200);
    }, []);

    const __handleProcessPayment = (details) => {
        try {
            var options = {
                description: "Order Payment",
                image: "https://res.cloudinary.com/duncu6k7b/image/upload/v1759318099/nj7xpcor7944mvchpqwk.png",
                currency: details?.order.currency,
                key: details?.paymentCred,
                amount: details?.order.amount,
                name: "Baofeng",
                order_id: details?.order.id,
                prefill: {
                    email: __getLocalization("Email") || "",
                    contact: __getLocalization("MobileNo") || "",
                    name: __getLocalization("Name") || "",
                },
                theme: { color: Colors.primaryColor },
            };
            RazorpayCheckout.open(options)
                .then(async (data) => {
                    console.log(data);
                    checkVerificationPayment({ ...details, ...data });
                })
                .catch((error) => {});
        } catch (error) {
            console.log("error", error);
            console.log("5");
        }
    };

    const checkVerificationPayment = (checkoutDetails) => {
        setLoading(true);
        AsyncStorage.getItem("token")
            .then((data) => {
                __makeOrderCheckoutPostRequest(checkoutDetails, data)
                    .then((res) => {
                        setOrderDetails(res);
                        setShowSuccessDialog(true);

                        __setLocalization({ cart: null });
                        // setTimeout(() => {
                        //     setShowSuccessDialog(false);
                        //     navigation.push("Home");
                        // }, 4000);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setLoading(false);
                    });
            })
            .catch((error) => {
                console.error("data error");
                setLoading(false);
            });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            {loading && <Loader />}
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            backgroundColor: "white",
                            marginBottom: 1,
                            margin: 10,
                            borderRadius: 10,
                            padding: 15,
                            borderWidth: 1,
                            borderColor: Colors.borderColor,
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor15Bold,
                            }}
                        >
                            {getLocalizedString("Price Details")}
                        </Text>

                        <View
                            style={{
                                paddingHorizontal: Sizes.fixPadding * 2.0,
                                marginTop: 10,
                            }}
                        >
                            <View
                                style={{
                                    ...styles.priceDetailsItem,
                                }}
                            >
                                <Text style={{ ...Fonts.blackColor12Medium }}>
                                    {getLocalizedString("Subtotal")}:
                                </Text>
                                <Text style={{ ...Fonts.blackColor13Bold }}>
                                    {cardDetails?.cart?.currency?.code}{" "}
                                    {cardDetails?.cart?.subTotal}
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
                                    {cardDetails?.cart?.currency?.code}
                                    {cardDetails?.cart?.shippingCost}
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
                                    {cardDetails?.cart?.currency?.code}{" "}
                                    {cardDetails?.cart?.tax}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.priceDetailsItem,
                                }}
                            >
                                <Text style={{ ...Fonts.blackColor12Medium }}>
                                    {getLocalizedString("Discount")}:
                                </Text>
                                <Text style={{ ...Fonts.blackColor13Bold }}>
                                    {cardDetails?.cart?.currency?.code}{" "}
                                    {cardDetails?.cart?.discount}
                                </Text>
                            </View>
                            <View
                                style={{
                                    ...styles.priceDetailsItem,
                                    borderTopWidth: 1,
                                    borderColor: Colors.lightGrayColor,
                                    paddingTop: 5,
                                    marginTop: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        ...Fonts.blackColor16SemiBold,
                                    }}
                                >
                                    {getLocalizedString("Total")}:
                                </Text>
                                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                    {cardDetails?.cart?.currency?.code}{" "}
                                    {cardDetails?.cart?.grandTotal}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            backgroundColor: "white",
                            marginBottom: 1,
                            margin: 10,
                            borderRadius: 10,
                            padding: 15,
                            borderWidth: 1,
                            borderColor: Colors.borderColor,
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor15Bold,
                            }}
                        >
                            {getLocalizedString("Choose your payment method")}
                        </Text>
                        <View style={{ gap: 10, marginTop: 10 }}>
                            {paymentOptions()}
                        </View>
                        {payButton()}
                    </View>
                </ScrollView>
            </View>
            {successDialog()}
        </SafeAreaView>
    );

    function successDialog() {
        return (
            <Dialog
                visible={showSuccessDialog}
                onRequestClose={() => {
                    setShowSuccessDialog(false);
                }}
                overlayStyle={styles.dialogWrapStyle}
            >
                <View
                    style={{
                        backgroundColor: Colors.whiteColor,
                        width: "100%",
                    }}
                >
                    <View style={styles.successIconWrapStyle}>
                        <Image
                            source={require("../../assets/images/output-onlinegiftools.gif")}
                            autoPlay
                            loop
                        />
                    </View>

                    <Text
                        style={{
                            ...Fonts.blackColor18Bold,
                            marginTop: Sizes.fixPadding + 15.0,
                            marginBottom: Sizes.fixPadding,
                            textAlign: "center",
                        }}
                    >
                        YUPPY !!
                    </Text>
                    <Text
                        style={{
                            ...Fonts.lightGrayColor16SemiBold,
                            textAlign: "center",
                            marginBottom: 10,
                        }}
                    >
                        Order placed Successfully
                    </Text>
                    <View style={{ maxHeight: height / 2.4 }}>
                        <FlatList
                            ListHeaderComponent={
                                <>
                                    <View style={{ gap: 10 }}>
                                        {orderDetails?.orderList?.map(
                                            (item) => (
                                                <View
                                                    key={__generateRandomString(
                                                        5
                                                    )}
                                                    style={{
                                                        borderWidth: 1,
                                                        borderColor:
                                                            Colors.borderColor,
                                                        backgroundColor:
                                                            Colors.bodyColor,
                                                        // width: "100%",
                                                        padding: 10,
                                                        borderRadius: 10,
                                                        gap: 5,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                "row",
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                ...Fonts.blackColor13Medium,
                                                            }}
                                                        >
                                                            Order No:{" "}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                ...Fonts.blackColor13Bold,
                                                                color: Colors.primaryColor,
                                                                textDecorationLine:
                                                                    "underline",
                                                            }}
                                                            onPress={() => {
                                                                navigation.push(
                                                                    "orderDetails",
                                                                    {
                                                                        id: item._id,
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            {
                                                                item?.order_referenceNo
                                                            }
                                                        </Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                "row",
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                ...Fonts.blackColor13Medium,
                                                            }}
                                                        >
                                                            Amount:{" "}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                ...Fonts.blackColor13Bold,
                                                                color: Colors.primaryColor,
                                                            }}
                                                        >
                                                            {
                                                                orderDetails
                                                                    ?.currency
                                                                    ?.code
                                                            }
                                                            {item?.grandTotal}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )
                                        )}
                                    </View>
                                </>
                            }
                        />
                    </View>
                    <View
                        style={{
                            width: "100%",
                            // flexDirection: "row",
                            marginTop: 10,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                ...styles.cardButton,
                            }}
                            onPress={() => {
                                setShowSuccessDialog(false);
                                navigation.push("Home");
                            }}
                            activeOpacity={0.5}
                        >
                            <Text
                                style={{
                                    ...Fonts.blackColor11Medium,
                                    color: Colors.whiteColor,
                                }}
                            >
                                Continue Shopping
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog>
        );
    }

    function payButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    __handleAddToWishlist();
                }}
                disabled={!selectedPaymentMethodId}
                style={[
                    styles.payButtonStyle,
                    !selectedPaymentMethodId && {
                        backgroundColor: Colors.lightGrayColor,
                    },
                ]}
            >
                <Text style={{ ...Fonts.whiteColor14Bold }}>PAY</Text>
            </TouchableOpacity>
        );
    }

    function paymentOptions() {
        return paymentOptionsList.map((item, index) => (
            <View key={`${item.paymentGat_method}`}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        !item?.isDisabled &&
                        setSelectedPaymentMethodId(item.paymentGat_method)
                    }
                >
                    <View style={styles.paymentOptionsWrapStyle}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    ...styles.radioButtonOuterStyle,
                                    borderColor:
                                        selectedPaymentMethodId ==
                                        item.paymentGat_method
                                            ? Colors.blueColor
                                            : Colors.lightGrayColor,
                                }}
                            >
                                {selectedPaymentMethodId ==
                                item.paymentGat_method ? (
                                    <View
                                        style={styles.radioButtonInnerStyle}
                                    />
                                ) : null}
                            </View>
                            <Text
                                style={{
                                    marginLeft: Sizes.fixPadding + 5.0,
                                    ...Fonts.blackColor16SemiBold,
                                    color: !item?.isDisabled
                                        ? Colors.blackColor
                                        : Colors.lightGrayColor,
                                }}
                            >
                                {item.paymentGat_method}
                            </Text>
                        </View>
                        <Image
                            source={{ uri: item?.log_url }}
                            style={{
                                width: 40.0,
                                height: 40.0,

                                ...(item?.isDisabled && {
                                    tintColor: Colors.lightGrayColor,
                                }),
                            }}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
            </View>
        ));
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
                    PAYMENT
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
    priceDetailsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Sizes.fixPadding - 5.0,
    },
    titleStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 4.0,
        marginHorizontal: Sizes.fixPadding + 5.0,
        textAlign: "center",
        ...Fonts.lightGrayColor15SemiBold,
    },
    radioButtonOuterStyle: {
        width: 18.0,
        height: 18.0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9.0,
        borderWidth: 2.0,
    },
    radioButtonInnerStyle: {
        backgroundColor: Colors.blueColor,
        width: 10.0,
        height: 10.0,
        borderRadius: 5.0,
    },
    paymentOptionsWrapStyle: {
        // marginHorizontal: Sizes.fixPadding * 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.bodyColor,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        padding: 10,
    },
    payButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 40,
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding + 5.0,
        alignItems: "center",
        paddingHorizontal: Sizes.fixPadding * 1.5,
        paddingBottom: Sizes.fixPadding * 3.0,
    },
    successIconWrapStyle: {
        // backgroundColor: Colors.whiteColor,
        width: 100.0,
        height: 100.0,
        borderRadius: 50.0,
        alignItems: "center",
        justifyContent: "center",
        marginTop: Sizes.fixPadding - 75.0,
        alignSelf: "center",
    },

    cardButton: {
        // borderWidth: 0.5,
        // borderRadius: 5,
        // paddingVertical: 10,
        // paddingHorizontal: 10,
        // justifyContent: "center",
        // alignContent: "center",

        backgroundColor: Colors.primaryColor,
        padding: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        alignSelf: "center",
    },
});

export default PaymentScreen;
