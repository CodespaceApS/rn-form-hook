# rn-form-hook

rn-form-hook is a react native style library to speed up the development.

## Installation

Install with npm
```bash
npm install rn-form-hook
```

Install with yarn
```bash
yarn add rn-form-hook
```


## Usage
Creating inputs

All inputs most be forwardRef, with useImperativeHandle and provide the getValue and setValue.
#### TextInput:
```
import React from 'react'
import { View, Text, Input } from '../ui'

export default React.forwardRef(({ onRef, ...rest }, ref) => {
  const [value, setValue] = React.useState()
  React.useImperativeHandle(ref,
    () => ({
      getValue: () => value,
      setValue: (x) => setValue(x),
    }), [value]
  )
  return (<Input value={value} onChangeText={setValue} />)
})
```
#### Toggle:
```
import React from 'react'
import { View,  Touch } from '../ui'

export default React.forwardRef(({ onRef, ...rest }, ref) => {
  const [value, setValue] = React.useState(false)
  React.useImperativeHandle(ref,
    () => ({
      getValue: () => value,
      setValue: (x) => setValue(x),
    }), [value]
  )
  return (
    <Touch onPress={_ => setValue(x => !x)} >
      <View h={50} w={50} bg={value ? 'green' : 'red'} >

      </View>
    </Touch>
  )
})
```

### Using inputs

Full example
```
import React from 'react'
import { Input, Toggle } from '../components'
import {View,Text, Touch} from '../ui'

import useForm from 'rn-form-hook'

export default () => {
  const form = useForm()
  const [val, setVal] = React.useState('no val')
  const onTouch = async () => {
    setVal(JSON.stringify(await form.values()))
  }
  React.useEffect(() => {
    form.set({
      name: 'peter'
    })
  }, [])
  return (
  <View>
    <Input ref={form.add('name')} />
    <Toggle ref={form.add('toggle')} />

    <Touch bg="blue" pt pb w={150} centerCenter onPress={onTouch}>
      <Text color="white" >Click this</Text>
    </Touch>

    <Text>{val}</Text>
  </View>
  )
}
```

Init hook
```
const form = useForm()
```
Connect Inputs
```
<Input ref={form.add('name')} />
```
Get values, form.values is async.
```
const values = await form.values()
```
```
form.values()
  .then(values => {

  })
```
Preset a form.
```
React.useEffect(() => {
  form.set({
    name: 'Peter'
  })
}, [])
```


## Contributing
Fell free to add a pull request to add more prestyle props.

[read all the style props here.](https://github.com/CodespaceApS/rn-inline-style/blob/master/styles.js)

## License
[MIT](https://choosealicense.com/licenses/mit/)