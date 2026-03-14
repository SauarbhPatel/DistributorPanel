import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const tabs = [
    { id: "list", label: "Campaign List", icon: "menu", type: "feather" },
    {
        id: "assets",
        label: "Ads & Asset Groups",
        icon: "image-outline",
        type: "ionicons",
    },
    {
        id: "monitor",
        label: "Product Ads Monitor",
        icon: "bar-chart-outline",
        type: "ionicons",
    },
    {
        id: "dashboard",
        label: "Seller Ads Dashboard",
        icon: "person-outline",
        type: "ionicons",
    },
    {
        id: "targets",
        label: "Targets & Eligibility",
        icon: "target",
        type: "material",
    },
];

const CampaignsTabs = ({ activeTab = "list", setActiveTab = () => {} }) => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;

                    // Logic to render the correct Icon Set based on type
                    const renderIcon = () => {
                        const iconColor = isActive ? "#1e293b" : "#64748b";
                        const size = 18;

                        if (tab.type === "feather") {
                            return (
                                <Feather
                                    name={tab.icon}
                                    size={size}
                                    color={iconColor}
                                    style={styles.icon}
                                />
                            );
                        } else if (tab.type === "material") {
                            return (
                                <MaterialCommunityIcons
                                    name={tab.icon}
                                    size={size}
                                    color={iconColor}
                                    style={styles.icon}
                                />
                            );
                        }
                        return (
                            <Ionicons
                                name={tab.icon}
                                size={size}
                                color={iconColor}
                                style={styles.icon}
                            />
                        );
                    };

                    return (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => setActiveTab(tab.id)}
                            style={[
                                styles.tabButton,
                                isActive && styles.activeTabButton,
                            ]}
                            activeOpacity={0.7}
                        >
                            {renderIcon()}
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
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginTop: 15,
    },
    scrollContainer: {
        paddingHorizontal: 12,
        alignItems: "center",
    },
    tabButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        marginHorizontal: 4,
    },
    activeTabButton: {
        backgroundColor: "#f1f5f1", // Light beige/gray background from image
    },
    icon: {
        marginRight: 8,
    },
    tabText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#64748b",
    },
    activeTabText: {
        color: "#1e293b",
        fontWeight: "700",
    },
});

export default CampaignsTabs;
