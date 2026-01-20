import { SafeAreaView, View, StatusBar, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
    AntDesign,
    Feather,
    MaterialDesignIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { __generateRandomString } from "../../utils/funtion";
import { TouchableOpacity } from "react-native";
import { __makeGetBlogGetRequest } from "../../utils/api";
import { useState } from "react";
import FilterCard from "../../components/taskDashboard/FilterCard";
import CommonHeader from "../../components/common/CommonHeader";
import SingleSelectTab from "../../components/common/SingleSelectTab";
import Received from "../../components/approvals/Received";
import Log from "../../components/approvals/Log";

const ApprovalsScreen = ({ navigation }) => {
    const [list, setlist] = useState([
        {
            companyName: "Surya Demo Supplier",
            city: "Aurangabad, BADDI, Bangalore...",
            category: "Supplier",
        },
        {
            companyName: "Merc Demo Buyer",
            city: "ANKLESHWAR, Agra, Ahmedabad...",
            category: "Buyer",
        },
    ]);
    const [state, setState] = useState({
        loading: false,
        active: "Received",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { loading, active } = state;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <CommonHeader title={"Approvals"} navigation={navigation} />
                <View
                    style={{
                        backgroundColor: Colors.whiteColor,
                        padding: 10,
                        paddingHorizontal: 0,
                        paddingBottom: 0,
                    }}
                >
                    <SingleSelectTab
                        list={[
                            {
                                id: "Received",
                                name: "Received",
                            },
                            { id: "Sent", name: "Sent" },
                            { id: "Logs", name: "Logs" },
                            { id: "Approval Rules", name: "Approval Rules" },
                        ]}
                        onPress={(id) => {
                            updateState({ active: id });
                        }}
                        active={active}
                        tabType={2}
                    />
                </View>
                <FilterCard />

                {active == "Received" && (
                    <Received lable={"Received Requests"} />
                )}
                {active == "Sent" && <Received lable={"Sent Requests"} />}
                {active == "Logs" && <Log lable={"Request Logs"} />}
                {/* <FlatList
                    ListHeaderComponent={
                        <View style={{ padding: 0 }}>
                            <Text
                                style={{
                                    ...Fonts.blackColor15Bold,
                                    paddingStart: 10,
                                }}
                            >
                                All Received Requests
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 10,
                                    paddingHorizontal: 10,
                                    marginTop: 10,
                                }}
                            >
                                <ButtonBox
                                    name="Approved"
                                    bdColor={Colors.darkGreenColor}
                                    bgColor={"rgba(40, 201, 0, 0.18)"}
                                    icon={
                                        <Feather
                                            name="credit-card"
                                            style={{ opacity: 2 }}
                                            size={22}
                                            color={Colors.darkGreenColor}
                                        />
                                    }
                                />
                                <ButtonBox
                                    name="Reject"
                                    bdColor={Colors.redColor}
                                    bgColor={"#e6000032"}
                                    icon={
                                        <MaterialIcons
                                            name="perm-phone-msg"
                                            style={{ opacity: 2 }}
                                            size={22}
                                            color={Colors.redColor}
                                        />
                                    }
                                />
                            </View>
                            <Text
                                style={{
                                    ...Fonts.blackColor15Bold,
                                    paddingStart: 10,
                                    marginTop: 10,
                                }}
                            >
                                Pending Received Request
                            </Text>
                            <Text
                                style={{
                                    ...Fonts.blackColor11Medium,
                                    paddingStart: 10,
                                    color: Colors.lightGrayColor,
                                }}
                            >
                                Showing requests from all users and all document
                                types
                            </Text>

                            <View
                                style={{
                                    height: 200,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        ...Fonts.blackColor13SemiBold,
                                        paddingStart: 10,
                                        color: Colors.grayColor,
                                        textAlign: "center",
                                    }}
                                >
                                    No Data Available
                                </Text>
                            </View>
                        </View>
                    }
                    contentContainerStyle={{
                        gap: 10,
                        paddingTop: 10,
                        paddingBottom: 20,
                    }}
                /> */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    returnAndExchangeItemInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding * 1.5,
        borderWidth: 1.5,
        borderColor: Colors.borderColor,
    },
});

export default ApprovalsScreen;
const ButtonBox = ({ name, bdColor, icon, bgColor }) => {
    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: bdColor,
                padding: 10,
                flex: 1,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                backgroundColor: Colors.whiteColor,
            }}
        >
            <View
                style={{
                    width: 35,
                    height: 35,
                    backgroundColor: bgColor,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View>{icon}</View>
            </View>
            <Text style={{ ...Fonts.blackColor13SemiBold, color: bdColor }}>
                {name}
            </Text>
        </View>
    );
};

const CardBox = ({}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.returnAndExchangeItemInfoWrapStyle}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderStartWidth: 2,
                    paddingStart: 10,
                    borderColor: "orange",
                }}
            >
                <View style={{ gap: 5, flex: 1 }}>
                    <Text style={{ ...Fonts.blackColor13SemiBold }}>Test</Text>

                    <View
                        style={{
                            flexDirection: "row",
                            gap: 5,
                            backgroundColor: "#e1fedaff",
                            padding: 2,
                            paddingHorizontal: 10,
                            alignSelf: "flex-start",
                            borderRadius: 10,
                        }}
                    >
                        <Feather
                            name="arrow-down-left"
                            color={Colors.lightGrayColor}
                            size={16}
                        />
                        <Text
                            style={{
                                ...Fonts.blackColor12Medium,
                                color: Colors.lightGrayColor,
                            }}
                        >
                            Abdul
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: Colors.bodyColor,
                        borderRadius: 5,
                        width: 20,
                        height: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1.5,
                    }}
                ></View>
            </View>
        </TouchableOpacity>
    );
};

// export default ApprovalsScreen;
