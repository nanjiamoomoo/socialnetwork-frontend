import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import {Tabs, message, Row, Col} from "antd";
import {BASE_URL, SEARCH_KEY, TOKEN_KEY} from "../constants";
import axios from "axios";
import PhotoGallery from "./PhotoGallery";
import CreatePostButton from "./CreatePostButton";

const {TabPane} = Tabs

//The home page after login. It displays the search results based on the search option and selections.
function Home() {
    const [posts, setPost] = useState([]);
    const [activeTab, setActiveTab] = useState("image");
    const [searching, setSearching] = useState(false);
    const [searchOption, setSearchOption] = useState({
        type: SEARCH_KEY.all,
        keyword: ""
    })

    const onChangeTab = (key) => {
        setActiveTab(key);
    }

    //update searchOption to trigger component update
    const handleSearch = (option) => {
        const {type, keyword} = option;
        setSearchOption({type: type, keyword: keyword});
    }

    useEffect(() => {
        //everytime searchOption changes, fetchPost will be called and a request will be sent to backend to fetch posts.
        fetchPost(searchOption);
    }, [searchOption])

    const fetchPost = (option) => {
        setSearching(true);
        const {type, keyword} = option;
        let url = ""
        if (type === SEARCH_KEY.all) {
            url = `${BASE_URL}/search`;
        } else if (type === SEARCH_KEY.user) {
            url = `${BASE_URL}/search?user=${keyword}`
        } else {
            url = `${BASE_URL}/search?keywords=${keyword}`;
        }

        const opt = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };

        axios(opt)
            .then((response) => {
                if (response.status === 200) {
                    setPost(response.data);
                }
            })
            .catch((err) => {
                message.error("Fetch posts failed!");
                console.log("fetch posts failed: ", err.message);
            }).finally(() => {
            setSearching(false);
        })
    }
    const renderPosts = (type) => {
        if (!posts || posts.length === 0) {
            return <div>No data!</div>;
        }
        if (type === "image") {
            const imageArr = posts
                .filter((item) => item.type === "image")
                .map((image) => {
                    return {
                        postId: image.id,
                        src: image.url,
                        user: image.user,
                        caption: image.message,
                        thumbnail: image.url,
                        thumbnailWidth: 300,
                        thumbnailHeight: 200
                    };
                });
            return <PhotoGallery images={imageArr}/>;
        } else if (type === "video") {
            return (
                <Row gutter={32}>
                    {posts
                        .filter((post) => post.type === "video")
                        .map((video) => (
                            <Col span={8} key={video.url}>
                                <video src={video.url} controls={true} className="video-block"/>
                                <p>
                                    {video.user}: {video.message}
                                </p>
                            </Col>
                        ))}
                </Row>
            );
        }
    }

    //after upload new post, automatically show all the posts for the uploaded type
    const showPostAfterUpload = (postType) => {
        setActiveTab(postType);

        setTimeout(() => {
            setSearchOption({type: SEARCH_KEY.all, keyword: ""});
        }, 3000);
    }

    const operations = <CreatePostButton showPostAfterUpload={showPostAfterUpload}/>

    return (
        <div className="home">
            <SearchBar
                handleSearch={handleSearch}
                searching={searching}
            />
            <Tabs
                defaultActiveKey="image"
                activeKey={activeTab}
                onChange={onChangeTab}
                tabBarExtraContent={operations}
            >
                <TabPane tab="Images" key="image">
                    {renderPosts("image")}
                </TabPane>
                <TabPane tab="Videos" key="video">
                    {renderPosts("video")}
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Home;