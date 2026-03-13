import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import CommonHeader from "../../components/common/CommonHeader";
import MarketingDashboardOverview from "../../components/marketing/MarketingDashboardOverview";
import FunnelCard from "../../components/marketing/FunnelCard";
import TrendCard from "../../components/marketing/TrendCard";
import LiveVisitorsMap from "../../components/marketing/LiveVisitorsMap";
import AnalyticsSnapshot from "../../components/marketing/AnalyticsSnapshot";
import DashboardHeader from "../../components/marketing/DashboardHeader";
import ProductPerformanceCard from "../../components/marketing/ProductPerformanceCard";
import SourcePerformanceCard from "../../components/marketing/SourcePerformanceCard";

const { width } = Dimensions.get("window");

const productData = [
    {
        id: "1",
        name: "Premium Bluetooth Earphones Pro",
        category: "Electronics",
        visitors: "6,340",
        newUsers: "4,102",
        repeatUsers: "2,238",
        orders: "1,340",
        revenue: "4,20,800",
        convRate: "21.1",
        accentColor: "#3B82F6",
        isActive: true,
    },
    {
        id: "2",
        name: "Men's Running Shoes",
        category: "Shoes & Outdoors",
        visitors: "4,490",
        newUsers: "2,888",
        repeatUsers: "1,602",
        orders: "869",
        revenue: "2,42,900",
        convRate: "19.4",
        accentColor: "#10B981",
        isActive: false,
    },
    {
        id: "3",
        name: "Wireless Qi Charger",
        category: "Electronics",
        visitors: "3,210",
        newUsers: "2,100",
        repeatUsers: "1,110",
        orders: "590",
        revenue: "88,500",
        convRate: "18.4",
        accentColor: "#10B981",
        isActive: false,
    },
];
const souraceData = [
    {
        id: "1",
        source: "Google",
        visitors: "18,203",
        newUsers: "12,831",
        repeatUsers: "1,382",
        revenue: "1,48,606",
        orders: "1,152",
        addToCart: "3,208",
        convRate: "6.3",
        accentColor: "#3B82F6",
        isActive: true,
    },
    {
        id: "2",
        source: "Facebook",
        visitors: "8,022",
        newUsers: "6,012",
        repeatUsers: "1,741",
        revenue: "1,24,808",
        orders: "940",
        addToCart: "2,106",
        convRate: "11.7",
        accentColor: "#14B8A6",
        isActive: false,
    },
    {
        id: "3",
        source: "Instagram",
        visitors: "6,803",
        newUsers: "4,902",
        repeatUsers: "920",
        revenue: "89,234",
        orders: "615",
        addToCart: "1,850",
        convRate: "9.0",
        accentColor: "#14B8A6",
        isActive: false,
    },
];

const MarketinDashboard = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"Marketing Dashboard"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <MarketingDashboardOverview navigation={navigation} />
                    <TrendCard />
                    <FunnelCard />
                    <LiveVisitorsMap />
                    <AnalyticsSnapshot />
                    <DashboardHeader
                        title="Top performing products"
                        subTitle="Filter by category and date range above"
                        isShowFilter={true}
                    />

                    <FlatList
                        data={productData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ProductPerformanceCard
                                item={item}
                                isFirst={item.isActive}
                            />
                        )}
                    />
                    <DashboardHeader
                        title="Traffic by source"
                        subTitle="Visitors, revenue, orders by platform (Google, YouTube, Facebook, Direct, etc.)"
                    />
                    <FlatList
                        data={souraceData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <SourcePerformanceCard
                                item={item}
                                isFirst={item.isActive}
                            />
                        )}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // paddingVertical: Sizes.fixPadding,
    },
});

export default MarketinDashboard;
