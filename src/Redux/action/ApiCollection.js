import { actionType } from "../type/types";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { toast } from "react-toastify";
import fileDownload from "js-file-download";
var fs = require("fs");

let BearerToken = reactLocalStorage.get("token", false);
export const getViewProfile = () => {
  return async (dispatch, getState) => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/viewprofile`, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   Authorization: `Bearer ${BearerToken}`,
    // }

    // let reqOptions = {
    //   url: `${process.env.REACT_APP_BASE_URL}/viewprofile`,
    //   method: "POST",
    //   headers: headersList,
    // }
    // let response = await axios.request(reqOptions);

    dispatch({
      type: actionType.ViewProfile_Type,
      payload: response,
    });
  };
};

export const getOrderAddress = () => {
  return async (dispatch, getState) => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/address/saved_address`, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/address/saved_address`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);

    dispatch({
      type: actionType.ViewOrderDetails_Type,
      payload: response,
    });
  };
};

const userPatchadata = () => ({
  type: actionType.PatchUserDetails_Type,
});

export const PatchUserDetails = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(`${process.env.REACT_APP_BASE_URL}/editprofile`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Profile updated successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(userPatchadata());
  };
};

const DeleteAddressData = (data) => ({
  type: actionType.DeleteUserAddress_Type,
  payload: data,
});

export const DeleteUserAddress = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/address/delete_address`, {
        data: payload,
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        // dispatch(GetSettingUserInfo());
        toast.success("Address Deleted successfully");
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    console.log(response);
    dispatch(DeleteAddressData(response));
  };
};

const ResetPasswordPatch = (data) => ({
  type: actionType.ResetPasswordPatchReducer_Type,
  payload: data,
});

export const ResetPatchPassword = (payload) => {
  console.log(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/address/resetpassword`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("password changed successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(ResetPasswordPatch(responce));
  };
};

const PostPincodesAvailabilityDispatch = (data) => ({
  type: actionType.PostPincodesAvailabilityDispatch_Type,
  payload: data,
});
export const PostPincodesAvailability = (payload) => {
  console.log(payload);

  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/shipping/check_pincodes_availability`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // if(res.data.message !=='Pin code not available'){
        //     toast.success(res.data.message);
        // }
        // else{
        //     toast.error(res.data.message);
        // }

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err.response;
      });
    dispatch(PostPincodesAvailabilityDispatch(responce));
  };
};

const PostPincodesDeliveredDispatch = (data) => ({
  type: actionType.PostPincodesDeliveredDispatch_Type,
  payload: data,
});
export const PostPincodesDelivered = (payload) => {
  console.log(payload);

  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/shipping/check_delivered_pincode`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(PostPincodesDeliveredDispatch(responce));
  };
};

const PostPickupAddressDispatch = (data) => ({
  type: actionType.PostPickupAddressDispatch_Type,
  payload: data,
});
export const PostPickupAddress = (payload) => {
  console.log(payload);

  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/address/add_pickup_address`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // toast.success(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostPickupAddressDispatch(responce));
  };
};

const PatchPickupAddressDispatch = (data) => ({
  type: actionType.PatchPickupAddressDispatch_Type,
  payload: data,
});

export const PatchPickupAddress = (payload) => {
  console.log("payloadsss");
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/address/edit_address`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // toast.success(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PatchPickupAddressDispatch(responce));
  };
};
const PostDeliveryAddressDispatch = (data) => ({
  type: actionType.PostDeliveryAddressDispatch_Type,
  payload: data,
});
export const PostDeliveryAddress = (payload) => {
  console.log(payload);

  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/address/add_delivered_address`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("address added successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostDeliveryAddressDispatch(responce));
  };
};

const PostShipmentDetailsDispatch = (data) => ({
  type: actionType.PostShipmentDetailsDispatch_Type,
  payload: data,
});
export const PostShipmentDetails = (
  payload,
  payloadDeliveredAddress,
  payloadPickupAddress,
  pickupPatchObjectId
) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/shipping/add_shipmentdetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("pickupPatchObjectId", pickupPatchObjectId);

        dispatch(PostDeliveryAddress(payloadDeliveredAddress));
        // pickupPatchObjectId === null 
        //  dispatch(PostPickupAddress(payloadPickupAddress))
        // ? 
        dispatch(PostPickupAddress(payloadPickupAddress))
        // :  dispatch(PatchPickupAddress(payloadPickupAddress));


        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostShipmentDetailsDispatch(responce));
  };
};

export const GetShipmentDetails = (payload) => {
  return async (dispatch, getState) => {
    let bodyContent = JSON.stringify(payload);
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/shipping/view_shipment_details `,
        bodyContent,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log("resresres122", res);
        toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch({
      type: actionType.GetShipmentDetailsDispatch_Type,
      payload: responce,
    });
  };
};

// Dashboard API

const GetAdminDashboardViewOrderDispatch = (data) => ({
  type: actionType.GetAdminDashboardViewOrderDispatch_Type,
  payload: data,
});
export const GetAdminDashboardViewOrder = (payload) => {
  let data = JSON.stringify(payload);
  console.log("1121221122", data);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/view_order`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetAdminDashboardViewOrderDispatch(responce));
  };
};

const PostAdminDashboardTransactionDispatch = (data) => ({
  type: actionType.PostAdminDashboardTransactionDispatch_Type,
  payload: data,
});
export const PostAdminDashboardTransaction = (payload) => {
  let data = JSON.stringify(payload);
  console.log("11212212", payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/transaction_data`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // toast.success(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostAdminDashboardTransactionDispatch(responce));
  };
};

const PostAdminDashboardShippingMatrixDispatch = (data) => ({
  type: actionType.PostAdminDashboardShippingMatrixDispatch_Type,
  payload: data,
});
export const PostAdminDashboardShippingMatrix = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/shipment_metrix`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // toast.success(res.data.message);

        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostAdminDashboardShippingMatrixDispatch(responce));
  };
};

const GetAdminOrderIntransitDispatch = (data) => ({
  type: actionType.GetAdminOrderIntransitDispatch_Type,
  payload: data,
});
export const GetAdminOrderIntransit = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/admin_panel/orders/in_transit`, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        // toast.success(res.data.message);
        dispatch(GetAdminOrderDelivered());

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/in_transit`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);

    dispatch(GetAdminOrderIntransitDispatch(response));
  };
};

const GetAdminOrderDeliveredDispatch = (data) => ({
  type: actionType.GetAdminOrderDeliveredDispatch_Type,
  payload: data,
});
export const GetAdminOrderDelivered = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/admin_panel/orders/delivered`, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(GetAdminOrderReturn());
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/delivered`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetAdminOrderDeliveredDispatch(response));
  };
};

const GetAdminOrderPendingDispatch = (data) => ({
  type: actionType.GetAdminOrderPendingDispatch_Type,
  payload: data,
});

export const GetAdminOrderPending = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/pending_order_details`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/pending_order_details`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetAdminOrderPendingDispatch(response));
  };
};

const GetAdminOrderReturnDispatch = (data) => ({
  type: actionType.GetAdminOrderReturnDispatch_Type,
  payload: data,
});
export const GetAdminOrderReturn = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/return_order`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log("jgzdjfvZX", res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/return_order`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);

    dispatch(GetAdminOrderReturnDispatch(response));
  };
};

const GetAdminOrderSummaryDispatch = (data) => ({
  type: actionType.GetAdminOrderSummaryDispatch_Type,
  payload: data,
});
export const GetAdminOrderSummary = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/order_summary`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetAdminOrderSummaryDispatch(responce));
  };
};

const GetAdminOrderBookedDispatch = (data) => ({
  type: actionType.GetAdminOrderBookedDispatch_Type,
  payload: data,
});
export const GetAdminOrderBooked = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/booked_order`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log("gdvjhvj", res);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/booked_order`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    //  dispatch(GetAdminOrderBooked());
    dispatch(GetAdminOrderBookedDispatch(response));
  };
};

export const ToggleSideBar = (data) => ({
  type: actionType.ToggleSideBar_Type,
  payload: data,
});

export const OrderPageBookNavigate = (data) => ({
  type: actionType.OrderPageBookNavigate_Type,
  payload: data,
});

export const HeaderToggleClassAdd = (data) => ({
  type: actionType.HeaderToggleClassAdd_Type,
  payload: data,
});

export const ShipmentLoaderTrueFalse = (data) => ({
  type: actionType.ShipmentLoaderTrueFalse_Type,
  payload: data,
});

export const OrderPageBoookNavigate = (data) => ({
  type: actionType.OrderPageBoookNavigate_Type,
  payload: data,
});

export const ToggleSideBarTrueFalse = (data) => ({
  type: actionType.ToggleSideBarTrueFalse_Type,
  payload: data,
});


const PostAdminOrderFilterationDispatch = (data) => ({
  type: actionType.PostAdminOrderFilterationDispatch_Type,
  payload: data,
});
export const PostAdminOrderFilteration = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/filteration`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log("gdvjhvj", res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostAdminOrderFilterationDispatch(responce));
  };
};

const GetAdminOrderCustomerDispatch = (data) => ({
  type: actionType.GetAdminOrderCustomerDispatch_Type,
  payload: data,
});

export const GetAdminOrderCustomer = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/customer/customer_order_detail`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetAdminOrderCustomerDispatch(responce));
  };
};

const PatchAdminOrderEditDispatch = (data) => ({
  type: actionType.PatchAdminOrderEditDispatch_Type,
  payload: data,
});

export const PatchAdminOrderEdit = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/edit_order_details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        // dispatch(GetAdminOrderSummary())
        if (res.status == 200) {
          // GetAdminOrderBooked()
        }
        toast.success("Order Edited successfully");

        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PatchAdminOrderEditDispatch(responce));
  };
};

const GetAdminOrderCallBuyerDispatch = (data) => ({
  type: actionType.GetAdminOrderCallBuyerDispatch_Type,
  payload: data,
});
export const GetAdminOrderCallBuyer = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/call_buyer_info`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetAdminOrderCallBuyerDispatch(responce));
  };
};

const GetAdminOrderGenerateOrderIdDispatch = (data) => ({
  type: actionType.GetAdminOrderGenerateOrderIdDispatch_Type,
  payload: data,
});

export const GetAdminOrderGenerateOrderId = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/generate_order_id`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetAdminOrderGenerateOrderIdDispatch(responce));
  };
};

const GetAdminOrderPaymentOrderDispatch = (data) => ({
  type: actionType.GetAdminOrderPaymentOrderDispatch_Type,
  payload: data,
});
export const GetAdminOrderPaymentOrder = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/add_payment_order`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        let data = JSON.stringify({
          deliverd_id: res?.data?.deliverd_id,
          pickup_id: res?.data?.pickup_id,
          product_order_id: res?.data?.order_id,
        });
        reactLocalStorage.set("OrderDetailsId", data);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetAdminOrderPaymentOrderDispatch(responce));
  };
};

const PostAdminOrderPaymentCalDispatch = (data) => ({
  type: actionType.PostAdminOrderPaymentCalDispatch_Type,
  payload: data,
});
export const PostAdminOrderPaymentCal = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/payment_cal_shipment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostAdminOrderPaymentCalDispatch(responce));
  };
};

const PostAdminOrderAddShipmentDispatch = (data) => ({
  type: actionType.PostAdminOrderAddShipmentDispatch_Type,
  payload: data,
});
export const PostAdminOrderAddShipment = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/shipping/add_shipmentdetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        reactLocalStorage.set("ShipmentId", res?.data?.shipment_id);
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostAdminOrderAddShipmentDispatch(responce));
  };
};

const PostViewAdminOrderDispatch = (data) => ({
  type: actionType.PostViewAdminOrderDispatch_Type,
  payload: data,
});
export const PostViewAdminOrder = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/view_admin_order`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostViewAdminOrderDispatch(responce));
  };
};

const GetDeliveryPriceDetailDispatch = (data) => ({
  type: actionType.GetDeliveryPriceDetailDispatch_Type,
  payload: data,
});
export const GetDeliveryPriceDetail = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/delivery_price_details`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetDeliveryPriceDetailDispatch(responce));
  };
};

const GetAdminOrderCloneOrderDispatch = (data) => ({
  type: actionType.GetAdminOrderCloneOrderDispatch_Type,
  payload: data,
});
export const GetAdminOrderCloneOrder = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/clone_order`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetAdminOrderCloneOrderDispatch(responce));
  };
};

const PostAdminPendingOrderActionDispatch = (data) => ({
  type: actionType.PostAdminPendingOrderActionDispatch_Type,
  payload: data,
});
export const PostAdminPendingOrderAction = (payload) => {
  let data = JSON.stringify(payload);
  console.log("aa", data);
  return async (dispatch, getState) => {
    const response = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/pending_action`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(GetAdminOrderBooked());
        dispatch(GetAdminOrderPending());
        toast.success(response.data.message);
        // toast.error(err.response.data.message);
        // dispatch(GetAdminOrderPending());
        toast.success("Order Added successfully");
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   Accept: "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   Authorization: `Bearer ${BearerToken}`,
    // };

    // let bodyContent = JSON.stringify(payload);
    // console.log("gh", payload);
    // let reqOptions = {
    //   url: `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/pending_action`,
    //   method: "PATCH",
    //   headers: headersList,
    //   data: bodyContent,
    // };

    // let response = await axios.request(reqOptions);

    dispatch(PostAdminPendingOrderActionDispatch(response));
  };
};

const DeleteAdminPendingOrderActionDispatch = (data) => ({
  type: actionType.DeleteAdminPendingOrderActionDispatch_Type,
  payload: data,
});
export const DeleteAdminPendingOrderAction = (payload) => {
  // let data = JSON.stringify(payload);
  console.log("aa", payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/cancel_order`,
        {
          data: payload,

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(GetAdminOrderPending());
        dispatch(GetAdminOrderBooked());
        dispatch(GetAdminOrderIntransit());
        dispatch(GetAdminOrderDelivered());
        dispatch(GetAdminOrderReturn());
        toast.success("Order Deleted successfully");
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(DeleteAdminPendingOrderActionDispatch(responce));
  };
};

const PostAdminSettingAddEmployeeDispatch = (data) => ({
  type: actionType.PostAdminSettingAddEmployeeDispatch_Type,
  payload: data,
});
export const PostAdminSettingAddEmployee = (payload) => {
  let data = JSON.stringify(payload);
  console.log("aa", data);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/add_employee`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostAdminSettingAddEmployeeDispatch(responce));
  };
};

const GetCategoryDetailsDispatch = (data) => ({
  type: actionType.GetCategoryDetailsDispatch_Type,
  payload: data,
});
export const GetCategoryDetails = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/category_details`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/category_details`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetCategoryDetailsDispatch(response));
  };
};

const GetSettingViewPermissionDispatch = (data) => ({
  type: actionType.GetSettingViewPermissionDispatch_Type,
  payload: data,
});
export const GetSettingViewPermission = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/view_permissions_details`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/view_permissions_details`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetSettingViewPermissionDispatch(response));
  };
};

const GetSettingEmployeeInfoDispatch = (data) => ({
  type: actionType.GetSettingEmployeeInfoDispatch_Type,
  payload: data,
});
export const GetSettingEmployeeInfo = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/employee_info`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/employee_info`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetSettingEmployeeInfoDispatch(response));
  };
};

const PostAdminSettingAddCategoryDispatch = (data) => ({
  type: actionType.PostAdminSettingAddCategoryDispatch_Type,
  payload: data,
});
export const PostAdminSettingAddCategory = (payload) => {
  let data = JSON.stringify(payload);
  console.log("aa", data);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/add_categories`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(GetCategoryDetails());
        toast.success("Category Added successfully");
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostAdminSettingAddCategoryDispatch(responce));
  };
};

const GetSettingUserInfoDispatch = (data) => ({
  type: actionType.GetSettingUserInfoDispatch_Type,
  payload: data,
});
export const GetSettingUserInfo = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const response = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/user_info`,
        payload,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/user_info`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetSettingUserInfoDispatch(response));
  };
};

const DeleteAdminSettingDeleteUserDispatch = (data) => ({
  type: actionType.DeleteAdminSettingDeleteUserDispatch_Type,
  payload: data,
});
export const DeleteAdminSettingDeleteUser = (payload) => {
  // let data = JSON.stringify(payload);
  console.log("aa", payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/delete_user`,
        {
          data: payload,

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(getOrderAddress());
        dispatch(GetSettingEmployeeInfo());
        toast.success("User Deleted successfully");
        dispatch(GetSettingEmployeeInfo())
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(DeleteAdminSettingDeleteUserDispatch(responce));
  };
};

const PatchEditUserPermissionDispatch = (data) => ({
  type: actionType.PatchEditUserPermissionDispatch_Type,
  payload: data,
});

export const PatchEditUserPermission = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/edit_user_permission`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Profile updated successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PatchEditUserPermissionDispatch(responce));
  };
};

const GetSettingViewB2bFeedbackDispatch = (data) => ({
  type: actionType.GetSettingViewB2bFeedbackDispatch_Type,
  payload: data,
});
export const GetSettingViewB2bFeedback = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/view_b2b_feedback`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetSettingViewB2bFeedbackDispatch(responce));
  };
};

const GetSettingViewB2bCloseFeedbackDispatch = (data) => ({
  type: actionType.GetSettingViewB2bCloseFeedbackDispatch_Type,
  payload: data,
});
export const GetSettingViewB2bCloseFeedback = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/view_b2b_closed_ticket`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetSettingViewB2bCloseFeedbackDispatch(responce));
  };
};

const GetSettingViewB2cFeedbackDispatch = (data) => ({
  type: actionType.GetSettingViewB2cFeedbackDispatch_Type,
  payload: data,
});
export const GetSettingViewB2cFeedback = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/view_b2c_feedback`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetSettingViewB2cFeedbackDispatch(responce));
  };
};

const GetSettingViewB2cCloseFeedbackDispatch = (data) => ({
  type: actionType.GetSettingViewB2cCloseFeedbackDispatch_Type,
  payload: data,
});
export const GetSettingViewB2cCloseFeedback = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/view_b2c_closed_feedback`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetSettingViewB2cCloseFeedbackDispatch(responce));
  };
};

const DeleteSettingDismissTicketDispatch = (data) => ({
  type: actionType.DeleteSettingDismissTicketDispatch_Type,
  payload: data,
});
export const DeleteSettingDismissTicket = (payload) => {
  // let data = JSON.stringify(payload);
  console.log("aa", payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/dismiss_ticket`,
        {
          data: payload,

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(GetSettingViewB2bFeedback());
        dispatch(GetSettingViewB2cFeedback());
        toast.success("Ticket Dismissed successfully");
        console.log(res);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(DeleteSettingDismissTicketDispatch(responce));
  };
};

const PatchEditCategoryDetailsDispatch = (data) => ({
  type: actionType.PatchEditCategoryDetailsDispatch_Type,
  payload: data,
});

export const PatchEditCategoryDetails = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/edit_categories`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(GetCategoryDetails());
        toast.success("Profile updated successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PatchEditCategoryDetailsDispatch(responce));
  };
};

const DeleteCategoryDetailsDispatch = (data) => ({
  type: actionType.DeleteCategoryDetailsDispatch_Type,
  payload: data,
});
export const DeleteCategoryDetails = (payload) => {
  // let data = JSON.stringify(payload);
  console.log("aa", payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/aadmin_panel/setting/delete_category`,
        {
          data: payload,

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(GetCategoryDetails());
        toast.success("Category deleted successfully");
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(DeleteCategoryDetailsDispatch(responce));
  };
};

const GetAdminProfileDispatch = (data) => ({
  type: actionType.GetAdminProfileDispatch_Type,
  payload: data,
});
export const GetAdminProfile = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/viewprofile`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/viewprofile`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetAdminProfileDispatch(response));
  };
};

const PatchEditProfileDispatch = (data) => ({
  type: actionType.PatchEditProfileDispatch_Type,
  payload: data,
});

export const PatchEditProfile = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/address/resetpassword`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Profile updated successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PatchEditProfileDispatch(responce));
  };
};

const PostAdminOrderCsvFileDispatch = (data) => ({
  type: actionType.PostAdminOrderCsvFileDispatch_Type,
  payload: data,
});
export const PostAdminOrderCsvFile = (payload) => {
  let data = JSON.stringify(payload);
  console.log("aaaa", data);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/bill/pending.csv`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        // toast.success(res.data.message);
        console.log("csvapidata", res);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostAdminOrderCsvFileDispatch(responce));
  };
};

const GetAdminCloneOrderDispatch = (data) => ({
  type: actionType.GetAdminCloneOrderDispatch_Type,
  payload: data,
});
export const GetAdminCloneOrder = (payload) => {
  let data = JSON.stringify(payload);
  console.log(data);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/clone_order`,
        data,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetAdminCloneOrderDispatch(responce));
  };
};

const PostOrderDownloadInvoiceFileDispatch = (data) => ({
  type: actionType.PostOrderDownloadInvoiceFileDispatch_Type,
  payload: data,
});
export const PostOrderDownloadInvoiceFile = (payload) => {
  let data = JSON.stringify(payload);
  console.log("aambmbvkj", data);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bill/invoice`,
        payload,

        {

          // responseType: "arraybuffer",
          // responseEncoding: "binary",

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log("hgdjcvjfbskjdb", res);


        // toast.success(res.data.message); 

        if (res.status == 200) {
          if (payload.request_type !== "create") {
            // fileDownload(res?.data?.name, `https`);
          }
        }

        // toast.success("Invoice Generated successfully");
        console.log(res, "Invoice Generated successfully");
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err, "err.response.data.message");
        return err;
      });
    dispatch(PostOrderDownloadInvoiceFileDispatch(responce));
  };
};

const GetOrderDownloadInvoiceDispatch = (data) => ({
  type: actionType.GetOrderDownloadInvoiceDispatch_Type,
  payload: data,
});
export const GetOrderDownloadInvoice = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/bill/invoice`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetOrderDownloadInvoiceDispatch(responce));
  };
};

const DeleteAdminOrderDispatch = (data) => ({
  type: actionType.DeleteAdminOrderDispatch_Type,
  payload: data,
});
export const DeleteAdminOrder = (payload) => {
  // let data = JSON.stringify(payload);
  console.log("aa", payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/cancel_order`,
        {
          data: payload,

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(GetAdminOrderIntransit());
        dispatch(GetAdminOrderDelivered());
        dispatch(GetAdminOrderPending());
        dispatch(GetAdminOrderReturn());
        dispatch(GetAdminOrderBooked());
        toast.success("Order deleted successfully");
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(DeleteAdminOrderDispatch(responce));
  };
};

const PatchEditEmployeeDispatch = (data) => ({
  type: actionType.PatchEditEmployeeDispatch_Type,
  payload: data,
});

export const PatchEditEmployee = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/edit_employee_permission`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Profile updated successfully");
        dispatch(GetSettingEmployeeInfo());
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PatchEditEmployeeDispatch(responce));
  };
};

const GetBillingInvoiceDetailDispatch = (data) => ({
  type: actionType.GetBillingInvoiceDetailDispatch_Type,
  payload: data,
});
export const GetBillingInvoiceDetail = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/billing/invoice_details`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetBillingInvoiceDetailDispatch(responce));
  };
};

const GetBillingAmountCountDispatch = (data) => ({
  type: actionType.GetBillingAmountCountDispatch_Type,
  payload: data,
});
export const GetBillingAmountCount = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/billing/invoice_amount_count`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetBillingAmountCountDispatch(responce));
  };
};

const GetDashboardNotificationDispatch = (data) => ({
  type: actionType.GetDashboardNotificationDispatch_Type,
  payload: data,
});
export const GetDashboardNotification = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/notification`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/notification`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetDashboardNotificationDispatch(response));
  };
};

const PostAddOrderTagDispatch = (data) => ({
  type: actionType.PostAddOrderTagDispatch_Type,
  payload: data,
});
export const PostAddOrderTag = (payload) => {
  let data = JSON.stringify(payload);
  console.log("aa", data);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/add_order_tag`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        // if (res.status == 200) {
        //   dispatch(GetOrderDownloadInvoice(payload));
        // }
        toast.success("Add Tag successfully");
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostAddOrderTagDispatch(responce));
  };
};

const PostUploadFileDispatch = (data) => ({
  type: actionType.PostUploadFileDispatch_Type,
  payload: data,
});
export const PostUploadFile = (payload) => {
  // let data = JSON.stringify(payload);
  console.log("payload2212", payload);
  const formData = new FormData();
  formData.append("file", payload);
  // bill/UploadPincodeFile
  // console.log("formData",formData)

  return async (dispatch, getState) => {
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/bill/UploadOrderFile`, formData, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(GetAdminOrderPending());
        dispatch(GetAdminOrderBooked());
        dispatch(GetAdminOrderDelivered());
        dispatch(GetAdminOrderIntransit());
        dispatch(GetAdminOrderReturn());
        return res;
      })
      .catch((err) => {
        let errorData = `${err.response.data.errors[0].order_id} ${err.response.data.errors[0].error_msg}`;
        toast.warn(errorData);
        toast.warn(err.response.data.message);

        console.log("errordata", err.response);
        console.log("assssss", errorData);
        console.log("aaaaaaa", err);

        // toast.success(err.data.message);
        // console.log(err);
        return err;
      });
    dispatch(PostUploadFileDispatch(responce));
  };
};

const PostCompanyFileDispatch = (data) => ({
  type: actionType.PostCompanyFileDispatch_Type,
  payload: data,
});
export const PostCompanyFile = (payload) => {
  // let data = JSON.stringify(payload);

  // bill/UploadPincodeFile
  console.log("payloaaaaaaad", payload);

  return async (dispatch, getState) => {
    var fs = require("fs");
    let formdata = new FormData();
    formdata.append("email", payload.email);
    formdata.append("company_id", payload.company_id);
    formdata.append("gstin_number", payload.gstin_number);
    formdata.append("registration_pdf", payload.registration_pdf);
    formdata.append("gstin_pdf", payload.gstin_pdf);
    formdata.append("pan_card", payload.pan_card);
    formdata.append("aadhar_card", payload.aadhar_card);

    let bodyContent = formdata;

    let reqOptions = {
      url: `${process.env.REACT_APP_BASE_URL}/company_info"`,
      method: "POST",

      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);
    toast.success("Documents Uploaded Successfuly");
    dispatch(PostCompanyFileDispatch(response));
  };
};

export const PostPincodeUploadFileDispatch = (data) => ({
  type: actionType.PostPincodeUploadFileDispatch_Type,
  payload: data,
});

export const PostPincodeUploadFile = (payload) => {

  // let data = JSON.stringify(payload);
  var fs = require("fs")
  console.log("payload2212", payload);
  const formData = new FormData();
  formData.append("file", payload);
  // bill/PincodeUploadPincodeFile
  // console.log("formData",formData)

  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bill/UploadPincodeFile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Pincode Uploaded Successfully");
        // toast.success(res.data.message);

        console.log("ssssssssss", res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.error[0].error_msg);
        // console.log("errordata", err.response.data.error[0].error_msg);
        toast.warn(err?.response?.data?.error[0]?.error_msg);
        // console.log(err);

        return err;
      });
    dispatch(PostPincodeUploadFileDispatch(responce));
  };
};

const PostDashboardRevenueDispatch = (data) => ({
  type: actionType.PostDashboardRevenueDispatch_Type,
  payload: data,
});
export const PostDashboardRevenue = (payload) => {
  let data = JSON.stringify(payload);
  console.log("aab", payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/revenue`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success("Upload successfully");
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostDashboardRevenueDispatch(responce));
  };
};

const PostDashboardViewOrderDispatch = (data) => ({
  type: actionType.PostDashboardViewOrderDispatch_Type,
  payload: data,
});
export const PostDashboardViewOrder = (payload) => {
  let data = JSON.stringify(payload);
  console.log("aa", data);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/dashboard/view_order`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        // toast.success("Upload successfully");
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostDashboardViewOrderDispatch(responce));
  };
};

const GetCodRemittanceDispatch = (data) => ({
  type: actionType.GetCodRemittanceDispatch_Type,
  payload: data,
});
export const GetCodRemittance = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/billing/cod_remittance_details`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetCodRemittanceDispatch(responce));
  };
};

const GetCodRemittanceBillingAmountDispatch = (data) => ({
  type: actionType.GetCodRemittanceBillingAmountDispatch_Type,
  payload: data,
});
export const GetCodRemittanceBillingAmount = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/billing/cod_count`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log(res);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetCodRemittanceBillingAmountDispatch(responce));
  };
};

const GetB2bCompanyInfoDispatch = (data) => ({
  type: actionType.GetB2bCompanyInfoDispatch_Type,
  payload: data,
});
export const GetB2bCompanyInfo = (payload) => {
  console.log("hello");
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/companyInfo`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        console.log("jhdhdsjkds", res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/b2b_company_info`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetB2bCompanyInfoDispatch(response));
  };
};

const PostUploadBillRemittanceFileDispatch = (data) => ({
  type: actionType.PostUploadBillRemittanceFileDispatch_Type,
  payload: data,
});
export const PostUploadBillRemittanceFile = (payload) => {
  console.log("payload12", payload);

  return async (dispatch, getState) => {
    const formData = new FormData();
    formData.append("file", payload);
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bill/UploadRemittanceFile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Upload successfully");

        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostUploadBillRemittanceFileDispatch(responce));
  };
};

const GetWalletHistoryDispatch = (data) => ({
  type: actionType.GetWalletHistoryDispatch_Type,
  payload: data,
});
export const GetWalletHistory = (payload) => {
  return async (dispatch, getState) => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${BearerToken}`,
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_BASE_URL}/wallet/history`,
      method: "get",
      headers: headersList,
    };

    const responce = await axios.request(reqOptions);

    console.log("responceresponceresponce122", responce);
    //  await axios
    //   .get(
    //     `${process.env.REACT_APP_BASE_URL}/wallet/history`,

    //       {headers: {
    //         Authorization: `Bearer ${BearerToken}`,
    //       },}

    //   )
    //   .then((res) => {
    //     console.log("gdvjhvj", res);

    //     return res;
    //   })
    //   .catch((err) => {

    //     console.log(err);
    //     return err;
    //   });
    dispatch(GetWalletHistoryDispatch(responce));
  };
};

const GetWalletBalanceDispatch = (data) => ({
  type: actionType.GetWalletBalanceDispatch_Type,
  payload: data,
});
export const GetWalletBalance = (payload) => {
  return async (dispatch, getState) => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${BearerToken}`,
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_BASE_URL}/wallet/balance`,
      method: "POST",
      headers: headersList,
    };

    const responce = await axios.request(reqOptions);
    if (responce.status == 200) {
      dispatch(GetWalletHistory());
    }
    //  await axios
    // .post(
    //   `${process.env.REACT_APP_BASE_URL}/wallet/balance`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${BearerToken}`,
    //       "Accept": "*/*",
    //     },
    //   }
    // )
    // .then((res) => {
    //   // toast.success(res.data.message);
    //   console.log("gdvjhvj", res);

    //   return res;
    // })
    // .catch((err) => {
    //   toast.warn(err.response.data.message);
    //   console.log(err);
    //   return err;
    // });
    dispatch(GetWalletBalanceDispatch(responce));
  };
};

const PostWalletAddMoneyDispatch = (data) => ({
  type: actionType.PostWalletAddMoneyDispatch_Type,
  payload: data,
});
export const PostWalletAddMoney = (payload) => {
  let data = JSON.stringify(payload);
  console.log("aa", data);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/wallet/add_money`, data, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // toast.success(res.data.message);
        // dispatch(GetAdminOrderPending());
        // toast.success("Order Added successfully");
        console.log(res);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostWalletAddMoneyDispatch(responce));
  };
};

const PostDebitBalanceDispatch = (data) => ({
  type: actionType.PostDebitBalanceDispatch_Type,
  payload: data,
});
export const PostDebitBalance = (payload) => {
  return async (dispatch, getState) => {
    let orderIdData = payload?.order_id.toString();
    let InvoicePayLoad = {
      product_order_id: orderIdData,
      request_type: "create",
    };
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/wallet/debit_balance`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        toast.success("Order Placed Successfully");
        dispatch(GetWalletBalance());
        console.log(res);
        dispatch(PostOrderDownloadInvoiceFile(InvoicePayLoad));
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostDebitBalanceDispatch(responce));
  };
};

const PostTrackingOrderDetailsDispatch = (data) => ({
  type: actionType.PostTrackingOrderDetailsDispatch_Type,
  payload: data,
});
export const PostTrackingOrderDetails = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/tracking/order_details`,
        payload
        // {
        //   headers: {
        //     Authorization: `Bearer ${BearerToken}`,
        //   },
        // }
      )
      .then((res) => {
        console.log(res);
        toast.warn(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostTrackingOrderDetailsDispatch(responce));
  };
};

const PostBillingCodRemittanceCountDispatch = (data) => ({
  type: actionType.PostBillingCodRemittanceCountDispatch_Type,
  payload: data,
});
export const PostBillingCodRemittanceCount = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/billing/cod_remittance_count`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // toast.success(res.data.message);
        toast.warn(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostBillingCodRemittanceCountDispatch(responce));
  };
};

const PostBillingCodRemittanceDetailsDispatch = (data) => ({
  type: actionType.PostBillingCodRemittanceDetailsDispatch_Type,
  payload: data,
});
export const PostBillingCodRemittanceDetails = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/billing/cod_remittance_details`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // toast.success(res.data.message);
        toast.warn(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostBillingCodRemittanceDetailsDispatch(responce));
  };
};

const PostCreateTicketDispatch = (data) => ({
  type: actionType.PostCreateTicketDispatch_Type,
  payload: data,
});
export const PostCreateTicket = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/create_ticket`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Issue Raised Successfully");
        console.log(res);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostCreateTicketDispatch(responce));
  };
};

const PostTicketDetailDispatch = (data) => ({
  type: actionType.PostTicketDetailDispatch_Type,
  payload: data,
});
export const PostTicketDetail = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/ticket_detail`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.warn(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostTicketDetailDispatch(responce));
  };
};

const DeleteSupportTicketData = (data) => ({
  type: actionType.DeleteSupportTicketDispatch_Type,
  payload: data,
});

export const DeleteSupportTicket = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/delete_ticket`,
        {
          data: payload,
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        toast.success("Ticket Deleted successfully");
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    console.log(response);
    dispatch(DeleteSupportTicketData(response));
  };
};

const PostCreateFeedbackDispatch = (data) => ({
  type: actionType.PostCreateFeedbackDispatch_Type,
  payload: data,
});
export const PostCreateFeedback = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/order/feedback`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostCreateFeedbackDispatch(responce));
  };
};

const PatchTrackData = () => ({
  type: actionType.PatchTrackDetailsDispatch_Type,
});

export const PatchTrackDetails = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/tracking/update_order`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Updated Status Successfully");
        dispatch(GetAdminOrderBooked());
        dispatch(GetAdminOrderIntransit());
        dispatch(GetAdminOrderDelivered());
        dispatch(GetAdminOrderReturn());
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PatchTrackData());
  };
};

const GetCustomerOrderDetailDispatch = (data) => ({
  type: actionType.GetCustomerOrderDetailDispatch_Type,
  payload: data,
});

export const GetCustomerOrderDetail = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/customer/customer_order_detail`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetCustomerOrderDetailDispatch(response));
  };
};

const PostRaiseContactUSDispatch = (data) => ({
  type: actionType.PostRaiseContactUSDispatch_Type,
  payload: data,
});
export const PostRaiseContactUS = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/shipping/contanct_us`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostRaiseContactUSDispatch(responce));
  };
};

const PostOrderTrackDispatch = (data) => ({
  type: actionType.PostOrderTrackDispatch_Type,
  payload: data,
});
export const PostOrderTrack = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/tracking/track_order`, payload, {
        // headers: {
        //   Authorization: `Bearer ${BearerToken}`,
        // },
      })
      .then((res) => {
        console.log(res);
        toast.warn(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostOrderTrackDispatch(responce));
  };
};

const PostGetFeedbackDispatch = (data) => ({
  type: actionType.PostGetFeedbackDispatch_Type,
  payload: data,
});
export const PostGetFeedback = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/order/response_details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.warn(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostGetFeedbackDispatch(responce));
  };
};

const PostClearNotificationDispatch = (data) => ({
  type: actionType.PostClearNotificationDispatch_Type,
  payload: data,
});
export const PostClearNotification = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/notify_true`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // toast.warn(res.data.message);
        dispatch(GetUserNotification());
        dispatch(GetDashboardNotification());
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostClearNotificationDispatch(responce));
  };
};

const PostKYCdetailDispatch = (data) => ({
  type: actionType.PostKYCdetailDispatch_Type,
  payload: data,
});
export const PostKYCdetail = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/kyc_details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.warn(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PostKYCdetailDispatch(responce));
  };
};

const GetUserNotificationDispatch = (data) => ({
  type: actionType.GetUserNotificationDispatch_Type,
  payload: data,
});
export const GetUserNotification = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/user_notify`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.warn(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetUserNotificationDispatch(responce));
  };
};



const GetAuthDetailsDispatch = (data) => ({
  type: actionType.GetAuthDetailsDispatch_Type,
  payload: data,
});


export const GetAuthDetails = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/getAuthDetails`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.warn(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetAuthDetailsDispatch(responce));
  };
};



const GetPermissionDispatch = (data) => ({
  type: actionType.GetPermissionDispatch_Type,
  payload: data,
});
export const GetPermission = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/get_permission`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.warn(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetPermissionDispatch(responce));
  };
};




const GetGoogleCityStateDispatch = (data) => ({
  type: actionType.GetGoogleCityStateDispatch_Type,
  payload: data,
});
export const GetGoogleCityState = (payload) => {
  console.log("jhcg")
  return async (dispatch, getState) => {
    console.log("payloadsjkdgh", process.env.REACT_APP_BASE_GOOGLE_API_KEY)


    const response = await axios
      .get(` https://maps.googleapis.com/maps/api/geocode/json?address=${payload}&key=${process.env.REACT_APP_BASE_GOOGLE_API_KEY}`,)
      .then((res) => {
        console.log("jhxhgjhsgjkh", res)
        return res?.data?.results;

      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        // console.log(err);
        return err;
      });
    dispatch(GetGoogleCityStateDispatch(response));
  };
};






// export  const FunctionVariableNameCanBeAnyThing=(products)=>{
//     return{
//         type:actionType.THIS_NAME_CAN_BE_ANY_THINKG,
//         payload:products
//     }
// }

// })
// var config = {
//     method: `get`,
//     // url: `${process.env.REACT_APP_BASE_URL}/viewprofile`,
//     url: `${process.env.REACT_APP_BASE_URL}/address/saved_address`,
//     // headers: {
//     //     authorization: `Bearer  ${BearerToken}`
//     // }
//     headers: {
//         authorization: `Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyMzg5NDQ0LCJqdGkiOiIzN2UwOGRiZDVkMTk0ZGQyYTJhYjAxNjk1NWRlMWE0YSIsInVzZXJfaWQiOjQ1fQ.IWYw--n1F9Hv3qet_rwAOjHjvv864ZDXk9cy5pVS9Wg`
//     }
// };
// const responce = await axios(config)
//     .then((res) => {
//         console.log(JSON.stringify(res.data));
//         return res.data

//         // console.log(JSON.stringify(response.data));
//     })
//     .catch((err) => {
//         console.log(err);
//         return


// let headersList = {
//   "Authorization": `Bearer  ${BearerToken}`
// }

let headersList = {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDMwMjY1ZjBjMmFlNmM3MGI0YTU5ZWMiLCJpYXQiOjE2ODA5MzgxMDh9.iPFGiSxu9sY88b1XMn-l4CcXQEtptIeJh7FyWoU-F1w"
}


const PostAddProductDispatch = (data) => ({
  type: actionType.PostAddProductDispatch_Type,
  payload: data,
});
export const PostAddProduct = (payload) => {
  console.log("add_productpayload", payload);



  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/add_product`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        toast.success("Product is created successfully");
        // if(res.data.message !=='Pin code not available'){
        //     toast.success(res.data.message);
        // }
        // else{
        //     toast.error(res.data.message);
        // }

        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err.response;
      });
    dispatch(PostAddProductDispatch(responce));
  };
};




const GetAllProductDispatch = (data) => ({
  type: actionType.GetAllProductDispatch_Type,
  payload: data,
});
  
export const GetAllProduct = (payload) => {
  return async (dispatch, getState) => {
    let data=""
    if(payload==undefined){
      data=""
    }
    else{
      data=payload
    }
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/all_product${data}`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log("nvgshvsjhhvhs",res);
        toast.warn(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(GetAllProductDispatch(responce));
  };
};


const PatchCartDispatch = (data) => ({
  type: actionType.PatchCartDispatch_Type,
  payload: data,
});
  
export const PatchCart = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/patch_cart/${payload?._id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log("nvgshvsjhhvhssjdffjd",res);
        toast.warn(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(PatchCartDispatch(responce));
  };
};



const DeleteCartDispatch = (data) => ({
  type: actionType.DeleteCartDispatch_Type,
  payload: data,
});
  
export const DeleteCart = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/delete_product/${payload?._id}`, 
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log("nvgshvsjhhvhssjdffjd",res);
        toast.success("Product deleted Sucessfully");
dispatch(GetAllProduct())
        // toast.warn(res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
        return err;
      });
    dispatch(DeleteCartDispatch(responce));
  };
};












// export const GetAllProduct = (method, endpoint, payload) => {
//   console.log("jhcg", endpoint)
//   let endPointData = endpoint?.split("/")
//   let dataEndPointData = endPointData.pop()
//   // console.log("endPointData",endPointData.pop())

//   let reqOptions = {
//     url: `${process.env.REACT_APP_BASE_URL}${endpoint}`,
//     method: `${method}`,
//     headers: headersList,
//   }
//   return async (dispatch, getState) => {
//     try {
//       var response = await axios.request(reqOptions);
       
//     }
//     catch (err) {
//       toast.warn(err.response.data.message);
//       console.log("shgvdhv", err);

//     }
//     console.log("shgvdhv",response)
    // const response = await axios
    //   .request(`${process.env.REACT_APP_BASE_URL}/all_product`,

    //     {
    //       headers: {
    //         Authorization: `Bearer ${BearerToken}`,
    //       }
    //     }
    //   )
    //   .then((res) => {
    //     console.log("jhxhgjhsgjkh", res)
    //     return res;

    //   })
    //   .catch((err) => {
    //     // toast.warn(err.response.data.message);
    //     // console.log(err);
    //     return err;
    //   });
    // dispatch({
    //   type: `${actionType}.${dataEndPointData}_Type`,
    //   payload: response,
      
    // });
    // dispatch(GetAllProductDispatch(response));
//   };
// };

