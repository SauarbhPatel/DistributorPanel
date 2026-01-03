import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";

const SingleSelectTab = ({
    tabType = 1,
    list = [],
    active = null,
    onPress = () => {},
}) => {
    return (
        <View style={{}}>
            <FlatList
                data={list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => onPress(item?.id, item)}
                        style={
                            tabType == 1
                                ? {
                                      borderWidth: 1.5,
                                      borderColor: Colors.greenColor,
                                      padding: 10,
                                      borderRadius: 30,
                                      paddingHorizontal: 20,
                                      backgroundColor:
                                          active == item?.id
                                              ? Colors.greenColor
                                              : Colors.whiteColor,
                                  }
                                : tabType == 2
                                ? {
                                      borderBottomWidth: 1.5,
                                      padding: 10,
                                      borderColor:
                                          active == item?.id
                                              ? Colors.greenColor
                                              : Colors.whiteColor,
                                  }
                                : {}
                        }
                    >
                        <Text
                            style={{
                                ...Fonts.blackColor13Medium,
                                color:
                                    active == item?.id
                                        ? tabType == 1
                                            ? Colors.whiteColor
                                            : Colors.greenColor
                                        : Colors.blackColor,
                            }}
                        >
                            {item?.name}
                        </Text>
                    </TouchableOpacity>
                )}
                horizontal
                contentContainerStyle={{
                    gap: 10,
                    marginTop: 0,
                    paddingHorizontal: 10,
                }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default SingleSelectTab;
