import React from "react";
import { Dimensions, Text, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
const { width } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const CustomersData = () => {
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
                        bg: "#fe5d00",
                        bg2: "#fe9400",
                        title: "New Visitors",
                        count: "5,653",
                        sub_title: "+1.5% Up from past weeks",
                        up: true,
                    }}
                />
                <OverViewCard
                    data={{
                        bg: "#00c852",
                        bg2: "#009c65",
                        title: "Returning Customers ",
                        count: "1,120",
                        sub_title: "+1.5% Up from past weeks",
                        up: true,
                    }}
                />
                <OverViewCard
                    data={{
                        bg: "#287bff",
                        bg2: "#0084d6",

                        title: "Conversion Rate",
                        count: "3.9%",
                        sub_title: "Slight increase",
                        up: true,
                    }}
                />
            </View>
        </>
    );
};

export default CustomersData;

const OverViewCard = ({ data }) => {
    const { bg, bg2, title, count, sub_title, up } = data;
    return (
        <>
            <LinearGradient
                start={{ x: 0.5, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={[bg, bg2]}
                style={{
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        padding: 20,
                        borderRadius: 10,
                        // backgroundColor: bg,
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
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                        }}
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
            </LinearGradient>
        </>
    );
};
