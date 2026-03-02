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
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
};

const sectionTitle = {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
};

const subTitle = {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
};

const helperText = {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 12,
};

const label = {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 8,
};

const counterText = {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "right",
    marginTop: 4,
};

const infoBox = {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    padding: 14,
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "#F9FAFB",
};

const infoText = {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
};

const toolbar = {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
};

const toolbarBtn = {
    marginRight: 16,
    fontWeight: "600",
    color: "#374151",
};

const dynamicHeader = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
};

const addSectionBtn = {
    borderWidth: 1,
    borderColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
};

const addSectionText = {
    color: "#2563EB",
    fontWeight: "500",
    fontSize: 12,
};

const sectionCard = {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    gap: 15,
};

const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};
