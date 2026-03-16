import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TroubleshootingItem = ({ icon, title, iconColor }) => (
    <TouchableOpacity style={styles.itemCard} activeOpacity={0.7}>
        <View style={styles.itemLeftContent}>
            <MaterialCommunityIcons
                name={icon}
                size={20}
                color={iconColor}
                style={styles.itemIcon}
            />
            <Text style={styles.itemTitle}>{title}</Text>
        </View>
        <Feather name="external-link" size={16} color="#94a3b8" />
    </TouchableOpacity>
);

const TroubleshootingLibrary = () => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <LinearGradient
                    colors={["#615FFF", "#AD46FF"]}
                    style={styles.headerIconBox}
                >
                    <MaterialCommunityIcons
                        name="wrench-outline"
                        size={22}
                        color="#FFF"
                    />
                </LinearGradient>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>
                        Troubleshooting library
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Common issues: feed disapprovals, linking, conversion
                        signals, eligibility and policy.
                    </Text>
                </View>
            </View>

            {/* List Section */}
            <View style={styles.listContainer}>
                <TroubleshootingItem
                    icon="alert-circle-outline"
                    title="Feed disapprovals and missing fields"
                    iconColor="#EF4444"
                />
                <TroubleshootingItem
                    icon="layers-outline"
                    title="Linking issues (Ads ↔ Merchant Center)"
                    iconColor="#3B82F6"
                />
                <TroubleshootingItem
                    icon="lightning-bolt-outline"
                    title="Missing conversion signals"
                    iconColor="#F59E0B"
                />
                <TroubleshootingItem
                    icon="file-document-outline"
                    title="Eligibility and policy restrictions"
                    iconColor="#A855F7"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginTop: 15,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        padding: 16,
        backgroundColor: "#F5F3FF",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
        alignItems: "center",
    },
    headerIconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
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
    listContainer: {
        padding: 16,
        gap: 10,
    },
    itemCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#FFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    itemLeftContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    itemIcon: {
        marginRight: 12,
    },
    itemTitle: {
        fontSize: 13,
        fontWeight: "500",
        color: "#334155",
        flex: 1,
    },
});

export default TroubleshootingLibrary;
