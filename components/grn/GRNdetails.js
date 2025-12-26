import React from "react";
import { View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";
import { TextAreaBox } from "../../modules";

const GRNdetails = () => {
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
                Inward Details
            </Text>
            {lableAndValue("GRN/QIR Number", "GRN0078")}
            {lableAndValue("Creation Date", "22/12/2025")}
            {lableAndValue("Delivery Date", "22/12/2025")}
            {lableAndValue("Amendment", "0")}
            {lableAndValue("PO Number", "PO00004")}
            {lableAndValue("PO Date", "22/12/2025")}
            {lableAndValue("Inward Number", "WRO00004")}
            {lableAndValue("Inward Date", "22/12/2025")}
            {lableAndValue("Testing Date", "22/12/2025")}
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

export default GRNdetails;
