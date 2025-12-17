import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";

import { Ionicons, AntDesign } from "@expo/vector-icons";
// import UploadDocumentPopup from "./UploadDocumentPopup";
// import ImageViewerCom from "./ImageViewerCom";
const { width } = Dimensions.get("screen");

const PageBox = ({
    title,
    onChange = () => {},
    item,
    onRemove = () => {},
    dyWidth,
    dyHeight,
}) => {
    const [state, setState] = useState({
        isOpenCamera: false,
        isShowImage: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isOpenCamera, isShowImage } = state;
    return (
        <>
            {/* {isShowImage && (
                <ImageViewerCom
                    onClose={() => {
                        updateState({
                            isShowImage: false,
                        });
                    }}
                    images={[
                        {
                            url: item?.fullUrl,
                        },
                    ]}
                />
            )}
            <UploadDocumentPopup
                isShow={isOpenCamera}
                onClose={() => updateState({ isOpenCamera: false })}
                onSelected={(value, details) => {
                    console.log("UploadDocumentPopup", value);
                    if (!value) return;
                    console.log(value);
                    updateState({ isOpenCamera: false });
                    onChange(details);
                }}
            /> */}
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    if (item?.fullUrl) {
                        updateState({
                            isShowImage: true,
                        });
                        return;
                    }
                    updateState({
                        isOpenCamera: true,
                    });
                }}
                style={{
                    width: dyWidth || width / 2 - 25,
                    height: dyHeight || width / 2,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: Colors.lightGrayColor,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                }}
            >
                {item?.fullUrl ? (
                    <>
                        <AntDesign
                            name="closecircle"
                            color={Colors.redColor}
                            size={20}
                            style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                zIndex: 1,
                                backgroundColor: Colors.blackColor,
                                borderRadius: 50,
                            }}
                            onPress={() => {
                                onRemove();
                            }}
                        />
                        <Image
                            source={{
                                uri: item?.fullUrl,
                            }}
                            style={{
                                width: (dyWidth || width / 2 - 25) - 15,
                                height: (dyHeight || width / 2) - 25,
                                resizeMode: "contain",
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Ionicons
                            name="add-circle-outline"
                            size={25}
                            color={Colors.grayColor}
                        />
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                color: Colors.grayColor,
                            }}
                        >
                            {title}
                        </Text>
                    </>
                )}
            </TouchableOpacity>
        </>
    );
};

export default PageBox;
