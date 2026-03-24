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
import ProductManagement from "./screens/productManagement/productManagement";
import ProductAttributes from "./screens/productAttributes/productAttributes";
import AttributeSets from "./screens/attributeSets/attributeSets";
import HsnCodes from "./screens/hsnCodes/hsnCodes";
import DistributorLoginScreen from "./screens/auth/distributorLoginScreen";
import BrandMaster from "./screens/brandMaster/brandMaster";
import TaxTypes from "./screens/taxTypes/taxTypes";
import TaxMaster from "./screens/taxMaster/TaxMaster";
import HsnSet from "./screens/hsnCodes/hsnSet";
import CategoryManagment from "./screens/categoryManagment/categoryManagment";
import GlobalProducts from "./screens/globalProducts/globalProducts";
import GenericProducts from "./screens/genericProducts/genericProducts";
import ProductListings from "./screens/productListings/productListings";
import TaxJurisdiction from "./screens/taxJurisdiction/taxJurisdiction";
import CategoryTaxMapping from "./screens/categoryTaxMapping/categoryTaxMapping";
import DocumentMaster from "./screens/documentMaster/documentMaster";
import InventoryHub from "./screens/inventoryHub/inventoryHub";
import MyListings from "./screens/inventoryHub/myListings";
import ComplianceHub from "./screens/complianceHub/complianceHub";
import CategoryConditions from "./screens/categoryConditions/categoryConditions";
import MarketplacePolicies from "./screens/marketplacePolicies/marketplacePolicies";
import RiskMonitoring from "./screens/riskMonitoring/riskMonitoring";
import ReportsCompliance from "./screens/reportsCompliance/reportsCompliance";
import AuditLogsCompliance from "./screens/auditLogsCompliance/auditLogsCompliance";
import ShippingZones from "./screens/shippingHub/shippingZones";
import ShippingHub from "./screens/shippingHub/shippingHub";
import ShippingMethods from "./screens/shippingHub/shippingMethods";
import CourierPartners from "./screens/shippingHub/courierPartners";
import Manufacturers from "./screens/manufacturers/manufacturers";
import Directory from "./screens/manufacturers/directory";
import Onboarding from "./screens/manufacturers/onboarding";
import OnboardingDetails from "./screens/manufacturers/onboardingDetails";
import AllMaster from "./screens/master/AllMaster";
import UomMaster from "./screens/master/uomMaster";
import OrderHub from "./screens/orderHub/orderHub";
import OrdersManagement from "./screens/orderHub/OrdersManagement";
import AbandonedOrders from "./screens/orderHub/AbandonedOrders";
import B2BOrders from "./screens/orderHub/B2BOrders";
import CurrencyMaster from "./screens/master/CurrencyMaster";
import PaymentMethodsMaster from "./screens/master/PaymentMethodsMaster";
import CheckoutTemplates from "./screens/master/CheckoutTemplates";
import SlaSetting from "./screens/slaSetting/slaSetting";
import SlaPolicyBuilder from "./screens/slaSetting/slaPolicyBuilder";
import SlaMilestoneDropdownOptions from "./screens/slaSetting/slaMilestoneDropdownOptions";
import SlaRulesAndPriority from "./screens/slaSetting/slaRulesAndPriority";
import SlaPolicyBuilderDetails from "./screens/slaSetting/slaPolicyBuilderDetails";
import SlaCourierCut from "./screens/slaSetting/slaCourierCut";
import SlaHolidayWorkingHours from "./screens/slaSetting/slaHolidayWorkingHours";
import SlaBreachQueue from "./screens/slaSetting/slaBreachQueue";
import SlaRewardAndPenalty from "./screens/slaSetting/slaRewardAndPenalty";
import SlaGenerateReport from "./screens/slaSetting/slaGenerateReport";
import SlaDashboard from "./screens/slaSetting/slaDashboard";
import SlaMySlaDashboard from "./screens/slaSetting/slaMySlaDashboard";
import SlaOrdersAtRisk from "./screens/slaSetting/slaOrdersAtRisk";
import SlaBreachedOrders from "./screens/slaSetting/slaBreachedOrders";
import MarketinDashboard from "./screens/marketinDashboard/marketinDashboard";
import MarketingGoogle from "./screens/marketinDashboard/marketingGoogle";
import MarketingGoogleAnalytics from "./screens/marketinDashboard/marketingGoogleAnalytics";
import MarketingMeta from "./screens/marketinDashboard/marketingMeta";
import MarketingMetaAnalytics from "./screens/marketinDashboard/marketingMetaAnalytics";
import B2BSettings from "./screens/orderHub/B2BSettings";
import B2BSettingManageSecondary from "./screens/orderHub/B2BSettingManageSecondary";

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
                    name="DistributorLogin"
                    component={DistributorLoginScreen}
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
                <Stack.Screen
                    name="ProductManagement"
                    component={ProductManagement}
                />
                <Stack.Screen
                    name="ProductAttributes"
                    component={ProductAttributes}
                />
                <Stack.Screen
                    name="CategoryManagment"
                    component={CategoryManagment}
                />
                <Stack.Screen name="AttributeSets" component={AttributeSets} />
                <Stack.Screen name="HsnCodes" component={HsnCodes} />
                <Stack.Screen name="HsnSet" component={HsnSet} />
                <Stack.Screen name="BrandMaster" component={BrandMaster} />
                <Stack.Screen
                    name="TaxJurisdiction"
                    component={TaxJurisdiction}
                />
                <Stack.Screen name="TaxTypes" component={TaxTypes} />
                <Stack.Screen name="TaxMaster" component={TaxMaster} />
                <Stack.Screen
                    name="GlobalProducts"
                    component={GlobalProducts}
                />
                <Stack.Screen
                    name="GenericProducts"
                    component={GenericProducts}
                />
                <Stack.Screen
                    name="ProductListings"
                    component={ProductListings}
                />
                <Stack.Screen
                    name="CategoryTaxMapping"
                    component={CategoryTaxMapping}
                />
                <Stack.Screen
                    name="DocumentMaster"
                    component={DocumentMaster}
                />
                <Stack.Screen name="InventoryHub" component={InventoryHub} />
                <Stack.Screen name="MyListings" component={MyListings} />
                <Stack.Screen name="ComplianceHub" component={ComplianceHub} />
                <Stack.Screen
                    name="CategoryConditions"
                    component={CategoryConditions}
                />
                <Stack.Screen
                    name="MarketplacePolicies"
                    component={MarketplacePolicies}
                />
                <Stack.Screen
                    name="RiskMonitoring"
                    component={RiskMonitoring}
                />
                <Stack.Screen
                    name="ReportsCompliance"
                    component={ReportsCompliance}
                />
                <Stack.Screen
                    name="AuditLogsCompliance"
                    component={AuditLogsCompliance}
                />
                <Stack.Screen name="ShippingHub" component={ShippingHub} />
                <Stack.Screen name="ShippingZones" component={ShippingZones} />
                <Stack.Screen
                    name="ShippingMethods"
                    component={ShippingMethods}
                />
                <Stack.Screen
                    name="CourierPartners"
                    component={CourierPartners}
                />
                <Stack.Screen name="Manufacturers" component={Manufacturers} />
                <Stack.Screen name="Directory" component={Directory} />
                <Stack.Screen
                    name="OnboardingManufacturers"
                    component={Onboarding}
                />
                <Stack.Screen
                    name="OnboardingDetails"
                    component={OnboardingDetails}
                />
                <Stack.Screen name="AllMaster" component={AllMaster} />
                <Stack.Screen name="UomMaster" component={UomMaster} />
                <Stack.Screen
                    name="CurrencyMaster"
                    component={CurrencyMaster}
                />
                <Stack.Screen
                    name="PaymentMethodsMaster"
                    component={PaymentMethodsMaster}
                />
                <Stack.Screen
                    name="CheckoutTemplates"
                    component={CheckoutTemplates}
                />
                <Stack.Screen name="OrderHub" component={OrderHub} />
                <Stack.Screen
                    name="OrdersManagement"
                    component={OrdersManagement}
                />
                <Stack.Screen
                    name="AbandonedOrders"
                    component={AbandonedOrders}
                />
                <Stack.Screen name="B2BOrders" component={B2BOrders} />
                <Stack.Screen name="B2BSettings" component={B2BSettings} />
                <Stack.Screen
                    name="B2BSettingManageSecondary"
                    component={B2BSettingManageSecondary}
                />

                {/* SLA Settings */}
                <Stack.Screen name="SlaSetting" component={SlaSetting} />
                <Stack.Screen
                    name="SlaPolicyBuilder"
                    component={SlaPolicyBuilder}
                />
                <Stack.Screen
                    name="SlaPolicyBuilderDetails"
                    component={SlaPolicyBuilderDetails}
                />
                <Stack.Screen
                    name="SlaMilestoneDropdownOptions"
                    component={SlaMilestoneDropdownOptions}
                />
                <Stack.Screen
                    name="SlaRulesAndPriority"
                    component={SlaRulesAndPriority}
                />
                <Stack.Screen name="SlaCourierCut" component={SlaCourierCut} />
                <Stack.Screen
                    name="SlaHolidayWorkingHours"
                    component={SlaHolidayWorkingHours}
                />
                <Stack.Screen
                    name="SlaBreachQueue"
                    component={SlaBreachQueue}
                />
                <Stack.Screen
                    name="SlaRewardAndPenalty"
                    component={SlaRewardAndPenalty}
                />
                <Stack.Screen
                    name="SlaGenerateReport"
                    component={SlaGenerateReport}
                />
                <Stack.Screen name="SlaDashboard" component={SlaDashboard} />
                <Stack.Screen
                    name="SlaMySlaDashboard"
                    component={SlaMySlaDashboard}
                />
                <Stack.Screen
                    name="SlaOrdersAtRisk"
                    component={SlaOrdersAtRisk}
                />
                <Stack.Screen
                    name="SlaBreachedOrders"
                    component={SlaBreachedOrders}
                />
                {/* Marketing */}
                <Stack.Screen
                    name="MarketinDashboard"
                    component={MarketinDashboard}
                />
                <Stack.Screen
                    name="MarketingGoogle"
                    component={MarketingGoogle}
                />
                <Stack.Screen
                    name="MarketingGoogleAnalytics"
                    component={MarketingGoogleAnalytics}
                />
                <Stack.Screen name="MarketingMeta" component={MarketingMeta} />
                <Stack.Screen
                    name="MarketingMetaAnalytics"
                    component={MarketingMetaAnalytics}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
