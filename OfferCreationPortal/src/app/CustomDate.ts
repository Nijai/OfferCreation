export class CustomDate {
    formattedDate: string;
    date: Date;

    constructor(dateString: string) {
        const [day, month, year] = dateString.split('-').map(Number);
        this.date = new Date(year, month - 1, day);
        this.formattedDate = dateString;
    }
}