import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const LoggingAudit = () => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#00C950", "#00BC7D"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.headerIconBox}
                >
                    <Ionicons
                        name="document-text-outline"
                        size={20}
                        color="#FFFFFF"
                    />
                </LinearGradient>
                <View style={styles.headerTextContent}>
                    <Text style={styles.headerTitle}>Logging and audit</Text>
                    <Text style={styles.headerSubtitle}>
                        Every change is trackable: asset linking, feed sync
                        events, campaign create/edit/pause, budget change
                    </Text>
                </View>
            </View>

            {/* Action Section */}
            <View style={styles.body}>
                <TouchableOpacity
                    style={styles.exportButton}
                    activeOpacity={0.8}
                >
                    <Feather name="download" size={18} color="#FFFFFF" />
                    <Text style={styles.exportButtonText}>Export logs</Text>
                </TouchableOpacity>
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
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        backgroundColor: "#F0FDF4",
        padding: 16,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    headerIconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    headerTextContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#64748B",
    },
    body: {
        padding: 16,
    },
    exportButton: {
        flexDirection: "row",
        backgroundColor: "#059669",
        height: 52,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    exportButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },
});

export default LoggingAudit;
