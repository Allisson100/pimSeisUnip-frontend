import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { SnackBarContext } from "../../../contexts/SnackBarContext";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { setSnackBarMessage } = useContext(SnackBarContext);

  const userDatas = JSON.parse(localStorage.getItem("PIMIVJWT-userDatas"));
  const permissions = userDatas?.permissionPaths?.endpoints?.frontMenu;
  const allowAccess = permissions?.includes(pathname);

  if (!allowAccess) {
    setSnackBarMessage({
      message: "Essa conta não tem permissão para acessar essa rota.",
      severity: "error",
    });
  }

  return allowAccess ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
