import { useEffect, useState } from 'react';
import Service from '../../../service/service';
import Comments from '../../../types/comments';

import './comment.css';

const CommentArticle = (props: any) => {
    const [dataComments, setDataComments] = useState<Comments[]>([]);

    const fetchComment = () => {
        Service.getArticleComments(props.id)
            .then((response: any) => {
                const data = response.data.data;
                console.log(response.data)
                setDataComments(data)
            })
    }

    useEffect(() => {
        fetchComment();
    }, []);
    console.log('A: ', dataComments)
    return (
        <div className='modal'>
            <div className='container'>
                <h1>COMMENT ARTICLE</h1>
                <ul className='comments__list'>
                    {dataComments.map((comment, i) => 
                     (
                        <li key={comment.id}>
                            <p>{comment.title}</p>
                            <p>{comment.description}</p>
                        </li>
                        )
                    )}
                </ul>
                <input type="button" value="Cancle" onClick={props.setOpenArticleComments} />
            </div>
        </div>
    )
}

export default CommentArticle