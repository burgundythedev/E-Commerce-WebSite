import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectIsLoggedIn } from "../../store/slice/authSlice";
const ShowLogin = ({ children }) => {
  const logIn = useSelector(selectIsLoggedIn);
  if (logIn) {
    return children;
  }
  return null;
};

export const HideLogin = ({ children }) => {
  const logIn = useSelector(selectIsLoggedIn);
  if (!logIn) {
    return children;
  }
  return null;
};

export default ShowLogin;
