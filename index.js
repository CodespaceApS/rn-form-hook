import React, { useState, useEffect } from 'react'

export default () => {
  const refs = {}
  return {
    refs,
    add: (name) => {
      refs[name] = React.createRef()
      return refs[name]
    },
    values: async () => Object.keys(refs).
      reduce(async (accP, x) => ({
        ...await accP,
        [x]: refs[x] && refs[x].current && await refs[x].current.getValue(),
      }), Promise.resolve({})),
    set: (obj) => {
      Object.keys(obj).forEach((key) => {
        if (key === 'residentId') console.log('resident 1')
        if (refs[key]) {
          refs[key].current.setValue(obj[key])
        }
      })
    },
  }
}