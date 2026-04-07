import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const InfoBox = ({ title, subtitle, infoTitle, infoSub }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>

            {/* Info Box */}
            {infoTitle ? (
                <View style={styles.infoBox}>
                    <Feather name="info" size={18} color="#2563eb" />

                    <View style={{ flex: 1 }}>
                        <Text style={styles.infoTitle}>{infoTitle}</Text>

                        <Text style={styles.infoSub}>{infoSub}</Text>
                    </View>
                </View>
            ) : null}
        </View>
    );
};

export default InfoBox;

const styles = StyleSheet.create({
    container: {
        // marginVertical: 10,
    },

    header: {
        marginBottom: 12,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        fontSize: 13,
        color: "#6b7280",
        marginTop: 4,
    },

    infoBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        backgroundColor: "#eff6ff",
        borderWidth: 1,
        borderColor: "#bfdbfe",
        borderRadius: 12,
        padding: 14,
    },

    infoTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1d4ed8",
    },

    infoSub: {
        fontSize: 11,
        color: "#60a5fa",
        marginTop: 4,
    },
});
