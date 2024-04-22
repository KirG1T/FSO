import { useState } from 'react';
import personService from '../services/persons';

const PersonForm = ({ persons, handlePersons }) => {
  console.log(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const checkPerson = persons.find((person) => newName === person.name);
    if (checkPerson) {
      alert(`${newName} is already added to phonebook`);
    } else {
      handlePersons([...persons, { name: newName, number: newNumber, id: Math.random() * 0.1 }]);
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((personData) => {
      handlePersons(persons.concat(personData));
      setNewName('');
      setNewNumber('');
    });
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};
export default PersonForm;
