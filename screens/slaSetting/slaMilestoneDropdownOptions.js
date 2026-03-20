import React, { useState } from "react";
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
import SLARuleModal from "../../components/slaSettings/SLARuleModal";
import OptionModal from "../../components/slaSettings/OptionModal";

const options = [
    {
        code: "ORDER_CREATED",
        label: "Order created",
        order: 1,
        active: true,
    },
    {
        code: "STATUS_ENTERED",
        label: "Status entered",
        order: 2,
    },
    {
        code: "PAYMENT_CAPTURED",
        label: "Payment captured",
        order: 3,
    },
    {
        code: "PO_APPROVED",
        label: "PO approved (B2B)",
        order: 4,
    },
];

const SlaMilestoneDropdownOptions = ({ navigation }) => {
    const [state, setState] = useState({
        loading: false,
        isShowCreate: false,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const { loading, isShowCreate } = state;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />

            <View style={{ flex: 1 }}>
                <CommonHeader
                    title={"Milestone dropdown options"}
                    navigation={navigation}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    <SlaHeader
                        title="Milestone dropdown options"
                        subTitle="Create and manage options for Start trigger, End trigger, Duration type, and Severity used in Add Milestone."
                        buttonName="Add option"
                        onPressButton={() => {
                            updateState({ isShowCreate: true });
                        }}
                    />

                    {optionTypeDropdown()}

                    {options.map((item, index) => (
                        <OptionCard item={item} key={index} />
                    ))}
                </ScrollView>

                <OptionModal
                    visible={isShowCreate}
                    onClose={() => updateState({ isShowCreate: false })}
                />
            </View>
        </SafeAreaView>
    );

    function optionTypeDropdown() {
        return (
            <View style={styles.dropdownBox}>
                <Text style={styles.dropdownLabel}>Option type</Text>

                <View style={styles.dropdown}>
                    <Text style={{ ...Fonts.grayColor13Regular }}>
                        Start Trigger
                    </Text>

                    <MaterialIcons name="keyboard-arrow-down" size={22} />
                </View>
            </View>
        );
    }
};

export default SlaMilestoneDropdownOptions;

const OptionCard = ({ item }) => {
    const [state, setState] = useState({
        loading: false,
        isShowCreate: false,
    });
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const { loading, isShowCreate } = state;
    return (
        <View style={styles.card}>
            <OptionModal
                edit
                visible={isShowCreate}
                onClose={() => updateState({ isShowCreate: false })}
            />
            <View style={styles.rowTop}>
                <Text style={styles.code}>{item.code}</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Feather
                            name="edit-2"
                            size={16}
                            color="#495057"
                            onPress={() => {
                                updateState({ isShowCreate: true });
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconBtn}>
                        <Feather name="trash-2" size={16} color="#fa5252" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.labelBadge}>
                <Text style={styles.labelText}>{item.label}</Text>
            </View>

            <View style={styles.metaRow}>
                <Text style={styles.metaTitle}>Order</Text>
                <Text style={styles.metaValue}>{item.order}</Text>
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
