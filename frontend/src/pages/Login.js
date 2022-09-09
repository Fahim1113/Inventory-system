import styles from "../CSS/login.module.css";

const { image } = styles;

function Login(props) {
  return (
    <div>
      <img classname={image} src={require('../images/logo.png')} />
    </div>
  );
}

export default Login;
