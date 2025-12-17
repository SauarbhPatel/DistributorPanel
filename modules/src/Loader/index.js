import React from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { Wave } from "react-native-animated-spinkit";
import { Colors } from "../../style/defaultStyle";
import { Dialog } from "@rneui/themed";

const Loader = ({
    isShow,
    backgroundColor,
    color,
    size,
    position,
    changeLoader,
    customStyle,
}) => {
    return (
        <Dialog
            isVisible={[undefined, "", null].includes(isShow) ? true : isShow}
            animationType="fade"
            backdropStyle={{
                backgroundColor: backgroundColor || "rgba(0,0,0,0.2)",
            }}
            overlayStyle={{
                backgroundColor: "rgba(0,0,0,0)",
                elevation: 0,
                flex: 1,
                justifyContent: position || "center", // center,flex-end,flex-start
                alignItems: "center",
            }}
        >
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 20,
                    elevation: 5,
                    ...customStyle,
                }}
            >
                {changeLoader || (
                    <ActivityIndicator
                        size={size || 30}
                        color={color || Colors.primaryColor}
                    />
                )}
            </View>
        </Dialog>
    );
};

export default Loader;
