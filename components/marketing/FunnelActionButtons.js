import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ActionButton = ({ title, subtitle, colors, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.buttonWrapper}
    >
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradient}
        >
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
                <MaterialCommunityIcons
                    name="arrow-right"
                    size={24}
                    color="white"
                />
            </View>
        </LinearGradient>
    </TouchableOpacity>
);

const VerticalActionButtons = () => {
    return (
        <View style={styles.container}>
            <ActionButton
                title="View Zone Breakdown"
                subtitle="Analyze funnel by geographic zones"
                colors={["#3B82F6", "#06B6D4", "#3B82F6"]} // Tri-color gradient for that middle-glow look
                onPress={() => console.log("Zone pressed")}
            />

            <ActionButton
                title="View Category Breakdown"
                subtitle="Analyze funnel by product categories"
                colors={["#A855F7", "#EC4899", "#A855F7"]}
                onPress={() => console.log("Category pressed")}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        gap: 16,
    },
    buttonWrapper: {
        width: "100%",
        borderRadius: 12,
    },
    gradient: {
        borderRadius: 12,
        padding: 24,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 13,
    },
});
export default VerticalActionButtons;
