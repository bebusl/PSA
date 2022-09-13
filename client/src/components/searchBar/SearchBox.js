import { BsSearch } from "react-icons/bs";
import { Form, SearchInput, SubmitButton } from "./SearchBox.style";

function SearchBar({ onSubmit, searchItem, onChange }) {
  return (
    <Form onSubmit={onSubmit}>
      <SearchInput
        type="text"
        name="searchItem"
        value={searchItem}
        placeholder="원하는 상품을 검색해보세요!"
        onChange={onChange}
      />
      <SubmitButton>
        <BsSearch size="1rem" />
      </SubmitButton>
    </Form>
  );
}
export default SearchBar;
