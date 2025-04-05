const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
}

const dateToString = (date) => {
    const givenDate = new Date(date);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[givenDate.getMonth()]} ${givenDate.getDate()}, ${givenDate.getFullYear()}`;
}


export { toastOptions, dateToString };