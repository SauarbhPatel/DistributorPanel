import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const SupportCard = ({ icon, title, subtitle, colors }) => (
    <TouchableOpacity style={styles.supportCard} activeOpacity={0.8}>
        <LinearGradient
            colors={colors}
            style={styles.supportIconBox}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Feather name={icon} size={20} color="#FFF" />
        </LinearGradient>
        <View>
            <Text style={styles.supportTitle}>{title}</Text>
            <Text style={styles.supportSubtitle}>{subtitle}</Text>
        </View>
    </TouchableOpacity>
);

const SupportCardsBox = () => {
    return (
        <View style={styles.section}>
            <SupportCard
                icon="play-circle"
                title="Video Tutorials"
                subtitle="Watch step-by-step guides"
                colors={["#2563eb", "#38bdf8"]}
            />
            <SupportCard
                icon="message-circle"
                title="Live Chat Support"
                subtitle="Get instant help from experts"
                colors={["#c026d3", "#f472b6"]}
            />
            <SupportCard
                icon="help-circle"
                title="FAQ Library"
                subtitle="Browse common questions"
                colors={["#059669", "#34d399"]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        gap: 12,
        marginTop: 15,
    },
    supportCard: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        // flexDirection: "row",
        // alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        gap: 16,
    },
    supportIconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    supportTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    supportSubtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
    },
});

export default SupportCardsBox;
