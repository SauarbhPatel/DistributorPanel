import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ConfigurationCard = ({
    stepNumber,
    title,
    description,
    icon,
    label,
    labelColor,
    placeholder,
    buttonText,
    buttonColor,
    gradientColors,
}) => (
    <View style={styles.card}>
        <View style={styles.headerRow}>
            <View
                style={[
                    styles.iconContainer,
                    { backgroundColor: `${buttonColor}15` },
                ]}
            >
                {icon}
            </View>
            <View style={styles.titleContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    {label && (
                        <View
                            style={[
                                styles.badge,
                                { backgroundColor: labelColor },
                            ]}
                        >
                            <Text style={styles.badgeText}>{label}</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.cardDescription}>{description}</Text>
            </View>

            <LinearGradient colors={gradientColors} style={styles.stepBadge}>
                <Text style={styles.stepText}>{stepNumber}</Text>
            </LinearGradient>
        </View>

        <View style={styles.inputSection}>
            <View style={styles.labelRow}>
                <Text style={styles.inputLabel}>{title} ID</Text>
                <Feather name="info" size={14} color="#94a3b8" />
            </View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#cbd5e1"
            />
        </View>

        <LinearGradient colors={gradientColors} style={[styles.button]}>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                }}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
                <MaterialCommunityIcons
                    name="open-in-new"
                    size={16}
                    color="#fff"
                    style={{ marginLeft: 8 }}
                />
            </TouchableOpacity>
        </LinearGradient>
    </View>
);

const ConfigureBox = () => {
    return (
        <View>
            <Text style={styles.mainTitle}>Configure</Text>
            <Text style={styles.mainSubtitle}>
                Account linking, conversion tracking, targeting policy defaults,
                and YouTube asset policy. Complete each step to unlock campaign
                creation.
            </Text>

            <ConfigurationCard
                stepNumber="1"
                title="Google Ads Account"
                description="Connect your Google Ads account to run ads manage campaigns."
                icon={<Feather name="trending-up" size={20} color="#1447E6" />}
                label="REQUIRED"
                labelColor="#DBEAFE"
                placeholder="123-456-7890"
                buttonText="Connect Google Ads"
                buttonColor="#2563eb"
                gradientColors={["#155DFC", "#1447E6"]}
            />

            <ConfigurationCard
                stepNumber="2"
                title="Merchant Center"
                description="Use Merchant Center to give product data for Shopping ads and free listings."
                icon={<Feather name="shield" size={20} color="#432DD7" />}
                label="REQUIRED"
                labelColor="#E0E7FF"
                placeholder="1234567890"
                buttonText="Connect Merchant Center"
                buttonColor="#4f46e5"
                gradientColors={["#4F39F6", "#432DD7"]}
            />

            <ConfigurationCard
                stepNumber="3"
                title="Google Analytics"
                description="Connect tool for conversion and audience insights."
                icon={
                    <MaterialCommunityIcons
                        name="poll"
                        size={20}
                        color="#8200DB"
                    />
                }
                label="CONNECTED"
                labelColor="#DCFCE7"
                placeholder="G-XXXXXXXXXX"
                buttonText="Connect Google Analytics"
                buttonColor="#9810FA"
                gradientColors={["#9810FA", "#8200DB"]}
            />
            <ConfigurationCard
                stepNumber="4"
                title="Google Pixel & Tags"
                description="Set up Google conversion tracking and remarketing tags."
                icon={<AntDesign name="Safety" size={20} color="#C6005C" />}
                label="CONFIGURED"
                labelColor="#DCFCE7"
                placeholder="AW-1234567890"
                buttonText="Configure Pixel & Tags"
                buttonColor="#db2777"
                gradientColors={["#E60076", "#C6005C"]}
            />

            <ConfigurationCard
                stepNumber="5"
                title="Conversion Tracking"
                description="Confirm conversion events are being tracked."
                icon={
                    <MaterialCommunityIcons
                        name="lightning-bolt-outline"
                        size={20}
                        color="#007A55"
                    />
                }
                label="PENDING"
                labelColor="#FEF9C2"
                placeholder="Enter measurement ID"
                buttonText="Link conversion"
                buttonColor="#059669"
                gradientColors={["#009966", "#007A55"]}
            />
        </View>
    );
};
export default ConfigureBox;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
        padding: 20,
    },
    mainTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 8,
    },
    mainSubtitle: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 20,
        marginBottom: 24,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        flex: 1,
        marginLeft: 12,
        paddingRight: 40,
    },
    titleRow: {
        // flexDirection: "row",
        alignItems: "flex-start",
        // flexWrap: "wrap",
        marginBottom: 6,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
    },
    cardDescription: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
    },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 5,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#6366f1",
    },
    stepBadge: {
        width: 32,
        height: 32,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: -5,
        top: 0,
    },
    stepText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    inputSection: {
        marginTop: 20,
    },
    labelRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#475569",
        marginRight: 6,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 14,
        color: "#1e293b",
        backgroundColor: "#fcfcfd",
    },
    button: {
        height: 44,
        borderRadius: 10,

        marginTop: 16,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
});
