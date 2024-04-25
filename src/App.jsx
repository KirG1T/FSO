import { useState, useEffect } from 'react';
import personService from './services/persons';
import Person from './components/Person';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchPerson, setSearchPerson] = useState('');
  const [showMessage, setShowMessage] = useState('');
  const [showError, setError] = useState(false);
  const [messageTimer, setMessageTimer] = useState(null);

  const filteredPersons = persons.filter(
    (person) => person.name.toLowerCase().indexOf(searchPerson.toLowerCase()) > -1,
  );

  const handlePersons = (data) => {
    setPersons(data);
  };

  const handleSearchPerson = (data) => {
    setSearchPerson(data);
  };

  const handleShowMessage = (text) => {
    setShowMessage(text);
  };

  const handleError = () => {
    setError(!showError);
  };

  const removePerson = (id, name) => {
    if (confirm(`Delete ${name}`)) {
      personService
        .remove(id)
        .then((personData) => {
          setPersons(filteredPersons.filter((person) => person.id !== personData.id));
        })
        .catch((e) => {
          console.log(e);
          handleError();
          setShowMessage(`'${name}' has already been removed from server`);

          clearTimeout(messageTimer);
          setMessageTimer(
            setTimeout(() => {
              setShowMessage('');
            }, 5000),
          );
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
      <h1>Phonebook</h1>
      <Notification message={showMessage} isError={showError} />
      <Filter searchPerson={searchPerson} handleSearchPerson={handleSearchPerson} />
      <h2>add a new </h2>
      <PersonForm
        persons={filteredPersons}
        handlePersons={handlePersons}
        handleMessage={handleShowMessage}
        handleError={handleError}
      />
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} removePerson={removePerson} />
      ))}
    </div>
  );
};

export default App;
