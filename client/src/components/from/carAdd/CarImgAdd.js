import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'



function CarImgAdd() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [file, setFile] = useState()


    const submitHandel = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("image", file);

            let url= `http://localhost:8000/car/photo/upload/${id}`
            const result = await axios.post(url, formData, { headers: {'Content-Type': 'multipart/form-data'}})
            setFile();
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    return (<>
        <h2>Upload the car photo</h2>
        <form onSubmit={submitHandel}>
            <input
                filename={file}
                onChange={e => setFile(e.target.files[0])}
                type="file"
            />

            <button type="submit">Submit</button>
        </form>
    </>)
}

export default CarImgAdd;