import { SafeAreaView, ScrollView, Alert } from "react-native";
import { Colors } from "../../constants/styles";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData, __postApiData } from "../../utils/api";
import BottomPopup from "../../components/common/BottomPopup";
import { __formatDate } from "../../utils/funtion";
import { Loader } from "../../modules";
import CreateCourierPartners from "../../components/form/CreateCourierPartners";
import CourierPartnersHeader from "../../components/shippingHub/CourierPartnersHeader";
import PartnersList from "../../components/shippingHub/PartnersList";
import CourierPartnerModal from "../../components/shippingHub/CourierPartnerModal";

const CourierPartners = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
        list: [],
        totalAttributes: 0,
        filterableAttributes: 0,
        variantAttributes: 0,
        isShowCreate: false,
        search: "",
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
            <CommonHeader title={"Courier Partners"} navigation={navigation} />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                <CourierPartnersHeader search={search} onChange={updateState} />
                <PartnersList onChange={updateState} />
            </ScrollView>
            <CourierPartnerModal
                visible={isShowCreate}
                onClose={() => updateState({ isShowCreate: false })}
            />
        </SafeAreaView>
    );
};

export default CourierPartners;
