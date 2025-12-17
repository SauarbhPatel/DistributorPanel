// import { FlatList, View } from "react-native";
// import { __generateRandomString } from "../../utils/funtion";
// import { Text } from "react-native";
// import { Colors, Fonts } from "../../constants/styles";

// const ProductDetailsTabs = ({ list = [], activeTab = 0, isSticky = false }) => {
//     console.log("activeTab", activeTab);
//     return (
//         list?.length > 0 && (
//             <View
//                 style={{
//                     paddingBottom: 10,
//                     ...(isSticky
//                         ? {
//                               position: "absolute",
//                               zIndex: 1000,
//                               top: 60,
//                           }
//                         : {
//                               backgroundColor: Colors.whiteColor,
//                           }),
//                 }}
//             >
//                 <FlatList
//                     horizontal
//                     data={list}
//                     showsHorizontalScrollIndicator={false}
//                     renderItem={({ item, index }) => (
//                         <View
//                             style={{
//                                 backgroundColor:
//                                     activeTab == index
//                                         ? Colors.primaryColor
//                                         : Colors.whiteColor,
//                                 padding: 10,
//                                 borderWidth: 1,
//                                 borderColor: Colors.borderColor,
//                                 borderRadius: 8,
//                             }}
//                         >
//                             <Text
//                                 style={{
//                                     ...Fonts.blackColor12Medium,

//                                     color:
//                                         activeTab == index
//                                             ? Colors.whiteColor
//                                             : Colors.blackColor,
//                                 }}
//                             >
//                                 {item?.title}
//                             </Text>
//                         </View>
//                     )}
//                     keyExtractor={() => __generateRandomString(5)}
//                     contentContainerStyle={{
//                         paddingHorizontal: 10,
//                         gap: 10,
//                     }}
//                 />
//             </View>
//         )
//     );
// };

// export default ProductDetailsTabs;

// import { FlatList, View } from "react-native";
// import { __generateRandomString } from "../../utils/funtion";
// import { Text } from "react-native";
// import { Colors, Fonts } from "../../constants/styles";
// import React, { useEffect, useRef } from "react";

// const ProductDetailsTabs = ({ list = [], activeTab = 0, isSticky = false }) => {
//     const tabsRef = useRef(null);

//     // 👉 Auto scroll to active tab whenever activeTab changes
//     useEffect(() => {
//         if (tabsRef.current && list.length > 0) {
//             tabsRef.current.scrollToIndex({
//                 index: activeTab,
//                 animated: true,
//                 viewPosition: 0.5, // center the tab horizontally
//             });
//         }
//     }, [activeTab]);

//     return (
//         list?.length > 0 && (
//             <View
//                 style={{
//                     paddingVertical: 10,
//                     ...(isSticky
//                         ? {
//                               position: "absolute",
//                               zIndex: 1000,
//                               top: 55,
//                               backgroundColor: Colors.whiteColor,
//                               width: "100%",
//                           }
//                         : {
//                               backgroundColor: Colors.whiteColor,
//                           }),
//                 }}
//             >
//                 <FlatList
//                     ref={tabsRef}
//                     horizontal
//                     data={list}
//                     showsHorizontalScrollIndicator={false}
//                     renderItem={({ item, index }) => (
//                         <View
// style={{
//     backgroundColor:
//         activeTab == index
//             ? Colors.primaryColor
//             : Colors.whiteColor,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: Colors.borderColor,
//     borderRadius: 8,
// }}
//                         >
//                             <Text
//                                 style={{
//                                     ...Fonts.blackColor12Medium,
//                                     color:
//                                         activeTab == index
//                                             ? Colors.whiteColor
//                                             : Colors.blackColor,
//                                 }}
//                             >
//                                 {item?.title}
//                             </Text>
//                         </View>
//                     )}
//                     keyExtractor={() => __generateRandomString(5)}
//                     contentContainerStyle={{
//                         paddingHorizontal: 10,
//                         gap: 10,
//                     }}
//                     onScrollToIndexFailed={() => {}}
//                 />
//             </View>
//         )
//     );
// };

// export default ProductDetailsTabs;
import { View, FlatList, Text } from "react-native";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { useRef, useEffect } from "react";
import { __generateRandomString } from "../../utils/funtion";
import { Colors, Fonts } from "../../constants/styles";

const TAB_WIDTH = 110; // adjust based on your UI

const ProductDetailsTabs = ({ list = [], activeTab = 0, isSticky = false }) => {
    const listRef = useRef(null);

    // Auto scroll to active tab
    useEffect(() => {
        if (listRef.current && activeTab != null) {
            listRef.current.scrollToIndex({
                index: activeTab,
                animated: true,
                viewPosition: 0.5, // centers the tab
            });
        }
    }, [activeTab]);

    // Fade + slide animation when sticky
    const fadeStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isSticky ? 1 : 0, { duration: 1000 }),
            transform: [
                {
                    translateY: withTiming(isSticky ? 0 : -10, {
                        duration: 1000,
                    }),
                },
            ],
        };
    }, [isSticky]);

    return (
        list?.length > 0 && (
            <Animated.View
                style={[
                    {
                        position: "absolute",
                        width: "100%",
                        top: 55,
                        zIndex: 1000,
                        paddingVertical: 10,
                        backgroundColor: Colors.whiteColor,
                    },
                    fadeStyle,
                ]}
            >
                <FlatList
                    ref={listRef}
                    horizontal
                    data={list}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                backgroundColor:
                                    activeTab == index
                                        ? Colors.primaryColor
                                        : Colors.whiteColor,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: Colors.borderColor,
                                borderRadius: 8,
                            }}
                        >
                            <Text
                                style={{
                                    ...Fonts.blackColor12Medium,
                                    color:
                                        activeTab === index
                                            ? Colors.whiteColor
                                            : Colors.blackColor,
                                }}
                            >
                                {item?.title}
                            </Text>
                        </View>
                    )}
                    keyExtractor={() => __generateRandomString(5)}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        gap: 10,
                    }}
                    getItemLayout={(_, index) => ({
                        index,
                        length: TAB_WIDTH + 10,
                        offset: (TAB_WIDTH + 10) * index,
                    })}
                />
            </Animated.View>
        )
    );
};

export default ProductDetailsTabs;
