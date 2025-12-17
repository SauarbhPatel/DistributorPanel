import React from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { __generateRandomString } from "../../utils/funtion";
import { useEffect } from "react";
import { useState } from "react";
import { __makeGetBlogDetailsGetRequest } from "../../utils/api";
import { Image } from "react-native";
const { width } = Dimensions.get("window");

const BlogListScreen = ({ navigation, route }) => {
    const [list, setlist] = useState([]);
    const __handleGetWishList = () => {
        __makeGetBlogDetailsGetRequest(route.params.uid)
            .then((res) => {
                console.log(res);
                setlist(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        setTimeout(() => {
            __handleGetWishList();
        }, 200);
    }, []);

    console.log(JSON.stringify(route.params));
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    data={list}
                    renderItem={({ item }) => (
                        <View style={styles.returnAndExchangeItemInfoWrapStyle}>
                            <Image
                                source={{ uri: item?.big_banner?.url }}
                                style={{
                                    height: width / 3.2,
                                    borderRadius: 10,
                                }}
                            />

                            <Text
                                style={{
                                    ...Fonts.blackColor12Medium,
                                    paddingVertical: 15,
                                }}
                            >
                                {item?.title?.trim()}
                            </Text>
                            <Text
                                style={{
                                    ...Fonts.blackColor13SemiBold,
                                    // paddingVertical: 15,
                                }}
                            >
                                {item?.description?.replace(/<[^>]*>/g, "")}
                            </Text>
                        </View>
                    )}
                    keyExtractor={() => __generateRandomString(10)}
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
                    }}
                >
                    Blog Details
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
    replacementProcessForOrderInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        margin: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        elevation: 3.0,
    },
    addDeliveryAddressToAccountInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        elevation: 3.0,
    },
    returnAndExchangeItemInfoWrapStyle: {
        margin: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        borderBottomWidth: 0.2,
    },
});

export default BlogListScreen;
