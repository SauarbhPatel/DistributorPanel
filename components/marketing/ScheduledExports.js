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

const ScheduleOption = ({ icon, title, time, iconColor }) => (
    <View style={styles.optionCard}>
        <View
            style={[styles.optionIconContainer, { backgroundColor: iconColor }]}
        >
            <MaterialCommunityIcons name={icon} size={20} color="white" />
        </View>
        <View>
            <Text style={styles.optionTitle}>{title}</Text>
            <Text style={styles.optionTime}>{time}</Text>
        </View>
    </View>
);

const ScheduledExports = () => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <LinearGradient
                        colors={["#6366F1", "#A855F7"]}
                        style={styles.headerIconBg}
                    >
                        <MaterialCommunityIcons
                            name="calendar-month"
                            size={24}
                            color="white"
                        />
                    </LinearGradient>
                    <View>
                        <Text style={styles.headerTitle}>
                            Scheduled exports
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            Daily / weekly / monthly scheduled exports (demo).
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.configureBtn}>
                    <MaterialCommunityIcons
                        name="cog-outline"
                        size={16}
                        color="white"
                        style={{ marginRight: 4 }}
                    />
                    <Text style={styles.configureBtnText}>Configure</Text>
                </TouchableOpacity>
            </View>

            {/* Empty State Section */}
            <View style={styles.emptyStateContainer}>
                <View style={styles.emptyIconBg}>
                    <MaterialCommunityIcons
                        name="calendar-blank-outline"
                        size={32}
                        color="#94A3B8"
                    />
                </View>
                <Text style={styles.emptyStateTitle}>No scheduled exports</Text>
                <Text style={styles.emptyStateSubtitle}>
                    Configure in Reports Builder to set up automated exports.
                </Text>
            </View>

            {/* Available Options Grid */}
            <Text style={styles.sectionLabel}>Available schedule options:</Text>
            <View style={styles.optionsGrid}>
                <ScheduleOption
                    icon="clock-outline"
                    title="Daily"
                    time="9:00 AM"
                    iconColor="#D946EF"
                />
                <ScheduleOption
                    icon="calendar-range"
                    title="Weekly"
                    time="Monday 9:00 AM"
                    iconColor="#F97316"
                />
                <ScheduleOption
                    icon="calendar-check"
                    title="Monthly"
                    time="1st of month"
                    iconColor="#8B5CF6"
                />
            </View>

            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.mainButtonWrapper}
            >
                <LinearGradient
                    colors={["#6366F1", "#EC4899"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.mainButton}
                >
                    <MaterialCommunityIcons
                        name="cog-outline"
                        size={20}
                        color="white"
                    />
                    <Text style={styles.mainButtonText}>
                        Open Reports Builder
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 15,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F8FAFC",
        backgroundColor: "#F8FAFC",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerIconBg: {
        backgroundColor: "#8B5CF6",
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
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
    configureBtn: {
        backgroundColor: "#8B5CF6",
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 16,
        justifyContent: "center",
    },
    configureBtnText: {
        color: "white",
        fontSize: 13,
        fontWeight: "600",
    },
    emptyStateContainer: {
        alignItems: "center",
        paddingVertical: 40,
    },
    emptyIconBg: {
        backgroundColor: "#F1F5F9",
        width: 50,
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    emptyStateTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#475569",
    },
    emptyStateSubtitle: {
        fontSize: 13,
        color: "#94A3B8",
        textAlign: "center",
        marginTop: 4,
        paddingHorizontal: 40,
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#475569",
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    optionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 16,
        gap: 8,
        marginBottom: 16,
    },
    optionCard: {
        flex: 1,
        // minWidth: (width - 80) / 3,
        minWidth: (width - 50) / 3,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        borderRadius: 12,
        padding: 12,
    },
    optionIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E293B",
    },
    optionTime: {
        fontSize: 11,
        color: "#94A3B8",
        marginTop: 2,
    },
    mainButtonWrapper: {
        margin: 16,
        marginTop: 0,
    },
    mainButton: {
        flexDirection: "row",
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    mainButtonText: {
        color: "white",
        fontSize: 14,
    },
});

export default ScheduledExports;
