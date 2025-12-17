import { useState } from "react";
import {
    SafeAreaView,
    View,
    Animated,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
    MaterialIcons,
    Octicons,
    Entypo,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
    __makeAddWishListGetRequest,
    __makeCancelOrderPostRequest,
    __makeGetOrderDetailsGetRequest,
    __makeGetReasonGetRequest,
} from "../../utils/api";
import { useEffect } from "react";
import { getLocalizedString } from "../../utils/language/localizationService";
import { __formatDate, __generateRandomString } from "../../utils/funtion";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../components/loader";
import { Dialog } from "@rneui/themed";
import { TextInput } from "react-native-paper";

const { width } = Dimensions.get("window");

const OrderDetailsScreen = ({ navigation, route }) => {
    const [orderdetail, setOrderDetail] = useState(null);

    const [listData, setListData] = useState(null);
    const [count, setcount] = useState(0);

    const [state, setstate] = useState({
        isShowCancelPopup: false,
        subject: "",
        priority: "",
        department: "",
        image: "",
        loading: false,
        reasonsList: [],
    });
    const {
        isShowCancelPopup,
        subject,
        priority,
        department,
        image,
        loading,
        reasonsList,
    } = state;

    const UpdateState = (data) => setstate((prv) => ({ ...prv, ...data }));

    const __handleGetDetails = () => {
        console.log(route?.params.id);
        AsyncStorage.getItem("token")
            .then((data) => {
                __makeGetOrderDetailsGetRequest(route?.params.id, data)
                    .then((res) => {
                        setOrderDetail(res[0]);
                        setListData(res[0].products);

                        if (
                            res[0]?.status[0]?._id == "6423de6c2750beedd6aee26f"
                        ) {
                            setcount(4);
                        } else if (
                            res[0]?.status[0]?._id == "6423debd2750beedd6aee279"
                        ) {
                            setcount(3);
                        } else if (
                            res[0]?.status[0]?._id == "6423de5e2750beedd6aee26d"
                        ) {
                            setcount(2);
                        } else if (
                            res[0]?.status[0]?._id == "6423decd2750beedd6aee27b"
                        ) {
                            setcount(1);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const __handleCancelOrder = () => {
        UpdateState({ loading: true });
        AsyncStorage.getItem("token")
            .then((data) => {
                __makeCancelOrderPostRequest(
                    {
                        orderId: route?.params.id,
                        reason: priority,
                        user: orderdetail?.billing?.userid,
                        note: subject,
                    },
                    data
                )
                    .then((res) => {
                        UpdateState({
                            loading: false,
                            isShowCancelPopup: false,
                        });
                        Alert.alert("", "Order Successfully Cancelled");

                        __handleGetDetails();
                    })
                    .catch((error) => {
                        console.error(error);
                        UpdateState({ loading: false });
                    });
            })
            .catch((error) => {
                console.error(error);
                UpdateState({ loading: false });
            });
    };

    const __handleGetCanelationReason = () => {
        __makeGetReasonGetRequest()
            .then((res) => {
                UpdateState({ reasonsList: res });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            __handleGetDetails();
            __handleGetCanelationReason();
        }, 200);
    }, []);

    const renderItem = ({ item }) => (
        <Animated.View style={[{}]}>
            <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                <View style={styles.productWrapStyle}>
                    <View
                        style={{
                            borderWidth: 1.5,
                            borderRadius: 10,
                            borderColor: Colors.backColor,
                        }}
                    >
                        <Image
                            source={{
                                uri: item?.productId?.variations?.mainImage_url
                                    ?.url,
                            }}
                            style={styles.productImageStyle}
                            resizeMode="center"
                        />
                    </View>
                    {/* {orderdetail?.status[0].orderStatusName == "Delivered" && ( */}
                    <View
                        style={{
                            position: "absolute",
                            bottom: 10,
                            left: 30,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 2,
                                backgroundColor: Colors.yellowColor,
                                borderRadius: 5,
                            }}
                            onPress={() => {
                                navigation.push("return", {
                                    orderId: route?.params.id,
                                    variant_id: item.variant,
                                    product_id: item.product,
                                });
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Return
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* )} */}

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
                            numberOfLines={3}
                        >
                            {item?.productId?.name}
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
                                    ...Fonts.lightGrayColor12Medium,
                                }}
                            >
                                Weight:
                            </Text>
                            <Text style={{ ...Fonts.blackColor11Medium }}>
                                {item?.productId?.weights}{" "}
                                {item?.productId?.unit}
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
                                    ...Fonts.lightGrayColor12Medium,
                                }}
                            >
                                Quantity:
                            </Text>
                            <Text style={{ ...Fonts.blackColor11Medium }}>
                                {item?.qty}
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
                                    ...Fonts.lightGrayColor12Medium,
                                }}
                            >
                                Unit Price:
                            </Text>
                            <Text style={{ ...Fonts.blackColor11Medium }}>
                                {item?.price?.unit_price}
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
                                    ...Fonts.lightGrayColor12Medium,
                                }}
                            >
                                Sub Total:
                            </Text>
                            <Text style={{ ...Fonts.blackColor11Medium }}>
                                {item?.subTotal}
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
                                    ...Fonts.lightGrayColor12Medium,
                                }}
                            >
                                Total:
                            </Text>
                            <Text style={{ ...Fonts.blackColor11Medium }}>
                                {item?.total}
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
                                    ...Fonts.lightGrayColor12Medium,
                                }}
                            >
                                Delivery Type:
                            </Text>
                            <Text style={{ ...Fonts.blackColor11Medium }}>
                                {item?.deliveryType}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}

                <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                    {listData ? (
                        listData.length == 0 ? (
                            <></>
                        ) : (
                            <FlatList
                                data={listData}
                                keyExtractor={(item) =>
                                    __generateRandomString(10)
                                }
                                ListHeaderComponent={
                                    <>
                                        {orderdetail && progress()}
                                        {orderdetail && details()}
                                        {orderdetail && billing()}
                                        {orderdetail && shipping()}
                                        {orderdetail && (
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        Colors.whiteColor,
                                                    paddingVertical: 20,
                                                    marginTop: 1,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        ...Fonts.blackColor15Bold,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Ordered Product
                                                </Text>
                                            </View>
                                        )}
                                    </>
                                }
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingTop: Sizes.fixPadding - 5.0,
                                }}
                                ListFooterComponent={
                                    <>
                                        {orderdetail?.status[0]
                                            .orderStatusName == "Pending" && (
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.primaryColor,
                                                    margin: 5,
                                                    padding: 20,
                                                    borderRadius: 5,
                                                    marginVertical: 20,
                                                }}
                                                activeOpacity={0.8}
                                                onPress={() => {
                                                    UpdateState({
                                                        isShowCancelPopup: true,
                                                    });
                                                    // Alert.alert(
                                                    //     "",
                                                    //     "Are you sure you want to cancel this order?",
                                                    //     [
                                                    //         {
                                                    //             text: "No",
                                                    //             onPress: () =>
                                                    //                 "",
                                                    //             style: "cancel",
                                                    //         },
                                                    //         {
                                                    //             text: "YES",
                                                    //             onPress: () =>
                                                    //                 __handleCancelOrder(),
                                                    //         },
                                                    //     ]
                                                    // );
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        ...Fonts.whiteColor14SemiBold,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Cancel Order
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </>
                                }
                            />
                        )
                    ) : (
                        ""
                    )}
                </View>
                {cancelOrderPopup()}
            </View>
        </SafeAreaView>
    );

    function cancelOrderPopup() {
        return (
            <Dialog
                visible={isShowCancelPopup}
                onRequestClose={() => {
                    UpdateState({ isShowCancelPopup: false });
                }}
                overlayStyle={styles.dialogWrapStyle}
            >
                {loading && <Loader />}
                <View style={{ backgroundColor: Colors.whiteColor }}>
                    <Text
                        style={{
                            ...Fonts.blackColor12Medium,
                            marginBottom: 10,
                            fontSize: 14,
                        }}
                    >
                        Cancel Order Number :{" "}
                        <Text
                            style={{
                                textDecorationLine: "underline",
                                color: Colors.primaryColor,
                                fontWeight: "900",
                            }}
                        >
                            {orderdetail?.order_referenceNo}
                        </Text>
                    </Text>

                    <Text
                        style={{
                            ...Fonts.grayColor14Medium,
                        }}
                    >
                        Cancellation Reason :
                    </Text>
                    <FlatList
                        data={reasonsList}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    UpdateState({ priority: item?._id });
                                }}
                                style={[
                                    styles.slotContainerStyle,
                                    {
                                        backgroundColor:
                                            priority == item?._id
                                                ? Colors.primaryColor
                                                : Colors.whiteColor,
                                        borderColor:
                                            priority == item?._id
                                                ? Colors.primaryColor
                                                : Colors.lightGrayColor,
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        ...Fonts.blackColor13Bold,
                                        // textTransform: "uppercase",
                                        color:
                                            priority == item?._id
                                                ? Colors.whiteColor
                                                : Colors.blackColor,
                                    }}
                                >
                                    {item?.reason}
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
                    <TextInput
                        mode="outlined"
                        label="Comments"
                        value={subject}
                        onChangeText={(text) => UpdateState({ subject: text })}
                        style={{
                            marginBottom: 10,
                            minHeight: 100,
                        }}
                        numberOfLines={6}
                        multiline
                    />

                    <View style={styles.closeAndLogoutTextWrapStyle}>
                        <Text
                            onPress={() =>
                                UpdateState({ isShowCancelPopup: false })
                            }
                            style={{ ...Fonts.primaryColor13SemiBold }}
                        >
                            Close
                        </Text>
                        <Text
                            onPress={() => {
                                Alert.alert(
                                    "",
                                    "Are you sure you want to cancel this order?",
                                    [
                                        {
                                            text: "No",
                                            onPress: () =>
                                                UpdateState({
                                                    isShowCancelPopup: false,
                                                }),
                                            style: "cancel",
                                        },
                                        {
                                            text: "YES",
                                            onPress: () =>
                                                __handleCancelOrder(),
                                        },
                                    ]
                                );
                            }}
                            style={{
                                marginLeft: Sizes.fixPadding * 2.0,
                                ...Fonts.primaryColor13SemiBold,
                                color: Colors.redColor,
                            }}
                        >
                            Cancel Now
                        </Text>
                    </View>
                </View>
            </Dialog>
        );
    }

    function progress(params) {
        return (
            <View style={{ paddingVertical: 20 }}>
                <View style={{ flexDirection: "row", paddingBottom: 20 }}>
                    <View
                        style={{
                            width: width / 4,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 45,
                                height: 45,
                                borderWidth: 2,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: Colors.primaryColor,
                            }}
                        >
                            <Octicons
                                name="checklist"
                                color={Colors.primaryColor}
                                size={25}
                            />
                        </View>
                        <Text
                            style={{
                                ...Fonts.blackColor11Medium,
                                marginTop: 5,
                            }}
                        >
                            Order placed
                        </Text>
                    </View>
                    <View
                        style={{
                            width: width / 4,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 45,
                                height: 45,
                                borderWidth: 2,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: Colors.blueColor,
                            }}
                        >
                            <Entypo
                                name="thumbs-up"
                                color={Colors.blueColor}
                                size={25}
                            />
                        </View>
                        <Text
                            style={{
                                ...Fonts.blackColor11Medium,
                                marginTop: 5,
                            }}
                        >
                            Confirmed
                        </Text>
                    </View>
                    <View
                        style={{
                            width: width / 4,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 45,
                                height: 45,
                                borderWidth: 2,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: Colors.yellowColor,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="truck-delivery-outline"
                                color={Colors.yellowColor}
                                size={25}
                            />
                        </View>
                        <Text
                            style={{
                                ...Fonts.blackColor11Medium,
                                marginTop: 5,
                            }}
                        >
                            On Delivery
                        </Text>
                    </View>
                    <View
                        style={{
                            width: width / 4,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                width: 45,
                                height: 45,
                                borderWidth: 2,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                borderColor: Colors.greenColor,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="check-all"
                                color={Colors.greenColor}
                                size={25}
                            />
                        </View>
                        <Text
                            style={{
                                ...Fonts.blackColor11Medium,
                                marginTop: 5,
                            }}
                        >
                            Delivered
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        position: "relative",
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            width: width - 60,
                            height: 5,
                            top: 8,
                            left: 30,
                            backgroundColor: Colors.grayColor,
                            // alignSelf: "center",
                        }}
                    >
                        <View
                            style={{
                                height: 5,
                                width: 25 * count + "%",
                                backgroundColor: "green",
                            }}
                        />
                    </View>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: [1, 2, 3, 4].includes(count)
                                ? Colors.greenColor
                                : Colors.grayColor,
                            borderRadius: 50,
                        }}
                    />
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: [2, 3, 4].includes(count)
                                ? Colors.greenColor
                                : Colors.grayColor,
                            borderRadius: 50,
                        }}
                    />
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: [3, 4].includes(count)
                                ? Colors.greenColor
                                : Colors.grayColor,
                            borderRadius: 50,
                        }}
                    />
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: [4].includes(count)
                                ? Colors.greenColor
                                : Colors.grayColor,
                            borderRadius: 50,
                        }}
                    />
                </View>
            </View>
        );
    }

    function details() {
        return (
            <>
                <View style={{ backgroundColor: "white", marginBottom: 1 }}>
                    <View style={{ padding: Sizes.fixPadding * 2.0 }}>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Customer Name
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.user_firstname}{" "}
                                {orderdetail?.user_lastname}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Delivery Type
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.deliveryType}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Order Date
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {__formatDate(
                                    orderdetail?.language[0].createdAt
                                )}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Payment Status
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.status[0].orderStatusName}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Order No
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.order_referenceNo}
                            </Text>
                        </View>
                        {/* <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Day
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                            {orderdetail?.timeGroup[0]?.name} 
                            </Text>
                        </View> */}
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Order Amount
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.currency[0]?.symbol || "₹"}{" "}
                                {orderdetail.balance}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Delivery Exp. Date
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {__formatDate(orderdetail?.date)}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Paid
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.currency[0]?.symbol || "₹"}
                                {orderdetail?.paid}
                            </Text>
                        </View>
                        {/* <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Time Slot
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.timeSlot[0]?.name}
                            </Text>
                        </View> */}
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Balance
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.currency[0].symbol || "₹"}
                                {orderdetail?.balance}
                            </Text>
                        </View>
                    </View>
                </View>
            </>
        );
    }
    function shipping() {
        return (
            <>
                <View
                    style={{
                        backgroundColor: "white",
                        marginBottom: 1,
                        paddingVertical: Sizes.fixPadding * 2.0,
                        // marginHorizontal: 10,
                        borderRadius: 5,
                        marginTop: 1,
                    }}
                >
                    <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                        <Text
                            style={{
                                ...Fonts.blackColor16Bold,
                                marginBottom: 15,
                            }}
                        >
                            Shipping Address
                        </Text>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Address Line 1
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.shipping?.baddressLine1}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Address Line 2
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.shipping?.baddressLine2}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                City
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.shipping?.bcity}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                State
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.shipping?.bstate}
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
                                {orderdetail?.shipping?.bcompany}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Zip
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.shipping?.bzip}
                            </Text>
                        </View>
                    </View>
                </View>
            </>
        );
    }
    function billing() {
        return (
            <>
                <View
                    style={{
                        backgroundColor: "white",
                        marginBottom: 1,
                        paddingVertical: Sizes.fixPadding * 2.0,
                        marginTop: 1,
                        borderRadius: 5,
                    }}
                >
                    <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                        <Text
                            style={{
                                ...Fonts.blackColor16Bold,
                                marginBottom: 15,
                            }}
                        >
                            Billing Address
                        </Text>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Address Line 1
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.billing?.addressLine1}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Address Line 2
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.billing?.addressLine2}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                City
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.billing?.city}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                State
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.billing?.state}
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
                                {orderdetail?.billing?.company}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Zip
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {orderdetail?.billing?.zip}
                            </Text>
                        </View>
                    </View>
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
                    }}
                >
                    {getLocalizedString("ORDER DETAILS")}
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
    snackBarStyle: {
        position: "absolute",
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: "#333333",
    },
    rowBack: {
        alignItems: "center",
        backgroundColor: Colors.primaryColor,
        flex: 1,
    },
    productWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: "row",
        marginHorizontal: Sizes.fixPadding - 8.0,
        // elevation: 1.0,
        // borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding - 8.0,
        padding: 10,
    },
    productImageStyle: {
        height: "100%",
        width: 120.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
    },
    removeButtonStyle: {
        backgroundColor: "#9E9E9E",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: Sizes.fixPadding - 6.0,
        paddingVertical: Sizes.fixPadding - 7.0,
    },
    continueShoppingButtonStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    noWishlistItemsWrapStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.backColor,
    },
    wishlistEmptyImageStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding + 5.0,
        width: 130.0,
        height: 130.0,
    },
    priceDetailsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: Sizes.fixPadding - 5.0,
    },
    //
    dialogWrapStyle: {
        width: width - 50,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 4.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    //
    closeAndLogoutTextWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: Sizes.fixPadding * 3.0,
    },
    slotContainerStyle: {
        alignItems: "center",
        borderRadius: 5,
        alignItems: "center",
        marginBottom: Sizes.fixPadding,
        justifyContent: "center",
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding,
        minHeight: 40.0,
        paddingHorizontal: 10,
    },
});

export default OrderDetailsScreen;
