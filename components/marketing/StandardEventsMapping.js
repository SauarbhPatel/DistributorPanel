import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const EventItem = ({ title, icon, color }) => (
    <View style={styles.eventCard}>
        <View style={styles.eventLeft}>
            <View style={[styles.eventIconBox, { backgroundColor: color }]}>
                <MaterialCommunityIcons name={icon} size={20} color="#FFF" />
            </View>
            <View>
                <Text style={styles.eventTitle}>{title}</Text>
                <View style={styles.mappedRow}>
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={14}
                        color="#10B981"
                    />
                    <Text style={styles.mappedText}>Mapped</Text>
                </View>
            </View>
        </View>

        <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.iconBtn}>
                <Feather name="edit-2" size={14} color="#64748B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
                <Feather name="trash-2" size={14} color="#64748B" />
            </TouchableOpacity>
        </View>
    </View>
);

const StandardEventsMapping = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <LinearGradient
                    colors={["#2B7FFF", "#AD46FF"]}
                    style={styles.headerIcon}
                >
                    <MaterialCommunityIcons
                        name="code-tags"
                        size={24}
                        color="#FFF"
                    />
                </LinearGradient>
                <View style={styles.headerText}>
                    <Text style={styles.title}>
                        Standard events mapping (demo)
                    </Text>
                    <Text style={styles.subtitle}>
                        Create and manage event names. Map your store events to
                        Meta standard events.
                    </Text>
                </View>
            </View>
            <View style={{ padding: 16 }}>
                {/* Input Area */}
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Lead, CompleteRegistration"
                        placeholderTextColor="#94A3B8"
                    />
                    <TouchableOpacity activeOpacity={0.8}>
                        <LinearGradient
                            colors={["#4F46E5", "#7C3AED"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.addButton}
                        >
                            <Feather name="plus" size={18} color="#FFF" />
                            <Text style={styles.addButtonText}>Add event</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Events List */}
                <View style={styles.listContainer}>
                    <EventItem
                        title="ViewContent"
                        icon="eye-outline"
                        color="#3B82F6"
                    />
                    <EventItem
                        title="AddToCart"
                        icon="cart-outline"
                        color="#10B981"
                    />
                    <EventItem
                        title="InitiateCheckout"
                        icon="cursor-default-click-outline"
                        color="#D946EF"
                    />
                    <EventItem
                        title="Purchase"
                        icon="credit-card-outline"
                        color="#F97316"
                    />
                </View>
            </View>
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
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 1,
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
    subtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
    },
    inputRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 12,
        color: "#1E293B",
    },
    addButton: {
        flexDirection: "row",
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
    },
    addButtonText: {
        color: "#FFF",
        fontWeight: "600",
        fontSize: 12,
    },
    listContainer: {
        gap: 16,
    },
    eventCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F8FAFC",
        padding: 16,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#E2E8F0",
    },
    eventLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    eventIconBox: {
        width: 35,
        height: 35,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    eventTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1E293B",
    },
    mappedRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 2,
    },
    mappedText: {
        fontSize: 11,
        color: "#64748B",
        fontWeight: "500",
    },
    actionButtons: {
        flexDirection: "row",
        gap: 8,
    },
    iconBtn: {
        width: 34,
        height: 34,
        borderRadius: 12,
        backgroundColor: "#FFF",
        borderWidth: 0.5,
        borderColor: "#E2E8F0",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default StandardEventsMapping;
