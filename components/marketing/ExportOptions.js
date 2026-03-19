import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ExportCard = ({ icon, title, subtitle, buttonText, colors, bgColor }) => (
    <View style={[styles.exportCard, { backgroundColor: bgColor }]}>
        <LinearGradient colors={colors} style={styles.iconContainer}>
            <MaterialCommunityIcons name={icon} size={24} color="white" />
        </LinearGradient>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>

        <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
            >
                <MaterialCommunityIcons
                    name="file-download-outline"
                    size={18}
                    color="white"
                />
                <Text style={styles.buttonText}>{buttonText}</Text>
            </LinearGradient>
        </TouchableOpacity>
    </View>
);

const ExportOptions = () => {
    return (
        <View style={styles.mainCard}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerIconBg}>
                    <MaterialCommunityIcons
                        name="download"
                        size={20}
                        color="white"
                    />
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>Export options</Text>
                    <Text style={styles.headerSubtitle}>
                        Download CSV or Excel; store report snapshots with
                        template versioning.
                    </Text>
                </View>
            </View>

            {/* Grid - Stacks on mobile */}
            <View style={[styles.grid]}>
                <ExportCard
                    icon="file-document-outline"
                    title="CSV"
                    subtitle="Comma-separated values for universal compatibility"
                    buttonText="Export CSV"
                    colors={["#3B82F6", "#06B6D4"]}
                    bgColor="#F0F9FF"
                />
                <ExportCard
                    icon="file-document-outline"
                    title="Excel"
                    subtitle="Microsoft Excel format with formatting support"
                    buttonText="Export Excel"
                    colors={["#00C950", "#00BC7D"]}
                    bgColor="#F0FDF4"
                />
            </View>

            <View style={styles.footerBar}>
                <View style={styles.checkIconBg}>
                    <MaterialCommunityIcons
                        name="check-decagram"
                        size={16}
                        color="white"
                    />
                </View>
                <View>
                    <Text style={styles.footerTitle}>
                        Template Versioning Enabled
                    </Text>
                    <Text style={styles.footerSubtitle}>
                        All exports are stored with template versioning for
                        reproducible results.
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ExportOptions;

const styles = StyleSheet.create({
    mainCard: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
        backgroundColor: "#ECFDF5",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerIconBg: {
        backgroundColor: "#10B981",
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
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
        maxWidth: "85%",
    },
    grid: { gap: 12, padding: 16 },

    exportCard: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.03)",
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1E293B",
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 12,
        color: "#64748B",
        marginBottom: 20,
        lineHeight: 18,
    },

    button: {
        flexDirection: "row",
        height: 44,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    buttonText: { color: "white", fontWeight: "bold", fontSize: 14 },

    footerBar: {
        flexDirection: "row",
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        margin: 16,
        marginTop: 0,
    },
    checkIconBg: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: "#10B981",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    footerTitle: { fontSize: 13, fontWeight: "bold", color: "#1E293B" },
    footerSubtitle: { fontSize: 11, color: "#64748B", marginTop: 2 },
});
