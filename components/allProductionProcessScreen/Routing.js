import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { __generateRandomString } from "../../utils/funtion";
import { Colors, Fonts, Sizes } from "../../constants/styles";
const { width } = Dimensions.get("window");

const Routing = () => {
    return (
        <>
            <View
                style={{
                    borderRadius: 5,
                    backgroundColor: Colors.whiteColor,
                    marginHorizontal: 10,
                    padding: 10,
                    // gap: 10,
                    marginTop: 10,
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor16Bold,
                        color: Colors.grayColor,
                        paddingBottom: 10,
                    }}
                >
                    Routing
                </Text>
                <CardBox sr={1} lable={"Routing #1 : Soldering"} />
                <CardBox sr={2} lable={"Routing #2 : Assembling"} />
                <CardBox sr={3} lable={"Routing #3 : Quality Check"} />
                <CardBox sr={4} lable={"Routing #4 : Label & Packing"} />
            </View>
        </>
    );
};

export default Routing;
const CardBox = ({ lable, sr }) => {
    return (
        <View
            style={{
                position: "relative",
                padding: 15,
                paddingTop: 7.5,
                paddingBottom: 0,
            }}
        >
            <View
                style={{
                    width: 30,
                    height: 30,
                    backgroundColor: Colors.greenColor,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor13Bold,
                        color: Colors.whiteColor,
                    }}
                >
                    {sr}
                </Text>
            </View>
            <View
                style={{
                    borderStartWidth: 1,
                    paddingStart: 20,
                    borderColor: Colors.grayColor,
                    paddingBottom: 20,
                    gap: 5,
                }}
            >
                <Text style={{ ...Fonts.blackColor13Bold }}>{lable}</Text>
                <Text
                    style={{
                        ...Fonts.blackColor12Medium,
                        // color: Colors.grayColor,
                    }}
                >
                    0 Nos / 10 Nos ( 0%)
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor12Medium,
                        color: Colors.grayColor,
                    }}
                >
                    Example Heating, cooling, extruding, mixing, cutting etc.
                </Text>
            </View>
        </View>
    );
};
