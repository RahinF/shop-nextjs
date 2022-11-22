import axios from "axios";

interface CloudinaryResponse {
  format: string;
  public_id: string;
  secure_url: string;
}

export const uploadFile = async (
  file: FormData
): Promise<CloudinaryResponse> => {
  return axios
    .post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      file
    )
    .then((response) => response.data);
};
