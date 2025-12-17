import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import {
    __makeFilterBrandGetRequest,
    __makeFilterCateggoryGetRequest,
} from "../../utils/api";
import { __generateRandomString } from "../../utils/funtion";

const FilterScreen = ({ navigation, route }) => {
    const [filterCatList, setFilterCatList] = useState([]);
    const [filterBrandList, setFilterBrandList] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);

    const __handleGetFilterCategory = () => {
        __makeFilterCateggoryGetRequest()
            .then((res) => {
                setFilterCatList(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const __handleGetFilterBrand = () => {
        __makeFilterBrandGetRequest()
            .then((res) => {
                setFilterBrandList(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const toggleCategory = (id) => {
        let newArray = category;
        console.log(newArray);

        if (newArray.includes(id)) {
            newArray = newArray.filter((item) => item != id);
        } else {
            newArray.push(id);
        }
        console.log(newArray);
        setCategory(newArray);
        setFilterCatList((prv) => [...prv]);
    };
    const toggleBrand = (id) => {
        let newArray = brand;
        console.log(newArray);

        if (newArray.includes(id)) {
            newArray = newArray.filter((item) => item != id);
        } else {
            newArray.push(id);
        }
        console.log(newArray);
        setBrand(newArray);
        setFilterCatList((prv) => [...prv]);
    };

    useEffect(() => {
        route?.params?.categories && setCategory(route?.params?.categories);
        route?.params?.brands && setBrand(route?.params?.brands);

        setTimeout(() => {
            __handleGetFilterCategory();
            __handleGetFilterBrand();
        }, 200);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                >
                    {priceInfo()}
                    {brandInfo()}
                    <View style={{ height: 20 }} />
                    {/* {occasionInfo()} */}
                </ScrollView>
                {cancelAndApplyButton()}
            </View>
        </SafeAreaView>
    );

    function cancelAndApplyButton() {
        return (
            <View style={styles.cancelAndApplyButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.pop()}
                    style={{
                        backgroundColor: Colors.whiteColor,
                        ...styles.cancelAndApplyButtonStyle,
                    }}
                >
                    <Text style={{ ...Fonts.blackColor15Bold }}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        navigation.replace("Products", {
                            filter: {
                                categories: category,
                                brands: brand,
                                minPrice: 10000,
                                maxPrice: 0,
                                sort: 5,
                            },
                        });
                    }}
                    style={{
                        backgroundColor: Colors.primaryColor,
                        ...styles.cancelAndApplyButtonStyle,
                    }}
                >
                    <Text style={{ ...Fonts.whiteColor15Bold }}>APPLY</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // function occasionInfo() {
    //     return (
    //         <View>
    //             {divider()}
    //             <Text
    //                 style={{
    //                     paddingVertical: Sizes.fixPadding,
    //                     ...Fonts.blackColor15SemiBold,
    //                     textAlign: "center",
    //                 }}
    //             >
    //                 OCCASION
    //             </Text>
    //             {divider()}
    //             {occasions.map((item, index) => (
    //                 <View key={`${item.id}`}>
    //                     <View
    //                         style={{
    //                             marginTop:
    //                                 index == 0 ? Sizes.fixPadding + 5.0 : 0.0,
    //                             ...styles.chackBoxWithTextWrapStyle,
    //                         }}
    //                     >
    //                         <TouchableOpacity
    //                             activeOpacity={0.9}
    //                             onPress={() => {
    //                                 toggleOccasionCheck({ id: item.id });
    //                             }}
    //                             style={{
    //                                 ...styles.checkBoxStyle,
    //                                 backgroundColor: item.isSelected
    //                                     ? Colors.primaryColor
    //                                     : Colors.whiteColor,
    //                                 borderColor: item.isSelected
    //                                     ? Colors.primaryColor
    //                                     : Colors.lightGrayColor,
    //                             }}
    //                         >
    //                             {item.isSelected ? (
    //                                 <MaterialIcons
    //                                     name="check"
    //                                     size={15}
    //                                     color={Colors.whiteColor}
    //                                 />
    //                             ) : null}
    //                         </TouchableOpacity>
    //                         <Text
    //                             style={{
    //                                 marginLeft: Sizes.fixPadding + 5.0,
    //                                 ...Fonts.blackColor13Medium,
    //                             }}
    //                         >
    //                             {item.occasion}
    //                         </Text>
    //                     </View>
    //                 </View>
    //             ))}
    //         </View>
    //     );
    // }

    function brandInfo() {
        return (
            <View style={{ paddingBottom: 50 }}>
                {divider()}
                <Text
                    style={{
                        marginVertical: Sizes.fixPadding,
                        ...Fonts.blackColor15SemiBold,
                        textAlign: "center",
                    }}
                >
                    BRAND
                </Text>
                {divider()}
                {filterBrandList.map((item, index) => (
                    <View key={__generateRandomString(10)}>
                        <View
                            style={{
                                marginTop:
                                    index == 0 ? Sizes.fixPadding + 5.0 : 0.0,
                                ...styles.chackBoxWithTextWrapStyle,
                            }}
                        >
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    console.log("first");
                                    toggleBrand(item.uid);
                                }}
                                style={{
                                    ...styles.checkBoxStyle,
                                    backgroundColor: brand.includes(item.uid)
                                        ? Colors.primaryColor
                                        : Colors.whiteColor,
                                    borderColor: brand.includes(item.uid)
                                        ? Colors.primaryColor
                                        : Colors.lightGrayColor,
                                }}
                            >
                                {brand.includes(item.uid) ? (
                                    <MaterialIcons
                                        name="check"
                                        size={15}
                                        color={Colors.whiteColor}
                                    />
                                ) : null}
                            </TouchableOpacity>
                            <Text
                                onPress={() => {
                                    toggleBrand(item.uid);
                                }}
                                style={{
                                    marginLeft: Sizes.fixPadding + 5.0,
                                    ...Fonts.blackColor13Medium,
                                }}
                            >
                                {item.name}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    function priceInfo() {
        return (
            <View>
                <Text
                    style={{
                        marginVertical: Sizes.fixPadding,
                        ...Fonts.blackColor15SemiBold,
                        textAlign: "center",
                    }}
                >
                    CATEGORIES
                </Text>
                {divider()}
                {filterCatList.map((item, index) => (
                    <View key={__generateRandomString(10)}>
                        <View
                            style={{
                                marginTop:
                                    index == 0 ? Sizes.fixPadding + 5.0 : 0.0,
                                ...styles.chackBoxWithTextWrapStyle,
                            }}
                        >
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    toggleCategory(item.uid);
                                }}
                                style={{
                                    ...styles.checkBoxStyle,
                                    backgroundColor: category.includes(item.uid)
                                        ? Colors.primaryColor
                                        : Colors.whiteColor,
                                    borderColor: category.includes(item.uid)
                                        ? Colors.primaryColor
                                        : Colors.lightGrayColor,
                                }}
                            >
                                {category.includes(item.uid) ? (
                                    <MaterialIcons
                                        name="check"
                                        size={15}
                                        color={Colors.whiteColor}
                                    />
                                ) : null}
                            </TouchableOpacity>
                            <Text
                                onPress={() => {
                                    toggleCategory(item.uid);
                                }}
                                style={{
                                    marginLeft: Sizes.fixPadding + 5.0,
                                    ...Fonts.blackColor13Medium,
                                }}
                            >
                                {item.name}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    // function toggleOccasionCheck({ id }) {
    //     const newList = occasions.map((item) => {
    //         if (item.id === id) {
    //             const updatedItem = { ...item, isSelected: !item.isSelected };
    //             return updatedItem;
    //         }
    //         return item;
    //     });
    //     setOccasions(newList);
    // }

    // function toggleBrandCheck({ id }) {
    //     const newList = brands.map((brand) => {
    //         if (brand.id === id) {
    //             const updatedItem = { ...brand, isSelected: !brand.isSelected };
    //             return updatedItem;
    //         }
    //         return brand;
    //     });
    //     setBrands(newList);
    // }

    function divider() {
        return (
            <View
                style={{
                    backgroundColor: "#e0e0e0",
                    height: 1.0,
                    marginHorizontal: Sizes.fixPadding - 5.0,
                }}
            />
        );
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text
                    style={{
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.blackColor18Bold,
                    }}
                >
                    FILTER
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        elevation: 2.0,
    },
    checkBoxStyle: {
        height: 19.0,
        width: 19.0,
        borderWidth: 2.0,
        alignItems: "center",
        justifyContent: "center",
    },
    chackBoxWithTextWrapStyle: {
        flexDirection: "row",
        marginBottom: Sizes.fixPadding + 15.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: "center",
    },
    cancelAndApplyButtonStyle: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    cancelAndApplyButtonWrapStyle: {
        position: "absolute",
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        flexDirection: "row",
        alignItems: "center",
        flex: 1.0,
    },
});

export default FilterScreen;
