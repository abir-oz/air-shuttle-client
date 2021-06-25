import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';



const AddPackages = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const url = 'https://sleepy-mountain-41781.herokuapp.com/addPack';

    const [imageUrl, setImageUrl] = useState(null);

    const handleImageUpload = (event) => {
        console.log(event.target.files[0]);

        const imageData = new FormData();

        imageData.set('key', 'fc65f105fe3cf15bf6e9b680f2832c19');
        imageData.append('image', event.target.files[0]);

        axios.post("https://api.imgbb.com/1/upload", imageData)
            .then(response => {
                setImageUrl(response.data.data?.display_url);
            }).catch(err => {
                console.log(err);
            })
    }

    const seats = new Array(30).fill(1).map((e, i) => ({ id: i + 1, title: `seat: ${i + 1}`, isBooked: false }));


    const onSubmit = data => {

        const newPackages = {
            name: data.title,
            price: data.price,
            ticket: data.ticket,
            image: imageUrl,
            seats

        }

        fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPackages)
        }).then(response => console.log(response))

    }



    return (
        <>


            <div className="container">
                <div className="row" >
                    <div className="col-md-8 bg-white rounded-3 shadow mx-auto mt-5">
                        <form className="form m-5" onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="title">Package Title</label>
                            <input className="mb-3 form-control"  {...register("title", { required: 'true' })} id="title" />
                            <label htmlFor="Price">Package Price</label>

                            <input type="number" className="mb-3 form-control"  {...register("price", { required: 'true' })} id="price" />
                            {errors.title && <span>This filed is required</span>}

                            <label>Package Type: </label>
                            <br />
                            <input className="mb-3" value="Business" type="radio" id="business"
                                {
                                ...register("ticket")
                                }
                            />
                            <label className="ms-2" htmlFor="business">
                                Business
                            </label>
                            <input className="ms-5 mb-3" type="radio" value="Economy" id="economy"
                                {
                                ...register("ticket")
                                }
                            />
                            <label className="ms-2" htmlFor="economy">
                                Economy
                            </label>

                            <br />
                            <label htmlFor="image">Destination Image</label>
                            <br />

                            <input className="mb-3 form-control" type="file" onChange={handleImageUpload} id="image"></input>

                            <input className="mb-3 form-control btn btn-danger" type="submit" />
                        </form>
                    </div>
                </div >
            </div>
        </>
    );
};

export default AddPackages;