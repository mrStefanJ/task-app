import { useEffect, useState } from 'react';
import { AddArticle } from '../../component/Modal/article/AddArticle';
import EditArticle from '../../component/Modal/article/EditArticle';
import Service from '../../service/service';
import { ArticleData } from '../../types/articles';
import { CategoriesData } from '../../types/categories';

import CommentArticle from '../../component/Modal/article/CommentArticle';
import './article.css';

function ArticlePage() {
    const [articleData, setArticleData] = useState<ArticleData[]>([]);
    const [categorieData, setCategorieData] = useState<CategoriesData[]>([]);
    const [isLoadig, setIsLoading] = useState(true);
    const [error, SetError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState({open: false, id: null});
    const [openArticleComments, setOpenArticleComments] = useState({open: false, id: null});

    const showModalHandler = () => {
        setOpenModal(true);
    }

    const closeModalHandler = () => {
        setOpenModal(false);
    }

    const showEditModalHandler = (id: any) => {
        setOpenEditModal({open: true, id});
    }

    const closeEditModalHandler = () => {
        setOpenEditModal({open:false, id: null});
    }

    const showCommentHandler = (id: any) => {
        setOpenArticleComments({open: true, id});
    }

    const closeCommentHandler = () => {
        setOpenArticleComments({open:false, id: null});
    }

    useEffect(() => {
        retriveArticle();
        getCategoriaName();
    }, [])

    const retriveArticle = () => {
        Service.getAllArticles()
            .then((response: any) => {
                const data = response.data;
                const articalData = data.data;
                setArticleData(articalData);
                setIsLoading(false)
            })
            .catch((ex) => {
                const error = ex.respobse.status === 404 ?
                    "Resource Not Found" : "An unxpected error has occurred"
                console.log(error);
                SetError(error)
                setIsLoading(false);
            })
    }

    const getCategoriaName = () => {
        Service.getAllCategories()
            .then((response: any) => {
                const data = response.data.data;
                setCategorieData(data);
            })
    }
    const deleteHandler = (id: any) => {
        Service.removeArticle(id)
            .then((response: any) => {
                console.log(response.data)
            })
    }

    return (
        <div className='article'>
            <h1>Articles</h1>
            <button className='btn btn__create' onClick={showModalHandler}>Create</button>
            <div className='article__card'>
            <ul className='article__list'>
                {articleData && articleData.map((article, i) => {
                    return (
                        <li key={article.id}>
                            <p>{article.title}</p>
                            <p>{article.body}</p>
                            <p>Create: {article.created_at}</p>
                            <p>Update: {article.updated_at}</p>
                            <div>
                                {categorieData && categorieData.map(categorie => {
                                    if (article.category_id === categorie.id) {
                                        return <p key={categorie.id}>Categorie: {categorie.name}</p>
                                    }
                                })}
                            </div>
                            <div className='btn__action'>
                            <button className='btn btn__comments' onClick={() => showCommentHandler(article.id)}>Comments</button>
                            <button className='btn btn__edit' onClick={() => showEditModalHandler(article.id)}>Edit</button>
                            <button className='btn btn__delete' onClick={(e) => { e.preventDefault(); deleteHandler(article.id) }}>Delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
            </div>
            {error && <p>{error}</p>}
            {openModal && <AddArticle setOpenModal={closeModalHandler} category={categorieData} />}
            {openEditModal.open && <EditArticle setOpenEditModal={closeEditModalHandler} id={openEditModal.id}  category={categorieData} />}
            {openArticleComments.open && <CommentArticle setOpenArticleComments={closeCommentHandler} id={openArticleComments.id} />}
        </div>
    )
}

export default ArticlePage
