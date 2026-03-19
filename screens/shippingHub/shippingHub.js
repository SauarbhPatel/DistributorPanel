import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    Dimensions,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { __generateRandomString } from "../../utils/funtion";
import { TouchableOpacity } from "react-native";
import { __makeGetBlogGetRequest } from "../../utils/api";
import { ScrollView } from "react-native";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import ShippingDashboard from "../../components/shippingHub/ShippingStatCard";
import RecommendedWorkflow from "../../components/shippingHub/RecommendedWorkflow";
import CheckoutEligibility from "../../components/shippingHub/CheckoutEligibility";
const { width } = Dimensions.get("window");

const ShippingHub = ({ navigation }) => {
    // const [state, setState] = useState({
    //     loading: false,
    // });

    // const updateState = (data) => setState((state) => ({ ...state, ...data }));

    // const { loading, active } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView contentContainerStyle={styles.container}>
                    <SlaHeader
                        title="Shipping HUB"
                        subTitle="Manage shipping zones, methods, and courier partners. Configure weight and category rules, charges, and API integrations so the right shipping options appear at checkout by zone and cart."
                        headerIcon={
                            <MaterialIcons
                                name="local-shipping"
                                size={24}
                                color="#fff"
                            />
                        }
                    />
                    <ShippingDashboard />
                    <RecommendedWorkflow navigation={navigation} />
                    <CheckoutEligibility />
                </ScrollView>
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
                    Shipping Hub
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

    container: {
        padding: Sizes.fixPadding,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    card: {
        width: width / 2 - Sizes.fixPadding * 1.5,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding * 2,
        paddingHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        alignItems: "center",
        elevation: 2,
        borderWidth: 1,
        borderColor: Colors.borderColor,
    },

    cardText: {
        marginTop: Sizes.fixPadding,
        textAlign: "center",
        ...Fonts.blackColor14Medium,
    },
});

export default ShippingHub;
