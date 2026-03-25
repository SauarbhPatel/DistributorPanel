import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import B2BSettingFilterSearchBar from "./B2BSettingFilterSearchBar";

const B2BTransactionsCom = ({
    tabs = [
        "B2B Transactions",
        "Demo Data",
        "Order Status Manager",
        "Transition Rules",
        "Role Permissions",
        "Audit Logs",
    ],
    activeTab,
    setActiveTab,
    tabsData,
}) => {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.tabWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={[
                                styles.tabItem,
                                activeTab === tab && styles.activeTabItem,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === tab && styles.activeTabText,
                                ]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {tabsData[activeTab]?.title ||
            tabsData[activeTab]?.des ||
            tabsData[activeTab]?.isShowFilter ? (
                <View style={styles.cardContainer}>
                    <View style={styles.infoBox}>
                        {tabsData[activeTab]?.title ? (
                            <Text style={styles.cardTitle}>
                                {tabsData[activeTab]?.title}
                            </Text>
                        ) : null}
                        {tabsData[activeTab]?.des ? (
                            <Text style={styles.cardDescription}>
                                {tabsData[activeTab]?.des}
                            </Text>
                        ) : null}
                        {tabsData[activeTab]?.isShowFilter ? (
                            <B2BSettingFilterSearchBar />
                        ) : null}
                    </View>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        margin: 10,
        overflow: "hidden",
    },
    tabWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
        paddingHorizontal: 8,
    },
    tabItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
    },
    activeTabItem: {
        borderBottomColor: "#0070ba",
    },
    tabText: {
        fontSize: 14,
        color: "#6b7280",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#0070ba",
        fontWeight: "600",
    },
    cardContainer: {
        padding: 16,
    },
    infoBox: {
        backgroundColor: "#f5f8ff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#dce4f7",
        padding: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111",
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 13,
        color: "#4b5563",
        lineHeight: 20,
    },
});

export default B2BTransactionsCom;
