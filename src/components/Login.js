import { useState } from "react";
import {
  Alert,
  Button,
  Container,
  FormControl,
  FormText,
} from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();
  const { logIn, googleSignIn } = useUserAuth();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleLogin = async () => {
    console.log(account, password);
    try {
      await logIn(account, password);
      console.log("login successfully");
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };
  return (
    <>
      <div className="login">
        <div className="p-4 box">
          <h2 className="mb-3">Firebase Auth Login</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <div className="panel-body">
            <div className="form-group">
              <FormText htmlFor="account">Account:</FormText>
              <FormControl
                type="text"
                className="form-control"
                id="account"
                placeholder="Account Name"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <FormText htmlFor="password">Password:</FormText>
              <FormControl
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-grid gap-2">
              <Button onClick={handleLogin}>Login</Button>
            </div>
            <hr />
            <div>
              <GoogleButton
                className="g-btn"
                type="dark"
                onClick={handleGoogleLogin}
                style={{ width: "100%" }}
              ></GoogleButton>
            </div>
          </div>
        </div>
        <div className="p-4 box mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </>
  );
}
export default Login;
