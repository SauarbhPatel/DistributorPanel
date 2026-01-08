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
import FinishedGoods from "../../components/billOfMaterials/FinishedGoods";
import RawMaterials from "../../components/billOfMaterials/RawMaterials";
import OtherCharges from "../../components/billOfMaterials/OtherCharges";
import ProcessDetails from "../../components/allProductionProcessScreen/ProcessDetails";
import RelatedProcesses from "../../components/allProductionProcessScreen/RelatedProcesses";
import Routing from "../../components/allProductionProcessScreen/Routing";

const AllProductionProcessScreen = ({ navigation }) => {
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
                    title={"Production Process - PID00003"}
                    navigation={navigation}
                />
                <FlatList
                    ListHeaderComponent={
                        <>
                            <ProcessDetails />
                            <RelatedProcesses />
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

export default AllProductionProcessScreen;
