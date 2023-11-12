export const setAuthUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
};
export const getAuthUser = () => {
    if (localStorage.getItem("user")) {
        // @ts-ignore
        return JSON.parse(localStorage.getItem("user"));
    }
};
export const removeAuthUser = () => {
    if (localStorage.getItem("user")) localStorage.removeItem("user");
};
