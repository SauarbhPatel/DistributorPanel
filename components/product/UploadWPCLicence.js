import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";

const UploadWPCLicence = () => {
    return (
        <View
            style={{
                gap: 10,
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Text style={{ ...Fonts.blackColor13Medium }}>
                Upload WPC Licence:
            </Text>
            <TouchableOpacity
                style={{
                    backgroundColor: Colors.primaryColor,
                    padding: 5,
                    borderRadius: 5,
                    paddingHorizontal: 15,
                }}
            >
                <Text
                    style={{
                        ...Fonts.blackColor13Medium,
                        color: Colors.whiteColor,
                    }}
                >
                    Choose File
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default UploadWPCLicence;
