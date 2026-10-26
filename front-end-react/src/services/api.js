import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";

// Determine base URL dynamically
const resolveBaseUrl = () => {
  if (process.env.REACT_APP_BASE_URL) {
    return process.env.REACT_APP_BASE_URL;
  }
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:3003";
  }
  return "https://ecommerce-backend-api-one.vercel.app";
};

// Create Axios Instance
const apiClient = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: 15000,
  headers: {
    "Accept": "application/json, text/plain, */*",
  },
});

// Request Interceptor: Dynamically inject freshest token on EVERY call
apiClient.interceptors.request.use(
  (config) => {
    const token = reactLocalStorage.get("token", false);
    if (token && token !== "false" && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized, token expiration, and standardize errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const responseData = error?.response?.data;

    // Extract human-readable error message
    let errorMessage = "An unexpected error occurred. Please try again.";
    if (typeof responseData === "string") {
      errorMessage = responseData;
    } else if (responseData?.error) {
      errorMessage = responseData.error;
    } else if (responseData?.message) {
      errorMessage = responseData.message;
    } else if (error?.message) {
      errorMessage = error.message;
    }

    // Handle 401: Token invalid or expired
    if (status === 401) {
      console.warn("Authentication failed (401): Clearing session and redirecting.");
      reactLocalStorage.remove("token");
      reactLocalStorage.remove("userId");
      reactLocalStorage.remove("Admin_Role");

      // Don't show toast if already on login/signup page
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/" && currentPath !== "/signup") {
        toast.error("Your session has expired or is invalid. Please sign in again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      }
    }

    // Attach parsed message to error object
    error.parsedMessage = errorMessage;
    return Promise.reject(error);
  }
);

// ==========================================
// EXPORTED API METHODS
// ==========================================

export const apiService = {
  // Auth
  login: async (credentials) => {
    const response = await apiClient.post("/login", credentials);
    return response.data;
  },

  register: async (payload) => {
    const response = await apiClient.post("/register", payload);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await apiClient.post("/forgot", { email });
    return response.data;
  },

  // Products
  getAllProducts: async (sorting = "") => {
    const query = sorting ? `?sorting=${sorting}` : "";
    const response = await apiClient.get(`/all_product${query}`);
    return response.data;
  },

  addProduct: async (formData) => {
    const response = await apiClient.post("/add_product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/delete_product/${id}`);
    return response.data;
  },

  patchProduct: async (id, payload) => {
    const response = await apiClient.patch(`/patch_cart/${id}`, payload);
    return response.data;
  },

  // Cart / Wishlist
  addToCart: async (id) => {
    const response = await apiClient.get(`/add_cart/${id}`);
    return response.data;
  },

  getAllCart: async () => {
    const response = await apiClient.get("/all_cart");
    return response.data;
  },

  // Comments
  getComments: async (productId) => {
    const response = await apiClient.get(`/get_comment?product_id=${productId}`);
    return response.data;
  },

  postComment: async (payload) => {
    const response = await apiClient.post("/comment", payload);
    return response.data;
  },
};

export default apiClient;
