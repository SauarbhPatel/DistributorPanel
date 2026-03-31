import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DeleteAlert = ({
    visible,
    onCancel,
    onDelete,
    title,
    subTitle,
    isLoading,
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.alertContainer}>
                            <View style={styles.iconCircle}>
                                <MaterialCommunityIcons
                                    name="trash-can-outline"
                                    size={28}
                                    color="#EF4444"
                                />
                            </View>

                            <Text style={styles.title}>
                                {title || "Delete Item?"}
                            </Text>
                            <Text style={styles.subTitle}>
                                {subTitle ||
                                    "This action cannot be undone. Are you sure you want to permanently remove this?"}
                            </Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={onCancel}
                                    activeOpacity={0.7}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.cancelText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, styles.deleteButton]}
                                    onPress={onDelete}
                                    activeOpacity={0.7}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color={"#fff"} />
                                    ) : (
                                        <Text style={styles.deleteText}>
                                            Delete
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        padding: 24,
    },
    alertContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FEF2F2",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#1E293B",
        marginBottom: 8,
        textAlign: "center",
    },
    subTitle: {
        fontSize: 14,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    button: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#F1F5F9",
    },
    deleteButton: {
        backgroundColor: "#EF4444",
    },
    cancelText: {
        color: "#475569",
        fontWeight: "700",
        fontSize: 14,
    },
    deleteText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 14,
    },
});

export default DeleteAlert;
