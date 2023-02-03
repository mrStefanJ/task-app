import { useEffect, useState } from 'react';
import { AddCategory } from '../../component/Modal/category/AddCategory';
import EditCategory from '../../component/Modal/category/EditCategory';
import Service from '../../service/service';
import { CategoriesData } from '../../types/categories';
import './category.css';

function CategoriesPage() {
    const [categorieData, setCategorieData] = useState<CategoriesData[]>([]);
    const [isLoadig, setIsLoading] = useState(true);
    const [error, SetError] = useState("");
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState({ open: false, id: null });

    const showModalHandler = () => {
        setOpenAddModal(true);
    }

    const closeModalHandler = () => {
        setOpenAddModal(false);
    }

    const showEditModalHandler = (id: any) => {
        setOpenEditModal({ open: true, id });
    }

    const closeEditModalHandler = () => {
        setOpenEditModal({ open: false, id: null });
    }

    useEffect(() => {
        retriveCategorie()
    }, [])

    const retriveCategorie = () => {
        Service.getAllCategories()
            .then((response: any) => {
                const data = response.data;
                const categoriesData = data.data;
                setCategorieData(categoriesData);
                setIsLoading(false)
                console.log(categoriesData)
            })
            .catch((ex) => {
                const error = ex.respobse.status === 404 ?
                    "Resource Not Found" : "An unxpected error has occurred"
                console.log(error);
                SetError(error)
                setIsLoading(false);
            })
    }

    const deleteHandler = (id: any) => {
        Service.removeCategorie(id)
            .then((response: any) => {
                console.log(response)
            })
    }

    return (
        <div className='category'>
            <h1>Categories</h1>
            <button className='btn btn__create' onClick={showModalHandler}>Create</button>
            <ul className='category__list'>
                {categorieData.map((categorie, i) => {
                    return (
                        <li key={i}>
                            <p>{categorie.name}</p>
                            <p>{categorie.description}</p>
                            <p>{categorie.created_at}</p>
                            <p>{categorie.updated_at}</p>
                            <div className='btn__action'>
                                <button className='btn btn__edit' onClick={() => showEditModalHandler(categorie.id)}>Edit</button>
                                <button className='btn btn__delete' onClick={(e) => { e.preventDefault(); deleteHandler(categorie.id) }}>Delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
            {error && <p>{error}</p>}
            {openAddModal && <AddCategory openModal={closeModalHandler} />}
            {openEditModal.open && <EditCategory openModal={closeEditModalHandler} id={openEditModal.id} />}
        </div>
    )
}

export default CategoriesPage
