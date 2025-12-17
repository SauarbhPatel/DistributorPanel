import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { __formatDate, __generateRandomString } from "../../utils/funtion";
import { Dialog } from "@rneui/themed";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    __makeCreateTicketPostRequest,
    __makeGetTicketGetRequest,
} from "../../utils/api";
import Loader from "../../components/loader";
import { useEffect } from "react";
import { getLocalizedString } from "../../utils/language/localizationService";
import { Alert } from "react-native";
const { width } = Dimensions.get("window");

const TikectScreen = ({ navigation }) => {
    const [logoutDialog, setLogoutDialog] = useState(false);
    const [chatsDataList, setchatsDataList] = useState(null);

    const [state, setstate] = useState({
        subject: "",
        details: "",
        priority: "",
        department: "",
        image: "",
        loading: false,
    });
    const { subject, details, priority, department, image, loading } = state;

    const UpdateState = (data) => setstate((prv) => ({ ...prv, ...data }));

    const __handleCreateticket = () => {
        UpdateState({ loading: true });
        AsyncStorage.getItem("token")
            .then((data) => {
                if (!data) {
                    return Alert.alert(
                        "",
                        "You are not Login. Please login first."
                    );
                }
                __makeCreateTicketPostRequest(
                    {
                        subject: subject,
                        details: details,
                        priority: priority,
                        department: department,
                    },
                    data
                )
                    .then((res) => {
                        console.log(JSON.stringify(res));
                        __handleGetticket();
                        UpdateState({
                            loading: false,
                            subject: "",
                            details: "",
                            priority: "",
                            department: "",
                        });
                        setLogoutDialog(false);
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
    const __handleGetticket = () => {
        AsyncStorage.getItem("token")
            .then((data) => {
                if (!data) {
                    setchatsDataList([]);
                    return Alert.alert(
                        "",
                        "You are not Login. Please login first."
                    );
                }
                __makeGetTicketGetRequest(data)
                    .then((res) => {
                        console.log(JSON.stringify(res));
                        setchatsDataList(res);
                    })
                    .catch((error) => {
                        console.error(error);
                        setchatsDataList([]);
                    });
            })
            .catch((error) => {
                console.error(error);
                setchatsDataList([]);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            __handleGetticket();
        }, 200);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {chats()}
            </View>
            {logoutInfo()}
        </SafeAreaView>
    );
    function logoutInfo() {
        return (
            <Dialog
                visible={logoutDialog}
                onRequestClose={() => {
                    setLogoutDialog(false);
                }}
                overlayStyle={styles.dialogWrapStyle}
            >
                {loading && <Loader />}
                <View style={{ backgroundColor: Colors.whiteColor }}>
                    <Text
                        style={{ ...Fonts.blackColor18Bold, marginBottom: 10 }}
                    >
                        Create a Ticket
                    </Text>
                    <TextInput
                        mode="outlined"
                        label="Subject"
                        value={subject}
                        onChangeText={(text) => UpdateState({ subject: text })}
                        style={{ marginBottom: 10 }}
                    />

                    <Text
                        style={{
                            ...Fonts.grayColor14Medium,
                        }}
                    >
                        Priority
                    </Text>
                    <FlatList
                        data={["low", "high", "urgent", "top_urgent"]}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    UpdateState({ priority: item });
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
                                                : Colors.blackColor,
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
                                                : Colors.blackColor,
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
                    <Text
                        style={{
                            ...Fonts.grayColor14Medium,
                        }}
                    >
                        Department
                    </Text>
                    <FlatList
                        data={["sale", "purchase"]}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    UpdateState({ department: item });
                                }}
                                style={[
                                    styles.slotContainerStyle,
                                    {
                                        backgroundColor:
                                            department == item
                                                ? Colors.primaryColor
                                                : Colors.whiteColor,
                                        borderColor:
                                            department == item
                                                ? Colors.primaryColor
                                                : Colors.blackColor,
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        ...Fonts.blackColor13Bold,
                                        textTransform: "uppercase",
                                        color:
                                            department == item
                                                ? Colors.whiteColor
                                                : Colors.blackColor,
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
                    <TextInput
                        mode="outlined"
                        label="Provide a detailed description"
                        value={details}
                        onChangeText={(text) => UpdateState({ details: text })}
                        style={{ marginBottom: 10 }}
                    />
                    <View style={styles.closeAndLogoutTextWrapStyle}>
                        <Text
                            onPress={() => setLogoutDialog(false)}
                            style={{ ...Fonts.primaryColor13SemiBold }}
                        >
                            Close
                        </Text>
                        <Text
                            onPress={() => {
                                __handleCreateticket();
                            }}
                            style={{
                                marginLeft: Sizes.fixPadding * 2.0,
                                ...Fonts.primaryColor13SemiBold,
                            }}
                        >
                            Create
                        </Text>
                    </View>
                </View>
            </Dialog>
        );
    }

    function chats() {
        const renderItem = ({ item }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        navigation.push("TicketMessage", { item: item })
                    }
                    style={{
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                numberOfLines={1}
                                style={{ ...Fonts.blackColor13Bold }}
                            >
                                {item.subject}
                            </Text>
                            <Text style={{ ...Fonts.blackColor11Medium }}>
                                {__formatDate(item.updatedAt)}
                            </Text>
                        </View>
                    </View>

                    <Text
                        style={{
                            ...Fonts.grayColor14Medium,
                            fontSize: 10,
                            marginTop: 10,
                        }}
                    >
                        {item.details}
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        height: 1.0,
                        marginVertical: Sizes.fixPadding,
                        backgroundColor: Colors.grayColor,
                    }}
                />
            </View>
        );
        return (
            <FlatList
                data={chatsDataList}
                keyExtractor={(item) => __generateRandomString(10)}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding + 5.0 }}
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
                    {getLocalizedString("Support Ticket")}
                </Text>
                <MaterialIcons
                    name="add"
                    color={Colors.blackColor}
                    size={30}
                    onPress={() => setLogoutDialog(true)}
                    style={{
                        position: "absolute",
                        right: Sizes.fixPadding + 5.0,
                    }}
                />
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
    replacementProcessForOrderInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        margin: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        elevation: 3.0,
    },
    addDeliveryAddressToAccountInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        elevation: 3.0,
    },
    returnAndExchangeItemInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        margin: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        elevation: 3.0,
    },
    trainerImageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
    },
    logoutTextStyle: {
        marginTop: Sizes.fixPadding - 7.0,
        lineHeight: 18.0,
        textAlign: "center",
        ...Fonts.blackColor16SemiBold,
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
    appIconBackgroundStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: "center",
        justifyContent: "center",
        height: 200.0,
        marginBottom: Sizes.fixPadding - 5.0,
    },
    drawerItemWrapStyle: {
        marginVertical: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding + 5.0,
        flexDirection: "row",
        alignItems: "center",
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

export default TikectScreen;
