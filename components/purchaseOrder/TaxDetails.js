import React from "react";
import { View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";
import { TextAreaBox } from "../../modules";

const TaxDetails = () => {
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
            {lableAndValue("Total (before Tax)", "₹150.00")}

            <View
                style={{
                    flexDirection: "row",
                    gap: 1,
                    borderWidth: 1.5,
                    borderColor: Colors.borderColor,
                    borderRightWidth: 0,
                    borderRadius: 5,
                    overflow: "hidden",
                    backgroundColor: Colors.backColor,
                }}
            >
                <TaxCard title="CGST" amount="₹2.25" />
                <TaxCard title="SGST" amount="₹2.25" />
                <TaxCard title="IGST" amount="₹0.00" />
                <TaxCard title="Cess" amount="₹0.00" />
            </View>
            {lableAndValue("Total Tax", "₹4.50")}
            {lableAndValue("Total (after tax)", "₹154.50")}
            {lableAndValue("Grand Total", "₹154.50")}
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
                        ...Fonts.blackColor13SemiBold,
                    }}
                >
                    {value}
                </Text>
            </View>
        );
    }
};

export default TaxDetails;
const TaxCard = ({ title, amount }) => {
    return (
        <View
            style={{
                flex: 1,
                gap: 5,
                paddingVertical: 5,
                borderRightWidth: 1.5,
                borderColor: Colors.borderColor,
            }}
        >
            <View style={{ height: 20 }}>
                <Text
                    style={{ ...Fonts.blackColor15Bold, textAlign: "center" }}
                >
                    {title}
                </Text>
            </View>
            <View
                style={{ height: 1.5, backgroundColor: Colors.borderColor }}
            />
            <View style={{ height: 20 }}>
                <Text
                    style={{ ...Fonts.blackColor12Medium, textAlign: "center" }}
                >
                    {amount}
                </Text>
            </View>
        </View>
    );
};
