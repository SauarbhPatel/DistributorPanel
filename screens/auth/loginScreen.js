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

const LoginScreen = ({ navigation }) => {
    // const backAction = () => {
    //     backClickCount == 1 ? BackHandler.exitApp() : _spring();
    //     return true;
    // };

    // useFocusEffect(
    //     useCallback(() => {
    //         BackHandler.addEventListener("hardwareBackPress", backAction);
    //         return () =>
    //             BackHandler.removeEventListener(
    //                 "hardwareBackPress",
    //                 backAction
    //             );
    //     }, [backAction])
    // );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000);
    }

    const [phone, setPhone] = useState("9669233736");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isShowOtp, setIsShowOtp] = useState(false);

    const [phoneFocus, setPhoneFocus] = useState(false);
    const [password, setPassword] = useState("1234");
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [backClickCount, setBackClickCount] = useState(0);
    const [error, setError] = useState("");

    const __handleConnfirmCode = () => {
        setError(null);
        if (password?.length != 4) {
            return setError("Please Enter Valid OTP");
        }
        navigation.push("KycScreen");
        return;
        setLoading(true);

        __verifyLoginPostRequest({
            mobileNumber: phone,
            countryCode: "+91",
            browser: "",
            long: "",
            lat: "",
            address: "",
            platform: "Android",
            mobile: phone,
            otp: password,
            user_id: user,
        })
            .then(async (res) => {
                console.log(JSON.stringify(res));
                if (res.error) {
                    setError(res.message);
                } else {
                    await __setLocalStorageData("token", res.token);
                    await __setLocalStorageData("login", res);
                    __setLocalization(res);
                    __setToken(res.token);

                    navigation.push("Home");
                }

                setLoading(false);
            })
            .catch((error) => {
                setError("Login failed");
                setLoading(false);
            });
    };

    const __handleLogin = () => {
        setError(null);
        if (phone.length != 10) {
            return setError("Please Enter Valid Number");
        }
        setIsShowOtp(true);
        return;
        setLoading(true);

        __makeLoginPostRequest({
            countryCode: "+91",
            // mobile: "+91" + phone,
            mobile: phone,
        })
            .then((res) => {
                console.log(JSON.stringify(res));
                if (res.error) {
                    setError(res.message);
                } else {
                    setIsShowOtp(true);
                    setUser(res.user);
                }

                setLoading(false);
            })
            .catch((error) => {
                setError("Login failed");
                setLoading(false);
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            {loading && <Loader />}
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: Sizes.fixPadding * 4.0,
                    }}
                >
                    {appLogo()}
                    {!isShowOtp && loginInfo()}
                    {isShowOtp && otpInfo()}
                </ScrollView>
            </View>
            {backClickCount == 1 ? (
                <View style={[styles.animatedView]}>
                    <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                        Press Back Once Again to Exit
                    </Text>
                </View>
            ) : null}
        </SafeAreaView>
    );

    function loginInfo() {
        return (
            <View style={styles.loginInfoWrapStyle}>
                <Text
                    style={{
                        ...Fonts.blackColor15Bold,
                        textAlign: "center",
                        paddingVertical: 10,
                        fontSize: 18,
                    }}
                >
                    Welcome to Distributor Panel 👋🏻
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor13Medium,
                        textAlign: "center",
                        paddingVertical: 10,
                        fontSize: 15,
                    }}
                >
                    Login to your account
                </Text>
                {phoneTextField()}
                {error && (
                    <Text
                        style={{
                            ...Fonts.blackColor12Medium,
                            color: "red",
                            fontSize: 12,
                            paddingLeft: 10,
                            marginTop: -5,
                        }}
                    >
                        {error}
                    </Text>
                )}
                {loginButton()}
            </View>
        );
    }
    function otpInfo() {
        return (
            <View style={styles.loginInfoWrapStyle}>
                <Text
                    style={{
                        ...Fonts.blackColor13Medium,
                        textAlign: "center",
                        paddingVertical: 10,
                        fontSize: 15,
                    }}
                >
                    Please Enter 4-digit Code Sent To Your Registered Mobile
                    Number !
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor16SemiBold,
                            textAlign: "center",
                            // paddingVertical: 10,
                            fontSize: 18,
                            color: Colors.primaryColor,
                        }}
                    >
                        +91 {phone}
                    </Text>
                    <AntDesign
                        name="edit"
                        color={Colors.blackColor}
                        size={22}
                        onPress={() => setIsShowOtp(false)}
                    />
                </View>

                {passwordTextField()}

                {verifyButton()}
                <Text
                    onPress={__handleLogin}
                    style={{
                        ...Fonts.blackColor16SemiBold,
                        textAlign: "center",
                        fontSize: 15,
                        color: Colors.primaryColor,
                        marginBottom: 20,
                        textDecorationLine: "underline",
                    }}
                >
                    Resend OTP
                </Text>
            </View>
        );
    }

    function loginButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => __handleLogin()}
                style={styles.loginButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor15Bold }}>LOGIN</Text>
            </TouchableOpacity>
        );
    }
    function verifyButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => __handleConnfirmCode()}
                style={styles.loginButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor15Bold }}>VERIFY</Text>
            </TouchableOpacity>
        );
    }

    function passwordTextField() {
        return (
            <>
                <View style={styles.textFieldWrapStyle}>
                    <MaterialIcons
                        name="vpn-key"
                        color={
                            passwordFocus
                                ? Colors.primaryColor
                                : Colors.grayColor
                        }
                        size={24}
                    />
                    <TextInput
                        // secureTextEntry={true}
                        selectionColor={Colors.primaryColor}
                        placeholder="otp"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        style={{
                            flex: 1,
                            marginLeft: Sizes.fixPadding,
                            ...Fonts.blackColor15Medium,
                        }}
                        keyboardType="number-pad"
                        autoComplete="tel"
                        maxLength={4}
                    />
                </View>
                {error && (
                    <Text
                        style={{
                            ...Fonts.blackColor12Medium,
                            color: "red",
                            fontSize: 12,
                            paddingLeft: 10,
                            marginTop: -5,
                        }}
                    >
                        {error}
                    </Text>
                )}
            </>
        );
    }

    function phoneTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <MaterialIcons
                    name="phone"
                    color={phoneFocus ? Colors.primaryColor : Colors.grayColor}
                    size={24}
                />
                <Text
                    style={{
                        ...Fonts.blackColor12Medium,
                        fontSize: 15,
                        marginEnd: -5,
                        marginStart: 5,
                    }}
                >
                    +91
                </Text>
                <TextInput
                    selectionColor={Colors.primaryColor}
                    placeholder="1234567890"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    onFocus={() => setPhoneFocus(true)}
                    onBlur={() => setPhoneFocus(false)}
                    style={{
                        flex: 1,
                        marginLeft: Sizes.fixPadding,
                        ...Fonts.blackColor15Medium,
                    }}
                    keyboardType="number-pad"
                    autoComplete="tel"
                    maxLength={10}
                />
            </View>
        );
    }

    function appLogo() {
        return (
            <Image
                // source={require("../../assets/images/baofeng_radios.png")}
                source={require("../../assets/dp_images/login.png")}
                style={{ width: 400.0, height: 300.0, alignSelf: "center" }}
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
        borderRadius: Sizes.fixPadding * 1.0,
        paddingVertical: Sizes.fixPadding - 3,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
    },
    loginButtonStyle: {
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
    loginInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        // elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 1.0,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 2.5,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default LoginScreen;

// {
//     "operationType": "signIn",
//     "credential": null,
//     "additionalUserInfo": {
//         "isNewUser": false,
//         "providerId": "phone",
//         "profile": {}
//     },
//     "user": {
//         "uid": "BWCKSKdNQiNqEice5vhQvpTQEat1",
//         "emailVerified": false,
//         "isAnonymous": false,
//         "phoneNumber": "+919669233736",
//         "providerData": [
//             {
//                 "providerId": "phone",
//                 "uid": "+919669233736",
//                 "displayName": null,
//                 "email": null,
//                 "phoneNumber": "+919669233736",
//                 "photoURL": null
//             }
//         ],
//         "stsTokenManager": {
//             "refreshToken": "AMf-vBzir9PMtyzd02jgknSW1j7-9S5Cz5AyBMlaPR6dwp01DPOBFRoiKcx4HYEyzF3vuVZJ8u42a6jVQIQSw1g-Oml_Ue1c3Wz5LS8bpKQmNL_ZHkiWsL7GHhXz8meWV-U2_MGUkywY7ypd99S8ppAZSbdJft8RZOLiiVJhnYW6n5pbYYmK72zSCDc6vgwelyComrpO7RaJ",
//             "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzZDA3YmJjM2Q3NWM2OTQyNzUxMGY2MTc0ZWIyZjE2NTQ3ZDRhN2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGV0c21lYXR6IiwiYXVkIjoibGV0c21lYXR6IiwiYXV0aF90aW1lIjoxNjk4MzEwNDkxLCJ1c2VyX2lkIjoiQldDS1NLZE5RaU5xRWljZTV2aFF2cFRRRWF0MSIsInN1YiI6IkJXQ0tTS2ROUWlOcUVpY2U1dmhRdnBUUUVhdDEiLCJpYXQiOjE2OTgzMTA0OTEsImV4cCI6MTY5ODMxNDA5MSwicGhvbmVfbnVtYmVyIjoiKzkxOTY2OTIzMzczNiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxOTY2OTIzMzczNiJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.DfG9tR2ARsO1zPyu5jhGdUpBV4oUscfm2k-d3RzHqbpXqEqfQ_1IZMTd77viz5Rm5fVFCejVLZkuaaU7LI6wOXzjIyTW4mHLWG6D2x7wSXU73W6yDTMifWRrJgMFdIT7lzpM-i0EWjdx40Nb12s3gjt1yABGSXblf1AAyx4nCEekAM90ngIQgoPvzWCGg6Wvh9OwjJhpz11-1YM3x9rYNrHz_5i2qm2At51EtA3DDhmfMSIYakd5c0KYMRWRVdxONVoZoENnn16ZX4xRqpTMl-St8uK9ENZAbKR1ETlm4hImksLOft-m16a8BC6XvCv3GhoZFR_stCdOkKW4FktaJA",
//             "expirationTime": 1698314092175
//         },
//         "createdAt": "1698309416003",
//         "lastLoginAt": "1698310491501",
//         "apiKey": "AIzaSyA1nszE_B-h4TDBN9IBTpZehnpjlG6_LrA",
//         "appName": "[DEFAULT]"
//     }
// }
