import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ComingSoon = () => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <MaterialCommunityIcons
                    name="clock-fast"
                    size={48}
                    color="#64748B"
                />
                <Text style={styles.text}>Coming Soon</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginHorizontal: 10,
        borderRadius: 12,
        backgroundColor: "#fff",
    },
    card: {
        paddingVertical: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        marginTop: 12,
        fontSize: 18,
        fontWeight: "800",
        color: "#475569",
        letterSpacing: 0.5,
    },
});

export default ComingSoon;
