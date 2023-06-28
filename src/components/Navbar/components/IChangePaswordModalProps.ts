export interface IChangePassowrdModalProps {
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void;
}

export interface IValueForm {
    password: String,
    newPassword: String
}