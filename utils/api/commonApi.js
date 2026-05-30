import { __postApiData, __getApiData } from ".";
import { createCategoryList } from "../funtion";

const __uploadImage = async (img, type, name) => {
    const formData = new FormData();
    console.log({
        uri: img,
        type: type,
        name: name,
    });
    formData.append("file", {
        uri: img,
        type: type,
        name: name,
    });

    return __postApiData(`/s3upload/uploadSingleFile`, formData, "from")
        .then((res) => {
            console.log("AddImage", res);
            if (res.data) {
                return res.data;
            }
            return null;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
};

const __verifyPANno = async (panNumber) => {
    return __postApiData(`/kyc/pan`, { panNumber: panNumber })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
};
const __verifyAadhaarno = async (panNumber) => {
    return __postApiData(`/kyc/pan`, { panNumber: panNumber })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
};
const __getCountryList = async () => {
    return __getApiData(`/countries/getAllCountries`)
        .then((res) => {
            console.log(res);
            if (res.success) {
                return res?.data?.map((item) => ({
                    ...item,
                    id: item?._id,
                    name: `${item?.name} (${item?.code})`,
                }));
            }
            return [];
        })
        .catch((error) => {
            console.log(error);
            return [];
        });
};
const __getTaxTypeList = async () => {
    return __getApiData(`/taxTypes/getAllTaxTypes`)
        .then((res) => {
            if (res.success) {
                return res?.data?.records?.map((item) => ({
                    ...item,
                    id: item?._id,
                    // name: `${item?.name} (${item?.code})`,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getTaxList = async () => {
    return __getApiData(
        `/taxSlabs/getAllTaxSlabs?page=1&limit=100&search=${""}&sortBy=name&sortOrder=desc`,
    )
        .then((res) => {
            if (res.success) {
                return res?.data?.records?.map((item) => ({
                    ...item,
                    id: item?._id,
                    name: `${item?.rate}%`,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getHsnCodeList = async (taxRate, search) => {
    return __getApiData(
        `/hsnCodes/getAllHsnCode?search=${search}&page=1&limit=5&isActive=true&sortOrder=asc`,
    )
        .then((res) => {
            if (res.success) {
                return res?.data?.records?.map((item) => ({
                    ...item,
                    id: item?._id,
                    name: taxRate
                        ? `${item?.code} (${item?.taxRate}%)`
                        : `${item?.code}`,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getHsnSetList = async () => {
    return __getApiData(`/hsnSets/getAllHsnSetsForDropDown`)
        .then((res) => {
            if (res.success) {
                return res?.data?.map((item) => ({
                    ...item,
                    id: item?._id,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getAllComplianceDocumentList = async () => {
    return __getApiData(
        `/complianceDocument/getAllComplianceDocumentForDropdown`,
    )
        .then((res) => {
            if (res.success) {
                return res?.data?.map((item) => ({
                    ...item,
                    id: item?._id,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};

const __getShippingList = async () => {
    return __getApiData(`/shippingMethods/getAllShippingMethods`)
        .then((res) => {
            if (res.success) {
                return res?.data?.shippingMethods?.map((item) => ({
                    ...item,
                    id: item?._id,
                    name: item?.methodName,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getShippingZoneList = async () => {
    return __getApiData(`/shippingZone/getAllShippingZonesForDropDown`)
        .then((res) => {
            if (res.success) {
                return res?.data?.map((item) => ({
                    ...item,
                    id: item?._id,
                    name: item?.zoneName,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getLedgersList = async () => {
    return __getApiData(`/ledgers/getAllLedgers`)
        .then((res) => {
            if (res.success) {
                return res?.data?.map((item) => ({
                    ...item,
                    id: item?._id,
                    name: `${item?.name}`,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getAttributeSetList = async () => {
    return __getApiData(`/attributeSet/getAllAttributeSetWithoutPagination`)
        .then((res) => {
            if (res.success) {
                return res?.data?.map((item) => ({
                    ...item,
                    id: item?._id,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getProductAllAttributeList = async () => {
    return __getApiData(
        `/productAttributes/getAllAttributes?search=${""}&page=1&limit=100`,
    )
        .then((res) => {
            console.log(res);
            if (res.success) {
                return res?.data?.data?.map((item) => ({
                    // ...item,
                    attributeId: item?._id,
                    name: item?.name,
                    code: item?.code,
                    type: item?.type,
                    isMandatory: false,
                    isVariant: false,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};

const __getProductAttributeSetList = async () => {
    return __getApiData(
        `/productAttributes/getAllVariantAttributes?search=${""}`,
    )
        .then((res) => {
            console.log(res);
            if (res.success) {
                return res?.data?.data?.map((item) => ({
                    ...item,
                    id: item?._id,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getProductRegularAttributeSetList = async () => {
    return __getApiData(
        `/productAttributes/getAllRegularAttributes?search=${""}`,
    )
        .then((res) => {
            console.log(res);
            if (res.success) {
                return res?.data?.data?.map((item) => ({
                    ...item,
                    id: item?._id,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getBrandList = async () => {
    // return __getApiData(`/brands/getAllBrand`)
    return __getApiData(
        `/brands/getAllBrand?page=1&limit=100&sortBy=name&sortOrder=desc`,
    )
        .then((res) => {
            console.log(res);
            if (res.success) {
                return res?.data?.records?.map((item) => ({
                    ...item,
                    id: item?._id,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getBrandByCategoryIdList = async (categoryId) => {
    return __getApiData(`/brands/getBrandByCategoryId/${categoryId}`)
        .then((res) => {
            console.log(res);
            if (res.success) {
                return res?.data?.map((item) => ({
                    ...item,
                    id: item?._id,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getHSNByCategoryIdList = async (categoryId) => {
    return __getApiData(`/categories/getHsnCodesByCategoryId/${categoryId}`)
        .then((res) => {
            console.log(res);
            if (res.success) {
                return res?.data?.records?.map((item) => ({
                    ...item,
                    id: item?._id,
                    name: item?.code,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getRegularAttributeByAttributeSetList = async (categoryId) => {
    console.log("getRegularAttributeByAttributeSet");
    return __getApiData(
        `/attributeSet/getRegularAttributeByAttributeSet/${categoryId}`,
    )
        .then((res) => {
            console.log("getRegularAttributeByAttributeSet", res);
            if (res.success) {
                return res?.data?.attributeSets[0];
            }
            return null;
        })
        .catch((error) => {
            return null;
        });
};
const __getSelectedVarinetAttributesList = async (categoryId) => {
    return __getApiData(
        `/categories/getSelectedVarinetAttributesByCategoryId/${categoryId}`,
    )
        .then((res) => {
            if (res.success) {
                return res?.data?.variantAttributes;
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getProductCategoryList = async () => {
    return __getApiData(`/categories/getCategoryTreeDropdown`)
        .then((res) => {
            console.log(JSON.stringify(res));
            if (res.success) {
                return res?.data?.map((item) => ({
                    ...item,
                    id: item?.value,
                    name: item?.label,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getAttributeSetById = async (id) => {
    return __getApiData(`/attributeSet/getAttributeSetById/${id}`)
        .then((res) => {
            if (res.success) {
                return res?.data;
            }
            return null;
        })
        .catch((error) => {
            return null;
        });
};
const __getTaxJurisdictionsList = async () => {
    return __getApiData(`/jurisdictions/getAllJurisdictions?page=1&limit=100`)
        .then((res) => {
            if (res.success) {
                return createCategoryList(res?.data?.records);
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getTaxKindList = async () => {
    return __getApiData(`/tax-kinds/getTaxKindsForDropdown`)
        .then((res) => {
            if (res.success) {
                return res?.data?.records?.map((item) => ({
                    ...item,
                    id: item?._id,
                    name: item?.name,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getDistributorPickupPointsList = async () => {
    return __getApiData(`/users/distributor/pickupPoints`)
        .then((res) => {
            if (res.success) {
                return res?.data?.pickupPoints?.map((item) => ({
                    ...item,
                }));
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};

export {
    __uploadImage,
    __verifyPANno,
    __getCountryList,
    __getTaxTypeList,
    __getTaxList,
    __getHsnCodeList,
    __getHsnSetList,
    __getLedgersList,
    __getAttributeSetList,
    __getProductAllAttributeList,
    __getProductAttributeSetList,
    __getProductRegularAttributeSetList,
    __getProductCategoryList,
    __getBrandList,
    __getTaxJurisdictionsList,
    __getAllComplianceDocumentList,
    __getAttributeSetById,
    __getShippingList,
    __getShippingZoneList,
    __getTaxKindList,
    __getBrandByCategoryIdList,
    __getHSNByCategoryIdList,
    __getDistributorPickupPointsList,
    __getRegularAttributeByAttributeSetList,
    __getSelectedVarinetAttributesList,
};

// ─── Orders ───────────────────────────────────────────────────────────────────
export const getOrderStatusCounts = () =>
    __getApiData(`/order/counts/status-substatus`);

export const getCategoryTreeDropdown = () =>
    __getApiData(`/categories/getCategoryTreeDropdown`);

export const getOrderList = (params = {}) => {
    const query = Object.entries(params)
        .filter(([_, v]) => v !== null && v !== undefined && v !== "")
        .map(([k, v]) =>
            Array.isArray(v)
                ? v.map((i) => `${k}=${encodeURIComponent(i)}`).join("&")
                : `${k}=${encodeURIComponent(v)}`,
        )
        .join("&");
    return __getApiData(`/order/list?${query}`);
};
