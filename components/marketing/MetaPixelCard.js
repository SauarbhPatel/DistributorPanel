import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const MetaPixelCard = () => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <LinearGradient
                    colors={["#D946EF", "#C026D3"]}
                    style={styles.iconBox}
                >
                    <MaterialCommunityIcons
                        name="lightning-bolt"
                        size={24}
                        color="#FFF"
                    />
                </LinearGradient>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>Meta Pixel</Text>
                    <Text style={styles.headerSubtitle}>
                        Web events for measurement and audiences.
                    </Text>
                </View>
            </View>

            {/* Body Content */}
            <View style={styles.body}>
                <Text style={styles.pixelName}>Baofeng Web Pixel</Text>

                {/* ID Field */}
                <View style={styles.idContainer}>
                    <View style={styles.idInputBox}>
                        <Text style={styles.idText}>ID: 1234567890123456</Text>
                    </View>
                    <TouchableOpacity style={styles.copyButton}>
                        <Feather name="copy" size={18} color="#64748B" />
                    </TouchableOpacity>
                </View>

                {/* Events Card */}
                <View style={styles.eventsCard}>
                    <View style={styles.eventsHeader}>
                        <Octicons name="pulse" size={18} color="#A855F7" />
                        <Text style={styles.eventsLabel}>Events today</Text>
                    </View>
                    <Text style={styles.eventCount}>1,247</Text>
                </View>

                {/* Configure Button */}
                <TouchableOpacity activeOpacity={0.8}>
                    <LinearGradient
                        colors={["#A855F7", "#D946EF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.configureButton}
                    >
                        <Text style={styles.configureText}>Configure</Text>
                        <Feather name="external-link" size={14} color="#FFF" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    header: {
        backgroundColor: "#FDF4FF",
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
    },
    body: {
        padding: 15,
    },
    pixelName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#64748B",
        marginBottom: 8,
    },
    idContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        gap: 8,
    },
    idInputBox: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    idText: {
        fontSize: 14,
        color: "#334155",
        fontFamily: "System", // Or a mono font if available
    },
    copyButton: {
        width: 44,
        height: 44,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
    },
    eventsCard: {
        backgroundColor: "#FAF5FF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#F3E8FF",
        padding: 15,
        marginBottom: 20,
    },
    eventsHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    eventsLabel: {
        fontSize: 14,
        color: "#64748B",
        fontWeight: "500",
    },
    eventCount: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1E293B",
    },
    configureButton: {
        flexDirection: "row",
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    configureText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "600",
    },
});

export default MetaPixelCard;
