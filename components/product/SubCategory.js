import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { __generateRandomString } from "../../utils/funtion";
import { Image } from "react-native";

const SubCategory = ({ navigation, subCategoryList = null }) => {
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
    return subCategoryList && subCategoryList?.length > 0 ? (
        <View style={{}}>
            <FlatList
                horizontal
                data={subCategoryList}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingVertical: Sizes.fixPadding,
                    paddingHorizontal: Sizes.fixPadding,
                    gap: 10,
                    // marginTop: 10,
                }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => __generateRandomString(10)}
            />
        </View>
    ) : null;
};

export default SubCategory;
