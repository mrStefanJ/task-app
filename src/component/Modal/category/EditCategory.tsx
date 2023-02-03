import { useEffect, useState } from 'react';
import { useForm, SubmitHandler  } from 'react-hook-form';
import Service from '../../../service/service';
import { CategoriesData } from '../../../types/categories';

const EditCategory = (props: any) => {
    const [category, setCategory] = useState<CategoriesData>({} as any);
    const {register, handleSubmit } = useForm<CategoriesData>()

    const onTitleChange = (e: any) => {
        setCategory({
            ...category,
            name: e.target.value
        })
    }

    const onDescriptionChange = (e: any) => {
        setCategory({
            ...category,
            description: e.target.value
        })
    }

    useEffect(() => {
        getArticleDataId();
    }, [])

    const getArticleDataId = () => {
        Service.getArticleId(props.id)
            .then((response: any) => {
                console.log(response.data.data)
                setCategory(response.data.data)
            })
    }

    const onSubmit: SubmitHandler<CategoriesData> = data => {
    Service.updateCategorie(props.id, data)
            .then((response: any) => {
                console.log(response)
            })
        }    

    return (
        <div className='modal'>
            <div className='container'>
                <h1>UPDATE ARTICLE</h1>
                <form onSubmit={(handleSubmit(onSubmit))} className="modal__form">
                    <div className='input'>
                        <label>Title</label>
                        <input type="text" {...register("name", {required: true})} onChange={onTitleChange} placeholder='Enter new title' />
                    </div>
                    <div className='input'>
                        <label>Description</label>
                        <input type="text" {...register("description", {required: true})} onChange={onDescriptionChange} placeholder='Enter new description' />
                    </div>
                    <div className='btn__action'>
                    <input type="submit" value="Update" />
                    <input type="button" value="Cancle" onClick={props.openModal} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCategory