// https://transform.tools/json-to-typescript

export interface PichauResponse {
    data: Data
}

export interface Data {
    category: Category
    products: Products
    banners: unknown[]
}

export interface Category {
    id: number
    description: unknown
    name: string
    product_count: number
    url_key: string
    search_filters_order: string
    breadcrumbs: unknown
    pichau_faq: PichauFaq[]
    meta_title: string
    meta_keywords: unknown
    meta_description: string
    __typename: string
}

export interface PichauFaq {
    answer: string
    question: string
    __typename: string
}

export interface Products {
    aggregations: Aggregation[]
    items: PichauItem[]
    page_info: PageInfo
    total_count: number
    __typename: string
}

export interface Aggregation {
    count: number
    label: string
    attribute_code: string
    options: Option[]
    __typename: string
}

export interface Option {
    count: number
    label: string
    value: string
    __typename: string
}

export interface PichauItem {
    id: number
    sku: string
    url_key: string
    name: string
    socket: unknown
    hide_from_search: number
    is_openbox: number
    openbox_state: unknown
    openbox_condition: unknown
    tipo_de_memoria: unknown
    caracteristicas: unknown
    distribution_center_name: string
    slots_memoria: unknown
    marcas: number
    marcas_info: MarcasInfo
    product_page_layout?: string
    formato_placa: unknown
    plataforma: unknown
    portas_sata: unknown
    slot_cooler_120: unknown
    slot_cooler_80: unknown
    slot_cooler_140: unknown
    slot_cooler_200: unknown
    coolerbox_included: unknown
    potencia?: string
    quantidade_pacote: unknown
    alerta_monteseupc: unknown
    vgaintegrado: unknown
    product_set_name: string
    categories: Category2[]
    special_price?: number
    pichau_prices: PichauPrices
    price_range: PriceRange
    description: Description
    garantia?: string
    informacoes_adicionais?: string
    image: Image
    media_gallery: MediaGallery[]
    short_description: ShortDescription
    amasty_label?: AmastyLabel
    reviews: Reviews
    mysales_promotion?: MysalesPromotion
    only_x_left_in_stock: unknown
    stock_status: string
    codigo_barra: string
    codigo_ncm?: string
    meta_title: string
    meta_keyword: string
    meta_description: string
    __typename: string
}

export interface MarcasInfo {
    name: string
    __typename: string
}

export interface Category2 {
    name: string
    url_path: string
    path: string
    __typename: string
}

export interface PichauPrices {
    avista: number
    avista_discount: number
    avista_method: string
    base_price: number
    final_price: number
    max_installments: number
    min_installment_price: number
    __typename: string
}

export interface PriceRange {
    __typename: string
}

export interface Description {
    html: string
    __typename: string
}

export interface Image {
    url: string
    url_listing: string
    path: string
    label: string
    __typename: string
}

export interface MediaGallery {
    url: string
    path: string
    label: unknown
    position: number
    __typename: string
}

export interface ShortDescription {
    html: string
    __typename: string
}

export interface AmastyLabel {
    name: string
    product_labels: ProductLabel[]
    category_labels: CategoryLabel[]
    __typename: string
}

export interface ProductLabel {
    image: string
    position: string
    size: number
    label: string
    label_color: string
    __typename: string
}

export interface CategoryLabel {
    image: string
    position: string
    size: number
    label: string
    label_color: string
    __typename: string
}

export interface Reviews {
    rating?: number
    count?: number
    __typename: string
}

export interface MysalesPromotion {
    expire_at: string
    price_discount: number
    price_promotional: number
    promotion_name: string
    promotion_url: string
    qty_available: number
    qty_sold: number
    __typename: string
}

export interface PageInfo {
    total_pages: number
    current_page: number
    __typename: string
}
