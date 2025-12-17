import React from "react";
import { View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";

const MainCards = ({
    isActive,
    sr_no,
    title,
    sub_title,
    inputForm = <></>,
}) => {
    return (
        <View>
            <View
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
                    <Text style={{ ...Fonts.blackColor12Medium }}>
                        {sub_title}
                    </Text>
                </View>
            </View>
            {isActive ? inputForm : <></>}
        </View>
    );
};

export default MainCards;
