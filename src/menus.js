import routes from "./routes";
import { logOut } from "./Common/API";

const links = {
  root: {
    left: [
      // { link: routes.root, label: "Home" },
      // { link: "#", label: "Our solution" },
      { link: "#", label: "Industries" },
      { link: routes.blogs.root, label: "Resources" },
      { link: routes.manufacturer.root, label: "Partner" },
      { link: routes.company.root, label: "Company" },
      {
        link: routes.msas.root,
        label: "Sprint",
        style: {
          // 2 gradients color to text and bold font weight

          background: "linear-gradient(90deg, #406fccff 0%, #b44ce4ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
        extraClass: "bold",
      },
      { link: routes.company.contact, label: "Contact us" },
    ],
    greenNav: {
      link: routes.customer.orderHistory,
      label: "order status",
    },
    blueBtn: {
      link: routes.customer.login,
      label: "get your instant quotation",
    },
    right: [{ link: routes.customer.login, label: "Log in", type: "auth" }],
  },
  manufacturer: {
    root: "/manufacturer",
    login: "/manufacturer/login",
    register: "/manufacturer/register",
  },
  man_login: {
    left: [],
    blueBtn: {
      link: routes.manufacturer.register,
      label: "New quote",
    },
    right: [
      // { link: "#", label: "Our solution" },
      { link: "#", label: "Industries" },
      { link: routes.blogs.root, label: "Resources" },
    ],
  },
  login: {
    left: [
      // { link: "#", label: "Our solution" },
      { link: "#", label: "Industries" },
      { link: routes.blogs.root, label: "Resources" },
    ],

    blueBtn: {
      link: "#",
      label: "New quote",
    },
    right: [],
  },

  signup: {
    left: [],

    // blueBtn: {
    //   link: "#",
    //   label: "New quote",
    // },
    right: [
      // { link: "#", label: "Our solution" },
      { link: "#", label: "Industries" },
      { link: routes.blogs.root, label: "Resources" },
      { link: routes.customer.login, label: "Sign in" },
    ],
  },
  msas: {
    logo: "/sprint_logo_dark.png",

    left: [],

    right: [
      // { link: routes.msas.login, label: "logout" },
      { link: routes.company.contact, label: "contact us" },
      { link: "#", action: logOut, label: "logout" },
    ],
  },
  msas_login: {
    logo: "/sprint_logo_dark.png",
    left: [],

    blueBtn: {
      link: routes.msas.login,
      label: "login",
    },
    right: [{ link: routes.company.contact, label: "contact us" }],
  },

  customer: {
    left: [],

    right: [
      // { link: routes.msas.login, label: "logout" },
      { link: routes.company.contact, label: "contact us" },
      { link: "#", action: logOut, label: "logout" },
    ],
  },

  admin: "/admin",
};

export default links;
