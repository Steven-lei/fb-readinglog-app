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
import FacebookLogin from "react-facebook-login";
import GithubLogin from "react-github-login";
function Login() {
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();
  const { logIn, googleSignIn, facebookSignIn, githubSignIn } = useUserAuth();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleLogin = async () => {
    console.log(account, password);
    try {
      await logIn(account, password);
      console.log("login successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  const handleFacebookLogin = async (e) => {
    e.preventDefault();
    try {
      await facebookSignIn();
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  const handleGithubLogin = async () => {
    try {
      await githubSignIn();
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
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
              <Button
                className="mt-3"
                onClick={handleGithubLogin}
                style={{ width: "100%" }}
              >
                Login With Github Account
              </Button>

              <Button
                className="mt-3"
                onClick={handleFacebookLogin}
                style={{ width: "100%" }}
              >
                Login With Facebook Account
              </Button>
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
