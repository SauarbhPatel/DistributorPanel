import { SafeAreaView, View, ScrollView } from "react-native";
import { Colors } from "../../constants/styles";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData } from "../../utils/api";
import BottomPopup from "../../components/common/BottomPopup";
import CreateHSNset from "../../components/form/CreateHSNset";
import HeaderWithSearchAndFilter from "../../components/common/HeaderWithSearchAndFilter";
import HsnSetList from "../../components/taxManager/HsnSetList";
import HsnSetModel from "../../components/taxManager/HsnSetModel";
import TablePagination from "../../components/marketing/TablePagination";

const HsnSet = ({ navigation }) => {
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
                `/hsnSets/getAllHsnSets?search=${ser}&page=${page}&limit=${limit}${dropDown3?.id ? `&isActive=${dropDown3?.id.trim()}` : ""}${dropDown1?.id ? `&sortBy=${dropDown1?.id.trim()}` : ""}${dropDown2?.id ? `&sortOrder=${dropDown2?.id.trim()}` : ""}`,
            );

            console.log(res.data?.pagination);
            if (res?.success) {
                updateState({
                    list: res.data?.record || [],
                    pagination: res.data?.pagination,
                });
            }
        } catch (error) {
            console.error("Error:", error);
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
            <CommonHeader title={"HSN Set"} navigation={navigation} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 1 }}
            >
                <HeaderWithSearchAndFilter
                    search={search}
                    onChange={updateState}
                    dec="Manage HSN sets and their codes"
                    buttonName="Add HSN Set"
                    dropDownCount={3}
                    dropDown1Name="Sort by"
                    dropDown2Name="Sort By action"
                    dropDown3Name="Status"
                    searchPlaceHolder="Search name, code, description..."
                    isLoading={loading}
                    dropDown1List={[
                        { id: "name", name: "Name" },
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
                <HsnSetList
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
            <HsnSetModel
                visible={isShowCreate}
                onClose={(refresh) => {
                    updateState({ isShowCreate: false });
                    if (refresh) {
                        __handleGetData(search, 1);
                    }
                }}
            />
            {/* <BottomPopup
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
            /> */}
        </SafeAreaView>
    );
};

export default HsnSet;
