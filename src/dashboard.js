import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const Dashboard = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        loadArticles()
    }, [])

    const loadArticles = () => {
        axios({
            url: 'http://127.0.0.1:8000/api/v1/get-articles',
            method: 'GET'
        }).then((res) => {
            setArticles(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleOnChange = (event) => {
        const file = event.target.files[0]
        let formData = new FormData();
        formData.append("file", file);

        axios({
            url: "http://127.0.0.1:8000/api/v1/file-upload",
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            loadArticles()
        }).catch(() => {
            alert('failed')
        })
    }

    return (
        <>
        <div className='container'>
            <h3 style={{margin: "20px 0px"}}>Please upload a file to insert data</h3>
            <input type='file' accept=".json" onChange={handleOnChange} />

            <table class="table table-striped">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Title</td>
                        <td>Body</td>
                        <td>User Id</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        articles.length > 0 ? articles.map((article, index) => (
                            <tr>
                                <td>{index+1}</td>
                                <td>{article.title}</td>
                                <td>{article.body}</td>
                                <td>{article.user_id}</td>
                            </tr>
                        )) : (
                            <div>No data present at moment</div>
                        )
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}
