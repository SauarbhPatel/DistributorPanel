import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const FAQItem = ({ question }) => (
    <TouchableOpacity style={styles.faqItem} activeOpacity={0.7}>
        <View style={styles.faqIconBackground}>
            <MaterialCommunityIcons
                name="file-document-outline"
                size={16}
                color="#C026D3"
            />
        </View>
        <Text style={styles.faqText}>{question}</Text>
        <Feather name="external-link" size={14} color="#94a3b8" />
    </TouchableOpacity>
);

const GettingStarted = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => setIsExpanded(!isExpanded)}
                activeOpacity={0.9}
            >
                <LinearGradient
                    colors={["#AD46FF", "#F6339A"]}
                    style={styles.headerIconBox}
                >
                    <Feather name="book" size={18} color="#FFFFFF" />
                </LinearGradient>
                <View style={styles.headerTextContent}>
                    <Text style={styles.headerTitle}>Getting started</Text>
                    <Text style={styles.headerSubtitle}>
                        Store requirements and common setup issues
                    </Text>
                </View>
                <Feather
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#64748B"
                />
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.body}>
                    <Text style={styles.introText}>
                        Store requirements and common issues during program
                        setup.
                    </Text>

                    <FAQItem question="How do I see more information about Google's Merchant Center requirements?" />
                    <FAQItem question="How do I edit my contact information?" />
                    <FAQItem question="Why don't I see my Merchant Center account in the dropdown?" />
                </View>
            )}
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
        marginTop: 10,
    },
    header: {
        flexDirection: "row",
        backgroundColor: "#FAF5FF",
        padding: 16,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
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
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#64748B",
    },
    body: {
        padding: 16,
    },
    introText: {
        fontSize: 12,
        color: "#64748B",
        marginBottom: 16,
    },
    faqItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#F1F5F9",
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
    },
    faqIconBackground: {
        width: 28,
        height: 28,
        backgroundColor: "#FAF5FF",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    faqText: {
        flex: 1,
        fontSize: 12,
        color: "#475569",
    },
});

export default GettingStarted;
