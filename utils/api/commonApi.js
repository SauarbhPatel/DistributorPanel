import { __postApiData, __getApiData } from ".";
import { createCategoryList } from "../funtion";

const __uploadImage = async (img, type, name) => {
    const formData = new FormData();
    formData.append("file", {
        uri: img,
        type: type,
        name: name,
    });

    return __postApiData(`/s3upload/uploadSingleFile`, formData, "from")
        .then((res) => {
            console.log("AddImage", res);
            if (res.url) {
                return {
                    fullUrl: res.url,
                    path: res.url,
                };
            }
            return {
                fullUrl: null,
                path: null,
            };
        })
        .catch((error) => {
            console.log(error);
            return {
                fullUrl: null,
                path: null,
            };
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
        `/taxes/getAllTaxSlabs?page=1&limit=100&search=${""}&sortBy=name&sortOrder=desc`,
    )
        .then((res) => {
            if (res.success) {
                return res?.data?.map((item) => ({
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
const __getHsnCodeList = async (taxRate) => {
    return __getApiData(`/hsnCodes/getAllHsnCode`)
        .then((res) => {
            if (res.success) {
                return res?.data?.map((item) => ({
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
    return __getApiData(`/hsnSets/getAllHsnSets`)
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
    return __getApiData(`/attributeSet/getAllAttributeSet`)
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
    return __getApiData(`/brands/getAllBrand`)
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
const __getProductCategoryList = async () => {
    return __getApiData(`/categories/getCategoryTree?page=1&limit=10`)
        .then((res) => {
            if (res.success) {
                return createCategoryList(res?.data?.nestedData);
            }
            return [];
        })
        .catch((error) => {
            return [];
        });
};
const __getTaxJurisdictionsList = async () => {
    return __getApiData(`/jurisdictions/getAllJurisdictions?page=1&limit=10`)
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
};
