const Person = ({ person, removePerson }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p>
        {person.name} {person.number}
      </p>
      <button
        style={{ height: '20px', marginLeft: '10px', cursor: 'pointer' }}
        onClick={() => removePerson(person.id, person.name)}
      >
        delete
      </button>
    </div>
  );
};
export default Person;
