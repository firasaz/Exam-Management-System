function ChairLogout() {
  localStorage.removeItem("chairLoginStatus");
  window.location.href = "/chair-login";
  return <div></div>;
}

export default ChairLogout;
