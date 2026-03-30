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
import { __deleteApiData, __getApiData } from "../../utils/api";
import BottomPopup from "../../components/common/BottomPopup";
import CreateHSNcode from "../../components/form/CreateHSNcode";
import { Loader } from "../../modules";
import HeaderWithSearchAndFilter from "../../components/common/HeaderWithSearchAndFilter";
import HsnCodeList from "../../components/taxManager/HsnCodeList";
import HsnSetModel from "../../components/taxManager/HsnSetModel";
import HsnCodeModel from "../../components/taxManager/HsnCodeModel";

const HsnCodes = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
        search: "",
        list: [],
        totalAttributes: 0,
        filterableAttributes: 0,
        variantAttributes: 0,
        isShowCreate: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        search,
        isShowCreate,
        loading,
        list,
        totalAttributes,
        filterableAttributes,
        variantAttributes,
    } = state;

    const __handleGetData = async (ser) => {
        try {
            updateState({ loading: true });
            const res = await __getApiData(
                `/hsnCodes/getAllHsnCode?page=1&limit=100&search=${ser}&sortBy=createdAt&sortOrder=asc`,
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
        __handleGetData(search);
    }, [search]);

    const __handleDelete = (id) => {
        Alert.alert(
            "Delete HSN Code",
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

                            const res = await __deleteApiData(
                                `/hsnCodes/deleteHsnCodeById/${id}`,
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
            <CommonHeader title={"HSN / SAC Master"} navigation={navigation} />
            {/* <Loader isShow={loading} /> */}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 1 }}
            >
                <HeaderWithSearchAndFilter
                    search={search}
                    onChange={updateState}
                    dec="Harmonized System codes, description, default tax slab, product type."
                    buttonName="Add HSN"
                    dropDownCount={2}
                    dropDown1Name="Sort by"
                    dropDown2Name="Sort By action"
                    searchPlaceHolder="Search name, code, description..."
                    isLoading={loading}
                />
                {/* {attributeCards()} */}
                <HsnCodeList list={list} onChange={updateState} />
            </ScrollView>
            <HsnCodeModel
                visible={isShowCreate}
                onClose={() => updateState({ isShowCreate: false })}
            />
            {/* <BottomPopup
                isShow={isShowCreate}
                title="Add HSN Code"
                // top="45%"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateHSNcode
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            __handleGetData(search);
                        }}
                    />
                }
            /> */}
        </SafeAreaView>
    );

    function attributeCards() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                {list?.map((item) => (
                    <ListCard
                        item={item}
                        key={item?._id}
                        onDelete={__handleDelete}
                        onDone={() => __handleGetData(search)}
                    />
                ))}
            </View>
        );
    }
};

export default HsnCodes;

const ListCard = ({ item, onDelete, onDone }) => {
    const [state, setState] = useState({
        isShowCreate: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isShowCreate } = state;

    return (
        <View style={styles.card}>
            {/* Edit Popup */}
            <BottomPopup
                isShow={isShowCreate}
                title="Edit HSN Code"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateHSNcode
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            onDone();
                        }}
                        isEdit
                        item={item}
                    />
                }
            />

            {/* Top Section */}
            <View style={styles.topRow}>
                <View style={{ width: "75%" }}>
                    <Text style={styles.hsnCode}>HSN: {item.code}</Text>

                    <Text style={styles.description} numberOfLines={2}>
                        {item.description}
                    </Text>

                    <Text style={styles.subText}>
                        GST Slab: {item?.TaxSlabId?.name} (
                        {item?.TaxSlabId?.code})
                    </Text>

                    <Text style={styles.subText}>
                        Product Type: {item.productType}
                    </Text>
                </View>

                {/* Tax Badge */}
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.taxRate}%</Text>
                </View>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomRow}>
                {/* Status */}
                <View
                    style={[
                        styles.statusPill,
                        {
                            backgroundColor: item.isActive
                                ? "#DCFCE7"
                                : "#FEE2E2",
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.statusText,
                            {
                                color: item.isActive ? "#16A34A" : "#DC2626",
                            },
                        ]}
                    >
                        {item.isActive ? "Active" : "Inactive"}
                    </Text>
                </View>

                {/* Actions */}
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => updateState({ isShowCreate: true })}
                    >
                        <Feather name="edit-2" size={18} color="#2563EB" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => onDelete(item?._id)}
                    >
                        <MaterialIcons
                            name="delete-outline"
                            size={20}
                            color="#DC2626"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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

    /* ================= Attribute Set Card ================= */
    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        // elevation: 2,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    hsnCode: {
        fontSize: 14,
        fontWeight: "700",
        color: "#2563EB",
    },

    description: {
        ...Fonts.grayColor14Medium,
        fontSize: 12,
        color: Colors.lightGrayColor,
        marginTop: 4,
        maxWidth: "90%",
    },

    badge: {
        backgroundColor: "#EFF6FF",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        // flex: 1,
    },

    badgeText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#2563EB",
    },

    bottomRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },

    statusText: {
        fontSize: 12,
        color: "#6B7280",
    },

    actionRow: {
        flexDirection: "row",
        marginLeft: "auto",
    },

    iconBtn: {
        padding: 6,
        marginLeft: 6,
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
    },
    statusPill: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    subText: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },
});
