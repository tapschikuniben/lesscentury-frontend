
class Address {
    physical_address_line_one: string;
    physical_address_line_two: string;
    country: string;
    zip_code: string;
    contact: number;
}

export class DeliveryAddress {
    _id: string;
    user_id: string;
    billing_address: Address;
    addresses: Address[];
}