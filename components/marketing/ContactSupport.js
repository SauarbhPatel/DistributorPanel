import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ContactSupport = () => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.title}>Need more help?</Text>
            <Text style={styles.subtitle}>
                Our support team is available 24/7 to assist you with any
                questions.
            </Text>

            <TouchableOpacity activeOpacity={0.8}>
                <LinearGradient
                    colors={["#2563EB", "#A855F7"]} // Blue to Purple gradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.supportButton}
                >
                    <Ionicons
                        name="chatbubble-outline"
                        size={20}
                        color="#FFFFFF"
                    />
                    <Text style={styles.buttonText}>Contact Support</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 13,
        color: "#64748B",
        lineHeight: 22,
        marginBottom: 24,
    },
    supportButton: {
        flexDirection: "row",
        height: 56,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default ContactSupport;
