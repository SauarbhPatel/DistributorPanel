import React from "react";
import { View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";

const ProcessDetails = () => {
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
                Process Details
            </Text>
            {lableAndValue("Order Number", "PID00003")}
            {lableAndValue("FG Store", "Default Stock Store")}
            {lableAndValue("BOM Name", "Walki Talki - BF888S")}
            {lableAndValue("RM Store", "Default Stock Store")}
            {lableAndValue("BOM Number", "BOM00000")}
            {lableAndValue("Scrap/Reject Store", "Default Stock Store")}
            {lableAndValue("Last Modified Date", "30/12/2025 - 17:46")}
            {lableAndValue("Reference Number", "BF888s-TEST")}
            {lableAndValue("Creation Date", "30/12/2025 - 17:46")}
            {lableAndValue("Created By", "Abdul")}
            {lableAndValue("Order Delivery Date", "-")}
            {lableAndValue("Expected Process Completion Date", "-")}
            {lableAndValue("BOM Description", "Walki Talki - BF888S")}
            {lableAndValue(
                "Comment",
                "Use this space to provide guidelines/ instructions to the team"
            )}
            <Text
                style={{
                    ...Fonts.blackColor13Medium,
                    // color: Colors.grayCo / lor,
                }}
            >
                ATTACHMENTS
            </Text>
            <Text
                style={{
                    ...Fonts.blackColor13Medium,
                    color: Colors.grayColor,
                }}
            >
                Maximum of 6 file attachments are allowed, Each file should be
                under 5MB.
            </Text>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: Colors.greenColor,
                    padding: 10,
                    borderRadius: 5,
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor13Medium,
                        color: Colors.greenColor,
                        textAlign: "center",
                    }}
                >
                    Attach file
                </Text>
            </View>
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
                        width: "40%",
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
                        width: "60%",
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

export default ProcessDetails;
