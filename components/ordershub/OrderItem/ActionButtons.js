import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import {
    verifyOrder,
    markUnverifiedOrder,
    cancelOrder,
    processOrder,
    readyToShipOrder,
    generateLabel,
    printInvoice,
    printPackingSlip,
    printManifest,
    refundOrder,
} from "../../../utils/api/orderApi";

// ─── Presentational button ────────────────────────────────────────────────────
const Btn = ({ label, color, textColor, onPress, loading }) => (
    <TouchableOpacity
        onPress={onPress}
        disabled={loading}
        style={[
            styles.btn,
            {
                backgroundColor:
                    color ?? (textColor ? textColor + "10" : "#F8FAFC"),
                opacity: loading ? 0.6 : 1,
            },
        ]}
    >
        <Text style={[styles.btnText, { color: textColor ?? "#374151" }]}>
            {loading ? "..." : label}
        </Text>
    </TouchableOpacity>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const ActionButtons = ({ item, onRefresh }) => {
    const [busy, setBusy] = useState(null); // tracks which action is loading

    const call = async (key, apiFn, confirmMsg) => {
        if (confirmMsg) {
            Alert.alert("Confirm", confirmMsg, [
                { text: "No", style: "cancel" },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => _exec(key, apiFn),
                },
            ]);
        } else {
            _exec(key, apiFn);
        }
    };

    const _exec = async (key, apiFn) => {
        try {
            setBusy(key);
            const res = await apiFn(item.id);
            if (res?.success) {
                onRefresh?.();
            } else {
                Alert.alert("Error", res?.message ?? "Something went wrong");
            }
        } catch (e) {
            Alert.alert("Error", "Request failed");
        } finally {
            setBusy(null);
        }
    };

    const s = item.statusType;

    const VERIFY_STATUSES = ["NEW ORDER", "UNVERIFIED"];
    const UNVERIFY_STATUSES = ["NEW ORDER", "VERIFIED"];
    const CANCEL_STATUSES = [
        "NEW ORDER",
        "UNVERIFIED",
        "VERIFIED",
        "LABELING",
        "PACKING",
        "MANIFESTING",
    ];
    const UPDATE_STATUSES = [
        "NEW ORDER",
        "UNVERIFIED",
        "VERIFIED",
        "LABELING",
        "PACKING",
        "MANIFESTING",
        "PRINT MANIFEST",
        "MANIFESTED",
        "CANCELLED",
        "DELIVERED",
    ];

    return (
        <View style={styles.grid}>
            {/* Verify */}
            {VERIFY_STATUSES.includes(s) && (
                <Btn
                    label="Verify Order"
                    textColor="#10B981"
                    loading={busy === "verify"}
                    onPress={() => call("verify", verifyOrder)}
                />
            )}

            {/* Process */}
            {s === "VERIFIED" && (
                <Btn
                    label="Process Order"
                    textColor="#2563EB"
                    loading={busy === "process"}
                    onPress={() => call("process", processOrder)}
                />
            )}

            {/* Ready to Ship */}
            {s === "PROCESSING" && (
                <Btn
                    label="Ready to Ship"
                    textColor="#7C3AED"
                    loading={busy === "rts"}
                    onPress={() => call("rts", readyToShipOrder)}
                />
            )}

            {/* Generate Label */}
            {s === "LABELING" && (
                <Btn
                    label="Generate Label"
                    textColor="#2563EB"
                    loading={busy === "label"}
                    onPress={() => call("label", generateLabel)}
                />
            )}

            {/* Print Invoice */}
            {["PACKING", "MANIFESTING"].includes(s) && (
                <Btn
                    label="Print Invoice"
                    textColor="#2563EB"
                    loading={busy === "invoice"}
                    onPress={() => call("invoice", printInvoice)}
                />
            )}

            {/* Print Packing Slip */}
            {["PACKING", "MANIFESTING"].includes(s) && (
                <Btn
                    label="Print Packing Slip"
                    textColor="#3c3c3c"
                    loading={busy === "slip"}
                    onPress={() => call("slip", printPackingSlip)}
                />
            )}

            {/* Print Manifest */}
            {["PRINT MANIFEST", "MANIFESTING"].includes(s) && (
                <Btn
                    label="Print Manifest"
                    textColor="#6D28D9"
                    loading={busy === "manifest"}
                    onPress={() => call("manifest", printManifest)}
                />
            )}

            {/* Refund */}
            {["CANCELLED", "DELIVERED"].includes(s) && (
                <Btn
                    label="Refund Order"
                    color="#FEF2F2"
                    textColor="#DC2626"
                    loading={busy === "refund"}
                    onPress={() =>
                        call(
                            "refund",
                            refundOrder,
                            "Initiate refund for this order?",
                        )
                    }
                />
            )}

            {/* Mark Unverified */}
            {UNVERIFY_STATUSES.includes(s) && (
                <Btn
                    label="Mark Unverified"
                    color="#FEF2F2"
                    textColor="#DC2626"
                    loading={busy === "unverify"}
                    onPress={() =>
                        call(
                            "unverify",
                            markUnverifiedOrder,
                            "Mark this order as unverified?",
                        )
                    }
                />
            )}

            {/* Cancel */}
            {CANCEL_STATUSES.includes(s) && (
                <Btn
                    label="Cancel Order"
                    color="#FFF1F2"
                    textColor="#E11D48"
                    loading={busy === "cancel"}
                    onPress={() =>
                        call(
                            "cancel",
                            cancelOrder,
                            "Cancel this order? This cannot be undone.",
                        )
                    }
                />
            )}

            {/* Update Details — opens modal, passed via prop */}
            {UPDATE_STATUSES.includes(s) && (
                <Btn
                    label="Update Details"
                    color="#EFF6FF"
                    textColor="#2563EB"
                    onPress={() => item.onUpdate?.()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    btn: {
        flex: 1,
        minWidth: "45%",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#E5E7EB",
    },
    btnText: { fontSize: 12, fontWeight: "700" },
});

export default ActionButtons;
