export class Order {
    _id: string;
    customer_id: string;
    firstname: string;
    lastname: string;
    user_name: string;
    email: string;
    customer_contact: number;
    is_delivery: string;
    delivery_fee: number;
    delivery_instructions: string;
    destination: {
        shipping_address: string;
        location: string;
    };
    shipping_company: {
        shipping_company_name: string;
        shipping_company_contact: string;
        shipping_company_address: string;
    };
    shipping_method: string;
    cart_items: any;
    payment_methods: any;
    stage: string;
    currency_code: string;
    shipping_zone_id: string;
    payment_zone_id: string;
    shipping_country_id: string;
    payment_country_id: string;
    invoice_no: string;
    invoice_prefix: string;
    order_prefix_id: string;
    commision: number;
    sub_total: number;
    reward: number;
    total: number;
    discount: number;
    rate: {
        usd: number;
        zwl: number;
    };
    credits_used: number;
    discounted_subtotal: number;
    created_by: string;
    modified_by: string;
    created_date: Date;
    modified_date: Date;
    status: string;
    promo_code: string;
    shop_contact: number;
    shop_email: string;
    shop_address: string;
    comment: string;
    affiliate_id: string;
    ip: string;
    order_number: string;
}