import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Switch,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Loader } from "../../modules";
import LiveTemplatePreview from "./LiveTemplatePreview";

const TemplateModel = ({ visible, onClose, isEdit = false, item = null }) => {
    const [state, setState] = useState({
        isLoading: false,
        templateName: "",
        headerText: "TAX INVOICE",
        footerText: "",
        termsConditions: "",
        showGSTIN: true,
        showHSNCode: true,
        taxBreakdown: true,
        reverseChargeNote: true,
        isDefault: false,
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    useEffect(() => {
        if (isEdit && item && visible) {
            updateState({
                templateName: item?.name || "",
                headerText: item?.header || "TAX INVOICE",
                footerText: item?.footer || "",
                termsConditions: item?.terms || "",
                showGSTIN: item?.showGSTIN ?? true,
                showHSNCode: item?.showHSNCode ?? true,
                taxBreakdown: item?.taxBreakdown ?? true,
                reverseChargeNote: item?.reverseChargeNote ?? true,
                isDefault: item?.isDefault ?? false,
            });
        }
    }, [isEdit, item, visible]);

    const renderSwitchItem = (label, subtitle, value, key) => (
        <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
                <Text style={styles.switchLabel}>{label}</Text>
                <Text style={styles.switchSubtitle}>{subtitle}</Text>
            </View>
            <Switch
                trackColor={{ false: "#e2e8f0", true: "#0070ba" }}
                thumbColor={"#fff"}
                ios_backgroundColor="#e2e8f0"
                onValueChange={(val) => updateState({ [key]: val })}
                value={value}
            />
        </View>
    );

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <Loader isShow={state.isLoading} />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        {isEdit ? "Edit Template" : "Create Invoice Template"}
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Customize your invoice layout and content
                    </Text>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.formContainer}>
                        {/* Section Header */}
                        <View style={styles.infoBoxHeader}>
                            <View>
                                <Text style={styles.infoBoxTitle}>
                                    Rule Details
                                </Text>
                                <Text style={styles.infoBoxSubtitle}>
                                    Provide the code, description, and
                                    applicable configuration.
                                </Text>
                            </View>
                            <Feather name="info" size={20} color="#3b82f6" />
                        </View>

                        <View style={styles.formBody}>
                            {/* Identity Section */}
                            <Text style={styles.sectionTag}>Identity</Text>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    Template Name{" "}
                                    <Text style={styles.required}>*</Text>
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Default GST Invoice"
                                    placeholderTextColor="#94a3b8"
                                    value={state.templateName}
                                    onChangeText={(val) =>
                                        updateState({ templateName: val })
                                    }
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Header Text</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="TAX INVOICE"
                                    placeholderTextColor="#94a3b8"
                                    value={state.headerText}
                                    onChangeText={(val) =>
                                        updateState({ headerText: val })
                                    }
                                />
                            </View>

                            {/* Content Section */}
                            <Text
                                style={[styles.sectionTag, { marginTop: 10 }]}
                            >
                                Content
                            </Text>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Footer Text</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Thank you for your business."
                                    placeholderTextColor="#94a3b8"
                                    value={state.footerText}
                                    onChangeText={(val) =>
                                        updateState({ footerText: val })
                                    }
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    Terms & Conditions
                                </Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Standard terms..."
                                    placeholderTextColor="#94a3b8"
                                    multiline
                                    numberOfLines={3}
                                    value={state.termsConditions}
                                    onChangeText={(val) =>
                                        updateState({ termsConditions: val })
                                    }
                                />
                            </View>

                            {/* Display Section */}
                            <Text
                                style={[styles.sectionTag, { marginTop: 10 }]}
                            >
                                Display
                            </Text>
                            {renderSwitchItem(
                                "Show GSTIN",
                                "Display seller & buyer tax IDs",
                                state.showGSTIN,
                                "showGSTIN",
                            )}
                            {renderSwitchItem(
                                "Show HSN Code",
                                "Include HSN in line items",
                                state.showHSNCode,
                                "showHSNCode",
                            )}
                            {renderSwitchItem(
                                "Tax Breakdown",
                                "Show GST % and amount columns",
                                state.taxBreakdown,
                                "taxBreakdown",
                            )}
                            {renderSwitchItem(
                                "Reverse Charge Note",
                                "Display reverse charge notice",
                                state.reverseChargeNote,
                                "reverseChargeNote",
                            )}

                            <View
                                style={{
                                    marginTop: 10,
                                    borderTopWidth: 1,
                                    borderTopColor: "#f1f5f9",
                                    paddingTop: 15,
                                }}
                            >
                                {renderSwitchItem(
                                    "Set as Default",
                                    "Use this template by default",
                                    state.isDefault,
                                    "isDefault",
                                )}
                            </View>
                        </View>
                    </View>
                    <LiveTemplatePreview />
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.cancelBtn}
                    >
                        <Feather
                            name="chevron-left"
                            size={18}
                            color="#64748b"
                        />
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8}>
                        <LinearGradient
                            colors={["#0070ba", "#005a96"]}
                            style={styles.saveBtn}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.saveBtnText}>
                                {isEdit ? "Update Template" : "Create Template"}
                            </Text>
                            <Feather
                                name="chevron-right"
                                size={18}
                                color="#fff"
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f9fa" },
    header: { padding: 20, backgroundColor: "#f8f9fa" },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "#1a1b1e" },
    headerSubtitle: { color: "#868e96", fontSize: 14, marginTop: 4 },
    content: { flex: 1, paddingHorizontal: 15 },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 16, // Premium rounded corners
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
        marginBottom: 20,
    },
    infoBoxHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
    },
    infoBoxTitle: { fontSize: 16, fontWeight: "700", color: "#1f2937" },
    infoBoxSubtitle: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 2,
        maxWidth: "90%",
    },
    formBody: { padding: 16 },
    sectionTag: {
        fontSize: 10,
        fontWeight: "800",
        color: "#0d9488",
        backgroundColor: "#f0fdfa",
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginBottom: 12,
        textTransform: "uppercase",
    },
    inputGroup: { marginBottom: 15 },
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#495057",
        marginBottom: 8,
    },
    required: { color: "#ef4444" },
    input: {
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        color: "#1a1b1e",
        backgroundColor: "#fff",
    },
    textArea: { height: 80, textAlignVertical: "top" },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    switchLabel: { fontSize: 14, fontWeight: "600", color: "#334155" },
    switchSubtitle: { fontSize: 11, color: "#94a3b8" },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e9ecef",
    },
    cancelBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
    cancelText: { color: "#868e96", fontWeight: "700", fontSize: 15 },
    saveBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
    },
    saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});

export default TemplateModel;
