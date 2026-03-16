import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ActionButton = ({ label, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.actionButton}
    >
        <Text style={styles.actionLabel}>{label}</Text>
        <Feather
            name="chevron-right"
            size={18}
            color="rgba(255, 255, 255, 0.9)"
        />
    </TouchableOpacity>
);

const MetaQuickActions = () => {
    return (
        <LinearGradient
            colors={["#4F39F6", "#9810FA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="lightning-bolt"
                        size={24}
                        color="#FFFFFF"
                    />
                </View>
                <Text style={styles.headerTitle}>Quick Actions</Text>
            </View>

            {/* Buttons List */}
            <View style={styles.actionsContainer}>
                <ActionButton label="Create Campaign" onPress={() => {}} />
                <ActionButton label="Sync Products" onPress={() => {}} />
                <ActionButton label="View Reports" onPress={() => {}} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        padding: 16,
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    actionsContainer: {
        gap: 12,
    },
    actionButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    actionLabel: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.9)",
        fontWeight: "500",
    },
});

export default MetaQuickActions;
