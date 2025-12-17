import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { DropDownTextAreaBox } from "../../modules";
import { FlatList } from "react-native";
const { width } = Dimensions.get("window");

const OverviewFilterCard = ({ activeIndex = 0, onChangeIndex = () => {} }) => {
    return (
        <View>
            <View
                style={{
                    backgroundColor: Colors.whiteColor,
                    padding: 15,
                    margin: 10,
                    borderRadius: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 5,
                }}
            >
                <View>
                    <Text style={{ ...Fonts.blackColor13Bold }}>
                        Dashboard Overview
                    </Text>
                    <Text style={{ ...Fonts.blackColor11Medium }}>
                        Thursday, December 04, 2025
                    </Text>
                </View>
                <DropDownTextAreaBox
                    value={{ id: "2", name: "Month" }}
                    type={"select"}
                    list={[
                        { id: "1", name: "Week" },
                        { id: "2", name: "Month" },
                        { id: "3", name: "Quarter" },
                    ]}
                    onSelected={(value) => {
                        // updateState({ City: value });
                        // onSelectedCity(value);
                    }}
                    placeholder={"Select Duration"}
                    valuekey={"city"}
                    inputCustomStyle={{
                        marginHorizontal: 0,
                        borderWidth: 1.2,
                        elevation: 0,
                        height: 30,
                        backgroundColor: "rgba(0,0,0,0)",
                        width: 120,
                        padding: 0,
                        paddingHorizontal: 5,
                        paddingVertical: 0,
                        marginLeft: -10,
                        borderRadius: 7,
                        borderColor: Colors.borderColor,
                    }}
                    dropDownTextCustomStyle={{
                        fontSize: 11,
                        paddingVertical: 0,
                    }}
                    customStyle={{ marginTop: 0, marginBottom: 0 }}
                    isSearchable
                    inputBoxCustomStyle={{
                        fontSize: 12,
                        fontWeight: "600",
                        // color: Colors.blackColor,
                    }}
                />
            </View>
            {/* <View
                style={{
                    // backgroundColor: Colors.whiteColor,
                    margin: 10,
                    marginTop: 0,
                    borderRadius: 10,
                }}
            >
                <FlatList
                    data={[
                        { name: "Sales Data", color: "#F5CA00" },
                        { name: "Shipping", color: "#F3C7E5" },
                        {
                            name: "Visitors & Customer Details",
                            color: "#B7E5DD",
                        },
                        { name: "Reports", color: "#FAF0D7" },
                    ]}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => onChangeIndex(index)}
                            style={{
                                backgroundColor:
                                    activeIndex === index
                                        ? Colors.primaryColor
                                        : item?.color,
                                padding: 10,
                                borderRadius: 5,
                                flex: 1,
                                borderWidth: 2,
                                height: 70,
                                width: (width - 40) / 2,
                                margin: 5,
                                borderColor:
                                    activeIndex === index
                                        ? Colors.primaryColor
                                        : item?.color,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                            }}
                        >
                            <Text
                                style={{
                                    ...Fonts.blackColor15Medium,
                                    textAlign: "center",
                                    color:
                                        activeIndex === index
                                            ? Colors.whiteColor
                                            : Colors.blackColor,
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ gap: 10 }}
                    numColumns={2}
                />
            </View> */}
        </View>
    );
};

export default OverviewFilterCard;
