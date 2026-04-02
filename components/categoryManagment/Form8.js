import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { __uploadImage } from "../../utils/api/commonApi";

const Form8 = ({ state, updateState }) => {
    const pickImage = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const image = await __uploadImage(
                result.assets[0]?.uri,
                result.assets[0]?.mimeType,
                result.assets[0]?.fileName,
            );

            if (type === "main") {
                updateState({ image: uri });
            } else {
                updateState({ icon: uri });
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Media Upload</Text>
                    <Text style={styles.subtitle}>
                        Upload category image and icon for storefront.
                    </Text>
                </View>
            </View>

            <View style={styles.body}>
                <Text style={styles.label}>
                    Image (Drag & Drop) <Text style={styles.required}>*</Text>
                </Text>
                <Text style={styles.helper}>
                    Main category image for listing and detail pages.
                </Text>

                <TouchableOpacity
                    style={styles.uploadBox}
                    onPress={() => pickImage("main")}
                >
                    {state.image ? (
                        <Image
                            source={{ uri: state.image }}
                            style={styles.previewImage}
                        />
                    ) : (
                        <View style={styles.uploadContent}>
                            <Feather name="image" size={32} color="#9ca3af" />
                            <Text style={styles.uploadText}>
                                Drop main image here or click to browse
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                <Text style={[styles.label, { marginTop: 16 }]}>
                    Icon (Drag & Drop) <Text style={styles.required}>*</Text>
                </Text>
                <Text style={styles.helper}>
                    Small icon for menus and category chips.
                </Text>

                <TouchableOpacity
                    style={styles.iconBox}
                    onPress={() => pickImage("icon")}
                >
                    {state.icon ? (
                        <Image
                            source={{ uri: state.icon }}
                            style={styles.iconPreview}
                        />
                    ) : (
                        <Feather name="upload" size={20} color="#3b82f6" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Form8;

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

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#111827",
    },

    required: {
        color: "#ef4444",
    },

    helper: {
        fontSize: 11,
        color: "#6b7280",
        marginBottom: 8,
    },

    uploadBox: {
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#d1d5db",
        borderRadius: 10,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9fafb",
    },

    uploadContent: {
        alignItems: "center",
        gap: 6,
    },

    uploadText: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 6,
        textAlign: "center",
    },

    previewImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },

    iconBox: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#3b82f6",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eff6ff",
        marginTop: 8,
    },

    iconPreview: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
});
