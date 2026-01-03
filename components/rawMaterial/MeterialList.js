import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { __generateRandomString } from "../../utils/funtion";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import ListCard from "./ListCard";

const MeterialList = () => {
    const [list, setlist] = useState([
        {
            RawMaterialName: "Steel Rod",
            unitOfMeasurement: "Kg",
            minimumStockLevel: "500",
            descriptionNotes: "Used for structural fabrication",
        },
        {
            RawMaterialName: "Aluminium Sheet",
            unitOfMeasurement: "Sheet",
            minimumStockLevel: "200",
            descriptionNotes: "Lightweight material for panel manufacturing",
        },
        {
            RawMaterialName: "Copper Wire",
            unitOfMeasurement: "Meter",
            minimumStockLevel: "1000",
            descriptionNotes: "Electrical wiring and connections",
        },
        {
            RawMaterialName: "Industrial Paint",
            unitOfMeasurement: "Litre",
            minimumStockLevel: "150",
            descriptionNotes: "Protective coating for metal surfaces",
        },
    ]);
    return (
        <>
            <FlatList
                data={list}
                renderItem={({ item }) => <ListCard item={item} />}
                keyExtractor={() => __generateRandomString(10)}
                contentContainerStyle={{
                    gap: 10,
                    paddingTop: 10,
                    paddingBottom: 20,
                }}
            />
        </>
    );
};

export default MeterialList;
const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        elevation: 2.0,
    },

    returnAndExchangeItemInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderWidth: 1.5,
        borderColor: Colors.borderColor,
        paddingBottom: 20,
    },
});
