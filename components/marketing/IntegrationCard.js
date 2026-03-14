import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const IntegrationCard = ({
    stepNumber,
    title,
    badgeText,
    description,
    infoMessage,
    buttonText,
    onPress,
}) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <View style={styles.iconWrapper}>
                    <Feather name="link" size={20} color="#0891b2" />
                </View>

                <View style={styles.titleContainer}>
                    <View style={styles.badgeRow}>
                        <Text style={styles.titleText}>{title}</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{badgeText}</Text>
                        </View>
                    </View>
                    <Text style={styles.descriptionText}>{description}</Text>
                </View>

                <LinearGradient
                    colors={["#22d3ee", "#0891b2"]}
                    style={styles.stepBadge}
                >
                    <Text style={styles.stepNumberText}>{stepNumber}</Text>
                </LinearGradient>
            </View>

            <View style={styles.infoBanner}>
                <Feather name="info" size={16} color="#0891b2" />
                <Text style={styles.infoText}>{infoMessage}</Text>
            </View>

            <LinearGradient
                colors={["#22d3ee", "#0891b2"]}
                style={styles.actionButton}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                    }}
                    onPress={onPress}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                    <MaterialCommunityIcons
                        name="open-in-new"
                        size={16}
                        color="#fff"
                    />
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginTop: 15,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        backgroundColor: "#ecfeff",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        flex: 1,
        marginLeft: 12,
        paddingRight: 35, // Space for the step number
    },
    badgeRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 4,
    },
    titleText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0f172a",
        marginRight: 8,
    },
    badge: {
        backgroundColor: "#ecfeff",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#cffafe",
        marginTop: 10,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#0891b2",
    },
    descriptionText: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 18,
    },
    stepBadge: {
        width: 32,
        height: 32,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: -5,
        top: 0,
    },
    stepNumberText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    infoBanner: {
        flexDirection: "row",
        backgroundColor: "#f0f9ff",
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e0f2fe",
        alignItems: "center",
        marginBottom: 16,
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: "#0369a1",
        marginLeft: 10,
        lineHeight: 18,
    },
    actionButton: {
        paddingHorizontal: 16,
        height: 40,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
        marginRight: 8,
    },
});

export default IntegrationCard;
