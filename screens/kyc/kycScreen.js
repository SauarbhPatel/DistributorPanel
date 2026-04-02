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
    Alert,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
    __makeLoginPostRequest,
    __postApiData,
    __verifyLoginPostRequest,
} from "../../utils/api";
import { __setLocalStorageData } from "../../utils/localStorage";
import { __setLocalization, __setToken } from "../../utils/localization";
import CommonHeader from "../../components/common/CommonHeader";
import MainCards from "../../kyc/MainCards";
import { __generateRandomString } from "../../utils/funtion";
import IdentityVerificationForm from "../../kyc/IdentityVerificationForm";
import PersonalDetailsForm from "../../kyc/PersonalDetailsForm";
import GstForm from "../../kyc/GstForm";
import WpcDetails from "../../kyc/WpcDetails";
import BankDetails from "../../kyc/BankDetails";
import { Loader } from "../../modules";

const KycScreen = ({ navigation }) => {
    // const backAction = () => {
    //     backClickCount == 1 ? BackHandler.exitApp() : _spring();
    //     return true;
    // };

    // useFocusEffect(
    //     useCallback(() => {
    //         BackHandler.addEventListener("hardwareBackPress", backAction);
    //         return () =>
    //             BackHandler.removeEventListener(
    //                 "hardwareBackPress",
    //                 backAction
    //             );
    //     }, [backAction])
    // );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000);
    }

    const [loading, setLoading] = useState(false);

    const [backClickCount, setBackClickCount] = useState(0);
    const [activeForm, setActiveForm] = useState(0);
    const [state, setState] = useState({});
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        panNumber,
        isPanVerified,
        aadhaarNumber,
        isAadharVerified,
        aadhaarDocumentUrl,
        panDocumentUrl,
        //
        name,
        alternateMobile,
        phoneNumber,
        //
        gstRegistered,
        gstNumber,
        companyName,
        distributorType,
        //
        wpcLicenseNumber,
        wpcDocumentUrl,
        //
        bankName,
        ifsc,
        accountNumber,
        accountType,
    } = state;

    const __handleCreate = async () => {
        try {
            setLoading(true);
            const data = await __postApiData("/users/distributor/register", {
                panNumber,
                isPanVerified,
                aadhaarNumber,
                aadhaarDocumentUrl,
                panVerificationRefId: "",
                panDocumentUrl,
                //
                name,
                countryCode: "+91",
                alternateMobile,
                phoneNumber,
                //

                gstRegistered,
                gstNumber,
                companyName,
                distributorType,
                //
                wpcLicenseNumber,
                wpcDocumentUrl,
                //
                bankName,
                ifsc,
                accountNumber,
                accountType,
                //
                billingAddress: [],
                deliveryAddress: [],
                // billingAddress: [
                //     {
                //         fullName: "Rahul Sharma",
                //         phone: "9876543210",
                //         email: "rahul@example.com",
                //         addressLine1: "Flat 203, Green Residency",
                //         addressLine2: "Near City Mall",
                //         city: "New Delhi",
                //         state: "Delhi",
                //         area: "string",
                //         country: "India",
                //         postalCode: "110001",
                //         gstNumber: "07ABCDE1234F1Z5",
                //     },
                // ],
                // deliveryAddress: [
                //     {
                //         fullName: "Rahul Sharma",
                //         phone: "9876543210",
                //         email: "rahul@example.com",
                //         addressLine1: "Flat 203, Green Residency",
                //         addressLine2: "Near City Mall",
                //         city: "New Delhi",
                //         state: "Delhi",
                //         area: "string",
                //         country: "India",
                //         postalCode: "110001",
                //         gstNumber: "07ABCDE1234F1Z5",
                //     },
                // ],
            });
            setLoading(false);

            console.log(data);
            if (data?.success) {
                Alert.alert("Success", data?.message, [
                    { text: "OK", onPress: () => navigation.pop() },
                ]);
            } else {
                Alert.alert("", data?.message);
            }
        } catch (error) {
            setLoading(false);
            Alert.alert("", "User already exists with this phone number");
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            {loading && <Loader />}
            <View style={{ flex: 1 }}>
                <CommonHeader title={"Complete your KYC"} />
                <FlatList
                    data={[
                        {
                            sr_no: "1",
                            title: "Identity Verification",
                            sub_title:
                                "Confirm your identity to begin the process.",
                            inputForm: (
                                <IdentityVerificationForm
                                    onClickContinue={(data) => {
                                        updateState({ ...data });
                                        setActiveForm(1);
                                    }}
                                />
                            ),
                        },
                        {
                            sr_no: "2",
                            title: "Personal Details",
                            sub_title:
                                "Enter your personal information to continue.",
                            inputForm: (
                                <PersonalDetailsForm
                                    onClickContinue={(data) => {
                                        updateState({ ...data });
                                        setActiveForm(2);
                                    }}
                                    onClickBack={() => setActiveForm(0)}
                                />
                            ),
                        },
                        {
                            sr_no: "3",
                            title: "GST & Business Details",
                            sub_title:
                                "Provide your GST and business information.",
                            inputForm: (
                                <GstForm
                                    // onClickContinue={() => {
                                    //     navigation.push("Home");
                                    // }}
                                    onClickContinue={(data) => {
                                        updateState({ ...data });
                                        setActiveForm(3);
                                    }}
                                    onClickBack={() => setActiveForm(1)}
                                />
                            ),
                        },
                        {
                            sr_no: "4",
                            title: "WPC Details",
                            sub_title: "Submit your WPC compliance details.",
                            inputForm: (
                                <WpcDetails
                                    onClickContinue={(data) => {
                                        updateState({ ...data });
                                        setActiveForm(4);
                                    }}
                                    onClickBack={() => setActiveForm(2)}
                                />
                            ),
                        },
                        {
                            sr_no: "5",
                            title: "Bank Details",
                            sub_title:
                                "Add your bank information for payments.",
                            inputForm: (
                                <BankDetails
                                    onClickContinue={(data) => {
                                        updateState({ ...data });

                                        __handleCreate();
                                    }}
                                    onClickBack={() => setActiveForm(2)}
                                />
                            ),
                        },
                        // {
                        //     sr_no: "6",
                        //     title: "Upload Document",
                        //     sub_title:
                        //         "Upload the required verification documents.",
                        // },
                        // {
                        //     sr_no: "6",
                        //     title: "Video KYC",
                        //     sub_title: "Complete a quick video verification.",
                        // },
                    ]}
                    renderItem={({ item, index }) => (
                        <MainCards {...item} isActive={index === activeForm} />
                    )}
                    keyExtractor={() => __generateRandomString(5)}
                    contentContainerStyle={{
                        gap: 10,
                        paddingTop: Sizes.fixPadding * 1.0,
                    }}
                />
            </View>
            {backClickCount == 1 ? (
                <View style={[styles.animatedView]}>
                    <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                        Press Back Once Again to Exit
                    </Text>
                </View>
            ) : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default KycScreen;
