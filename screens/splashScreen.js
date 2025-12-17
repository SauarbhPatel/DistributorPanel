import { useEffect } from "react";
import { SafeAreaView, View, StatusBar, Image } from "react-native";
import { Colors, Sizes } from "../constants/styles";
import { Bounce } from "react-native-animated-spinkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { __setLocalization, __setToken } from "../utils/localization";
import { __getLocalStorageData } from "../utils/localStorage";

const SplashScreen = ({ navigation }) => {
    // const backAction = () => {
    //     BackHandler.exitApp();
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

    const checkLogin = async () => {
        const data = await __getLocalStorageData("login");
        if (data) {
            const login = JSON.parse(data);
            __setLocalization(login);
            __setToken(login.token);
            setTimeout(() => {
                navigation.push("Home");
            }, 2000);
        } else {
            setTimeout(() => {
                navigation.push("Login");
            }, 2000);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {appLogo()}
                <Bounce
                    size={48}
                    color={Colors.primaryColor}
                    style={{
                        marginTop: Sizes.fixPadding * 3.0,
                    }}
                />
            </View>
        </SafeAreaView>
    );

    function appLogo() {
        return (
            <Image
                source={require("../assets/images/baofeng_radios.png")}
                style={{ width: 120.0, height: 120.0 }}
                resizeMode="contain"
            />
        );
    }
};

export default SplashScreen;
