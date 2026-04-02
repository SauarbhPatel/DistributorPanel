import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";

const stepsData = [
    { title: "Hierarchy & Basic Info", subtitle: "Category & details" },
    { title: "Attribute Set", subtitle: "Size, color, specs" },
    { title: "Variation Rules", subtitle: "Variant setup" },
    { title: "Compliance", subtitle: "Legal info" },
    { title: "Tax Rules", subtitle: "Tax setup" },
    { title: "Commission", subtitle: "Fees & margin" },
    { title: "Shipping Rules", subtitle: "Delivery setup" },
    { title: "SEO", subtitle: "Search boost" },
    { title: "Review & Publish", subtitle: "Check & go" },
];
const stepsData2 = [
    { title: "Hierarchy & Basic Info", subtitle: "Category & details" },
    { title: "Attribute Set", subtitle: "Size, color, specs" },
    { title: "Variation Rules", subtitle: "Variant setup" },
    { title: "Compliance", subtitle: "Legal info" },
    { title: "Commission", subtitle: "Fees & margin" },
    { title: "Shipping Rules", subtitle: "Delivery setup" },
    { title: "SEO", subtitle: "Search boost" },
    { title: "Review & Publish", subtitle: "Check & go" },
];

const HorizontalStepper = ({ activeStep, setActiveStep, hideTax }) => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {(hideTax ? stepsData2 : stepsData).map((item, index) => {
                    const isActive = activeStep >= index;

                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.stepContainer}
                            onPress={() => isActive && setActiveStep(index)}
                        >
                            {/* Circle */}
                            <View
                                style={[
                                    styles.circle,
                                    isActive && styles.activeCircle,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.circleText,
                                        isActive && styles.activeCircleText,
                                    ]}
                                >
                                    {index + 1}
                                </Text>
                            </View>

                            {/* Text */}
                            <View style={styles.textContainer}>
                                <Text
                                    style={[
                                        styles.title,
                                        isActive && styles.activeTitle,
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.title}
                                </Text>
                                <Text style={styles.subtitle}>
                                    {item.subtitle}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default HorizontalStepper;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        backgroundColor: "#fff",
    },

    stepContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },

    circle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        backgroundColor: "#f2f2f2",
    },

    activeCircle: {
        backgroundColor: "#16a34a",
        borderColor: "#16a34a",
    },

    circleText: {
        fontSize: 14,
        color: "#555",
    },

    activeCircleText: {
        color: "#fff",
        fontWeight: "bold",
    },

    textContainer: {
        maxWidth: 140,
    },

    title: {
        fontSize: 13,
        fontWeight: "600",
        color: "#333",
    },

    activeTitle: {
        color: "#16a34a",
    },

    subtitle: {
        fontSize: 11,
        color: "#777",
    },
});
