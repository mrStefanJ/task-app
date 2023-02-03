import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Service from '../../../service/service';
import { ArticleData } from '../../../types/articles';
import '../modal.css';

export const AddArticle = (props: any) => {
    const [article, setActicle] = useState<ArticleData>({} as any);
    const {register, handleSubmit } = useForm<ArticleData>()

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

    const onSubmit: SubmitHandler<ArticleData> = data => {
        Service.createArticle(data)
                .then((response: any) => {
                    console.log(response.data)
                })
            }    

    return (
        <div className='modal'>
            <div className='container'>
                <h1>CREATE NEW ARTICLE</h1>
                <form onSubmit={(handleSubmit(onSubmit))}>
                    <label>Title</label>
                    <input type="text" {...register("title", {required: true})} onChange={onTitleChange} placeholder='Enter new title' />
                    <label>Description</label>
                    <input type="text" {...register("body", {required: true})} onChange={onDescriptionChange} placeholder='Enter new description' />
                    <label>Category</label>
                    <select {...register("category_id")} onChange={onCategoreChange}>
                        {props.category.map((c:any) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <input type="submit" value="Create" />
                    <input type="button" value="Cancle" onClick={props.setOpenModal} />
                </form>
            </div>
        </div>
    )
}
