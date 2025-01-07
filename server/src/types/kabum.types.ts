// https://transform.tools/json-to-typescript

export interface KabumResponse {
    meta: Meta
    links: Links
    data: KabumData[]
}

export interface Meta {
    total_items_count: number
    total_pages_count: number
    page: Page
    breadcrumb: unknown[]
    seo: Seo
    promotion: Promotion
    filters: Filters
}

export interface Page {
    cursor: string
    number: number
    size: number
    is_current_page: boolean
}

export type Seo = unknown

export type Promotion = unknown

export interface Filters {
    highlighted_string: HighlightedString[]
    highlighted_bool: HighlightedBool[]
    highlighted_filters: HighlightedFilter[]
    bool_filters: BoolFilter[]
    string_filters: StringFilter[]
    number_filters: NumberFilter[]
}

export interface HighlightedString {
    name: string
    values: string[]
    text: string
}

export interface HighlightedBool {
    name: string
    values: boolean[]
    text: string
}

export interface HighlightedFilter {
    name: string
    values: unknown[]
    text: string
}

export interface BoolFilter {
    name: string
    values: boolean[]
    text: string
}

export interface StringFilter {
    name: string
    values: string[]
    text: string
}

export interface NumberFilter {
    name: string
    min: number
    max: number
    text: string
}

export interface Links {
    redirect: unknown
    first: string
    self: string
    last: string
    next: string
}

export interface KabumData {
    type: string
    id: number
    links: Links2
    relationships: Relationships
    attributes: Attributes
}

export interface Links2 {
    self: string
}

export type Relationships = unknown

export interface Attributes {
    menu: string
    title: string
    description: string
    weight: number
    price: number
    old_price: number
    discount_percentage: number
    price_with_discount: number
    offer: unknown
    prime?: Prime
    origin: unknown
    is_prime: boolean
    is_openbox: boolean
    has_free_shipping: boolean
    has_free_shipping_for_prime_user: boolean
    is_pre_order: boolean
    date_pre_order: number
    available: boolean
    species: number
    stock: number
    limit_buy: number
    type: number
    external_url: string
    warranty: string
    score_of_ratings: number
    number_of_ratings: number
    is_marketplace: boolean
    marketplace: Marketplace
    manufacturer: Manufacturer
    photos: Photos
    images: string[]
    tag_description: string
    ufs_flash: unknown[]
    featured_product: boolean
    stamps?: Stamps
    max_installment: string
    max_installment_prime?: string
}

export interface Prime {
    price: number
    price_with_discount: number
    discount_percentage: number
    save: number
    is_logged_user_exclusive: boolean
}

export interface Marketplace {
    seller_id?: number
    seller_name?: string
    seller_sale_pj?: boolean
    price?: number
    price_origin?: number
    product_id?: number
    code_product_kabum_1P: unknown
    compunknown?: string
    cnpj?: string
    state?: string
}

export interface Manufacturer {
    id: number
    name: string
    img: string
}

export interface Photos {
    p: string[]
    m: string[]
    g: string[]
    gg: string[]
}

export interface Stamps {
    id: number
    title: string
    name: string
    description: string
    link_rule: string
    background_color: string
    font_color: string
    type: string
}
