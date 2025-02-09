import "../css/styles.css"

const CLIENT_ID = "your_spotify_client_id"; // Replace with your actual Client ID
const REDIRECT_URI = "http://localhost:3000/callback";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE = "user-read-private user-read-email"; // Add more scopes if needed

const LoginPage = () => {
  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}`;  

  return (
    <div className="login-page">
      <h1 className="login-header">Stringify</h1>
      <a href={loginUrl} className="button-container">
        <button className="login-button">Login with Spotify</button>
        <img src="/spotify_logo.png" alt="Spotify Logo" className="button-image" />
      </a>
    </div>
  );
};

export default LoginPage;
