import React from "react";
import { View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import { Text } from "react-native";
import {
    Entypo,
    Feather,
    FontAwesome,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";

const BOM_Snapshot = () => {
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
                BOM Snapshot
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    position: "relative",
                }}
            >
                <View
                    style={{
                        backgroundColor: "#349f6e",
                        height: 1.5,
                        width: "80%",
                        position: "absolute",
                        bottom: 22,
                        left: "10%",
                    }}
                />
                <CardBox
                    icon={
                        <Ionicons
                            name="triangle"
                            size={45}
                            color={"#349f6e"}
                            style={{ margin: 0 }}
                        />
                    }
                    label="raw material"
                    value="15 Items"
                />
                <CardBox
                    icon={
                        <FontAwesome
                            name="square"
                            size={45}
                            color={"#f6c764"}
                            style={{ transform: [{ rotate: "45deg" }] }}
                        />
                    }
                    label="Processing"
                    value="4 Processes"
                />
                <CardBox
                    icon={
                        <FontAwesome
                            name="square"
                            size={45}
                            color={"#187b4e"}
                        />
                    }
                    label="Finished goods"
                    value="1 Item"
                />
            </View>
        </View>
    );
};

export default BOM_Snapshot;

const CardBox = ({ icon, label, value }) => {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text
                style={{
                    ...Fonts.blackColor15Bold,
                    fontSize: 13,
                }}
            >
                {label}
            </Text>
            <Text
                style={{
                    ...Fonts.blackColor12Medium,
                    color: Colors.grayColor,
                    fontSize: 10,
                }}
            >
                {value}
            </Text>
            <View style={{ marginTop: 10 }}>{icon}</View>
        </View>
    );
};
