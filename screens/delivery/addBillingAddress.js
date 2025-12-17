import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Text,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import {
    __makeAddAddressPostRequest,
    __makeShipingAddressGetRequest,
} from "../../utils/api";
import Loader from "../../components/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const AddBillingAddress = ({ navigation, route }) => {
    const [pincode, setPincode] = useState("");
    const [country, setcountry] = useState("");
    const [city, setCity] = useState("");
    const [stateValue, setStateValue] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [addressLine1, setaddressLine1] = useState("");
    const [addressLine2, setaddressLine2] = useState("");
    const [landmark, setlandmark] = useState("");
    const [province, setprovince] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [comp, setComp] = useState("");
    const [loading, setLoading] = useState(false);

    const __handleAddAddress = () => {
        setLoading(true);
        AsyncStorage.getItem("token")
            .then((data) => {
                if (!data) {
                    return Alert.alert(
                        "",
                        "You are not Login. Please login first."
                    );
                }
                __makeAddAddressPostRequest(
                    {
                        btype: route.params.type,
                        bcountry: country,
                        bstate: stateValue,
                        bcity: city,
                        bzip: pincode,
                        baddressLine1: addressLine1,
                        baddressLine2: addressLine2,
                        blandmark: landmark,
                        bprovince: province,
                        bcompany: comp,
                        bfirstname: firstname,
                        blastname: lastname,
                        bemail: email,
                        bphone: phone,
                    },
                    data
                )
                    .then((res) => {
                        console.log(JSON.stringify(res));
                        setLoading(false);
                        navigation.pop();
                    })
                    .catch((error) => {
                        console.error(error);
                        setLoading(false);
                    });
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            {loading && <Loader />}
            <View style={{ flex: 1 }}>
                {header()}

                <ScrollView showsHorizontalScrollIndicator={false}>
                    {addressInfo()}
                    {gotoPaymentButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    );

    function gotoPaymentButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => __handleAddAddress()}
                style={styles.gotoPaymentButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor14Bold }}>SAVE ADDRESS</Text>
            </TouchableOpacity>
        );
    }

    function addressInfo() {
        return (
            <>
                {firstnameTextField()}
                {lastnameTextField()}
                {companyTextField()}
                {countryTextField()}
                {stateTextField()}
                {cityTextField()}
                {pinCodeTextField()}
                {provinceTextField()}
                {addressLine1TextField()}
                {addressLine2TextField()}
                {landmarkTextField()}
                {emailTextField()}
                {phoneTextField()}
            </>
        );
    }

    function phoneTextField() {
        return (
            <TextInput
                mode="flat"
                label="Phone"
                value={phone}
                onChangeText={(text) => setphone(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }

    function companyTextField() {
        return (
            <TextInput
                mode="flat"
                label="Company"
                value={comp}
                onChangeText={(text) => setComp(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }
    function lastnameTextField() {
        return (
            <TextInput
                mode="flat"
                label="Last Name"
                value={lastname}
                onChangeText={(text) => setlastname(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }
    function firstnameTextField() {
        return (
            <TextInput
                mode="flat"
                label="First Name"
                value={firstname}
                onChangeText={(text) => setFirstname(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }
    function emailTextField() {
        return (
            <TextInput
                mode="flat"
                label="Email"
                value={email}
                onChangeText={(text) => setemail(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }
    function landmarkTextField() {
        return (
            <TextInput
                mode="flat"
                label="Landmark"
                value={landmark}
                onChangeText={(text) => setlandmark(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }
    function addressLine2TextField() {
        return (
            <TextInput
                mode="flat"
                label="AddressLine 2"
                value={addressLine2}
                onChangeText={(text) => setaddressLine2(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }
    function addressLine1TextField() {
        return (
            <TextInput
                mode="flat"
                label="AddressLine 1"
                value={addressLine1}
                onChangeText={(text) => setaddressLine1(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }

    function provinceTextField() {
        return (
            <TextInput
                mode="flat"
                label="Province"
                value={province}
                onChangeText={(text) => setprovince(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }
    function stateTextField() {
        return (
            <TextInput
                mode="flat"
                label="State"
                value={stateValue}
                onChangeText={(text) => setStateValue(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }

    function cityTextField() {
        return (
            <TextInput
                mode="flat"
                label="City"
                value={city}
                onChangeText={(text) => setCity(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }

    function countryTextField() {
        return (
            <TextInput
                mode="flat"
                label="Country"
                value={country}
                onChangeText={(text) => setcountry(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }

    function pinCodeTextField() {
        return (
            <TextInput
                mode="flat"
                label="Pin Code"
                keyboardType="numeric"
                value={pincode}
                onChangeText={(text) => setPincode(text)}
                style={styles.textFieldStyle}
                theme={{
                    colors: {
                        placeholder: Colors.lightGrayColor,
                        primary: Colors.primaryColor,
                        underlineColor: "transparent",
                    },
                }}
            />
        );
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.blackColor}
                    size={25}
                    onPress={() => navigation.pop()}
                />
                <Text
                    style={{
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.blackColor18Bold,
                    }}
                >
                    Add Address
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        elevation: 2.0,
    },
    gotoPaymentButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding + 5.0,
        elevation: 10.0,
    },
    textFieldStyle: {
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding + 5.0,
        ...Fonts.blackColor15SemiBold,
        backgroundColor: "transparent",
    },
});

export default AddBillingAddress;
