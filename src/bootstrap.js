// import moment from "moment";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
// import { getUserLocation } from "./utils/location";
// import Lang from 'lang.js';

/**
 * We registered axios so that we don't have to import it all the time.
 */

const Alert = (data, sc = null, fail = null) => {
  /*
     position: 'top-end',
     title: 'Sweet!',
  text: 'Modal with a custom image.',
  imageUrl: 'https://unsplash.it/400/200',
  imageWidth: 400,
  imageHeight: 200,
  imageAlt: 'Custom image',
   showDenyButton: true,
  showCancelButton: true,
    })
*/
  try {
    const result =
      typeof data === "object"
        ? MySwal.fire(data)
        : MySwal.fire({ title: data });

    result.then((result) => {
      if (result.isConfirmed) {
        if (sc) {
          console.log("calling success function");
          sc();
        } else {
          console.log("no success function");
        }
      } else if (result.isDenied) {
        console.log(0);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

window.Alert = Alert;


alert = Alert;

// window.axios = axios;
// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// window.axios.defaults.headers.common["Accept"] = "application/json";

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */
// let token = document.head.querySelector('meta[name="csrf-token"]');

// if (token) {
//     window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
// }

// const authToken = localStorage.getItem("token");
// if (authToken) {
//   window.axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
// }

// function makeid(length) {
//   var result = "";
//   var characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   var charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

// const { id = makeid(5) } = JSON.parse(localStorage.getItem("user") || "{}");
// window.axios.defaults.headers.common["userId"] = id;

// getUserLocation();
/**
 * Here, we will initialize our localization for the first time.
 */
// window.Lang = new Lang({ messages: LOCALE });

/**
 * We registered moment.js so that we don't have to import it all the time.
 */
// window.moment = moment;
