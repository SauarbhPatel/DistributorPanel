import React, { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-snap-carousel-v4";
import { Sizes } from "../../constants/styles";
import { __makeBannerGetRequest } from "../../utils/api";
import { TouchableOpacity } from "react-native";
const width = Dimensions.get("window").width;

const BannerSlider = ({ navigation }) => {
    const [bannerSliderData, setBannerSliderData] = useState(null);

    const __handleGetBannerSlider = () => {
        __makeBannerGetRequest("/pb?mod=home&pos=home-big-banner")
            .then((res) => {
                console.log(JSON.stringify(res));
                setBannerSliderData(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            __handleGetBannerSlider();
        }, 200);
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
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
            activeOpacity={0.9}
        >
            <Image
                source={{
                    uri: item.image.url,
                }}
                style={{
                    width: width,
                    height: 130,
                }}
                resizeMode="stretch"
            />
        </TouchableOpacity>
    );

    return (
        <View style={{}}>
            <Carousel
                data={bannerSliderData}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                autoplay={true}
                loop={true}
                containerCustomStyle={{ marginTop: Sizes.fixPadding }}
                autoplayInterval={4000}
                // layout={"stack"}
                // layoutCardOffset={`18`}
            />
        </View>
    );
};

export default BannerSlider;
