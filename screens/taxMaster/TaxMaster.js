import { SafeAreaView, ScrollView, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData, __postApiData } from "../../utils/api";
import { __formatDate } from "../../utils/funtion";
import HeaderWithSearchAndFilter from "../../components/common/HeaderWithSearchAndFilter";
import TaxSlabList from "../../components/taxManager/TaxSlabList";
import TaxSlabModal from "../../components/taxManager/TaxSlabModal";
import TablePagination from "../../components/marketing/TablePagination";

const TaxMaster = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
        list: [],
        pagination: {},
        isShowCreate: false,
        search: "",
        dropDown1: null,
        dropDown2: null,
        dropDown3: null,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        search,
        isShowCreate,
        loading,
        list,
        dropDown1,
        dropDown2,
        dropDown3,
    } = state;

    const __handleGetData = async (ser = "", page = 1, limit = 5) => {
        try {
            updateState({ loading: true });
            const res = await __getApiData(
                `/taxSlabs/getAllTaxSlabs?search=${ser}&page=${page}&limit=${limit}${dropDown3?.id ? `&isActive=${dropDown3?.id.trim()}` : ""}${dropDown1?.id ? `&sortBy=${dropDown1?.id.trim()}` : ""}${dropDown2?.id ? `&sortOrder=${dropDown2?.id.trim()}` : ""}`,
            );
            if (res?.success) {
                updateState({
                    list: res.data?.records,
                    pagination: res.data?.pagination,
                });
            }
        } catch (error) {
            console.error("Error creating ticket:", error);
        } finally {
            updateState({ loading: false });
        }
    };

    const handlePageChange = (newPage) => {
        __handleGetData(search, newPage);
    };

    useEffect(() => {
        __handleGetData(search, 1);
    }, [search, dropDown1, dropDown2, dropDown3]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader
                title={"Tax Slab Master (GST Rate)"}
                navigation={navigation}
            />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 1 }}
            >
                <HeaderWithSearchAndFilter
                    search={search}
                    onChange={updateState}
                    dec="Tax percentage groups, effective dates, historical tracking."
                    buttonName="Add Tax Slab"
                    searchPlaceHolder="Search name, code, description..."
                    isLoading={loading}
                    dropDownCount={3}
                    dropDown1Name="Sort by"
                    dropDown2Name="Sort By action"
                    dropDown3Name="Status"
                    dropDown1List={[
                        { id: "name", name: "Name" },
                        { id: "code", name: "Code" },
                        { id: "rate", name: "Rate" },
                        { id: "createdAt", name: "Recently Created" },
                        { id: "updatedAt ", name: "Recently Updated" },
                    ]}
                    dropDown2List={[
                        { id: "asc", name: "Sort A-Z" },
                        { id: "desc", name: "Sort Z-A" },
                    ]}
                    dropDown3List={[
                        { id: "", name: "All Status" },
                        { id: "true", name: "Active" },
                        { id: "false", name: "In-Active" },
                    ]}
                    dropDown1={dropDown1}
                    dropDown2={dropDown2}
                    dropDown3={dropDown3}
                />
                <TaxSlabList
                    list={list}
                    onChange={updateState}
                    onDone={() => {
                        __handleGetData(search, 1);
                    }}
                />
                {list?.length > 0 && (
                    <View style={{ paddingHorizontal: 16 }}>
                        <TablePagination
                            pagination={state.pagination}
                            onPageChange={handlePageChange}
                        />
                    </View>
                )}
            </ScrollView>
            <TaxSlabModal
                visible={isShowCreate}
                onClose={() => updateState({ isShowCreate: false })}
            />
            {/* <BottomPopup
                isShow={isShowCreate}
                title="Add Tax Master"
                onClose={() => updateState({ isShowCreate: false })}
                component={
                    <CreateTax
                        onClose={() => {
                            updateState({ isShowCreate: false });
                            __handleGetData(search);
                        }}
                    />
                }
            /> */}
        </SafeAreaView>
    );
};

export default TaxMaster;
