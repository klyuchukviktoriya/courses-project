export default function getCourseDuration(minutes: number): string {

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
    const label = hours === 1 ? 'hour' : 'hours';

    return `${formattedHours}:${formattedMins} ${label}`;
}
