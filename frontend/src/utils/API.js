// httpService.js
const BASE_URL = "https://backend-sonyaweb.liara.run/";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const buildURL = (path) => {
  const cleanBase = BASE_URL.replace(/\/+$/, "");
  return cleanBase + (path.startsWith("/") ? path : "/" + path);
};

export const getRequest = async (path) => {
  try {
    const response = await fetch(buildURL(path), {
      method: "GET",
      headers: defaultHeaders,
    });
    return await response.json();
  } catch (error) {
    console.error("❌ خطای GET:", error);
    return null;
  }
};

export const postRequest = async (path, data) => {
  try {
    const response = await fetch(buildURL(path), {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("❌ خطای POST:", error);
    return null;
  }
};

export const putRequest = async (path, data) => {
  try {
    const response = await fetch(buildURL(path), {
      method: "PUT",
      headers: defaultHeaders,
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("❌ خطای PUT:", error);
    return null;
  }
};
