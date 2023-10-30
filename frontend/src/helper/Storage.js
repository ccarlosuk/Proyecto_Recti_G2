export const setAuthUser = (data) => {
    // Convierte el dato de entrada a una cadena JSON y lo almacena en localStorage
    localStorage.setItem("user", JSON.stringify(data));
};