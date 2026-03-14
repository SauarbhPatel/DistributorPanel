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
    openBreachQueueButton = false,
    settingsButton = false,
    goToAppSetup = false,
    isShowProgress = false,
    isShowFeed = false,
    progress = 0,
    colors = ["#3f51b5", "#4da3ff"],
}) => {
    return (
        <LinearGradient colors={colors} style={styles.bannerCard}>
            <View style={styles.bannerCircle1} />
            <View style={styles.bannerCircle2} />

            {headerIcon ? (
                <View style={styles.headerTop}>
                    <View style={styles.iconContainer}>{headerIcon}</View>
                    <View>
                        <Text style={styles.bannerTitle}>{title}</Text>
                        {isShowFeed && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 10,
                                    alignItems: "center",
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: "center",
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.2)",
                                        paddingHorizontal: 5,
                                        paddingVertical: 2,
                                        borderRadius: 5,
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <Text
                                        style={{
                                            fontSize: 11,
                                            color: "#ffffff",
                                        }}
                                    >
                                        Feed Management
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: "rgba(255, 255, 255, 0.9)",
                                    }}
                                >
                                    5 products synced
                                </Text>
                            </View>
                        )}
                    </View>
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
                {openBreachQueueButton && (
                    <TouchableOpacity
                        style={styles.setupBtn}
                        activeOpacity={0.8}
                    >
                        <Feather name="inbox" size={20} color="#3f51b5" />
                        <Text style={styles.setupText}>Open breach queue</Text>
                        <Feather name="arrow-right" size={20} color="#3f51b5" />
                    </TouchableOpacity>
                )}
                {settingsButton && (
                    <TouchableOpacity style={styles.status} activeOpacity={0.8}>
                        <Feather name="settings" size={16} color="#ffffff" />
                        <Text style={[styles.setupText, { color: "#ffffff" }]}>
                            Settings
                        </Text>
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
                                {item.value && (
                                    <Text style={styles.statValue}>
                                        {item.value}
                                    </Text>
                                )}
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

            {goToAppSetup && (
                <View style={styles.bannerInner}>
                    <Text style={styles.bannerInnerText}>
                        Create a Marketing Workspace first in App Setup to
                        unlock connections and campaigns.
                    </Text>

                    <TouchableOpacity style={styles.setupBtn}>
                        <Text style={styles.setupText}>Go to App Setup</Text>
                    </TouchableOpacity>
                </View>
            )}
            {progressBar()}
        </LinearGradient>
    );

    function progressBar() {
        if (!isShowProgress) return null;
        return (
            <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                    <View
                        style={[styles.progressFill, { width: `${progress}%` }]}
                    />
                </View>
                <Text style={styles.progressText}>{progress}% Complete</Text>
            </View>
        );
    }
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
    bannerInner: {
        marginTop: Sizes.fixPadding * 2,
        backgroundColor: "rgba(255,255,255,0.15)",
        padding: Sizes.fixPadding,
        borderRadius: 10,
    },

    bannerInnerText: {
        ...Fonts.whiteColor12Medium,
        marginBottom: Sizes.fixPadding,
    },

    setupBtn: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 6,
    },
    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
        gap: 10,
    },
    progressTrack: {
        flex: 1,
        height: 6,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderRadius: 10,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
    },
    progressText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#ffffff",
        minWidth: 80,
        textAlign: "right",
    },
});

export default SlaHeader;
