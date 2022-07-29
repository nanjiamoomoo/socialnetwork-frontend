import {Input, message, Radio} from "antd"
import {useState} from "react";
import {BASE_URL, SEARCH_KEY} from "../constants";


const {Search} = Input

//This component collects user search keywords and search type and triggers fetch data from backend.
function SearchBar(props) {
    const [searchType, setSearchType] = useState(SEARCH_KEY.all)
    const[loading, setLoading] = useState(false);

    //
    const onSearch = () => {

    }

    //when an event happens, browser puts details into the event object and passes it as an argument to the handler.
    const changeSearchType = (e) => {
        console.log('radio checked', e.target.value);
        setSearchType(e.target.value);
    }

    return (
        <>
            <Search
                className="search-bar"
                placeholder="input search text"
                onSearch={onSearch}
                size="large"
                enterButton={"Search"}
                loading={loading}
            />
            <p/>
            <Radio.Group
                onChange={changeSearchType}
                value={searchType}
                className="search-type-group"
            >
                <Radio value={SEARCH_KEY.all}>all</Radio>
                <Radio value={SEARCH_KEY.keyword}>keywords</Radio>
                <Radio value={SEARCH_KEY.user}>user</Radio>
            </Radio.Group>
        </>

    );
}

export default SearchBar;