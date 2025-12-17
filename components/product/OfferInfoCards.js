import React from "react";
import { FlatList, Text, View } from "react-native";
import { __generateRandomString } from "../../utils/funtion";
import { Colors, Fonts } from "../../constants/styles";

const OfferInfoCards = ({ list = [] }) => {
    const renderTextWithHighlights = (text, highlights = []) => {
        if (!highlights || highlights.length === 0) {
            return <Text style={{ ...Fonts.blackColor12Medium }}>{text}</Text>;
        }

        let parts = [text];
        highlights.forEach((highlight) => {
            parts = parts.flatMap((part) => {
                if (typeof part === "string") {
                    const regex = new RegExp(`(${highlight})`, "gi");
                    return part.split(regex).map((segment, idx) =>
                        regex.test(segment) ? (
                            <Text
                                key={idx}
                                style={{
                                    ...Fonts.blackColor12Medium,
                                    color: Colors.redColor,
                                    fontWeight: "bold",
                                }}
                            >
                                {segment}
                            </Text>
                        ) : (
                            segment
                        )
                    );
                }
                return part;
            });
        });

        return <Text style={{ ...Fonts.blackColor12Medium }}>{parts}</Text>;
    };
    return (
        <View>
            <FlatList
                data={list}
                keyExtractor={() => __generateRandomString(5)}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "#edf1f0",
                            padding: 10,
                            borderRadius: 10,
                            maxWidth: 170,
                            gap: 5,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: Colors.primaryColor,
                                alignSelf: "flex-start",
                                padding: 2,
                                paddingHorizontal: 10,
                                borderRadius: 5,
                            }}
                        >
                            <Text
                                style={{
                                    ...Fonts.blackColor12Medium,
                                    color: Colors.whiteColor,
                                }}
                            >
                                {item?.title}
                            </Text>
                        </View>

                        {renderTextWithHighlights(item?.text, item?.highlights)}
                    </View>
                )}
                horizontal
                contentContainerStyle={{ gap: 10 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default OfferInfoCards;
