import React from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";

const AboutAppScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {aboutApp()}
            </View>
        </SafeAreaView>
    );

    function aboutApp() {
        return (
            <View style={{ margin: Sizes.fixPadding + 5.0 }}>
                <Text style={{ ...Fonts.blackColor17SemiBold }}>
                    LetsMeatz App UI in React Native
                </Text>
                <Text
                    style={{
                        marginVertical: Sizes.fixPadding - 2.0,
                        ...Fonts.lightGrayColor13Medium,
                    }}
                >
                    LetsMeatz is a multipurpose ecommerce app ui template.
                    LetsMeatz is built in React Native.React Native is a Hybrid
                    App Development Platform. So, LetsMeatz Compatible with
                    Android and iOs both.
                </Text>
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding - 2.0,
                        ...Fonts.lightGrayColor13Medium,
                    }}
                >
                    LetsMeatz is a developed by Render Code. We are expert React
                    Native developer team.
                </Text>
                <Text style={{ ...Fonts.blackColor13SemiBold }}>
                    Thanks for Installing our App
                </Text>
                <View style={{ backgroundColor: "#cccccc", height: 0.5 }} />
                <Text
                    style={{
                        marginVertical: Sizes.fixPadding - 2.0,
                        ...Fonts.blueColor13SemiBold,
                    }}
                >
                    render_code
                </Text>
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
                    ABOUT LetsMeatz APP
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
});

export default AboutAppScreen;
