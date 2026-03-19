import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const NoDataCard = ({
    title,
    subTitle,
    buttonName,
    onCreatePress,
    icon = <Feather name="map" size={32} color="#94A3B8" />,
}) => {
    return (
        <View style={styles.noDataCard}>
            <View style={styles.noDataIconContainer}>
                <LinearGradient
                    colors={["#F1F5F9", "#E2E8F0"]}
                    style={styles.noDataIconCircle}
                >
                    {icon}
                </LinearGradient>
                <View style={styles.noDataBadge}>
                    <Feather name="plus" size={12} color="#FFF" />
                </View>
            </View>

            <Text style={styles.noDataTitle}>{title}</Text>
            <Text style={styles.noDataDescription}>{subTitle}</Text>

            <TouchableOpacity onPress={onCreatePress} activeOpacity={0.8}>
                <LinearGradient
                    colors={["#0071BC", "#005A96"]}
                    style={styles.createButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Feather name="plus" size={18} color="#FFF" />
                    <Text style={styles.createButtonText}>{buttonName}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    noDataCard: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 30,
        alignItems: "center",
    },
    noDataIconContainer: {
        marginBottom: 20,
        position: "relative",
    },
    noDataIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    noDataBadge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#0071BC",
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#FFF",
    },
    noDataTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#1E293B",
        marginBottom: 8,
    },
    noDataDescription: {
        fontSize: 14,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    createButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
    },
    createButtonText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "700",
    },
});

export default NoDataCard;
