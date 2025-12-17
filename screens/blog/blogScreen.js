import React from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    ScrollView,
    StyleSheet,
    Text,
    Image,
    Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { __generateRandomString } from "../../utils/funtion";
import { TouchableOpacity } from "react-native";
import { __makeGetBlogGetRequest } from "../../utils/api";
import { useEffect } from "react";
import { useState } from "react";
const { width } = Dimensions.get("window");

const BlogScreen = ({ navigation }) => {
    const [list, setlist] = useState([]);
    const __handleGetWishList = () => {
        __makeGetBlogGetRequest()
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
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    data={list}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.push("BlogList", {
                                    uid: item.uid,
                                    item: item,
                                });
                            }}
                            activeOpacity={0.8}
                            style={styles.returnAndExchangeItemInfoWrapStyle}
                        >
                            <Image
                                source={{ uri: item?.banner?.url }}
                                style={{
                                    height: width - 80,
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
                        </TouchableOpacity>
                    )}
                    keyExtractor={() => __generateRandomString(10)}
                    contentContainerStyle={{
                        gap: 10,
                        paddingTop: 10,
                        paddingBottom: 20,
                    }}
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
                    Blogs
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
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        // elevation: 3.0,
        borderWidth: 1.5,
        borderColor: Colors.borderColor,
    },
});

export default BlogScreen;
