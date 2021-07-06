import create from "zustand";

const useProductModal = create((set, get) => ({
    isModalOpen: false,
    setModalOpen() {
        set({ isModalOpen: true, });
    },
    setModalClose() {
        set({ isModalOpen: false });
    },
}));

export default useProductModal;
