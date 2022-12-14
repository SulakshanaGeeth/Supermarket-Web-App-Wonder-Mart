import Swal from "sweetalert2";

export const OrderPlace = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonText:"OK"
    })
    .then((ok) => {
        if (ok) {
           window.location = "/Products"
        }
      });
}

export const CancelOrder = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonText:"OK"
    })
    .then((ok) => {
        if (ok) {
           window.location = "/Orders"
        }
      });
}
