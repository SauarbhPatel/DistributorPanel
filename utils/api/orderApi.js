import { __getApiData, __postApiData, __patchApiData } from ".";

// ─── Query builder ─────────────────────────────────────────────────────────────
export const buildQuery = (params = {}) =>
    Object.entries(params)
        .filter(([, v]) => v !== null && v !== undefined && v !== "")
        .map(([k, v]) =>
            Array.isArray(v)
                ? v.map((i) => `${k}=${encodeURIComponent(i)}`).join("&")
                : `${k}=${encodeURIComponent(v)}`,
        )
        .join("&");

// ─── List & counts ─────────────────────────────────────────────────────────────
export const getOrderStatusCounts = () =>
    __getApiData(`/order/counts/status-substatus`);

export const getCategoryTreeDropdown = () =>
    __getApiData(`/categories/getCategoryTreeDropdown`);

export const getOrderList = (params = {}) =>
    __getApiData(`/order/list?${buildQuery(params)}`);

// ─── Verification (PATCH /order/bulk/verificationStatus) ──────────────────────
export const markVerified = (orderId) =>
    __patchApiData(`/order/bulk/verificationStatus`, {
        orderIds: [orderId],
        verificationStatus: "VERIFIED",
    });

export const markUnverified = (orderId) =>
    __patchApiData(`/order/bulk/verificationStatus`, {
        orderIds: [orderId],
        verificationStatus: "UNVERIFIED",
    });

// ─── Status transitions (POST /orders/bulk/status) ────────────────────────────
const bulkStatus = (orderId, status, subStatus, note = "By admin") =>
    __postApiData(`/orders/bulk/status`, {
        orderIds: [orderId],
        status,
        subStatus,
        note,
        source: "SYSTEM",
    });

export const cancelOrder = (orderId) =>
    bulkStatus(orderId, "CANCELLED", "CANCELLED");
export const markForProcessing = (orderId) =>
    bulkStatus(orderId, "PROCESSING", "LABELING");
export const markRTP = (orderId) =>
    bulkStatus(orderId, "READY_TO_PICKUP", "READY_TO_PICKUP");
export const markToManifesting = (orderId) =>
    bulkStatus(orderId, "READY_TO_PICKUP", "MANIFESTING");

// ─── Generate Label (POST /order/productSerialNumber) ─────────────────────────
// orderId here is the MongoDB _id from _raw record (not orderNumber)
export const submitSerialNumbers = (orderId, productSerialNumber) =>
    __postApiData(`/order/productSerialNumber`, {
        orderId,
        productSerialNumber,
    });

// ─── Print / document actions (GET endpoints — open in browser / share) ────────
export const reprintLabel = (orderId) =>
    __getApiData(`/order/${orderId}/reprint-label`);
export const printInvoice = (orderId) =>
    __getApiData(`/order/${orderId}/invoice`);
export const printPackingSlip = (orderId) =>
    __getApiData(`/order/${orderId}/packing-slip`);
export const printManifest = (orderId) =>
    __getApiData(`/order/${orderId}/manifest`);
export const printTaxInvoice = (orderId) =>
    __getApiData(`/order/${orderId}/tax-invoice`);

// ─── Refund ────────────────────────────────────────────────────────────────────
export const refundOrder = (orderId) =>
    __postApiData(`/order/${orderId}/refund`);

// ─── Update ────────────────────────────────────────────────────────────────────
export const updateOrderDetails = (id, data) =>
    __patchApiData(`/order/${id}`, data);
