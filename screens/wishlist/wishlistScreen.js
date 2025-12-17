import { useState } from "react";
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    FlatList,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import {
    __makeAddWishListGetRequest,
    __makeWishListGetRequest,
} from "../../utils/api";
import { useEffect } from "react";
import { getLocalizedString } from "../../utils/language/localizationService";
import { Alert } from "react-native";
import { __getLocalization, __getToken } from "../../utils/localization";
import { __generateRandomString } from "../../utils/funtion";
import Loader from "../../components/loader";

const { width } = Dimensions.get("window");

const WishlistScreen = ({ navigation }) => {
    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(null);
    const [loading, setLoading] = useState(false);

    const __handleGetWishList = () => {
        const token = __getToken();
        if (!token) {
            setListData([]);
            return Alert.alert("", "You are not Login. Please login first.");
        }
        setLoading(true);
        __makeWishListGetRequest(token)
            .then((res) => {
                console.log(JSON.stringify(res));
                setListData(res);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setListData([]);
            });
    };
    const __handleRemoveFromWishList = (uid, variant_slug) => {
        const token = __getToken();
        setLoading(true);

        __makeAddWishListGetRequest(
            {
                productid: uid,
                userid: __getLocalization("_id"),
                varientid: variant_slug,
            },
            token
        )
            .then((res) => {
                __handleGetWishList();
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            __handleGetWishList();
        }, 200);
    }, []);

    const renderItem = ({ item }) => (
        <View>
            <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                <View style={styles.productWrapStyle}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            navigation.push("ProductDetail", {
                                item,
                                uid: item.uid,
                            });
                        }}
                        style={{
                            borderWidth: 1.5,
                            borderColor: Colors.backColor,
                            borderRadius: 10,
                            alignSelf: "center",
                        }}
                    >
                        <Image
                            source={{
                                uri: item?.variations[0]?.mainImage_url?.url,
                            }}
                            style={styles.productImageStyle}
                            resizeMode="center"
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            marginVertical: Sizes.fixPadding,
                            marginLeft: Sizes.fixPadding,
                            flex: 1,
                        }}
                    >
                        <Text
                            style={{
                                maxWidth: width - 150,
                                ...Fonts.blackColor15SemiBold,
                            }}
                            numberOfLines={2}
                        >
                            {item?.name}
                        </Text>

                        <View
                            style={{
                                marginTop: Sizes.fixPadding - 5.0,

                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    marginRight: Sizes.fixPadding,
                                    ...Fonts.lightGrayColor13Medium,
                                }}
                            >
                                Weight:
                            </Text>
                            <Text style={{ ...Fonts.blueColor13SemiBold }}>
                                {item?.weights} {item?.unit}
                            </Text>
                        </View>
                        <View
                            style={{
                                marginTop: Sizes.fixPadding,
                            }}
                        >
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() =>
                                    __handleRemoveFromWishList(
                                        item?.uid,
                                        item?.variations[0]?.variant_slug
                                    )
                                }
                                style={[
                                    styles.removeButtonStyle,
                                    {
                                        borderRadius: 5,
                                        padding: 5,
                                    },
                                ]}
                            >
                                <Text style={{ ...Fonts.whiteColor12SemiBold }}>
                                    Remove
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.push("ProductDetail", {
                                    item,
                                    uid: item.uid,
                                });
                            }}
                            activeOpacity={0.9}
                            style={{
                                backgroundColor: Colors.primaryColor,
                                marginTop: 10,
                                padding: 5,
                                borderRadius: 5,
                            }}
                        >
                            <Text
                                style={{
                                    ...Fonts.whiteColor12SemiBold,
                                    textAlign: "center",
                                }}
                            >
                                View Details
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    function wishlistEmptyInfo() {
        return (
            <View style={styles.noWishlistItemsWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    WISHLIST EMPTY
                </Text>
                <Text
                    style={{
                        marginVertical: Sizes.fixPadding - 5.0,
                        textAlign: "center",
                        ...Fonts.lightGrayColor13Medium,
                    }}
                >
                    {`Save your favorite pleces of product in one\nplace. Add now, buy later.`}
                </Text>
                <Image
                    source={require("../../assets/images/empty_wishlist.png")}
                    style={styles.wishlistEmptyImageStyle}
                    resizeMode="contain"
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push("Home")}
                    style={styles.continueShoppingButtonStyle}
                >
                    <Text style={{ ...Fonts.primaryColor16Bold }}>
                        CONTINUE SHOPPING
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            {loading && <Loader />}

            <View style={{ flex: 1 }}>
                {header()}
                <View style={{ flex: 1, backgroundColor: Colors.backColor }}>
                    {listData ? (
                        listData.length == 0 ? (
                            <>{wishlistEmptyInfo()}</>
                        ) : (
                            <FlatList
                                data={listData}
                                renderItem={renderItem}
                                keyExtractor={() => __generateRandomString(10)}
                            />
                        )
                    ) : null}
                    <Snackbar
                        style={styles.snackBarStyle}
                        visible={showSnackBar}
                        onDismiss={() => setShowSnackBar(false)}
                    >
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Item Removed
                        </Text>
                    </Snackbar>
                </View>
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

                        textTransform: "uppercase",
                    }}
                >
                    {getLocalizedString("My Wishlist")}
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
    snackBarStyle: {
        position: "absolute",
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: "#333333",
    },
    rowBack: {
        alignItems: "center",
        flex: 1,
    },
    productWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: "row",
        marginHorizontal: Sizes.fixPadding - 5.0,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding - 5.0,
        padding: 10,
    },
    productImageStyle: {
        height: 160.0,
        width: 140.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
    },
    removeButtonStyle: {
        backgroundColor: Colors.redColor,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: Sizes.fixPadding - 6.0,
        paddingVertical: Sizes.fixPadding - 7.0,
    },
    continueShoppingButtonStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    noWishlistItemsWrapStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.backColor,
    },
    wishlistEmptyImageStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding + 5.0,
        width: 130.0,
        height: 130.0,
    },
});

export default WishlistScreen;
