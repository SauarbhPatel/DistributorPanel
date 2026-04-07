// import React from "react";
// import { View, Text, TextInput } from "react-native";
// import {
//     Colors,
//     inputBoxDefaultStyle,
//     inputTitleDefaultStyle,
// } from "../../style/defaultStyle";

// import {
//     inputBoxDynamicStyle,
//     inputTitleDynamicStyle,
// } from "../../style/customeStyle";

// const TextAreaBox = React.memo(
//     ({
//         title,
//         placeholder,
//         value,
//         onChangeText,
//         valuekey,
//         required,
//         customStyle,
//         keyboardType,
//         titleCustomStyle,
//         inputCustomStyle,
//         customInputProps,
//         customTitleProps,
//         leftIcon,
//         rightIcon,
//         onFocus,
//         editable,
//         onSubmitEditing,
//     }) => {
//         return (
//             <View
//                 style={{
//                     position: "relative",
//                     ...customStyle,
//                 }}
//             >
//                 {title ? (
//                     <Text
//                         style={{
//                             ...inputTitleDefaultStyle,
//                             ...inputTitleDynamicStyle,
//                             ...titleCustomStyle,
//                         }}
//                         {...customTitleProps}
//                     >
//                         {title}{" "}
//                         {required ? (
//                             <Text style={{ color: Colors.redColor }}>*</Text>
//                         ) : null}
//                     </Text>
//                 ) : null}

//                 <View
//                     style={{
//                         alignItems: "center",
//                         gap: 5,
//                         ...inputBoxDefaultStyle,
//                         ...inputBoxDynamicStyle,
//                         ...inputCustomStyle,
//                     }}
//                 >
//                     {leftIcon}
//                     <TextInput
//                         value={value}
//                         onChangeText={(text) => {
//                             onChangeText({ [valuekey]: text });
//                         }}
//                         placeholder={placeholder}
//                         placeholderTextColor={Colors.grayColor}
//                         style={{
//                             flex: 1,
//                             color: "black",
//                             fontFamily: "Roboto_Regular",
//                         }}
//                         selectionColor={Colors.primaryColor}
//                         keyboardType={keyboardType || "default"}
//                         editable={editable}
//                         {...customInputProps}
//                         onFocus={() => onFocus && onFocus()}
//                         onSubmitEditing={onSubmitEditing}
//                     />
//                     {rightIcon}
//                 </View>
//             </View>
//         );
//     },
// );

// export default TextAreaBox;
import React from "react";
import { View, Text, TextInput } from "react-native";
import {
    Colors,
    inputBoxDefaultStyle,
    inputTitleDefaultStyle,
} from "../../style/defaultStyle";

import {
    inputBoxDynamicStyle,
    inputTitleDynamicStyle,
} from "../../style/customeStyle";

const TextAreaBox = React.memo(
    ({
        title,
        placeholder,
        value,
        onChangeText,
        valuekey,
        required,
        customStyle,
        keyboardType,
        titleCustomStyle,
        inputCustomStyle,
        customInputProps = {},
        customTitleProps,
        leftIcon,
        rightIcon,
        onFocus,
        editable = true,
        onSubmitEditing,
        multiline = false,
        numberOfLines = 4,
    }) => {
        return (
            <View
                style={{
                    position: "relative",
                    ...customStyle,
                }}
            >
                {title ? (
                    <Text
                        style={{
                            ...inputTitleDefaultStyle,
                            ...titleCustomStyle,
                        }}
                        {...customTitleProps}
                    >
                        {title}{" "}
                        {required && (
                            <Text style={{ color: Colors.redColor }}>*</Text>
                        )}
                    </Text>
                ) : null}

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: multiline ? "flex-start" : "center",
                        gap: 5,
                        paddingVertical: multiline ? 10 : 0,
                        ...inputBoxDefaultStyle,
                        ...inputBoxDynamicStyle,
                        ...inputCustomStyle,
                    }}
                >
                    {leftIcon}

                    <TextInput
                        value={value}
                        onChangeText={(text) => {
                            onChangeText({ [valuekey]: text });
                        }}
                        placeholder={placeholder}
                        placeholderTextColor={Colors.grayColor}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        style={{
                            flex: 1,
                            color: "black",
                            fontFamily: "Roboto_Regular",
                            minHeight: multiline ? numberOfLines * 22 : 40,
                            textAlignVertical: multiline ? "top" : "center", // 🔥 IMPORTANT
                        }}
                        selectionColor={Colors.primaryColor}
                        keyboardType={keyboardType || "default"}
                        editable={editable}
                        onFocus={() => onFocus && onFocus()}
                        onSubmitEditing={onSubmitEditing}
                        {...customInputProps}
                    />

                    {rightIcon}
                </View>
            </View>
        );
    },
);

export default TextAreaBox;
