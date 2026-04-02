import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { __postApiData } from "../../utils/api";

const Final = ({ state }) => {
    const [checks, setChecks] = useState(
        state?.parentCategory?.id
            ? [
                  {
                      label: "Basic Info configured (name & code)",
                      status: true,
                  },
                  { label: "Attribute set assigned", status: true },
                  { label: "Variation rules configured", status: true },
                  { label: "Compliance rules defined", status: true },

                  { label: "Commission configured", status: true },
                  { label: "Shipping template selected", status: true },
                  { label: "Media (image & icon) uploaded", status: true },
                  { label: "SEO configured (meta title)", status: true },
              ]
            : [
                  {
                      label: "Basic Info configured (name & code)",
                      status: true,
                  },
                  { label: "Attribute set assigned", status: true },
                  { label: "Variation rules configured", status: true },

                  { label: "Compliance rules defined", status: true },
                  {
                      label: "Tax rules mapped (HSN Set selected)",
                      status: true,
                  },
                  { label: "Commission configured", status: true },
                  { label: "Shipping template selected", status: true },
                  { label: "Media (image & icon) uploaded", status: true },
                  { label: "SEO configured (meta title)", status: true },
              ],
    );

    const passed = checks.filter((c) => c.status).length;

    const __handleSave = () => {
        const payload = {
            // name: categoryName,
            // code: code,
            // slug: slug,
            // ...(parentId && { parentId: parentId }),
            // status: statusId?.id,
            // displayOrder: Number(displayOrder),
            // isActive: isActive,
            // visibleForConsumer: visibleForConsumer,
            // //
            // attributeSetIds: attributeSetId?.map((ite) => ite.id),
            // variantAttributes: variantAttributes.map((ids) => {
            //     const cloneData = ids;
            //     delete cloneData?._id;
            //     delete cloneData?.isMandatory;
            //     return {
            //         ...cloneData,
            //     };
            // }),
            // //
            // complianceDocuments: complianceDocuments.map((ids) => ({
            //     complianceId: ids?.id,
            //     documentName: ids?.name,
            // })),
            // hsnSetIds: hsnsetId?.map((ite) => ite.id),
            // commissionPercentage: Number(commissionPercentage),
            // closingFees: Number(closingFees),
            // sellerTierOverrides: sellerTierOverrides?.map((ids) => ({
            //     sellerTier: ids?.sellerTier,
            //     commissionPercentage: Number(ids?.commissionPercentage),
            // })),
            // shippingZoneIds: shippingRuleId?.map((item) => item?.id),
            // metaTitle: metaTitle,
            // metaDescription: metaDescription,
            // canonicalUrl: canonicalUrl?.trim(),
            // priorityScore: Number(priorityScore),
        };
        console.log(JSON.stringify(payload));
        updateState({ loading: true });

        __postApiData("/categories/createCategory", payload)
            .then((res) => {
                console.log(JSON.stringify(res));
                if (res?.success) {
                    // setError(res.message);
                    Alert.alert("", res.message);
                    // onClose();
                } else {
                    Alert.alert("", res.message);
                }
                updateState({ loading: false });
            })
            .catch((error) => {
                Alert.alert("", "Failed");
                updateState({ loading: false });
            });
    };

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Review & Publish</Text>
                    <Text style={styles.subtitle}>
                        Validate all configurations before publishing.
                    </Text>
                </View>

                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>PENDING</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.card}>
                    <View style={styles.progressRow}>
                        <Text style={styles.progressText}>Setup progress</Text>
                        <Text style={styles.progressCount}>
                            {passed} / {checks.length} checks passed
                        </Text>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${(passed / checks.length) * 100}%`,
                                },
                            ]}
                        />
                    </View>

                    {/* CHECK LIST */}
                    {checks.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.checkItem,
                                item.status ? styles.success : styles.error,
                            ]}
                        >
                            <View style={styles.checkLeft}>
                                <View
                                    style={[
                                        styles.iconCircle,
                                        item.status
                                            ? styles.iconSuccess
                                            : styles.iconError,
                                    ]}
                                >
                                    {item.status ? (
                                        <Feather
                                            name="check"
                                            size={14}
                                            color="#16a34a"
                                        />
                                    ) : (
                                        <AntDesign
                                            name="close"
                                            size={12}
                                            color="#ef4444"
                                        />
                                    )}
                                </View>

                                <Text style={styles.checkText}>
                                    {item.label}
                                </Text>
                            </View>

                            {!item.status && (
                                <TouchableOpacity style={styles.editBtn}>
                                    <Text style={styles.editText}>Edit</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Category Summary</Text>

                    {[
                        ["Category", state?.categoryName],
                        ["Code", state?.categoryCode],
                        ["Slug", state?.slug],
                        ["Attributes", state?.selectedSets.length],
                        ["Variant attrs", state?.variantAttributes.length],
                        ["Compliance docs", state?.selectedDocs.length],
                        // ["Tax", "Electronics HSN"],
                        ["Commission", "0%"],
                        ["Shipping", state?.shippingZoneIds.length],
                    ].map(([key, value], i) => (
                        <View key={i} style={styles.summaryRow}>
                            <Text style={styles.summaryKey}>{key}</Text>
                            <Text style={styles.summaryValue}>{value}</Text>
                        </View>
                    ))}
                </View>

                {/* PUBLISH CARD */}
                <View style={styles.card}>
                    <View style={styles.publishIcon}>
                        <Feather name="arrow-up" size={18} color="#ffffff" />
                    </View>

                    <Text style={styles.publishTitle}>Ready to publish?</Text>

                    <Text style={styles.publishText}>
                        Once published, this category will be visible to sellers
                        and customers across your marketplace.
                    </Text>

                    <View style={styles.warningBox}>
                        <Text style={styles.warningText}>
                            All checks passed! Your category is ready to be
                            submitted for approval.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.draftBtn}>
                        <Text style={styles.draftText}>Save as Draft</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.publishBtn,
                            passed !== checks.length && {
                                opacity: 0.5,
                            },
                        ]}
                        disabled={passed !== checks.length}
                    >
                        <Text style={styles.publishBtnText}>
                            Publish Category
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Final;

/* 🔹 Styles */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
    },

    header: {
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
        paddingHorizontal: 0,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },

    subtitle: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 4,
    },

    statusBadge: {
        backgroundColor: "#fef3c7",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    statusText: {
        fontSize: 11,
        color: "#92400e",
        fontWeight: "700",
    },

    content: {
        gap: 10,
        // padding: 10,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },

    progressRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    progressText: {
        fontSize: 13,
        fontWeight: "600",
    },

    progressCount: {
        fontSize: 12,
        color: "#6b7280",
    },

    progressBar: {
        height: 6,
        backgroundColor: "#e5e7eb",
        borderRadius: 10,
        marginVertical: 10,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        backgroundColor: "#22c55e",
    },

    checkItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        marginBottom: 8,
    },

    success: {
        backgroundColor: "#ecfdf5",
    },

    error: {
        backgroundColor: "#fef2f2",
    },

    checkLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flex: 1,
    },

    iconCircle: {
        width: 24,
        height: 24,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    iconSuccess: {
        backgroundColor: "#dcfce7",
    },

    iconError: {
        backgroundColor: "#fee2e2",
    },

    checkText: {
        fontSize: 12,
        color: "#374151",
        flex: 1,
    },

    editBtn: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#d1d5db",
    },

    editText: {
        fontSize: 11,
        color: "#374151",
    },

    side: {
        flex: 1,
    },

    cardTitle: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 10,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },

    summaryKey: {
        fontSize: 12,
        color: "#6b7280",
    },

    summaryValue: {
        fontSize: 12,
        fontWeight: "600",
        color: "#111827",
    },

    publishIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#2D9E6B",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },

    publishTitle: {
        fontSize: 14,
        fontWeight: "700",
    },

    publishText: {
        fontSize: 12,
        color: "#6b7280",
        marginVertical: 8,
    },

    warningBox: {
        // backgroundColor: "#fef3c7",
        backgroundColor: "#dcfce7",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },

    warningText: {
        fontSize: 11,
        color: "#2D9E6B",
    },

    draftBtn: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d1d5db",
        alignItems: "center",
        marginBottom: 8,
    },

    draftText: {
        fontSize: 12,
        color: "#374151",
    },

    publishBtn: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: Colors.primaryColor,
        alignItems: "center",
    },

    publishBtnText: {
        color: "#fff",
        fontWeight: "600",
    },
});
