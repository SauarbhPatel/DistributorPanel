import React, { useState } from "react";
import {
    SafeAreaView,
    Dimensions,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    ScrollView,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Bounce } from "react-native-animated-spinkit";
import { BottomSheet } from "@rneui/themed";
import { useEffect } from "react";
import {
    __makeCategoryProductsGetRequest,
    __makeChildCateggoryPostRequest,
    __makeFilterCateggoryGetRequest,
    __makeLevelCateggoryGetRequest,
    __makeProductsWithFilterPostRequest,
} from "../../utils/api";
import {
    __generateRandomString,
    __splitProductAndVarianat,
} from "../../utils/funtion";
import ProductItem from "../../components/product/ProductItem";
import SubCategory from "../../components/product/SubCategory";

const { width, height } = Dimensions.get("window");

const sortingCategoriesList = [
    { name: "Newly Added Last", type: 1 },
    { name: "Newly Added First", type: 2 },
    { name: "Ascending by Name", type: 3 },
    { name: "Descending by Name", type: 4 },
    { name: "Price -- High to Low", type: 5 },
    { name: "Price -- Low to High", type: 6 },
];

const ProductsScreen = ({ navigation, route }) => {
    const [getProducts, setGetProducts] = useState(false);

    const [productsList, setProductsList] = useState(null);
    const [showSortBottomSheet, setShowSortBottomSheet] = useState(false);
    const [currentSortingCriteria, setCurrentSortingCriteria] = useState(null);
    const [filter, setFilter] = useState(route?.params?.filter);

    const [subCategoryList, setSubCategoryList] = useState(null);

    const __handleGetFeaturedCategory = (newfilter) => {
        __makeProductsWithFilterPostRequest(newfilter)
            .then((res) => {
                setProductsList(__splitProductAndVarianat(res));
                setGetProducts(true);
            })
            .catch((error) => {
                console.error(error);
                setProductsList([]);
                setGetProducts(true);
            });
    };

    const __handleGetLevel = (id) => {
        setSubCategoryList(null);
        __makeChildCateggoryPostRequest({ ids: [id] })
            .then((res) => {
                setSubCategoryList(res);
            })
            .catch((error) => {});
    };
    const __handleGetLevelCategory = (category) => {
        category &&
            __makeLevelCateggoryGetRequest()
                .then((res) => {
                    if (res?.success) {
                        res?.data?.forEach((level1) => {
                            if (level1?.uid == category) {
                                return __handleGetLevel(level1?._id);
                            }
                            level1?.children?.forEach((level2) => {
                                if (level2?.uid == category) {
                                    return __handleGetLevel(level2?._id);
                                }
                                level2?.subChildren?.forEach((level3) => {
                                    if (level3?.uid == category) {
                                        return __handleGetLevel(level3?._id);
                                    }
                                });
                            });
                        });
                    }
                })
                .catch((error) => {});
    };

    useEffect(() => {
        setTimeout(() => {
            __handleGetFeaturedCategory(route?.params?.filter);
            __handleGetLevelCategory(
                route?.params?.filter?.categories[0] || null
            );

            // console.log(route?.params);
        }, 200);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {getProducts ? (
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {sortAndFilterCriteria()}
                                <SubCategory
                                    subCategoryList={subCategoryList}
                                    navigation={navigation}
                                />
                                {products()}
                            </>
                        }
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    getProductsData()
                )}
            </View>
            {productSortBySheet()}
        </SafeAreaView>
    );

    function productSortBySheet() {
        return (
            <BottomSheet
                isVisible={showSortBottomSheet}
                containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
                modalProps={{
                    onRequestClose: () => {
                        setShowSortBottomSheet(false);
                    },
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => setShowSortBottomSheet(false)}
                >
                    <View style={{ flex: 1, height: height }}>
                        <TouchableWithoutFeedback>
                            <View style={styles.bottomSheetWrapStyle}>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        ...Fonts.blackColor16Bold,
                                    }}
                                >
                                    SORT BY
                                </Text>
                                <View style={styles.bottomSheetDividerStyle} />
                                {sortingCategoriesList.map((item, index) => (
                                    <View key={`${index}`}>
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={() => {
                                                setCurrentSortingCriteria(
                                                    item.type
                                                );
                                                __handleGetFeaturedCategory({
                                                    ...filter,
                                                    sort: item.type,
                                                });
                                                setShowSortBottomSheet(false);
                                            }}
                                            style={styles.sortCriteriaWrapStyle}
                                        >
                                            <View
                                                style={{
                                                    ...styles.radioButtonOuterStyle,
                                                    borderColor:
                                                        currentSortingCriteria ===
                                                        item.type
                                                            ? Colors.blueColor
                                                            : Colors.lightGrayColor,
                                                }}
                                            >
                                                {currentSortingCriteria ===
                                                item.type ? (
                                                    <View
                                                        style={
                                                            styles.radioButtonInnerStyle
                                                        }
                                                    />
                                                ) : null}
                                            </View>
                                            <Text
                                                style={{
                                                    marginLeft:
                                                        Sizes.fixPadding + 5.0,
                                                    ...Fonts.blackColor15Medium,
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </BottomSheet>
        );
    }

    function products() {
        const renderItem = ({ item, index }) => {
            return (
                <ProductItem
                    item={item}
                    index={index}
                    navigation={navigation}
                />
            );
        };
        return (
            <>
                {productsList?.length > 0 ? (
                    <FlatList
                        data={[...productsList]}
                        keyExtractor={(item) => __generateRandomString(10)}
                        renderItem={renderItem}
                        numColumns={2}
                    />
                ) : (
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            height: 500.0,
                        }}
                    >
                        <Image
                            source={require("../../assets/images/noDataFound.png")}
                            style={{
                                width: 300,
                                marginBottom: Sizes.fixPadding - 5.0,
                            }}
                            resizeMode="center"
                        />
                    </View>
                )}
            </>
        );
    }

    function sortAndFilterCriteria() {
        return (
            <View>
                <View
                    style={{
                        marginTop: Sizes.fixPadding,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setShowSortBottomSheet(true)}
                        style={styles.sortAndFilterInfoWrapStyle}
                    >
                        <MaterialIcons
                            name="sort"
                            style={{ marginRight: Sizes.fixPadding }}
                            color={Colors.blackColor}
                            size={24}
                        />
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            SORT
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: 1.0,
                            height: 20.0,
                            backgroundColor: Colors.lightGrayColor,
                        }}
                    ></View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() =>
                            navigation.push("Filter", {
                                categories: filter.categories,
                                brands: filter.brands,
                            })
                        }
                        style={styles.sortAndFilterInfoWrapStyle}
                    >
                        <MaterialIcons
                            name="filter-list"
                            color={Colors.blackColor}
                            style={{ marginRight: Sizes.fixPadding }}
                            size={24}
                        />
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            FILTER
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        backgroundColor: "#e0e0e0",
                        height: 1.0,
                        marginVertical: Sizes.fixPadding,
                    }}
                />
            </View>
        );
    }

    function getProductsData() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: 150,
                }}
            >
                <Image
                    source={require("../../assets/images/baofeng_radios.png")}
                    style={{ width: 120.0, height: 120.0 }}
                    resizeMode="contain"
                />
                <View
                    style={{
                        padding: Sizes.fixPadding * 2.0,
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        zIndex: 1000,
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        justifyContent: "center",
                    }}
                >
                    <Bounce size={48} color={Colors.primaryColor} />
                </View>
            </View>
        );
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 2.0,
                    }}
                >
                    <MaterialIcons
                        name="arrow-back"
                        size={25}
                        color="black"
                        style={{ marginRight: Sizes.fixPadding + 5.0 }}
                        onPress={() => navigation.pop()}
                    />
                    <View>
                        <Text
                            style={{
                                ...Fonts.blackColor15Bold,
                                paddingVertical: Sizes.fixPadding,
                            }}
                        >
                            PRODUCTS
                        </Text>
                    </View>
                </View>

                <View style={styles.headerIconsWrapStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push("Wishlist")}
                        style={{ marginRight: Sizes.fixPadding + 5.0 }}
                    >
                        <MaterialIcons
                            name="favorite-border"
                            color={Colors.blackColor}
                            size={25}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push("Bag")}
                    >
                        <FontAwesome5
                            name="shopping-bag"
                            size={24}
                            color={Colors.blackColor}
                        />
                    </TouchableOpacity>
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
        paddingVertical: Sizes.fixPadding,
        elevation: 2.0,
    },
    favoritsAndShoppingsCountStyle: {
        position: "absolute",
        right: -10.0,
        top: -5.0,
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        backgroundColor: Colors.redColor,
        alignItems: "center",
        justifyContent: "center",
    },
    headerIconsWrapStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    productCategoriesWrapStyle: {
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 4.0,
        paddingHorizontal: Sizes.fixPadding,
        marginRight: Sizes.fixPadding,
    },
    sortAndFilterInfoWrapStyle: {
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    productsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: "center",
        flex: 1,
        paddingBottom: Sizes.fixPadding * 3.0,
        paddingTop: Sizes.fixPadding - 5.0,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        borderBottomColor: "#cccccc",
        borderBottomWidth: 1.0,
    },
    radioButtonOuterStyle: {
        width: 18.0,
        height: 18.0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9.0,
        borderWidth: 2.0,
    },
    radioButtonInnerStyle: {
        backgroundColor: Colors.blueColor,
        width: 10.0,
        height: 10.0,
        borderRadius: 5.0,
    },
    bottomSheetWrapStyle: {
        position: "absolute",
        left: 0.0,
        right: 0.0,
        bottom: 0.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding,
    },
    bottomSheetDividerStyle: {
        backgroundColor: "#e0e0e0",
        height: 1.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 10.0,
    },
    sortCriteriaWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
});

export default ProductsScreen;
