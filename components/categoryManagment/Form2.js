import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

const Form2 = (state, updateState) => {
    // const [state, setState] = useState({
    //     attributeSet: "Walkie Talkie Attributes",

    //     // ✅ UPDATED: multiple sets instead of single array
    //     selectedSets: [
    //         {
    //             title: "Walkie Talkie Specifications",
    //             attributes: [
    //                 "Brand",
    //                 "Frequency",
    //                 "Output Power",
    //                 "License Type",
    //                 "Color",
    //             ],
    //         },
    //         {
    //             title: "Skin Care Product Attributes",
    //             attributes: [],
    //         },
    //     ],
    // });

    // const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const removeSet = (index) => {
        const updated = [...state.selectedSets];
        updated.splice(index, 1);
        updateState({ selectedSets: updated });
    };

    const removeAttribute = (setIndex, attrIndex) => {
        const updated = [...state.selectedSets];
        updated[setIndex].attributes.splice(attrIndex, 1);
        updateState({ selectedSets: updated });
    };

    return (
        <View style={styles.container}>
            {/* Header (SAME) */}
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                        Attribute Set Configuration
                    </Text>
                    <Text style={styles.subtitle}>
                        Select a predefined attribute set for products in this
                        category.
                    </Text>
                </View>
                <Feather name="info" size={18} color="#3b82f6" />
            </View>

            {/* Body */}
            <View style={styles.body}>
                {/* Dropdown (SAME) */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Attribute Set</Text>
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownText}>
                            {state.attributeSet}
                        </Text>
                        <Feather
                            name="chevron-down"
                            size={18}
                            color="#6b7280"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.selectedBox}>
                    <View style={styles.selectedHeader}>
                        <Text style={styles.selectedTitle}>
                            • SELECTED ATTRIBUTE SETS (
                            {state.selectedSets?.length || 0})
                        </Text>
                    </View>

                    {state?.selectedSets?.map((set, setIndex) => (
                        <View key={setIndex} style={styles.setCard}>
                            {/* Header */}
                            <View style={styles.setHeader}>
                                <Text style={styles.setTitle}>{set.title}</Text>

                                <TouchableOpacity
                                    onPress={() => removeSet(setIndex)}
                                >
                                    <AntDesign
                                        name="closecircle"
                                        size={16}
                                        color="#ef4444"
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Attributes */}
                            {set?.attributes.length > 0 && (
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.tagContainer}
                                >
                                    {set?.attributes.map((item, attrIndex) => (
                                        <View
                                            key={attrIndex}
                                            style={styles.tag}
                                        >
                                            <Text style={styles.tagText}>
                                                {item}
                                            </Text>

                                            <TouchableOpacity
                                                onPress={() =>
                                                    removeAttribute(
                                                        setIndex,
                                                        attrIndex,
                                                    )
                                                }
                                            >
                                                <AntDesign
                                                    name="closecircle"
                                                    size={12}
                                                    color="#ef4444"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                        </View>
                    ))}
                </View>
            </View>

            {/* Footer (SAME) */}
            <View style={styles.footer}>
                <Feather name="message-square" size={14} color="#9ca3af" />
                <Text style={styles.footerText}>
                    Selected attributes represent the key product details that
                    must be captured.
                </Text>
            </View>
        </View>
    );
};

export default Form2;

const styles = StyleSheet.create({
    container: {
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

    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        padding: 12,
    },

    dropdownText: {
        fontSize: 14,
        color: "#374151",
    },

    selectedBox: {
        // backgroundColor: "#f3f4f6",
        // borderRadius: 12,
        // padding: 12,
        // borderWidth: 1,
        // borderColor: "#e5e7eb",
    },

    selectedHeader: {
        marginBottom: 10,
    },

    selectedTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#2563eb",
    },

    setCard: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    setHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },

    setTitle: {
        fontSize: 12,
        fontWeight: "600",
        color: "#111827",
    },
    tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },

    tag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e5e7eb",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        gap: 6,
    },

    tagText: {
        fontSize: 12,
        color: "#374151",
    },

    footer: {
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
