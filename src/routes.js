const urls = {
  root: "/",
  forgotPass: "/forgot-password",
  manufacturer: {
    root: "/partner",
    login: "/partner/login",
    register: "/partner/register",
  },
  company: {
    root: "/company",
    contact: "/company/contact",
  },
  customer: {
    root: "/customer",
    login: "/customer/login",
    register: "/customer/register",
    dashboard: "/customer/dashboard",
    quotationListing: "/customer/quotation-listing",
    orderHistory: "/customer/order-history",
    quotation: "/customer/quotation",
    configurePart: (id) => "/customer/configure-part/" + id,
    shippingPage: (id) => "/customer/shipping/" + id,
  },
  msas: {
    root: "/msaas",
    login: "/msaas/login",
    register: "/msaas/register",
    dashboard: "/msaas/dashboard",
    configurePart: (id) => "/msaas/configure-part/" + id,
    priceMatching: (id) => "/msaas/price-matching/" + id,
  },
  admin: {
    root: "/admin",
    rfqList: "/admin/rfq-list",
    rfqDetails: (id) => "/admin/rfq/" + id,
    customers: "/admin/customers",
    partners: "/admin/partners",
    msaasUsers: "/admin/msaas-users",
    contactUsList: "/admin/contact-us",
    blogs: {
      root: "/admin/blogs",
      create: "/admin/blogs/create",
      update: (id) => "/admin/blogs/update/" + id,
      show: (id) => "/admin/blogs/show/" + id,

    },
    settings: "/admin/settings",
    orders: "/admin/orders",
    currentMonth: "/admin/current-month",
    lastQuarter: "/admin/last-quarter",
    yearEndSale: "/admin/year-end-sale",
    dashboard: "/admin/dashboard",
    login: "/admin/login",
    register: "/admin/register",

  },

  blogs: {
    root: "/blogs",
    show: (id,title="") => "/blogs/" + id+"/"+title
  }
};

export default urls;
