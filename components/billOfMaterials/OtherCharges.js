import React from "react";
import { View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";

const OtherCharges = () => {
    return (
        <View
            style={{
                borderRadius: 5,
                backgroundColor: Colors.whiteColor,
                marginHorizontal: 10,
                padding: 10,
                gap: 10,
                marginTop: 5,
            }}
        >
            <Text
                style={{
                    ...Fonts.blackColor16Bold,
                    color: Colors.grayColor,
                }}
            >
                Other Charges
            </Text>
            {lableAndValue("Labour Charges", "₹50")}
            {lableAndValue("Machinery Charges", "₹10")}
            {lableAndValue("Electricity Charges", "₹10")}
            {lableAndValue("Other Charges", "₹50")}
        </View>
    );
    function lableAndValue(lable_text, value) {
        return (
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor13Medium,
                        color: Colors.grayColor,
                        width: "60%",
                    }}
                >
                    {lable_text}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor13Medium,
                        color: Colors.grayColor,
                    }}
                >
                    :
                </Text>
                <View
                    style={{
                        width: "40%",
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor12Medium,
                            textAlign: "right",
                        }}
                    >
                        {value}
                    </Text>
                </View>
            </View>
        );
    }
};

export default OtherCharges;
