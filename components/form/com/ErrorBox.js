import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const ErrorBox = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Feather name="x-circle" size={18} color="#ef4444" />

                <Text style={styles.title}>
                    1 Error — Must fix before submitting
                </Text>
            </View>

            <View style={styles.errorItem}>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.errorText}>HSN Code is required</Text>

                <TouchableOpacity>
                    <Text style={styles.fixText}>Fix →</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ErrorBox;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fef2f2",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#fecaca",
        padding: 14,
        marginVertical: 10,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 8,
    },

    title: {
        color: "#b91c1c",
        fontWeight: "600",
        fontSize: 13,
    },

    errorItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    dot: {
        color: "#ef4444",
    },

    errorText: {
        flex: 1,
        fontSize: 12,
        color: "#7f1d1d",
    },

    fixText: {
        color: "#ef4444",
        fontSize: 12,
        fontWeight: "600",
    },
});
