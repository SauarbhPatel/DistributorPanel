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
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Loader } from "../../modules"; // Assuming the same path as your HsnSetModel

const HsnCodeModel = ({ visible, onClose, isEdit = false, item = null }) => {
    const [state, setState] = useState({
        isLoading: false,
        hsnCode: "",
        taxSlab: "Select slab",
        productType: "",
        status: "Active",
        description: "",
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    useEffect(() => {
        if (isEdit && item && visible) {
            updateState({
                hsnCode: item?.code || "",
                taxSlab: item?.taxSlab || "Select slab",
                productType: item?.type || "",
                status: item?.status || "Active",
                description: item?.description || "",
            });
        } else if (!isEdit && visible) {
            updateState({
                hsnCode: "",
                taxSlab: "Select slab",
                productType: "",
                status: "Active",
                description: "",
            });
        }
    }, [isEdit, item, visible]);

    const handleSave = () => {
        // Add your save logic here
        console.log("Saving HSN Code:", state);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <Loader isShow={state.isLoading} />
            <SafeAreaView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        {isEdit ? "Edit HSN / SAC Code" : "Add HSN / SAC Code"}
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Create a new HSN or SAC code by defining its
                        classification and applicable details.
                    </Text>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.formContainer}>
                        {/* Info Box Header */}
                        <View style={styles.infoBoxHeader}>
                            <View>
                                <Text style={styles.infoBoxTitle}>
                                    Code Details
                                </Text>
                                <Text style={styles.infoBoxSubtitle}>
                                    Provide the code, description, and
                                    applicable configuration.
                                </Text>
                            </View>
                            <Feather name="info" size={20} color="#3b82f6" />
                        </View>

                        <View style={styles.formBody}>
                            {/* HSN/SAC Code */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    HSN / SAC Code{" "}
                                    <Text style={styles.required}>*</Text>
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. 8517"
                                    placeholderTextColor="#94a3b8"
                                    value={state.hsnCode}
                                    onChangeText={(val) =>
                                        updateState({ hsnCode: val })
                                    }
                                    keyboardType="numeric"
                                />
                            </View>

                            {/* Default Tax Slab Dropdown */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    Default Tax Slab{" "}
                                    <Text style={styles.required}>*</Text>
                                </Text>
                                <TouchableOpacity
                                    style={styles.dropdown}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.dropdownText,
                                            state.taxSlab === "Select slab" && {
                                                color: "#94a3b8",
                                            },
                                        ]}
                                    >
                                        {state.taxSlab}
                                    </Text>
                                    <Feather
                                        name="chevron-down"
                                        size={20}
                                        color="#64748b"
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Product Type */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Product Type</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Electronics"
                                    placeholderTextColor="#94a3b8"
                                    value={state.productType}
                                    onChangeText={(val) =>
                                        updateState({ productType: val })
                                    }
                                />
                            </View>

                            {/* Status Dropdown */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    Status{" "}
                                    <Text style={styles.required}>*</Text>
                                </Text>
                                <TouchableOpacity
                                    style={styles.dropdown}
                                    activeOpacity={0.7}
                                >
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

                            {/* Description */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="e.g. Telecommunication equipment"
                                    placeholderTextColor="#94a3b8"
                                    multiline
                                    numberOfLines={3}
                                    value={state.description}
                                    onChangeText={(val) =>
                                        updateState({ description: val })
                                    }
                                />
                            </View>
                        </View>

                        {/* Tagline Footer */}
                        <View style={styles.taglineRow}>
                            <Feather name="tag" size={14} color="#94a3b8" />
                            <Text style={styles.taglineText}>
                                Review slab rates, ranges, and conditions
                                carefully before publishing.
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Fixed Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.cancelBtn}
                        activeOpacity={0.6}
                    >
                        <Feather
                            name="chevron-left"
                            size={18}
                            color="#64748b"
                        />
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} onPress={handleSave}>
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
    headerSubtitle: {
        color: "#868e96",
        fontSize: 14,
        marginTop: 4,
        lineHeight: 18,
    },
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
    infoBoxSubtitle: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 2,
        maxWidth: "90%",
    },
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
    textArea: { height: 80, textAlignVertical: "top" },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 12,
        backgroundColor: "#fff",
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

export default HsnCodeModel;
