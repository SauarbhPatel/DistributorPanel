import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const PermissionItem = ({ title, description, isChecked, onPress }) => (
    <TouchableOpacity
        style={styles.permissionRow}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <View style={styles.checkContainer}>
            <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                {isChecked && (
                    <Ionicons name="checkmark" size={14} color="#FFF" />
                )}
            </View>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemDescription}>{description}</Text>
        </View>
    </TouchableOpacity>
);

const RBACPermissions = () => {
    const [permissions, setPermissions] = useState({
        createEdit: true,
        pauseResume: false,
        adminApproval: false,
    });

    const togglePermission = (key) => {
        setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                <LinearGradient
                    colors={["#2B7FFF", "#00B8DB"]}
                    style={styles.headerIconBox}
                >
                    <Feather name="users" size={20} color="#FFFFFF" />
                </LinearGradient>
                <View style={styles.headerTextContent}>
                    <Text style={styles.headerTitle}>
                        RBAC and seller permissions
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Controls who can view spend and modify campaigns.
                        <Text style={styles.boldText}>
                            {" "}
                            Marketplace Admin:{" "}
                        </Text>
                        full access.
                        <Text style={styles.boldText}> Seller: </Text>own ads
                        only.
                    </Text>
                </View>
            </View>

            {/* List Section */}
            <View style={styles.listBody}>
                <PermissionItem
                    title="Seller can create and edit campaigns"
                    description="Allow sellers to create new advertising campaigns and modify existing ones"
                    isChecked={permissions.createEdit}
                    onPress={() => togglePermission("createEdit")}
                />

                <PermissionItem
                    title="Seller can pause and resume own campaigns"
                    description="Enable sellers to pause or resume their advertising campaigns at any time"
                    isChecked={permissions.pauseResume}
                    onPress={() => togglePermission("pauseResume")}
                />

                <PermissionItem
                    title="Ads require admin approval before running (production)"
                    description="Require marketplace admin approval for all new campaigns before they go live"
                    isChecked={permissions.adminApproval}
                    onPress={() => togglePermission("adminApproval")}
                />
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
        backgroundColor: "#EFF6FF",
        padding: 16,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerIconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    headerTextContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#64748B",
        lineHeight: 16,
    },
    boldText: {
        fontWeight: "600",
        color: "#475569",
    },
    listBody: {
        paddingVertical: 8,
    },
    permissionRow: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    checkContainer: {
        marginRight: 12,
        paddingTop: 2,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#CBD5E1",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxActive: {
        backgroundColor: "#0369A1",
        borderColor: "#0369A1",
    },
    textContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1E293B",
        marginBottom: 4,
    },
    itemDescription: {
        fontSize: 12,
        color: "#64748B",
        lineHeight: 18,
    },
});

export default RBACPermissions;
