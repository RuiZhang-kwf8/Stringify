import "../css/styles.css";
import spotifyLogo from "../assets/wrapped.webp";  

const LoginPage = () => {
  return (
    <div 
      className="login-page"
      style={{
        backgroundImage: `url(${spotifyLogo})`,  
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="login-header" style={{ color: "#FFFFFF" }}  >Stringify</h1>
      <a onClick={() => window.location.href = "http://localhost:5001/api/auth/login"} className="button-container">
        <button className="login-button">Login with Spotify</button>
      </a>
    </div>
  );
};

export default LoginPage;
