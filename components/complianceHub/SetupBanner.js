import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SetupBanner = () => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name="information-outline"
                    size={24}
                    color="#FFFFFF"
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Setup in progress — complete all 9 steps to activate
                    enforcement
                </Text>
                <Text style={styles.description}>
                    Core governance for enterprise marketplaces. Ensures only
                    eligible sellers can list eligible products under the
                    correct legal and policy requirements.
                </Text>
                <Text style={styles.description}>
                    Rule-driven, category-linked, and enforced at platform,
                    category, brand, product, and seller levels—with a complete
                    audit trail for legal defense and government audits.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#F0F4FF",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    iconContainer: {
        width: 36,
        height: 36,
        backgroundColor: "#5C5CFF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1A1C1E",
        marginBottom: 4,
        lineHeight: 20,
    },
    description: {
        fontSize: 13,
        color: "#4B5563",
        lineHeight: 18,
        marginTop: 4,
    },
});

export default SetupBanner;
