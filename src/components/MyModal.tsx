// components/MyModal.tsx

import React, { ReactNode } from "react";
import { Modal, ModalProps } from "@mui/material"; // Example for MUI

import { SyntheticEvent } from "react";

type MyModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    children: ReactNode;
} & Omit<ModalProps, "open" | "onClose">;

const MyModal: React.FC<MyModalProps> = ({
    isOpen,
    closeModal,
    children,
    ...rest
}) => {
    return (
        <Modal
            open={isOpen}
            onClose={(event: SyntheticEvent, reason: "backdropClick" | "escapeKeyDown") => {
                if (reason !== "backdropClick") {
                    closeModal();
                }
            }}
            className="max-w-[700px] m-4"
            {...rest}
        >
            <div className="bg-white p-6 rounded shadow-lg">
                {children}
            </div>
        </Modal>
    );
};

export default MyModal;