import { useState } from "react";
import {
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    View,
    StatusBar,
    Image,
    StyleSheet,
    Text,
    FlatList,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import Loader from "../../components/loader";
import {
    __makeLoginPostRequest,
    __verifyLoginPostRequest,
} from "../../utils/api";
import { __setLocalStorageData } from "../../utils/localStorage";
import { __setLocalization, __setToken } from "../../utils/localization";
import CommonHeader from "../../components/common/CommonHeader";
import { __generateRandomString } from "../../utils/funtion";
import SingleSelectTab from "../../components/common/SingleSelectTab";
import MainCard from "../../components/BusinessIntelligence/MainCard";
const BusinessIntelligenceScreen = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
        active: "Sales",
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { loading, active } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            {loading && <Loader />}
            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"Business Intelligence"}
                    navigation={navigation}
                />
                <FlatList
                    ListHeaderComponent={
                        <View style={{}}>
                            <View
                                style={{
                                    backgroundColor: Colors.whiteColor,
                                    padding: 10,
                                    paddingHorizontal: 0,
                                }}
                            >
                                <SingleSelectTab
                                    list={[
                                        { id: "Sales", name: "Sales" },
                                        { id: "Purchase", name: "Purchase" },
                                        { id: "Inventory", name: "Inventory" },
                                        {
                                            id: "Production",
                                            name: "Production",
                                        },
                                        { id: "Accounts", name: "Accounts" },
                                    ]}
                                    onPress={(id) => {
                                        updateState({ active: id });
                                    }}
                                    active={active}
                                />
                            </View>
                            <MainCard active={active} />
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default BusinessIntelligenceScreen;
