import { SafeAreaView, ScrollView } from "react-native";
import { Colors } from "../../constants/styles";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData } from "../../utils/api";
import CreateGlobalProducts from "../../components/form/CreateGlobalProducts";

const GlobalProducts = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader
                title={"Add Single Product"}
                navigation={navigation}
            />

            <CreateGlobalProducts
                onClose={() => {
                    updateState({ isShowCreate: false });
                }}
            />
        </SafeAreaView>
    );
};

export default GlobalProducts;
