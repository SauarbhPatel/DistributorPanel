import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const DiagnosticsExport = () => {
    return (
        <LinearGradient
            colors={["#1E293B", "#312E81"]} // Deep Navy to Indigo gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Feather name="download" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.headerTitle}>Diagnostics export</Text>
            </View>

            {/* Description Section */}
            <Text style={styles.description}>
                Bundle logs for support: connection logs, feed validation
                report, API errors summary, campaign change history.
            </Text>

            {/* Action Button */}
            <TouchableOpacity style={styles.downloadButton} activeOpacity={0.8}>
                <Feather
                    name="download"
                    size={18}
                    color="#FFFFFF"
                    style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>
                    Download diagnostics bundle
                </Text>
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
});

export default DiagnosticsExport;
