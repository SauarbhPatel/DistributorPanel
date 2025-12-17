import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { DropDownTextAreaBox } from "../../modules";
import { FlatList } from "react-native";
const { width } = Dimensions.get("window");
import {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome5,
    FontAwesome,
    Feather,
} from "@expo/vector-icons";

const HomeFooter = ({ activeIndex = 0, onChangeIndex = () => {} }) => {
    return (
        <View>
            <View
                style={{
                    backgroundColor: Colors.whiteColor,
                    paddingVertical: 10,
                    borderTopWidth: 1,
                    borderColor: Colors.borderColor,
                }}
            >
                <FlatList
                    data={[
                        {
                            name: "Sales",
                            color: "#F5CA00",
                            icon: (
                                <FontAwesome
                                    name="rupee"
                                    size={16}
                                    color={
                                        activeIndex === 0
                                            ? Colors.primaryColor
                                            : Colors.blackColor
                                    }
                                />
                            ),
                        },
                        {
                            name: "Shipping",
                            color: "#F3C7E5",
                            icon: (
                                <MaterialIcons
                                    name="local-shipping"
                                    size={16}
                                    color={
                                        activeIndex === 1
                                            ? Colors.primaryColor
                                            : Colors.blackColor
                                    }
                                />
                            ),
                        },
                        {
                            name: " Customers",
                            color: "#B7E5DD",
                            icon: (
                                <Feather
                                    name="users"
                                    size={16}
                                    color={
                                        activeIndex === 2
                                            ? Colors.primaryColor
                                            : Colors.blackColor
                                    }
                                />
                            ),
                        },
                        {
                            name: "Reports",
                            color: "#FAF0D7",
                            icon: (
                                <FontAwesome5
                                    name="clipboard-list"
                                    size={16}
                                    color={
                                        activeIndex === 3
                                            ? Colors.primaryColor
                                            : Colors.blackColor
                                    }
                                />
                            ),
                        },
                    ]}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => onChangeIndex(index)}
                            style={{
                                // padding: 10,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                                width: width / 4,
                            }}
                        >
                            {item.icon}
                            <Text
                                style={{
                                    ...Fonts.blackColor12Medium,
                                    textAlign: "center",
                                    color:
                                        activeIndex === index
                                            ? Colors.primaryColor
                                            : Colors.blackColor,
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{}}
                    horizontal
                />
            </View>
        </View>
    );
};

export default HomeFooter;
