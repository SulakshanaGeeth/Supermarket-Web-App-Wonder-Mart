import { toast } from "react-toastify";

const Logout = () => {
  const confirmBox = window.confirm("Do want to Logout ?");

  try {
    const resolveAfter2Sec = new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    toast.promise(resolveAfter2Sec, {
      pending: "Logout ...",
      //   success: "Logout Success 👌",
      error: "Login Faild 🤯",
    });
    setTimeout(() => {
      // set a 2seconds timeout for authentication

      if (confirmBox) {
        localStorage.removeItem("username");
        localStorage.removeItem("id");
        localStorage.setItem("authToken", undefined);
        localStorage.removeItem("email");
        localStorage.removeItem("type");
        window.location = "/";
      }
    }, 3000);
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
export { Logout };
