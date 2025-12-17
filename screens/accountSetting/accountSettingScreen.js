import React, { useState } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Dimensions, ScrollView, StyleSheet, View, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Dialog } from "@rneui/themed";

const { width } = Dimensions.get('window');

const AccountSettingScreen = ({ navigation }) => {

    const [logoutDialog, setLogoutDialog] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {accountInfo()}
                    {settingInfo()}
                    {logoutText()}
                </ScrollView>
            </View>
            {logoutInfo()}
        </SafeAreaView>
    )

    function logoutInfo() {
        return (
            <Dialog
                visible={logoutDialog}
                onRequestClose={() => { setLogoutDialog(false) }}
                overlayStyle={styles.dialogWrapStyle}
            >
                <View style={{ backgroundColor: Colors.whiteColor, }}>
                    <Text style={{ ...Fonts.blackColor18Bold }}>
                        Confirm
                    </Text>
                    <Text style={{ ...Fonts.blackColor15Medium, marginVertical: Sizes.fixPadding * 2.0, }}>
                        Are you Sure want to Logout?
                    </Text>
                    <View style={styles.closeAndLogoutTextWrapStyle}>
                        <Text
                            onPress={() => setLogoutDialog(false)}
                            style={{ ...Fonts.primaryColor13SemiBold }}
                        >
                            Close
                        </Text>
                        <Text
                            onPress={() => {
                                setLogoutDialog(false)
                                navigation.push('Login')
                            }}
                            style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.primaryColor13SemiBold }}
                        >
                            Logout
                        </Text>
                    </View>
                </View>
            </Dialog>
        )
    }

    function logoutText() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => { setLogoutDialog(true) }}
                style={{
                    backgroundColor: Colors.whiteColor,
                    paddingTop: Sizes.fixPadding + 5.0,
                    paddingHorizontal: Sizes.fixPadding * 2.0,
                }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor18Bold }}>
                    Logout
                </Text>
            </TouchableOpacity>
        )
    }

    function settingInfo() {
        return (
            <View style={styles.settingInfoWrapStyle}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor18Bold }}>
                    Setting
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding, }}>
                    {informationShort({ title: 'Order Notifications' })}
                    {informationShort({ title: 'Discount Notifications' })}
                    {informationShort({ title: 'Credit Card' })}
                </View>
            </View>
        )
    }

    function accountInfo() {
        return (
            <View style={styles.accountInfoWrapStyle}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor18Bold }}>
                    Account
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding, }}>
                    {informationShort({ title: 'Address' })}
                    {informationShort({ title: 'Telephone' })}
                    {informationShort({ title: 'Email' })}
                </View>
            </View>
        )
    }

    function informationShort({ title }) {
        return (
            <>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{ ...Fonts.lightGrayColor16Medium }}>
                        {title}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        color={Colors.lightGrayColor}
                        size={25}
                    />
                </View>
                <View style={{
                    backgroundColor: '#eeeeee',
                    height: 1.0,
                    marginVertical: Sizes.fixPadding + 5.0,
                }} />
            </>
        )
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
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor18Bold }}>
                    ACCOUNT SETTING
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        elevation: 2.0,
    },
    settingInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    accountInfoWrapStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    dialogWrapStyle: {
        width: width - 50,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 4.0,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    closeAndLogoutTextWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: Sizes.fixPadding * 3.0
    },
})

export default AccountSettingScreen;