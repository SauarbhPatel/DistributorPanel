import React, { useEffect, useState } from "react";
import { __makeGetBlogGetRequest } from "../../utils/api";
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __generateRandomString } from "../../utils/funtion";
const { width } = Dimensions.get("window");

const BlogSection = ({ navigation }) => {
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
        <>
            <View
                style={{
                    backgroundColor: Colors.whiteColor,
                    paddingVertical: 10,
                    marginTop: 2,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor15SemiBold,
                            paddingHorizontal: 10,
                        }}
                    >
                        Our Latest News Update
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            navigation.push("Blog");
                        }}
                        style={{
                            borderWidth: 1.5,
                            padding: 3,
                            borderColor: Colors.lightGrayColor,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            marginEnd: 10,
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor15SemiBold,
                                fontSize: 12,
                            }}
                        >
                            See More
                        </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={list}
                    horizontal
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
                                    width: width - 80,
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
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                    }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </>
    );
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
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        // elevation: 3.0,
        borderWidth: 1.5,
        borderColor: Colors.borderColor,
        width: width - 55,
    },
});

export default BlogSection;
