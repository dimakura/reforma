import React from 'react'

function randomNumber(from, to) {
  return from + Math.floor((to - from + 1) * Math.random())
}

function randomLengthString() {
  let text = ''
  const length = randomNumber(3, 20)
  for (let i = 0; i < length; i++) {
    text += 'x'
  }

  return text
}

class RandomSkeleton extends React.PureComponent {
  render() {
    return (
      <span className="bp3-skeleton">{randomLengthString()}</span>
    )
  }
}

export default RandomSkeleton
