import React, { useState } from "react";
import { View } from "react-native";
import { Colors } from "../../../constants/styles";
import VariationAttributesForm from "./VariationAttributesForm";

const VariationAttributes = React.memo(({ value, onChange = () => {} }) => {
    return (
        <View style={containerStyle}>
            <VariationAttributesForm
                attributes={value?.variantAttributes || []}
                variations={value?.variants || []}
                pickupPointsList={value?.pickupPointsList || []}
                parentValue={value}
                onChange={(data) => {
                    console.log(JSON.stringify(data));
                    onChange(data);
                }}
            />
        </View>
    );
});

export default VariationAttributes;

const containerStyle = {
    // backgroundColor: "#fff",
    // borderRadius: 8,
    // padding: 16,
    // borderWidth: 1,
    // borderColor: "#E5E7EB",
    // marginBottom: 20,
};
