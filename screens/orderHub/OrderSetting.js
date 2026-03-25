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
import ComingSoon from "../../components/ordershub/ComingSoon";
const tabsData = {
    "Order Status Manager": {
        title: "",
        des: "",
        buttonName: "Create New Status",
        isShowFilter: true,
    },
    "Transition Rules": {
        title: "",
        des: "",
        isShowFilter: true,
        buttonName: "Create New Status",
        // hideAllButton: true,
    },
    "Role Permissions": {
        title: "Role Permissions",
        des: "Create, edit, or delete permission rows. Assign which roles (Admin, Seller, Warehouse, Buyer) can perform each action.",
        hideAllButton: true,
    },
    "Audit Logs": {
        title: "Audit Logs",
        des: "Who changed order status, from/to values, and when. Reporting-ready. Coming soon.",
        hideAllButton: true,
    },
};
const OrderSetting = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { loading } = state;
    const [activeTab, setActiveTab] = useState("Order Status Manager");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader title={"Order Settings"} navigation={navigation} />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 1 }}
            >
                <B2BSettingsHeader
                    title="Order Settings"
                    subTitle="Dynamic order statuses (Level 1 + Level 2), transition rules, role  permissions, and audit. Manage lifecycle without code changes."
                    tabsData={tabsData[activeTab]}
                />
                <B2BTransactionsCom
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabsData={tabsData}
                    tabs={[
                        "Order Status Manager",
                        "Transition Rules",
                        "Role Permissions",
                        "Audit Logs",
                    ]}
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
                {activeTab == "Audit Logs" ? (
                    <>
                        <ComingSoon />
                    </>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderSetting;
