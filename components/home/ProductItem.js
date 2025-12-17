import { FontAwesome } from "@expo/vector-icons";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const width = Dimensions.get("window").width;
const ProductItem = ({ item, index, navigation }) => {
    return (
        <View
            style={{
                flex: 1,
                paddingBottom: Sizes.fixPadding * 1.0,
                paddingTop: 10,
            }}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                    navigation.push("ProductDetail", {
                        item,
                        uid: item.uid,
                    })
                }
                style={{
                    height: 170.0,
                    width: width / 2.3,
                    marginBottom: Sizes.fixPadding - 5.0,
                    borderRadius: 10,
                    alignSelf: "center",
                    overflow: "hidden",
                }}
            >
                <Image
                    source={{
                        uri: item?.variations[0]?.mainImage_url?.url,
                    }}
                    style={{
                        height: 170.0,
                        width: width / 2.3,
                        backgroundColor: Colors.whiteColor,
                    }}
                    resizeMode="cover"
                />
            </TouchableOpacity>
            <View
                style={{
                    gap: 5,
                }}
            >
                <Text
                    numberOfLines={2}
                    style={{
                        ...Fonts.blackColor13SemiBold,
                        paddingHorizontal: Sizes.fixPadding,
                    }}
                >
                    {item.name}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: Sizes.fixPadding,
                        gap: 10,
                    }}
                >
                    <Text
                        style={{
                            textDecorationLine: "line-through",
                            ...Fonts.lightGrayColor12Medium,
                        }}
                    >
                        {item?.variations[0]?.prices[0]?.country_id?.currency_id
                            ?.symbol || "₹"}
                        {item?.variations[0]?.prices[0]?.mrp}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Bold,
                            color: Colors.primaryColor,
                            fontSize: 12,
                        }}
                    >
                        {item?.variations[0]?.prices[0]?.country_id?.currency_id
                            ?.symbol || "₹"}
                        {item?.variations[0]?.prices[0]?.sale_rate}
                    </Text>
                </View>
                <Text
                    style={{
                        ...Fonts.blackColor15Bold,
                        color: Colors.primaryColor,
                        fontSize: 11,
                        backgroundColor: "#FFE5E5",
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 4,
                        alignSelf: "flex-start",
                        marginHorizontal: 10,
                    }}
                >
                    {Math.round(
                        ((item?.variations[0]?.prices[0]?.mrp -
                            item?.variations[0]?.prices[0]?.sale_rate) /
                            item?.variations[0]?.prices[0]?.mrp) *
                            100
                    )}
                    % off
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        gap: 3,
                        marginHorizontal: 10,
                    }}
                >
                    <FontAwesome
                        name="star"
                        color={Colors.yellowColor}
                        size={15}
                    />
                    <FontAwesome
                        name="star"
                        color={Colors.yellowColor}
                        size={15}
                    />
                    <FontAwesome
                        name="star"
                        color={Colors.yellowColor}
                        size={15}
                    />
                    <FontAwesome
                        name="star-half-o"
                        color={Colors.yellowColor}
                        size={15}
                    />
                    <FontAwesome
                        name="star-o"
                        color={Colors.yellowColor}
                        size={15}
                    />
                </View>
            </View>
        </View>
    );
};

export default ProductItem;
