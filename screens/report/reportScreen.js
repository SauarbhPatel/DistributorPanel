import { useState } from "react";
import {
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    View,
    StatusBar,
    Image,
    StyleSheet,
    Text,
    FlatList,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Loader from "../../components/loader";
import {
    __makeLoginPostRequest,
    __verifyLoginPostRequest,
} from "../../utils/api";
import { __setLocalStorageData } from "../../utils/localStorage";
import { __setLocalization, __setToken } from "../../utils/localization";
import CommonHeader from "../../components/common/CommonHeader";
import MainCards from "../../kyc/MainCards";
import { __generateRandomString } from "../../utils/funtion";
import MostUsed from "../../components/report/MostUsed";
import Sales from "../../components/report/Sales";
import Purchase from "../../components/report/Purchase";

const ReportScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const [activeForm, setActiveForm] = useState(0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            {loading && <Loader />}
            <View style={{ flex: 1 }}>
                <CommonHeader title={"Reports"} />

                <FlatList
                    data={[
                        {
                            sr_no: "1",
                            title: "Most Used",
                            inputForm: <MostUsed navigation={navigation} />,
                        },
                        {
                            sr_no: "2",
                            title: "Sales",
                            inputForm: <Sales />,
                        },
                        {
                            sr_no: "3",
                            title: "Purchase",
                            inputForm: (
                                <Purchase
                                    navigation={navigation}
                                    list={[
                                        {
                                            title: "Purchase Order Register (Item-wise)",
                                            sub_title:
                                                "Item-wise details of all purchase orders along with delivered quantity",
                                        },
                                        {
                                            title: "Purchase Invoice Register",
                                            sub_title:
                                                "Details of all the purchase invoice along with their payment status",
                                        },
                                        {
                                            title: "Service Items Reconciliation",
                                            sub_title:
                                                "Item-wise in/out quantity against service order (minus sub-contract)",
                                        },
                                    ]}
                                />
                            ),
                        },
                        {
                            sr_no: "4",
                            title: "Products & Services",
                            inputForm: (
                                <Purchase
                                    navigation={navigation}
                                    list={[
                                        {
                                            title: "Product Price and Inventory",
                                            sub_title:
                                                "Item-wise stock in store with per unit price and stock valuation",
                                        },
                                        {
                                            title: "Product Price and Inventory (with WIP)",
                                            sub_title:
                                                "Item-wise stock in store and WIP with unit price",
                                        },
                                        {
                                            title: "Stock Movement Register",
                                            sub_title:
                                                "Total opening, in, out and closing stock for a given time frame",
                                        },
                                        {
                                            title: "Stock Adjustment",
                                            sub_title:
                                                "Details of all stock adjustments & physical stock reconciliations",
                                        },
                                        {
                                            title: "Stock Transfer",
                                            sub_title:
                                                "Item-wise list of all the stock transfer from one store to another",
                                        },
                                    ]}
                                />
                            ),
                        },
                        {
                            sr_no: "5",
                            title: "Store",
                            inputForm: (
                                <Purchase
                                    navigation={navigation}
                                    list={[
                                        {
                                            title: "Inward Register",
                                            sub_title:
                                                "Item-wise details of all the products received via inward document",
                                        },
                                        {
                                            title: "Inventory Approval Report",
                                            sub_title:
                                                "Inventory approval status with document details",
                                        },
                                        {
                                            title: "Inventory Approval Report (Item-Wise)",
                                            sub_title:
                                                "Item-wise inventory approval status along with their documents details",
                                        },
                                        {
                                            title: "GRN/Inward Invoice Mismatch",
                                            sub_title:
                                                "Item-wise comparison of PO, Inward, GRN and Invoice quantity",
                                        },
                                    ]}
                                />
                            ),
                        },
                        {
                            sr_no: "6",
                            title: "Quality",
                            inputForm: (
                                <Purchase
                                    navigation={navigation}
                                    list={[
                                        {
                                            title: "GRN/QIR Register",
                                            sub_title:
                                                "Item-wise accepted and rejected quantity via GRN document",
                                        },
                                        {
                                            title: "GRN/QIR Register (Item-wise)",
                                            sub_title:
                                                "Item-wise details of accepted & rejected goods for purchase transaction",
                                        },
                                        {
                                            title: "GRN Pending Report",
                                            sub_title:
                                                "List of inwards whose GRN is yet to be created",
                                        },
                                        {
                                            title: "GRN Pending Report (Item-wise)",
                                            sub_title:
                                                "List of item whose inward is done but GRN is yet to be created",
                                        },
                                        {
                                            title: "FG Testing Report",
                                            sub_title:
                                                "Process wise finished goods testing status",
                                        },
                                    ]}
                                />
                            ),
                        },
                        {
                            sr_no: "7",
                            title: "Dispatch",
                            inputForm: (
                                <Purchase
                                    navigation={navigation}
                                    list={[
                                        {
                                            title: "Dispatch Report",
                                            sub_title:
                                                "Invoice wise dispatch information",
                                        },
                                        {
                                            title: "Dispatch Report (Item-wise)",
                                            sub_title:
                                                "Item-wise details of all the goods dispatched via invoice",
                                        },
                                        {
                                            title: "OC Invoice Item Mismatch Report",
                                            sub_title:
                                                "Difference between item quantity in order confirmation and invoice",
                                        },
                                    ]}
                                />
                            ),
                        },
                        {
                            sr_no: "8",
                            title: "Sub-Contract",
                            inputForm: (
                                <Purchase
                                    navigation={navigation}
                                    list={[
                                        {
                                            title: "Sub-Con Details",
                                            sub_title:
                                                "Details of all the sub contract, outsourced from a production process",
                                        },
                                        {
                                            title: "Outward Register",
                                            sub_title:
                                                "Details of items which has been sent out from the store via challan",
                                        },
                                        {
                                            title: "Pending RM in Sub-Contracts",
                                            sub_title:
                                                "Pending RM quantity at job worker, based on the received goods",
                                        },
                                    ]}
                                />
                            ),
                        },
                        {
                            sr_no: "9",
                            title: "General",
                            inputForm: (
                                <Purchase
                                    navigation={navigation}
                                    list={[
                                        {
                                            title: "Profit & Loss (Sales & Purchase Invoices)",
                                            sub_title:
                                                "Profit & Loss (Sales & Purchase Invoices)",
                                        },
                                        {
                                            title: "Profit & Loss (Invoice vs Production Cost)",
                                            sub_title:
                                                "Profit & Loss (Invoice vs Production Cost)",
                                        },
                                        {
                                            title: "Selling Price vs CoGS",
                                            sub_title:
                                                "Report to compare average selling price with production cost",
                                        },
                                        {
                                            title: "Counter-Party Details",
                                            sub_title:
                                                "Userwise details of all the counter party added in your network",
                                        },
                                        {
                                            title: "Transaction Tags Report",
                                            sub_title:
                                                "List of tags attached on particular transaction",
                                        },
                                        {
                                            title: "Approval Status Report",
                                            sub_title:
                                                "Approval status of all the documents are present here",
                                        },
                                    ]}
                                />
                            ),
                        },
                        {
                            sr_no: "10",
                            title: "Production",
                            inputForm: (
                                <Purchase
                                    navigation={navigation}
                                    list={[
                                        {
                                            title: "Process Basic Information & History",
                                            sub_title:
                                                "Details of actions taken by the users in a production process",
                                        },
                                        {
                                            title: "Process Details (Item-wise)",
                                            sub_title:
                                                "Current status of processes along with item-wise details of production",
                                        },
                                        {
                                            title: "Production Report",
                                            sub_title:
                                                "Day wise overall quantity produced for each item",
                                        },
                                        {
                                            title: "FG Creation Detail Report",
                                            sub_title:
                                                "It shows date wise production and testing details of FG of each process",
                                        },
                                        {
                                            title: "Process Routing Details",
                                            sub_title:
                                                "Details of routing completed on a specific production order",
                                        },
                                        {
                                            title: "Process Routing Comment Report",
                                            sub_title:
                                                "It shows process routing wise comment",
                                        },
                                    ]}
                                />
                            ),
                        },
                        {
                            sr_no: "11",
                            title: "Accounts",
                            inputForm: (
                                <Purchase
                                    navigation={navigation}
                                    list={[
                                        {
                                            title: "Accounts Receivable",
                                            sub_title:
                                                "Details of pending receivables",
                                        },
                                        {
                                            title: "Accounts Payable",
                                            sub_title:
                                                "Details of pending payments to be made",
                                        },
                                        {
                                            title: "Receipt Register",
                                            sub_title:
                                                "Detail of all the payments, received from a customers till date",
                                        },
                                        {
                                            title: "Payment Register",
                                            sub_title:
                                                "Detail of all the payments, made to a supplier till date",
                                        },
                                        {
                                            title: "Debtors Info",
                                            sub_title:
                                                "List of all the payment and dues with respect to your buyer",
                                        },
                                        {
                                            title: "Creditors Info",
                                            sub_title:
                                                "List of all the payment and dues with respect to your supplier",
                                        },
                                    ]}
                                />
                            ),
                        },
                        {
                            sr_no: "12",
                            title: "GST",
                            inputForm: (
                                <Purchase
                                    navigation={navigation}
                                    list={[
                                        {
                                            title: "GST Sales Report",
                                            sub_title: "GST Sales Report",
                                        },
                                        {
                                            title: "GST Purchase Report",
                                            sub_title: "GST Purchase Report",
                                        },
                                        {
                                            title: "GST ITC 04",
                                            sub_title: "GST ITC 04",
                                        },
                                        {
                                            title: "GST ITC 05(A)",
                                            sub_title: "GST ITC 05(A)",
                                        },
                                    ]}
                                />
                            ),
                        },
                    ]}
                    renderItem={({ item, index }) => (
                        <MainCards
                            {...item}
                            isActive={index === activeForm}
                            onPress={() => setActiveForm(index)}
                        />
                    )}
                    keyExtractor={() => __generateRandomString(5)}
                    contentContainerStyle={{
                        gap: 10,
                        paddingTop: Sizes.fixPadding * 1.0,
                        paddingBottom: Sizes.fixPadding * 2.0,
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default ReportScreen;
