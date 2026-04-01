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
import CreateTaxType from "../../components/form/CreateTaxType";
import { Loader } from "../../modules";
import HeaderWithSearchAndFilter from "../../components/common/HeaderWithSearchAndFilter";
import TaxTypeList from "../../components/taxManager/TaxTypeList";
import TaxTypeModel from "../../components/taxManager/TaxTypeModel";
import TablePagination from "../../components/marketing/TablePagination";

const TaxTypes = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
        list: [],
        pagination: {},
        isShowCreate: false,
        search: "",
        dropDown1: null,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { search, isShowCreate, loading, list, dropDown1 } = state;

    const __handleGetData = async (ser = "", page = 1, limit = 5) => {
        try {
            updateState({ loading: true });

            const res = await __getApiData(
                `/taxTypes/getAllTaxTypes?search=${ser}&page=${page}&limit=${limit}${dropDown1?.id ? `&isActive=${dropDown1?.id.trim()}` : ""}`,
            );
            if (res?.success) {
                updateState({
                    list: res.data?.records,
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
    }, [search, dropDown1]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader title={"Tax Types"} navigation={navigation} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 1 }}
            >
                <HeaderWithSearchAndFilter
                    search={search}
                    onChange={updateState}
                    dec="Manage tax type configurations"
                    buttonName="Add Tax Type"
                    searchPlaceHolder="Search name, code, description..."
                    isLoading={loading}
                    dropDownCount={1}
                    dropDown1Name="Status"
                    dropDown1List={[
                        { id: "", name: "All Status" },
                        { id: "true", name: "Active" },
                        { id: "false", name: "In-Active" },
                    ]}
                    dropDown1={dropDown1}
                />
                <TaxTypeList
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
            <TaxTypeModel
                visible={isShowCreate}
                onClose={(refresh) => {
                    updateState({ isShowCreate: false });
                    if (refresh) {
                        __handleGetData(search, 1);
                    }
                }}
            />
        </SafeAreaView>
    );
};

export default TaxTypes;
