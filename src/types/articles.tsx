export default interface Articles {
    current_page: number,
    data: ArticleData,
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

export interface ArticleData {
    id?: any | null,
    title: string,
    body: string,
    user_id: number,
    category_id: number,
    created_at: string,
    updated_at: string
}

export interface Links {
    url: any | null,
    label: string,
    active: boolean 
}