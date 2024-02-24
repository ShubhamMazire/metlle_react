import axios from "axios";

const token = "YOUR_TOKEN_HERE"; // Replace with your actual token
const prod = "https://metlle.com";
const dev = "http://127.0.0.1:8000";

const API = prod;

export const localUrl = API + "/api"; // Replace with your local URL

const devUrl = API + "/api"; // Replace with your dev API URL

export const assetBaseUrl = API + "/uploads/"; // Replace with your local URL

const rootUrl = localUrl; // Change this to devUrl when you're ready to test against the dev API

const api = axios.create({
  baseURL: rootUrl,
  headers: {
    // authorization: localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

// add interceptor to response and if status code is 401 then logout user

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      logOut(true);
    }
    return error;
  }
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["authorization"] = `${token}`;
    // save token to local storage
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["authorization"];
  }
};

const logout_confirm = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  localStorage.removeItem("persist:root");
  delete api.defaults.headers.common["authorization"];
  window.location.href = "/";
};

export const logOut = (direct = false) => {
  const result =
    direct == false
      ? window.Alert(
          {
            title: "logout",
            text: "Are you sure you want to log out?",
            showCancelButton: true,
            confirmButtonText: "Yes",
          },
          () => {
            logout_confirm();
          }
        )
      : logout_confirm();
};

export const URL_PATH = {
  getDashboardData: "/customer/getGraphData",
  getOrdersData: "/customer/getOrdersData",
  getQuotationDetails: "/customer/get-part-details",
  getQuotationItemFromCart: "/customer/get-quotation-from-cart",
  updateKiriValue: "/customer/updateKiriValue",
  deletePart: "/customer/deletePart",
  getPartGraphData: "/customer/getTargetPrice",
  getTargetPrice: "/customer/getTargetPrice",
  sendManualQuote: "/customer/sendFileForManualQuote",

  getCNCCost: "/customer/getcncCost",

  // Admin

  customerList: "/admin/customers",
  manufacturerList: "/admin/manufacturers",
  msaasUserList: "/admin/msaas",
  rfqList: "/admin/rfqList",
  orderList: "/admin/ordered",
  dashboard: "/admin/dashboard",
contactList:"/contactUs",
  // msaas

  msaas_login: "/msaas/login",
  msaas_register: "/msaas/register",
  msaas_add_machine: "/msaas/machine",
  msaas_get_machines: "/msaas/machines",
  msaas_delete_machine: (id) => "/msaas/machine/" + id,
  msaas_match_price: (id) => `/msaas/matchPrice/${id}`,

  msaas_add_process: "/msaas/processes",

  // blog

  listBlog: "/blogs",
  createBlog: "/blogs",
  showBlog: (id) => `/blogs/${id}`,
  updateBlog: (id) => `/blogs/${id}`,
  deleteBlog: (id) => `/blogs/${id}`,

  // payment
  createOrder: "customer/createOrder",


  ContactUsForm: "/contactUs",
};

export default api;
