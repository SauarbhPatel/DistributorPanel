import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";

const MainCards = ({
    isActive,
    sr_no,
    title,
    sub_title,
    inputForm = <></>,
    onPress = () => {},
}) => {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={1}
                style={{
                    borderWidth: 1.5,
                    borderColor: isActive
                        ? Colors.primaryColor
                        : Colors.whiteColor,
                    padding: 10,
                    marginHorizontal: 10,
                    borderRadius: 10,
                    backgroundColor: Colors.whiteColor,
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: Colors.bodyColor,
                        borderRadius: 50,
                    }}
                >
                    <Text style={{ ...Fonts.blackColor13Bold }}>{sr_no}</Text>
                </View>
                <View>
                    <Text
                        style={{ ...Fonts.blackColor13SemiBold, fontSize: 15 }}
                    >
                        {title}
                    </Text>
                    {sub_title ? (
                        <Text style={{ ...Fonts.blackColor12Medium }}>
                            {sub_title}
                        </Text>
                    ) : null}
                </View>
            </TouchableOpacity>
            <View style={{ display: isActive ? "flex" : "none" }}>
                {inputForm}
                {/* {isActive ? inputForm : <></>} */}
            </View>
        </View>
    );
};

export default MainCards;
