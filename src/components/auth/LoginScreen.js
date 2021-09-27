import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import { StartLogin, startRegister } from "../actions/authActions";
import { setError } from "../actions/uiActions";
import ContainerError from "../ui/ContainerError";
import "./login.css";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.uiReducer);

  // useForm Login
  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "",
    lPassword: "",
  });

  const { lEmail, lPassword } = formLoginValues;

  const handleLogin = (ev) => {
    ev.preventDefault();
    dispatch(StartLogin(lEmail, lPassword));
    dispatch(setError("loginError"));
  };

  // useForm Register
  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: "",
    rEmail: "",
    rPassword: "",
    rPasswordV: "",
  });

  const { rName, rEmail, rPassword, rPasswordV } = formRegisterValues;

  const handleRegister = (ev) => {
    ev.preventDefault();

    if (rPassword !== rPasswordV) {
      dispatch(
        setError("registerError", "Las contraseñas deben de ser iguales")
      );

      return;
    } else {
      dispatch(startRegister(rName, rEmail, rPassword));
      dispatch(setError("registerError"));
    }
  };

  return (
    <div className="container login-container animate__animated animate__fadeInUp">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
          {msgError.loginError && <ContainerError msg={msgError.loginError} />}
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword"
                value={rPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rPasswordV"
                value={rPasswordV}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
          {msgError.registerError && (
            <ContainerError msg={msgError.registerError} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
