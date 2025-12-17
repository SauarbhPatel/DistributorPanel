import { Linking, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../constants/styles";
import AutoHeightWebView from "react-native-autoheight-webview";
import { Feather } from "@expo/vector-icons";

const ProductDescription = ({ list = [], isShowTaps }) => {
    return (
        <View style={{ gap: 20, marginBottom: 15, marginTop: -12 }}>
            {list?.map((item, index) => {
                const wrappedHtml = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      <style>
                        body {
                          margin: 0;
                          padding: 0;
                          font-size: 14px;
                          line-height: 1.4;
                          color: #333;
                          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial;
                        }
                        img {
                          max-width: 100%;
                          height: auto;
                          margin: 10px 0;
                          display: block;
                        }
                        h1,h2,h3,h4,h5 { margin: 6px 0; font-size: 16px; }
                        p { margin: 6px 0; }
                      </style>
                    </head>
                    <body>
                      ${item?.text ?? ""}
                    </body>
                    </html>
                `;

                return (
                    <View
                        key={index}
                        style={{
                            overflow: "hidden",
                            gap: 5,
                            backgroundColor: Colors.whiteColor,
                            paddingVertical: 10,
                        }}
                    >
                        <AutoHeightWebView
                            originWhitelist={["*"]}
                            source={{ html: wrappedHtml }}
                            style={{
                                width: "100%",
                                backgroundColor: "transparent",
                                marginHorizontal: 10,
                            }}
                            customScript={`
        setTimeout(() => {
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    type: 'height',
                    height: document.documentElement.scrollHeight
                })
            );
        }, 50);
    `}
                            scalesPageToFit={false}
                            scrollEnabled={false}
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: 10,
                                marginTop: 5,
                                marginHorizontal: 10,
                            }}
                        >
                            {item?.docs?.map((doc) => (
                                <TouchableOpacity
                                    key={doc?.title}
                                    style={{
                                        padding: 10,
                                        backgroundColor: Colors.primaryColor,
                                        borderRadius: 5,
                                        flexDirection: "row",
                                        gap: 5,
                                    }}
                                    activeOpacity={0.9}
                                    onPress={() => Linking.openURL(doc?.url)}
                                >
                                    <Text
                                        style={{ ...Fonts.whiteColor12Medium }}
                                    >
                                        {doc?.title}
                                    </Text>
                                    <Feather
                                        name="external-link"
                                        color={Colors.whiteColor}
                                        size={15}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

export default ProductDescription;
