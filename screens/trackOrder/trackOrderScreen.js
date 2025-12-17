import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { __formatDate, __generateRandomString } from "../../utils/funtion";
import { TextInput } from "react-native-paper";
import {
    __makeCreateTicketPostRequest,
    __makeGetTicketGetRequest,
    __makeTrackOrderPostRequest,
} from "../../utils/api";
import Loader from "../../components/loader";
import { getLocalizedString } from "../../utils/language/localizationService";

const TractOrderScreen = ({ navigation }) => {
    const [trackDetails, setTrackDetails] = useState(null);
    const [state, setstate] = useState({
        order_code: "",
        phone: "",
        loading: false,
    });
    const { order_code, phone, loading } = state;

    const UpdateState = (data) => setstate((prv) => ({ ...prv, ...data }));

    const __handleTrack = () => {
        UpdateState({ loading: true });
        setTrackDetails(null);

        __makeTrackOrderPostRequest({
            order_code,
            phone,
        })
            .then((res) => {
                console.log(JSON.stringify(res));
                UpdateState({
                    loading: false,
                });
                if (res?.status) return;
                setTrackDetails(res);
            })
            .catch((error) => {
                console.error(error);
                UpdateState({ loading: false });
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            {loading && <Loader />}
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    <View
                        style={{ paddingHorizontal: 20, paddingVertical: 20 }}
                    >
                        <TextInput
                            mode="outlined"
                            label="Order Code / Reference No"
                            value={order_code}
                            onChangeText={(text) =>
                                UpdateState({ order_code: text })
                            }
                            style={{
                                marginBottom: 15,
                                ...Fonts.blackColor15Medium,
                            }}
                        />
                        <TextInput
                            mode="outlined"
                            label="Mobile Number +911234567890"
                            value={phone}
                            onChangeText={(text) =>
                                UpdateState({ phone: text })
                            }
                            style={{
                                marginBottom: 20,
                                ...Fonts.blackColor15Medium,
                            }}
                        />

                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.primaryColor,
                                paddingVertical: 15,
                                borderRadius: 5,
                            }}
                            onPress={() => __handleTrack()}
                        >
                            <Text
                                style={{
                                    ...Fonts.whiteColor13Bold,
                                    textTransform: "uppercase",
                                    textAlign: "center",
                                }}
                            >
                                Track Order
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {trackDetails && details()}
                    {trackDetails && billing()}
                    {trackDetails && shipping()}
                </ScrollView>
            </View>
        </SafeAreaView>
    );

    function details() {
        return (
            <>
                <View
                    style={{
                        backgroundColor: "white",
                        marginBottom: 1,
                        paddingVertical: Sizes.fixPadding * 2.0,
                        marginHorizontal: 20,
                        borderRadius: 5,
                    }}
                >
                    <View style={{ paddingHorizontal: Sizes.fixPadding }}>
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
                                    trackDetails?.getaOrderById?.createdAt
                                )}
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
                                {trackDetails?.getaOrderById?.order_referenceNo}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Order Amount
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {trackDetails?.getaOrderById?.currency?.symbol}{" "}
                                {trackDetails?.getaOrderById?.total}
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
                                {trackDetails?.getaOrderById?.currency?.symbol}{" "}
                                {trackDetails?.getaOrderById?.Paid}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Balance
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {trackDetails?.getaOrderById?.currency?.symbol}{" "}
                                {trackDetails?.getaOrderById?.Balance}
                            </Text>
                        </View>

                        {/* divider */}
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Delivery Status
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {
                                    trackDetails?.getOrderTrans[0]
                                        ?.orderStatusId?.orderStatusName
                                }
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
                                {
                                    trackDetails?.getaOrderById?.Payment_Status
                                        ?.paymentStatusName
                                }
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Day
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {trackDetails?.timeGroup?.name}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Delivery Expected Date
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {__formatDate(
                                    trackDetails?.getaOrderById?.date
                                )}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Time Slot
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {trackDetails?.timeSlot?.name}
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                AWB Number
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Reference No
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Mode
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}></Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Courier Company Name
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}></Text>
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
                        marginHorizontal: 20,
                        borderRadius: 5,
                        marginTop: 20,
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
                                {
                                    trackDetails?.getaOrderById
                                        ?.shippingAddress_save?.baddressLine1
                                }
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
                                {
                                    trackDetails?.getaOrderById
                                        ?.shippingAddress_save?.baddressLine2
                                }
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
                                {
                                    trackDetails?.getaOrderById
                                        ?.shippingAddress_save?.bcity
                                }
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
                                {
                                    trackDetails?.getaOrderById
                                        ?.shippingAddress_save?.bstate
                                }
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
                                {
                                    trackDetails?.getaOrderById
                                        ?.shippingAddress_save?.bcountry
                                }
                            </Text>
                        </View>
                        <View
                            style={{
                                ...styles.priceDetailsItem,
                            }}
                        >
                            <Text style={{ ...Fonts.blackColor12Medium }}>
                                Date
                            </Text>
                            <Text style={{ ...Fonts.blackColor13Bold }}>
                                {
                                    trackDetails?.getaOrderById
                                        ?.shippingAddress_save?.date
                                }
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
                        marginHorizontal: 20,
                        marginTop: 20,
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
                                {
                                    trackDetails?.getaOrderById?.billingAddress
                                        ?.baddressLine1
                                }
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
                                {
                                    trackDetails?.getaOrderById?.billingAddress
                                        ?.baddressLine2
                                }
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
                                {
                                    trackDetails?.getaOrderById?.billingAddress
                                        ?.bcity
                                }
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
                                {
                                    trackDetails?.getaOrderById?.billingAddress
                                        ?.bstate
                                }
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
                                {
                                    trackDetails?.getaOrderById?.billingAddress
                                        ?.bcountry
                                }
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
                    {getLocalizedString("Track My Order")}
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
});

export default TractOrderScreen;
