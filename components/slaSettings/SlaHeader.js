import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const SlaHeader = ({
    headerIcon,
    title,
    subTitle,
    buttonName,
    status,
    stats = [],
}) => {
    return (
        <LinearGradient
            colors={["#3f51b5", "#4da3ff"]}
            style={styles.bannerCard}
        >
            <View style={styles.bannerCircle1} />
            <View style={styles.bannerCircle2} />

            {headerIcon ? (
                <View style={styles.headerTop}>
                    <View style={styles.iconContainer}>{headerIcon}</View>
                    <Text style={styles.bannerTitle}>{title}</Text>
                </View>
            ) : (
                <Text style={styles.bannerTitle}>{title}</Text>
            )}

            <Text style={styles.bannerDesc}>{subTitle}</Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                {status && (
                    <TouchableOpacity style={styles.status} activeOpacity={0.8}>
                        <Text style={styles.statusText}>{status}</Text>
                    </TouchableOpacity>
                )}
                {buttonName && (
                    <TouchableOpacity
                        style={styles.setupBtn}
                        activeOpacity={0.8}
                    >
                        <Feather name="plus-circle" size={20} color="#3f51b5" />
                        <Text style={styles.setupText}>{buttonName}</Text>
                    </TouchableOpacity>
                )}
            </View>
            {stats.length > 0 && (
                <View style={styles.statsContainer}>
                    {stats.map((item, index) => (
                        <View key={index} style={styles.statItemWrapper}>
                            <View style={styles.statItem}>
                                {item.icon && (
                                    <MaterialCommunityIcons
                                        name={item.icon}
                                        size={20}
                                        color={item.iconColor || "#fff"}
                                        style={{ marginRight: 8 }}
                                    />
                                )}
                                <Text style={styles.statValue}>
                                    {item.value}
                                </Text>
                                <Text style={styles.statLabel}>
                                    {item.label}
                                </Text>
                            </View>
                            {/* Vertical Divider (don't show after last item) */}
                            {index < stats.length - 1 && (
                                <View style={styles.divider} />
                            )}
                        </View>
                    ))}
                </View>
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    bannerCard: {
        borderRadius: 16,
        padding: Sizes.fixPadding * 2,
        overflow: "hidden",
        position: "relative",
    },

    bannerTitle: {
        ...Fonts.whiteColor15Bold,
        marginBottom: 8,
        fontSize: 18,
    },

    bannerDesc: {
        ...Fonts.whiteColor12Medium,
        lineHeight: 20,
        opacity: 0.9,
    },
    status: {
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: "flex-start",
        borderColor: "#fff",
        paddingVertical: 8,
        marginTop: 15,
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingHorizontal: 14,
    },
    statusText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#ffffff",
    },

    setupBtn: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 6,
        marginTop: 15,
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },

    setupText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#3f51b5",
    },

    bannerCircle1: {
        position: "absolute",
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "rgba(255,255,255,0.15)",
        top: -30,
        right: -30,
    },

    bannerCircle2: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(255,255,255,0.12)",
        bottom: -30,
        right: 40,
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 10,
    },
    iconContainer: {
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 6,
        borderRadius: 8,
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 20, // Space before stats
    },
    statsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        flexWrap: "wrap",
    },
    statItemWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    statItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    statValue: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginRight: 6,
    },
    statLabel: {
        fontSize: 13,
        color: "rgba(255,255,255,0.8)",
    },
    divider: {
        width: 1,
        height: 25,
        backgroundColor: "rgba(255,255,255,0.3)",
        marginHorizontal: 15,
    },
});

export default SlaHeader;
