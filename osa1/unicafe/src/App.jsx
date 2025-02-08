import { useState } from 'react'

const Header = ({ text }) => (
  <h1>
    {text}
  </h1>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Label = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />

      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <Header text="statistics" />

      <Label text="good" value={good} />
      <Label text="neutral" value={neutral} />
      <Label text="bad" value={bad} />
      <Label text="all" value={good + neutral + bad} />
      <Label text="average" value={((good - bad) / (good + neutral + bad)) || 0} />
      <Label text="positive" value={(((good / (good + neutral + bad)) * 100) || 0) + ' %'} />
    </div>
  )
}

export default App
