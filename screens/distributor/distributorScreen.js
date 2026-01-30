import { SafeAreaView, View, StatusBar, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import {
    Feather,
    FontAwesome,
    FontAwesome5,
    MaterialIcons,
} from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { __generateRandomString } from "../../utils/funtion";
import { TouchableOpacity } from "react-native";
import { __makeGetBlogGetRequest } from "../../utils/api";
import { useState } from "react";
import CreateDocuments from "../../components/distributor/CreateDocuments";
import FilterCard from "../../components/distributor/FilterCard";

const DistributorScreen = ({ navigation, route }) => {
    const [list, setlist] = useState([
        {
            companyName: "Surya Demo Supplier",
            city: "Aurangabad, BADDI, Bangalore...",
            category: "Supplier",
        },
        {
            companyName: "Merc Demo Buyer",
            city: "ANKLESHWAR, Agra, Ahmedabad...",
            category: "Buyer",
        },
    ]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FilterCard />

                <FlatList
                    data={list}
                    renderItem={CardBox}
                    keyExtractor={() => __generateRandomString(10)}
                    contentContainerStyle={{
                        gap: 10,
                        paddingTop: 10,
                        paddingBottom: 20,
                    }}
                />
            </View>
        </SafeAreaView>
    );

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
                        flex: 1,
                    }}
                >
                    {route?.params?.name} Master
                </Text>
                <CreateDocuments navigation={navigation} />
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

    returnAndExchangeItemInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderWidth: 1.5,
        borderColor: Colors.borderColor,
        paddingBottom: 20,
    },
});

export default DistributorScreen;

const CardBox = ({ item }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.returnAndExchangeItemInfoWrapStyle}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ gap: 5, flex: 1 }}>
                    <Text style={{ ...Fonts.blackColor13SemiBold }}>
                        {item?.companyName}
                    </Text>

                    <View style={{ flexDirection: "row", gap: 5 }}>
                        <FontAwesome5
                            name="map-marker-alt"
                            color={Colors.lightGrayColor}
                            size={16}
                        />
                        <Text
                            style={{
                                ...Fonts.blackColor12Medium,
                                color: Colors.lightGrayColor,
                            }}
                        >
                            {item?.city}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: Colors.bodyColor,
                        borderRadius: 50,
                        width: 20,
                        height: 20,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            ...Fonts.blackColor12Medium,
                            color: Colors.primaryColor,
                        }}
                    >
                        {item?.category?.slice(0, 1)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
