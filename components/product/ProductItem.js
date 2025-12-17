import { FontAwesome } from "@expo/vector-icons";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";

const width = Dimensions.get("window").width;
const ProductItem = ({ item, index, navigation }) => {
    return (
        <View
            style={{
                borderLeftColor:
                    index % 2 != 0 ? Colors.bodyColor : "transparent",
                borderRightColor:
                    index % 2 == 0 ? Colors.bodyColor : "transparent",
                backgroundColor: Colors.whiteColor,
                flex: 1,
                paddingBottom: Sizes.fixPadding * 3.0,
                borderRightWidth: 0.5,
                borderLeftWidth: 0.5,
                borderBottomColor: Colors.bodyColor,
                borderBottomWidth: 1.0,
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
                    style={{
                        height: 170.0,
                        width: width / 2.3,
                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <View style={{ gap: 5 }}>
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
                        {item?.variations[0]?.prices?.country_id?.currency_id
                            ?.symbol || "₹"}
                        {item?.variations[0]?.prices?.mrp}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Bold,
                            color: Colors.primaryColor,
                            fontSize: 12,
                        }}
                    >
                        {item?.variations[0]?.prices?.country_id?.currency_id
                            ?.symbol || "₹"}
                        {item?.variations[0]?.prices?.sale_rate}
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
                        ((item?.variations[0]?.prices?.mrp -
                            item?.variations[0]?.prices?.sale_rate) /
                            item?.variations[0]?.prices?.mrp) *
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
