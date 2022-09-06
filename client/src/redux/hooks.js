import { useSelector } from "react-redux";

export const useAuthSelector = () => useSelector((state) => state.auth);
export const useKeywordSelector = () => useSelector((state) => state.keyword);
