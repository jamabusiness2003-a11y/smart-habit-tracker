export function dateFormatter(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function longDateFormatter(locales) {
    const date = new Date();
    const options = { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
    };

    return new Intl.DateTimeFormat(locales, options).format(date); 
}

export function parseLocalDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month-1, day);
}

export function daysDifference(current_day, last_day) {
    return Math.floor(
        (current_day - last_day) / (1000 * 60 * 60 * 24)
    );
}