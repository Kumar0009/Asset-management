


export interface User {
    id?: string;
    name: string;
    email: string;
    address: Address;
}


export interface Address {
    city: string;
    state: string;
    pin: number;
}
