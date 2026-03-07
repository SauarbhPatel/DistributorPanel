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
import CreateCourierPartners from "../../components/form/CreateCourierPartners";

const Onboarding = ({ navigation }) => {
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

    const __handleGetData = async (ser = "") => {
        try {
            updateState({ loading: ser == "" ? true : false });
            // const res = await __getApiData(`/taxes/getAllTax`);
            const res = await __getApiData(
                `/complianceDocument/getAllComplianceDocument?page=1&limit=100&search=${ser}&sortBy=name&sortOrder=desc`,
            );
            console.log(JSON.stringify(res));
            if (res?.success) {
                updateState({
                    list: res.data?.records,
                });
            }
        } catch (error) {
            console.error("Error creating ticket:", error);
        } finally {
            updateState({ loading: false });
        }
    };

    useEffect(() => {
        // __handleGetData(search);
    }, [search]);

    const __handleDelete = (id) => {
        Alert.alert(
            "Delete Document",
            "Are you sure you want to delete?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            updateState({ loading: true });
                            console.log(id);

                            const res = await __deleteApiData(
                                `/complianceDocument/deleteComplianceDocumentById/${id}`,
                            );
                            if (res?.success) {
                                __handleGetData(search);
                            } else {
                                Alert.alert("Error", res?.message);
                            }
                        } catch (error) {
                            Alert.alert("Error", "Something went wrong");
                        } finally {
                            updateState({ loading: false });
                        }
                    },
                },
            ],
            { cancelable: true },
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader
                title={"Onboarding"}
                subTitle={
                    "Merged intake, checklist, contract & terms, approval decision."
                }
                navigation={navigation}
            />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                {/* {statsCards()} */}
                {searchAndAdd()}
                {attributeCards()}
            </ScrollView>
        </SafeAreaView>
    );

    function searchAndAdd() {
        return (
            <View style={styles.searchRow}>
                <View style={styles.searchBox}>
                    <Feather name="search" size={18} color={Colors.grayColor} />
                    <TextInput
                        placeholder="Search..."
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>
        );
    }

    function attributeCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {[
                    {
                        id: "REG101",
                        submittedDate: "3/3/2026",
                        name: "Delta Pharma Ltd",
                        kycStatus: "complete", // For green badge
                    },
                    {
                        id: "REG102",
                        submittedDate: "4/3/2026",
                        name: "Zenith Healthcare",
                        kycStatus: "pending", // For amber badge
                    },
                    {
                        id: "REG103",
                        submittedDate: "5/3/2026",
                        name: "Global Med Solutions",
                        kycStatus: "complete",
                    },
                ]?.map((item) => (
                    <ListCard
                        item={item}
                        key={item?.name}
                        onDelete={__handleDelete}
                        onDone={() => __handleGetData(search)}
                        onPress={() =>
                            navigation.navigate("OnboardingDetails", { item })
                        }
                    />
                ))}
            </View>
        );
    }
};

export default Onboarding;

const ListCard = ({ item, onEdit, onPress = () => {} }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onPress(item)}
            style={styles.cardContainer}
        >
            <View style={styles.cardContent}>
                {/* Left Section: Submission Date */}
                <View style={styles.dateSection}>
                    <Text style={styles.label}>Submitted</Text>
                    <Text style={styles.dateText}>
                        {item?.submittedDate || "3/3/2026"}
                    </Text>
                </View>

                {/* Middle Section: Company Name */}
                <View style={styles.nameSection}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.companyName} numberOfLines={2}>
                        {item?.name || "Delta Pharma Ltd"}
                    </Text>
                </View>

                {/* Right Section: KYC Status & Arrow */}
                <View style={styles.statusSection}>
                    <Text style={styles.label}>KYC</Text>
                    <View
                        style={[
                            styles.statusBadge,
                            {
                                backgroundColor:
                                    item?.kycStatus === "pending"
                                        ? "#FEF3C7"
                                        : "#E0F8E9",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.statusText,
                                {
                                    color:
                                        item?.kycStatus === "pending"
                                            ? "#D97706"
                                            : "#10B981",
                                },
                            ]}
                        >
                            {item?.kycStatus || "complete"}
                        </Text>
                    </View>
                </View>

                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </View>
        </TouchableOpacity>
    );
};
const StatCard = ({ title, value, colors, icon }) => (
    <LinearGradient colors={colors} style={styles.statCard}>
        <View style={{ marginEnd: 10 }}>
            <Text style={styles.statTitle}>{title}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </View>
        <View style={styles.statIcon}>
            <Feather name={icon} size={22} color="#fff" />
        </View>
    </LinearGradient>
);

const styles = StyleSheet.create({
    header: {
        padding: Sizes.fixPadding,
    },

    subTitle: {
        marginTop: 4,
        ...Fonts.grayColor14Regular,
    },

    /* ================= Stats Cards ================= */

    statsRow: {
        flexDirection: "row",
        paddingHorizontal: Sizes.fixPadding - 5,
        justifyContent: "space-between",
    },

    statCard: {
        flex: 1,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginHorizontal: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    statTitle: {
        color: "#E5E7EB",
        fontSize: 12,
    },

    statValue: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 4,
    },

    statIcon: {
        backgroundColor: "rgba(255,255,255,0.25)",
        padding: 10,
        borderRadius: 12,
    },

    /* ================= Search + Add ================= */

    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: Sizes.fixPadding,
    },

    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        height: 45,
        marginRight: 10,
    },

    searchInput: {
        flex: 1,
        marginLeft: 8,
    },

    addBtn: {
        flexDirection: "row",
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 14,
        height: 45,
        borderRadius: Sizes.fixPadding,
        alignItems: "center",
    },

    addText: {
        color: Colors.whiteColor,
        marginLeft: 6,
        fontWeight: "600",
    },

    /* ================= List Card Styles ================= */
    cardContainer: {
        backgroundColor: Colors.whiteColor,
        marginVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        // Soft shadow for a modern look
        // elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        gap: 10,
    },
    dateSection: {
        width: "22%",
    },
    nameSection: {
        flex: 1,
    },
    statusSection: {
        alignItems: "flex-start",
        marginRight: 5,
    },
    label: {
        fontSize: 11,
        color: "#6b7280",
        marginBottom: 4,
        fontWeight: "500",
    },
    dateText: {
        fontSize: 13,
        color: "#1f2937",
        fontWeight: "500",
    },
    companyName: {
        fontSize: 14,
        color: "#111827",
        fontWeight: "700",
        lineHeight: 18,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "600",
    },
});
