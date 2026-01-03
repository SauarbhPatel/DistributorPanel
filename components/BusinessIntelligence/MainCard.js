import React from "react";
import { View } from "react-native";
import { Colors } from "../../constants/styles";
import TitleLableWithFilter from "./common/TitleLableWithFilter";
import CardBox from "./common/CardBox";
import { __generateRandomString } from "../../utils/funtion";

const DataObject = {
    Sales: [
        {
            id: __generateRandomString(5),
            title: "Sales",
            lable: "Showing Today",
            filter: true,
            filterList: [
                { id: "Today", name: "Today" },
                { id: "Yesterday", name: "Yesterday" },
                { id: "Month to Date", name: "Month to Date" },
                { id: "Quarter to Date", name: "Quarter to Date" },
            ],
            list: [
                {
                    id: __generateRandomString(5),
                    title: "Quotations",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "0",
                            count: 0,
                            countLable: "Quotations",
                        },
                    ],
                },
                {
                    id: __generateRandomString(5),
                    title: "Coverted Quotations",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "0.00",
                            count: 0,
                            countLable: "Quotations",
                            percent: "0.00%",
                        },
                    ],
                },
                {
                    id: __generateRandomString(5),
                    title: "Orders",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "0.00",
                            count: 0,
                            countLable: "OCs/SCs",
                        },
                    ],
                },
                {
                    id: __generateRandomString(5),
                    title: "Invoices",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "0.00",
                            count: 0,
                            countLable: "Invoices",
                        },
                    ],
                },
            ],
        },
    ],
    Purchase: [
        {
            id: __generateRandomString(5),
            title: "Purchase",
            lable: "Showing Today",
            filter: true,
            filterList: [
                { id: "Today", name: "Today" },
                { id: "Yesterday", name: "Yesterday" },
                { id: "Month to Date", name: "Month to Date" },
                { id: "Quarter to Date", name: "Quarter to Date" },
            ],
            list: [
                {
                    id: __generateRandomString(5),
                    title: "Created POs",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "0",
                            count: 0,
                            countLable: "POs",
                        },
                    ],
                },
                {
                    id: __generateRandomString(5),
                    title: "Delivered POs",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "0.00",
                            count: 0,
                            countLable: "POs",
                            percent: "0.00%",
                        },
                    ],
                },
            ],
        },
    ],
    Inventory: [
        {
            id: __generateRandomString(5),
            title: "Inventory",
            lable: "",
            filter: false,
            list: [
                {
                    id: __generateRandomString(5),
                    title: "Stock Valuation (By FIFO)",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "77,65,015.00",
                            count: 22,
                            countLable: "Items",
                        },
                    ],
                },
            ],
        },
        {
            id: __generateRandomString(5),
            title: "Top 5 Selling Items",
            lable: "Last 3 months",
            filter: false,
            list: [
                {
                    id: __generateRandomString(5),
                    title: "Finished Good #1",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "7,500.00",
                            count: 1,
                            countLable: "Invoices",
                        },
                    ],
                },
            ],
        },
        {
            id: __generateRandomString(5),
            title: "Top 5 Ourchased Items",
            lable: "Last 3 months",
            filter: false,
            list: [
                {
                    id: __generateRandomString(5),
                    title: "Row Material 1",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "1,500.00",
                            count: 1,
                            countLable: "Invoices",
                        },
                    ],
                },
                {
                    id: __generateRandomString(5),
                    title: "Row Material 2",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "1,150.00",
                            count: 1,
                            countLable: "Invoices",
                        },
                    ],
                },
            ],
        },
    ],
    Production: [
        {
            id: __generateRandomString(5),
            title: "Production",
            lable: "Showing Month to Date",
            filter: true,
            filterList: [
                { id: "Month to Date", name: "Month to Date" },
                { id: "Last 30 Days", name: "Last 30 Days" },
                {
                    id: "Financial Year to Date",
                    name: "Financial Year to Date",
                },
                {
                    id: "Previous Financial Year",
                    name: "Previous Financial Year",
                },
            ],
            list: [
                {
                    id: __generateRandomString(5),
                    title: "FG Produced",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "0.00",
                        },
                    ],
                },
                {
                    id: __generateRandomString(5),
                    title: "RM Consumed",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "0.00",
                        },
                    ],
                },
                {
                    id: __generateRandomString(5),
                    title: "Scrap Generated",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "0.00",
                        },
                    ],
                },
                {
                    id: __generateRandomString(5),
                    title: "RM Rejected",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "0.00",
                        },
                    ],
                },
            ],
        },
    ],
    Accounts: [
        {
            id: __generateRandomString(5),
            title: "Accounts",
            lable: "Showing Today",
            filter: true,
            filterList: [
                { id: "Today", name: "Today" },
                { id: "Yesterday", name: "Yesterday" },
                { id: "Month to Date", name: "Month to Date" },
                { id: "Last 30 Days", name: "Last 30 Days" },
            ],
            list: [
                {
                    id: __generateRandomString(5),
                    title: "Overview",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "0.00",
                            countLable: "Amount Received",
                        },
                        {
                            id: __generateRandomString(5),
                            amount: "0.00",
                            countLable: "Amount Paid",
                        },
                    ],
                },
            ],
        },
        {
            id: __generateRandomString(5),
            title: "Receivables & Payables",
            lable: "Showing Overdue",
            filter: true,
            filterList: [
                { id: "Overdue", name: "Overdue" },
                { id: "In Next 7 Days", name: "In Next 7 Days" },
                { id: "8-15 Days", name: "8-15 Days" },
                { id: "16+ Days", name: "16+ Days" },
            ],
            list: [
                {
                    id: __generateRandomString(5),
                    title: "Receivables",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "7,500",
                            count: 1,
                            countLable: "documents",
                        },
                    ],
                },
                {
                    id: __generateRandomString(5),
                    title: "Payables",
                    list: [
                        {
                            id: __generateRandomString(5),
                            amount: "3,650",
                            count: 1,
                            countLable: "documents",
                        },
                    ],
                },
            ],
        },
    ],
};

const MainCard = ({ active }) => {
    console.log(active);
    return (
        <View
            style={{
                backgroundColor: Colors.whiteColor,
                padding: 10,
                marginTop: 5,
            }}
        >
            {DataObject[active]?.map((item) => (
                <View key={item?.id} style={{ marginTop: 15 }}>
                    <TitleLableWithFilter
                        title={item?.title}
                        lable={item?.lable}
                        filter={item?.filter}
                        filterList={item?.filterList || []}
                    />
                    {item?.list?.map((li) => (
                        <CardBox key={li?.id} {...li} />
                    ))}
                </View>
            ))}
        </View>
    );
};

export default MainCard;
