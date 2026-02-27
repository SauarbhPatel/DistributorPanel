import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../../../constants/styles";
import { __uploadImage } from "../../../utils/api/commonApi";

const MediaUploadComponent = ({
    value,
    mainImage,
    galleryImages = [],
    shortVideo,
    onChange,
}) => {
    const __handleImageUpload = async (data, key) => {
        onChange({ loading: true });
        const image = await __uploadImage(
            data?.uri,
            data?.mimeType,
            data?.fileName,
        );
        if (!image) return onChange({ loading: false });

        onChange({
            loading: false,
            [key]:
                key == "galleryImageUrls"
                    ? [...value?.galleryImageUrls, image]
                    : image,
        });
    };
    // Pick Image
    const pickImage = async (type = "main") => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsMultipleSelection: type === "gallery",
            quality: 0.8,
        });

        if (!result.canceled) {
            if (type === "main") {
                __handleImageUpload(result.assets[0], "mainImageUrl");
            } else {
                __handleImageUpload(result.assets[0], "galleryImageUrls");
            }
        }
    };

    // Pick Video
    const pickVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            quality: 1,
        });

        if (!result.canceled) {
            // onChange({ shortVideo: result.assets[0] });
            console.log(result.assets[0]);
            __handleImageUpload(result.assets[0], "shortVideoUrl");
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.sectionTitle}>Media Upload</Text>
            <Text style={styles.sectionSubTitle}>
                Main image (mandatory), gallery (up to 10). Min 1200×1200px
                recommended.
            </Text>

            {/* Short Video */}
            <Text style={styles.label}>Short Video</Text>
            <TouchableOpacity style={styles.videoBtn} onPress={pickVideo}>
                <Ionicons
                    name="cloud-upload-outline"
                    size={18}
                    color={Colors.primaryColor}
                />
                <Text style={styles.videoBtnText}>
                    {shortVideo ? "Change Video" : "Upload Video"}
                </Text>
            </TouchableOpacity>

            {/* Main Image */}
            <Text style={styles.label}>
                Main Image <Text style={{ color: Colors.redColor }}>*</Text>
            </Text>
            <TouchableOpacity
                style={styles.dropBox}
                onPress={() => pickImage("main")}
            >
                {value?.mainImageUrl ? (
                    <Image
                        source={{ uri: value?.mainImageUrl }}
                        style={styles.mainImage}
                    />
                ) : (
                    <>
                        <Ionicons
                            name="image-outline"
                            size={40}
                            color={Colors.grayColor}
                        />
                        <Text style={styles.dropText}>
                            Tap here to add the main image
                        </Text>
                    </>
                )}
            </TouchableOpacity>

            {/* Gallery */}
            <Text style={styles.label}>Gallery Images (up to 10)</Text>
            <TouchableOpacity
                style={styles.galleryBox}
                onPress={() => pickImage("gallery")}
            >
                <Ionicons
                    name="cloud-upload-outline"
                    size={24}
                    color={Colors.primaryColor}
                />
            </TouchableOpacity>

            {value?.galleryImageUrls?.length > 0 && (
                <View style={styles.galleryPreview}>
                    {value?.galleryImageUrls?.map((item, index) => (
                        <Image
                            key={index}
                            source={{ uri: item }}
                            style={styles.galleryImage}
                        />
                    ))}
                </View>
            )}

            <Text style={styles.helperText}>Min 1200×1200px recommended.</Text>
        </View>
    );
};

export default MediaUploadComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 15,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
        color: "#111827",
    },
    sectionSubTitle: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 15,
    },
    label: {
        fontSize: 13,
        fontWeight: "500",
        color: "#111827",
        marginBottom: 6,
        marginTop: 12,
    },
    videoBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#D1D5DB",
        alignSelf: "flex-start",
    },
    videoBtnText: {
        color: Colors.primaryColor,
        fontSize: 13,
        fontWeight: "500",
    },
    dropBox: {
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#D1D5DB",
        borderRadius: 8,
        height: 160,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
    },
    dropText: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 6,
    },
    mainImage: {
        width: "100%",
        height: "100%",
        borderRadius: 6,
    },
    galleryBox: {
        width: 56,
        height: 56,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#D1D5DB",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
    },
    galleryPreview: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 10,
    },
    galleryImage: {
        width: 60,
        height: 60,
        borderRadius: 6,
    },
    helperText: {
        fontSize: 11,
        color: "#6B7280",
        marginTop: 8,
    },
});
