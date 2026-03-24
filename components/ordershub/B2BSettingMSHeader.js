// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

// const B2BSettingMSHeader = () => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.headerRow}>
//                 <View style={styles.titleContent}>
//                     <Text style={styles.levelText}>
//                         Level 1: <Text style={styles.boldText}>NEW_ORDER</Text>{" "}
//                         · Open · Non-terminal
//                     </Text>
//                     <Text style={styles.descriptionText}>
//                         Order just placed; pending verification and assignment
//                     </Text>
//                 </View>

//                 <TouchableOpacity style={styles.editPrimaryBtn}>
//                     <MaterialCommunityIcons
//                         name="information-outline"
//                         size={16}
//                         color="#fff"
//                     />
//                     <Text style={styles.editBtnText}>Edit Primary</Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.secondaryCard}>
//                 <View style={styles.cardContent}>
//                     <Text style={styles.cardTitle}>
//                         Secondary statuses (Level 2)
//                     </Text>
//                     <Text style={styles.cardSubText}>
//                         Child statuses under this primary. E.g. "All Orders",
//                         "Unverified Orders", "Verified Orders". Used as
//                         sub-filters or operational queues.
//                     </Text>

//                     <TouchableOpacity style={styles.addBtn}>
//                         <Text style={styles.addBtnText}>
//                             Add secondary status
//                         </Text>
//                         <AntDesign name="pluscircleo" size={18} color="#fff" />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#fff",
//         padding: 10,
//     },
//     headerRow: {
//         marginBottom: 20,
//     },
//     titleContent: {
//         flex: 1,
//         paddingRight: 12,
//     },
//     primaryTitle: {
//         fontSize: 22,
//         fontWeight: "800",
//         color: "#1e293b",
//         marginBottom: 6,
//     },
//     levelText: {
//         fontSize: 13,
//         color: "#64748b",
//         marginBottom: 4,
//     },
//     boldText: {
//         fontWeight: "700",
//         color: "#475569",
//     },
//     descriptionText: {
//         fontSize: 13,
//         color: "#94a3b8",
//         lineHeight: 18,
//     },
//     editPrimaryBtn: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#0070ba",
//         paddingVertical: 10,
//         paddingHorizontal: 12,
//         borderRadius: 10,
//         gap: 6,
//         marginTop: 10,
//         justifyContent: "center",
//     },
//     editBtnText: {
//         color: "#fff",
//         fontSize: 13,
//         fontWeight: "700",
//     },
//     secondaryCard: {
//         backgroundColor: "#eff4ff",
//         borderRadius: 16,
//         borderWidth: 1,
//         borderColor: "#d1e0ff",
//         overflow: "hidden",
//     },
//     cardContent: {
//         padding: 20,
//     },
//     cardTitle: {
//         fontSize: 16,
//         fontWeight: "700",
//         color: "#1e293b",
//         marginBottom: 8,
//     },
//     cardSubText: {
//         fontSize: 12,
//         color: "#64748b",
//         lineHeight: 18,
//         marginBottom: 16,
//     },
//     addBtn: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#0070ba",
//         alignSelf: "flex-start",
//         paddingVertical: 10,
//         paddingHorizontal: 16,
//         borderRadius: 12,
//         gap: 10,
//     },
//     addBtnText: {
//         color: "#fff",
//         fontSize: 14,
//         fontWeight: "700",
//     },
// });

// export default B2BSettingMSHeader;

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";
import {
    MaterialCommunityIcons,
    AntDesign,
    Ionicons,
} from "@expo/vector-icons";

const B2BSettingMSHeader = ({ onPress = () => {} }) => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerRow}>
                <View style={styles.titleContent}>
                    <Text style={styles.levelText}>
                        Level 1: <Text style={styles.boldText}>NEW_ORDER</Text>{" "}
                        · Open · Non-terminal
                    </Text>
                    <Text style={styles.descriptionText}>
                        Order just placed; pending verification and assignment
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={onPress}
                    style={styles.editPrimaryBtn}
                >
                    <MaterialCommunityIcons
                        name="information-outline"
                        size={16}
                        color="#fff"
                    />
                    <Text style={styles.editBtnText}>Edit Primary</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.secondaryCard}>
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>
                        Secondary statuses (Level 2)
                    </Text>
                    <Text style={styles.cardSubText}>
                        Child statuses under this primary. E.g. "All Orders",
                        "Unverified Orders", "Verified Orders". Used as
                        sub-filters or operational queues.
                    </Text>

                    {!isFormVisible ? (
                        <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => setIsFormVisible(true)}
                        >
                            <Text style={styles.addBtnText}>
                                Add secondary status
                            </Text>
                            <AntDesign
                                name="pluscircleo"
                                size={18}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.formContainer}>
                            <Text style={styles.formTitle}>
                                Create secondary status
                            </Text>

                            <View style={{ marginBottom: 15, gap: 15 }}>
                                <View style={styles.flex1}>
                                    <Text style={styles.inputLabel}>
                                        Secondary status name *
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. Unverified Orders"
                                    />
                                </View>
                                <View style={[styles.flex1]}>
                                    <Text style={styles.inputLabel}>
                                        Code * (unique)
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. NEW_ORDER_UNVERIFIED"
                                    />
                                </View>
                            </View>

                            <Text style={styles.inputLabel}>Description</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Optional"
                                multiline
                            />

                            <Text
                                style={[styles.inputLabel, { marginTop: 16 }]}
                            >
                                Visible to
                            </Text>
                            <View style={styles.checkboxRow}>
                                {["Admin", "Seller", "Buyer"].map((role) => (
                                    <View
                                        key={role}
                                        style={styles.checkboxItem}
                                    >
                                        <MaterialCommunityIcons
                                            name="checkbox-marked"
                                            size={20}
                                            color="#10b981"
                                        />
                                        <Text style={styles.checkboxLabel}>
                                            {role}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.inputRow}>
                                <View style={styles.flex1}>
                                    <Text style={styles.inputLabel}>
                                        Assignment mode
                                    </Text>
                                    <View style={styles.selectBox}>
                                        <Text style={styles.selectText}>
                                            Manual Only
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={[styles.flex1, { marginLeft: 10 }]}
                                >
                                    <Text style={styles.inputLabel}>
                                        Sort order
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="30"
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>

                            <View style={styles.formActions}>
                                <TouchableOpacity
                                    style={styles.cancelBtn}
                                    onPress={() => setIsFormVisible(false)}
                                >
                                    <Ionicons
                                        name="chevron-back"
                                        size={18}
                                        color="#64748b"
                                    />
                                    <Text style={styles.cancelText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.submitBtn}>
                                    <Text style={styles.submitText}>
                                        Add secondary status
                                    </Text>
                                    <AntDesign
                                        name="pluscircleo"
                                        size={16}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.footerNote}>
                                <MaterialCommunityIcons
                                    name="message-outline"
                                    size={16}
                                    color="#94a3b8"
                                />
                                <Text style={styles.footerNoteText}>
                                    Enter a clear name that represents this
                                    order group or workflow step (e.g.,
                                    "Unverified Orders", "Pending Review").
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    headerRow: { marginBottom: 20 },
    titleContent: { flex: 1, paddingRight: 12 },
    primaryTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1e293b",
        marginBottom: 6,
    },
    levelText: { fontSize: 13, color: "#64748b", marginBottom: 4 },
    boldText: { fontWeight: "700", color: "#475569" },
    descriptionText: { fontSize: 13, color: "#94a3b8", lineHeight: 18 },
    editPrimaryBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0070ba",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        gap: 6,
        marginTop: 12,
    },
    editBtnText: { color: "#fff", fontSize: 13, fontWeight: "700" },

    // Secondary Status Card
    secondaryCard: {
        backgroundColor: "#eff4ff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#d1e0ff",
        overflow: "hidden",
    },
    cardContent: { padding: 10 },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 8,
    },
    cardSubText: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 16,
    },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0070ba",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        gap: 10,
    },
    addBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },

    // Form Styles
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        overflow: "hidden",
    },
    formTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: 20,
    },
    inputRow: { flexDirection: "row", marginBottom: 15 },
    flex1: { flex: 1 },
    inputLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#475569",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        color: "#1e293b",
    },
    textArea: { height: 60, textAlignVertical: "top" },
    checkboxRow: { flexDirection: "row", gap: 20, marginBottom: 15 },
    checkboxItem: { flexDirection: "row", alignItems: "center", gap: 6 },
    checkboxLabel: { fontSize: 14, color: "#475569" },
    selectBox: {
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#f8fafc",
    },
    selectText: { fontSize: 14, color: "#64748b" },
    formActions: { flexDirection: "row", gap: 12, marginTop: 10 },
    cancelBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        padding: 12,
        gap: 6,
    },
    cancelText: { color: "#64748b", fontWeight: "600", fontSize: 13 },
    submitBtn: {
        flex: 2.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0070ba",
        borderRadius: 8,
        padding: 12,
        gap: 8,
    },
    submitText: { color: "#fff", fontWeight: "700", fontSize: 13 },
    footerNote: {
        flexDirection: "row",
        gap: 10,
        marginTop: 20,
        padding: 12,
        backgroundColor: "#f8fafc",
        borderRadius: 8,
        marginHorizontal: -16,
        marginBottom: -16,
    },
    footerNoteText: { flex: 1, fontSize: 12, color: "#94a3b8", lineHeight: 16 },
});

export default B2BSettingMSHeader;
