import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import BottomPopup from "../../components/common/BottomPopup";
import { Loader } from "../../modules";
import CreateGlobalProducts from "../../components/form/CreateGlobalProducts";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import HeaderWithSearchAndFilter from "../../components/common/HeaderWithSearchAndFilter";
import ProductListingList from "../../components/inventoryhub/ProductListingList";
import { __getApiData } from "../../utils/api";
import TablePagination from "../../components/marketing/TablePagination";

const MyListings = ({ navigation, route }) => {
    const [state, setState] = useState({
        loading: false,
        list: [],
        pagination: {},
        statusCount: {},
        summary: {
            totalProducts: 0,
            totalStock: 0,
            totalInventoryValue: 0,
        },
        search: "",
        dropDown1: null,
        dropDown2: null,
        dropDown3: null,
        // ,
        locationsList: [],
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        search,
        loading,
        list,
        dropDown1,
        dropDown2,
        dropDown3,
        locationsList,
        statusCount,
        summary,
    } = state;
    const __handleGetData = async (ser = "", page = 1, limit = 5) => {
        try {
            updateState({ loading: true });

            const res = await __getApiData(
                `/listings${route?.params?.api}?search=${ser}&page=${page}&limit=${limit}${dropDown1?.id ? `&status=${dropDown1?.id.trim()}` : ""}${dropDown2?.id ? `&location=${dropDown2?.id.trim()}` : ""}${dropDown3?.id ? `&fulfilledBy=${dropDown3?.id.trim()}` : ""}&sortBy=createdAt&sortOrder=asc`,
            );

            console.log(res.data?.records);
            if (res?.success) {
                updateState({
                    list: res.data?.records,
                    pagination: res.data?.pagination,
                    statusCount: res.data?.statusCount,
                    summary: res.data?.summary,
                });
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            updateState({ loading: false });
        }
    };
    const __handleGetLocationData = async (ser = "", page = 1, limit = 5) => {
        try {
            const res = await __getApiData(`/listings/locations`);
            if (res?.success) {
                updateState({
                    locationsList: res.data?.locations?.map((loca) => ({
                        id: loca?.value,
                        name: loca?.label,
                    })),
                });
            }
        } catch (error) {
        } finally {
        }
    };
    const handlePageChange = (newPage) => {
        __handleGetData(search, newPage);
    };

    useEffect(() => {
        __handleGetData(search, 1);
    }, [search, dropDown1, dropDown2, dropDown3]);

    useEffect(() => {
        __handleGetLocationData();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader
                title={route?.params?.name || "My Listings"}
                navigation={navigation}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 1 }}
            >
                <View
                    style={{
                        paddingHorizontal: 10,
                        paddingTop: 10,
                        backgroundColor: "#fff",
                    }}
                >
                    <SlaHeader
                        headerIcon={
                            <Feather name="box" size={24} color="#fff" />
                        }
                        title={route?.params?.name}
                        subTitle="View and manage your product listings"
                        buttonsCommponend={
                            <>
                                {[
                                    {
                                        name: "Total Products",
                                        value: summary?.totalProducts,
                                    },
                                    {
                                        name: "Total Stock",
                                        value: summary?.totalStock,
                                    },
                                    { name: "Selected", value: "0" },
                                    {
                                        name: "Avg. Value",
                                        value:
                                            "₹ " +
                                            summary?.totalInventoryValue?.toLocaleString(
                                                "en-IN",
                                            ),
                                    },
                                ]?.map((item) => (
                                    <TouchableOpacity
                                        key={item?.name}
                                        style={styles.status}
                                        activeOpacity={0.8}
                                    >
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 9,
                                                    fontWeight: "600",
                                                    color: "#ffffff90",
                                                }}
                                            >
                                                {item?.name}
                                            </Text>
                                            <Text style={styles.statusText}>
                                                {item?.value}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </>
                        }
                    />
                </View>
                <HeaderWithSearchAndFilter
                    search={search}
                    onChange={updateState}
                    hideExport
                    dropDownCount={3}
                    dropDown1Name="Status"
                    dropDown2Name="Location"
                    dropDown3Name="Fulfilled"
                    searchPlaceHolder="Search products, SKU, PSN..."
                    isLoading={loading}
                    dropDown1List={[
                        { id: "", name: "All Status" },
                        {
                            id: "ACTIVE",
                            name: `Active (${statusCount?.ACTIVE || 0})`,
                        },
                        {
                            id: "INACTIVE",
                            name: `In-Active (${statusCount?.INACTIVE || 0})`,
                        },
                        {
                            id: "BLOCKED",
                            name: `Blocked (${statusCount?.BLOCKED || 0})`,
                        },
                        {
                            id: "READY_FOR_ACTIVATE",
                            name: `Ready for activate (${statusCount?.READY_FOR_ACTIVATE || 0})`,
                        },
                        {
                            id: "ARCHIVED",
                            name: `Archived (${statusCount?.ARCHIVED || 0})`,
                        },
                    ]}
                    dropDown2List={locationsList}
                    dropDown3List={[
                        { id: "", name: "All" },
                        { id: "SELLER", name: "Seller" },
                        { id: "COMPANY", name: "Company" },
                    ]}
                    showClearButton
                    dropDown1={dropDown1}
                    dropDown2={dropDown2}
                    dropDown3={dropDown3}
                    onPressClearAll={() => {
                        updateState({
                            search: "",
                            dropDown1: null,
                            dropDown2: null,
                            dropDown3: null,
                        });
                    }}
                />

                <ProductListingList list={list} />
                {list?.length > 0 && (
                    <View style={{ paddingHorizontal: 16 }}>
                        <TablePagination
                            pagination={state.pagination}
                            onPageChange={handlePageChange}
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    status: {
        borderRadius: 8,
        alignSelf: "flex-start",
        paddingVertical: 8,
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        paddingHorizontal: 14,
        backgroundColor: "#FFFFFF1A",
    },
    statusText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#ffffff",
    },
});

export default MyListings;
