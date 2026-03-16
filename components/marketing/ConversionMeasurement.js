import React, { useState } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { Feather } from "@expo/vector-icons";

const ConversionMeasurement = () => {
    const [isEnabled, setIsEnabled] = useState(true);

    return (
        <View style={styles.cardContainer}>
            {/* Top Section */}
            <View style={styles.topSection}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>Conversion measurement</Text>
                    <Feather
                        name="info"
                        size={16}
                        color="#94a3b8"
                        style={styles.infoIcon}
                    />
                </View>
                <Text style={styles.description}>
                    Optimizes performance of paid ads and free listings;
                    insights into impactful ads, products, keywords.
                </Text>
            </View>

            {/* Bottom Status Section */}
            <View style={styles.statusSection}>
                <View style={styles.toggleRow}>
                    <Text style={styles.statusLabel}>Status</Text>
                    <Switch
                        trackColor={{ false: "#CBD5E1", true: "#10B981" }}
                        thumbColor={"#FFFFFF"}
                        ios_backgroundColor="#CBD5E1"
                        onValueChange={() => setIsEnabled(!isEnabled)}
                        value={isEnabled}
                    />
                </View>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoBoxText}>
                        Required for Google Ads, YouTube, Google Analytics,
                        conversion measurement, remarketing.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 10,
    },
    topSection: {
        padding: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    infoIcon: {
        marginLeft: 8,
    },
    description: {
        fontSize: 12,
        color: "#64748B",
        lineHeight: 20,
    },
    statusSection: {
        backgroundColor: "#F0FDF4",
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    toggleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    statusLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    infoBox: {
        backgroundColor: "#DBEAFE",
        borderWidth: 1,
        borderColor: "#93C5FD",
        borderRadius: 14,
        padding: 14,
    },
    infoBoxText: {
        color: "#1E40AF",
        fontSize: 12,
        lineHeight: 20,
        fontWeight: "500",
    },
});

export default ConversionMeasurement;
