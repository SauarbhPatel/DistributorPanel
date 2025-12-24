import React from "react";
import ItemCard from "./ItemCard";

const Sales = () => {
    return (
        <>
            <ItemCard
                title="Order Confirmation / Sales Order Register"
                sub_title="Details of all the order confirmation along with their dispatch status"
            />
            <ItemCard
                title="Order Confirmation / Sales Order Register (Item-wise)"
                sub_title="Item-wise details of all the order confirmation along with their status"
            />
            <ItemCard
                title="Sales Invoice Register"
                sub_title="Details of all the sales invoice along with their payment status"
            />
            <ItemCard
                title="Sales Invoice Register (Item-wise)"
                sub_title="Item-wise details of all the sales invoice"
            />
            <ItemCard
                title="Sales Quotation Register"
                sub_title="Details of all the sales quotations along with their conversion status"
            />
        </>
    );
};

export default Sales;
