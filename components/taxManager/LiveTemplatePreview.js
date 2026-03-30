import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const LiveTemplatePreview = ({ data, onClose }) => {
    // Default sample data if no props are provided
    const invoice = {
        number: "INV-2025-001234",
        date: "Feb 19, 2026",
        from: {
            name: "RadioWorld India",
            address: "123, MG Road, Mumbai 400001",
            gstin: "27AABCU9603R1ZM",
            state: "Maharashtra",
        },
        to: {
            name: "ABC Electronics Pvt Ltd",
            address: "456, Nehru Place, Delhi 110019",
            gstin: "07AABCU9603R1Z5",
            state: "Delhi",
        },
        reverseChargeNote: true,
        items: [
            {
                id: 1,
                name: "Baofeng UV-5R Two Way Radio",
                hsn: "8517",
                qty: 2,
                rate: 1200,
                tax: 18,
            },
            {
                id: 2,
                name: "Antenna & Accessory",
                hsn: "8517",
                qty: 1,
                rate: 450,
                tax: 18,
            },
        ],
    };

    const calculateSubtotal = () =>
        invoice.items.reduce((acc, item) => acc + item.qty * item.rate, 0);
    const subtotal = calculateSubtotal();
    const totalTax = subtotal * 0.18; // Simplified for preview
    const grandTotal = subtotal + totalTax;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Live Preview</Text>
                    <Text style={styles.headerSubtitle}>
                        Sample data — your changes appear instantly
                    </Text>
                </View>
                <TouchableOpacity style={styles.printBtn}>
                    <Feather name="printer" size={16} color="#64748b" />
                    <Text style={styles.printText}>Print</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.previewScroll}>
                <View style={styles.invoiceCard}>
                    {/* Blue Banner Header */}
                    <LinearGradient
                        colors={["#0070ba", "#005a96"]}
                        style={styles.banner}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.bannerText}>
                            {data?.headerText || "TAX INVOICE"}
                        </Text>
                    </LinearGradient>

                    <View style={styles.invoiceBody}>
                        {/* Top Info */}
                        <View style={styles.metaRow}>
                            <View>
                                <Text style={styles.metaLabel}>Invoice No</Text>
                                <Text style={styles.metaValue}>
                                    {invoice.number}
                                </Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }}>
                                <Text style={styles.metaLabel}>Date</Text>
                                <Text style={styles.metaValue}>
                                    {invoice.date}
                                </Text>
                            </View>
                        </View>

                        {/* Address Section */}
                        <View style={styles.addressRow}>
                            <View style={styles.addressBox}>
                                <Text style={styles.addressType}>From</Text>
                                <Text style={styles.companyName}>
                                    {invoice.from.name}
                                </Text>
                                <Text style={styles.addressText}>
                                    {invoice.from.address}
                                </Text>
                                {data?.showGSTIN && (
                                    <Text style={styles.gstText}>
                                        GSTIN:{" "}
                                        <Text style={{ color: "#64748b" }}>
                                            {invoice.from.gstin}
                                        </Text>
                                    </Text>
                                )}
                                <Text style={styles.gstText}>
                                    State:{" "}
                                    <Text style={{ color: "#64748b" }}>
                                        {invoice.from.state}
                                    </Text>
                                </Text>
                            </View>

                            <View style={styles.addressBox}>
                                <Text
                                    style={[
                                        styles.addressType,
                                        { color: "#0070ba" },
                                    ]}
                                >
                                    To
                                </Text>
                                <Text style={styles.companyName}>
                                    {invoice.to.name}
                                </Text>
                                <Text style={styles.addressText}>
                                    {invoice.to.address}
                                </Text>
                                {data?.showGSTIN && (
                                    <Text style={styles.gstText}>
                                        GSTIN:{" "}
                                        <Text style={{ color: "#64748b" }}>
                                            {invoice.to.gstin}
                                        </Text>
                                    </Text>
                                )}
                                <Text style={styles.gstText}>
                                    State:{" "}
                                    <Text style={{ color: "#64748b" }}>
                                        {invoice.to.state}
                                    </Text>
                                </Text>
                            </View>
                        </View>

                        {/* Items Table */}
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.th, { width: 25 }]}>
                                    #
                                </Text>
                                <Text style={[styles.th, { flex: 2 }]}>
                                    Item
                                </Text>
                                {data?.showHSNCode && (
                                    <Text style={[styles.th, { flex: 1 }]}>
                                        HSN
                                    </Text>
                                )}
                                <Text style={[styles.th, { flex: 0.5 }]}>
                                    Qty
                                </Text>
                                <Text
                                    style={[
                                        styles.th,
                                        { flex: 1, textAlign: "right" },
                                    ]}
                                >
                                    Rate
                                </Text>
                                {data?.taxBreakdown && (
                                    <Text
                                        style={[
                                            styles.th,
                                            { flex: 0.8, textAlign: "right" },
                                        ]}
                                    >
                                        GST
                                    </Text>
                                )}
                                <Text
                                    style={[
                                        styles.th,
                                        { flex: 1, textAlign: "right" },
                                    ]}
                                >
                                    Total
                                </Text>
                            </View>

                            {invoice.items.map((item, index) => (
                                <View key={item.id} style={styles.tableRow}>
                                    <Text
                                        style={[
                                            styles.td,
                                            { width: 25, color: "#94a3b8" },
                                        ]}
                                    >
                                        {index + 1}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.td,
                                            { flex: 2, fontWeight: "700" },
                                        ]}
                                    >
                                        {item.name}
                                    </Text>
                                    {data?.showHSNCode && (
                                        <Text
                                            style={[
                                                styles.td,
                                                { flex: 1, color: "#64748b" },
                                            ]}
                                        >
                                            {item.hsn}
                                        </Text>
                                    )}
                                    <Text style={[styles.td, { flex: 0.5 }]}>
                                        {item.qty}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.td,
                                            { flex: 1, textAlign: "right" },
                                        ]}
                                    >
                                        ₹ {item.rate.toFixed(2)}
                                    </Text>
                                    {data?.taxBreakdown && (
                                        <Text
                                            style={[
                                                styles.td,
                                                {
                                                    flex: 0.8,
                                                    textAlign: "right",
                                                },
                                            ]}
                                        >
                                            {item.tax}%
                                        </Text>
                                    )}
                                    <Text
                                        style={[
                                            styles.td,
                                            {
                                                flex: 1,
                                                textAlign: "right",
                                                fontWeight: "700",
                                            },
                                        ]}
                                    >
                                        ₹{" "}
                                        {(item.qty * item.rate * 1.18).toFixed(
                                            2,
                                        )}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        {/* Summary */}
                        <View style={styles.summaryContainer}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>
                                    Subtotal
                                </Text>
                                <Text style={styles.summaryValue}>
                                    ₹{subtotal.toFixed(2)}
                                </Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>GST</Text>
                                <Text style={styles.summaryValue}>
                                    ₹{totalTax.toFixed(2)}
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.summaryRow,
                                    {
                                        marginTop: 10,
                                        borderTopWidth: 1,
                                        paddingTop: 10,
                                        borderColor: "#E5E7EB",
                                    },
                                ]}
                            >
                                <Text style={styles.grandTotalLabel}>
                                    Grand Total
                                </Text>
                                <Text style={styles.grandTotalValue}>
                                    ₹{grandTotal.toFixed(2)}
                                </Text>
                            </View>
                        </View>

                        {/* Reverse Charge Note */}
                        <View style={styles.reverseChargeBox}>
                            <Text style={styles.reverseChargeLabel}>
                                Reverse Charge:
                            </Text>
                            <Text style={styles.reverseChargeText}>
                                Not applicable as per GST provisions.
                            </Text>
                        </View>

                        {/* Footer Details */}
                        <View style={styles.footerDetails}>
                            <Text style={styles.footerSectionTitle}>
                                Terms & Conditions
                            </Text>
                            <Text style={styles.footerText}>
                                Goods once sold will not be taken back. Subject
                                to jurisdiction of local courts.
                            </Text>
                        </View>

                        <Text style={styles.closingText}>
                            {data?.footerText || "Thank you for your business."}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f1f3f5" },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
    headerTitle: { fontSize: 20, fontWeight: "800", color: "#1a1b1e" },
    headerSubtitle: { color: "#868e96", fontSize: 12 },
    printBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
    printText: { fontSize: 13, color: "#64748b", fontWeight: "600" },
    previewScroll: { marginTop: 12 },
    invoiceCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 30,
    },
    banner: { paddingVertical: 15, alignItems: "center" },
    bannerText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "800",
        letterSpacing: 1,
    },
    invoiceBody: { padding: 20 },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    metaLabel: { fontSize: 10, color: "#94a3b8", textTransform: "uppercase" },
    metaValue: { fontSize: 13, fontWeight: "700", color: "#1e293b" },
    addressRow: { flexDirection: "row", gap: 12, marginBottom: 25 },
    addressBox: {
        flex: 1,
        backgroundColor: "#f8fafc",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    addressType: {
        fontSize: 14,
        fontWeight: "800",
        color: "#0070ba",
        marginBottom: 8,
    },
    companyName: {
        fontSize: 13,
        fontWeight: "800",
        color: "#1e293b",
        marginBottom: 4,
    },
    addressText: {
        fontSize: 11,
        color: "#64748b",
        lineHeight: 16,
        marginBottom: 6,
    },
    gstText: { fontSize: 10, fontWeight: "700", color: "#475569" },
    table: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#f1f5f9",
        marginVertical: 10,
    },
    tableHeader: {
        flexDirection: "row",
        paddingVertical: 10,
        backgroundColor: "#f8fafc",
    },
    th: {
        fontSize: 10,
        fontWeight: "800",
        color: "#475569",
        textTransform: "uppercase",
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
        alignItems: "center",
    },
    td: { fontSize: 11, color: "#1e293b" },
    summaryContainer: { alignSelf: "flex-end", width: "70%", marginTop: 15 },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    summaryLabel: { fontSize: 12, color: "#64748b" },
    summaryValue: { fontSize: 12, fontWeight: "600", color: "#1e293b" },
    grandTotalLabel: { fontSize: 14, fontWeight: "800", color: "#1e293b" },
    grandTotalValue: { fontSize: 18, fontWeight: "900", color: "#0070ba" },
    reverseChargeBox: {
        backgroundColor: "#fffbeb",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#fef3c7",
        marginTop: 20,
        flexDirection: "row",
        gap: 6,
    },
    reverseChargeLabel: { fontSize: 11, fontWeight: "800", color: "#92400e" },
    reverseChargeText: { fontSize: 11, color: "#b45309", flex: 1 },
    footerDetails: { marginTop: 25 },
    footerSectionTitle: {
        fontSize: 11,
        fontWeight: "700",
        color: "#94a3b8",
        marginBottom: 4,
    },
    footerText: { fontSize: 11, color: "#64748b", lineHeight: 16 },
    closingText: {
        textAlign: "center",
        marginTop: 30,
        fontSize: 12,
        color: "#94a3b8",
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
        paddingTop: 15,
    },
});

export default LiveTemplatePreview;

// import React from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     SafeAreaView,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// const LiveTemplatePreview = ({ data }) => {
//     // Mock Data for Preview
//     const invoiceData = {
//         invoiceNo: "INV-2025-001234",
//         date: "Feb 19, 2026",
//         from: {
//             name: "RadioWorld India",
//             address: "123, MG Road, Mumbai 400001",
//             gstin: "27AABCU9603R1ZM",
//             state: "Maharashtra",
//         },
//         to: {
//             name: "ABC Electronics Pvt Ltd",
//             address: "456, Nehru Place, Delhi 110019",
//             gstin: "07AABCU9603R1Z5",
//             state: "Delhi",
//         },
//         items: [
//             {
//                 id: 1,
//                 name: "Baofeng UV-5R Two Way Radio",
//                 hsn: "8517",
//                 qty: 2,
//                 rate: 1200,
//                 tax: 18,
//             },
//             {
//                 id: 2,
//                 name: "Antenna & Accessory",
//                 hsn: "8517",
//                 qty: 1,
//                 rate: 450,
//                 tax: 18,
//             },
//         ],
//     };

//     const subtotal = 2850.0;
//     const gstTotal = 513.0;
//     const grandTotal = 3363.0;

//     return (
//         <SafeAreaView style={styles.container}>
//             {/* Header Area */}
//             <View style={styles.topHeader}>
//                 <View>
//                     <Text style={styles.title}>Live Preview</Text>
//                     <Text style={styles.subtitle}>
//                         Sample data — your changes appear instantly
//                     </Text>
//                 </View>
//                 <TouchableOpacity style={styles.printBtn}>
//                     <Feather name="printer" size={16} color="#64748b" />
//                     <Text style={styles.printText}>Print</Text>
//                 </TouchableOpacity>
//             </View>

//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollContent}
//             >
//                 <View style={styles.previewCard}>
//                     {/* Blue Header Banner */}
//                     <LinearGradient
//                         colors={["#0070ba", "#005a96"]}
//                         style={styles.banner}
//                         start={{ x: 0, y: 0 }}
//                         end={{ x: 1, y: 0 }}
//                     >
//                         <Text style={styles.bannerText}>
//                             {data?.headerText || "TAX INVOICE"}
//                         </Text>
//                     </LinearGradient>

//                     <View style={styles.invoicePadding}>
//                         {/* Meta Info Row */}
//                         <View style={styles.metaRow}>
//                             <View>
//                                 <Text style={styles.metaLabel}>Invoice No</Text>
//                                 <Text style={styles.metaValue}>
//                                     {invoiceData.invoiceNo}
//                                 </Text>
//                             </View>
//                             <View style={{ alignItems: "flex-end" }}>
//                                 <Text style={styles.metaLabel}>Date</Text>
//                                 <Text style={styles.metaValue}>
//                                     {invoiceData.date}
//                                 </Text>
//                             </View>
//                         </View>

//                         {/* Address Sections */}
//                         <View style={styles.addressContainer}>
//                             <View style={styles.addressBox}>
//                                 <Text
//                                     style={[
//                                         styles.addressLabel,
//                                         { color: "#0070ba" },
//                                     ]}
//                                 >
//                                     From
//                                 </Text>
//                                 <Text style={styles.companyName}>
//                                     {invoiceData.from.name}
//                                 </Text>
//                                 <Text style={styles.addressText}>
//                                     {invoiceData.from.address}
//                                 </Text>
//                                 {data?.showGSTIN && (
//                                     <Text style={styles.gstText}>
//                                         GSTIN:{" "}
//                                         <Text style={styles.gstValue}>
//                                             {invoiceData.from.gstin}
//                                         </Text>
//                                     </Text>
//                                 )}
//                                 <Text style={styles.gstText}>
//                                     State:{" "}
//                                     <Text style={styles.gstValue}>
//                                         {invoiceData.from.state}
//                                     </Text>
//                                 </Text>
//                             </View>

//                             <View style={styles.addressBox}>
//                                 <Text
//                                     style={[
//                                         styles.addressLabel,
//                                         { color: "#0070ba" },
//                                     ]}
//                                 >
//                                     To
//                                 </Text>
//                                 <Text style={styles.companyName}>
//                                     {invoiceData.to.name}
//                                 </Text>
//                                 <Text style={styles.addressText}>
//                                     {invoiceData.to.address}
//                                 </Text>
//                                 {data?.showGSTIN && (
//                                     <Text style={styles.gstText}>
//                                         GSTIN:{" "}
//                                         <Text style={styles.gstValue}>
//                                             {invoiceData.to.gstin}
//                                         </Text>
//                                     </Text>
//                                 )}
//                                 <Text style={styles.gstText}>
//                                     State:{" "}
//                                     <Text style={styles.gstValue}>
//                                         {invoiceData.to.state}
//                                     </Text>
//                                 </Text>
//                             </View>
//                         </View>

//                         {/* Table */}
//                         <View style={styles.table}>
//                             <View style={styles.tableHeader}>
//                                 <Text style={[styles.th, { width: 20 }]}>
//                                     #
//                                 </Text>
//                                 <Text style={[styles.th, { flex: 2 }]}>
//                                     Item
//                                 </Text>
//                                 {data?.showHSNCode && (
//                                     <Text style={[styles.th, { flex: 0.8 }]}>
//                                         HSN
//                                     </Text>
//                                 )}
//                                 <Text
//                                     style={[
//                                         styles.th,
//                                         { flex: 0.5, textAlign: "center" },
//                                     ]}
//                                 >
//                                     Qty
//                                 </Text>
//                                 <Text
//                                     style={[
//                                         styles.th,
//                                         { flex: 1, textAlign: "right" },
//                                     ]}
//                                 >
//                                     Rate
//                                 </Text>
//                                 {data?.taxBreakdown && (
//                                     <Text
//                                         style={[
//                                             styles.th,
//                                             { flex: 0.8, textAlign: "right" },
//                                         ]}
//                                     >
//                                         GST
//                                     </Text>
//                                 )}
//                                 <Text
//                                     style={[
//                                         styles.th,
//                                         { flex: 1, textAlign: "right" },
//                                     ]}
//                                 >
//                                     Total
//                                 </Text>
//                             </View>

//                             {invoiceData.items.map((item, index) => (
//                                 <View key={item.id} style={styles.tableRow}>
//                                     <Text
//                                         style={[
//                                             styles.td,
//                                             { width: 20, color: "#94a3b8" },
//                                         ]}
//                                     >
//                                         {index + 1}
//                                     </Text>
//                                     <Text
//                                         style={[
//                                             styles.td,
//                                             { flex: 2, fontWeight: "700" },
//                                         ]}
//                                     >
//                                         {item.name}
//                                     </Text>
//                                     {data?.showHSNCode && (
//                                         <Text
//                                             style={[
//                                                 styles.td,
//                                                 { flex: 0.8, color: "#64748b" },
//                                             ]}
//                                         >
//                                             {item.hsn}
//                                         </Text>
//                                     )}
//                                     <Text
//                                         style={[
//                                             styles.td,
//                                             { flex: 0.5, textAlign: "center" },
//                                         ]}
//                                     >
//                                         {item.qty}
//                                     </Text>
//                                     <Text
//                                         style={[
//                                             styles.td,
//                                             { flex: 1, textAlign: "right" },
//                                         ]}
//                                     >
//                                         ₹ {item.rate.toFixed(2)}
//                                     </Text>
//                                     {data?.taxBreakdown && (
//                                         <Text
//                                             style={[
//                                                 styles.td,
//                                                 {
//                                                     flex: 0.8,
//                                                     textAlign: "right",
//                                                 },
//                                             ]}
//                                         >
//                                             {item.tax}%
//                                         </Text>
//                                     )}
//                                     <Text
//                                         style={[
//                                             styles.td,
//                                             {
//                                                 flex: 1,
//                                                 textAlign: "right",
//                                                 fontWeight: "700",
//                                             },
//                                         ]}
//                                     >
//                                         ₹{" "}
//                                         {(item.qty * item.rate * 1.18).toFixed(
//                                             2,
//                                         )}
//                                     </Text>
//                                 </View>
//                             ))}
//                         </View>

//                         {/* Summary Area */}
//                         <View style={styles.summarySection}>
//                             <View style={styles.summaryRow}>
//                                 <Text style={styles.summaryLabel}>
//                                     Subtotal
//                                 </Text>
//                                 <Text style={styles.summaryValue}>
//                                     ₹{subtotal.toFixed(2)}
//                                 </Text>
//                             </View>
//                             <View style={styles.summaryRow}>
//                                 <Text style={styles.summaryLabel}>GST</Text>
//                                 <Text style={styles.summaryValue}>
//                                     ₹{gstTotal.toFixed(2)}
//                                 </Text>
//                             </View>
//                             <View style={[styles.summaryRow, { marginTop: 8 }]}>
//                                 <Text style={styles.grandTotalLabel}>
//                                     Grand Total
//                                 </Text>
//                                 <Text style={styles.grandTotalValue}>
//                                     ₹{grandTotal.toFixed(2)}
//                                 </Text>
//                             </View>
//                         </View>

//                         {/* Reverse Charge Note */}
//                         {data?.reverseChargeNote && (
//                             <View style={styles.reverseChargeBox}>
//                                 <Text style={styles.reverseLabel}>
//                                     Reverse Charge:
//                                 </Text>
//                                 <Text style={styles.reverseValue}>
//                                     Not applicable as per GST provisions.
//                                 </Text>
//                             </View>
//                         )}

//                         {/* Footer */}
//                         <View style={styles.footerSection}>
//                             <Text style={styles.footerHeading}>
//                                 Terms & Conditions
//                             </Text>
//                             <Text style={styles.footerContent}>
//                                 {data?.termsConditions ||
//                                     "Goods once sold will not be taken back. Subject to jurisdiction of local courts."}
//                             </Text>
//                         </View>

//                         <Text style={styles.thankYouText}>
//                             {data?.footerText || "Thank you for your business."}
//                         </Text>
//                     </View>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#f8f9fa" },
//     topHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: 16,
//     },
//     title: { fontSize: 20, fontWeight: "800", color: "#1e293b" },
//     subtitle: { fontSize: 12, color: "#94a3b8" },
//     printBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
//     printText: { fontSize: 13, color: "#64748b", fontWeight: "600" },
//     scrollContent: { padding: 16 },
//     previewCard: {
//         backgroundColor: "#fff",
//         borderRadius: 16,
//         overflow: "hidden",
//         elevation: 5,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 10,
//         marginBottom: 40,
//     },
//     banner: { paddingVertical: 14, alignItems: "center" },
//     bannerText: {
//         color: "#fff",
//         fontSize: 14,
//         fontWeight: "800",
//         letterSpacing: 1,
//     },
//     invoicePadding: { padding: 20 },
//     metaRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginBottom: 20,
//     },
//     metaLabel: {
//         fontSize: 10,
//         color: "#94a3b8",
//         textTransform: "uppercase",
//         fontWeight: "600",
//     },
//     metaValue: {
//         fontSize: 13,
//         fontWeight: "700",
//         color: "#1e293b",
//         marginTop: 2,
//     },
//     addressContainer: { flexDirection: "row", gap: 12, marginBottom: 25 },
//     addressBox: {
//         flex: 1,
//         backgroundColor: "#f8fafc",
//         padding: 12,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: "#f1f5f9",
//     },
//     addressLabel: { fontSize: 14, fontWeight: "800", marginBottom: 8 },
//     companyName: {
//         fontSize: 13,
//         fontWeight: "800",
//         color: "#1e293b",
//         marginBottom: 4,
//     },
//     addressText: {
//         fontSize: 11,
//         color: "#64748b",
//         lineHeight: 16,
//         marginBottom: 6,
//     },
//     gstText: { fontSize: 10, fontWeight: "700", color: "#475569" },
//     gstValue: { color: "#94a3b8", fontWeight: "500" },
//     table: {
//         marginVertical: 15,
//         borderTopWidth: 1,
//         borderBottomWidth: 1,
//         borderColor: "#f1f5f9",
//     },
//     tableHeader: {
//         flexDirection: "row",
//         paddingVertical: 10,
//         backgroundColor: "#f8fafc",
//     },
//     th: {
//         fontSize: 10,
//         fontWeight: "800",
//         color: "#475569",
//         textTransform: "uppercase",
//     },
//     tableRow: {
//         flexDirection: "row",
//         paddingVertical: 12,
//         borderTopWidth: 1,
//         borderColor: "#f1f5f9",
//         alignItems: "center",
//     },
//     td: { fontSize: 11, color: "#1e293b" },
//     summarySection: { alignSelf: "flex-end", width: "50%", marginTop: 15 },
//     summaryRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginBottom: 4,
//     },
//     summaryLabel: { fontSize: 12, color: "#64748b" },
//     summaryValue: { fontSize: 12, fontWeight: "600", color: "#1e293b" },
//     grandTotalLabel: { fontSize: 14, fontWeight: "800", color: "#1e293b" },
//     grandTotalValue: { fontSize: 20, fontWeight: "900", color: "#0070ba" },
//     reverseChargeBox: {
//         backgroundColor: "#fffbeb",
//         padding: 12,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: "#fef3c7",
//         marginTop: 25,
//         flexDirection: "row",
//         gap: 6,
//     },
//     reverseLabel: { fontSize: 11, fontWeight: "800", color: "#92400e" },
//     reverseValue: { fontSize: 11, color: "#b45309", flex: 1 },
//     footerSection: { marginTop: 25 },
//     footerHeading: {
//         fontSize: 11,
//         fontWeight: "700",
//         color: "#94a3b8",
//         marginBottom: 4,
//     },
//     footerContent: { fontSize: 11, color: "#64748b", lineHeight: 16 },
//     thankYouText: {
//         textAlign: "center",
//         marginTop: 40,
//         fontSize: 12,
//         color: "#cbd5e1",
//         borderTopWidth: 1,
//         borderColor: "#f1f5f9",
//         paddingTop: 15,
//     },
// });

// export default LiveTemplatePreview;
