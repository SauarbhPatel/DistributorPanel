import React from "react";
import { View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";
import { TextAreaBox } from "../../modules";

const InvoiceDetails = () => {
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
                Invoice Details
            </Text>
            {lableAndValue("Invoice Number", "INVDM0002")}
            {lableAndValue("Invoice Date", "11/12/2025")}
            {lableAndValue("PO Number", "PO/0001")}
            {lableAndValue("PO Date", "22/12/2025")}
            {lableAndValue("OC Number", "OC00001")}
            {lableAndValue("OC Date", "22/12/2025")}
            {lableAndValue("Payment Date", "22/12/2025")}
            {lableAndValue("Transporter Doc Date", "22/12/2025")}
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

export default InvoiceDetails;
