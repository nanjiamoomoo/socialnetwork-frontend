import React from "react";
import {InboxOutlined} from "@ant-design/icons";
import {Form, Input, Upload} from 'antd';

const {Dragger} = Upload;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16}
};

const normFile = (e) => {
    console.log("Upload event:", e);
    return e && e.fileList;
};

export const PostForm = React.forwardRef((props, ref) => {

    return (
        <Form
            {...formItemLayout}
            ref={ref}
        >
            <Form.Item
                name="description"
                label="Message:"
                rules={[
                    {
                        required: true,
                        message: "Please input your message!"
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Dragger:"
                name="postUploaded"
                getValueFromEvent={normFile}
                rules={[
                    {
                        required: true,
                        message: "Please select an image/video!"
                    }
                ]}
            >
                <Dragger
                    // Prevent upload behavior when return false or reject promise, the prevented file would still show in file list
                    beforeUpload={() => false}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
            </Form.Item>

        </Form>

    )
});
