import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/styles";

const SubmitBox = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
                style={{
                    ...styles.button,
                    backgroundColor: Colors.primaryColor,
                }}
            >
                <Feather name="send" size={16} color="#ffffff" />
                <Text style={styles.btnText}>Submit for Approval</Text>
            </TouchableOpacity>

            {/* <Text style={styles.helper}>Fix 1 error to enable submission</Text> */}

            {/* <Text style={styles.time}>Last saved 10:45:19</Text> */}
        </View>
    );
};

export default SubmitBox;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        padding: 14,
        marginVertical: 10,
        alignItems: "center",
    },

    button: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#f3f4f6",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
    },

    btnText: {
        color: "#ffffff",
        fontWeight: "600",
    },

    helper: {
        color: "#ef4444",
        fontSize: 11,
        marginTop: 6,
    },

    time: {
        fontSize: 10,
        color: "#9ca3af",
        marginTop: 2,
    },
});
