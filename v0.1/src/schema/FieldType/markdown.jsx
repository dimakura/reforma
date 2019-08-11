import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function formatBool(value) {
  return (
    <ReactMarkdown
      source={value}
    />
  )
}
