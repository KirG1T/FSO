import { useState, useEffect } from 'react';
import personService from './services/persons';
import Person from './components/Person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchPerson, setSearchPerson] = useState('');

  const filteredPersons = persons.filter(
    (person) => person.name.toLowerCase().indexOf(searchPerson.toLowerCase()) > -1,
  );

  const handlePersons = (data) => {
    setPersons(data);
  };

  const handleSearchPerson = (data) => {
    setSearchPerson(data);
  };

  const removePerson = (id, name) => {
    if (confirm(`Delete ${name}`)) {
      personService.remove(id).then((personData) => {
        setPersons(filteredPersons.filter((person) => person.id !== personData.id));
      });
    }
  };

  useEffect(() => {
    personService
      .getAll()
      .then((personData) => {
        setPersons(personData);
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} handleSearchPerson={handleSearchPerson} />
      <h2>add a new </h2>
      <PersonForm persons={filteredPersons} handlePersons={handlePersons} />
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} removePerson={removePerson} />
      ))}
    </div>
  );
};

export default App;
