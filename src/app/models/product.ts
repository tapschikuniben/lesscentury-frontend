export class Product {
    _id: string;
    sku: {
        sku_name: string;
        sku_status: string;
    };
    upc: string;
    quantity: number;
    stock_status_id: string;
    image_path: string;
    manufacturer_id: string;
    supplier: string;
    delivery_mode: string;
    price: number;
    date_available: Date;
    sort_index: number;
    product_name: string;
    category: string;
    description: string;
    amount: number;
    meta_tag_title: string;
    meta_tag_description: string;
    meta_tag_keyword: string;
    discount: number;
    subtract_stock: number;
    minimum_quantity: number;
    location: string;
    delete_flag: string;
    condition: string;
    todays_deals: boolean;
    is_feature: boolean;
    status: string;
    created_by: string;
    modified_by: string;
    created_date: Date;
    modified_date: Date;
}
