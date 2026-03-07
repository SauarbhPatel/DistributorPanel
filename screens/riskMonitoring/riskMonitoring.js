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
import BottomPopup from "../../components/common/BottomPopup";
import CreateDocument from "../../components/form/CreateDocument";
import { __formatDate } from "../../utils/funtion";
import { Loader } from "../../modules";
import CreateCategoryConditions from "../../components/form/CreateCategoryConditions";

const RiskMonitoring = ({ navigation }) => {
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

    const stats = {
        totalCategories: 4,
        noCompliance: 4,
        withCompliance: 0,
    };

    const categories = [
        { id: "1", name: "Electronics", slug: "electronics" },
        { id: "2", name: "Apparel", slug: "apparel" },
        { id: "3", name: "Walkie Talkies", slug: "walkie-talkies" },
        { id: "4", name: "Mobile Phones", slug: "mobile-phones" },
    ];
    const renderCategory = ({ item }) => (
        <View style={styles.rowCard}>
            <View style={{ flex: 1 }}>
                <Text style={styles.categoryName}>{item.name}</Text>
                <Text style={styles.slug}>{item.slug}</Text>
            </View>

            <TouchableOpacity style={styles.configureBtn}>
                <Text style={styles.configureText}>Configure</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader title={"Risk monitoring"} navigation={navigation} />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 20,
                    paddingTop: 10,
                    paddingHorizontal: 10,
                }}
            >
                <View style={styles.card}>
                    <Text style={styles.heading}>Risk overview</Text>
                    <Text style={styles.subText}>
                        Categories without any compliance mapping may be higher
                        risk. Configure category compliance to enforce document
                        requirements before product activation.
                    </Text>

                    <View style={styles.statsRow}>
                        <StatCard
                            number={stats.totalCategories}
                            label="Total categories"
                        />
                        <StatCard
                            number={stats.noCompliance}
                            label="No compliance configured"
                        />
                        <StatCard
                            number={stats.withCompliance}
                            label="With compliance rules"
                        />
                    </View>
                </View>

                {/* Categories Without Compliance */}
                <View style={styles.card}>
                    <Text style={styles.heading}>
                        Categories without compliance mapping
                    </Text>
                    <Text style={styles.subText}>
                        These categories have no document requirements assigned.
                        Consider adding compliance to reduce regulatory risk.
                    </Text>

                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.id}
                        renderItem={renderCategory}
                        scrollEnabled={false}
                        contentContainerStyle={{ marginTop: 10 }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RiskMonitoring;
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

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    heading: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 6,
    },

    subText: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 14,
        lineHeight: 18,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    statCard: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        padding: 14,
        borderRadius: 10,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    statNumber: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
    },

    statLabel: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 4,
    },

    rowCard: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
    },

    categoryName: {
        fontSize: 14,
        fontWeight: "500",
        color: "#111827",
    },

    slug: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 4,
    },

    configureBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: "#EEF2FF",
    },

    configureText: {
        fontSize: 13,
        fontWeight: "500",
        color: "#4F46E5",
    },
});
