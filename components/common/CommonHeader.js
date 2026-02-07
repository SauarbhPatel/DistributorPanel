import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Text } from "react-native";

const CommonHeader = ({ navigation, title, subTitle }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: Colors.whiteColor,
                paddingVertical: Sizes.fixPadding + 5.0,
                paddingHorizontal: Sizes.fixPadding + 5.0,
                elevation: 2.0,
            }}
        >
            <MaterialIcons
                name="arrow-back"
                color={Colors.blackColor}
                size={25}
                onPress={() => navigation && navigation?.pop()}
            />
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.blackColor18Bold,
                        marginTop: subTitle ? -7 : 0,
                    }}
                >
                    {title}
                </Text>
                {subTitle ? (
                    <Text
                        style={{
                            marginLeft: Sizes.fixPadding + 5.0,
                            ...Fonts.grayColor14Medium,
                            fontSize: 8.5,
                            position: "absolute",
                            bottom: -8,
                        }}
                        numberOfLines={1}
                    >
                        {subTitle}
                    </Text>
                ) : null}
            </View>
        </View>
    );
};

export default CommonHeader;
