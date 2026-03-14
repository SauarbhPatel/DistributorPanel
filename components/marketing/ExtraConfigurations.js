import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ActionCard = ({ title, description, buttonText, onPress }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>

        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>{buttonText}</Text>
            <MaterialCommunityIcons
                name="open-in-new"
                size={16}
                color="#fff"
                style={{ marginLeft: 8 }}
            />
        </TouchableOpacity>
    </View>
);

// Implementation usage:
const ExtraConfigurations = () => (
    <View style={{ gap: 15 }}>
        <ActionCard
            title="Account linking (Merchant Center as Google Ads)"
            description="Associate tax product upload permission. Your organic details (eg. status and violations) is before campaign creation."
            buttonText="Link Merchant Center to Google Ads"
            onPress={() => console.log("Linking...")}
        />

        <ActionCard
            title="Conversion tracking configuration"
            description="Select how you measure performance. Get basic Google Ads conversion tag, or enhanced conversions (optional)."
            buttonText="Add a conversion tracking configuration"
            onPress={() => console.log("Configuring...")}
        />
    </View>
);
export default ExtraConfigurations;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 0.5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 12,
        color: "#64748B",
        lineHeight: 20,
        marginBottom: 20,
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#2563eb", // Standard vibrant blue
        alignSelf: "flex-start", // Keeps the button width to text size like the image
        paddingHorizontal: 16,
        height: 44,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
});
