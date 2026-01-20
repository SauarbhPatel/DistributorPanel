import React from "react";
import ItemCard from "./ItemCard";
import { FlatList } from "react-native";

const ResourcePlanning = () => {
    return (
        <>
            <FlatList
                ListHeaderComponent={
                    <>
                        <ItemCard
                            title="Basic Material Planning"
                            sub_title="Run basic MRP for all items"
                        />
                        <ItemCard
                            title="Order Confirmation"
                            sub_title="Run MRP for line items in Order Confirmation (after creation of work order)"
                        />
                        <ItemCard
                            title="Process Details"
                            sub_title="Run MRP for processes created"
                        />
                        <ItemCard
                            title="Finished Goods Details"
                            sub_title="Run MRP for finished goods using BOM"
                        />
                    </>
                }
            />
        </>
    );
};

export default ResourcePlanning;
