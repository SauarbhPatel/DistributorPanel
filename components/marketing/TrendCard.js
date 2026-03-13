import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Built into Expo

const TrendCard = () => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Revenue & visitors trend</Text>
            <View style={styles.placeholderBox}>
                <MaterialCommunityIcons
                    name="chart-bar"
                    size={40}
                    color="#CBD5E1"
                />
                <Text style={styles.placeholderText}>Chart visualization</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 20,
        margin: 10,
        borderWidth: 1,
        borderColor: "#F3F4F6",
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 15,
    },
    placeholderBox: {
        height: 200,
        backgroundColor: "#F8FAFF", // Light blue tint from image
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EEF2FF",
    },
    placeholderText: {
        marginTop: 10,
        color: "#94A3B8",
        fontSize: 13,
    },
});

export default TrendCard;
