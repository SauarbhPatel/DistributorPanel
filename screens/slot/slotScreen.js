import React, { useEffect, useState } from "react";
import CalendarStrip from "react-native-calendar-strip";
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    FlatList,
    StyleSheet,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { __generateRandomString } from "../../utils/funtion";
import { __makeGetTimeSlotGetRequest } from "../../utils/api";

const TimeSlotScreen = ({ navigation, route }) => {
    const [selectedSlot, setSelectedSlot] = useState("");
    const [slotList, setSlotList] = useState(null);
    const [selectedDate, setselectedDate] = useState(new Date());

    const [book, setBook] = useState(false);
    //

    const __handleGetTimeSlot = () => {
        __makeGetTimeSlotGetRequest()
            .then((res) => {
                console.log(res);
                setSlotList(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            __handleGetTimeSlot();
        }, 200);
    }, []);

    const datesBlacklistFunc = (date) => {
        return date.isoWeekday() === 7;
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            {
                <View style={{ flex: 1 }}>
                    {header()}
                    {calander()}
                    {divider()}
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {slotList?.map((item, i) => (
                                    <View key={__generateRandomString(10)}>
                                        {slotsInfo({
                                            image:
                                                item.name == "Morning"
                                                    ? require("../../assets/images/payment_icon/sunrise.png")
                                                    : item.name == "Afternoon"
                                                    ? require("../../assets/images/payment_icon/sun.png")
                                                    : require("../../assets/images/payment_icon/sun-night.png"),
                                            data: item.value,
                                            name: item.name,
                                        })}
                                        {slotsTime({
                                            slots: item.value,
                                            time: "AM",
                                        })}
                                    </View>
                                ))}
                            </>
                        }
                        data={[]}
                        renderItem={() => <></>}
                        keyExtractor={(index) => __generateRandomString(10)}
                        numColumns={3}
                        ListFooterComponent={<></>}
                        contentContainerStyle={{
                            paddingHorizontal: Sizes.fixPadding,
                            paddingBottom: book
                                ? Sizes.fixPadding * 8.0
                                : Sizes.fixPadding * 2.0,
                        }}
                    />
                    {bookingInfo()}
                </View>
            }
        </View>
    );

    function bookingInfo() {
        return book && selectedDate ? (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    // onPress={() =>
                    //     navigation.navigate("Payment", {
                    //         billing: route?.params?.billing,
                    //         shipping: route?.params?.shipping
                    //             ? route?.params?.shipping
                    //             : route?.params?.billing,
                    //         slot: selectedSlot,
                    //         deliveryDate: selectedDate,
                    //     })
                    // }
                    style={{
                        ...styles.payNowButtonStyle,
                        backgroundColor: Colors.primaryColor,
                    }}
                >
                    <Text style={{ ...Fonts.whiteColor14Bold }}>NEXT</Text>
                </TouchableOpacity>
            </View>
        ) : null;
    }

    function calander() {
        return (
            <View>
                <View style={{}}>
                    <CalendarStrip
                        style={{
                            height: 100,
                            paddingTop: Sizes.fixPadding * 2.0,
                            paddingBottom: Sizes.fixPadding,
                        }}
                        highlightDateContainerStyle={{
                            backgroundColor: Colors.primaryColor,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        dateNumberStyle={{ color: "black", fontSize: 17.0 }}
                        dateNameStyle={{ color: "black", fontSize: 15.0 }}
                        highlightDateNameStyle={{
                            color: "white",
                            fontSize: 15.0,
                        }}
                        highlightDateNumberStyle={{
                            color: "white",
                            fontSize: 17.0,
                        }}
                        datesBlacklist={datesBlacklistFunc}
                        disabledDateOpacity={0.6}
                        disabledDateNameStyle={{
                            color: "gray",
                            fontSize: 15.0,
                        }}
                        disabledDateNumberStyle={{
                            color: "gray",
                            fontSize: 17.0,
                        }}
                        useIsoWeekday={false}
                        scrollable={true}
                        upperCaseDays={false}
                        styleWeekend={true}
                        onDateSelected={setselectedDate}
                        selectedDate={selectedDate}
                    />
                </View>
            </View>
        );
    }

    function divider() {
        return <View style={styles.dividerStyle}></View>;
    }

    function slotsInfo({ image, data, name }) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: Sizes.fixPadding * 2.0,
                }}
            >
                <Image
                    source={image}
                    style={{ height: 40.0, width: 40.0 }}
                    resizeMode="contain"
                />
                <Text
                    style={{
                        ...Fonts.black18Bold,
                        marginLeft: Sizes.fixPadding,
                    }}
                >
                    {data.length} Slots
                </Text>
                <Text
                    style={{
                        ...Fonts.black18Bold,
                        marginLeft: Sizes.fixPadding,
                    }}
                >
                    {name}
                </Text>
            </View>
        );
    }

    function slotsTime({ slots, time }) {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => {
                        setSelectedSlot(`${item.uid}`);
                        setBook(true);
                    }}
                >
                    <View
                        style={{
                            backgroundColor:
                                selectedSlot == `${item.uid}`
                                    ? Colors.primaryColor
                                    : "white",
                            borderColor:
                                selectedSlot == `${item.uid}`
                                    ? Colors.primaryColor
                                    : "#CDCDCD",
                            ...styles.slotContainerStyle,
                        }}
                    >
                        <Text
                            style={
                                selectedSlot == `${item.uid}`
                                    ? {
                                          ...Fonts.whiteColor13Bold,
                                          textAlign: "center",
                                      }
                                    : {
                                          ...Fonts.primaryColor13SemiBold,
                                          textAlign: "center",
                                      }
                            }
                        >
                            {item.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        };

        return (
            <View>
                <FlatList
                    data={slots}
                    keyExtractor={(index) => `${index}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    numColumns={2}
                    contentContainerStyle={{
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                    }}
                />
            </View>
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
                    Time Slots
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
    doctorImageContainerStyle: {
        height: 90.0,
        width: 90.0,
        borderRadius: 45.0,
        backgroundColor: "white",
        borderColor: "#B3BCFC",
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 3.0,
        shadowColor: Colors.primaryColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
        elevation: 20.0,
        overflow: "hidden",
    },
    slotContainerStyle: {
        alignItems: "center",
        borderRadius: Sizes.fixPadding,
        alignItems: "center",
        marginBottom: Sizes.fixPadding * 2.0,
        justifyContent: "center",
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding * 2.0,
        minHeight: 45.0,
        minWidth: 100.0,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    bookButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: Sizes.fixPadding + 5.0,
    },
    bookNowContainerStyle: {
        backgroundColor: "white",
        height: 75.0,
        position: "absolute",
        bottom: 0.0,
        width: "100%",
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: "center",
    },
    dividerStyle: {
        backgroundColor: Colors.lightGray,
        height: 0.9,
        width: "100%",
        marginBottom: Sizes.fixPadding,
    },
    payNowButtonStyle: {
        flex: 1,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
});

export default TimeSlotScreen;
