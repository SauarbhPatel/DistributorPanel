import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";

const CommonBox = ({ title, subtitle, footerNote, body = <></> }) => {
    return (
        <View style={styles.formContainer}>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && (
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    )}
                </View>
                <Feather name="info" size={18} color="#3b82f6" />
            </View>

            <View style={styles.body}>{body}</View>

            {footerNote ? (
                <View style={styles.footerNote}>
                    <Feather name="message-square" size={14} color="#9ca3af" />
                    <Text style={styles.footerText}>{footerNote}</Text>
                </View>
            ) : null}
        </View>
    );
};

export default CommonBox;

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        overflow: "hidden",
        marginVertical: 10,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f9fafb",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 4,
    },

    body: {
        padding: 16,
    },

    footerNote: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        backgroundColor: "#f9fafb",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        gap: 6,
    },

    footerText: {
        fontSize: 11,
        color: "#6b7280",
        flex: 1,
    },
});
