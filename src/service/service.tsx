import http from '../http-common';
import { ArticleData }  from '../types/articles';
import { CategoriesData } from '../types/categories';

// API method atricles
const getAllArticles = () => {
    return http.get<ArticleData>("/articles")
}

const getArticleId = (id: any) => {
    return http.get<ArticleData>(`/articles/${id}`)
}

const createArticle = (data: ArticleData) => {
    return http.post<ArticleData>('/articles?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN', data)
}

const updateArticle = (id: any, data: ArticleData) => {
    return http.put<any>(`/articles/${id}?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN`, data)
}

const removeArticle = (id: any) => {
    return http.delete<any>(`/articles/${id}?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN`)
}

const getArticleComments = (id: any) => {
    return http.get<ArticleData>(`/articles/${id}/comments`)
}

const getAllCategories = () => {
    return http.get<CategoriesData>("/categories")
}

// API method category
const getCategorieId = (id: any) => {
    return http.get<CategoriesData>(`/categories/${id}`)
}

const createCategorie = (data: CategoriesData) => {
    return http.post<CategoriesData>("/categories?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN", data)
}

const updateCategorie = (id: any, data: CategoriesData) => {
    return http.put<any>(`/categories/${id}?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN`, data)
}

const removeCategorie = (id: any) => {
    return http.delete<any>(`/categories/${id}?api_token=9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN`)
}

const Service = {
    getAllArticles,
    getArticleId,
    createArticle,
    updateArticle,
    removeArticle,
    getArticleComments,
    getAllCategories,
    getCategorieId,
    createCategorie,
    updateCategorie,
    removeCategorie
}

export default Service;