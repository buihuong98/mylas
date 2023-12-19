import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";

const Embed = (props: {setIsModalOpenEmbed: Dispatch<SetStateAction<boolean>>, isModalOpenEmbed: boolean, }) => {
   

    const handleOk = () => {
        props.setIsModalOpenEmbed(false)
    };

    const handleCancel = () => {
        props.setIsModalOpenEmbed(false)
    }
    return (
        <Modal title="Add an embed" footer={null} open={props.isModalOpenEmbed} onOk={handleOk} onCancel={handleCancel} >
         <p>Coming soon</p>
        </Modal>
    )
}

export default Embed