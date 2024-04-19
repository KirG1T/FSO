const Filter = ({ searchPerson, setSearchPerson }) => {
  const handleSearchChange = (e) => {
    setSearchPerson(e.target.value);
  };
  return (
    <div>
      filter shown with: <input type='search' onChange={handleSearchChange} value={searchPerson} />
    </div>
  );
};
export default Filter;
