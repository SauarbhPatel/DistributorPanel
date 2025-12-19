import React from "react";
import { Dimensions, Text, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
const { width } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const ReportsData = () => {
    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10,
                    marginHorizontal: 15,
                }}
            >
                <OverViewCard
                    data={{
                        bg: "#00c852",
                        bg2: "#009c65",
                        title: "Monthly Sales Report",
                        count: "Export ready",
                        sub_title: "csv / PDF",
                        up: true,
                    }}
                />
                <OverViewCard
                    data={{
                        bg: "#287bff",
                        bg2: "#0084d6",

                        title: "Customer Feedback",
                        count: "1,022",
                        sub_title: "last 30 days",
                        up: true,
                    }}
                />
                <OverViewCard
                    data={{
                        bg: "#00b9a8",
                        bg2: "#0097b7",

                        title: "Inventroy Health",
                        count: "Good",
                        sub_title: "Reviewed today",
                        up: false,
                    }}
                />
            </View>
        </>
    );
};

export default ReportsData;

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
                        padding: 15,
                        borderRadius: 10,
                        // backgroundColor: bg,
                        gap: 10,
                        width: (width - 40) / 2,
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
                            fontSize: typeof count === "number" ? 25 : 18,
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
