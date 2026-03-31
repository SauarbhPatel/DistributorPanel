import { SafeAreaView, ScrollView } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData, __postApiData } from "../../utils/api";
import BottomPopup from "../../components/common/BottomPopup";
import CreateTax from "../../components/form/CreateTax";
import { __formatDate } from "../../utils/funtion";
import HeaderWithSearchAndFilter from "../../components/common/HeaderWithSearchAndFilter";
import TaxSlabList from "../../components/taxManager/TaxSlabList";
import TaxSlabModal from "../../components/taxManager/TaxSlabModal";

const TaxMaster = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
        list: [],
        isShowCreate: false,
        search: "",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { search, isShowCreate, loading, list } = state;

    const __handleGetData = async (ser = "") => {
        try {
            updateState({ loading: ser == "" ? true : false });
            // const res = await __getApiData(`/taxes/getAllTax`);
            const res = await __getApiData(
                `/taxSlabs/getAllTaxSlabs?page=1&limit=100&search=${ser}&sortBy=name&sortOrder=desc`,
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
                    dropDownCount={2}
                    dropDown1Name="Sort by"
                    dropDown2Name="Sort By action"
                    searchPlaceHolder="Search name, code, description..."
                    isLoading={loading}
                    dropDown1List={[
                        { id: "asc", name: "Sort A-Z" },
                        { id: "desc", name: "Sort Z-A" },
                    ]}
                    dropDown2List={[
                        { id: "createdAt", name: "Sort A-Z" },
                        { id: "updatedAt ", name: "Sort Z-A" },
                    ]}
                />
                <TaxSlabList list={list} onChange={updateState} />
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
