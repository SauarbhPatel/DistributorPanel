import { Overlay } from "@rneui/themed";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "react-native";
import { Colors, Fonts } from "../../constants/styles";

const BottomPopup = ({
    isShow = false,
    title,
    onClose,
    top = "20%",
    component,
}) => {
    return (
        <Overlay
            isVisible={isShow}
            overlayStyle={{
                width: "100%",
                position: "absolute",
                bottom: 0.0,
                borderTopLeftRadius: 10 + 5.0,
                borderTopRightRadius: 10 + 5.0,
                backgroundColor: Colors.whiteColor,
                paddingHorizontal: 0.0,
                paddingVertical: 0.0,
                zIndex: 100,
                top: top,
            }}
            onBackdropPress={() => {
                onClose && onClose();
            }}
        >
            <View
                style={{
                    backgroundColor: Colors.bodyColor,
                }}
            >
                <View
                    style={{
                        height: 50,
                        backgroundColor: Colors.primaryColor,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor16Medium,
                            color: Colors.whiteColor,
                            fontWeight: 600,
                            maxWidth: "75%",
                        }}
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            onClose && onClose();
                        }}
                        style={{
                            position: "absolute",
                            right: 10,
                            top: 6,
                            padding: 5,
                        }}
                    >
                        <AntDesign
                            name="close"
                            size={25}
                            color={Colors.whiteColor}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList ListHeaderComponent={<>{component}</>} />
            </View>
        </Overlay>
    );
};

export default BottomPopup;
