import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
    Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");
import { Alert } from "react-native";
import { __postApiData, __patchApiData } from "../../utils/api";
import { Loader } from "../../modules";

const TaxTypeModel = ({ visible, onClose, isEdit = false, item = null }) => {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        description: "",
        isActive: true,
        isLoading: false,
    });
    const validateForm = () => {
        if (!formData.name.trim()) {
            Alert.alert("Validation Error", "Name is required");
            return false;
        }
        if (!formData.code.trim()) {
            Alert.alert("Validation Error", "Code is required");
            return false;
        }
        return true;
    };
    const __handleSave = () => {
        if (!validateForm()) return;

        setFormData((prev) => ({ ...prev, isLoading: true }));

        const payload = {
            name: formData.name.trim(),
            code: formData.code.trim(),
            description: formData.description,
            isActive: formData.isActive,
        };

        __postApiData("/taxTypes/createTaxType", payload)
            .then((res) => {
                setFormData((prev) => ({ ...prev, isLoading: false }));

                if (res?.success) {
                    Alert.alert("Success", res.message);
                    onClose(true);
                } else {
                    Alert.alert("Error", res?.message || "Failed");
                }
            })
            .catch(() => {
                setFormData((prev) => ({ ...prev, isLoading: false }));
                Alert.alert("Error", "Something went wrong");
            });
    };
    const __handleEditSave = () => {
        if (!validateForm()) return;

        setFormData((prev) => ({ ...prev, isLoading: true }));

        const payload = {
            name: formData.name.trim(),
            code: formData.code.trim(),
            description: formData.description,
            isActive: formData.isActive,
        };

        __patchApiData(`/taxTypes/updateTaxTypeById/${item?._id}`, payload)
            .then((res) => {
                setFormData((prev) => ({ ...prev, isLoading: false }));

                if (res?.success) {
                    Alert.alert("Success", res.message);
                    onClose(true);
                } else {
                    Alert.alert("Error", res?.message || "Failed");
                }
            })
            .catch(() => {
                setFormData((prev) => ({ ...prev, isLoading: false }));
                Alert.alert("Error", "Something went wrong");
            });
    };

    useEffect(() => {
        if (isEdit && item && visible) {
            setFormData({
                name: item?.name || "",
                code: item?.code || "",
                description: item?.description || "",
                isActive: item?.isActive ?? true,
                isLoading: false,
            });
        } else if (!isEdit && visible) {
            setFormData({
                name: "",
                code: "",
                description: "",
                isActive: true,
                isLoading: false,
            });
        }
    }, [item, visible, isEdit]);
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <Loader isShow={formData.isLoading} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        {item ? "Edit Tax Type" : "Add Tax Type"}
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Define tax type, rate, scope, and rules. Save as Draft
                        or Publish.
                    </Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.formCard}>
                        <View style={styles.sectionHeader}>
                            <View>
                                <Text style={styles.sectionTitle}>
                                    Tax Type Details
                                </Text>
                                <Text style={styles.sectionSubtitle}>
                                    Configure tax details, scope, and validation
                                    settings.
                                </Text>
                            </View>
                            <View style={styles.infoIcon}>
                                <Feather
                                    name="info"
                                    size={16}
                                    color="#3B82F6"
                                />
                            </View>
                        </View>

                        {/* Form Fields */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>
                                Name <Text style={{ color: "#EF4444" }}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. GST 18%"
                                value={formData.name}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, name: text })
                                }
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>
                                Code <Text style={{ color: "#EF4444" }}>*</Text>
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="e.g. colour, battery_capacity"
                                value={formData.code}
                                onChangeText={(text) =>
                                    setFormData({ ...formData, code: text })
                                }
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Description</Text>
                            <TextInput
                                style={[styles.textInput, styles.textArea]}
                                placeholder="Description"
                                multiline
                                value={formData.description}
                                onChangeText={(text) =>
                                    setFormData({
                                        ...formData,
                                        description: text,
                                    })
                                }
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Status</Text>
                            <TouchableOpacity
                                style={styles.pickerButton}
                                activeOpacity={0.8}
                                onPress={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        isActive: !prev.isActive,
                                    }))
                                }
                            >
                                <Text style={styles.pickerText}>
                                    {formData.isActive ? "Active" : "Inactive"}
                                </Text>
                                <Feather
                                    name="chevron-down"
                                    size={20}
                                    color="#64748B"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footerNote}>
                            <Feather name="tag" size={14} color="#94A3B8" />
                            <Text style={styles.footerNoteText}>
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

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            isEdit ? __handleEditSave() : __handleSave()
                        }
                    >
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
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f9fa" },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
        backgroundColor: "#F8F9FA",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: height * 0.9,
        paddingTop: 12,
    },
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: "#E2E8F0",
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 10,
    },
    header: { padding: 20, backgroundColor: "#f8f9fa" },

    headerTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#1E293B",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#64748B",
        marginTop: 4,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    formCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
        marginBottom: 20,
        padding: 16,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1f2937",
    },
    sectionSubtitle: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 2,
        maxWidth: "90%",
    },
    infoIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#EFF6FF",
        justifyContent: "center",
        alignItems: "center",
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#495057",
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        color: "#1a1b1e",
        backgroundColor: "#fff",
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
    pickerButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 10,
        padding: 12,
    },
    pickerText: {
        color: "#1E293B",
        fontSize: 14,
    },
    footerNote: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f8fafc",
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
        marginHorizontal: -16,
        marginBottom: -16,
    },
    footerNoteText: {
        fontSize: 11,
        color: "#64748b",
        flex: 1,
    },

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

export default TaxTypeModel;
