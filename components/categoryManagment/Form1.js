import React, { useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { DropDownTextAreaBox } from "../../modules";

const Form1 = ({ state, updateState }) => {
    useEffect(() => {
        if (state.categoryName) {
            const slug = state.categoryName
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .slice(0, 75);

            updateState({ slug });
        }
    }, [state.categoryName]);
    return (
        <View style={styles.formContainer}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                        Hierarchy & Basic Information
                    </Text>
                    <Text style={styles.subtitle}>
                        Define where this category sits in the tree and set
                        foundational metadata.
                    </Text>
                </View>
                <Feather name="info" size={18} color="#3b82f6" />
            </View>

            {/* Body */}
            <View style={styles.body}>
                {/* Category Name */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Category Name{" "}
                        <Text style={styles.optional}>
                            ({state.categoryName?.length}/250)
                        </Text>
                        <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. License Free Walkie Talkies"
                        placeholderTextColor="#9ca3af"
                        value={state.categoryName}
                        onChangeText={(val) =>
                            updateState({ categoryName: val })
                        }
                        maxLength={250}
                    />
                    <Text style={styles.helper}>
                        Maximum 250 characters. Include at least one letter —
                        not only symbols (e.g. ----) or only numbers.
                    </Text>
                </View>

                {/* Parent Category */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Parent Category</Text>

                    <DropDownTextAreaBox
                        type="select"
                        placeholder={"Select Category"}
                        list={[
                            { id: "", name: "None" },
                            ...state?.categoryList,
                        ]}
                        value={state.parentCategory}
                        isSearchable
                        inputCustomStyle={{}}
                        onSelected={(value) => {
                            updateState({
                                parentCategory: value,
                            });
                        }}
                        customStyle={{ marginBottom: 5, flex: 1 }}
                    />
                </View>

                {/* Category Code */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Category Code{" "}
                        <Text style={styles.optional}>
                            ({state.categoryCode?.length}/80)
                        </Text>{" "}
                        <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. ELEC-COMM-WT-LF"
                        placeholderTextColor="#9ca3af"
                        value={state.categoryCode}
                        onChangeText={(val) =>
                            updateState({ categoryCode: val })
                        }
                        maxLength={80}
                    />
                    <Text style={styles.helper}>
                        Letters, numbers, and hyphens only (segments like
                        ELEC-COMM-WT-LF). Must be unique. Max 80 characters.
                    </Text>
                </View>

                {/* Slug */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Slug (SEO URL)</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Auto-generated from name"
                        placeholderTextColor="#9ca3af"
                        value={state.slug}
                        onChangeText={(val) => updateState({ slug: val })}
                    />
                    <Text style={styles.helper}>
                        Auto-generated from category name. Edit manually if
                        needed. (Better practice it should be not more than 75
                        characters)
                    </Text>
                </View>

                {/* Status */}
                {/* <View style={styles.inputGroup}>
                    <Text style={styles.label}>Status</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() =>
                            updateState({
                                status:
                                    state.status === "Active"
                                        ? "Inactive"
                                        : "Active",
                            })
                        }
                    >
                        <Text style={styles.dropdownText}>{state.status}</Text>
                        <Feather
                            name="chevron-down"
                            size={18}
                            color="#6b7280"
                        />
                    </TouchableOpacity>
                </View> */}
            </View>

            {/* Footer Note */}
            <View style={styles.footerNote}>
                <Feather name="message-square" size={14} color="#9ca3af" />
                <Text style={styles.footerText}>
                    Enter a clear, user-friendly name for the category.
                </Text>
            </View>
        </View>
    );
};

export default Form1;

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        overflow: "hidden",
        marginVertical: 10,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f9fafb",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 4,
    },

    body: {
        padding: 16,
    },

    inputGroup: {
        marginBottom: 16,
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 6,
    },

    required: {
        color: "#ef4444",
    },

    optional: {
        color: "#9ca3af",
        fontSize: 11,
    },

    input: {
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        backgroundColor: "#fff",
    },

    disabledInput: {
        backgroundColor: "#f3f4f6",
        color: "#9ca3af",
    },

    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        padding: 12,
        backgroundColor: "#fff",
    },

    dropdownText: {
        fontSize: 14,
        color: "#374151",
    },

    helper: {
        fontSize: 11,
        color: "#9ca3af",
        marginTop: 5,
    },

    footerNote: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        backgroundColor: "#f9fafb",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        gap: 6,
    },

    footerText: {
        fontSize: 11,
        color: "#6b7280",
        flex: 1,
    },
});
