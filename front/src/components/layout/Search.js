import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate("/");
        }
    }


    return (
        <div class="wrap">
            <form class="searchForm" onSubmit={searchHandler}>
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="¿Qué estás buscando?" onChange={(e) => setKeyword(e.target.value)} />
                    <button type="submit" class="searchButton">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </form>
        </div>
    )
};

export default Search
