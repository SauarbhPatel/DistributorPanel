import React from "react";
import { View } from "react-native";
import { Bounce } from "react-native-animated-spinkit";
import { Colors, Sizes } from "../constants/styles";

const Loader = () => {
    return (
        <View
            style={{
                padding: Sizes.fixPadding * 2.0,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                zIndex: 1000,
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                justifyContent: "center",
            }}
        >
            <Bounce size={48} color={Colors.primaryColor} />
        </View>
    );
};

export default Loader;
