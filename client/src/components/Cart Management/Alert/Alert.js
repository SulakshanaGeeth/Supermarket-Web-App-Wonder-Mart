import Swal from "sweetalert2";

export const AlertDeleteCart = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonText:"OK"
    })
    .then((ok) => {
        if (ok) {
          window.location = "/Cart"
        }
      });
};

export const CheckoutRes = (icon, title, text) => {
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
};
