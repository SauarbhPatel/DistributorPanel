import React, { useState } from "react";
import {
    SafeAreaView,
    Dimensions,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel-v4";

const { width } = Dimensions.get("window");

const itemWidth = Math.round(width * 0.76);

const safetyCheckListData = [
    {
        id: "1",
        safetyImage: require("../../assets/images/safety_checklist/safety_1.jpg"),
    },
    {
        id: "2",
        safetyImage: require("../../assets/images/safety_checklist/safety_2.jpg"),
    },
    {
        safetyImage: require("../../assets/images/safety_checklist/safety_3.jpg"),
    },
    {
        id: "3",
        safetyImage: require("../../assets/images/safety_checklist/safety_4.jpg"),
    },
    {
        id: "4",
        safetyImage: require("../../assets/images/safety_checklist/safety_5.jpg"),
    },
];

const categoryBannerSliderList = [
    {
        bannerImage: require("../../assets/images/home_slider/1.jpg"),
    },
    {
        bannerImage: require("../../assets/images/home_slider/2.jpg"),
    },
    {
        bannerImage: require("../../assets/images/home_slider/3.jpg"),
    },
];

const exploreCategoriesList = [
    {
        id: "1",
        categoryImage: require("../../assets/images/top_category/1.jpg"),
    },
    {
        id: "2",
        categoryImage: require("../../assets/images/top_category/2.jpg"),
    },
    {
        id: "3",
        categoryImage: require("../../assets/images/top_category/3.jpg"),
    },
    {
        id: "4",
        categoryImage: require("../../assets/images/top_category/4.jpg"),
    },
    {
        id: "5",
        categoryImage: require("../../assets/images/top_category/5.jpg"),
    },
    {
        id: "6",
        categoryImage: require("../../assets/images/top_category/6.jpg"),
    },
];

const spotlightProductsList = [
    {
        id: "1",
        spotlightProductImage: require("../../assets/images/top_category/1.jpg"),
    },
    {
        id: "2",
        spotlightProductImage: require("../../assets/images/top_category/2.jpg"),
    },
];

const exploreBrandsList = [
    {
        id: "1",
        brandImage: require("../../assets/images/top_category/1.jpg"),
    },
    {
        id: "2",
        brandImage: require("../../assets/images/top_category/2.jpg"),
    },
    {
        id: "3",
        brandImage: require("../../assets/images/top_category/3.jpg"),
    },
    {
        id: "4",
        brandImage: require("../../assets/images/top_category/4.jpg"),
    },
    {
        id: "5",
        brandImage: require("../../assets/images/top_category/5.jpg"),
    },
    {
        id: "6",
        brandImage: require("../../assets/images/top_category/6.jpg"),
    },
    {
        id: "7",
        brandImage: require("../../assets/images/top_category/7.jpg"),
    },
    {
        id: "8",
        brandImage: require("../../assets/images/top_category/8.jpg"),
    },
    {
        id: "9",
        brandImage: require("../../assets/images/top_category/9.jpg"),
    },
];

const kidsApparelsList = [
    {
        id: "1",
        kidsApparelsImage: require("../../assets/images/kids_apparels/kids_apparels_1.jpg"),
    },
    {
        id: "2",
        kidsApparelsImage: require("../../assets/images/kids_apparels/kids_apparels_2.jpg"),
    },
];

const CategoryDetailScreen = ({ navigation }) => {
    const [categoryBannerSliderData, setCategoryBannerSliderData] = useState(
        categoryBannerSliderList
    );
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {safetyCheckList()}
                            {bannerSlider()}
                            {exploreCategories()}
                            {spotlightProducts()}
                            {exploreBrands()}
                            {/* {kidsApparels()} */}
                        </>
                    }
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding + 5.0,
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );

    function kidsApparels() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push("Products")}
            >
                <Image
                    source={item.kidsApparelsImage}
                    style={styles.kidsApparelsImageStyle}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
        return (
            <View>
                <Text style={styles.kidsApparelsTextStyle}>KIDS APPARELS</Text>
                <FlatList
                    horizontal
                    data={kidsApparelsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }

    function exploreBrands() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push("Products")}
            >
                <Image
                    source={item.brandImage}
                    style={{
                        height: 150.0,
                        width: width / 3.35,
                        marginHorizontal: Sizes.fixPadding - 5.0,
                        marginBottom: Sizes.fixPadding,
                    }}
                    resizeMode="stretch"
                />
            </TouchableOpacity>
        );
        return (
            <View>
                <Text style={styles.exploreBrandsTextStyle}>
                    EXPLORE BRANDS
                </Text>
                <FlatList
                    listKey={`brandList`}
                    data={exploreBrandsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={3}
                    scrollEnabled={false}
                    contentContainerStyle={{ backgroundColor: "red" }}
                    columnWrapperStyle={{
                        paddingHorizontal: Sizes.fixPadding - 5.0,
                        flexDirection: "row",
                    }}
                />
            </View>
        );
    }

    function spotlightProducts() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push("Products")}
            >
                <Image
                    source={item.spotlightProductImage}
                    style={styles.spotlightProductImageStyle}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
        return (
            <View>
                <Text style={styles.inTheSpotlightTextStyle}>
                    IN THE SPOTLIGHT
                </Text>
                <FlatList
                    horizontal
                    data={spotlightProductsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }

    function exploreCategories() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push("Products")}
            >
                <Image
                    source={item.categoryImage}
                    style={styles.exploreCategoriesImageStyle}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
        return (
            <View>
                <Text style={styles.exploreCategoriesTextStyle}>
                    EXPLORE CATEGORY
                </Text>
                <FlatList
                    listKey={`categoryList`}
                    data={exploreCategoriesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    numColumns={3}
                    columnWrapperStyle={{
                        paddingHorizontal: Sizes.fixPadding - 5.0,
                        flexDirection: "row",
                    }}
                />
            </View>
        );
    }

    function bannerSlider() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push("Products")}
            >
                <Image
                    source={item.bannerImage}
                    style={{
                        width: width - 100,
                        height: 250,
                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );

        return (
            <View
                style={{
                    backgroundColor: Colors.whiteColor,
                    paddingTop: Sizes.fixPadding - 7.0,
                }}
            >
                <Carousel
                    data={categoryBannerSliderData}
                    sliderWidth={width}
                    itemWidth={itemWidth}
                    renderItem={renderItem}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={4000}
                    showsHorizontalScrollIndicator={false}
                    onSnapToItem={(index) => setActiveSlide(index)}
                />
            </View>
        );
    }

    function safetyCheckList() {
        const renderItem = ({ item }) => (
            <Image
                source={item.safetyImage}
                style={{
                    width: width - 120,
                    height: 80,
                    marginRight: Sizes.fixPadding,
                }}
                resizeMode="contain"
            />
        );
        return (
            <View>
                <FlatList
                    horizontal
                    data={safetyCheckListData}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding,
                        paddingVertical: Sizes.fixPadding,
                    }}
                    showsHorizontalScrollIndicator={false}
                />
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
                    <Text style={{ ...Fonts.alatsiBlack18Regular }}>STYLO</Text>
                </View>

                <View style={styles.headerIconsWrapStyle}>
                    <MaterialIcons
                        name="search"
                        color={Colors.blackColor}
                        size={25}
                        onPress={() => navigation.push("Search")}
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push("Wishlist")}
                    >
                        <MaterialIcons
                            name="favorite-border"
                            color={Colors.blackColor}
                            size={25}
                        />
                        <View style={styles.favoritsAndShoppingsCountStyle}>
                            <Text style={{ ...Fonts.whiteColor12Medium }}>
                                2
                            </Text>
                        </View>
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
                        <View style={styles.favoritsAndShoppingsCountStyle}>
                            <Text style={{ ...Fonts.whiteColor12Medium }}>
                                3
                            </Text>
                        </View>
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
        paddingVertical: Sizes.fixPadding + 5.0,
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
        justifyContent: "space-between",
        alignItems: "center",
    },
    exploreCategoriesImageStyle: {
        height: 160.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        width: width / 3.34,
        marginBottom: Sizes.fixPadding - 5.0,
        alignSelf: "center",
    },
    exploreCategoriesTextStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        ...Fonts.blackColor15SemiBold,
    },
    spotlightProductImageStyle: {
        width: 230,
        height: 290,
        borderColor: "#e0e0e0",
        borderWidth: 2.0,
        marginRight: Sizes.fixPadding - 3.0,
    },
    inTheSpotlightTextStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        ...Fonts.blackColor15SemiBold,
    },
    exploreBrandsTextStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding,
        ...Fonts.blackColor15SemiBold,
    },
    kidsApparelsTextStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        ...Fonts.blackColor15SemiBold,
    },
    kidsApparelsImageStyle: {
        width: 230,
        height: 290,
        borderColor: "#e0e0e0",
        borderWidth: 2.0,
        marginRight: Sizes.fixPadding - 3.0,
    },
});

export default CategoryDetailScreen;
