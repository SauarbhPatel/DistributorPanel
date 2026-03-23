import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const DashboardCards = () => {
    const summaryData = [
        {
            title: "NEW ABANDONED",
            count: 2,
            theme: {
                bg: "#FFF7ED",
                border: "#FFD6A8",
                text: "#C2410C",
                badge: "#FB923C",
            },
        },
        {
            title: "ASSIGNED TO TEAM",
            count: 1,
            link: "Open Team Dashboard",
            theme: {
                bg: "#EFF6FF",
                border: "#BEDBFF",
                text: "#1D4ED8",
                badge: "#60A5FA",
            },
        },
        {
            title: "RECOVERED",
            count: 1,
            theme: {
                bg: "#F0FDF4",
                border: "#B9F8CF",
                text: "#15803D",
                badge: "#2DD4BF",
            },
        },
        {
            title: "NOT INTERESTED",
            count: 1,
            theme: {
                bg: "#F8FAFC",
                border: "#E2E8F0",
                text: "#475569",
                badge: "#94A3B8",
            },
        },
    ];

    return (
        <View style={styles.gridContainer}>
            {summaryData.map((item, index) => (
                <View
                    key={index}
                    style={[
                        styles.card,
                        {
                            backgroundColor: item.theme.bg,
                            borderColor: item.theme.border,
                        },
                    ]}
                >
                    <View style={styles.contentRow}>
                        <View style={styles.textContainer}>
                            <Text
                                style={[
                                    styles.title,
                                    { color: item.theme.text },
                                ]}
                            >
                                {item.title}
                            </Text>
                            {item.link && (
                                <TouchableOpacity>
                                    <Text style={styles.linkText}>
                                        {item.link}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View
                            style={[
                                styles.badge,
                                { backgroundColor: item.theme.badge },
                            ]}
                        >
                            <Text style={styles.badgeText}>{item.count}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        justifyContent: "space-between",
        gap: 12,
    },
    card: {
        minWidth: CARD_WIDTH,
        flex: 1,
        height: 100,
        borderRadius: 16,
        borderWidth: 1,
        padding: 12,
        justifyContent: "center",
    },
    contentRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textContainer: {
        flex: 1,
        paddingRight: 8,
    },
    title: {
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 0.5,
    },
    linkText: {
        fontSize: 11,
        color: "#2563EB",
        marginTop: 12,
        fontWeight: "600",
        textDecorationLine: "underline",
    },
    badge: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    badgeText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "800",
    },
});

export default DashboardCards;
