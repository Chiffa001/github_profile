const onHandleGlobalError = () => console.error("Beda");

window.addEventListener("error", onHandleGlobalError);
window.addEventListener("unhandledrejection", onHandleGlobalError);

const searchFormEl = document.querySelector(".search-form");
const profileEl = document.querySelector(".profile");

const fillProfileEl = (profile) => {
    const imgEl = profileEl.querySelector(".profile_avatar");
    const nameEl = profileEl.querySelector(".profile_name");
    const locationEl = profileEl.querySelector(".profile_location");

    const { name, avatar_url, location } = profile;

    imgEl.src = avatar_url;
    imgEl.classList.remove("profile_avatar--default");
    nameEl.innerHTML = name;
    nameEl.classList.remove("visually-hidden");
    locationEl.innerHTML = location;
};

const getProfile = async (name = "") => {
    const baseUrl = "https://api.github.com/users/";
    const response = await fetch(baseUrl + name);
    if (!response.ok) throw new Error("Profile not found!");
    const body = await response.json();
    return body;
};

const onFindProfile = async (e) => {
    e.preventDefault();
    const { target } = e;
    const name = target[0].value;
    try {
        const res = await getProfile(name);
        fillProfileEl(res);
    } catch (err) {
        if (err instanceof Error) alert(err.message);
        throw err;
    }
};

searchFormEl?.addEventListener("submit", onFindProfile);
