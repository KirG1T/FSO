import { useState } from 'react';
import personService from '../services/persons';

const PersonForm = ({ persons, handlePersons, handleMessage, handleError }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [messageTimer, setMessageTimer] = useState(null);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();

    const checkPerson = persons.find((person) => newName.trim() === person.name);

    if (checkPerson) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const newData = { ...checkPerson, number: newNumber };
        personService
          .update(checkPerson.id, newData)
          .then((personData) => {
            handlePersons(persons.map((person) => (person.id !== checkPerson.id ? person : personData)));
            handleMessage(`${personData.name} number has changed`);
            setNewName('');
            setNewNumber('');

            clearTimeout(messageTimer);
            setMessageTimer(
              setTimeout(() => {
                handleMessage('');
              }, 3000),
            );
          })
          .catch((e) => {
            console.log(e);
            handleError();
            handleMessage(`Information of '${checkPerson.name}' has already been removed from server`);
            setNewName('');
            setNewNumber('');

            clearTimeout(messageTimer);
            setMessageTimer(
              setTimeout(() => {
                handleMessage('');
              }, 5000),
            );
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject).then((personData) => {
        handlePersons(persons.concat(personData));
        handleMessage(`Added ${personData.name}`);
        setNewName('');
        setNewNumber('');

        clearTimeout(messageTimer);
        setMessageTimer(
          setTimeout(() => {
            handleMessage('');
          }, 3000),
        );
      });
    }
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
