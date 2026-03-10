import React from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import SlaHeader from "../../components/slaSettings/SlaHeader";
import CommonHeader from "../../components/common/CommonHeader";

const options = [
    {
        id: 1,
        name: "ORDER_CREATED",
        cutOffTime: "17:00",
        timezone: "Asia/Kolkata",
        region: "IN",
        days: "Mon, Tue, Wed, Thu, Fri, Sat",
        statusColor: "#007bff",
    },
    {
        id: 2,
        name: "ORDER_PROCESSED",
        cutOffTime: "17:00",
        timezone: "Asia/Kolkata",
        region: "IN",
        days: "Mon, Tue, Wed, Thu, Fri, Sat",
        statusColor: "#20c997",
    },
    {
        id: 3,
        name: "DISPATCH_READY",
        cutOffTime: "12:00",
        timezone: "America/New_York",
        region: "US",
        days: "Mon, Wed, Fri",
        statusColor: "#ff922b",
    },
];

const SlaCourierCut = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"Courier cut-off for pickup"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <SlaHeader
                        title="Courier cut-off for pickup"
                        subTitle="Define cut-off times for courier pickup. Orders must be ready (hours  before cut-off) for same-day pickup. Used in Add Milestone to set SLA  deadline = cut-off time minus X hours."
                        buttonName="Add cut-off"
                    />
                    <View style={{ marginTop: 10 }} />
                    {options.map((item, index) => (
                        <OptionCard item={item} key={index} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SlaCourierCut;

const OptionCard = ({ item }) => {
    return (
        <View style={[styles.card, { borderLeftColor: item.statusColor }]}>
            {/* NAME & ACTIONS ROW */}
            <View style={styles.rowTop}>
                <Text style={styles.code}>{item.name}</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Feather name="edit-2" size={16} color="#495057" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBtn}>
                        <Feather name="trash-2" size={16} color="#fa5252" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* CUT-OFF TIME BADGE */}
            <View style={styles.labelBadge}>
                <Text style={styles.labelText}>{item.cutOffTime}</Text>
            </View>

            {/* TIMEZONE & REGION */}
            <View style={styles.metaRow}>
                <Text style={styles.metaTitle}>{item.timezone}</Text>
                <Text style={styles.metaValue}>{item.region}</Text>
            </View>

            {/* DAYS */}
            <View style={styles.metaRow}>
                <Text style={styles.metaTitle}>Days</Text>
                <Text style={styles.metaValue}>{item.days}</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: Sizes.fixPadding,
    },

    dropdownBox: {
        marginVertical: Sizes.fixPadding,
        backgroundColor: "#fff",
        padding: Sizes.fixPadding,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e9ecef",
    },

    dropdownLabel: {
        ...Fonts.blackColor14Medium,
        marginBottom: 6,
    },

    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dee2e6",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
    },

    tableHeader: {
        flexDirection: "row",
        marginTop: Sizes.fixPadding * 2,
        marginBottom: 6,
    },

    headerText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#495057",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: Sizes.fixPadding + 6,
        marginBottom: Sizes.fixPadding,
        // borderWidth: 1,
        // borderColor: "#e9ecef",
        borderLeftWidth: 4.5,
        borderLeftColor: "#14B8A6",
    },

    rowTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    code: {
        ...Fonts.blackColor14Bold,
    },

    actions: {
        flexDirection: "row",
    },

    iconBtn: {
        marginLeft: 12,
    },

    labelBadge: {
        marginTop: 10,
        backgroundColor: "#E7F5FF",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: "flex-start",
    },

    labelText: {
        fontSize: 12,
        color: "#1971C2",
        fontWeight: "600",
    },

    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    metaTitle: {
        fontSize: 12,
        color: "#868e96",
    },

    metaValue: {
        fontSize: 13,
        fontWeight: "600",
    },
});
