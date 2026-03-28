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
} from "react-native";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Loader } from "../../modules";

const TaxKindModel = ({ visible, onClose, isEdit = false, item = null }) => {
    const [state, setState] = useState({
        isLoading: false,
        taxKindName: "",
        taxKindCode: "",
        description: "",
        status: "Active",
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    useEffect(() => {
        if (isEdit && item && visible) {
            updateState({
                taxKindName: item?.name || "",
                taxKindCode: item?.code || "",
                description: item?.description || "",
                status: item?.status || "Active",
            });
        } else if (!isEdit && visible) {
            updateState({
                taxKindName: "",
                taxKindCode: "",
                description: "",
                status: "Active",
            });
        }
    }, [isEdit, item, visible]);

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <Loader isShow={state.isLoading} />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        {isEdit ? "Edit Tax Kind" : "Add Tax Kind"}
                    </Text>
                    <Text style={styles.headerSub}>
                        Define tax type, rate, scope, and rules. Save as Draft
                        or Publish.
                    </Text>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.formContainer}>
                        <View style={styles.infoBoxHeader}>
                            <View>
                                <Text style={styles.infoBoxTitle}>
                                    Tax Kind Details
                                </Text>
                                <Text style={styles.infoBoxSubtitle}>
                                    Configure tax details, scope, and validation
                                    settings.
                                </Text>
                            </View>
                            <Feather name="info" size={20} color="#3b82f6" />
                        </View>

                        <View style={styles.formBody}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    Tax Kind Name{" "}
                                    <Text style={styles.required}>*</Text>
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Colour, Battery Capacity"
                                    placeholderTextColor="#94a3b8"
                                    value={state.taxKindName}
                                    onChangeText={(val) =>
                                        updateState({ taxKindName: val })
                                    }
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    Tax Kind Code{" "}
                                    <Text style={styles.required}>*</Text>
                                </Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        isEdit && styles.disabledInput,
                                    ]}
                                    placeholder="e.g. colour, battery_capacity"
                                    placeholderTextColor="#94a3b8"
                                    editable={!isEdit}
                                    value={state.taxKindCode}
                                    onChangeText={(val) =>
                                        updateState({ taxKindCode: val })
                                    }
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Description"
                                    placeholderTextColor="#94a3b8"
                                    multiline
                                    numberOfLines={3}
                                    value={state.description}
                                    onChangeText={(val) =>
                                        updateState({ description: val })
                                    }
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Status</Text>
                                <TouchableOpacity style={styles.dropdown}>
                                    <Text style={styles.dropdownText}>
                                        {state.status}
                                    </Text>
                                    <Feather
                                        name="chevron-down"
                                        size={20}
                                        color="#64748b"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.taglineRow}>
                            <Feather name="tag" size={14} color="#94a3b8" />
                            <Text style={styles.taglineText}>
                                Ensure tax rate and scope are correctly
                                configured before publishing.
                            </Text>
                        </View>
                    </View>
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

                    <TouchableOpacity activeOpacity={0.8} style={{}}>
                        <LinearGradient
                            colors={["#0070ba", "#005a96"]}
                            style={styles.saveBtn}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.saveBtnText}>Save</Text>
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
    headerSub: { color: "#868e96", fontSize: 14, marginTop: 4 },
    content: { flex: 1, paddingHorizontal: 15 },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
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
        backgroundColor: "#fff",
    },
    infoBoxTitle: { fontSize: 16, fontWeight: "700", color: "#1f2937" },
    infoBoxSubtitle: { fontSize: 12, color: "#6b7280", marginTop: 2 },
    formBody: { padding: 16 },
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
    disabledInput: { backgroundColor: "#f3f4f6", color: "#9ca3af" },
    textArea: { height: 80, textAlignVertical: "top" },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 12,
    },
    dropdownText: { fontSize: 14, color: "#495057" },
    taglineRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f8fafc",
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
    },
    taglineText: { fontSize: 11, color: "#64748b", flex: 1 },
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
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
    },
    saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});

export default TaxKindModel;
