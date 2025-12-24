import React from "react";
import ItemCard from "./ItemCard";

const Purchase = () => {
    return (
        <>
            <ItemCard
                title="Purchase Order Register (Item-wise)"
                sub_title="Item-wise details of all purchase orders along with delivered quantity"
            />
            <ItemCard
                title="Purchase Invoice Register"
                sub_title="Details of all the purchase invoice along with their payment status"
            />
            <ItemCard
                title="Service Items Reconciliation"
                sub_title="Item-wise in/out quantity against service order (minus sub-contract)"
            />
        </>
    );
};

export default Purchase;
