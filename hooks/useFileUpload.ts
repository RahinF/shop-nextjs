import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../services/upload";

const useFileUpload = () => {
  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
  });

  return {
    uploadFileMutation,
  };
};

export default useFileUpload;
