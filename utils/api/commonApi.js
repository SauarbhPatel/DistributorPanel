import { __postApiData, __getApiData } from ".";

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
                return res?.data?.map((item) => ({
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
    return __getApiData(`/taxes/getAllTax`)
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
const __getHsnCodeList = async () => {
    return __getApiData(`/hsnCodes/getAllHsnCode`)
        .then((res) => {
            if (res.success) {
                return res?.data?.map((item) => ({
                    ...item,
                    id: item?._id,
                    name: `${item?.code}`,
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

export {
    __uploadImage,
    __verifyPANno,
    __getCountryList,
    __getTaxTypeList,
    __getTaxList,
    __getHsnCodeList,
    __getLedgersList,
};
