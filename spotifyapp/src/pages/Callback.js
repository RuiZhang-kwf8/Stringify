import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = queryString.parse(window.location.hash);
    const token = hash.access_token;

    if (token) {
      localStorage.setItem("spotify_token", token);
      navigate("/dashboard"); // Redirect after login
    }
  }, [navigate]);

  return <h2>Logging in...</h2>;
};

export default Callback;
