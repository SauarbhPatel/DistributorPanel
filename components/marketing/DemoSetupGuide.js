import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SetupStep = ({
    number,
    title,
    subtitle,
    icon,
    iconColors,
    isCompleted,
    onToggle,
}) => (
    <TouchableOpacity
        style={styles.stepCard}
        onPress={onToggle}
        activeOpacity={0.7}
    >
        <LinearGradient colors={iconColors} style={styles.stepIconBox}>
            {icon != "sparkles-outline" && (
                <MaterialCommunityIcons name={icon} size={18} color="#FFF" />
            )}
            {icon == "sparkles-outline" && (
                <Ionicons name={icon} size={18} color="#FFF" />
            )}
        </LinearGradient>
        <View style={styles.stepTextContent}>
            <Text style={styles.stepNumber}>Step {number}</Text>
            <Text style={styles.stepTitle}>{title}</Text>
        </View>
        <View
            style={[
                styles.checkCircle,
                // isCompleted && styles.checkCircleActive,
            ]}
        >
            {isCompleted && (
                <Ionicons name="checkmark-sharp" size={12} color="#E2E8F0" />
            )}
        </View>
    </TouchableOpacity>
);

const DemoSetupGuide = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [completedSteps, setCompletedSteps] = useState([1]); // Default step 1 done

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    const toggleStep = (id) => {
        setCompletedSteps((prev) =>
            prev.includes(id)
                ? prev.filter((step) => step !== id)
                : [...prev, id],
        );
    };

    const steps = [
        {
            id: 1,
            title: "Create workspace in Demo or Test mode (App Setup)",
            icon: "cube-outline",
            colors: ["#3B82F6", "#60A5FA"],
        },
        {
            id: 2,
            title: "Connect Google Ads test account",
            icon: "layers-outline",
            colors: ["#A855F7", "#D946EF"],
        },
        {
            id: 3,
            title: "Connect Merchant Center test account",
            icon: "database-outline",
            colors: ["#6366F1", "#818CF8"],
        },
        {
            id: 4,
            title: "Run feed sync + validation (Product Catalog Sync)",
            icon: "wrench-outline",
            colors: ["#10B981", "#34D399"],
        },
        {
            id: 5,
            title: "Create a PMax campaign using My Listings (Campaigns & Ads)",
            icon: "sparkles-outline",
            colors: ["#F59E0B", "#FBBF24"],
        },
        {
            id: 6,
            title: "Validate product inclusion and dashboards",
            icon: "check-decagram-outline",
            colors: ["#3B82F6", "#2DD4BF"],
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <TouchableOpacity
                style={[styles.header, !isExpanded && styles.headerClosed]}
                onPress={toggleExpand}
                activeOpacity={0.9}
            >
                <LinearGradient
                    colors={["#3B82F6", "#60A5FA"]}
                    style={styles.headerIcon}
                >
                    <Feather name="zap" size={18} color="#FFF" />
                </LinearGradient>
                <View style={styles.headerText}>
                    <Text style={styles.title}>Demo/Test Mode setup guide</Text>
                    <Text style={styles.subtitle}>
                        Complete internal checklist for dev/QA testing
                    </Text>
                </View>
                <Feather
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#64748B"
                />
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.content}>
                    <Text style={styles.introText}>
                        Internal checklist for dev/QA: create workspace, connect
                        test accounts, run feed sync and validation, create PMax
                        campaign.
                    </Text>

                    {steps.map((step) => (
                        <SetupStep
                            key={step.id}
                            number={step.id}
                            title={step.title}
                            icon={step.icon}
                            iconColors={step.colors}
                            isCompleted={completedSteps.includes(step.id)}
                            onToggle={() => toggleStep(step.id)}
                        />
                    ))}

                    <TouchableOpacity style={styles.mainButton}>
                        <LinearGradient
                            colors={["#2563EB", "#0891B2"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Feather
                                name="external-link"
                                size={16}
                                color="#FFF"
                            />
                            <Text style={styles.buttonText}>
                                Go to App Setup
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginTop: 16,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#F8FAFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerClosed: { borderBottomWidth: 0 },
    headerIcon: {
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    headerText: { flex: 1 },
    title: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
    subtitle: { fontSize: 12, color: "#64748B", marginTop: 2 },
    content: { padding: 16 },
    introText: {
        fontSize: 12,
        color: "#64748B",
        lineHeight: 18,
        marginBottom: 20,
    },
    stepCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        marginBottom: 10,
        backgroundColor: "#FFF",
    },
    stepIconBox: {
        width: 35,
        height: 35,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    stepTextContent: { flex: 1 },
    stepNumber: { fontSize: 11, fontWeight: "600", color: "#94A3B8" },
    stepTitle: { fontSize: 13, color: "#314158", fontWeight: "500" },
    checkCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#E2E8F0",
        justifyContent: "center",
        alignItems: "center",
    },
    checkCircleActive: {
        backgroundColor: "#CBD5E1",
    },
    mainButton: { marginTop: 10 },
    gradientButton: {
        flexDirection: "row",
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    buttonText: { color: "#FFF", fontSize: 14, fontWeight: "600" },
});

export default DemoSetupGuide;
