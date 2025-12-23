import React from "react";
import { View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";
import { TextAreaBox } from "../../modules";

const BillingBox = () => {
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
            {lableAndValue("Total (before tax)", "₹0.00")}
            {lableAndValue("Total Tax", "₹0.00")}
            {lableAndValue("Total (after tax)", "₹0.00")}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                    marginTop: 5,
                    borderColor: Colors.lightGrayColor,
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor16Bold,
                        color: Colors.grayColor,
                    }}
                >
                    Grand Total
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor16Bold,
                    }}
                >
                    ₹0.00
                </Text>
            </View>
            <TextAreaBox
                value={""}
                onChangeText={(value) => {
                    // updateState(value);
                }}
                placeholder={"0"}
                title={"Advance To Pay"}
                valuekey={"res"}
                titleCustomStyle={{
                    marginHorizontal: 0,
                    marginTop: 5,
                }}
                inputCustomStyle={{
                    marginHorizontal: 0,
                    borderWidth: 1,
                    borderColor: "#c1c1c1ff",
                    elevation: 0,
                    backgroundColor: Colors.whiteColor,
                    paddingVertical: 5,
                }}
                leftIcon={<Text>₹</Text>}
                customStyle={{ marginBottom: 0 }}
            />
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

export default BillingBox;
