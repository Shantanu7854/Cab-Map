import axios from "axios";

const BASE_URL = "https://map-link-locator-backend-1.onrender.com";

export const resolveMapLink = async (url: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/resolve`, { url });
    return res.data;
  } catch (err: any) {
    return { error: err.response?.data?.error || "Something went wrong" };
  }
};
