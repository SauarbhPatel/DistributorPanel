import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Animated,
    Alert,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import OrderDetailsModal from "./OrderDetailsModal";
import BuyerProfileModal from "./BuyerProfileModal";
import UpdateOrderModal from "./UpdateOrderModal";
import SerialNumberModal from "./SerialNumberModal";
import {
    getOrderList,
    markVerified,
    markUnverified,
    cancelOrder,
    markForProcessing,
    markRTP,
    markToManifesting,
    reprintLabel,
    printInvoice,
    printPackingSlip,
    printManifest,
    printTaxInvoice,
    refundOrder,
} from "../../utils/api/orderApi";
import TablePagination from "../marketing/TablePagination";

// ─── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonBlock = ({ width = "100%", height = 14, radius = 6, style }) => {
    const anim = useRef(new Animated.Value(0.4)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(anim, {
                    toValue: 0.4,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);
    return (
        <Animated.View
            style={[
                {
                    width,
                    height,
                    borderRadius: radius,
                    backgroundColor: "#E2E8F0",
                    opacity: anim,
                },
                style,
            ]}
        />
    );
};

const OrderSkeleton = () => (
    <View style={[styles.card]}>
        <View style={[styles.ribbon, { backgroundColor: "#E2E8F0" }]} />
        <View style={styles.cardContent}>
            <View style={styles.row}>
                <SkeletonBlock width={20} height={20} radius={4} />
                <SkeletonBlock width={64} height={64} radius={12} />
                <View style={{ flex: 1, gap: 8 }}>
                    <SkeletonBlock width="80%" height={14} />
                    <SkeletonBlock width="55%" height={11} />
                </View>
            </View>
            <View style={styles.divider} />
            <SkeletonBlock
                width="40%"
                height={13}
                style={{ marginBottom: 6 }}
            />
            <SkeletonBlock
                width="60%"
                height={11}
                style={{ marginBottom: 4 }}
            />
            <View style={{ flexDirection: "row", gap: 8 }}>
                <SkeletonBlock width={80} height={28} radius={14} />
                <SkeletonBlock width={80} height={28} radius={14} />
                <SkeletonBlock width={60} height={28} radius={4} />
            </View>
            <View style={styles.divider} />
            <SkeletonBlock
                width="40%"
                height={13}
                style={{ marginBottom: 6 }}
            />
            <SkeletonBlock
                width="70%"
                height={11}
                style={{ marginBottom: 4 }}
            />
            <SkeletonBlock width="35%" height={11} />
            <View style={styles.divider} />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                <SkeletonBlock width="45%" height={38} radius={8} />
                <SkeletonBlock width="45%" height={38} radius={8} />
                <SkeletonBlock width="45%" height={38} radius={8} />
                <SkeletonBlock width="45%" height={38} radius={8} />
            </View>
        </View>
    </View>
);

// ─── Map API record → item shape (original logic, adds _raw + serialNumbersRequired) ─
const mapApiOrder = (record) => {
    const product = record.items?.[0];
    const addr = record.shippingAddress;

    const getStatusType = (status, verificationStatus, subStatus) => {
        if (
            status === "DELIVERED" &&
            ![
                "LABELING",
                "PACKING",
                "MANIFESTING",
                "MANIFESTED",
                "CANCELLED",
            ].includes(subStatus)
        )
            return "DELIVERED";
        if (
            [
                "LABELING",
                "PACKING",
                "MANIFESTING",
                "MANIFESTED",
                "CANCELLED",
            ].includes(subStatus)
        )
            return subStatus;
        if (subStatus === "PRINT_MANIFEST") return "PRINT MANIFEST";
        if (verificationStatus === "NEW") return "NEW ORDER";
        if (verificationStatus === "UNVERIFIED") return "UNVERIFIED";
        if (status === "PROCESSING") return "MANIFEST";
        if (verificationStatus === "VERIFIED") return "VERIFIED";
        if (status === "CANCELLED") return "CANCELLED";
        return status;
    };

    const statusType = getStatusType(
        record.status,
        record?.verificationStatus,
        record?.subStatus,
    );

    const deadlineTime = record.slaTracking?.deadlineTime;
    const isBreached = deadlineTime
        ? new Date() > new Date(deadlineTime)
        : false;
    const slaLabel = deadlineTime
        ? isBreached
            ? `Breached · ${new Date(deadlineTime).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}`
            : `Due ${new Date(deadlineTime).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}`
        : "—";

    return {
        id: record.orderNumber, // display ID e.g. "WLK05260023"
        _mongoId: record._id, // MongoDB _id for API calls
        product: product?.productName ?? "—",
        quantity: product?.quantity,
        image: product?.mainImageUrl ?? null,
        sku: product ? product.sku : "—",
        seller: product?.seller?.shopName ?? "—",
        date: new Date(record.createdAt).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }),
        buyer: record.buyerName,
        address: addr
            ? `${addr.addressLine1 ?? ""}, ${addr.city ?? ""}, ${addr.state?.name ?? ""} ${addr.postalCode ?? ""}`
            : "—",
        phone: addr?.phone ?? "—",
        email: addr?.email ?? "—",
        total: `₹${record.grandTotal?.toLocaleString("en-IN") ?? 0}`,
        status: record.verificationStatus ?? record.status,
        statusType,
        payment: record.paymentKind === "COD" ? "COD" : "Prepaid",
        sla: slaLabel,
        isBreached,
        _raw: record, // full record for modals & serial modal
        platform: record?.attribution?.platform,
    };
};

// ─── ActionButton — exact original ────────────────────────────────────────────
const ActionButton = ({
    label,
    color,
    textColor,
    onPress = () => {},
    loading = false,
}) => (
    <TouchableOpacity
        onPress={onPress}
        disabled={loading}
        style={[
            styles.actionBtn,
            {
                backgroundColor: color ? color : textColor + "10",
                opacity: loading ? 0.6 : 1,
            },
        ]}
    >
        <Text style={[styles.actionBtnText, { color: textColor }]}>
            {loading ? "..." : label}
        </Text>
    </TouchableOpacity>
);

// ─── OrderItem ─────────────────────────────────────────────────────────────────
const OrderItem = ({ item, onRefresh }) => {
    const getRibbonColor = () => {
        switch (item.statusType) {
            case "NEW ORDER":
                return "#2D9CDB";
            case "LABELING":
                return "#2D9CDB";
            case "MANIFEST":
                return "#6D28D9";
            case "PACKING":
                return "#6D28D9";
            case "VERIFIED":
                return "#10B981";
            case "MANIFESTING":
                return "#00BBA2";
            case "PRINT MANIFEST":
                return "#00BBA2";
            case "MANIFESTED":
                return "#00BBA2";
            case "DELIVERED":
                return "#00BBA2";
            case "CANCELLED":
                return "#EF4444";
            case "UNVERIFIED":
                return "#EF4444";
            default:
                return "#64748B";
        }
    };

    const [state, setState] = useState({
        isShowDetails: false,
        isShowUpdate: false,
        isShowBuyer: false,
        isShowSerialModal: false,
    });
    const [busy, setBusy] = useState(null);

    const updateState = (data) => setState((s) => ({ ...s, ...data }));
    const { isShowDetails, isShowUpdate, isShowBuyer, isShowSerialModal } =
        state;

    // ── Generic API caller ────────────────────────────────────────────────────
    // apiId  = MongoDB _id for bulk/status endpoints
    // key    = busy key string
    // apiFn  = (id) => Promise
    // confirm= optional string to show confirm alert
    const callApi = (key, apiFn, confirmMsg) => {
        const execute = async () => {
            try {
                setBusy(key);
                // bulk/verificationStatus and bulk/status use _mongoId
                const res = await apiFn(item._mongoId);
                if (res?.success) {
                    onRefresh?.();
                } else {
                    const msg =
                        typeof res?.message === "object"
                            ? res?.message?.message
                            : (res?.message ?? "Something went wrong");
                    Alert.alert("Error", msg);
                }
            } catch (e) {
                Alert.alert("Error", "Request failed. Please try again.");
            } finally {
                setBusy(null);
            }
        };

        if (confirmMsg) {
            Alert.alert("Confirm", confirmMsg, [
                { text: "No", style: "cancel" },
                { text: "Yes", style: "destructive", onPress: execute },
            ]);
        } else {
            execute();
        }
    };

    return (
        <View style={styles.card}>
            <View
                style={[styles.ribbon, { backgroundColor: getRibbonColor() }]}
            >
                <Text style={styles.ribbonText}>{item.statusType}</Text>
            </View>

            {/* ── Modals ── */}
            <OrderDetailsModal
                visible={isShowDetails}
                onClose={() => updateState({ isShowDetails: false })}
            />
            <BuyerProfileModal
                visible={isShowBuyer}
                onClose={() => updateState({ isShowBuyer: false })}
            />
            <UpdateOrderModal
                visible={isShowUpdate}
                onClose={() => updateState({ isShowUpdate: false })}
            />
            {/* Generate Label — serial number input modal */}
            <SerialNumberModal
                visible={isShowSerialModal}
                item={item}
                onClose={() => updateState({ isShowSerialModal: false })}
                onSuccess={() => {
                    updateState({ isShowSerialModal: false });
                    onRefresh?.();
                }}
            />

            <View style={styles.cardContent}>
                {/* ── Row 1: checkbox + image + product info ── */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.checkbox}>
                        <Feather name="square" size={20} color="#CBD5E1" />
                    </TouchableOpacity>

                    <Image
                        source={
                            item.image
                                ? { uri: item.image }
                                : { uri: "https://via.placeholder.com/64" }
                        }
                        style={styles.productImage}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={styles.productName} numberOfLines={2}>
                            {item.product}
                        </Text>
                        <Text style={styles.skuText} numberOfLines={1}>
                            <Text style={{ color: "#000", fontWeight: "700" }}>
                                QTY: {item.quantity}
                            </Text>
                            , {item.sku}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* ── Seller badge + date ── */}
                <View style={styles.sellerBadge}>
                    <Text style={styles.sellerText}>Seller: {item.seller}</Text>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>

                <View style={styles.divider} />

                {/* ── Order ID + SLA badge ── */}
                <View style={{ marginVertical: 8 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={styles.orderId}
                            onPress={() => updateState({ isShowDetails: true })}
                        >
                            {item.id}
                        </Text>
                        <View
                            style={[
                                styles.slaBadge,
                                item.isBreached
                                    ? styles.slaBreached
                                    : styles.slaActive,
                            ]}
                        >
                            <MaterialCommunityIcons
                                name="clock-outline"
                                size={12}
                                color={item.isBreached ? "#EF4444" : "#3B82F6"}
                            />
                            <Text
                                style={[
                                    styles.slaText,
                                    {
                                        color: item.isBreached
                                            ? "#EF4444"
                                            : "#3B82F6",
                                    },
                                ]}
                            >
                                {item.sla}
                            </Text>
                        </View>
                    </View>

                    {/* ── Status pills + payment + total ── */}
                    <View style={{}}>
                        <View style={styles.statusPills}>
                            {item?.platform ? (
                                <View
                                    style={[
                                        styles.statusPill,
                                        { paddingHorizontal: 5 },
                                    ]}
                                >
                                    <MaterialCommunityIcons
                                        name={
                                            item?.platform === "ios"
                                                ? "apple"
                                                : item?.platform
                                        }
                                        size={18}
                                    />
                                </View>
                            ) : null}
                            <View style={styles.statusPill}>
                                <View
                                    style={[
                                        styles.dot,
                                        { backgroundColor: getRibbonColor() },
                                    ]}
                                />
                                <Text style={styles.pillText}>
                                    {item.statusType}
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.statusPill,
                                    {
                                        backgroundColor:
                                            item.payment === "COD"
                                                ? "#FEF3C7"
                                                : "#DCFCE7",
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.dot,
                                        {
                                            backgroundColor:
                                                item.payment === "COD"
                                                    ? "#F59E0B"
                                                    : "#10B981",
                                        },
                                    ]}
                                />
                                <Text
                                    style={[
                                        styles.pillText,
                                        {
                                            color:
                                                item.payment === "COD"
                                                    ? "#B45309"
                                                    : "#059669",
                                        },
                                    ]}
                                >
                                    {item.payment}
                                </Text>
                            </View>
                            <Text style={styles.totalAmount}>{item.total}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* ── Buyer info ── */}
                <View style={styles.buyerInfo}>
                    <Text
                        style={styles.buyerName}
                        onPress={() => updateState({ isShowBuyer: true })}
                    >
                        {item.buyer}
                    </Text>
                    <Text style={styles.buyerAddress}>{item.address}</Text>
                    <Text style={styles.buyerPhone}>{item.email}</Text>
                    <Text style={styles.buyerPhone}>{item.phone}</Text>
                </View>

                <View style={styles.divider} />

                {/* ── Action buttons — exact original conditions + real API ── */}
                <View style={styles.actionGrid}>
                    {/* Mark Verified → PATCH /order/bulk/verificationStatus {verificationStatus:"VERIFIED"} */}
                    {["NEW ORDER", "UNVERIFIED"].includes(item.statusType) && (
                        <ActionButton
                            label="Mark Verified"
                            color="#F0FDF4"
                            textColor="#16A34A"
                            loading={busy === "verify"}
                            onPress={() => callApi("verify", markVerified)}
                        />
                    )}

                    {/* Mark RTP → POST /orders/bulk/status {status:"READY_TO_PICKUP",subStatus:"READY_TO_PICKUP"} */}
                    {["MANIFESTING"].includes(item.statusType) && (
                        <ActionButton
                            label="Mark RTP"
                            textColor="#6D28D9"
                            loading={busy === "rtp"}
                            onPress={() => callApi("rtp", markRTP)}
                        />
                    )}

                    {/* Mark For Processing → POST /orders/bulk/status {status:"PROCESSING",subStatus:"LABELING"} */}
                    {["VERIFIED"].includes(item.statusType) && (
                        <ActionButton
                            label="Mark For Processing"
                            textColor="#6D28D9"
                            loading={busy === "process"}
                            onPress={() =>
                                callApi("process", markForProcessing)
                            }
                        />
                    )}

                    {/* Mark to Manifesting → POST /orders/bulk/status {status:"READY_TO_PICKUP",subStatus:"MANIFESTING"} */}
                    {["PACKING"].includes(item.statusType) && (
                        <ActionButton
                            label="Mark to Manifesting"
                            textColor="#6D28D9"
                            loading={busy === "manifesting"}
                            onPress={() =>
                                callApi("manifesting", markToManifesting)
                            }
                        />
                    )}

                    {/* Print Manifest → GET /order/:id/manifest */}
                    {["PRINT MANIFEST", "MANIFESTED"].includes(
                        item.statusType,
                    ) && (
                        <ActionButton
                            label="Print Manifest"
                            textColor="#6D28D9"
                            loading={busy === "manifest"}
                            onPress={() => callApi("manifest", printManifest)}
                        />
                    )}

                    {/* Re-Print Label → GET /order/:id/reprint-label */}
                    {[
                        "PACKING",
                        "MANIFESTING",
                        "PRINT MANIFEST",
                        "MANIFESTED",
                    ].includes(item.statusType) && (
                        <ActionButton
                            label="Re-Print Label"
                            textColor="#2563EB"
                            loading={busy === "reprintLabel"}
                            onPress={() =>
                                callApi("reprintLabel", reprintLabel)
                            }
                        />
                    )}

                    {/* Print Tax Invoice → GET /order/:id/tax-invoice */}
                    {["DELIVERED"].includes(item.statusType) && (
                        <ActionButton
                            label="Print Tax Invoice"
                            textColor="#2563EB"
                            loading={busy === "taxInvoice"}
                            onPress={() =>
                                callApi("taxInvoice", printTaxInvoice)
                            }
                        />
                    )}

                    {/* Print Invoice → GET /order/:id/invoice */}
                    {["PACKING", "MANIFESTING"].includes(item.statusType) && (
                        <ActionButton
                            label="Print Invoice"
                            textColor="#2563EB"
                            loading={busy === "invoice"}
                            onPress={() => callApi("invoice", printInvoice)}
                        />
                    )}

                    {/* Print Packing Slip → GET /order/:id/packing-slip */}
                    {["PACKING", "MANIFESTING"].includes(item.statusType) && (
                        <ActionButton
                            label="Print Packing Slip"
                            textColor="#3c3c3c"
                            loading={busy === "packingSlip"}
                            onPress={() =>
                                callApi("packingSlip", printPackingSlip)
                            }
                        />
                    )}

                    {/* Generate Label → opens SerialNumberModal → POST /order/productSerialNumber */}
                    {["LABELING"].includes(item.statusType) && (
                        <ActionButton
                            label="Generate Label"
                            textColor="#2563EB"
                            onPress={() =>
                                updateState({ isShowSerialModal: true })
                            }
                        />
                    )}

                    {/* Refund Order */}
                    {["CANCELLED", "DELIVERED"].includes(item.statusType) && (
                        <ActionButton
                            label="Refund Order"
                            color="#FEF2F2"
                            textColor="#DC2626"
                            loading={busy === "refund"}
                            onPress={() =>
                                callApi(
                                    "refund",
                                    refundOrder,
                                    "Initiate a refund for this order?",
                                )
                            }
                        />
                    )}

                    {/* Update Details → opens UpdateOrderModal */}
                    {[
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
                    ].includes(item.statusType) && (
                        <ActionButton
                            label="Update Details"
                            color="#EFF6FF"
                            textColor="#2563EB"
                            onPress={() => updateState({ isShowUpdate: true })}
                        />
                    )}

                    {/* Mark Unverified → PATCH /order/bulk/verificationStatus {verificationStatus:"UNVERIFIED"} */}
                    {["NEW ORDER", "VERIFIED"].includes(item.statusType) && (
                        <ActionButton
                            label="Mark Unverified"
                            color="#FEF2F2"
                            textColor="#DC2626"
                            loading={busy === "unverify"}
                            onPress={() =>
                                callApi(
                                    "unverify",
                                    markUnverified,
                                    "Mark this order as unverified?",
                                )
                            }
                        />
                    )}

                    {/* Cancel Order → POST /orders/bulk/status {status:"CANCELLED",subStatus:"CANCELLED"} */}
                    {[
                        "NEW ORDER",
                        "UNVERIFIED",
                        "VERIFIED",
                        "LABELING",
                        "PACKING",
                        "MANIFESTING",
                    ].includes(item.statusType) && (
                        <ActionButton
                            label="Cancel Order"
                            color="#FFF1F2"
                            textColor="#E11D48"
                            loading={busy === "cancel"}
                            onPress={() =>
                                callApi(
                                    "cancel",
                                    cancelOrder,
                                    "Cancel this order? This cannot be undone.",
                                )
                            }
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

// ─── B2BOrderListing ───────────────────────────────────────────────────────────
const B2BOrderListing = ({
    selectedStatus = null,
    selectedVerification = null,
    filters = {},
}) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 1,
    });

    const fetchOrders = useCallback(
        async (page = 1) => {
            try {
                setLoading(true);
                const params = {
                    page,
                    limit: 20,
                    ...(selectedStatus &&
                        selectedVerification != "OUT_FOR_DELIVERY" && {
                            status: selectedStatus,
                        }),
                    ...(selectedVerification == "OUT_FOR_DELIVERY" && {
                        status: selectedVerification,
                    }),
                    ...(!selectedStatus &&
                        ["PAYMENT_FAILED"]?.includes(selectedVerification) && {
                            status: selectedVerification,
                        }),
                    ...(selectedVerification &&
                        ["PENDING"]?.includes(selectedStatus) && {
                            verificationStatus: selectedVerification,
                        }),
                    ...(!selectedStatus &&
                        ["UNVERIFIED", "VERIFIED"]?.includes(
                            selectedVerification,
                        ) && {
                            verificationStatus: selectedVerification,
                        }),
                    ...(selectedVerification &&
                        [
                            "PROCESSING",
                            "READY_TO_PICKUP",
                            "IN_TRANSIT",
                        ]?.includes(selectedStatus) &&
                        selectedVerification != "OUT_FOR_DELIVERY" && {
                            subStatus: selectedVerification,
                        }),
                    ...(filters.search && { search: filters.search }),
                    ...(filters.fromDate && { fromDate: filters.fromDate }),
                    ...(filters.toDate && { toDate: filters.toDate }),
                    ...(filters.categoryId && {
                        categoryId: filters.categoryId,
                    }),
                    ...(filters.utmSource && { utmSource: filters.utmSource }),
                    ...(filters.platform && { platform: filters.platform }),
                };
                const res = await getOrderList(params);
                if (res?.success) {
                    setList((res.data?.records || []).map(mapApiOrder));
                    setPagination((p) => ({ ...p, ...res.data?.pagination }));
                }
            } catch (e) {
                console.error("B2BOrderListing:", e);
            } finally {
                setLoading(false);
            }
        },
        [selectedStatus, selectedVerification, JSON.stringify(filters)],
    );

    useEffect(() => {
        fetchOrders(1);
    }, [fetchOrders]);

    if (loading) {
        return (
            <View style={[styles.mainContainer, { padding: 10, marginTop: 5 }]}>
                {[1, 2, 3].map((i) => (
                    <OrderSkeleton key={i} />
                ))}
            </View>
        );
    }

    if (!list.length) {
        return (
            <View
                style={[
                    styles.mainContainer,
                    { alignItems: "center", paddingVertical: 48 },
                ]}
            >
                <MaterialCommunityIcons
                    name="shopping-outline"
                    size={44}
                    color="#CBD5E1"
                />
                <Text
                    style={{
                        color: "#94A3B8",
                        marginTop: 10,
                        fontWeight: "600",
                    }}
                >
                    No orders found
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <OrderItem
                        item={item}
                        onRefresh={() => fetchOrders(pagination.page)}
                    />
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
            />
            {/* {pagination.totalPages > 1 && ( */}
            <View style={{ paddingHorizontal: 10 }}>
                <TablePagination
                    pagination={pagination}
                    onPageChange={(page) => fetchOrders(page)}
                />
            </View>
            {/* )} */}
        </View>
    );
};

// ─── Styles — original, not a single character changed ────────────────────────
const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: "#F8FAFC" },
    listContainer: { padding: 10, marginTop: 5 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 16,
        flexDirection: "row",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    ribbon: { width: 20, justifyContent: "center", alignItems: "center" },
    ribbonText: {
        color: "#fff",
        fontSize: 8,
        fontWeight: "900",
        transform: [{ rotate: "-90deg" }],
        width: 200,
        textAlign: "center",
        letterSpacing: 0.5,
    },
    cardContent: { flex: 1, padding: 16 },
    row: { flexDirection: "row", gap: 12 },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginVertical: 8,
    },
    checkbox: { marginTop: 4 },
    productImage: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: "#F3F4F6",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginRight: 4,
    },
    productName: { fontSize: 16, fontWeight: "700", color: "#111827" },
    skuText: { fontSize: 12, color: "#64748B", marginTop: 2 },
    sellerBadge: {
        backgroundColor: "#EFF6FF",
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 4,
    },
    sellerText: { fontSize: 11, color: "#2563EB", fontWeight: "600" },
    dateText: { fontSize: 11, color: "#94A3B8", marginTop: 4 },
    divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 12 },
    orderId: {
        fontSize: 13,
        fontWeight: "700",
        color: "#1E40AF",
        textDecorationLine: "underline",
    },
    slaBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    slaActive: { backgroundColor: "#EFF6FF" },
    slaBreached: { backgroundColor: "#FEF2F2" },
    slaText: { fontSize: 11, fontWeight: "700" },
    totalAmount: {
        fontSize: 19,
        fontWeight: "800",
        color: "#111827",
        textAlign: "right",
        letterSpacing: -0.5,
        marginStart: "auto",
    },
    statusPills: {
        flexDirection: "row",
        gap: 6,
        marginTop: 6,
        marginTop: 10,
        flexWrap: "wrap",
    },
    statusPill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    dot: { width: 7, height: 7, borderRadius: 3.5 },
    pillText: { fontSize: 11, fontWeight: "700", color: "#4B5563" },
    buyerInfo: { paddingRight: 10 },
    buyerName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2563EB",
        marginBottom: 2,
        textDecorationLine: "underline",
    },
    buyerAddress: { fontSize: 12, color: "#64748B", lineHeight: 18 },
    buyerPhone: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
        fontWeight: "500",
    },
    actionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    actionScroll: { marginTop: 10, gap: 10, flexDirection: "row" },
    actionBtn: {
        flex: 1,
        minWidth: "45%",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#E5E7EB",
    },
    actionBtnText: { fontSize: 12, fontWeight: "700" },
    alignEnd: { alignItems: "flex-end" },
});

export default B2BOrderListing;
