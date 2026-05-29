import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useEffect, useState, useCallback, memo } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    LayoutAnimation,
    Platform,
    UIManager,
} from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { Dialog } from "@rneui/themed";
import { getLocalizedString } from "../utils/language/localizationService";
import { __cleanLocalization, __getLocalization } from "../utils/localization";
import { __cleanLocalStorageData } from "../utils/localStorage";
import {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome5,
} from "@expo/vector-icons";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get("window");

const MENU_ITEMS = [
    // {
    //     label: "Product Management",
    //     route: "ProductManagement",
    //     icon: <MaterialIcons name="inventory" size={18} color="#666" />,
    // },
    // {
    //     label: "Tax Manager",
    //     route: "TaxManagment",
    //     icon: <MaterialIcons name="receipt-long" size={18} color="#666" />,
    // },
    // {
    //     label: "Inventory Hub",
    //     route: "InventoryHub",
    //     icon: (
    //         <MaterialCommunityIcons name="warehouse" size={18} color="#666" />
    //     ),
    // },
    // {
    //     label: "Compliance Hub",
    //     route: "ComplianceHub",
    //     icon: <MaterialIcons name="gavel" size={18} color="#666" />,
    // },
    // {
    //     label: "Shipping Hub",
    //     route: "ShippingHub",
    //     icon: (
    //         <MaterialCommunityIcons
    //             name="truck-delivery-outline"
    //             size={18}
    //             color="#666"
    //         />
    //     ),
    // },
    // {
    //     label: "Manufacturers",
    //     route: "Manufacturers",
    //     icon: <MaterialIcons name="factory" size={18} color="#666" />,
    // },
    // {
    //     label: "Master",
    //     route: "AllMaster",
    //     icon: <MaterialIcons name="dashboard" size={18} color="#666" />,
    // },
    {
        label: "OrderHub",
        route: "OrderHub",
        icon: (
            <MaterialCommunityIcons
                name="shopping-outline"
                size={18}
                color="#666"
            />
        ),
        children: [
            {
                label: "Orders Management",
                route: "OrdersManagement",
                icon: <MaterialIcons name="list-alt" size={16} color="#999" />,
            },
            {
                label: "Returns & Exchange",
                route: null,
                icon: (
                    <MaterialCommunityIcons
                        name="swap-horizontal"
                        size={16}
                        color="#999"
                    />
                ),
            },
            {
                label: "Abandoned Orders",
                route: "AbandonedOrders",
                icon: (
                    <MaterialIcons
                        name="remove-shopping-cart"
                        size={16}
                        color="#999"
                    />
                ),
            },
            {
                label: "Order Settings",
                route: "OrderSetting",
                icon: <MaterialIcons name="settings" size={16} color="#999" />,
            },
            {
                label: "SLA Settings",
                route: "SlaSetting",
                icon: (
                    <MaterialCommunityIcons
                        name="clock-outline"
                        size={16}
                        color="#999"
                    />
                ),
            },
            {
                label: "B2B Orders",
                route: "B2BOrders",
                icon: (
                    <MaterialCommunityIcons
                        name="office-building-outline"
                        size={16}
                        color="#999"
                    />
                ),
            },
            {
                label: "B2B Settings",
                route: "B2BSettings",
                icon: (
                    <MaterialCommunityIcons
                        name="cog-outline"
                        size={16}
                        color="#999"
                    />
                ),
            },
        ],
    },
    // {
    //     label: "Marketing Dashboard",
    //     route: "MarketinDashboard",
    //     icon: <MaterialIcons name="campaign" size={18} color="#666" />,
    // },
    // {
    //     label: "Raw Material",
    //     route: "RawMaterial",
    //     icon: (
    //         <MaterialCommunityIcons
    //             name="package-variant"
    //             size={18}
    //             color="#666"
    //         />
    //     ),
    // },
    // {
    //     label: "Sales & Purchase",
    //     route: "SalesAndPurchase",
    //     icon: <MaterialIcons name="point-of-sale" size={18} color="#666" />,
    // },
    // {
    //     label: "Business Intelligence",
    //     route: "BusinessIntelligence",
    //     icon: <MaterialIcons name="insights" size={18} color="#666" />,
    // },
    // {
    //     label: "Approvals",
    //     route: "Approvals",
    //     icon: (
    //         <MaterialIcons name="check-circle-outline" size={18} color="#666" />
    //     ),
    // },
    // {
    //     label: "Distributor Master",
    //     route: "Distributor",
    //     params: { name: "Distributor" },
    //     icon: (
    //         <MaterialCommunityIcons
    //             name="account-network-outline"
    //             size={18}
    //             color="#666"
    //         />
    //     ),
    // },
    // {
    //     label: "Supplier Master",
    //     route: "Distributor",
    //     params: { name: "Supplier" },
    //     icon: (
    //         <MaterialCommunityIcons
    //             name="account-arrow-left-outline"
    //             size={18}
    //             color="#666"
    //         />
    //     ),
    // },
    // {
    //     label: "Inventory",
    //     route: "InventoryMaster",
    //     icon: (
    //         <MaterialCommunityIcons
    //             name="cube-outline"
    //             size={18}
    //             color="#666"
    //         />
    //     ),
    // },
    // {
    //     label: "Production",
    //     route: "Production",
    //     icon: (
    //         <MaterialIcons
    //             name="precision-manufacturing"
    //             size={18}
    //             color="#666"
    //         />
    //     ),
    // },
    // {
    //     label: "Payments",
    //     route: "Payment",
    //     icon: (
    //         <MaterialCommunityIcons
    //             name="cash-multiple"
    //             size={18}
    //             color="#666"
    //         />
    //     ),
    // },
    // {
    //     label: "Resource Planning",
    //     route: "ResourcePlanning",
    //     icon: <MaterialIcons name="people-alt" size={18} color="#666" />,
    // },
    // {
    //     label: "Reports & Intelligence",
    //     route: "Reports",
    //     icon: <MaterialIcons name="bar-chart" size={18} color="#666" />,
    // },
    // {
    //     label: "AI Marketing Studio",
    //     route: null,
    //     icon: (
    //         <MaterialCommunityIcons
    //             name="robot-outline"
    //             size={18}
    //             color="#666"
    //         />
    //     ),
    // },
    // {
    //     label: "Task Dashboard",
    //     route: "TaskDashboard",
    //     icon: <MaterialIcons name="task-alt" size={18} color="#666" />,
    // },
    // {
    //     label: "Setting",
    //     route: null,
    //     icon: <MaterialIcons name="settings" size={18} color="#666" />,
    // },
];

// ─── Sub Menu Item ───────────────────────────────────────────────
const SubMenuItem = memo(({ item, navigation }) => (
    <TouchableOpacity
        onPress={() => item.route && navigation.push(item.route, item.params)}
        style={styles.subItem}
    >
        <View style={styles.subIcon}>{item.icon}</View>
        <Text style={styles.subItemText}>{getLocalizedString(item.label)}</Text>
    </TouchableOpacity>
));

// ─── Menu Item ───────────────────────────────────────────────────
const MenuItem = memo(({ item, navigation }) => {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = item.children?.length > 0;

    const handlePress = useCallback(() => {
        if (hasChildren) {
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
            );
            setExpanded((prev) => !prev);
        } else if (item.route) {
            navigation.push(item.route, item.params);
        }
    }, [hasChildren, item.route, item.params]);

    return (
        <View>
            <TouchableOpacity onPress={handlePress} style={styles.menuRow}>
                <View style={styles.menuLeft}>
                    <View style={styles.menuIcon}>{item.icon}</View>
                    <Text style={{ ...Fonts.grayColor14SemiBold }}>
                        {getLocalizedString(item.label)}
                    </Text>
                </View>
                {hasChildren && (
                    <MaterialIcons
                        name={
                            expanded
                                ? "keyboard-arrow-up"
                                : "keyboard-arrow-down"
                        }
                        size={18}
                        color="#999"
                    />
                )}
            </TouchableOpacity>

            {hasChildren && expanded && (
                <View style={styles.subMenuWrap}>
                    {item.children.map((child) => (
                        <SubMenuItem
                            key={child.label}
                            item={child}
                            navigation={navigation}
                        />
                    ))}
                </View>
            )}
        </View>
    );
});

// ─── Main Drawer ─────────────────────────────────────────────────
const CustomDrawer = (props) => {
    const [logoutDialog, setLogoutDialog] = useState(false);
    const [loginStatus, setLoginStatus] = useState(true);
    const [userDetails, setUserDetails] = useState({
        profile: "",
        name: "",
        mobile: "",
    });

    useEffect(() => {
        setUserDetails({
            name: __getLocalization("name"),
            mobile: __getLocalization("phoneNumber"),
        });
    }, []);

    const handleLogout = useCallback(async () => {
        await __cleanLocalStorageData();
        __cleanLocalization();
        setLogoutDialog(false);
        props.navigation.push("Login");
    }, [props.navigation]);

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
                {/* Header */}
                <View style={styles.appIconBackgroundStyle}>
                    <Image
                        source={require("../assets/images/baofeng_radios.png")}
                        style={
                            loginStatus
                                ? {
                                      width: 100,
                                      height: 40,
                                      position: "absolute",
                                      top: 0,
                                      right: 10,
                                  }
                                : { width: 120, height: 30 }
                        }
                        resizeMode="contain"
                    />
                    {loginStatus && (
                        <View style={styles.userRow}>
                            <Image
                                source={
                                    userDetails?.profile
                                        ? { uri: userDetails.profile }
                                        : require("../assets/images/user.png")
                                }
                                style={styles.avatar}
                                resizeMode="contain"
                            />
                            <View style={{ width: "75%" }}>
                                <Text
                                    style={{ ...Fonts.blackColor18Bold }}
                                    numberOfLines={2}
                                    adjustsFontSizeToFit
                                >
                                    {userDetails.name}
                                </Text>
                                <Text style={{ ...Fonts.blackColor13Medium }}>
                                    +91 {userDetails.mobile}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* <View style={styles.divider} /> */}

                {/* Menu */}
                <View style={{ marginHorizontal: Sizes.fixPadding + 5 }}>
                    {MENU_ITEMS.map((item) => (
                        <MenuItem
                            key={item.label}
                            item={item}
                            navigation={props.navigation}
                        />
                    ))}

                    {/* <View style={styles.divider} /> */}

                    {/* Logout / Login */}
                    <TouchableOpacity
                        onPress={() =>
                            loginStatus
                                ? setLogoutDialog(true)
                                : props.navigation.push("Login")
                        }
                        style={styles.logoutBtn}
                    >
                        <MaterialCommunityIcons
                            name="logout"
                            size={18}
                            color="#A32D2D"
                        />
                        <Text style={styles.logoutText}>
                            {getLocalizedString(
                                loginStatus ? "Logout" : "Login",
                            )}
                        </Text>
                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={16}
                            color="#E24B4A"
                        />
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>

            {/* Logout Dialog */}
            <Dialog
                visible={logoutDialog}
                onRequestClose={() => setLogoutDialog(false)}
                overlayStyle={styles.dialogWrapStyle}
            >
                <View style={{ backgroundColor: Colors.whiteColor }}>
                    <Text style={{ ...Fonts.blackColor18Bold }}>
                        {getLocalizedString("Confirm")}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginVertical: Sizes.fixPadding * 2,
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
                            onPress={handleLogout}
                            style={{
                                marginLeft: Sizes.fixPadding * 2,
                                ...Fonts.primaryColor13SemiBold,
                            }}
                        >
                            {getLocalizedString("Logout")}
                        </Text>
                    </View>
                </View>
            </Dialog>
        </View>
    );
};

const styles = StyleSheet.create({
    dialogWrapStyle: {
        width: width - 50,
        paddingHorizontal: Sizes.fixPadding * 2,
        paddingTop: Sizes.fixPadding * 4,
        paddingBottom: Sizes.fixPadding * 2,
    },
    closeAndLogoutTextWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: Sizes.fixPadding * 3,
    },
    appIconBackgroundStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        marginBottom: Sizes.fixPadding - 5,
    },
    userRow: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        width: "100%",
        paddingHorizontal: 10,
        gap: 10,
    },
    avatar: { width: 60, height: 60, borderRadius: 30 },
    divider: {
        backgroundColor: "#CCCCCC",
        marginVertical: Sizes.fixPadding,
        height: 1,
    },
    menuRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: Sizes.fixPadding - 5,
        paddingVertical: 2,
    },
    menuLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
    menuIcon: { width: 24, alignItems: "center" },
    subMenuWrap: {
        marginLeft: 34,
        marginBottom: 4,
        borderLeftWidth: 1.5,
        borderLeftColor: "#E0E0E0",
        paddingLeft: 10,
    },
    subItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        gap: 8,
    },
    subIcon: { width: 20, alignItems: "center" },
    subItemText: { ...Fonts?.grayColor14SemiBold, color: "#888", fontSize: 13 },
    logoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: "#F09595",
        backgroundColor: "#FCEBEB",
    },
    logoutText: { color: "#A32D2D", fontSize: 14, fontWeight: "500", flex: 1 },
});

export default CustomDrawer;
