import { SafeAreaView, ScrollView } from "react-native";
import { Colors } from "../../constants/styles";
import { useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __formatDate } from "../../utils/funtion";
import { Loader } from "../../modules";
import B2BSettingMSHeader from "../../components/ordershub/B2BSettingMSHeader";
import B2BSettingMSListing from "../../components/ordershub/B2BSettingMSListing";
import B2BSettingEditPrimaryModal from "../../components/ordershub/B2BSettingEditPrimaryModal";

const B2BSettingManageSecondary = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
        isShowCreate: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { loading, isShowCreate } = state;
    const [activeTab, setActiveTab] = useState("B2B Transactions");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader title={"New Order"} navigation={navigation} />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 1 }}
            >
                <B2BSettingMSHeader
                    onPress={() => {
                        updateState({ isShowCreate: true });
                    }}
                />
                <B2BSettingMSListing />
            </ScrollView>
            {/* <B2BSettingEditPrimaryModal
                visible={isShowCreate}
                onClose={() => updateState({ isShowCreate: false })}
            /> */}
        </SafeAreaView>
    );
};

export default B2BSettingManageSecondary;
