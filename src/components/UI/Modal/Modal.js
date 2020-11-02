import React from "react";
import { Modal } from "antd";

const modal = (props) => {
  return (
    <Modal
      closable={true}
      title={props.title}
      onCancel={props.onCancel}
      visible={props.visible}
      bodyStyle={{
        alignItems: "center",
        fontFamily: '"Montserrat", sans-serif',
        backgroundColor: "#fff",
      }}
      style={{ top: "20%" }}
      footer={[...props.footer]}
    >
      {props.children}
    </Modal>
  );
};

export default modal;
