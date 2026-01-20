import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { __generateRandomString } from "../../utils/funtion";
import { __makeGetBlogGetRequest } from "../../utils/api";
import { useState } from "react";
import { TextAreaBox } from "../../modules";
import SingleSelectTab from "../../components/common/SingleSelectTab";
import CommonHeader from "../../components/common/CommonHeader";
import AllProductionProcess from "../../components/production/AllProductionProcess";
import WorkOrders from "../../components/production/WorkOrders";
import SubContract from "../../components/production/SubContract";
import BillOfMaterials from "../../components/production/BillOfMaterials";
import ResourcePlanning from "../../components/report/ResourcePlanning";
const { width } = Dimensions.get("window");

const ResourcePlanningScreen = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
        active: "Resource Planning",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { loading, active } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"Resource Planning"}
                    navigation={navigation}
                />
                <View
                    style={{
                        backgroundColor: Colors.whiteColor,
                        padding: 10,
                        paddingHorizontal: 0,
                        paddingBottom: 0,
                    }}
                >
                    <SingleSelectTab
                        list={[
                            {
                                id: "Resource Planning",
                                name: "Resource Planning",
                            },
                            { id: "Indent", name: "Indent" },
                        ]}
                        onPress={(id) => {
                            updateState({ active: id });
                        }}
                        active={active}
                        tabType={2}
                    />
                </View>

                <TextAreaBox
                    value={""}
                    onChangeText={(value) => {
                        // updateState(value);
                    }}
                    placeholder={"Search"}
                    valuekey={"res"}
                    titleCustomStyle={{
                        marginHorizontal: 0,
                    }}
                    inputCustomStyle={{
                        marginHorizontal: 10,
                        borderWidth: 1,
                        borderColor: "#c1c1c1ff",
                        elevation: 0,
                        backgroundColor: Colors.whiteColor,
                        paddingVertical: 5,
                    }}
                    leftIcon={
                        <Feather
                            name="search"
                            size={20}
                            color={Colors.lightGrayColor}
                        />
                    }
                    rightIcon={
                        <FontAwesome
                            name="filter"
                            size={20}
                            color={Colors.primaryColor}
                        />
                    }
                    customStyle={{ marginBottom: 5, marginTop: 10 }}
                />
                {active == "Resource Planning" && (
                    <ResourcePlanning navigation={navigation} />
                )}
                {active == "Indent" && <IndentCard navigation={navigation} />}
            </View>
        </SafeAreaView>
    );
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

export default ResourcePlanningScreen;

const IndentCard = ({ navigation }) => {
    const [list, setlist] = useState([
        {
            ReferenceNumber: "BF888s-TEST",
            ProcessNumber: "PID00003",
            Stage: "WIP",
            Status: "Approved",
            BOBNumber: "BOM00000 (Walki Talki - BF888S)",
            FGItem: "SKU00008",
            FGName: "BF888S",
            Process: "Master Process",
        },
        {
            ReferenceNumber: "12",
            ProcessNumber: "PID00002",
            Stage: "Planned",
            Status: "-",
            BOBNumber: "BOM00000 (Walki Talki - BF888S)",
            FGItem: "SKU00008",
            FGName: "BF888S",
            Process: "Master Process",
        },
    ]);
    return (
        <>
            <FlatList
                data={list}
                renderItem={({ item }) => (
                    <CardBox item={item} navigation={navigation} />
                )}
                keyExtractor={() => __generateRandomString(10)}
                contentContainerStyle={{
                    gap: 10,
                    paddingTop: 10,
                    paddingBottom: 20,
                }}
            />
        </>
    );
};

const CardBox = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                backgroundColor: Colors.whiteColor,
                borderRadius: Sizes.fixPadding,
                marginHorizontal: Sizes.fixPadding,
                paddingHorizontal: Sizes.fixPadding,
                paddingVertical: Sizes.fixPadding,
                borderWidth: 1.5,
                borderColor: Colors.borderColor,
                paddingBottom: 20,
            }}
        >
            {boxContainer(
                <>
                    {leftTextBox("Indent No", "IND-2026-00125")}
                    {rightTextBox("Linked Purchase Order", "PO-2026-0048")}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("Status", "Pending Approval")}
                    {rightTextBox("Document Date", "08 Jan 2026")}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("Number of Items", "12")}
                    {rightTextBox("Created By", "Saurabh Patel")}
                </>
            )}
            {boxContainer(
                <>
                    {leftTextBox("Expected By", "15 Jan 2026")}
                    {rightTextBox("Store", "Main Warehouse – Noida")}
                </>
            )}
        </TouchableOpacity>
    );
    function boxContainer(com) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 10,
                    justifyContent: "space-between",
                }}
            >
                {com}
            </View>
        );
    }
    function leftTextBox(title, res, isLink) {
        return (
            <View style={{ maxWidth: width / 2 - 30 }}>
                <Text
                    style={{
                        fontSize: 12,
                        lineHeight: 15,
                        color: Colors.lightGrayColor,
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor15Medium,
                        fontSize: 13,
                        lineHeight: 15,
                        textDecorationLine: isLink ? "underline" : "none",
                        color: isLink ? Colors.primaryColor : Colors.blackColor,
                    }}
                >
                    {res}
                </Text>
            </View>
        );
    }
    function rightTextBox(title, res, isLink) {
        return (
            <View style={{ alignItems: "flex-end" }}>
                <Text
                    style={{
                        fontSize: 12,
                        lineHeight: 15,
                        color: Colors.lightGrayColor,
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        ...Fonts.blackColor15Medium,
                        fontSize: 13,
                        lineHeight: 15,
                        textAlign: "right",
                        textDecorationLine: isLink ? "underline" : "none",
                        color: isLink ? Colors.primaryColor : Colors.blackColor,
                    }}
                >
                    {res}
                </Text>
            </View>
        );
    }
};
