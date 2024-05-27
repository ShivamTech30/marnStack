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

    dispatch({
      type: actionType.ViewProfile_Type,
      payload: response,
    });
  };
}; 

///////////////////------------------ start-----------------------------------//////////////////////
 
  

const PostAddProductDispatch = (data) => ({
  type: actionType.PostAddProductDispatch_Type,
  payload: data,
});
 

export const PostAddProduct = (payload) => { 

  return async (dispatch, getState) => {

    const formData = new FormData();
    formData.append("product_name", payload?.product_name);
    formData.append("product_price", payload?.product_price);
    formData.append("product_brand", payload?.product_brand);
    formData.append("productImage", payload?.productImage);
    formData.append("fav", false); 
    const response = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/add_product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        toast.success("Product is created successfully"); 
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err.response;
      });

    
    dispatch(PostAddProductDispatch(response));
  };
};



const PostComments = (data) => ({
  type: actionType.PostComments_Type,
  payload: data,
});
 

export const  PostComment = (payload) => { 

  return async (dispatch, getState) => {

     
    const response = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/comment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`
          },
        }
      )
      .then((res) => {
        console.log(res);

        toast.success("comment is created successfully"); 
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err.response;
      });

    
    dispatch(PostComments(response));
  };
};



const GetComments = (data) => ({
  type: actionType.GetComments_Type,
  payload: data,
});
 

export const  GetComment = (payload) => { 

  return async (dispatch, getState) => {

     
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/get_comment?product_id=${payload}`,
         
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`
          },
        }
      )
      .then((res) => {
        console.log(res); 
        // toast.success("comment is created successfully"); 
        return res;
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
        console.log(err);
        return err.response;
      });

    
    dispatch(GetComments(response));
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

















































///////////////////////---------------------///////////////////////////////





































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