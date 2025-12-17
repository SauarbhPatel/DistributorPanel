import React, { useEffect, useRef, useState } from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    FlatList,
    TouchableWithoutFeedback,
    ImageBackground,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
    MaterialIcons,
    FontAwesome5,
    Octicons,
    FontAwesome,
} from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel-v4";
import { LinearGradient } from "expo-linear-gradient";
import { BottomSheet } from "@rneui/themed";
import { Snackbar } from "react-native-paper";
import {
    __makeAddToCartPostRequest,
    __makeAddWishListGetRequest,
    __makeProductDetailsGetRequest,
} from "../../utils/api";
import { Bounce } from "react-native-animated-spinkit";
import Loader from "../../components/loader";
import { __generateRandomString } from "../../utils/funtion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalizedString } from "../../utils/language/localizationService";
import CheckCodDelivery from "../../components/product/CheckCodDelivery";
import UserLicence from "../../components/product/UserLicence";
import SpecialNotes from "../../components/product/SpecialNotes";
import UploadWPCLicence from "../../components/product/UploadWPCLicence";
import OfferInfoCards from "../../components/product/OfferInfoCards";
import ProductDescription from "../../components/product/ProductDescription";
import SimilerProducts from "../../components/product/SimilerProducts";
import {
    __getLocalization,
    __getToken,
    __setLocalization,
} from "../../utils/localization";
import { __setLocalStorageData } from "../../utils/localStorage";
import ProductDetailsTabs from "../../components/product/ProductDetailsTabs";

const { width, height } = Dimensions.get("window");

const ProductDetailScreen = ({ route, navigation }) => {
    const [state, setState] = useState({
        loading: true,
        item: null,
        productImages: [""],
        loader: false,
        variations: null,
    });
    const { loading, item, productImages, loader, variations } = state;
    const UpdateState = (data) => setState((prv) => ({ ...prv, ...data }));
    const [activeSlide, setActiveSlide] = useState(0);
    const [showProductDescriptionSheet, setShowProductDescriptionSheet] =
        useState(false);

    const [isInFavorite, setIsInFavorite] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [bagItemCount, setBagItemCount] = useState(3);
    const [qty, setQty] = useState(1);

    const __getImage = (main_image, images) => {
        let allImages = [];
        if (main_image) {
            main_image?.url && allImages.push(main_image?.url);
        }
        if (images) {
            images.forEach((element) => {
                element?.url && allImages.push(element?.url);
            });
        }
        UpdateState({ productImages: allImages });
    };

    const __handleGetFeaturedCategory = () => {
        __makeProductDetailsGetRequest(
            route?.params?.uid,
            route?.params?.item?.variations[0]?.variant_slug
        )
            .then((res) => {
                UpdateState({
                    item: res,
                    loading: false,
                    variations: res.product.variations[0],
                });
                let images = res?.product?.variations[0].images;
                let mainImage = res?.product?.variations[0].mainImage_url;
                __getImage(mainImage, images);
                setIsInFavorite(res?.product?.wish);
            })
            .catch((error) => {
                console.error(error);
                UpdateState({ loading: false });
            });
    };

    const __handleAddToCart = () => {
        const token = __getToken();
        const cart = __getLocalization("cart");
        if (!token) {
            return Alert.alert("", "You are not Login. Please login first.");
        }
        setShowProductDescriptionSheet(false);
        UpdateState({ loader: true });
        __makeAddToCartPostRequest(
            {
                deliveryType: "Home Delivery",
                productId: item?.product?.uid,
                variantId: variations?.uid,
                sku: variations?.prices[0]?.sku,
                seller_id: variations?.prices[0]?.seller_id?._id,
                qty: qty,
            },
            token,
            cart || ""
        )
            .then(async (res) => {
                UpdateState({ loader: false });
                if (res.cart) {
                    __setLocalization({
                        cart: res.cart,
                    });
                    if (!cart) {
                        await __setLocalStorageData("cart", res.cart);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
                UpdateState({ loader: false });
                setShowProductDescriptionSheet(true);
            });
    };
    const __handleAddToWishlist = () => {
        const token = __getToken();
        if (!token) {
            return Alert.alert("", "You are not Login. Please login first.");
        }

        UpdateState({ loader: true });

        __makeAddWishListGetRequest(
            {
                productid: route?.params?.uid,
                userid: __getLocalization("_id"),
                varientid: route?.params?.item?.variations[0]?.variant_slug,
            },
            token
        )
            .then((res) => {
                // console.log(JSON.stringify(res));
                UpdateState({ loader: false });
                setShowSnackBar(true);
                setTimeout(() => {
                    setShowSnackBar(false);
                }, 3000);
            })
            .catch((error) => {
                console.error(error);
                UpdateState({ loader: false });
            });
    };

    useEffect(() => {
        setTimeout(() => {
            __handleGetFeaturedCategory();
        }, 200);
    }, []);

    const flatListRef = useRef(null);

    const [sections, setSections] = useState({});
    const sectionsRef = useRef(sections);
    sectionsRef.current = sections;

    // Height map for each section
    const heightsRef = useRef({});
    const baseTopRef = useRef(0);

    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const handleScroll = (e) => {
        const { contentOffset, layoutMeasurement } = e.nativeEvent;
        const scrollY = contentOffset.y;
        const viewBottom = scrollY + layoutMeasurement.height;

        let bestIndex = null;
        let bestPercent = 0;
        let anyVisible = false;

        Object.keys(sectionsRef.current).forEach((key) => {
            const sec = sectionsRef.current[key];
            if (!sec) return;

            const visibleTop = Math.max(sec.top, scrollY);
            const visibleBottom = Math.min(sec.bottom, viewBottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const percent = visibleHeight / sec.height;
            if (visibleHeight > 0) {
                anyVisible = true;
            }
            if (percent > bestPercent) {
                bestPercent = percent;
                bestIndex = Number(key);
            }
        });

        // -----------------------------------------
        // ⭐ SET sticky ON / OFF
        // -----------------------------------------
        if (!anyVisible) {
            // All sections are outside viewport
            if (isSticky) setIsSticky(false);
            return;
        } else {
            // At least one section is visible
            if (!isSticky) setIsSticky(true);
        }

        if (bestIndex !== null && bestPercent >= 0.6) {
            if (activeSection !== bestIndex) {
                setActiveSection(bestIndex);
                console.log("bestIndex", bestIndex);
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            {loader && <Loader />}
            <View style={{ flex: 1 }}>
                {header()}
                {isSticky && (
                    <ProductDetailsTabs
                        list={item?.product?.description_tabs}
                        activeTab={activeSection}
                        isSticky={true}
                    />
                )}
                {!loading && (
                    <FlatList
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        ListHeaderComponent={
                            <>
                                {productImagesSlider()}
                                {divider()}
                                {productNamePriceAndRatingInfo()}

                                {!isSticky && (
                                    <ProductDetailsTabs
                                        list={item?.product?.description_tabs}
                                        activeTab={activeSection}
                                        isSticky={false}
                                    />
                                )}

                                <View
                                    style={{ marginTop: 15 }}
                                    onLayout={(e) => {
                                        baseTopRef.current =
                                            e.nativeEvent.layout.y;
                                    }}
                                >
                                    {item?.product?.description_tabs?.map(
                                        (item, index) => (
                                            <View
                                                key={
                                                    "description_tabs" +
                                                    index +
                                                    "key"
                                                }
                                                onLayout={(e) => {
                                                    const height =
                                                        e.nativeEvent.layout
                                                            .height;

                                                    // store height
                                                    heightsRef.current[index] =
                                                        height;

                                                    // compute correct top/bottom
                                                    let top =
                                                        baseTopRef.current;
                                                    for (
                                                        let i = 0;
                                                        i < index;
                                                        i++
                                                    ) {
                                                        top +=
                                                            heightsRef.current[
                                                                i
                                                            ] || 0;
                                                    }
                                                    const bottom = top + height;

                                                    setSections((prev) => {
                                                        return {
                                                            ...prev,
                                                            [index]: {
                                                                top,
                                                                bottom,
                                                                height,
                                                            },
                                                        };
                                                    });
                                                }}
                                            >
                                                <ProductDescription
                                                    list={[item]}
                                                    isShowTaps={
                                                        activeSection === index
                                                    }
                                                />
                                            </View>
                                        )
                                    )}
                                </View>

                                {/* */}
                                <SimilerProducts
                                    filter={{
                                        categories: [
                                            item?.product?.category_id[0]
                                                ?.uid || "1",
                                        ],
                                        brands: [],
                                        minPrice: "",
                                        maxPrice: "",
                                        sort: "1",
                                    }}
                                    navigation={navigation}
                                />
                            </>
                        }
                        showsVerticalScrollIndicator={false}
                    />
                )}
                {loading && loadingCom()}
            </View>

            {!loading &&
                variations.display_status == "In Stock" &&
                addToBagAndBuyNowButton()}
            {!loading && productDescrptionBottomSheet()}
            {!loading && snackBarInfo()}
        </SafeAreaView>
    );

    function loadingCom() {
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
                    style={{ width: 120.0, height: 60.0 }}
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
                    {/* <ActivityIndicator color={Colors.primaryColor} size={30} /> */}
                    <Bounce size={48} color={Colors.primaryColor} />
                </View>
            </View>
        );
    }
    function snackBarInfo() {
        return (
            <Snackbar
                style={styles.snackBarStyle}
                elevation={0}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                {!item?.product?.wish
                    ? `Added to Wishlist`
                    : `Remove from Wishlist`}
            </Snackbar>
        );
    }

    function addToBagAndBuyNowButton() {
        return (
            <View style={styles.addToBagAndByNowButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setShowProductDescriptionSheet(true);
                    }}
                    style={{
                        backgroundColor: Colors.whiteColor,
                        ...styles.addToBagAndByNowButtonStyle,
                    }}
                >
                    <Text style={{ ...Fonts.blackColor15Bold }}>
                        {getLocalizedString("ADD TO BAG")}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push("Bag")}
                    style={{
                        backgroundColor: Colors.primaryColor,
                        ...styles.addToBagAndByNowButtonStyle,
                    }}
                >
                    <Text style={{ ...Fonts.whiteColor15Bold }}>
                        {getLocalizedString("BUY NOW")}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function productDescrptionBottomSheet() {
        return (
            <BottomSheet
                isVisible={showProductDescriptionSheet}
                containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
                modalProps={{
                    onRequestClose: () => {
                        setShowProductDescriptionSheet(false);
                    },
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => setShowProductDescriptionSheet(false)}
                >
                    <View style={{ flex: 1, height: height }}>
                        <TouchableWithoutFeedback>
                            <View
                                style={[
                                    styles.bottomSheetWrapStyle,
                                    {
                                        height: 200,
                                    },
                                ]}
                            >
                                <View style={{ flex: 1, flexBasis: 1 }}>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            ...Fonts.blackColor16Bold,
                                        }}
                                    >
                                        Select Quantity
                                    </Text>
                                    <View
                                        style={styles.bottomSheetDividerStyle}
                                    />
                                    {/* <Text
                                        style={{
                                            lineHeight: 18.0,
                                            marginBottom:
                                                Sizes.fixPadding - 5.0,
                                            ...Fonts.blackColor12Medium,
                                        }}
                                    >
                                        Quantity
                                    </Text> */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            marginTop: 10,
                                        }}
                                    >
                                        <Octicons
                                            name="dash"
                                            color={Colors.blackColor}
                                            size={25}
                                            onPress={() => {
                                                qty != 1 &&
                                                    setQty((prv) => prv - 1);
                                            }}
                                        />
                                        <View
                                            style={{
                                                backgroundColor:
                                                    Colors.primaryColor,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                paddingHorizontal: 10,
                                                marginHorizontal: 10,
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...Fonts.whiteColor14Bold,
                                                }}
                                            >
                                                {qty}
                                            </Text>
                                        </View>

                                        <MaterialIcons
                                            name="add"
                                            color={Colors.blackColor}
                                            size={25}
                                            onPress={() =>
                                                setQty((prv) => prv + 1)
                                            }
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => {
                                        setBagItemCount(bagItemCount + 1);
                                        __handleAddToCart();
                                    }}
                                    style={{
                                        backgroundColor: Colors.primaryColor,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingVertical: Sizes.fixPadding + 5.0,
                                        marginBottom: 20,
                                    }}
                                >
                                    <Text style={{ ...Fonts.whiteColor14Bold }}>
                                        ADD
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </BottomSheet>
        );
    }

    function divider() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor }}>
                <View
                    style={{
                        backgroundColor: "#e0e0e0",
                        height: 1.0,
                        marginTop: Sizes.fixPadding,
                        marginBottom: Sizes.fixPadding + 3.0,
                    }}
                />
            </View>
        );
    }

    function productNamePriceAndRatingInfo() {
        return (
            <View
                style={{
                    backgroundColor: Colors.whiteColor,
                    paddingHorizontal: Sizes.fixPadding,
                    gap: 5,
                }}
            >
                <Text style={{ ...Fonts.blackColor17SemiBold }}>
                    {item?.product?.name} {variations?.variant_slug}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 3,
                        alignItems: "center",
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
                    <Text style={{ ...Fonts.blackColor12Medium }}>(4.5)</Text>
                </View>
                {/* <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginVertical: Sizes.fixPadding - 5.0,
                    }}
                >
                    {variations?.attributeList[0]?.list?.map((item, i) => (
                        <Text
                            key={i}
                            style={{
                                ...Fonts.blackColor13SemiBold,
                                paddingRight: Sizes.fixPadding,
                            }}
                        >
                            {item?.value}
                        </Text>
                    ))}
                </View> */}

                <View style={styles.specialPriceTextWrapStyle}>
                    <Text style={{ ...Fonts.primaryColor11Medium }}>
                        {item?.product?.brand_id?.name}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ ...Fonts.blackColor17SemiBold }}>
                        {`₹`}
                        {variations.prices[0].sale_rate}
                    </Text>
                    <Text
                        style={{
                            marginHorizontal: Sizes.fixPadding,
                            textDecorationLine: "line-through",
                            ...Fonts.lightGrayColor14Medium,
                        }}
                    >
                        {`₹`}
                        {variations.prices[0].mrp}
                    </Text>
                    {/* {variations.prices[0].discount && ( */}
                    <Text style={{ ...Fonts.primaryColor14Medium }}>
                        {getLocalizedString("You save")}: ₹
                        {Number(variations.prices[0].mrp) -
                            Number(variations.prices[0].sale_rate)}
                    </Text>
                    {/* )} */}
                    {/* <Text
                        style={{
                            ...Fonts.blackColor15Bold,
                            color: Colors.whiteColor,
                            fontSize: 10,
                            backgroundColor: Colors.greenColor,
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                            borderRadius: 4,
                            alignSelf: "flex-start",
                        }}
                    >
                        {Math.round(
                            ((variations.prices[0].mrp -
                                variations.prices[0].sale_rate) /
                                variations.prices[0].mrp) *
                                100
                        )}
                        % off
                    </Text> */}
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor13Medium,
                            textTransform: "capitalize",
                        }}
                    >
                        Availability:
                    </Text>
                    <View
                        style={{
                            backgroundColor:
                                variations.display_status == "In Stock"
                                    ? Colors.greenColor
                                    : Colors.redColor,
                            padding: 3,
                            borderRadius: 30,
                            paddingHorizontal: 5,
                        }}
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor13SemiBold,
                                color: Colors.whiteColor,
                                fontSize: 9,
                            }}
                        >
                            {variations.display_status}
                        </Text>
                    </View>
                </View>
                {/* <View
                    style={{
                        marginVertical: Sizes.fixPadding,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View style={styles.ratingWrapStyle}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>4.3</Text>
                        <MaterialIcons
                            name="star"
                            color={Colors.whiteColor}
                            size={15}
                            style={{ marginLeft: Sizes.fixPadding - 5.0 }}
                        />
                    </View>
                    <Text
                        style={{
                            marginLeft: Sizes.fixPadding,
                            ...Fonts.lightGrayColor13Medium,
                        }}
                    >
                        2814 ratings
                    </Text>
                </View> */}
                {divider()}
                <CheckCodDelivery />
                {divider()}
                <UploadWPCLicence />
                {divider()}
                <UserLicence />
                {divider()}
                {item?.product?.special_notes?.length > 0 && (
                    <>
                        <SpecialNotes list={item?.product?.special_notes} />
                        {divider()}
                    </>
                )}
                {item?.product?.offer_info_slid?.length > 0 && (
                    <>
                        <OfferInfoCards list={item?.product?.offer_info_slid} />
                        {divider()}
                    </>
                )}
            </View>
        );
    }

    function _renderItem({ item, index }) {
        return (
            <View
                style={{
                    backgroundColor: Colors.whiteColor,
                    width: width,
                    height: 390.0,
                }}
            >
                {item && (
                    <ImageBackground
                        source={{ uri: item }}
                        style={{
                            width: width - 20,
                            height: 380.0,
                            alignSelf: "center",
                            backgroundColor: Colors.whiteColor,
                        }}
                        resizeMode="contain"
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            colors={[
                                "transparent",
                                "transparent",
                                "transparent",
                                "transparent",
                                "transparent",
                                "rgba(255,255,255,0.99)",
                            ]}
                            style={{
                                width: width,
                                height: 410.0,
                                alignSelf: "center",
                            }}
                        ></LinearGradient>
                    </ImageBackground>
                )}
            </View>
        );
    }

    function productImagesSlider() {
        return (
            <View>
                <ImageBackground
                    source={require("../../assets/images/baofeng_radios.png")}
                    resizeMode="center"
                >
                    <Carousel
                        data={productImages}
                        sliderWidth={width}
                        autoplay={true}
                        loop={true}
                        autoplayInterval={4000}
                        itemWidth={width}
                        renderItem={_renderItem}
                        onSnapToItem={(index) => setActiveSlide(index)}
                    />
                </ImageBackground>
                {pagination()}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        __handleAddToWishlist();
                    }}
                    style={styles.favoriteIconWrapStyle}
                >
                    <MaterialIcons
                        name={
                            item?.product?.wish ? "favorite" : "favorite-border"
                        }
                        color={
                            item?.product?.wish
                                ? Colors.primaryColor
                                : Colors.lightGrayColor
                        }
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={productImages.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.sliderPaginationWrapStyle}
                dotStyle={styles.sliderActiveDotStyle}
                inactiveDotStyle={styles.sliderInactiveDotStyle}
            />
        );
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={styles.backArrowAndProductTitleWrapStyle}>
                    <MaterialIcons
                        name="arrow-back"
                        size={25}
                        color="black"
                        style={{ marginRight: Sizes.fixPadding + 5.0 }}
                        onPress={() => navigation.pop()}
                    />
                    <Text
                        numberOfLines={1}
                        style={{ flex: 1, ...Fonts.blackColor18Bold }}
                    >
                        {item?.productTitle}
                    </Text>
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
                        {/* <View style={styles.favoritsAndShoppingsCountStyle}>
                            <Text style={{ ...Fonts.whiteColor12Medium }}>
                                2
                            </Text>
                        </View> */}
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
                        {/* <View style={styles.favoritsAndShoppingsCountStyle}>
                            <Text style={{ ...Fonts.whiteColor12Medium }}>
                                {bagItemCount}
                            </Text>
                        </View> */}
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
        justifyContent: "flex-end",
        alignItems: "center",
    },
    backArrowAndProductTitleWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        flex: 2.0,
        marginRight: Sizes.fixPadding + 10.0,
    },
    sliderActiveDotStyle: {
        width: 11,
        height: 11,
        borderRadius: 5.5,
        backgroundColor: Colors.blueColor,
        marginHorizontal: Sizes.fixPadding - 18.0,
    },
    sliderInactiveDotStyle: {
        width: 12,
        height: 12,
        borderRadius: 6.0,
        backgroundColor: Colors.grayColor,
    },
    sliderPaginationWrapStyle: {
        position: "absolute",
        bottom: -20.0,
        left: 0.0,
        right: 0.0,
    },

    ratingWrapStyle: {
        flexDirection: "row",
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 1.0,
        paddingHorizontal: Sizes.fixPadding - 3.0,
        alignItems: "center",
        elevation: 10.0,
    },
    specialPriceTextWrapStyle: {
        backgroundColor: "#EEEEEE",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
        paddingHorizontal: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 8.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding - 3.0,
    },

    productDetailWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding - 5.0,
    },

    bottomSheetWrapStyle: {
        position: "absolute",
        left: 0.0,
        right: 0.0,
        bottom: 0.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
    },
    bottomSheetDividerStyle: {
        backgroundColor: "#e0e0e0",
        height: 1.0,
        marginVertical: Sizes.fixPadding,
    },
    addToBagAndByNowButtonStyle: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    addToBagAndByNowButtonWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        borderTopColor: "#ececec",
        borderTopWidth: 1.0,
    },
    favoriteIconWrapStyle: {
        position: "absolute",
        right: 20.0,
        top: 20.0,
        width: 60.0,
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: 30.0,
        alignItems: "center",
        justifyContent: "center",
    },
    snackBarStyle: {
        position: "absolute",
        bottom: 40.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: "#333333",
    },
});

export default ProductDetailScreen;
