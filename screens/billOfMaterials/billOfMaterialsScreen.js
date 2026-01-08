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
import { FlatList } from "react-native-gesture-handler";
import { __generateRandomString } from "../../utils/funtion";
import { TouchableOpacity } from "react-native";
import { __makeGetBlogGetRequest } from "../../utils/api";
import { useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import DocumentDetails from "../../components/billOfMaterials/DocumentDetails";
import BOM_Snapshot from "../../components/billOfMaterials/BOM_Snapshot";
import FinishedGoods from "../../components/billOfMaterials/FinishedGoods";
import RawMaterials from "../../components/billOfMaterials/RawMaterials";
import Routing from "../../components/billOfMaterials/Routing";
import OtherCharges from "../../components/billOfMaterials/OtherCharges";

const BillOfMaterialsScreen = ({ navigation }) => {
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
                <CommonHeader
                    title={"Bill of Material- BOM00000"}
                    navigation={navigation}
                />
                <FlatList
                    ListHeaderComponent={
                        <>
                            <DocumentDetails />
                            <BOM_Snapshot />
                            <FinishedGoods />
                            <RawMaterials />
                            <Routing />
                            <OtherCharges />
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: 60 }}
                />
            </View>
        </SafeAreaView>
    );
};

export default BillOfMaterialsScreen;
