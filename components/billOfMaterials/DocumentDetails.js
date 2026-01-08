import React from "react";
import { View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";

const DocumentDetails = () => {
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
                Document Details
            </Text>
            {lableAndValue("Document Number", "BOM00000  (V : 4)")}
            {lableAndValue("Name", "Walki Talki - BF888S")}
            {lableAndValue("FG Store", "Default Stock Store")}
            {lableAndValue("PO RM Store", "Default Stock Store")}
            {lableAndValue("Scrap/Reject Store", "Default Stock Store")}
            {lableAndValue("Last Modified By", "Abdul")}
            {lableAndValue("Last Modified Date", "30/12/2025 - 17:46")}
            {lableAndValue("Created By", "Abdul")}
            {lableAndValue("Creation Date", "30/12/2025 - 17:46")}
            {lableAndValue("BOM Description", "Walki Talki - BF888S")}
            {lableAndValue(
                "Comment",
                "Use this space to provide guidelines/ instructions to the team"
            )}
            {lableAndValue("Attachments", "")}
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

export default DocumentDetails;
