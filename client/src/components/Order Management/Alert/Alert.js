import Swal from "sweetalert2";

export const RiderAssign = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonText:"OK"
    })
    .then((ok) => {
        if (ok) {
          window.location = '#'
        }
      });
  };

  export const DeliveredOrder = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonText:"OK"
    })
    .then((ok) => {
        if (ok) {
          window.location = '#'
        }
      });
  };

  export const Refunded = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonText:"OK"
    })
    .then((ok) => {
        if (ok) {
          window.location = '#'
        }
      });
  };
