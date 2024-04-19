import { useState } from 'react';
import Person from './components/Person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [searchPerson, setSearchPerson] = useState('');

  const filteredPersons = persons.filter(
    (person) => person.name.toLowerCase().indexOf(searchPerson.toLowerCase()) > -1,
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} setSearchPerson={setSearchPerson} />
      <h2>add a new </h2>
      <PersonForm persons={filteredPersons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
