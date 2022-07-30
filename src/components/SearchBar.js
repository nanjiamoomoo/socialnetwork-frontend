import {Input, Radio} from "antd"
import {useState} from "react";
import {SEARCH_KEY} from "../constants";

const {Search} = Input

//This component collects user search keywords and search type and triggers fetch data from backend.
function SearchBar({handleSearch, searching}) {
    const [searchType, setSearchType] = useState(SEARCH_KEY.all)
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //when click on search, onSearch will call handleSearch passed from parent to update parent state,
    //which will trigger the rerender of the component
    const onSearch = (value) => {
        setLoading(true);
        if (searchType !==SEARCH_KEY.all && value === "") {
            setError("Please input your search keyword!");
            setLoading(false);
            return
        }
        setError("");
        handleSearch({type: searchType, keyword: value});
        if( searching === false) {
            setLoading(false);
        }
    }

    //when an event happens, browser puts details into the event object and passes it as an argument to the handler.
    const changeSearchType = (e) => {
        console.log('radio checked', e.target.value);
        const sType = e.target.value;
        setSearchType(sType);//this is asynchronous, may not update immediately这个是异步的，所以可能不会立即更新，
        setError("");//handle error before change
        //if searchType is all, Home will update without 'onSearch Event'. Other options will update through 'onSearch’ event.
        if (sType === SEARCH_KEY.all) {
            handleSearch({ type: SEARCH_KEY.all, keyword: "" });
        }
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
                disabled={searchType === SEARCH_KEY.all}
            />
            <p className="error-msg">{error}</p>
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