import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const checklist = [
    { title: "Category & Brand", status: "done" },
    { title: "Basic Info & Pricing", status: "done" },
    { title: "Description", status: "done" },
    { title: "Media Upload", status: "done" },
    {
        title: "Tax & Compliance",
        status: "done",
        // status: "error", msg: "HSN Code is required"
    },
    { title: "Package & Mfg", status: "done" },
];

const CompletionChecklist = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Completion Checklist</Text>

            {checklist.map((item, index) => (
                <TouchableOpacity key={index} style={styles.row}>
                    {/* Icon */}
                    <View
                        style={[
                            styles.iconBox,
                            {
                                backgroundColor:
                                    item.status === "done"
                                        ? "#22c55e20"
                                        : "#ef444420",
                            },
                        ]}
                    >
                        <Feather
                            name={item.status === "done" ? "check" : "x"}
                            size={14}
                            color={
                                item.status === "done" ? "#22c55e" : "#ef4444"
                            }
                        />
                    </View>

                    {/* Text */}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>{item.title}</Text>

                        {item.msg && (
                            <Text style={styles.errorText}>{item.msg}</Text>
                        )}
                    </View>

                    {/* Arrow */}
                    <Feather name="chevron-right" size={18} color="#9ca3af" />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default CompletionChecklist;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        overflow: "hidden",
        marginVertical: 10,
    },

    title: {
        fontSize: 14,
        fontWeight: "700",
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        color: "#374151",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
        gap: 10,
    },

    iconBox: {
        width: 22,
        height: 22,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    green: {
        backgroundColor: "#22c55e",
    },

    red: {
        backgroundColor: "#ef4444",
    },

    label: {
        fontSize: 13,
        fontWeight: "500",
        color: "#111827",
    },

    errorText: {
        fontSize: 11,
        color: "#ef4444",
        marginTop: 2,
    },
});
