import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ConversionBanner = () => {
    return (
        <LinearGradient
            colors={["#615FFF", "#AD46FF", "#F6339A"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.bannerContainer}
        >
            <View style={styles.leftSection}>
                <View style={styles.iconWrapper}>
                    <MaterialCommunityIcons
                        name="target"
                        size={28}
                        color="white"
                    />
                </View>

                <View style={styles.textWrapper}>
                    <Text style={styles.title}>Conversion Measurement</Text>
                    <Text style={styles.subtitle}>
                        Set up conversion tracking to measure campaign
                        performance
                    </Text>
                </View>
            </View>

            <TouchableOpacity activeOpacity={0.9}>
                <View style={styles.whiteButton}>
                    <MaterialCommunityIcons
                        name="lightning-bolt-outline"
                        size={18}
                        color="#A855F7"
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.buttonText}>Configure Tracking</Text>
                </View>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        shadowColor: "#A855F7",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 8,
        marginVertical: 10,
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    iconWrapper: {
        width: 52,
        height: 52,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    textWrapper: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.8)",
        fontWeight: "500",
    },
    whiteButton: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginTop: 15,
        justifyContent: "center",
    },
    buttonIcon: {
        marginRight: 6,
    },
    buttonText: {
        color: "#A855F7",
        fontWeight: "700",
        fontSize: 14,
    },
});

export default ConversionBanner;
