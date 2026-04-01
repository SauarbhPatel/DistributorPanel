import React, { useState } from "react";
import { View, Alert } from "react-native";
import ProductListingCard from "./ProductListingCard";
import NoDataCard from "../common/NoDataCard";
import DeleteAlert from "../common/DeleteAlert";
import { __deleteApiData } from "../../utils/api";

const ProductListingList = ({
    list = [],
    onDone = () => {},
    onChange = () => {},
}) => {
    const [state, setState] = useState({
        loading: false,
        isShowDelete: false,
        itemId: null,
    });

    const updateState = (data) => setState((prev) => ({ ...prev, ...data }));

    const __handleDelete = async (id) => {
        try {
            updateState({ loading: true });

            const res = await __deleteApiData(`/product/delete/${id}`);

            if (res?.success) {
                onDone();
                updateState({
                    isShowDelete: false,
                    itemId: null,
                });
            } else {
                Alert.alert("Error", res?.message);
            }
        } catch (e) {
            Alert.alert("Error", "Something went wrong");
        } finally {
            updateState({ loading: false });
        }
    };

    return (
        <View style={{ flex: 1, padding: 15 }}>
            <DeleteAlert
                visible={state.isShowDelete}
                isLoading={state.loading}
                onCancel={() =>
                    updateState({
                        isShowDelete: false,
                        itemId: null,
                    })
                }
                onDelete={() => __handleDelete(state.itemId)}
            />

            {list.length > 0 ? (
                list.map((item, index) => (
                    <ProductListingCard
                        key={index}
                        item={item}
                        onDelete={() =>
                            updateState({
                                isShowDelete: true,
                                itemId: item?._id,
                            })
                        }
                        onEdit={() => onChange({ editItem: item })}
                        onView={() => onChange({ viewItem: item })}
                    />
                ))
            ) : (
                <NoDataCard
                    title="No Products Found"
                    subTitle="Start adding products to manage inventory and pricing."
                />
            )}
        </View>
    );
};

export default ProductListingList;
