import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../../constants/styles";
import { FontAwesome } from "@expo/vector-icons";
import { SelectForm } from "../../../modules";
const TitleLableWithFilter = ({ title, lable, filter, filterList = [] }) => {
    const [state, setState] = useState({
        loading: false,
        active: "Sales",
        isShow: false,
        selected: filterList[0],
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { loading, active, isShow, selected } = state;

    return (
        <>
            <SelectForm
                isShow={isShow}
                title="Filter"
                selected={selected?.id}
                list={filterList}
                onBackdrop={() => {
                    updateState({ isShow: false });
                }}
                onSelected={(data) => {
                    updateState({ selected: data, isShow: false });
                }}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...Fonts.blackColor13SemiBold }}>
                        {title}
                    </Text>
                    {lable ? (
                        <Text
                            style={{
                                ...Fonts.blackColor11Medium,
                                color: Colors.grayColor,
                            }}
                        >
                            Showing {selected?.name}
                        </Text>
                    ) : null}
                </View>
                {filter ? (
                    <TouchableOpacity
                        onPress={() => updateState({ isShow: true })}
                        style={{
                            backgroundColor: Colors.borderColor,
                            padding: 7,
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                            borderRadius: 5,
                        }}
                    >
                        <FontAwesome
                            name="filter"
                            color={Colors.blackColor}
                            size={14}
                        />
                        <Text
                            style={{
                                ...Fonts.blackColor13Medium,
                            }}
                        >
                            filter
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </>
    );
};

export default TitleLableWithFilter;
