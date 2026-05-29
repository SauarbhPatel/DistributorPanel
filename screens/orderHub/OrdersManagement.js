// import { SafeAreaView, ScrollView, Alert } from "react-native";
// import { Colors } from "../../constants/styles";
// import { useEffect, useState } from "react";
// import CommonHeader from "../../components/common/CommonHeader";
// import { __deleteApiData, __getApiData, __postApiData } from "../../utils/api";
// import { __formatDate } from "../../utils/funtion";
// import { Loader } from "../../modules";
// import B2BDashboardBanner from "../../components/ordershub/B2BDashboardBanner";
// import B2BSearchFilterBar from "../../components/ordershub/B2BSearchFilterBar";
// import B2BOrderStatusDashboard from "../../components/ordershub/B2BOrderStatusDashboard";
// import B2BAdvancedSearchFilterBar from "../../components/ordershub/B2BAdvancedSearchFilterBar";
// import B2BOrderListing from "../../components/ordershub/B2BOrderListing";

// const OrdersManagement = ({ navigation }) => {
//     const [state, setState] = useState({
//         loading: false,
//     });

//     const updateState = (data) => setState((state) => ({ ...state, ...data }));

//     const { loading } = state;

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
//             <CommonHeader title={"Orders Management"} navigation={navigation} />
//             <Loader isShow={loading} />
//             <ScrollView
//                 contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
//             >
//                 <B2BDashboardBanner
//                     liveText="Live Dashboard"
//                     title="Orders Management System"
//                     subTitle="Manage and track all your orders efficiently. Follow the workflow: New Orders → Verification → Processing → Ready to Ship → In Transit → Delivered."
//                     cardTitle="Quick tip for efficient order management"
//                     cardSubTitle="Use bulk actions to process multiple orders at once and save time."
//                     cardButtonText="View Tutorial"
//                 />
//                 <B2BSearchFilterBar />
//                 <B2BOrderStatusDashboard />
//                 <B2BAdvancedSearchFilterBar />
//                 <B2BOrderListing />
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default OrdersManagement;

import { SafeAreaView, ScrollView } from "react-native";
import { Colors } from "../../constants/styles";
import { useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { Loader } from "../../modules";
import B2BDashboardBanner from "../../components/ordershub/B2BDashboardBanner";
import B2BSearchFilterBar from "../../components/ordershub/B2BSearchFilterBar";
import B2BOrderStatusDashboard from "../../components/ordershub/B2BOrderStatusDashboard";
import B2BAdvancedSearchFilterBar from "../../components/ordershub/B2BAdvancedSearchFilterBar";
import B2BOrderListing from "../../components/ordershub/B2BOrderListing";

const OrdersManagement = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
        selectedStatus: "PENDING",
        selectedVerification: null,
    });

    const updateState = (data) => setState((s) => ({ ...s, ...data }));
    const { loading, selectedStatus, selectedVerification } = state;

    const handleStatusSelect = (status, verificationStatus = null) => {
        updateState({
            selectedStatus: status,
            selectedVerification: verificationStatus,
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader title={"Orders Management"} navigation={navigation} />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
            >
                <B2BDashboardBanner
                    liveText="Live Dashboard"
                    title="Orders Management System"
                    subTitle="Manage and track all your orders efficiently."
                    cardTitle="Quick tip for efficient order management"
                    cardSubTitle="Use bulk actions to process multiple orders at once."
                    cardButtonText="View Tutorial"
                />

                <B2BSearchFilterBar />

                {/* Dynamic dashboard — tapping a card calls handleStatusSelect */}
                <B2BOrderStatusDashboard
                    selectedStatus={selectedStatus}
                    onStatusSelect={handleStatusSelect}
                />

                <B2BAdvancedSearchFilterBar />

                {/* Pass selected filters to listing */}
                <B2BOrderListing
                    selectedStatus={selectedStatus}
                    selectedVerification={selectedVerification}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrdersManagement;
