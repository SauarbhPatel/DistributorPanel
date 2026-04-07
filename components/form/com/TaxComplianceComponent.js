import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { DropDownTextAreaBox } from "../../../modules";
import { Colors } from "../../../constants/styles";
import { AntDesign } from "@expo/vector-icons";
import { __formatDate2 } from "../../../utils/funtion";
import { __uploadImage } from "../../../utils/api/commonApi";
import CommonBox from "./CommonBox";

const TaxComplianceComponent = React.memo(({ value, onChange = () => {} }) => {
    const updateDocument = (id, key, data) => {
        onChange({
            complianceDocuments: value?.complianceDocuments?.map((d) =>
                d.id === id ? { ...d, [key]: data } : d,
            ),
            loading: false,
        });
    };

    const removeDocument = (id) => {
        console.log(id);
        onChange({
            complianceDocuments: value?.complianceDocuments?.filter(
                (d) => d.id !== id,
            ),
        });
    };

    const pickImage = async (docId) => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert("Permission required to access images");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            __handleImageUpload(result.assets[0], docId);
        }
    };
    const __handleImageUpload = async (data, key) => {
        onChange({ loading: true });
        const image = await __uploadImage(
            data?.uri,
            data?.mimeType,
            data?.fileName,
        );
        if (!image) return onChange({ loading: false });
        console.log(image);
        updateDocument(key, "url", image);
    };
    console.log(value?.complianceDocuments);

    return (
        <View style={{}}>
            <CommonBox
                title="Tax Details"
                subtitle="Search HSN code to auto-populate tax rates."
                footerNote="Tax rates will be calculated based on the selected HSN code."
                body={
                    <>
                        <DropDownTextAreaBox
                            title="Select HSN Code"
                            placeholder="Select HSN Code"
                            type="select"
                            list={value?.hsnCodeList || []}
                            value={value?.hsn}
                            onSelected={(val) => onChange({ hsn: val })}
                            isSearchable
                            titleCustomStyle={styles.titleSpacing}
                            inputCustomStyle={inputStyle}
                        />
                    </>
                }
            />
            <CommonBox
                title="Compliance Upload"
                subtitle="Upload category-specific documents for verification."
                body={
                    <>
                        <DropDownTextAreaBox
                            title="Add document(s)"
                            type="select_multi"
                            list={value?.complianceDocumentList || []}
                            value={value?.complianceDocuments || []}
                            onSelected={(val) =>
                                onChange({ complianceDocuments: val })
                            }
                            titleCustomStyle={styles.titleSpacing}
                            inputCustomStyle={inputStyle}
                        />

                        {/* DOCUMENT LIST */}
                        {(value?.complianceDocuments || []).map((doc) => (
                            <View key={doc.id} style={styles.documentRow}>
                                {/* DOCUMENT TYPE */}
                                <DropDownTextAreaBox
                                    title="Document Type"
                                    type="select"
                                    value={doc}
                                    editable={false}
                                    inputCustomStyle={inputStyle}
                                    titleCustomStyle={{
                                        ...styles.titleSpacing,
                                        marginTop: 0,
                                    }}
                                />

                                {/* EXPIRY DATE */}
                                <DropDownTextAreaBox
                                    title="Expiry Date"
                                    placeholder="dd-mm-yyyy"
                                    type="date"
                                    value={
                                        doc?.expiryDate
                                            ? __formatDate2(doc.expiryDate)
                                            : ""
                                    }
                                    onSelected={(v, selected) =>
                                        updateDocument(
                                            doc.id,
                                            "expiryDate",
                                            selected,
                                        )
                                    }
                                    titleCustomStyle={styles.titleSpacing}
                                    inputCustomStyle={inputStyle}
                                />

                                {/* ACTIONS */}
                                <View style={styles.rowActions}>
                                    <TouchableOpacity
                                        style={styles.uploadBtn}
                                        onPress={() => pickImage(doc.id)}
                                    >
                                        <AntDesign
                                            name="upload"
                                            size={16}
                                            color={Colors.primaryColor}
                                        />
                                        <Text style={styles.uploadText}>
                                            {doc?.file
                                                ? "Change File"
                                                : "Upload"}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => removeDocument(doc.id)}
                                    >
                                        <Text style={styles.removeText}>
                                            Remove
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* IMAGE PREVIEW */}
                                {doc?.url && (
                                    <View style={styles.previewBox}>
                                        <Image
                                            source={{ uri: doc.url }}
                                            style={styles.previewImage}
                                        />
                                        <TouchableOpacity
                                            onPress={() =>
                                                updateDocument(
                                                    doc.id,
                                                    "url",
                                                    null,
                                                )
                                            }
                                        >
                                            <Text
                                                style={styles.removeImageText}
                                            >
                                                Remove Image
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        ))}
                    </>
                }
            />
        </View>
    );
});

export default TaxComplianceComponent;

/* ================= STYLES ================= */

const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 0,
    backgroundColor: Colors.whiteColor,
    paddingVertical: 6,
};

const styles = {
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },

    subTitle: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
    },

    hint: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 12,
    },

    titleSpacing: {
        marginHorizontal: 0,
        marginTop: 10,
    },

    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 16,
    },

    documentRow: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        padding: 12,
        marginTop: 12,
    },

    rowActions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
    },

    uploadBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },

    uploadText: {
        fontSize: 13,
        color: Colors.primaryColor,
        fontWeight: "500",
    },

    removeText: {
        fontSize: 13,
        color: Colors.redColor,
    },

    previewBox: {
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        padding: 8,
        alignItems: "center",
    },

    previewImage: {
        width: "100%",
        height: 160,
        borderRadius: 6,
        resizeMode: "cover",
        backgroundColor: Colors.backColor,
    },

    removeImageText: {
        marginTop: 6,
        fontSize: 12,
        color: Colors.redColor,
    },
};
