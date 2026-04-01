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
    ActivityIndicator,
    Switch,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData, __patchApiData } from "../../utils/api";
import BottomPopup from "../../components/common/BottomPopup";
import { Loader } from "../../modules";
import CreateTaxJurisdiction from "../../components/form/CreateTaxJurisdiction";
import JurisdictionsHeader from "../../components/masters/JurisdictionsHeader";

const TaxJurisdiction = ({ navigation }) => {
    // const [search, setSearch] = useState("");
    const [state, setState] = useState({
        loading: false,
        loading1: false,
        list: [],
        totalAttributes: 0,
        filterableAttributes: 0,
        variantAttributes: 0,
        isShowCreate: false,
        search: "",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { search, isShowCreate, loading, list } = state;

    const __handleGetData = async (ser) => {
        try {
            updateState({ loading1: true });
            const res = await __getApiData(
                `/jurisdictions/getAllJurisdictions?search=${ser}&page=1&limit=10`,
            );
            console.log(JSON.stringify(res));

            if (res?.success) {
                updateState({
                    list: res.data?.records,
                    // ...res?.data?.stats,
                });
            }
        } catch (error) {
            console.error("Error creating ticket:", error);
        } finally {
            updateState({ loading1: false });
        }
    };

    useEffect(() => {
        __handleGetData(search);
    }, [search]);

    const __handleDelete = (id) => {
        Alert.alert(
            "Delete Jurisdiction",
            "Are you sure you want to delete this Jurisdiction?",
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
                                `/jurisdictions/deleteJurisdictionById/${id}`,
                            );
                            if (res?.success) {
                                // refresh list after delete
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
                title={"Regulatory jurisdiction"}
                navigation={navigation}
            />
            <Loader isShow={loading} />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                <JurisdictionsHeader search={search} onChange={updateState} />
                <View style={{ position: "relative", marginTop: 10 }}>
                    {attributeCards()}
                </View>
            </ScrollView>
            <BottomPopup
                isShow={isShowCreate}
                title="Add Tax Jurisdiction"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateTaxJurisdiction
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            __handleGetData(search);
                        }}
                    />
                }
            />
        </SafeAreaView>
    );

    function attributeCards() {
        return (
            <View style={{}}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={
                        <>
                            {list.map((item) => (
                                <CategoryCard
                                    key={item._id}
                                    item={item}
                                    onAdd={(item) =>
                                        console.log("Add child", item)
                                    }
                                    onDone={() => __handleGetData(search)}
                                    onDelete={(item) => {
                                        __handleDelete(item._id);
                                    }}
                                    onToggle={(item, value) =>
                                        console.log("Toggle", item._id, value)
                                    }
                                />
                            ))}
                        </>
                    }
                    contentContainerStyle={{
                        paddingHorizontal: Sizes.fixPadding,
                    }}
                />
            </View>
        );
    }
};

export default TaxJurisdiction;

const CategoryCard = ({
    item,
    level = 0,
    onAdd,
    onDone,
    onDelete,
    onToggle,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [state, setState] = useState({
        isShowCreate: false,
        isShowAdd: false,
        loading: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { isShowCreate, isShowAdd } = state;

    return (
        <View
            style={[
                styles.card,
                { marginLeft: level * 16 },
                level && {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRightWidth: 0,
                },
            ]}
        >
            <BottomPopup
                isShow={isShowAdd}
                title="Add Sub-Tax Jurisdiction"
                onClose={() => updateState({ isShowAdd: false })}
                component={
                    <CreateTaxJurisdiction
                        onClose={() => {
                            updateState({ isShowAdd: false });
                            onDone();
                        }}
                        parentId={item?._id || null}
                    />
                }
            />
            <BottomPopup
                isShow={isShowCreate}
                title="Edit Tax Jurisdiction"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateTaxJurisdiction
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            onDone();
                        }}
                        isEdit
                        item={item}
                        parentId={item?.parentId || null}
                    />
                }
            />
            {/* Row */}
            <View style={{ ...styles.row, marginBottom: expanded ? 10 : 0 }}>
                {/* Left */}
                <View style={styles.left}>
                    {item.children?.length > 0 ? (
                        <TouchableOpacity
                            onPress={() => setExpanded(!expanded)}
                        >
                            <Feather
                                name={
                                    expanded ? "chevron-down" : "chevron-right"
                                }
                                size={18}
                                color="#6B7280"
                            />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: 18 }} />
                    )}

                    <MaterialIcons
                        name="folder"
                        size={20}
                        color={Colors.primaryColor}
                        style={{ marginLeft: 6 }}
                    />

                    <Text numberOfLines={1} style={styles.title}>
                        {item.name} ({item?.code})
                    </Text>
                </View>

                {/* Right */}
                <View style={styles.right}>
                    {item.enabled && (
                        <View style={styles.activeBadge}>
                            <Text style={styles.activeText}>Active</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => updateState({ isShowAdd: true })}
                    >
                        <Feather name="plus" size={18} color="#10B981" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => updateState({ isShowCreate: true })}
                    >
                        <Feather name="edit-2" size={18} color="#2563EB" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onDelete(item)}>
                        <Feather name="trash-2" size={18} color="#EF4444" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Children */}
            {expanded &&
                item.children?.map((child) => (
                    <CategoryCard
                        key={child._id}
                        item={child}
                        level={level + 1}
                        onAdd={onAdd}
                        onDone={onDone}
                        onDelete={onDelete}
                        onToggle={onToggle}
                    />
                ))}
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

    attributeCard: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        flexDirection: "row",
        elevation: 2,
    },

    attrTitleRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    attrTitle: {
        marginLeft: 8,
        ...Fonts.blackColor16Medium,
    },

    valuesRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 8,
    },
    valueChip: {
        backgroundColor: "#F3F4F6",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 6,
        marginBottom: 6,
    },
    valueText: {
        fontSize: 12,
    },

    rightSection: {
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    activeBadge: {
        backgroundColor: "#3B82F6",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    activeText: {
        color: "#fff",
        fontSize: 12,
    },
    actionRow: {
        flexDirection: "row",
        marginTop: 10,
    },
    // card
    card: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 10,
        padding: 12,
        paddingEnd: 0,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 6,
    },

    title: {
        ...Fonts.blackColor14Medium,
        marginLeft: 6,
        flexShrink: 1,
    },

    right: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginEnd: 10,
    },

    activeBadge: {
        backgroundColor: "#D1FAE5",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },

    activeText: {
        fontSize: 11,
        color: "#065F46",
        fontWeight: "600",
    },
});
