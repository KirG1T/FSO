const Filter = ({ searchPerson, handleSearchPerson }) => {
  const handleSearchChange = (e) => {
    handleSearchPerson(e.target.value);
  };
  return (
    <div>
      filter shown with: <input type='search' onChange={handleSearchChange} value={searchPerson} />
    </div>
  );
};
export default Filter;
