import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./components/drawerContent";
import React, { useEffect } from "react";
import LoadingScreen from "./components/loadingScreen";
import AboutAppScreen from "./screens/aboutApp/aboutAppScreen";
import AccountScreen from "./screens/account/accountScreen";
import AccountSettingScreen from "./screens/accountSetting/accountSettingScreen";
import CreateAccountScreen from "./screens/auth/createAccountScreen";
import LoginScreen from "./screens/auth/loginScreen";
import ResetPasswordScreen from "./screens/auth/resetPasswordScreen";
import BagScreen from "./screens/bag/bagScreen";
import CategoryDetailScreen from "./screens/categoryDetail/categoryDetailScreen";
import DeliveryScreen from "./screens/delivery/deliveryScreen";
import FaqScreen from "./screens/faq/faqScreen";
import FilterScreen from "./screens/filter/filterScreen";
import HomeScreen from "./screens/home/homeScreen";
import NotificationsScreen from "./screens/notifications/notificationsScreen";
import OnBoardingScreen from "./screens/onboarding/onBoardingScreen";
import OrdersScreen from "./screens/orders/ordersScreen";
import PaymentScreen from "./screens/payment/paymentScreen";
import ProductDetailScreen from "./screens/productDetail/productDetailScreen";
import ProductsScreen from "./screens/products/productsScreen";
import SearchScreen from "./screens/search/searchScreen";
import SizeChartScreen from "./screens/sizeChart/sizeChartScreen";
import SplashScreen from "./screens/splashScreen";
import WishlistScreen from "./screens/wishlist/wishlistScreen";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";
import { LogBox } from "react-native";
import LanguageScreen from "./screens/language-country/languageScreen";
import CountryScreen from "./screens/language-country/countryScreen";
import AddBillingAddress from "./screens/delivery/addBillingAddress";
import TimeSlotScreen from "./screens/slot/slotScreen";
import OrderDetailsScreen from "./screens/orders/orderDetailsScreen";
import ShippingAddressScreen from "./screens/address/shippingAddressScreen";
import BillingAddressScreen from "./screens/address/billingAddressScreen";
import ShippingAddress from "./screens/delivery/shippingAddress";
import TikectScreen from "./screens/ticket/ticketScreen";
import TicketMessage from "./screens/ticket/ticketMessage";
import TractOrderScreen from "./screens/trackOrder/trackOrderScreen";
import { setLanguage } from "./utils/language/localizationService";
import FaqListScreen from "./screens/faq/faqListScreen";
import BlogScreen from "./screens/blog/blogScreen";
import BlogListScreen from "./screens/blog/blogListScreen";
import TermsCondition from "./screens/termAndpolicey/termsCondition";
import PrivacyPolicy from "./screens/termAndpolicey/privacyPolicy";
import ReturnOrderScreen from "./screens/orders/returnOrderScreen";
import RMAScreen from "./screens/rma/rmaScreen";
import KycScreen from "./screens/kyc/kycScreen";
import SalesAndPurchaseScreen from "./screens/salesAndPurchase/salesAndPurchaseScreen";
import PurchaseOrderScreen from "./screens/purchaseOrder/purchaseOrderScreen";
import PurchaseDetailsScreen from "./screens/purchaseOrder/purchaseDetailsScreen";
import InwardDocumentScreen from "./screens/inwardDocument/inwardDocumentScreen";
import InwardDetailsScreen from "./screens/inwardDocument/inwardDetailsScreen";
import InventoryMasterScreen from "./screens/inventoryMaster/inventoryMasterScreen";
import ReportScreen from "./screens/report/reportScreen";
import ReportDetailsScreen from "./screens/reportDetails/reportDetailsScreen";
import CreateGRNScreen from "./screens/grn/CreateGRNScreen";
import GrnQualityReport from "./screens/grn/GrnQualityReport";
import DistributorScreen from "./screens/distributor/distributorScreen";
import TaskDashboardScreen from "./screens/taskDashboard/taskDashboardScreen";
import BusinessIntelligenceScreen from "./screens/BusinessIntelligence/BusinessIntelligenceScreen";
import ApprovalsScreen from "./screens/approvals/approvalsScreen";
import RawMaterialScreen from "./screens/rawMaterial/rawMaterialScreen";
import ProductionScreen from "./screens/production/productionScreen";
import BillOfMaterialsScreen from "./screens/billOfMaterials/billOfMaterialsScreen";
import AllProductionProcessScreen from "./screens/allProductionProcess/allProductionProcessScreen";
import PaymentInvoiceScreen from "./screens/payment/paymentInvoiceScreen";
import ResourcePlanningScreen from "./screens/resourcePlanning/resourcePlanningScreen";

LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen
                name="Drawer"
                component={HomeScreen}
                options={{ ...TransitionPresets.DefaultTransition }}
            />
        </Drawer.Navigator>
    );
};

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ ...TransitionPresets.DefaultTransition }}
                />
                <Stack.Screen
                    name="KycScreen"
                    component={KycScreen}
                    options={{ ...TransitionPresets.DefaultTransition }}
                />
                <Stack.Screen
                    name="CreateAccount"
                    component={CreateAccountScreen}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                />
                <Stack.Screen name="Home" component={DrawerNavigation} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                />
                <Stack.Screen name="Wishlist" component={WishlistScreen} />
                <Stack.Screen name="Bag" component={BagScreen} />
                <Stack.Screen name="Delivery" component={DeliveryScreen} />
                <Stack.Screen name="Payment" component={PaymentScreen} />
                <Stack.Screen
                    name="CategoryDetail"
                    component={CategoryDetailScreen}
                    options={{ ...TransitionPresets.DefaultTransition }}
                />
                <Stack.Screen
                    name="Products"
                    component={ProductsScreen}
                    options={{ ...TransitionPresets.DefaultTransition }}
                />
                <Stack.Screen name="Filter" component={FilterScreen} />
                <Stack.Screen
                    name="ProductDetail"
                    component={ProductDetailScreen}
                    options={{ ...TransitionPresets.DefaultTransition }}
                />
                <Stack.Screen name="SizeChart" component={SizeChartScreen} />
                <Stack.Screen name="Orders" component={OrdersScreen} />
                <Stack.Screen name="Account" component={AccountScreen} />
                <Stack.Screen
                    name="AccountSetting"
                    component={AccountSettingScreen}
                />
                <Stack.Screen name="Faq" component={FaqScreen} />
                <Stack.Screen name="FaqList" component={FaqListScreen} />
                <Stack.Screen name="Blog" component={BlogScreen} />
                <Stack.Screen name="BlogList" component={BlogListScreen} />
                <Stack.Screen name="language" component={LanguageScreen} />
                <Stack.Screen name="country" component={CountryScreen} />
                <Stack.Screen name="AboutApp" component={AboutAppScreen} />
                <Stack.Screen name="addAdress" component={AddBillingAddress} />
                <Stack.Screen name="slot" component={TimeSlotScreen} />
                <Stack.Screen
                    name="orderDetails"
                    component={OrderDetailsScreen}
                />
                <Stack.Screen
                    name="shippingAddress"
                    component={ShippingAddressScreen}
                />
                <Stack.Screen
                    name="billingAddress"
                    component={BillingAddressScreen}
                />
                <Stack.Screen name="shipping" component={ShippingAddress} />
                <Stack.Screen name="Ticket" component={TikectScreen} />
                <Stack.Screen name="TicketMessage" component={TicketMessage} />
                <Stack.Screen name="trackOrder" component={TractOrderScreen} />
                <Stack.Screen name="termCondition" component={TermsCondition} />
                <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} />
                <Stack.Screen name="return" component={ReturnOrderScreen} />
                <Stack.Screen name="rmascreen" component={RMAScreen} />
                {/*  */}
                <Stack.Screen
                    name="SalesAndPurchase"
                    component={SalesAndPurchaseScreen}
                />
                <Stack.Screen
                    name="PurchaseOrder"
                    component={PurchaseOrderScreen}
                />
                <Stack.Screen
                    name="PurchaseDetails"
                    component={PurchaseDetailsScreen}
                />
                <Stack.Screen
                    name="InwardDocument"
                    component={InwardDocumentScreen}
                />
                <Stack.Screen
                    name="InwardDetails"
                    component={InwardDetailsScreen}
                />
                <Stack.Screen
                    name="InventoryMaster"
                    component={InventoryMasterScreen}
                />
                <Stack.Screen name="Reports" component={ReportScreen} />
                <Stack.Screen
                    name="ReportDetails"
                    component={ReportDetailsScreen}
                />
                <Stack.Screen name="CreateGRN" component={CreateGRNScreen} />
                <Stack.Screen
                    name="GrnQualityReport"
                    component={GrnQualityReport}
                />
                <Stack.Screen
                    name="Distributor"
                    component={DistributorScreen}
                />
                <Stack.Screen
                    name="TaskDashboard"
                    component={TaskDashboardScreen}
                />
                <Stack.Screen
                    name="BusinessIntelligence"
                    component={BusinessIntelligenceScreen}
                />
                <Stack.Screen name="Approvals" component={ApprovalsScreen} />
                <Stack.Screen
                    name="RawMaterial"
                    component={RawMaterialScreen}
                />
                <Stack.Screen name="Production" component={ProductionScreen} />
                <Stack.Screen
                    name="BillOfMaterials"
                    component={BillOfMaterialsScreen}
                />
                <Stack.Screen
                    name="AllProductionProcess"
                    component={AllProductionProcessScreen}
                />
                <Stack.Screen
                    name="PaymentInvoice"
                    component={PaymentInvoiceScreen}
                />
                <Stack.Screen
                    name="ResourcePlanning"
                    component={ResourcePlanningScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
