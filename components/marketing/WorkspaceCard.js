import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WorkspaceCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <LinearGradient
                        colors={["#A855F7", "#7C3AED"]}
                        style={styles.stepBadge}
                    >
                        <Text style={styles.stepText}>2</Text>
                    </LinearGradient>
                    <View>
                        <Text style={styles.title}>
                            Create Marketing Workspace
                        </Text>
                        <Text style={styles.subtitle}>
                            Isolated environment for campaigns and analytics
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.body}>
                <View style={styles.row}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                            name="briefcase-outline"
                            size={24}
                            color="#A855F7"
                        />
                    </View>
                    <Text style={styles.description}>
                        A workspace isolates campaigns, analytics per seller and
                        supports Demo / Test / Production modes.
                    </Text>
                </View>

                <View style={styles.alertBox}>
                    <MaterialCommunityIcons
                        name="alert-circle-outline"
                        size={20}
                        color="#B45309"
                    />
                    <Text style={styles.alertText}>
                        No workspace created yet. Create one to continue with
                        setup.
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ alignSelf: "center" }}
                >
                    <LinearGradient
                        colors={["#A855F7", "#7C3AED"]}
                        style={styles.button}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <MaterialCommunityIcons
                            name="lightning-bolt"
                            size={18}
                            color="white"
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.buttonText}>Create Workspace</Text>
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        // elevation: 2,
        marginTop: 10,
    },
    headerContainer: {
        backgroundColor: "#FDF2F8",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    stepBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    stepText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 14,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    subtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
    },
    body: {
        padding: 10,
        paddingTop: 15,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: "#F5F3FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    description: {
        flex: 1,
        fontSize: 12,
        color: "#64748B",
        // lineHeight: 20,
    },
    alertBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFBEB",
        borderWidth: 1,
        borderColor: "#FEF3C7",
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
    },
    alertText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#B45309",
        fontWeight: "500",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        shadowColor: "#A855F7",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "600",
        fontSize: 15,
    },
});

export default WorkspaceCard;
