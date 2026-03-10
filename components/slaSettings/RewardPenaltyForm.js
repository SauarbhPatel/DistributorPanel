import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import { Colors, Sizes } from "../../constants/styles";

const RewardPenaltyForm = () => {
    return (
        <View style={styles.formWrapper}>
            <Text style={styles.mainSubtitle}>
                Configure penalties when SLA is breached (fixed amount per order
                or % of sales value) and rewards for sellers who maintain SLA.
            </Text>

            {/* PENALTY SECTION */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Penalty (SLA breached)</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Penalty type</Text>
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.inputText} numberOfLines={1}>
                            Percentage of order sales value (e.g. 2% of order
                            value)
                        </Text>
                        <Feather name="chevron-down" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Percentage of order sales value (%)
                    </Text>
                    <View style={styles.numericInputWrapper}>
                        <TextInput
                            style={styles.numericInput}
                            keyboardType="numeric"
                            defaultValue="2"
                        />
                        <View style={styles.spinButtons}>
                            <TouchableOpacity style={styles.spinBtn}>
                                <Entypo
                                    name="chevron-small-up"
                                    size={20}
                                    color="#ccc"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.spinBtn}>
                                <Entypo
                                    name="chevron-small-down"
                                    size={20}
                                    color="#ccc"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.helperText}>
                        Penalty = this % of order value when SLA is breached.
                    </Text>
                </View>

                <View style={styles.infoFooter}>
                    <MaterialIcons
                        name="chat-bubble-outline"
                        size={18}
                        color="#94a3b8"
                    />
                    <Text style={styles.footerInfoText}>
                        The name of the penalty rule visible to users in the
                        order workflow.
                    </Text>
                </View>
            </View>

            {/* REWARD SECTION */}
            <View style={[styles.card, { marginTop: 20 }]}>
                <Text style={styles.cardTitle}>Reward (SLA maintained)</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        SLA compliance threshold (%)
                    </Text>
                    <View style={styles.numericInputWrapper}>
                        <TextInput
                            style={styles.numericInput}
                            keyboardType="numeric"
                            defaultValue="98"
                        />
                        <View style={styles.spinButtons}>
                            <TouchableOpacity style={styles.spinBtn}>
                                <Entypo
                                    name="chevron-small-up"
                                    size={20}
                                    color="#ccc"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.spinBtn}>
                                <Entypo
                                    name="chevron-small-down"
                                    size={20}
                                    color="#ccc"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.helperText}>
                        Sellers with SLA compliance above this % become eligible
                        for reward (e.g. 98% = maintained SLA above 98%).
                    </Text>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Reward as % of total penalties charged from seller
                    </Text>
                    <View style={styles.numericInputWrapper}>
                        <TextInput
                            style={styles.numericInput}
                            keyboardType="numeric"
                            defaultValue="4.5"
                        />
                        <View style={styles.spinButtons}>
                            <TouchableOpacity style={styles.spinBtn}>
                                <Entypo
                                    name="chevron-small-up"
                                    size={20}
                                    color="#ccc"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.spinBtn}>
                                <Entypo
                                    name="chevron-small-down"
                                    size={20}
                                    color="#ccc"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.helperText}>
                        Eligible sellers receive this % of the total penalties
                        charged from them (in any form) as reward amount.
                        Example: 5% of penalties charged = reward.
                    </Text>
                </View>

                <View style={styles.infoFooter}>
                    <MaterialIcons
                        name="chat-bubble-outline"
                        size={18}
                        color="#94a3b8"
                    />
                    <Text style={styles.footerInfoText}>
                        Minimum SLA compliance required for a seller to qualify
                        for a reward.
                    </Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.saveBtn}
                    activeOpacity={0.8}
                    onPress={() => console.log("Saved!")}
                >
                    <Text style={styles.saveBtnText}>Save settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formWrapper: { flex: 1 },
    mainTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 5,
    },
    mainSubtitle: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 18,
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        overflow: "hidden",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
        marginBottom: 15,
    },
    inputGroup: { marginBottom: 18 },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1e293b",
        marginBottom: 8,
    },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 50,
    },
    inputText: { fontSize: 13, color: "#64748b", flex: 1 },
    numericInputWrapper: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        height: 50,
        overflow: "hidden",
    },
    numericInput: {
        flex: 1,
        paddingHorizontal: 12,
        fontSize: 14,
        color: "#000",
    },
    spinButtons: {
        width: 40,
        borderLeftWidth: 1,
        borderColor: "#e2e8f0",
    },
    spinBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 0.5,
        borderColor: "#e2e8f0",
    },
    helperText: { fontSize: 11, color: "#94a3b8", marginTop: 6 },
    infoFooter: {
        flexDirection: "row",
        backgroundColor: "#f8fafc",
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 10,
        alignItems: "center",
        gap: 10,
        marginHorizontal: -16,
        marginBottom: -16,
    },
    footerInfoText: { fontSize: 12, color: "#64748b", flex: 1 },

    bottomContainer: {
        padding: Sizes.fixPadding * 2,
        alignItems: "center",
        justifyContent: "center",
    },
    saveBtn: {
        backgroundColor: Colors.primaryColor,
        width: "100%",
        maxWidth: 400,
        height: 54,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    saveBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
});

export default RewardPenaltyForm;
