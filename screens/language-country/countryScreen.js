import React from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import {
    __makeChangeCountryPutRequest,
    __makeCountryGetRequest,
    __makeCurrentCountryGetRequest,
} from "../../utils/api";
import { useEffect } from "react";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { __generateRandomString } from "../../utils/funtion";
import Loader from "../../components/loader";
import { getLocalizedString } from "../../utils/language/localizationService";

const CountryScreen = ({ navigation }) => {
    const [language, setlanguage] = useState(null);
    const [selectedCountryId, setselectedCountryId] = useState(null);
    const [loading, setloading] = useState(false);

    const __handleGetCurrentLanguage = () => {
        __makeCurrentCountryGetRequest()
            .then((res) => {
                console.log(res);
                res?.country && setselectedCountryId(res.country);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const __handleGetLanguage = () => {
        __makeCountryGetRequest()
            .then((res) => {
                console.log(res);
                setlanguage(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const __handleChangeLanguage = (data) => {
        setloading(true);
        __makeChangeCountryPutRequest(data)
            .then((res) => {
                console.log(res);
                setloading(false);

                navigation.push("Home");
            })
            .catch((error) => {
                console.error(error);
                setloading(false);
            });
    };
    useEffect(() => {
        setTimeout(() => {
            __handleGetLanguage();
            __handleGetCurrentLanguage();
        }, 200);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            {loading && <Loader />}
            <View style={{ flex: 1 }}>
                {header()}

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginBottom: Sizes.fixPadding * 4.0 }} />
                    {paymentOptions()}
                </ScrollView>
            </View>
        </SafeAreaView>
    );

    function paymentOptions() {
        return language?.map((item, index) => (
            <View key={__generateRandomString(10)}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setselectedCountryId(item._id);
                        __handleChangeLanguage({ id: item._id });
                    }}
                    style={{ marginHorizontal: Sizes.fixPadding + 5.0 }}
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
                                        selectedCountryId == item._id
                                            ? Colors.blueColor
                                            : Colors.lightGrayColor,
                                }}
                            >
                                {selectedCountryId == item._id ? (
                                    <View
                                        style={styles.radioButtonInnerStyle}
                                    />
                                ) : null}
                            </View>
                            <Text
                                style={{
                                    marginLeft: Sizes.fixPadding + 5.0,
                                    ...Fonts.blackColor16SemiBold,
                                }}
                            >
                                {item.name}
                            </Text>
                        </View>
                    </View>
                    {language.length - 1 == index ? null : (
                        <View
                            style={{
                                backgroundColor: "#e0e0e0",
                                height: 1.0,
                                marginVertical: Sizes.fixPadding + 10.0,
                            }}
                        />
                    )}
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
                    {getLocalizedString("Change Country")}
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
    paymentOptionsWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
        marginHorizontal: Sizes.fixPadding * 2.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export default CountryScreen;
