import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    Alert,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useEffect, useState } from "react";
import CommonHeader from "../../components/common/CommonHeader";
import { __deleteApiData, __getApiData, __postApiData } from "../../utils/api";
import { __formatDate } from "../../utils/funtion";
import { Loader } from "../../modules";

const AuditLogsCompliance = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { loading } = state;

    const documents = [
        {
            id: "1",
            date: "3/5/2026, 11:50:46 AM",
            entity: "COMPLIANCE_SET",
            entityCode: "cs-59xnxjz0d",
            action: "CREATE",
            details: "New Compliance Set",
        },
        {
            id: "2",
            date: "3/5/2026, 11:41:25 AM",
            entity: "MARKETPLACE_POLICY",
            entityCode: "mp-0qy4d4644",
            action: "CREATE",
            details: "asdmg",
        },
        {
            id: "3",
            date: "3/5/2026, 11:02:22 AM",
            entity: "CONDITIONAL_RULE",
            entityCode: "rule-42p8i0vwj",
            action: "CREATE",
            details: "vn b",
        },
    ];
    const renderDocument = ({ item }) => (
        <View style={styles.card}>
            {/* Top Row */}
            <View style={styles.topRow}>
                <Text style={styles.entity}>{item.entity}</Text>

                <View style={styles.actionBadge}>
                    <Text style={styles.actionText}>{item.action}</Text>
                </View>
            </View>

            {/* Entity Code */}
            <Text style={styles.entityCode}>{item.entityCode}</Text>

            {/* Details */}
            <Text style={styles.details}>{item.details}</Text>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.date}>{item.date}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <CommonHeader title={"Audit log"} navigation={navigation} />
            <Loader isShow={loading} />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 20,
                    paddingTop: 10,
                    paddingHorizontal: 10,
                }}
            >
                {/* Document Section */}
                <View style={styles.sectionCard}>
                    <FlatList
                        data={documents}
                        keyExtractor={(item) => item.id}
                        renderItem={renderDocument}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AuditLogsCompliance;
const StatCard = ({ number, label }) => (
    <View style={styles.statCard}>
        <Text style={styles.statNumber}>{number}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        padding: Sizes.fixPadding,
    },

    subTitle: {
        marginTop: 4,
        ...Fonts.grayColor14Regular,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },

    entity: {
        fontSize: 13,
        fontWeight: "600",
        color: "#111827",
    },

    entityCode: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 6,
    },

    actionBadge: {
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    actionText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#16A34A",
    },

    details: {
        fontSize: 14,
        color: "#111827",
        marginBottom: 8,
    },

    footer: {
        borderTopWidth: 1,
        borderColor: "#F3F4F6",
        paddingTop: 8,
    },

    date: {
        fontSize: 11,
        color: "#6B7280",
    },
});
