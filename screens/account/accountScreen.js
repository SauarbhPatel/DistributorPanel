import {
    Text,
    StyleSheet,
    View,
    Image,
    ScrollView,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheet } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    __makeCountryGetRequest,
    __makeGetProfileDetailsGetRequest,
    __makeLanguageGetRequest,
    __makeUpdateProfileDetailsPutRequest,
    __makeUpdateProfileImagePostRequest,
} from "../../utils/api";
import { Picker } from "@react-native-picker/picker";
import Loader from "../../components/loader";
import * as ImagePicker from "expo-image-picker";
// import * as Permissions from "expo-permissions";
import { Alert } from "react-native";
import { __generateRandomString } from "../../utils/funtion";
// import { __getToken } from "../../utils/localization";
const AccountScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState("");
    const [fullName, setFullName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [language, setlanguage] = useState("");
    const [languageList, setlanguageList] = useState([]);
    const [country, setCountry] = useState("");
    const [countryList, setCountryList] = useState([]);
    const [showProfileOptionsSheet, setShowProfileOptionsSheet] =
        useState(false);

    const __handleUpdateProfileImage = (img) => {
        console.warn(JSON.stringify(img));
        let formdata = new FormData();
        // formdata.append("image", img);

        // api//image/addImage

        const token = __getToken();
        if (!token) {
            return Alert.alert("", "You are not Login. Please login first.");
        }
        setLoading(true);

        formdata.append("image", {
            uri: img?.uri,
            type: "image/jpeg",
            name: __generateRandomString(10) + ".jpeg",
        });
        __makeUpdateProfileImagePostRequest(formdata, token)
            .then((res) => {
                console.log(JSON.stringify(res));
                setLoading(false);
                Alert.alert("", "Profile Image Updated!");
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };
    const __handleProfileUpdate = () => {
        setLoading(true);
        // const token = __getToken();
        // if (!token) {
        //     return Alert.alert("", "You are not Login. Please login first.");
        // }
        __makeUpdateProfileDetailsPutRequest(
            {
                firstname: fullName,
                lastname: lastName,
                email: email,
                mobile: mobileNumber,
                // language: language,
                // country: country,
            },
            token,
        )
            .then((res) => {
                console.log(JSON.stringify(res));
                setLoading(false);
                Alert.alert("", "Profile Updated!");
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };
    // const __handleGetCountry = () => {
    //     __makeCountryGetRequest()
    //         .then((res) => {
    //             console.log(res);
    //             setCountryList(res);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };
    // const __handleGetLanguage = () => {
    //     __makeLanguageGetRequest()
    //         .then((res) => {
    //             console.log(res);
    //             setlanguageList(res);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    const __handleGetProfile = () => {
        // const token = __getToken();
        // if (!token) {
        //     return Alert.alert("", "You are not Login. Please login first.");
        // }
        __makeGetProfileDetailsGetRequest(token)
            .then((res) => {
                console.log(JSON.stringify(res));
                setProfile(res?.getaUser?.profilePhoto?.url);
                res?.getaUser?.mobile && setMobileNumber(res?.getaUser?.mobile);
                res?.getaUser?.email && setEmail(res?.getaUser?.email);
                res?.getaUser?.firstname &&
                    setFullName(res?.getaUser?.firstname);
                res?.getaUser?.lastname && setlastName(res?.getaUser?.lastname);
                // res?.getaUser?.language && setlanguage(res?.getaUser?.language);
                // res?.getaUser?.country && setCountry(res?.getaUser?.country);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const takeImage = async (fromCamera) => {
        try {
            console.log(fromCamera);

            // const { status } = await Permissions.askAsync(Permissions.CAMERA);
            // if (status !== "granted") {
            //     return alert("Camera permission is required to take pictures.");
            // }

            // const mediaLibraryStatus = await Permissions.askAsync(
            //     Permissions.MEDIA_LIBRARY
            // );
            // if (mediaLibraryStatus.status !== "granted") {
            //     return alert(
            //         "Media library permission is required to access your photos."
            //     );
            // }

            const { status } =
                await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                return alert(
                    "Sorry, we need camera permissions to make this work!",
                );
            }
            let result;
            if (fromCamera) {
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                });
            } else {
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                });
            }

            if (!result.canceled) {
                __handleUpdateProfileImage(result.assets[0]);
                setShowProfileOptionsSheet(false);
                setProfile(result?.assets[0]?.uri);
            }
        } catch (error) {}
    };

    useEffect(() => {
        setTimeout(() => {
            __handleGetProfile();
            // __handleGetLanguage();
            // __handleGetCountry();
        }, 200);
    }, []);

    useEffect(() => {}, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            {loading && <Loader />}
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView>
                    {profilePic()}
                    {fullNameInfo()}
                    {lastNameInfo()}
                    {emailInfo()}
                    {mobileNumberInfo()}
                    {/* {languageInfo()}
                    {countryInfo()} */}
                    {saveButton()}
                </ScrollView>
                {profilePicOptionSheet()}
            </View>
        </SafeAreaView>
    );

    function profilePicOptionSheet() {
        return (
            <BottomSheet
                isVisible={showProfileOptionsSheet}
                containerStyle={{ backgroundColor: "rgba(0.5, 0.50, 0, 0.50)" }}
                onBackdropPress={() => {
                    setShowProfileOptionsSheet(false);
                }}
            >
                <View
                    style={{
                        paddingVertical: Sizes.fixPadding + 5.0,
                        backgroundColor: Colors.whiteColor,
                    }}
                >
                    <TouchableOpacity onPress={() => takeImage("camera")}>
                        <Text
                            style={{
                                textAlign: "center",
                                ...Fonts.blackColor16Regular,
                            }}
                        >
                            Take Photo
                        </Text>
                    </TouchableOpacity>
                    {divider()}
                    <Text
                        onPress={() => takeImage()}
                        style={{
                            textAlign: "center",
                            ...Fonts.blackColor16Regular,
                        }}
                    >
                        Choose From Library
                    </Text>
                </View>
            </BottomSheet>
        );
    }

    function divider() {
        return (
            <View
                style={{
                    backgroundColor: "rgba(111, 111, 111, 0.2)",
                    height: 1.0,
                    marginVertical: Sizes.fixPadding + 5.0,
                }}
            />
        );
    }

    function saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    __handleProfileUpdate();
                }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor15Bold }}>Save</Text>
            </TouchableOpacity>
        );
    }

    function countryInfo() {
        return (
            <View
                style={{
                    marginBottom: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding - 5.0,
                        ...Fonts.grayColor14Regular,
                    }}
                >
                    Your Country
                </Text>
                <View style={[styles.textFieldStyle, { padding: 0 }]}>
                    <Picker
                        selectedValue={country}
                        onValueChange={(itemValue, itemIndex) =>
                            setCountry(itemValue)
                        }
                    >
                        {countryList.map((conuntry, index) => (
                            <Picker.Item
                                label={conuntry.name}
                                value={conuntry._id}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
        );
    }
    function languageInfo() {
        return (
            <View
                style={{
                    marginBottom: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding - 5.0,
                        ...Fonts.grayColor14Regular,
                    }}
                >
                    Your Language
                </Text>

                <View style={[styles.textFieldStyle, { padding: 0 }]}>
                    <Picker
                        selectedValue={language}
                        onValueChange={(itemValue, itemIndex) =>
                            setlanguage(itemValue)
                        }
                    >
                        {languageList.map((language, index) => (
                            <Picker.Item
                                label={language.name}
                                value={language._id}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
        );
    }
    function mobileNumberInfo() {
        return (
            <View
                style={{
                    marginBottom: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding - 5.0,
                        ...Fonts.grayColor14Regular,
                    }}
                >
                    Mobile Number
                </Text>
                <TextInput
                    value={mobileNumber}
                    onChangeText={(value) => setMobileNumber(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    keyboardType="phone-pad"
                />
            </View>
        );
    }

    function emailInfo() {
        return (
            <View
                style={{
                    marginBottom: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding - 5.0,
                        ...Fonts.grayColor14Regular,
                    }}
                >
                    Email
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    keyboardType="email-address"
                />
            </View>
        );
    }

    function lastNameInfo() {
        return (
            <View
                style={{
                    marginBottom: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding - 5.0,
                        ...Fonts.grayColor14Regular,
                    }}
                >
                    Last Name
                </Text>
                <TextInput
                    value={lastName}
                    onChangeText={(value) => setlastName(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        );
    }
    function fullNameInfo() {
        return (
            <View
                style={{
                    marginBottom: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            >
                <Text
                    style={{
                        marginBottom: Sizes.fixPadding - 5.0,
                        ...Fonts.grayColor14Regular,
                    }}
                >
                    First Name
                </Text>
                <TextInput
                    value={fullName}
                    onChangeText={(value) => setFullName(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        );
    }

    function profilePic() {
        return (
            <View
                style={{
                    marginVertical: Sizes.fixPadding * 2.0,
                    alignSelf: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    source={
                        profile
                            ? { uri: profile }
                            : require("../../assets/images/user.png")
                    }
                    style={{ width: 100.0, height: 100.0, borderRadius: 50.0 }}
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setShowProfileOptionsSheet(true)}
                    style={styles.cameraIconWrapStyle}
                >
                    <MaterialIcons
                        name="camera-alt"
                        size={15}
                        color={Colors.whiteColor}
                    />
                </TouchableOpacity>
            </View>
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
                        textTransform: "uppercase",
                    }}
                >
                    Profile
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
    cameraIconWrapStyle: {
        position: "absolute",
        bottom: 0.0,
        right: 5.0,
        backgroundColor: Colors.primaryColor,
        width: 32.0,
        height: 32.0,
        borderRadius: 16.0,
        alignItems: "center",
        justifyContent: "center",
        borderColor: Colors.whiteColor,
        borderWidth: 2.5,
    },
    textFieldStyle: {
        backgroundColor: "rgba(111, 111, 111, 0.05)",
        borderRadius: Sizes.fixPadding - 5.0,
        ...Fonts.blackColor15Medium,
        padding: Sizes.fixPadding + 2.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 3.0,
        elevation: 1.5,
        shadowColor: Colors.primaryColor,
    },
    bottomSheetWrapStyle: {
        paddingBottom: Sizes.fixPadding - 5.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: 0.0,
        borderTopRightRadius: 0.0,
    },
});

export default AccountScreen;
