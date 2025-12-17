import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const CreateAccountScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [emailFocus, setEmailFocus] = useState(false);
    const [password, setPassword] = useState(null);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [username, setUsername] = useState(null);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState(null);
    const [repeatPaswordFocus, setRepeatPasswordFocus] = useState(false);

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
                    {createAccountInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    );

    function createAccountInfo() {
        return (
            <View style={styles.createAccountInfoWrapStyle}>
                {userNameTextField()}
                {emailTextField()}
                {passwordTextField()}
                {repeatPasswordTextField()}
                {createAccountButton()}
                <Text
                    onPress={() => navigation.push("Login")}
                    style={{
                        marginBottom: Sizes.fixPadding,
                        textAlign: "center",
                        ...Fonts.blackColor16Bold,
                    }}
                >
                    LOGIN
                </Text>
            </View>
        );
    }

    function createAccountButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push("ResetPassword")}
                style={styles.createAccountButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor15Bold }}>
                    CREATE ACCOUNT
                </Text>
            </TouchableOpacity>
        );
    }

    function repeatPasswordTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <MaterialCommunityIcons
                    name="shield-check"
                    color={
                        repeatPaswordFocus
                            ? Colors.primaryColor
                            : Colors.grayColor
                    }
                    size={24}
                />
                <TextInput
                    secureTextEntry={true}
                    selectionColor={Colors.primaryColor}
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChangeText={(text) => setRepeatPassword(text)}
                    onFocus={() => setRepeatPasswordFocus(true)}
                    onBlur={() => setRepeatPasswordFocus(false)}
                    style={{
                        flex: 1,
                        marginLeft: Sizes.fixPadding,
                        ...Fonts.blackColor15Medium,
                    }}
                />
            </View>
        );
    }

    function userNameTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
                    name="person"
                    color={
                        usernameFocus ? Colors.primaryColor : Colors.grayColor
                    }
                    size={24}
                />
                <TextInput
                    selectionColor={Colors.primaryColor}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    style={{
                        flex: 1,
                        marginLeft: Sizes.fixPadding,
                        ...Fonts.blackColor15Medium,
                    }}
                />
            </View>
        );
    }

    function passwordTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
                    name="vpn-key"
                    color={
                        passwordFocus ? Colors.primaryColor : Colors.grayColor
                    }
                    size={24}
                />
                <TextInput
                    secureTextEntry={true}
                    selectionColor={Colors.primaryColor}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    style={{
                        flex: 1,
                        marginLeft: Sizes.fixPadding,
                        ...Fonts.blackColor15Medium,
                    }}
                    onSubmitEditing={() => {}}
                />
            </View>
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
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    style={{
                        flex: 1,
                        marginLeft: Sizes.fixPadding,
                        ...Fonts.blackColor15Medium,
                    }}
                    keyboardType="email-address"
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
    createAccountButtonStyle: {
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
    createAccountInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 2.5,
    },
});

export default CreateAccountScreen;
