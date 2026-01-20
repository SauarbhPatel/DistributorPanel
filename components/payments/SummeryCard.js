import React from "react";
import { Text, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";

const SummeryCard = () => {
    return (
        <View
            style={{
                gap: 5,
                marginTop: 10,
            }}
        >
            <View
                style={{ marginHorizontal: 10, flexDirection: "row", gap: 5 }}
            >
                <Card lable={"Total Payable"} value={"₹3,650.00"} />
                <Card lable={"Total Receivable"} value={"₹7,500.00"} />
            </View>
            <View
                style={{ marginHorizontal: 10, flexDirection: "row", gap: 5 }}
            >
                <Card lable={"Overdue Payable"} value={"₹3,650.00"} />
                <Card lable={"Overdue Receivable"} value={"₹7,500.00"} />
            </View>
        </View>
    );
};

export default SummeryCard;
const Card = ({ lable, value }) => {
    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: Colors.borderColor,
                padding: 10,
                backgroundColor: Colors.whiteColor,
                borderRadius: 10,
                flex: 1,
                gap: 5,
            }}
        >
            <Text style={{ ...Fonts.blackColor13Bold }}>{lable}</Text>
            <Text
                style={{
                    ...Fonts.blackColor15SemiBold,
                    color: Colors.greenColor,
                }}
            >
                {value}
            </Text>
        </View>
    );
};
