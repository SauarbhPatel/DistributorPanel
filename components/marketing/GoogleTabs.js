import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const tabs = [
    { id: "overview", label: "Overview", icon: "view-grid-outline" },
    { id: "setup", label: "App Setup" },
    { id: "configure", label: "Configure" },
    { id: "sync", label: "Product Catalog Sync" },
    { id: "campaigns", label: "Campaigns & Ads" },
    { id: "settings", label: "Settings" },
    { id: "help", label: "Help Centre" },
];

const GoogleTabs = ({ activeTab, setActiveTab = () => {} }) => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => setActiveTab(tab.id)}
                            style={[
                                styles.tabButton,
                                isActive && styles.activeTabButton,
                            ]}
                            activeOpacity={0.8}
                        >
                            {tab.icon && (
                                <MaterialCommunityIcons
                                    name={tab.icon}
                                    size={18}
                                    color={isActive ? "#FFF" : "#64748B"}
                                    style={styles.icon}
                                />
                            )}
                            <Text
                                style={[
                                    styles.tabText,
                                    isActive && styles.activeTabText,
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        margin: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        // Subtle shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 0.5,
        marginTop: 0,
    },
    scrollContainer: {
        paddingHorizontal: 8,
        alignItems: "center",
    },
    tabButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 4,
    },
    activeTabButton: {
        backgroundColor: "#0071BC",
    },
    icon: {
        marginRight: 6,
    },
    tabText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#64748B",
    },
    activeTabText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
});

export default GoogleTabs;
