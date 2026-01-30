import axios from "axios";
import { __getToken } from "../localization";
import AppInfo from "../../appInfo";

const _HOST = AppInfo?.Api;
const _CompanyId = AppInfo?.companyId;

// New type Apis

export function __apiHeaderNew() {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + __getToken(),
            "X-Company-Id": _CompanyId,
        },
    };
}

export function __apiHeaderFormDataNew() {
    return {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + __getToken(),
            "X-Company-Id": _CompanyId,
        },
    };
}

export const __getApiData = (endpoint) => {
    return axios
        .get(`${_HOST}${endpoint}`, __apiHeaderNew())
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

export const __postApiData = (endpoint, data, type) => {
    return axios
        .post(
            `${_HOST}${endpoint}`,
            data,
            type == "from" ? __apiHeaderFormDataNew() : __apiHeaderNew(),
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

export const __putApiData = (endpoint, data, type) => {
    return axios
        .put(
            `${_HOST}${endpoint}`,
            data,
            type == "from" ? __apiHeaderFormDataNew() : __apiHeaderNew(),
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};
export const __patchApiData = (endpoint, data, type) => {
    console.log(`${_HOST}${endpoint}`);
    return axios
        .patch(
            `${_HOST}${endpoint}`,
            data,
            type == "from" ? __apiHeaderFormDataNew() : __apiHeaderNew(),
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

export const __deleteApiData = (endpoint, data) => {
    console.log(`${_HOST}${endpoint}`);
    return axios
        .delete(`${_HOST}${endpoint}`, { data: data, ...__apiHeaderNew() })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
            throw error;
        });
};
// old type Apis

export function __apiHeader(accesToken) {
    return {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accesToken,
        "X-Company-Id": _CompanyId,
    };
}
export function __apiFormHeader(accesToken) {
    return {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + accesToken,
        "X-Company-Id": _CompanyId,
    };
}

export function __makeVerifyLoginPostRequest(apidata) {
    const url = _HOST + "/auth/phone/verify";
    return axios
        .post(url, apidata)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeBannerGetRequest(apiParams) {
    const url = _HOST + "/banner" + apiParams;
    // const url = _HOST + "/banner/public" + apiParams;
    const headers = __apiHeader();
    //console.log(url, headers);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeFeaturedCategoryGetRequest(apidata) {
    const url = _HOST + "/category/filter";
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __getTrendingProductsGetRequest() {
    const url = _HOST + "/trending";
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeProductsGetRequest(page, count) {
    const url = _HOST + "/product/page/" + page + "&" + count;
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeProductDetailsGetRequest(uid, variant_slug) {
    const url = _HOST + "/product/public/" + uid + "/" + variant_slug;
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __getComboRequest(uid, variant_slug) {
    const url = _HOST + "/comboDeal/product/" + uid + "/" + variant_slug;
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeTrendingSearchesGetRequest() {
    const url = _HOST + "/product/trendingSearches";
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeSearchesGetRequest(search) {
    const url = _HOST + "/product/search/" + search;
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeProductDeliveryCheckPostRequest(apidata) {
    const url = _HOST + "/delivery-service/pincode";
    const headers = __apiHeader();

    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeLoginPostRequest(apidata) {
    // const url = _HOST + "/user/login-otp";
    const url = _HOST + "/user/login-nw";
    const headers = __apiHeader();

    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __verifyLoginPostRequest(apidata) {
    // const url = _HOST + "/user/login-otp-verify";
    const url = _HOST + "/user/login-nw-vf";
    const headers = __apiHeader();

    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function __makeCategoryProductsGetRequest(uid) {
    const url = _HOST + "/product/category/" + uid;
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeProductsWithCategoryGetRequest(filter) {
    const url = _HOST + "/category/filter/categ";
    const headers = __apiHeader();

    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeProductsWithFilterPostRequest(filter) {
    const url = _HOST + "/product/filter";
    const headers = __apiHeader();

    return axios
        .post(url, filter, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function __makeFilterCateggoryGetRequest() {
    const url = _HOST + "/category/public";
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeLevelCateggoryGetRequest() {
    const url = _HOST + "/category/level";
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeChildCateggoryPostRequest(apidata) {
    const url = _HOST + "/category/public/child";
    const headers = __apiHeader();
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function __makeFilterBrandGetRequest() {
    const url = _HOST + "/brand/public";
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeLanguageGetRequest() {
    const url = _HOST + "/language";
    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function __makeCurrentLanguageGetRequest() {
    const url = _HOST + "/settings/language";
    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function __makeChangeLanguagePutRequest(apidata) {
    const url = _HOST + "/settings/change/language";
    return axios
        .put(url, apidata)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeCountryGetRequest() {
    const url = _HOST + "/country";
    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeCurrentCountryGetRequest() {
    const url = _HOST + "/settings/country";
    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeChangeCountryPutRequest(apidata) {
    const url = _HOST + "/settings/change/country";
    return axios
        .put(url, apidata)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function __makeCartGetRequest(token, cart) {
    const url = _HOST + `/cart?products=${cart}&coupon=`;
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeGetAbndtRequest(token, id) {
    const url = _HOST + `/abndt/` + id;
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function __makeAddToCartPostRequest(apidata, token, cart) {
    const url = _HOST + `/cart?products=${cart}&coupon=`;
    const headers = __apiHeader(token);
    //console.log(url);
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeDeleteToCartDeleteRequest(token, cart) {
    const url = _HOST + `/cart?products=${cart}&coupon=`;
    const headers = __apiHeader(token);

    return axios
        .delete(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeDeleteCartItemDeleteRequest(token, cart, index) {
    // const url = _HOST + "/cart/" + index;
    const url = _HOST + `/cart/${index}?products=${cart}&coupon=`;
    const headers = __apiHeader(token);

    return axios
        .delete(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeUpdateCartItemRequest(apidata, token, cart) {
    const url = _HOST + `/cart?products=${cart}&coupon=`;
    const headers = __apiHeader(token);

    return axios
        .put(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeCheckoutRequest(token, cart) {
    const url = _HOST + `/cart/checkout?products=${cart}&coupon=`;
    const headers = __apiHeader(token);

    return axios
        .post(url, {}, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeProductQueriesGetRequest(token, prodId, varId) {
    const url =
        _HOST + `/productQueries/public?prodId=${prodId}&varId=${varId}`;
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function __makeAddQuestionPostRequest(apidata, token) {
    const url = _HOST + "/productQueries/add";
    const headers = __apiHeader(token);
    //console.log(apidata, headers);
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeLikeDisLikePostRequest(apidata, token) {
    const url = _HOST + "/productQueries/reaction";
    const headers = __apiHeader(token);
    //console.log(apidata, headers);
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeWishListGetRequest(token) {
    // const url = _HOST + "/user/wishlist";
    const url = _HOST + "/user/wishlist_nw";
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeAddWishListGetRequest(apidata, token) {
    // const url = _HOST + "/product/wishlist";
    const url = _HOST + "/product/wishlist_nw";
    const headers = __apiHeader(token);
    //console.log(apidata, headers);
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function __makeOrderPostRequest(apidata, token, cart) {
    // const url = _HOST + "/order/temp_cart";
    // const url = _HOST + "/order/temp_cart_nw?products=" + cart;
    const url = _HOST + `/order/temp_cart_nw?products=${cart}&coupon=`;

    const headers = __apiHeader(token);
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            //console.log(error);
            throw error;
        });
}
export function __makeOrderCheckoutPostRequest(apidata, token) {
    const url = _HOST + `/paymentGate/razorpay-nw`;
    const headers = __apiHeader(token);
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            //console.log(error);
            throw error;
        });
}
export function __makeAddAddressPostRequest(apidata, token) {
    const url = _HOST + "/user/register/billAddress";
    const headers = __apiHeader(token);
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeUpdateAddressPostRequest(apidata, id, token) {
    const url = _HOST + "/user/register/billAddress-new/" + id;
    const headers = __apiHeader(token);
    return axios
        .put(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeShipingAddressGetRequest(token) {
    const url = _HOST + "/shippingAddress/customer/shipping";
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeBillingAddressGetRequest(token) {
    const url = _HOST + "/user/billAddress";
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeGetOrderListGetRequest(token) {
    const url = _HOST + "/order/getorderbyuser";
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeGetOrderDetailsGetRequest(id, token) {
    const url = _HOST + "/order/getorderById/" + id;
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeGetTimeSlotGetRequest() {
    const url = _HOST + "/timeGroup/public";
    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeGetProfileDetailsGetRequest(token) {
    const url = _HOST + "/user/profile";
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeUpdateProfileDetailsPutRequest(apidata, token) {
    const url = _HOST + "/user/profile-update";
    const headers = __apiHeader(token);
    return axios
        .put(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeUpdateProfileImagePostRequest(apidata, token) {
    const url = _HOST + "/image/addImage";
    const headers = __apiFormHeader(token);
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeCreateTicketPostRequest(apidata, token) {
    // const url = _HOST + "/ticketList/add_Tickets";
    const url = _HOST + "/dmtdisputeChat/add_dispute/public";
    const headers = __apiHeader(token);
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeGetTicketGetRequest(apidata, token) {
    // const url = _HOST + "/ticketList/user";
    const url = _HOST + "/dmtDisputes/public";
    const headers = __apiHeader(token);
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeGetTicketMessageGetRequest(token, id) {
    const url =
        _HOST + "/dmtdisputechat/public?dispute_id=" + id + "&count=20&page=0";
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeTrackOrderPostRequest(apidata) {
    const url = _HOST + "/track-order/public";
    return axios
        .post(url, apidata)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeApplyCoupenPostRequest(apidata) {
    const url = _HOST + "/cart/coupon";
    return axios
        .post(url, apidata)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeGetCoupenGetRequest() {
    const url = _HOST + "/coupons/public";
    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeGetFAQGetRequest(token) {
    const url = _HOST + "/faqs";
    const headers = __apiHeader(token);

    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeGetFAQDetailsGetRequest(id) {
    const url = _HOST + "/faqs/categ/" + id;
    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function __makeGetBlogGetRequest() {
    // const url = _HOST + "/blogsCat";
    const url = _HOST + "/blogs";
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function __makeGetBlogDetailsGetRequest(id) {
    // const url = _HOST + "/blogs/categ/" + id;
    const url = _HOST + "/blogs/" + id;
    const headers = __apiHeader();
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeTandSGetRequest() {
    const url = _HOST + "/pages/public?type=terms-condition";
    const headers = __apiHeader();

    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makePPGetRequest() {
    const url = _HOST + "/pages/public?type=privacy-policy";
    const headers = __apiHeader();

    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

export function __makeGetReasonGetRequest(token) {
    const url = _HOST + "/cancelReason";
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeCancelOrderPostRequest(apidata, token) {
    const url = _HOST + "/cancelOrder/addReasonOrder";
    const headers = __apiHeader(token);
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeReturnPostRequest(apidata, token) {
    const url = _HOST + "/rma/requestRMA";
    const headers = __apiHeader(token);
    return axios
        .post(url, apidata, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeGetRMAGetRequest(token) {
    const url = _HOST + "/rma/user";
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
export function __makeGetresionListGetRequest(token) {
    const url = _HOST + "/rmareason";
    const headers = __apiHeader(token);
    return axios
        .get(url, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}
