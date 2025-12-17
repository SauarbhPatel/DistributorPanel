import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        (async () => {
            await Font.loadAsync({
                Montserrat_Light: require("../assets/fonts/montserrat/Montserrat-Light.ttf"),
                Montserrat_Regular: require("../assets/fonts/montserrat/Montserrat-Regular.ttf"),
                Montserrat_Medium: require("../assets/fonts/montserrat/Montserrat-Medium.ttf"),
                Montserrat_SemiBold: require("../assets/fonts/montserrat/Montserrat-SemiBold.ttf"),
                Montserrat_Bold: require("../assets/fonts/montserrat/Montserrat-Bold.ttf"),
                Alatsi_Regular: require("../assets/fonts/Alatsi-Regular.ttf")
            });
            navigation.navigate('Splash');
        })();
    })

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        </View>
    )
}

export default LoadingScreen;


