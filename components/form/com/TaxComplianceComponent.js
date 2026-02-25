import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DropDownTextAreaBox, TextAreaBox } from "../../../modules";
import { Colors, Sizes } from "../../../constants/styles";
import { AntDesign } from "@expo/vector-icons";

const TaxComplianceComponent = React.memo(
    ({
        hsnSearch,
        selectedHsn,
        hsnList = [],
        documentTypeList = [
            {
                id: "ETA Certificate",
                name: "ETA Certificate",
            },
            {
                id: "RT Test Report",
                name: "RT Test Report",
            },
        ],
        updateState,
    }) => {
        const [selectedDocs, setSelectedDocs] = useState([]);
        const [documents, setDocuments] = useState([{}]);

        /* ---------------------------------------------
           When document types are selected (multi-select)
        --------------------------------------------- */
        useEffect(() => {
            const mappedDocs = selectedDocs.map((doc) => {
                const existing = documents.find(
                    (d) => d.documentType?.id === doc.id,
                );

                return (
                    existing || {
                        id: Date.now() + Math.random(),
                        documentType: doc,
                        expiryDate: "",
                        file: null,
                    }
                );
            });

            setDocuments(mappedDocs);
        }, [selectedDocs]);

        const updateDocument = (id, key, value) => {
            setDocuments((prev) =>
                prev.map((d) => (d.id === id ? { ...d, [key]: value } : d)),
            );
        };

        const removeDocument = (id) => {
            setDocuments((prev) => prev.filter((d) => d.id !== id));
            setSelectedDocs((prev) =>
                prev.filter(
                    (p) =>
                        p.id !==
                        documents.find((d) => d.id === id)?.documentType?.id,
                ),
            );
        };

        return (
            <View style={styles.card}>
                {/* ================= TAX DETAILS ================= */}
                <Text style={styles.sectionTitle}>Tax & Compliance</Text>

                <Text style={styles.subTitle}>TAX DETAILS</Text>
                <Text style={styles.hint}>
                    Search HSN code, then select from the dropdown. Tax details
                    auto-populate.
                </Text>

                <TextAreaBox
                    title="HSN Code Search"
                    placeholder="Search HSN code or description..."
                    value={hsnSearch}
                    valuekey="hsnSearch"
                    required
                    onChangeText={updateState}
                    titleCustomStyle={styles.titleSpacing}
                    inputCustomStyle={inputStyle}
                />

                <DropDownTextAreaBox
                    title="Select HSN Code"
                    placeholder="Choose from filtered list..."
                    type="select"
                    list={hsnList}
                    value={selectedHsn}
                    onSelected={(value) => updateState({ selectedHsn: value })}
                    isSearchable
                    titleCustomStyle={styles.titleSpacing}
                    inputCustomStyle={inputStyle}
                />

                {/* DIVIDER */}
                <View style={styles.divider} />

                {/* ================= COMPLIANCE ================= */}
                <Text style={styles.subTitle}>COMPLIANCE UPLOAD</Text>
                <Text style={styles.hint}>
                    Document types assigned for this category. Select multiple
                    documents to add, then upload files and set expiry.
                </Text>

                {/* ADD DOCUMENT(S) MULTI SELECT */}
                <DropDownTextAreaBox
                    title="Add document(s)"
                    placeholder={
                        selectedDocs.length
                            ? `${selectedDocs.length} document type(s) selected`
                            : "Select document types"
                    }
                    type="select_multi"
                    list={documentTypeList}
                    value={selectedDocs}
                    onSelected={(value) => setSelectedDocs(value)}
                    titleCustomStyle={styles.titleSpacing}
                    inputCustomStyle={inputStyle}
                />

                {/* DOCUMENT ROWS */}
                {documents.map((doc) => (
                    <View key={doc.id} style={styles.documentRow}>
                        {/* DOCUMENT TYPE */}
                        <DropDownTextAreaBox
                            title="Document Type"
                            type="select"
                            placeholder="Select document"
                            list={documentTypeList}
                            value={doc.documentType}
                            onSelected={(value) =>
                                updateDocument(doc.id, "documentType", value)
                            }
                            inputCustomStyle={inputStyle}
                        />

                        {/* EXPIRY DATE */}
                        <DropDownTextAreaBox
                            title="Expiry Date"
                            placeholder="dd-mm-yyyy"
                            type="date"
                            value={doc.expiryDate}
                            onSelected={(value) =>
                                updateDocument(doc.id, "expiryDate", value)
                            }
                            inputCustomStyle={inputStyle}
                        />

                        {/* ACTIONS */}
                        <View style={styles.rowActions}>
                            <TouchableOpacity style={styles.uploadBtn}>
                                <AntDesign
                                    name="upload"
                                    size={16}
                                    color={Colors.primaryColor}
                                />
                                <Text style={styles.uploadText}>Upload</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => removeDocument(doc.id)}
                            >
                                <Text style={styles.removeText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* ADD DOCUMENT BUTTON */}
                {/* <TouchableOpacity style={styles.addBtn} onPress={() => {}}>
                    <Text style={styles.addBtnText}>Add Document</Text>
                </TouchableOpacity> */}
            </View>
        );
    },
);

export default TaxComplianceComponent;

/* ================= STYLES ================= */

const inputStyle = {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
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

    addBtn: {
        marginTop: 14,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        borderRadius: 6,
        paddingVertical: 10,
        alignItems: "center",
    },

    addBtnText: {
        fontSize: 13,
        fontWeight: "500",
        color: Colors.primaryColor,
    },
};
