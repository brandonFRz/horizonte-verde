export interface Settings {
    id: string;
    created_at: Date;
    minBookingLength: number;
    maxBookingLength: number;
    maxGuestsPerBooking: number;
    brakefastPrice: number;
}