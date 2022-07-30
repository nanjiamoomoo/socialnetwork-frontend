import {useRef, useState} from "react";
import {Button, Modal, message} from "antd";
import {PostForm} from "./PostForm";
import axios from "axios";
import {BASE_URL, TOKEN_KEY} from "../constants";

function CreatePostButton(props) {
    const {showPostAfterUpload} = props;
    const uploadForm = useRef();

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const showModal = () => {
        setIsVisible(true);
    };

    const handleUpload = () => {
        setIsLoading(true);
        console.log(uploadForm.current)
        //select the PostForm and find validate fields of the form
        uploadForm.current
            .validateFields()
            .then((form) => {
                const {description, postUploaded} = form;
                //only upload the first file if multiple files are selected
                const {type, originFileObj} = postUploaded[0];
                const postType = type.match(/^(image|video)/g)[0];
                if (postType) {
                    let formData = new FormData();
                    formData.append("message", description);
                    formData.append("media_file", originFileObj);

                    const opt = {
                        method: "POST",
                        url: `${BASE_URL}/upload`,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                        },
                        data: formData
                    };

                    axios(opt)
                        .then((res) => {
                            if (res.status === 200) {
                                message.success("The image/video is uploaded!");
                                uploadForm.current.resetFields();
                                handleCancel();
                                showPostAfterUpload(postType);
                            }
                        })
                        .catch((err) => {
                            console.log("Upload image/video failed: ", err.message);
                            message.error("Failed to upload image/video!");
                        }).finally(()=> {
                            setIsLoading(false);
                    });
                }
            })
            .catch((err) => {
                console.log("err in validate form -> ", err);
            });
    };

    const handleCancel = () => {
        setIsVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create New Post
            </Button>
            <Modal
                title="Create New Post"
                visible={isVisible}
                onOk={handleUpload}
                okText="Create"
                onCancel={handleCancel}
                confirmLoading={isLoading}
            >
                <PostForm ref={uploadForm}/>
            </Modal>
        </>
    )
};

export default CreatePostButton;