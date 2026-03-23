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
    Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData, __postApiData } from "../../utils/api";
import { __formatDate } from "../../utils/funtion";
import { Loader } from "../../modules";
import DashboardCards from "../../components/ordershub/DashboardCards";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import AbandonedSearchFilterBar from "../../components/ordershub/AbandonedSearchFilterBar";
import AbandonedOrderList from "../../components/ordershub/AbandonedOrderList";

const AbandonedOrders = ({ navigation }) => {
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
            <CommonHeader title={"Abandoned Orders"} navigation={navigation} />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                <View style={{ marginHorizontal: 10, marginBottom: 16 }}>
                    <SlaHeader
                        title="Abandoned Orders"
                        subTitle="Track buyer travel, contact details, and recover carts. Click Abandoned ID or Buyer for details."
                        stats={[
                            { value: "11", label: "Abandond" },
                            { value: "3", label: "Recovered" },
                            {
                                label: "+3 in last hour",
                                icon: "trending-up",
                            },
                        ]}
                        colors={["#F54900", "#FE9A00", "#F0B100"]}
                        headerIcon={
                            <MaterialCommunityIcons
                                name="alert-outline"
                                size={24}
                                color="#fff"
                            />
                        }
                    />
                </View>
                <DashboardCards />
                <View style={{ marginHorizontal: 10, marginBottom: 16 }}>
                    <AbandonedSearchFilterBar />
                    <AbandonedOrderList />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AbandonedOrders;
