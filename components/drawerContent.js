import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    ScrollView,
} from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome5,
} from "@expo/vector-icons";
import { Dialog } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalizedString } from "../utils/language/localizationService";
import { __makeGetProfileDetailsGetRequest } from "../utils/api";
import { __cleanLocalization, __getToken } from "../utils/localization";
import { __cleanLocalStorageData } from "../utils/localStorage";

const { width } = Dimensions.get("window");

const CustomDrawer = (props) => {
    const [logoutDialog, setLogoutDialog] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const [userDetails, setuserDetails] = useState({
        profile: "",
        name: "",
        mobile: "",
    });

    const getLoginStatus = () => {
        const token = __getToken();
        token ? setLoginStatus(true) : setLoginStatus(false);
        __makeGetProfileDetailsGetRequest(token)
            .then((res) => {
                setuserDetails({
                    profile: res?.getaUser?.profilePhoto?.url,
                    name: res?.getaUser?.firstname,
                    mobile: res?.getaUser?.mobile,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        getLoginStatus();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: Colors.whiteColor,
                }}
                showsVerticalScrollIndicator={false}
            >
                {drawerContent()}
            </DrawerContentScrollView>
            {logoutInfo()}
        </View>
    );

    function logoutInfo() {
        return (
            <Dialog
                visible={logoutDialog}
                onRequestClose={() => {
                    setLogoutDialog(false);
                }}
                overlayStyle={styles.dialogWrapStyle}
            >
                <View style={{ backgroundColor: Colors.whiteColor }}>
                    <Text style={{ ...Fonts.blackColor18Bold }}>
                        {getLocalizedString("Confirm")}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginVertical: Sizes.fixPadding * 2.0,
                        }}
                    >
                        {getLocalizedString("Are you Sure want to Logout?")}
                    </Text>
                    <View style={styles.closeAndLogoutTextWrapStyle}>
                        <Text
                            onPress={() => setLogoutDialog(false)}
                            style={{ ...Fonts.primaryColor13SemiBold }}
                        >
                            {getLocalizedString("Close")}
                        </Text>
                        <Text
                            onPress={async () => {
                                await __cleanLocalStorageData();
                                __cleanLocalization();
                                setLogoutDialog(false);
                                props.navigation.push("Login");
                            }}
                            style={{
                                marginLeft: Sizes.fixPadding * 2.0,
                                ...Fonts.primaryColor13SemiBold,
                            }}
                        >
                            {getLocalizedString("Logout")}
                        </Text>
                    </View>
                </View>
            </Dialog>
        );
    }

    function drawerContent() {
        return (
            <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
                <View style={{ ...styles.appIconBackgroundStyle }}>
                    <Image
                        source={require("../assets/images/baofeng_radios.png")}
                        style={[
                            {
                                width: !loginStatus ? 120.0 : 100,
                                height: !loginStatus ? 30.0 : 40,
                            },
                            loginStatus && {
                                position: "absolute",
                                top: 0,
                                right: 10,
                            },
                        ]}
                        resizeMode="contain"
                    />
                    {loginStatus && (
                        <View
                            style={{
                                alignItems: "center",
                                flexDirection: "row",
                                marginTop: 20,
                                width: "100%",
                                paddingHorizontal: 20,
                                gap: 10,
                            }}
                        >
                            <Image
                                source={
                                    userDetails?.profile
                                        ? { uri: userDetails?.profile }
                                        : require("../assets/images/user.png")
                                }
                                style={{
                                    width: 60.0,
                                    height: 60.0,
                                    borderRadius: 50.0,
                                }}
                                resizeMode="contain"
                            />
                            <View style={{}}>
                                <Text
                                    style={{
                                        ...Fonts.blackColor18Bold,
                                        paddingStart: 5,
                                    }}
                                    numberOfLines={1}
                                >
                                    {userDetails?.name || "Saurabh Patel"}
                                    {/* {userDetails?.name || "***** ****"} */}
                                </Text>
                                <Text style={{ ...Fonts.blackColor13Medium }}>
                                    {userDetails?.mobile}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* <View style={{ marginHorizontal: Sizes.fixPadding + 5.0 }}>
                        {category({ categoryName: "MEN" })}
                        {category({ categoryName: "WOMEN" })}
                        {category({ categoryName: "KIDS" })}
                        {category({ categoryName: "HOME & LIVING" })}
                        {category({ categoryName: "BEAUTY" })}
                    </View>
                    {drawerDivider()} */}
                    {/* {loginStatus && (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => props.navigation.push("Account")}
                        >
                            {drawerItems({
                                icon: (
                                    <MaterialIcons
                                        name="person"
                                        size={22}
                                        color={Colors.grayColor}
                                    />
                                ),
                                title: "My Account",
                            })}
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => props.navigation.push("Orders")}
                    >
                        {drawerItems({
                            icon: (
                                <MaterialCommunityIcons
                                    name="wallet"
                                    color={Colors.grayColor}
                                    size={22}
                                />
                            ),
                            title: "My Orders",
                        })}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => props.navigation.push("Bag")}
                    >
                        {drawerItems({
                            icon: (
                                <FontAwesome5
                                    name="shopping-bag"
                                    size={22}
                                    color={Colors.grayColor}
                                />
                            ),
                            title: "My Bag",
                        })}
                    </TouchableOpacity>
                    {loginStatus && (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => props.navigation.push("Wishlist")}
                        >
                            {drawerItems({
                                icon: (
                                    <MaterialIcons
                                        name="favorite-border"
                                        size={22}
                                        color={Colors.grayColor}
                                    />
                                ),
                                title: "My Wishlist",
                            })}
                        </TouchableOpacity>
                    )}

                    {loginStatus && (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>
                                props.navigation.push("shippingAddress")
                            }
                        >
                            {drawerItems({
                                icon: (
                                    <MaterialIcons
                                        name="location-pin"
                                        size={22}
                                        color={Colors.grayColor}
                                    />
                                ),
                                title: "My Shipping Address",
                            })}
                        </TouchableOpacity>
                    )}
                    {loginStatus && (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>
                                props.navigation.push("billingAddress")
                            }
                        >
                            {drawerItems({
                                icon: (
                                    <MaterialIcons
                                        name="location-pin"
                                        size={22}
                                        color={Colors.grayColor}
                                    />
                                ),
                                title: "My Billing Address",
                            })}
                        </TouchableOpacity>
                    )}
                    {loginStatus && (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => props.navigation.push("rmascreen")}
                        >
                            {drawerItems({
                                icon: (
                                    <MaterialIcons
                                        name="view-list"
                                        size={22}
                                        color={Colors.grayColor}
                                    />
                                ),
                                title: "RMA",
                            })}
                        </TouchableOpacity>
                    )} */}
                    {drawerDivider()}
                    <View style={{ marginHorizontal: Sizes.fixPadding + 5.0 }}>
                        {/* <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => props.navigation.push("country")}
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Change Country")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => props.navigation.push("language")}
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Change Language")}
                            </Text>
                        </TouchableOpacity> */}
                        {/* {loginStatus && (
                            <TouchableOpacity
                                onPress={() =>
                                    props.navigation.push("trackOrder")
                                }
                            >
                                <Text
                                    style={{
                                        marginVertical: Sizes.fixPadding - 5.0,
                                        ...Fonts.grayColor14SemiBold,
                                    }}
                                >
                                    {getLocalizedString("Track My Order")}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {loginStatus && (
                            <TouchableOpacity
                                onPress={() => props.navigation.push("Ticket")}
                            >
                                <Text
                                    style={{
                                        marginVertical: Sizes.fixPadding - 5.0,
                                        ...Fonts.grayColor14SemiBold,
                                    }}
                                >
                                    {getLocalizedString("Support Ticket")}
                                </Text>
                            </TouchableOpacity>
                        )} */}
                        <TouchableOpacity
                            onPress={() => props.navigation.push("RawMaterial")}
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Raw Material")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.push("SalesAndPurchase")
                            }
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Sales & Purchase")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.push("BusinessIntelligence")
                            }
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Business Intelligence")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.push("Approvals")}
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Approvals")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.push("Distributor")}
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Distributor")}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.push("InventoryMaster")
                            }
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Inventory")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.push("Production")}
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Production")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.push("Payment")}
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Payments")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.push("ResourcePlanning")
                            }
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Resource Planning")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.push("Reports")}
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Reports & Intelligence")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("AI Marketing Studio")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.push("TaskDashboard")
                            }
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Task Dashboard")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Setting")}
                            </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={() => props.navigation.push("Faq")}
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("FAQ")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.push("Blog")}
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Blogs")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.push("termCondition")
                            }
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Term & Condition")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.push("privacyPolicy")
                            }
                        >
                            <Text
                                style={{
                                    marginVertical: Sizes.fixPadding - 5.0,
                                    ...Fonts.grayColor14SemiBold,
                                }}
                            >
                                {getLocalizedString("Privacy Policy")}
                            </Text>
                        </TouchableOpacity> */}
                        {/* {drawerDivider()} */}

                        {!loginStatus && (
                            <TouchableOpacity
                                onPress={() => props.navigation.push("Login")}
                                style={{
                                    marginBottom: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        marginVertical: Sizes.fixPadding - 5.0,
                                        ...Fonts.primaryColor16Bold,
                                    }}
                                >
                                    {getLocalizedString("Login")}
                                </Text>
                            </TouchableOpacity>
                        )}
                        {loginStatus && (
                            <TouchableOpacity
                                onPress={() => setLogoutDialog(true)}
                                style={{
                                    marginBottom: 20,
                                }}
                            >
                                <Text
                                    onPress={() => setLogoutDialog(true)}
                                    style={{
                                        marginVertical: Sizes.fixPadding - 5.0,
                                        ...Fonts.primaryColor16Bold,
                                    }}
                                >
                                    {getLocalizedString("Logout")}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </View>
        );
    }

    function category({ categoryName }) {
        return (
            <Text
                onPress={() => props.navigation.push("CategoryDetail")}
                style={{
                    marginVertical: Sizes.fixPadding - 5.0,
                    ...Fonts.blackColor17SemiBold,
                }}
            >
                {categoryName}
            </Text>
        );
    }

    function drawerDivider() {
        return (
            <View
                style={{
                    backgroundColor: "#CCCCCC",
                    marginVertical: Sizes.fixPadding,
                    height: 1.0,
                }}
            />
        );
    }

    function drawerItems({ icon, title }) {
        return (
            <View style={{ ...styles.drawerItemWrapStyle }}>
                <View
                    style={{
                        width: 40,
                        alignItems: "center",

                        marginLeft: -5,
                    }}
                >
                    {icon}
                </View>
                <Text
                    style={{
                        marginLeft: 5,
                        ...Fonts.grayColor14SemiBold,
                    }}
                >
                    {getLocalizedString(title)}
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    logoutTextStyle: {
        marginTop: Sizes.fixPadding - 7.0,
        lineHeight: 18.0,
        textAlign: "center",
        ...Fonts.blackColor16SemiBold,
    },
    dialogWrapStyle: {
        width: width - 50,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 4.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    closeAndLogoutTextWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: Sizes.fixPadding * 3.0,
    },
    appIconBackgroundStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: "center",
        justifyContent: "center",
        // height: 200.0,
        marginBottom: Sizes.fixPadding - 5.0,
        paddingVertical: 20,
    },
    drawerItemWrapStyle: {
        marginVertical: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding + 5.0,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default CustomDrawer;
