import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ConversionConfigurationCard = ({
    stepNumber,
    title,
    badgeText,
    description,
    optionTitle,
    optionSubtitle,
    buttonText,
    onPress,
}) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <View style={styles.iconWrapper}>
                    <Ionicons
                        name="settings-outline"
                        size={20}
                        color="#7c3aed"
                    />
                </View>

                {/* <View style={styles.titleContainer}>
                    <View style={styles.badgeRow}>
                        <Text style={styles.titleText}>{title}</Text>
                        <View style={styles.badge}>
                            <MaterialCommunityIcons
                                name="check-circle-outline"
                                size={12}
                                color="#10b981"
                            />
                            <Text style={styles.badgeText}>{badgeText}</Text>
                        </View>
                    </View>
                    <Text style={styles.descriptionText}>{description}</Text>
                </View> */}
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
                    colors={["#a78bfa", "#7c3aed"]}
                    style={styles.stepBadge}
                >
                    <Text style={styles.stepNumberText}>{stepNumber}</Text>
                </LinearGradient>
            </View>

            <View style={styles.selectionArea}>
                <Text style={styles.selectionLabel}>
                    Conversion Measurement Type
                </Text>
                <TouchableOpacity
                    style={styles.radioOption}
                    activeOpacity={0.7}
                >
                    <View style={styles.radioButton}>
                        <View style={styles.radioInner} />
                    </View>
                    <View style={styles.radioTextContainer}>
                        <Text style={styles.optionTitle}>{optionTitle}</Text>
                        <Text style={styles.optionSubtitle}>
                            {optionSubtitle}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <LinearGradient
                colors={["#a78bfa", "#7c3aed"]}
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
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        backgroundColor: "#f5f3ff",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        flex: 1,
        marginLeft: 12,
        paddingRight: 35,
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
        color: "#059669",
    },
    descriptionText: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 18,
    },
    //
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
    selectionArea: {
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        marginBottom: 20,
    },
    selectionLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#475569",
        marginBottom: 12,
    },
    radioOption: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd6fe", // Purple tint border
        alignItems: "center",
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#7c3aed",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#7c3aed",
    },
    radioTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1e293b",
    },
    optionSubtitle: {
        fontSize: 12,
        color: "#94a3b8",
        marginTop: 2,
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

export default ConversionConfigurationCard;
