
// backend tokens & user helper

export const setTokens = (accessToken: string, refreshToken?: string) => {
  localStorage.setItem("accessToken", accessToken);
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const logout = () => clearTokens();

export const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export const setUser = (user: any) => {
  if (!user._id) {
    console.warn("⚠️ setUser called without _id!");
  }
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const stored = localStorage.getItem("user");
  if (stored) return JSON.parse(stored);

  const token = getAccessToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded ? decoded.user || decoded : null;
};
