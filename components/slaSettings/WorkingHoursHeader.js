import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

const WorkingHoursHeader = ({ title, buttonName, count, onAdd }) => {
    return (
        <View style={styles.headerContainer}>
            {/* Left side: Icon, Title, and Badge */}
            <View style={styles.leftSection}>
                <FontAwesome5 name="globe-americas" size={18} color="#0066b2" />
                <Text style={styles.titleText}>{title}</Text>
                <View style={styles.countBadge}>
                    <Text style={styles.countText}>{count}</Text>
                </View>
            </View>

            {/* Right side: Add Button */}
            <TouchableOpacity style={styles.addButton} onPress={onAdd}>
                <Feather name="plus" size={18} color="#fff" />
                <Text style={styles.addButtonText}>{buttonName}</Text>
            </TouchableOpacity>
        </View>
    );
};
export default WorkingHoursHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        backgroundColor: "transparent",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    titleText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#212529",
    },
    countBadge: {
        backgroundColor: "#e7f1ff",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    countText: {
        fontSize: 12,
        color: "#0066b2",
        fontWeight: "bold",
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0066b2", // Deep blue from image
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        gap: 6,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
});
