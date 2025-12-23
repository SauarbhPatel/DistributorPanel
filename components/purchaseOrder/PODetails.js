import React from "react";
import { View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";
import { TextAreaBox } from "../../modules";

const PODetails = () => {
    return (
        <View
            style={{
                borderRadius: 5,
                backgroundColor: Colors.whiteColor,
                marginHorizontal: 10,
                padding: 10,
                gap: 10,
            }}
        >
            <Text
                style={{
                    ...Fonts.blackColor16Bold,
                    color: Colors.grayColor,
                }}
            >
                PO Details
            </Text>
            {lableAndValue("PO Number", "WR00003")}
            {lableAndValue("PO Date", "22/12/2025")}
            {lableAndValue("Delivery Date", "22/12/2025")}
            {lableAndValue("PO Amendment", "0")}
            {lableAndValue("No of Items", "2")}
            {lableAndValue("PO Amount", "₹154.50")}
        </View>
    );
    function lableAndValue(lable_text, value) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor13Medium,
                        color: Colors.grayColor,
                    }}
                >
                    {lable_text}:
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor12Medium,
                    }}
                >
                    {value}
                </Text>
            </View>
        );
    }
};

export default PODetails;
