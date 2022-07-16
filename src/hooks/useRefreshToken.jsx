import axios from "../API/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { set_Auth } = useAuth();

  const refresh = async () => {
    const res = await axios.get("/refresh", {
      // withCredentials: true,
    });
    set_Auth((prev) => {
      console.log(JSON.stringify(prev));
      console.log("res === ", res.data.assessToken);
      return { ...prev, assessToken: res.data.assessToken };
    });
    return res.data.assessToken;
  };
  return refresh;
};

export default useRefreshToken;
