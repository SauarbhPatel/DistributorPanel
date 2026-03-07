import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    Alert,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData, __postApiData } from "../../utils/api";
import { __formatDate } from "../../utils/funtion";
import { Loader } from "../../modules";

const ReportsCompliance = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [state, setState] = useState({
        loading: false,
        list: [],
        totalAttributes: 0,
        filterableAttributes: 0,
        variantAttributes: 0,
        isShowCreate: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        isShowCreate,
        loading,
        list,
        totalAttributes,
        filterableAttributes,
        variantAttributes,
    } = state;

    const stats = [
        { label: "JURISDICTIONS", value: 3 },
        { label: "DOCUMENT TYPES", value: 4 },
        { label: "CATEGORY MAPPINGS", value: 0 },
        { label: "SELLER REQUIREMENTS", value: 0 },
        { label: "BRAND REQUIREMENTS", value: 0 },
        { label: "ACTIVE POLICIES", value: 1 },
    ];

    const documents = [
        {
            id: "1",
            name: "BIS Certificate",
            code: "BIS_CERT",
            reminder: 30,
            autoBlock: "Yes",
        },
        {
            id: "2",
            name: "ETA Certificate",
            code: "ETA",
            reminder: 45,
            autoBlock: "Yes",
        },
        {
            id: "3",
            name: "FSSAI License",
            code: "FSSAI",
            reminder: 60,
            autoBlock: "Yes",
        },
    ];
    const renderDocument = ({ item }) => (
        <View style={styles.tableRow}>
            <View style={{ flex: 1 }}>
                <Text style={styles.docName}>{item.name}</Text>
                <Text style={styles.docCode}>{item.code}</Text>
            </View>

            <Text style={styles.cell}>{item.reminder} days</Text>

            <Text
                style={[
                    styles.autoBlock,
                    { color: item.autoBlock === "Yes" ? "#16A34A" : "#DC2626" },
                ]}
            >
                {item.autoBlock}
            </Text>
        </View>
    );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader title={"Reports"} navigation={navigation} />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 20,
                    paddingTop: 10,
                    paddingHorizontal: 10,
                }}
            >
                {/* Summary Cards */}
                <View style={styles.statsGrid}>
                    {stats.map((item, index) => (
                        <View key={index} style={styles.statCard}>
                            <Text style={styles.statLabel}>{item.label}</Text>
                            <Text style={styles.statValue}>{item.value}</Text>
                        </View>
                    ))}
                </View>
                {/* Document Section */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>
                        Document types with expiry & renewal
                    </Text>
                    <Text style={styles.sectionSub}>
                        These document types have mandatory expiry and renewal
                        reminder configured.
                    </Text>

                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.headerText, { flex: 1 }]}>
                            Document
                        </Text>
                        <Text style={styles.headerText}>Reminder</Text>
                        <Text style={styles.headerText}>Auto-block</Text>
                    </View>

                    <FlatList
                        data={documents}
                        keyExtractor={(item) => item.id}
                        renderItem={renderDocument}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReportsCompliance;
const StatCard = ({ number, label }) => (
    <View style={styles.statCard}>
        <Text style={styles.statNumber}>{number}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        padding: Sizes.fixPadding,
    },

    subTitle: {
        marginTop: 4,
        ...Fonts.grayColor14Regular,
    },

    /* ---------- STATS GRID ---------- */

    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    statCard: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    statLabel: {
        fontSize: 11,
        color: "#6B7280",
        marginBottom: 8,
        fontWeight: "500",
    },

    statValue: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
    },

    /* ---------- SECTION CARD ---------- */

    sectionCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 6,
    },

    sectionSub: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 16,
    },

    /* ---------- TABLE ---------- */

    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
        paddingBottom: 8,
        marginBottom: 8,
    },

    headerText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#374151",
        width: 90,
    },

    tableRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#F3F4F6",
    },

    docName: {
        fontSize: 14,
        fontWeight: "500",
        color: "#111827",
    },

    docCode: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },

    cell: {
        width: 90,
        fontSize: 13,
        color: "#111827",
    },

    autoBlock: {
        width: 90,
        fontSize: 13,
        fontWeight: "600",
    },
});
