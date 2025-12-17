import React, { useEffect, useState } from "react";
import {
    __makeBannerGetRequest,
    __makeFilterCateggoryGetRequest,
} from "../../utils/api";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __generateRandomString } from "../../utils/funtion";
import { Image } from "react-native";

const PublicCategory = ({ navigation }) => {
    const [publicCategory, setPublicCategory] = useState(null);

    const __handleGetFeaturedCategory = () => {
        // __makeFilterCateggoryGetRequest()
        __makeBannerGetRequest("/pb?mod=home&pos=home-mini-banner")
            .then((res) => {
                console.log(res);
                setPublicCategory(res);
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
                        categories: [item?.uid],
                        brands: [],
                        minPrice: 0,
                        maxPrice: 10000,
                        sort: 5,
                    },
                })
            }
            style={{ alignItems: "center" }}
        >
            <Image
                source={item?.image?.url ? { uri: item?.image?.url } : {}}
                style={{
                    width: 280.0,
                    height: 150.0,
                    backgroundColor: Colors.whiteColor,
                    borderRadius: 10,
                    // resizeMode: "stretch",
                }}
            />
        </TouchableOpacity>
    );
    return (
        <View style={{}}>
            <FlatList
                horizontal
                data={publicCategory}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingVertical: Sizes.fixPadding,
                    paddingHorizontal: Sizes.fixPadding,
                    gap: 10,
                }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => __generateRandomString(10)}
            />
        </View>
    );
};

export default PublicCategory;
