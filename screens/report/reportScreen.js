import { useState } from "react";
import {
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    View,
    StatusBar,
    Image,
    StyleSheet,
    Text,
    FlatList,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Loader from "../../components/loader";
import {
    __makeLoginPostRequest,
    __verifyLoginPostRequest,
} from "../../utils/api";
import { __setLocalStorageData } from "../../utils/localStorage";
import { __setLocalization, __setToken } from "../../utils/localization";
import CommonHeader from "../../components/common/CommonHeader";
import MainCards from "../../components/kyc/MainCards";
import { __generateRandomString } from "../../utils/funtion";
import MostUsed from "../../components/report/MostUsed";
import Sales from "../../components/report/Sales";
import Purchase from "../../components/report/Purchase";

const ReportScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const [activeForm, setActiveForm] = useState(0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            {loading && <Loader />}
            <View style={{ flex: 1 }}>
                <CommonHeader title={"Reports"} />

                <FlatList
                    data={[
                        {
                            sr_no: "1",
                            title: "Most Used",
                            inputForm: <MostUsed navigation={navigation} />,
                        },
                        {
                            sr_no: "2",
                            title: "Sales",
                            inputForm: <Sales />,
                        },
                        {
                            sr_no: "3",
                            title: "Purchase",
                            inputForm: <Purchase />,
                        },
                        {
                            sr_no: "4",
                            title: "Products & Services",
                        },
                        {
                            sr_no: "5",
                            title: "Store",
                        },
                        {
                            sr_no: "6",
                            title: "Quality",
                        },
                        {
                            sr_no: "7",
                            title: "Dispatch",
                        },
                        {
                            sr_no: "8",
                            title: "Sub-Contract",
                        },
                        {
                            sr_no: "9",
                            title: "General",
                        },
                        {
                            sr_no: "10",
                            title: "Production",
                        },
                        {
                            sr_no: "11",
                            title: "Accounts",
                        },
                        {
                            sr_no: "12",
                            title: "GST",
                        },
                    ]}
                    renderItem={({ item, index }) => (
                        <MainCards
                            {...item}
                            isActive={index === activeForm}
                            onPress={() => setActiveForm(index)}
                        />
                    )}
                    keyExtractor={() => __generateRandomString(5)}
                    contentContainerStyle={{
                        gap: 10,
                        paddingTop: Sizes.fixPadding * 1.0,
                        paddingBottom: Sizes.fixPadding * 2.0,
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default ReportScreen;
