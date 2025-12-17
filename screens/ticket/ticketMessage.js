import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { __formatDate } from "../../utils/funtion";
import {
    __makeCreateTicketPostRequest,
    __makeGetTicketMessageGetRequest,
} from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const messagesData = [];

const TicketMessage = ({ navigation, route }) => {
    const [messagesList, setMessagesList] = useState(messagesData);

    const details = route.params.item;

    const __handleGetticketsMessage = () => {
        AsyncStorage.getItem("token")
            .then((data) => {
                __makeGetTicketMessageGetRequest(data, details?._id)
                    .then((res) => {
                        console.log(JSON.stringify(res));
                        setMessagesList(res?.ticketList);
                    })
                    .catch((error) => {
                        console.error(error);
                        setMessagesList([]);
                    });
            })
            .catch((error) => {
                console.error(error);
                setMessagesList([]);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            __handleGetticketsMessage();
        }, 200);
    }, []);

    function messages() {
        const renderItem = ({ item }) => {
            return (
                <View
                    style={{
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        marginVertical: Sizes.fixPadding,
                        borderTopWidth: 1,
                        borderColor: "rgba(0,0,0,0.2 )",
                    }}
                >
                    <View
                        style={{
                            ...styles.messageWrapStyle,
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor14Regular,
                                textAlign: "center",
                            }}
                        >
                            {item.subject}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "right",
                                    ...Fonts.grayColor14Medium,
                                    fontSize: 10,
                                    marginTop: 10,
                                }}
                            >
                                {__formatDate(item.createdAt)}
                            </Text>
                            <Text
                                style={{
                                    textAlign: "right",
                                    ...Fonts.grayColor14Medium,
                                    fontSize: 10,
                                    marginTop: 10,
                                }}
                            >
                                Status: {item.status}
                            </Text>
                        </View>
                    </View>
                </View>
            );
        };

        return (
            <FlatList
                inverted
                data={messagesList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: Sizes.fixPadding * 2.0,
                    flexDirection: "column-reverse",
                }}
            />
        );
    }

    function addMessage({ message }) {
        AsyncStorage.getItem("token")
            .then((data) => {
                __makeCreateTicketPostRequest(
                    {
                        ticket_id: details?._id,
                        subject: message,
                    },
                    data
                )
                    .then((res) => {
                        console.log(JSON.stringify(res));
                        __handleGetticketsMessage();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function typeMessage() {
        const [message, setMessage] = useState("");
        return (
            <View style={styles.bottomContainerStyle}>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.whiteColor}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Write your message"
                        style={{ ...Fonts.whiteColor12Medium, flex: 1 }}
                        placeholderTextColor={Colors.whiteColor}
                    />
                    <MaterialCommunityIcons
                        name="send"
                        size={25}
                        color={Colors.whiteColor}
                        onPress={() => {
                            if (message != "") {
                                addMessage({ message: message });
                                setMessage("");
                            }
                        }}
                    />
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}
        >
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <View style={{ flex: 1 }}>
                    {messages()}
                    {typeMessage()}
                </View>
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
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text style={{ ...Fonts.blackColor18Bold }}>
                        {details.subject}
                    </Text>
                    <Text
                        style={{ ...Fonts.grayColor14Medium, fontSize: 11 }}
                        numberOfLines={2}
                    >
                        {details.details}
                    </Text>
                </View>
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
    messageWrapStyle: {
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 6.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    bottomContainerStyle: {
        flexDirection: "row",
        marginBottom: Sizes.fixPadding,
        alignItems: "center",
        marginHorizontal: Sizes.fixPadding,
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        height: 50.0,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: Sizes.fixPadding,
    },
    propertyImageContentStyle: {
        borderRadius: Sizes.fixPadding,
        height: 160.0,
        width: 130.0,
        backgroundColor: Colors.whiteColor,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 50,
        borderColor: "rgba(128, 128, 128, 0.2)",
        borderWidth: 1.5,
        elevation: 3.0,
    },
    viewMoreButtonStyle: {
        height: 31.0,
        width: 95.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomSheetContentStyle: {
        flexDirection: "row",
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0,
    },
});

export default TicketMessage;
