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
import WorkingHoursCard from "../../components/slaSettings/WorkingHoursCard";
import WorkingHoursHeader from "../../components/slaSettings/WorkingHoursHeader";

const options = [
    {
        id: 1,
        date: "2025-01-26",
        name: "Republic Day",
        region: "IN",
        assignTo: "All sellers",
        statusColor: "#007bff",
    },
    {
        id: 2,
        date: "2025-08-15",
        name: "Independence Day",
        region: "IN",
        assignTo: "All sellers",
        statusColor: "#20c997",
    },
    {
        id: 3,
        date: "2025-12-25",
        name: "Christmas",
        region: "IN",
        assignTo: "Tier: DIAMOND",
        statusColor: "#20c997",
    },
];

const SlaHolidayWorkingHours = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"Holiday & Working Hours"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <SlaHeader
                        title="Holiday & Working Hours"
                        subTitle="Working days, working hours, daily cutoff, holiday calendar by region.  Assign to all sellers, a seller tier (Silver, Gold, Diamond), or a  specific seller."
                    />
                    <WorkingHoursHeader
                        title="Working hours by region"
                        buttonName={"Add"}
                        count={2}
                        onAdd={() => {}}
                    />
                    {[
                        {
                            id: 1,
                            regionCode: "IN",
                            timezone: "Asia/Kolkata",
                            assignTo: "All sellers",
                            days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                            workingHours: "10:00 - 19:00",
                            cutoffTime: "17:00",
                            calendarCode: "cal-in",
                            themeColor: "#007bff",
                        },
                        {
                            id: 2,
                            regionCode: "IN",
                            timezone: "Asia/Kolkata",
                            assignTo: "Tier: GOLD",
                            days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                            workingHours: "09:00 - 18:00",
                            cutoffTime: "16:00",
                            calendarCode: "cal-in",
                            themeColor: "#f08c00",
                        },
                    ].map((item, index) => (
                        <WorkingHoursCard item={item} key={index} />
                    ))}
                    <WorkingHoursHeader
                        title="Holidays"
                        buttonName={"Add"}
                        count={2}
                        onAdd={() => {}}
                    />
                    {options.map((item, index) => (
                        <OptionCard item={item} key={index} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SlaHolidayWorkingHours;

const OptionCard = ({ item }) => {
    return (
        <View style={[styles.card, { borderLeftColor: item.statusColor }]}>
            {/* DATE & ACTIONS ROW */}
            <View style={styles.rowTop}>
                <Text style={styles.code}>{item.date}</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Feather name="edit-2" size={16} color="#495057" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBtn}>
                        <Feather name="trash-2" size={16} color="#fa5252" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* ASSIGN TO BADGE */}
            <View style={styles.labelBadge}>
                <Text style={styles.labelText}>{item.assignTo}</Text>
            </View>

            {/* NAME & REGION */}
            <View style={styles.metaRow}>
                <Text style={styles.metaTitle}>{item.name}</Text>
                <Text style={styles.metaValue}>{item.region}</Text>
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
