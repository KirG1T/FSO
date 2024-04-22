import { useState, useEffect } from 'react';
import axios from 'axios';
import Person from './components/Person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchPerson, setSearchPerson] = useState('');

  const filteredPersons = persons.filter(
    (person) => person.name.toLowerCase().indexOf(searchPerson.toLowerCase()) > -1,
  );

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log(response);
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} setSearchPerson={setSearchPerson} />
      <h2>add a new </h2>
      <PersonForm persons={filteredPersons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
