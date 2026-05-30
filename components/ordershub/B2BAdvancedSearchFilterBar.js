// import React from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     TouchableOpacity,
// } from "react-native";
// import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// const B2BAdvancedSearchFilterBar = ({ onClearFilters }) => {
//     return (
//         <View style={styles.container}>
//             <View style={[styles.filterItem, { flex: 1.5 }]}>
//                 <View style={styles.searchWrapper}>
//                     <Feather name="search" size={18} color="#94a3b8" />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Search order ID, buyer..."
//                         placeholderTextColor="#94a3b8"
//                     />
//                 </View>
//             </View>

//             <View style={styles.filterItem}>
//                 <TouchableOpacity style={styles.dropdown}>
//                     <Text style={styles.placeholderText}>mm/dd/yyyy</Text>
//                     <MaterialCommunityIcons
//                         name="calendar-month-outline"
//                         size={20}
//                         color="#94a3b8"
//                     />
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.filterItem}>
//                 <TouchableOpacity style={styles.dropdown}>
//                     <Text style={styles.placeholderText}>mm/dd/yyyy</Text>
//                     <MaterialCommunityIcons
//                         name="calendar-month-outline"
//                         size={20}
//                         color="#94a3b8"
//                     />
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.filterItem}>
//                 <TouchableOpacity style={styles.dropdown}>
//                     <Text style={styles.dropdownValue}>Category</Text>
//                     <Feather name="chevron-down" size={18} color="#64748b" />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.filterItem}>
//                 <TouchableOpacity style={styles.dropdown}>
//                     <Text style={styles.dropdownValue}>All Sources</Text>
//                     <Feather name="chevron-down" size={18} color="#64748b" />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.filterItem}>
//                 <TouchableOpacity style={styles.dropdown}>
//                     <Text style={styles.dropdownValue}>All Platforms</Text>
//                     <Feather name="chevron-down" size={18} color="#64748b" />
//                 </TouchableOpacity>
//             </View>
//             {/* <View
//                 style={{
//                     flex: 1,
//                     width: "100%",
//                 }}
//             /> */}
//             <TouchableOpacity
//                 style={[styles.clearButton, { backgroundColor: "#0284c7" }]}
//                 onPress={onClearFilters}
//             >
//                 <Text style={[styles.clearText, { color: "#ffffff" }]}>
//                     Apply
//                 </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={styles.clearButton}
//                 onPress={onClearFilters}
//             >
//                 <Text style={styles.clearText}>Clear Filters</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#fff",
//         padding: 12,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: "#e2e8f0",
//         gap: 10,
//         flexWrap: "wrap",
//         marginHorizontal: 10,
//         marginTop: 16,
//     },
//     filterItem: {
//         flex: 1,
//         minWidth: 140,
//     },
//     searchWrapper: {
//         flexDirection: "row",
//         alignItems: "center",
//         borderWidth: 1,
//         borderColor: "#e2e8f0",
//         borderRadius: 8,
//         paddingHorizontal: 12,
//         height: 44,
//     },
//     input: {
//         flex: 1,
//         fontSize: 14,
//         color: "#1e293b",
//         marginLeft: 8,
//     },
//     dropdown: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         borderWidth: 1,
//         borderColor: "#e2e8f0",
//         borderRadius: 8,
//         paddingHorizontal: 12,
//         height: 44,
//     },
//     placeholderText: {
//         fontSize: 14,
//         color: "#94a3b8",
//     },
//     dropdownValue: {
//         fontSize: 14,
//         color: "#64748b",
//     },
//     clearButton: {
//         backgroundColor: "#f0f9ff",
//         paddingHorizontal: 16,
//         height: 44,
//         borderRadius: 8,
//         justifyContent: "center",
//         alignItems: "center",
//         borderWidth: 1,
//         borderColor: "#e0f2fe",
//         flex: 1,
//         minWidth: 140,
//     },
//     clearText: {
//         color: "#0284c7",
//         fontSize: 14,
//         fontWeight: "700",
//     },
// });

// export default B2BAdvancedSearchFilterBar;

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList,
    Platform,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getCategoryTreeDropdown } from "../../utils/api/commonApi";

// ─── Static options ───────────────────────────────────────────────────────────
const SOURCE_OPTIONS = [
    { label: "All Sources", value: "" },
    { label: "Facebook", value: "facebook" },
    { label: "Google", value: "google" },
    { label: "Organic", value: "organic" },
];

const PLATFORM_OPTIONS = [
    { label: "All Platforms", value: "" },
    { label: "Android", value: "android" },
    { label: "iOS", value: "ios" },
    { label: "Web", value: "web" },
];

// ─── Small Dropdown Modal ─────────────────────────────────────────────────────
const DropdownModal = ({ visible, options, onSelect, onClose }) => (
    <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
    >
        <TouchableOpacity
            style={dd.overlay}
            activeOpacity={1}
            onPress={onClose}
        >
            <View style={dd.box}>
                <FlatList
                    data={options}
                    keyExtractor={(_, i) => String(i)}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={dd.item}
                            onPress={() => {
                                onSelect(item);
                                onClose();
                            }}
                        >
                            <Text style={dd.itemText}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </TouchableOpacity>
    </Modal>
);

const dd = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    box: {
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        elevation: 8,
        maxHeight: "80%",
    },
    item: {
        paddingHorizontal: 18,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    itemText: { fontSize: 14, color: "#1e293b", fontWeight: "500" },
});

// ─── Format date to display ───────────────────────────────────────────────────
const fmtDate = (d) =>
    d
        ? `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`
        : null;

// ─── Main Component ───────────────────────────────────────────────────────────
const B2BAdvancedSearchFilterBar = ({
    onFiltersChange = () => {},
    onClearFilters = () => {},
}) => {
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [category, setCategory] = useState({ label: "Category", value: "" });
    const [source, setSource] = useState({ label: "Source", value: "" });
    const [platform, setPlatform] = useState({ label: "Platform", value: "" });

    const [categories, setCategories] = useState([]);
    const [showCatModal, setShowCatModal] = useState(false);
    const [showSrcModal, setShowSrcModal] = useState(false);
    const [showPltModal, setShowPltModal] = useState(false);
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    // fetch categories once
    useEffect(() => {
        getCategoryTreeDropdown().then((res) => {
            if (res?.success) {
                const opts = [
                    { label: "All Categories", value: "" },
                    ...res.data.map((c) => ({
                        label: c.label,
                        value: c.value,
                    })),
                ];
                setCategories(opts);
            }
        });
    }, []);

    // emit filters up on any change
    useEffect(() => {
        onFiltersChange({
            search,
            fromDate: fromDate ? fromDate.toISOString() : null,
            toDate: toDate
                ? new Date(toDate.setHours(23, 59, 59, 999)).toISOString()
                : null,
            categoryId: category.value || null,
            utmSource: source.value || null,
            platform: platform.value || null,
        });
    }, [search, fromDate, toDate, category, source, platform]);

    const handleClear = () => {
        setSearch("");
        setFromDate(null);
        setToDate(null);
        setCategory({ label: "Category", value: "" });
        setSource({ label: "Source", value: "" });
        setPlatform({ label: "Platform", value: "" });
        onClearFilters();
    };

    return (
        <View style={styles.container}>
            {/* ── Search ── */}
            <View style={[styles.filterItem, { flex: 1.5 }]}>
                <View style={styles.searchWrapper}>
                    <Feather name="search" size={18} color="#94a3b8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Search order ID, buyer..."
                        placeholderTextColor="#94a3b8"
                        value={search}
                        onChangeText={setSearch}
                    />
                    {search ? (
                        <TouchableOpacity onPress={() => setSearch("")}>
                            <Feather name="x" size={16} color="#94a3b8" />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>

            {/* ── From Date ── */}
            <View style={styles.filterItem}>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setShowFromPicker(true)}
                >
                    <Text
                        style={
                            fromDate
                                ? styles.dropdownValue
                                : styles.placeholderText
                        }
                    >
                        {fromDate ? fmtDate(fromDate) : "From Date"}
                    </Text>
                    <MaterialCommunityIcons
                        name="calendar-month-outline"
                        size={18}
                        color="#94a3b8"
                    />
                </TouchableOpacity>
            </View>

            {/* ── To Date ── */}
            <View style={styles.filterItem}>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setShowToPicker(true)}
                >
                    <Text
                        style={
                            toDate
                                ? styles.dropdownValue
                                : styles.placeholderText
                        }
                    >
                        {toDate ? fmtDate(toDate) : "To Date"}
                    </Text>
                    <MaterialCommunityIcons
                        name="calendar-month-outline"
                        size={18}
                        color="#94a3b8"
                    />
                </TouchableOpacity>
            </View>

            {/* ── Category ── */}
            <View style={styles.filterItem}>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setShowCatModal(true)}
                >
                    <Text
                        style={
                            category.value
                                ? styles.dropdownValue
                                : styles.placeholderText
                        }
                        numberOfLines={1}
                    >
                        {category.label}
                    </Text>
                    <Feather name="chevron-down" size={16} color="#94a3b8" />
                </TouchableOpacity>
            </View>

            {/* ── Source ── */}
            <View style={styles.filterItem}>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setShowSrcModal(true)}
                >
                    <Text
                        style={
                            source.value
                                ? styles.dropdownValue
                                : styles.placeholderText
                        }
                    >
                        {source.label}
                    </Text>
                    <Feather name="chevron-down" size={16} color="#94a3b8" />
                </TouchableOpacity>
            </View>

            {/* ── Platform ── */}
            <View style={styles.filterItem}>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setShowPltModal(true)}
                >
                    <Text
                        style={
                            platform.value
                                ? styles.dropdownValue
                                : styles.placeholderText
                        }
                    >
                        {platform.label}
                    </Text>
                    <Feather name="chevron-down" size={16} color="#94a3b8" />
                </TouchableOpacity>
            </View>

            {/* ── Clear ── */}
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>

            {/* ── Date Pickers ── */}
            {showFromPicker && (
                <DateTimePicker
                    value={fromDate || new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(_, d) => {
                        setShowFromPicker(false);
                        if (d) setFromDate(d);
                    }}
                    maximumDate={toDate || new Date()}
                />
            )}
            {showToPicker && (
                <DateTimePicker
                    value={toDate || new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(_, d) => {
                        setShowToPicker(false);
                        if (d) setToDate(d);
                    }}
                    minimumDate={fromDate || undefined}
                    maximumDate={new Date()}
                />
            )}

            {/* ── Modals ── */}
            <DropdownModal
                visible={showCatModal}
                options={categories}
                onSelect={setCategory}
                onClose={() => setShowCatModal(false)}
            />
            <DropdownModal
                visible={showSrcModal}
                options={SOURCE_OPTIONS}
                onSelect={setSource}
                onClose={() => setShowSrcModal(false)}
            />
            <DropdownModal
                visible={showPltModal}
                options={PLATFORM_OPTIONS}
                onSelect={setPlatform}
                onClose={() => setShowPltModal(false)}
            />
        </View>
    );
};

// ─── Styles (original, untouched) ─────────────────────────────────────────────
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        gap: 10,
        flexWrap: "wrap",
        marginHorizontal: 10,
        marginTop: 16,
    },
    filterItem: { flex: 1, minWidth: 140 },
    searchWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },
    input: { flex: 1, fontSize: 14, color: "#1e293b", marginLeft: 8 },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },
    placeholderText: { fontSize: 14, color: "#94a3b8", flex: 1 },
    dropdownValue: {
        fontSize: 14,
        color: "#1e293b",
        fontWeight: "500",
        flex: 1,
    },
    clearButton: {
        backgroundColor: "#f0f9ff",
        paddingHorizontal: 16,
        height: 44,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e0f2fe",
        flex: 1,
        minWidth: 140,
    },
    clearText: { color: "#0284c7", fontSize: 14, fontWeight: "700" },
});

export default B2BAdvancedSearchFilterBar;
