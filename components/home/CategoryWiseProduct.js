import React, { useEffect, useState } from "react";
import {
    __makeProductsWithCategoryGetRequest,
    __makeProductsWithFilterPostRequest,
} from "../../utils/api";
import {
    __generateRandomString,
    __getRendomColor,
    __splitProductAndVarianat,
} from "../../utils/funtion";
import {
    Dimensions,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import ProductItem from "./ProductItem";
const { width } = Dimensions.get("window");
const CategoryWiseProduct = ({ filter, navigation }) => {
    const [productsList, setProductsList] = useState(null);
    const __handleGetFeaturedCategory = () => {
        __makeProductsWithCategoryGetRequest()
            .then((res) => {
                setProductsList(
                    res?.map((item) => ({
                        ...item,
                        list: __splitProductAndVarianat(item?.list),
                    }))
                );
            })
            .catch((error) => {
                console.error(error);
                setProductsList([]);
            });
    };
    useEffect(() => {
        setTimeout(() => {
            __handleGetFeaturedCategory();
        }, 200);
    }, []);

    // console.log("productsList", JSON.stringify(productsList[0] || null));

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    width: width / 2.1,
                    // borderWidth: 1,
                    borderRadius: 10,
                    overflow: "hidden",
                    backgroundColor: __getRendomColor(),
                }}
            >
                <ProductItem
                    item={item}
                    index={index}
                    navigation={navigation}
                />
            </View>
        );
    };
    return (
        <View style={{ gap: 2 }}>
            {productsList?.map((item) => (
                <View
                    key={item?._id}
                    style={{
                        backgroundColor: Colors.whiteColor,
                        paddingVertical: 10,
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
                            {item?.categoryName}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                navigation.push("Products", {
                                    filter: {
                                        categories: [item?.categoryUid],
                                        brands: [],
                                        minPrice: 0,
                                        maxPrice: 100000,
                                        sort: 5,
                                    },
                                });
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
                    {item?.list?.length > 0 ? (
                        <FlatList
                            data={[...item?.list]}
                            keyExtractor={(item) => __generateRandomString(10)}
                            renderItem={renderItem}
                            horizontal
                            contentContainerStyle={{
                                gap: 10,
                                paddingHorizontal: 10,
                                paddingTop: 10,
                            }}
                            ListHeaderComponent={
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <View
                                        style={{
                                            width: width / 2.1,
                                            height: 300,
                                            borderRadius: 10,
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Image
                                            source={{ uri: item?.banner?.url }}
                                            style={{
                                                width: width / 2.1,
                                                height: 300,
                                                borderRadius: 10,
                                                overflow: "hidden",
                                            }}
                                        />
                                    </View>
                                    {item?.banner_2?.url ? (
                                        <View
                                            style={{
                                                width: width / 2.1,
                                                height: 300,
                                                borderRadius: 10,
                                                overflow: "hidden",
                                            }}
                                        >
                                            <Image
                                                source={{
                                                    uri: item?.banner_2?.url,
                                                }}
                                                style={{
                                                    width: width / 2.1,
                                                    height: 300,
                                                    borderRadius: 10,
                                                    overflow: "hidden",
                                                }}
                                            />
                                        </View>
                                    ) : null}
                                </View>
                            }
                            showsHorizontalScrollIndicator={false}
                        />
                    ) : (
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                height: 200.0,
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
                </View>
            ))}
        </View>
    );
};

export default CategoryWiseProduct;
