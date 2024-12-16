import { BiLogOut } from "react-icons/bi";
import userLogout from "../../hooks/userLogout";

const LogoutButton = () => {
  const { loading, logout } = userLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
