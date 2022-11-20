import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth";

const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: login,
  });

  return {
    loginMutation,
  };
};

export default useAuth;
