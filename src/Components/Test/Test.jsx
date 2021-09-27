import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function Test() {
    const [state, setState] = useState('');
    const [data, setData] = useState([]);
    const [dataSearch, setDataSearch] = useState([]);
    useEffect(() => {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s`)
            .then(res => {
                // console.log("res : ", res.data);
                setData(res.data)
            })
            .catch(err => console.log(err));
    }, [])
    const handleChange = (e) => {
        // console.log(e.target.value)
        setState(e.target.value)
    }
    const handleClick = () => {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${state}`)
            .then(res => {
                setDataSearch(res.data)
            })
            .catch(err => console.log(err));
    }

    const renderData = (data) => {
        return data.map((drink, index) => {
            return (
                <div className="card col-2 mt-1" key={index}>
                    <img height={300} width={200} className="card-img-top" src={drink.strDrinkThumb} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{drink.strDrink}</h5>
                    </div>
                </div>

            )
        })
    }
    // console.log("dataSearch", dataSearch)
    return (
        <div className="container">
            <div className=" row d-flex ">
                <div>
                    <input className="mt-3 mb-3 form-control" type="text" placeholder="Enter string"
                        onChange={handleChange}
                        style={{ width: "300px" }}
                    />
                </div>
                <div className="mt-3">
                    <button className="btn btn-info ml-2"
                        onClick={handleClick}
                    > search</button>
                </div>
            </div>

            <div className="row text-center mb-5">
                {dataSearch.length !== 0 ? renderData(dataSearch.drinks) : ""}
            </div>
            <hr />
            <div className="row">
                {data.length !== 0 ? renderData(data.drinks.slice(0, 12)) : ""}
            </div>
        </div>
    )
}
