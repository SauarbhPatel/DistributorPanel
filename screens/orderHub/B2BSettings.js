import { SafeAreaView, ScrollView } from "react-native";
import { Colors } from "../../constants/styles";
import { useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __formatDate } from "../../utils/funtion";
import { Loader } from "../../modules";
import B2BSettingsHeader from "../../components/ordershub/B2BSettingsHeader";
import B2BTransactionsCom from "../../components/ordershub/B2BTransactionsCom";
import B2BSettingCreatedCategoriesList from "../../components/ordershub/B2BSettingCreatedCategoriesList";
import B2BSettingOrdersList from "../../components/ordershub/B2BSettingOrdersList";
import B2BSettingStatusManagementList from "../../components/ordershub/B2BSettingStatusManagementList";
import B2BSettingTransitionRules from "../../components/ordershub/B2BSettingTransitionRules";
import B2BSettingRolePermissions from "../../components/ordershub/B2BSettingRolePermissions";
const tabsData = {
    "B2B Transactions": {
        title: "B2B Transactions by Leaf Category",
        des: "Map leaf categories to enable B2B transactions. When enabled, the B2B  order button appears on the front for products in that category. GSTIN is mandatory for all B2B transactions.",
        buttonName: "Create & map category",
    },
    "Demo Data": {
        title: "B2B Demo Orders",
        des: "Seed the B2B Orders page with demo data. This data is separate from  Order Management and will not affect it. After seeding, go to o see the table.",
        buttonName: "Create B2B demo orders",
    },
    "Order Status Manager": {
        title: "",
        des: "These primary and secondary statuses are the same ones used in the B2B  Orders status header. Any change you make here is reflected on the B2B  Orders page when you go back.",
        buttonName: "Create New Status",
        isShowFilter: true,
    },
    "Transition Rules": {
        title: "",
        des: "These primary and secondary statuses are the same ones used in the B2B  Orders status header. Any change you make here is reflected on the B2B  Orders page when you go back.",
        isShowFilter: true,
        hideAllButton: true,
    },
    "Role Permissions": {
        title: "Role Permissions",
        des: "Create, edit, or delete permission rows. Assign which roles (Admin, Seller, Warehouse, Buyer) can perform each action.",
        hideAllButton: true,
    },
    Inactive: {
        title: "",
        des: "",
    },
};
const B2BSettings = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { loading } = state;
    const [activeTab, setActiveTab] = useState("B2B Transactions");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader title={"B2B Settings"} navigation={navigation} />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 1 }}
            >
                <B2BSettingsHeader tabsData={tabsData[activeTab]} />
                <B2BTransactionsCom
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabsData={tabsData}
                />

                {activeTab == "B2B Transactions" ? (
                    <>
                        <B2BSettingCreatedCategoriesList />
                    </>
                ) : null}
                {activeTab == "Demo Data" ? (
                    <>
                        <B2BSettingOrdersList />
                    </>
                ) : null}
                {activeTab == "Order Status Manager" ? (
                    <>
                        <B2BSettingStatusManagementList
                            navigation={navigation}
                        />
                    </>
                ) : null}
                {activeTab == "Transition Rules" ? (
                    <>
                        <B2BSettingTransitionRules />
                    </>
                ) : null}
                {activeTab == "Role Permissions" ? (
                    <>
                        <B2BSettingRolePermissions />
                    </>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export default B2BSettings;
