import React from "react";
import { Text, View } from "react-native";
import { Fonts } from "../../constants/styles";

const SpecialNotes = ({ list = [] }) => {
    return (
        <View
            style={{
                backgroundColor: "#fff9e6",
                borderLeftWidth: 2,
                borderColor: "#ffc107",
                borderRadius: 10,
                padding: 10,
                gap: 10,
            }}
        >
            <Text style={{ ...Fonts.blackColor17SemiBold }}>Must Read</Text>

            {list.map((item) => (
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Text>•</Text>
                    <Text style={{ ...Fonts.blackColor12Medium }}>{item}</Text>
                </View>
            ))}
        </View>
    );
};

export default SpecialNotes;
