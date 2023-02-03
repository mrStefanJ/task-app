import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Service from '../../../service/service';
import { ArticleData } from '../../../types/articles';
import '../modal.css'

const EditArticle = (props: any) => {
    const [article, setActicle] = useState<ArticleData>({} as any);
    const { register, handleSubmit } = useForm<ArticleData>()

    const onTitleChange = (e: any) => {
        setActicle({
            ...article,
            body: e.target.value
        })
    }

    const onDescriptionChange = (e: any) => {
        setActicle({
            ...article,
            title: e.target.value
        })
    }

    const onCategoreChange = (e: any) => {
        setActicle({
            ...article,
            category_id: e.target.value
        })
    }

    useEffect(() => {
        getArticleDataId();
    }, [])

    const getArticleDataId = () => {
        Service.getArticleId(props.id)
            .then((response: any) => {
                console.log(response.data.data)
                setActicle(response.data.data)
            })
    }

    const onSubmit: SubmitHandler<ArticleData> = data => {
        Service.updateArticle(props.id, data)
            .then((response: any) => {
                console.log(response)
            })
    }

    return (
        <div className='modal'>
            <div className='container'>
                <h1>UPDATE ARTICLE</h1>
                <form onSubmit={(handleSubmit(onSubmit))}>
                    <div className='input'>
                        <label>Title</label>
                        <input type="text" {...register("title", { required: true })} onChange={onTitleChange} placeholder='Enter new title' />
                    </div>
                    <div className='input'>
                        <label>Description</label>
                        <input type="text" {...register("body", { required: true })} onChange={onDescriptionChange} placeholder='Enter new description' />
                    </div>
                    <select {...register("category_id")} onChange={onCategoreChange}>
                        {props.category.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <div className="btn__action">
                        <input type="submit" value="Update" />
                        <input type="button" value="Cancle" onClick={props.setOpenEditModal} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditArticle