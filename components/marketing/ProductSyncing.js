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

const ProductSyncing = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => setIsExpanded(!isExpanded)}
                activeOpacity={0.9}
            >
                <LinearGradient
                    colors={["#FE9A00", "#FF6900"]}
                    style={styles.headerIconBox}
                >
                    <MaterialCommunityIcons
                        name="cylinder"
                        size={20}
                        color="#FFF"
                    />
                </LinearGradient>
                <View style={styles.headerTextContent}>
                    <Text style={styles.headerTitle}>Product syncing</Text>
                    <Text style={styles.headerSubtitle}>
                        Troubleshoot feed sync and catalog issues
                    </Text>
                </View>
                <Feather
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#64748B"
                />
            </TouchableOpacity>

            {isExpanded && <View style={styles.body}></View>}
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
        backgroundColor: "#FFFBEB",
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
});

export default ProductSyncing;
