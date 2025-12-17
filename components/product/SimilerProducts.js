import React, { useEffect, useState } from "react";
import { __makeProductsWithFilterPostRequest } from "../../utils/api";
import {
    __generateRandomString,
    __splitProductAndVarianat,
} from "../../utils/funtion";
import ProductItem from "./ProductItem";
import { FlatList, Image, Text, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const SimilerProducts = ({ filter, navigation }) => {
    const [productsList, setProductsList] = useState(null);
    const __handleGetFeaturedCategory = () => {
        __makeProductsWithFilterPostRequest(filter)
            .then((res) => {
                setProductsList(__splitProductAndVarianat(res));
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

    const renderItem = ({ item, index }) => {
        return (
            <ProductItem item={item} index={index} navigation={navigation} />
        );
    };
    return (
        <View
            style={{ backgroundColor: Colors.whiteColor, paddingVertical: 10 }}
        >
            <Text
                style={{ ...Fonts.blackColor15SemiBold, paddingHorizontal: 10 }}
            >
                Similar items
            </Text>
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
    );
};

export default SimilerProducts;
