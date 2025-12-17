import React, { useState } from "react";
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
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";

const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [emailFocus, setEmailFocus] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: Sizes.fixPadding * 10.0,
                    }}
                >
                    {appLogo()}
                    {resetPasswordInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    );

    function resetPasswordInfo() {
        return (
            <View style={styles.resetPasswordInfoWrapStyle}>
                {emailTextField()}
                {resetPasswordButton()}
            </View>
        );
    }

    function resetPasswordButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push("Home")}
                style={styles.resetPasswordButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor15Bold }}>
                    RESET PASSWORD
                </Text>
            </TouchableOpacity>
        );
    }

    function emailTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
                    name="email"
                    color={emailFocus ? Colors.primaryColor : Colors.grayColor}
                    size={24}
                />
                <TextInput
                    selectionColor={Colors.primaryColor}
                    placeholder="Enter Registered Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    style={{
                        flex: 1,
                        marginLeft: Sizes.fixPadding,
                        ...Fonts.blackColor15Medium,
                    }}
                />
            </View>
        );
    }

    function appLogo() {
        return (
            <Image
                source={require("../../assets/images/baofeng_radios.png")}
                style={{ width: 80.0, height: 80.0, alignSelf: "center" }}
                resizeMode="contain"
            />
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
    textFieldWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEEEEE",
        borderRadius: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
    },
    resetPasswordButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.5,
        paddingVertical: Sizes.fixPadding + 2.0,
        paddingHorizontal: Sizes.fixPadding * 4.0,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        elevation: 10.0,
        marginVertical: Sizes.fixPadding + 10.0,
    },
    resetPasswordInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 2.5,
    },
});

export default ResetPasswordScreen;
