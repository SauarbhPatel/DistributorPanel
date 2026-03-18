import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ProductSelectionBanner = ({
    message = "Use product selection from My Listings for catalog and single-product ads.",
}) => {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.bannerContainer}>
                {/* Gradient Icon Container */}
                <LinearGradient
                    colors={["#4D7CFF", "#A066FF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.iconWrapper}
                >
                    <Ionicons
                        name="alert-circle-outline"
                        size={20}
                        color="#FFFFFF"
                    />
                </LinearGradient>

                {/* Text Content */}
                <Text style={styles.messageText}>{message}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        // paddingVertical: 10,
        marginTop: 15,
    },
    bannerContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F7FF",
        borderWidth: 1,
        borderColor: "#D8E9FF",
        borderRadius: 12,
        padding: 12,
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    messageText: {
        flex: 1,
        fontSize: 14,
        color: "#334155",
        fontWeight: "500",
        lineHeight: 20,
    },
});

export default ProductSelectionBanner;
