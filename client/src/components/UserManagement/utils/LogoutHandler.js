const Logout = () => {
  const confirmBox = window.confirm("Do want to Logout ?");
  if (confirmBox) {
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.setItem("authToken", undefined);
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    window.location = "/";
  }
};

export { Logout };
