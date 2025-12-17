import React, { useEffect, useState } from "react";
import {
    __makeFeaturedCategoryGetRequest,
    __makeFilterCateggoryGetRequest,
} from "../../utils/api";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __generateRandomString } from "../../utils/funtion";
import { Image } from "react-native";

const FeaturedCategory = ({ navigation }) => {
    const [featuredCategory, setFeaturedCategory] = useState(null);

    const __handleGetFeaturedCategory = () => {
        // __makeFeaturedCategoryGetRequest()
        __makeFilterCateggoryGetRequest()
            .then((res) => {
                console.log("__makeFilterCateggoryGetRequest", res);
                setFeaturedCategory(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        setTimeout(() => {
            __handleGetFeaturedCategory();
        }, 200);
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                navigation.push("Products", {
                    filter: {
                        categories: [item.uid],
                        brands: [],
                        minPrice: 0,
                        maxPrice: 100000,
                        sort: 5,
                    },
                })
            }
            style={{ alignItems: "center" }}
        >
            <Image
                source={item?.icon?.url ? { uri: item?.icon?.url } : {}}
                style={{
                    width: 90.0,
                    height: 90.0,
                    // backgroundColor: __getRendomColor(),
                    backgroundColor: Colors.whiteColor,
                    borderRadius: 50,
                }}
            />
            {item?.name && (
                <Text style={{ ...Fonts.blackColor11Medium, marginTop: 5 }}>
                    {item?.name}
                </Text>
            )}
        </TouchableOpacity>
    );
    return (
        <View style={{}}>
            <FlatList
                horizontal
                data={featuredCategory}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingVertical: Sizes.fixPadding,
                    paddingHorizontal: Sizes.fixPadding,
                    gap: 10,
                    marginTop: 10,
                }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => __generateRandomString(10)}
            />
        </View>
    );
};

export default FeaturedCategory;
