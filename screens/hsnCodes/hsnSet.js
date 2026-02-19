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
import CreateHSNset from "../../components/form/CreateHSNset";
import { Loader } from "../../modules";

const HsnSet = ({ navigation }) => {
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

    const __handleGetData = async (ser) => {
        try {
            updateState({ loading: true });
            const res = await __getApiData(`/hsnSets/getAllHsnSets`);
            console.log(JSON.stringify(res));
            if (res?.success) {
                updateState({
                    list: res.data,
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
            "Delete HSN set",
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
                                `/hsnSets/deleteHsnSetById/${id}`,
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
                title={"HSN Set Management"}
                subTitle={"Manage HSN sets."}
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
            <BottomPopup
                isShow={isShowCreate}
                title="Add HSN Set"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateHSNset
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            __handleGetData(search);
                        }}
                    />
                }
            />
        </SafeAreaView>
    );

    function statsCards() {
        return (
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <View style={styles.statsRow}>
                            <StatCard
                                title="Total HSN Codes"
                                value={totalAttributes}
                                colors={["#3B82F6", "#2563EB"]}
                                icon="tag"
                            />
                            <StatCard
                                title="With Tax Linked"
                                value={filterableAttributes}
                                colors={["#10B981", "#059669"]}
                                icon="filter"
                            />
                            <StatCard
                                title="Pending Tax"
                                value={variantAttributes}
                                colors={["#8B5CF6", "#7C3AED"]}
                                icon="layers"
                            />
                        </View>
                    </>
                }
            />
        );
    }

    function searchAndAdd() {
        return (
            <View style={styles.searchRow}>
                <View style={styles.searchBox}>
                    <Feather name="search" size={18} color={Colors.grayColor} />
                    <TextInput
                        placeholder="Search HSN sets..."
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => updateState({ isShowCreate: true })}
                >
                    <Feather name="plus" size={18} color={Colors.whiteColor} />
                    <Text style={styles.addText}>Add Set</Text>
                </TouchableOpacity>
            </View>
        );
    }

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

export default HsnSet;

const ListCard = ({ item, onDelete, onDone }) => {
    const [state, setState] = useState({
        isShowCreate: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isShowCreate } = state;
    // console.log(item);
    return (
        <View style={styles.card}>
            {/* Header */}
            <BottomPopup
                isShow={isShowCreate}
                title="Edit HSN Set"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateHSNset
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            onDone();
                        }}
                        isEdit
                        item={item}
                    />
                }
            />
            <View style={styles.header}>
                <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                </Text>
            </View>

            {/* Description */}
            {item.description ? (
                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>
            ) : null}

            {/* HSN Codes */}
            <View style={styles.chipRow}>
                {item?.hsnCodesDetails?.map((hsn) => (
                    <View key={hsn._id} style={styles.chip}>
                        <Text style={styles.chipText}>{hsn.code}</Text>
                    </View>
                ))}
            </View>
            {/* Bottom Section */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 12,
                }}
            >
                {/* Status */}
                <View
                    style={[
                        {
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderRadius: 20,
                            backgroundColor: item.isActive
                                ? "#DCFCE7"
                                : "#FEE2E2",
                        },
                    ]}
                >
                    <Text
                        style={[
                            {
                                fontSize: 12,
                                color: "#6B7280",
                                marginTop: 2,
                                color: item.isActive ? "#16A34A" : "#DC2626",
                            },
                        ]}
                    >
                        {item.isActive ? "Active" : "Inactive"}
                    </Text>
                </View>

                {/* Actions */}
                <View style={{ flexDirection: "row", marginLeft: "auto" }}>
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
        backgroundColor: Colors.whiteColor,
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    name: {
        ...Fonts.blackColor15Medium,
        flex: 1,
        marginRight: 10,
        color: Colors.primaryColor,
    },

    actions: {
        flexDirection: "row",
        marginLeft: "auto",
    },
    iconBtn: {
        padding: 6,
        marginLeft: 6,
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
    },
    description: {
        ...Fonts.grayColor14Medium,
        fontSize: 13,
        marginTop: 6,
    },

    chipRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 10,
    },

    chip: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#F9FAFB",
    },

    chipText: {
        fontSize: 12,
        color: "#111827",
        fontWeight: "500",
    },
});
