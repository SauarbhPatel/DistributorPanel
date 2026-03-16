import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const DemoModeBanner = () => {
    return (
        <LinearGradient
            colors={["#2B7FFF", "#AD46FF", "#F6339A"]} // Deep Navy to Indigo gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="pulse"
                        size={20}
                        color="#FFFFFF"
                    />
                </View>
                <Text style={styles.headerTitle}>Demo Mode Active</Text>
            </View>

            {/* Description Section */}
            <View>
                <Text style={styles.description}>
                    Connect GA4 and use the Analytics Data API for live
                    production data.
                    <TouchableOpacity>
                        <Text style={styles.learnMore}>
                            Learn more{" "}
                            <Feather
                                name="external-link"
                                size={12}
                                color="#FFFFFF"
                            />
                        </Text>
                    </TouchableOpacity>
                </Text>
            </View>

            {/* Action Button */}
            <TouchableOpacity style={styles.downloadButton} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Connect GA4</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        padding: 16,
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    description: {
        fontSize: 13,
        color: "rgba(255, 255, 255, 0.8)",
        marginBottom: 24,
    },
    downloadButton: {
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.22)",
        height: 54,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
    },
    buttonIcon: {
        marginRight: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },
    learnMore: {
        fontSize: 12,
        color: "#FFFFFF",
        textDecorationLine: "underline",
        marginLeft: 4,
        fontWeight: "600",
        marginBottom: -3,
    },
});

export default DemoModeBanner;
