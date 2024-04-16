import { useState } from 'react';

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {text === 'average' || text === 'positive' ? value.toFixed(1) : value} {text === 'positive' ? '%' : ''}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  const average = (good + bad + neutral) / 3;
  const positive = (good / (good + bad + neutral)) * 100 || 0;
  console.log('render');
  return (
    <section>
      <h2>statistics</h2>

      {all ? (
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positive} />
          </tbody>
        </table>
      ) : (
        <div>No feedback given</div>
      )}
    </section>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <section>
        <h2>give feedback</h2>
        <button onClick={() => setGood((prev) => prev + 1)}>good</button>
        <button onClick={() => setNeutral((prev) => prev + 1)}>neutral</button>
        <button onClick={() => setBad((prev) => prev + 1)}>bad</button>
      </section>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
