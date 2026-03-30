import { SafeAreaView, ScrollView } from "react-native";
import { Colors } from "../../constants/styles";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData } from "../../utils/api";
import HeaderWithSearchAndFilter from "../../components/common/HeaderWithSearchAndFilter";
import HsnCodeList from "../../components/taxManager/HsnCodeList";
import HsnCodeModel from "../../components/taxManager/HsnCodeModel";
import InvoiceTemplateList from "../../components/taxManager/InvoiceTemplateList";
import TemplateModel from "../../components/taxManager/TemplateModel";

const InvoiceTemplate = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
        search: "",
        list: [],
        isShowCreate: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { search, isShowCreate, loading, list } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader title={"Invoice Template"} navigation={navigation} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 1 }}
            >
                <HeaderWithSearchAndFilter
                    search={search}
                    onChange={updateState}
                    dec="Configure invoice layout, GSTIN display, HSN, tax breakdown, reverse charge note (Step 11)."
                    buttonName="Add Invoice Template"
                    dropDownCount={2}
                    dropDown1Name="Sort by"
                    dropDown2Name="Sort By action"
                    searchPlaceHolder="Search name, code, description..."
                    isLoading={loading}
                />
                <InvoiceTemplateList list={list} onChange={updateState} />
            </ScrollView>
            <TemplateModel
                visible={isShowCreate}
                onClose={() => updateState({ isShowCreate: false })}
            />
        </SafeAreaView>
    );
};

export default InvoiceTemplate;
