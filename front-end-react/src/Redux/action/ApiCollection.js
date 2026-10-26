import { actionType } from "../type/types";
import { apiService } from "../../services/api";
import { toast } from "react-toastify";

// Layout & UI actions
export const ToggleSideBar = (data) => ({
  type: actionType.ToggleSideBar_Type,
  payload: data,
});

export const HeaderToggleClassAdd = (data) => ({
  type: actionType.HeaderToggleClassAdd_Type,
  payload: data,
});

export const ToggleSideBarTrueFalse = (data) => ({
  type: actionType.ToggleSideBarTrueFalse_Type,
  payload: data,
});

// Products & Inventory actions
export const PostAddProduct = (payload) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("product_name", payload?.product_name);
      formData.append("product_price", payload?.product_price);
      formData.append("product_brand", payload?.product_brand);
      formData.append("productImage", payload?.productImage);
      formData.append("fav", false);

      const response = await apiService.addProduct(formData);
      toast.success("Product created successfully!");
      dispatch({
        type: actionType.PostAddProductDispatch_Type,
        payload: response,
      });
      return response;
    } catch (err) {
      toast.error(err.parsedMessage || "Failed to create product");
      throw err;
    }
  };
};

export const GetAllProduct = (sorting = "") => {
  return async (dispatch) => {
    try {
      // Clean query string if passed with or without ?sorting=
      let sortParam = sorting;
      if (sortParam && sortParam.startsWith("?sorting=")) {
        sortParam = sortParam.replace("?sorting=", "");
      }
      const response = await apiService.getAllProducts(sortParam);
      dispatch({
        type: actionType.GetAllProductDispatch_Type,
        payload: response,
      });
      return response;
    } catch (err) {
      toast.error(err.parsedMessage || "Failed to load products");
      throw err;
    }
  };
};

export const PatchCart = (payload) => {
  return async (dispatch) => {
    try {
      const response = await apiService.patchProduct(payload?._id, payload);
      dispatch({
        type: actionType.PatchCartDispatch_Type,
        payload: response,
      });
      return response;
    } catch (err) {
      toast.error(err.parsedMessage || "Failed to update item");
      throw err;
    }
  };
};

export const DeleteCart = (payload) => {
  return async (dispatch) => {
    try {
      const response = await apiService.deleteProduct(payload?._id);
      dispatch({
        type: actionType.DeleteCartDispatch_Type,
        payload: response,
      });
      // Automatically refresh the products list
      dispatch(GetAllProduct());
      return response;
    } catch (err) {
      toast.error(err.parsedMessage || "Failed to delete product");
      throw err;
    }
  };
};

// Comments & Reviews
export const PostComment = (payload) => {
  return async (dispatch) => {
    try {
      const response = await apiService.postComment(payload);
      dispatch({
        type: actionType.PostComment_Type,
        payload: response,
      });
      return response;
    } catch (err) {
      toast.error(err.parsedMessage || "Failed to post comment");
      throw err;
    }
  };
};

export const GetComment = (productId) => {
  return async (dispatch) => {
    try {
      const response = await apiService.getComments(productId);
      dispatch({
        type: actionType.GetComments_Type,
        payload: response,
      });
      return response;
    } catch (err) {
      console.error("GetComment error:", err);
    }
  };
};