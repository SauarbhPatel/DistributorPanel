import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";

import { Ionicons, AntDesign } from "@expo/vector-icons";
// import UploadDocumentPopup from "./UploadDocumentPopup";
// import ImageViewerCom from "./ImageViewerCom";
const { width } = Dimensions.get("screen");
import * as DocumentPicker from "expo-document-picker";
import { __uploadImage } from "../../utils/api/commonApi";

const PageBox = ({
    title,
    onChange = () => {},
    item,
    onRemove = () => {},
    dyWidth,
    dyHeight,
    type,
}) => {
    const [state, setState] = useState({
        isOpenCamera: false,
        isShowImage: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isOpenCamera, isShowImage } = state;
    const pickFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync();
            if (!result.canceled) {
                console.log(result.assets[0]);
                const img = await __uploadImage(
                    result.assets[0]?.uri,
                    result.assets[0]?.name,
                    result.assets[0]?.mimeType,
                );
                console.log(img);
            }
        } catch (error) {
            console.error("Error picking file:", error);
        }
    };
    return (
        <>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    if (item?.fullUrl) {
                        updateState({
                            isShowImage: true,
                        });
                        return;
                    }
                    if (type == "pdf") {
                        pickFile();
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
