export function dateFormatter(timestamp) {
    const date = new Date(timestamp);

    const dateFormat = date.toLocaleDateString();

    return dateFormat;
}

export function longDateFormatter(locales) {
    const date = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

    const longDate = new Intl.DateTimeFormat(locales, options).format(date); 
    return longDate;
}   