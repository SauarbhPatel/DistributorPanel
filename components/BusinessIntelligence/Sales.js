import React from "react";
import { View } from "react-native";
import { Colors } from "../../constants/styles";
import TitleLableWithFilter from "./common/TitleLableWithFilter";

const Sales = () => {
    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                padding: 10,
                marginTop: 5,
            }}
        >
            <TitleLableWithFilter />
        </View>
    );
};

export default Sales;
