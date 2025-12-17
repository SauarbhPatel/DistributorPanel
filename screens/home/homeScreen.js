import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

import {
    __generateRandomString,
    __getRendomColor,
    __splitProductAndVarianat,
} from "../../utils/funtion";
import { __makeProductsGetRequest } from "../../utils/api";
import OverviewFilterCard from "../../components/home/OverviewFilterCard";
import SalesData from "../../components/home/SalesData";
import HomeFooter from "../../components/home/HomeFooter";
import ShippingData from "../../components/home/ShippingData";
import ReportsData from "../../components/home/ReportsData";
import CustomersData from "../../components/home/CustomersData";

const HomeScreen = ({ navigation, route }) => {
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

    const [backClickCount, setBackClickCount] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            <OverviewFilterCard
                                activeIndex={activeIndex}
                                onChangeIndex={setActiveIndex}
                            />

                            {activeIndex == 0 && <SalesData />}
                            {activeIndex == 1 && <ShippingData />}
                            {activeIndex == 2 && <CustomersData />}
                            {activeIndex == 3 && <ReportsData />}
                        </>
                    }
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 5.0,
                    }}
                    showsVerticalScrollIndicator={false}
                />
                <HomeFooter
                    activeIndex={activeIndex}
                    onChangeIndex={setActiveIndex}
                />
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

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1.5,
                    }}
                >
                    <MaterialIcons
                        name="menu"
                        size={25}
                        color="black"
                        style={{ marginRight: Sizes.fixPadding * 2.0 }}
                        onPress={() => navigation.openDrawer()}
                    />
                    <Image
                        source={require("../../assets/images/baofeng_radios.png")}
                        style={{ width: 120.0, height: 30.0 }}
                        resizeMode="contain"
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding + 1.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        elevation: 2.0,
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

export default HomeScreen;
