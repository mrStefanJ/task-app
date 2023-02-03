export default interface Categories{
    current_page: number,
    data: CategoriesData,
    link: Links,
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: null,
    to: number,
    total: number
}

export interface CategoriesData {
    id?: number,
    name: string,
    description: string,
    created_at: string,
    updated_at: string
}

export interface Links {
    url: any | null,
    label: string,
    active: boolean 
}