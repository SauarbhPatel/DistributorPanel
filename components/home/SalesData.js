import React from "react";
import { Dimensions, Text, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
const { width } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
const SalesData = () => {
    return (
        <>
            <View
                style={{
                    // flexDirection: "row",
                    // flexWrap: "wrap",
                    gap: 10,
                    marginHorizontal: 15,
                }}
            >
                <OverViewCard
                    data={{
                        bg: "#287bff",
                        title: "Pending Orders",
                        count: "150",
                        sub_title: "+8.5% Up from yesterday",
                        up: true,
                    }}
                />
                <OverViewCard
                    data={{
                        bg: "#00b87a",
                        title: "Orders In Transit",
                        count: "10,500",
                        sub_title: "+1.5% Up from past weeks",
                        up: true,
                    }}
                />
                <OverViewCard
                    data={{
                        bg: "#a435ff",
                        title: "Delivered Orders",
                        count: "8,900",
                        sub_title: "-8% Up from yesterday",
                        up: false,
                    }}
                />
                <OverViewCard
                    data={{
                        bg: "#fe5d00",
                        title: "Customer Return",
                        count: "2,040",
                        sub_title: "+1.8% Up from yesterday",
                        up: true,
                    }}
                />
                <OverViewCard
                    data={{
                        bg: "#00ac9a",
                        title: "Replacements",
                        count: "321",
                        sub_title: "+8.5% Up from yesterday",
                        up: true,
                    }}
                />
                <OverViewCard
                    data={{
                        bg: "#ef1f8b",
                        title: "Total Purchase240",
                        count: "150",
                        sub_title: "+8.5% Up from yesterday",
                        up: true,
                    }}
                />
                <OverViewCard
                    data={{
                        bg: "#4b35ec",
                        title: "Total Orders",
                        count: "150",
                        sub_title: "+8.5% Up from yesterday",
                        up: true,
                    }}
                />
                <OverViewCard
                    data={{
                        bg: "#df003c",
                        title: "Refund",
                        count: "150",
                        sub_title: "+8.5% Up from yesterday",
                        up: true,
                    }}
                />
            </View>
        </>
    );
};

export default SalesData;

const OverViewCard = ({ data }) => {
    const { bg, title, count, sub_title, up } = data;
    return (
        <View
            style={{
                padding: 20,
                borderRadius: 10,
                backgroundColor: bg,
                gap: 10,
            }}
        >
            <Text
                style={{
                    ...Fonts.blackColor15Medium,
                    color: Colors.whiteColor,
                }}
            >
                {title}
            </Text>
            <Text
                style={{
                    ...Fonts.blackColor18Bold,
                    color: Colors.whiteColor,
                    fontSize: 25,
                }}
            >
                {count}
            </Text>
            <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
                <Feather
                    name={up ? "arrow-up-right" : "arrow-down-right"}
                    size={16}
                    color={Colors.whiteColor}
                />
                <Text
                    style={{
                        ...Fonts.blackColor11Medium,
                        color: Colors.whiteColor,
                    }}
                >
                    {sub_title}
                </Text>
            </View>
        </View>
    );
};
