import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    Dimensions,
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
const { width } = Dimensions.get("window");

const ProductionScreen = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
        active: "All Production Process",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { loading, active } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <CommonHeader title={"Production"} navigation={navigation} />
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
                                id: "All Production Process",
                                name: "All Production Process",
                            },
                            { id: "Work Orders", name: "Work Orders" },
                            { id: "Sub Contract", name: "Sub Contract" },
                            {
                                id: "Bill of Materials",
                                name: "Bill of Materials",
                            },
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
                {active == "All Production Process" && (
                    <AllProductionProcess navigation={navigation} />
                )}
                {active == "Work Orders" && <WorkOrders />}
                {active == "Sub Contract" && <SubContract />}
                {active == "Bill of Materials" && (
                    <BillOfMaterials navigation={navigation} />
                )}
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

export default ProductionScreen;
