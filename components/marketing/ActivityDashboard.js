import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const ActivityLogItem = ({ message, timestamp, iconColors, bgColors }) => (
    <View
        style={[
            styles.itemContainer,
            { backgroundColor: bgColors[0], borderColor: bgColors[1] },
        ]}
    >
        <LinearGradient colors={iconColors} style={styles.iconCircle}>
            <Feather name="info" size={20} color="#FFF" />
        </LinearGradient>
        <View style={styles.textContainer}>
            <Text style={styles.messageText}>{message}</Text>
            <Text style={styles.timestampText}>{timestamp}</Text>
        </View>
    </View>
);

const ActivityDashboard = () => {
    const logs = [
        {
            id: "1",
            message: "Catalog sync completed. 24 products.",
            timestamp: "2/17/2025, 3:45:00 PM",
            iconColors: ["#2B7FFF", "#4F39F6"],
            bgColors: ["#F0F7FF", "#D8E9FF"],
        },
        {
            id: "2",
            message: "Pixel events received: 1247.",
            timestamp: "2/17/2025, 3:45:00 PM",
            iconColors: ["#AD46FF", "#F6339A"],
            bgColors: ["#FDF2F8", "#FCE7F3"],
        },
        {
            id: "3",
            message: "CAPI event missing client_user_agent (3 events).",
            timestamp: "2/17/2025, 2:15:00 PM",
            iconColors: ["#94A3B8", "#64748B"],
            bgColors: ["#F8FAFC", "#F1F5F9"],
        },
        {
            id: "4",
            message: "Campaign 'Summer Sale - Catalog' budget updated.",
            timestamp: "2/17/2025, 3:30:00 AM",
            iconColors: ["#1A237E", "#3B5BDB", "#4DABF7"],
            bgColors: ["#F7FEE7", "#ECFCCB"],
        },
    ];

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={logs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ActivityLogItem
                        message={item.message}
                        timestamp={item.timestamp}
                        iconColors={item.iconColors}
                        bgColors={item.bgColors}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 16,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
        // Soft shadow for the icon
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    textContainer: {
        flex: 1,
    },
    messageText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1E293B",
        marginBottom: 4,
    },
    timestampText: {
        fontSize: 12,
        color: "#64748B",
        fontWeight: "500",
    },
});

export default ActivityDashboard;
