
export function formatCalendarDate(date: string) {
    // convert m/d/yyy to yyyy-mm-dd
    let parts: string[] = date.split('/');
    const month: string = parts[0].length === 1 ? '0' + parts[0] : parts[0];
    const day: string = parts[1].length === 1 ? '0' + parts[1] : parts[1];
    const year: string = parts[2].slice(0, 4);
    return year + '-' + month + '-' + day;
}
