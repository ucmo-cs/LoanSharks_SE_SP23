export function dateStringToDate(dateString) {
    const parts = dateString.split("-");
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}

export function toCurrency(amount) {
    const str = Math.abs(amount).toLocaleString(
        "en-US", 
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    );

    return `${amount < 0 ? "-" : ""}$${str}`;
}

export function toYYYYMMDD(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
}