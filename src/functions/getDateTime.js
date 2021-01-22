
export const getUTCTime = () => {
    const d1 = new Date();
    const d2 = new Date( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() );;
    const datetime = d2.toUTCString();
    return datetime;
}