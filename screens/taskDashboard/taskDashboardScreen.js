import { SafeAreaView, View, StatusBar, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
    Feather,
    FontAwesome,
    FontAwesome5,
    MaterialIcons,
} from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { __generateRandomString } from "../../utils/funtion";
import { TouchableOpacity } from "react-native";
import { __makeGetBlogGetRequest } from "../../utils/api";
import { useState } from "react";
import { TextAreaBox } from "../../modules";
import CreateDocuments from "../../components/taskDashboard/CreateDocuments";
import FilterCard from "../../components/taskDashboard/FilterCard";

const TaskDashboardScreen = ({ navigation }) => {
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}

                <FilterCard />

                <FlatList
                    data={list}
                    renderItem={CardBox}
                    keyExtractor={() => __generateRandomString(10)}
                    contentContainerStyle={{
                        gap: 10,
                        paddingTop: 10,
                        paddingBottom: 20,
                    }}
                />
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
                <Text
                    style={{
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.blackColor18Bold,
                        flex: 1,
                    }}
                >
                    Task Dashboard
                </Text>
                <CreateDocuments navigation={navigation} />
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

export default TaskDashboardScreen;

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
