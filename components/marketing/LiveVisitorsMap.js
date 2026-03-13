import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const LiveVisitorsMap = () => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.liveDot} />
                <Text style={styles.title}>Live visitors (map)</Text>
            </View>

            <View style={styles.mapContainer}>
                <Feather name="globe" size={120} color="#E5E7EB" />

                <View style={[styles.pin, { top: 20, left: 40 }]}>
                    <Feather name="map-pin" size={36} color="#E5E7EB" />
                </View>
                <View style={[styles.pin, { top: 30, right: 50 }]}>
                    <Feather name="map-pin" size={32} color="#3B82F6" />
                </View>
                <View style={[styles.pin, { bottom: 60, left: 60 }]}>
                    <Feather name="map-pin" size={24} color="#10B981" />
                </View>
                <View style={[styles.pin, { bottom: 30, right: 30 }]}>
                    <Feather name="map-pin" size={40} color="#A855F7" />
                </View>
                <View style={[styles.pin, { bottom: 10, left: "45%" }]}>
                    <Feather name="map-pin" size={18} color="#F97316" />
                </View>
            </View>

            <Text style={styles.subText}>
                Real-time visitors by region (India)
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 20,
        margin: 10,
        borderWidth: 1,
        borderColor: "#F3F4F6",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginBottom: 20,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#10B981",
        marginRight: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1F2937",
    },
    mapContainer: {
        width: "100%",
        height: 200,
        backgroundColor: "#F8FAFF",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
    },
    pin: {
        position: "absolute",
    },
    subText: {
        marginTop: 15,
        fontSize: 11,
        color: "#94A3B8",
    },
});

export default LiveVisitorsMap;
