# is-defined-type
Checks if a variable in a nested object is defined and optionally also check it's type. 

This is especially useful for validating API responses which contain many nested objects. For example, if you expect a response like this:
```js
var res = {
    first: {
        second: {
            third: "target"
        } 
    }
}
```
You could get "target" by using: 
```js
var val = res.first.second.third;
```
But if first, second or third is undefined or not an object you get an exception. So you can do some verbose checks:
```js
var val = res && res.first && res.first.second && typeof res.first.second.third !== 'undefined' 
    ? res.first.second.third
    : null;
```
Or just use isDefinedType:
```js
var val = isDefinedType(res,'first.second.third')
  ? res.first.second.third
  : null;
```
You can even make sure it is a string:
```js
var val = isDefinedType(res,'first.second.third', 'string')
  ? res.first.second.third
  : null;
```
Pass along 'value' with the types to check and the value of the checked variable will be returned if it is defined and matches a given type
```js
var val = isDefinedType(res,'first.second.third', ['string', 'value']) || null; 
// val === 'target'
```
Or specify a default value to be returned if the value is not defined
```js
var val = isDefinedType(res,'first.second.third', 'string', 'Default'); 
// val === 'target'
var val2 = isDefinedType(res,'first.second.third.undefined', 'string', 'Default'); 
// val2 === 'Default'
```
## Usage
```js
isDefinedType(input, path, type, defaultValue);
```
* input: Object to check
* path: Optional path to key in input to check. Can be a string of keys with a dot between each level inside the object 'res.user.name' or an array of strings: ['res','user','name']. If any of the keys before the last one does not point to an object the function will return false.
* type: Optional type which the last key in the path must match if it is not undefined. This must provided as single lowercase string or an array of lowercase strings if multiple types are valid. Possible values are: string | object | array | number | null. Null and array are treated as a special cases and will not match object. If 'value' is in type the function result will contain the checked variable if it is defined and matches a given type.
* defaultValue: Optional default value which will be returned if path is not defined or does not match type. When defaultValue is not undefined will return value when path is defined and matches type

## Installation
### Browser
```html
<script type="text/javascript" src="https://unpkg.com/is-defined-type">
```
### Node.js
```bash
npm install is-defined-type --save
```
```js
const isDefinedType = require('is-defined-type');
```
## Examples
```js
var data = {
    user: {
        name: 'Alice',
        email: null,
        credentials: {
            username: 'alice123',
            password: 'secret'
        },
        age: 10,
        aliases: [
            'foo',
            'bar'
        ]
    }
}

// Not nested
isDefinedType(data); // true
isDefinedType(undefined); // false

// Not nested with type check
isDefinedType(data, null, 'object'); // true
isDefinedType(data, null, 'string'); // false

// Nested
isDefinedType(data, 'user'); // true
isDefinedType(data, 'notUser'); // false

// Deeply nested
isDefinedType(data, 'user.name'); // true
isDefinedType(data, ['user','name']); // true
isDefinedType(data, 'user.credentials.username'); // true
isDefinedType(data, ['user','credentials','username']); // true
isDefinedType(data, 'user.unknown.username'); // false
isDefinedType(data, ['user','credentials','unknown']); // false

// Deeply nested with type check
isDefinedType(data, 'user.aliases', 'array'); // true
isDefinedType(data, 'user.age', ['number','null']); // true
isDefinedType(data, 'user.email','null'); // true
isDefinedType(data, 'user.email','object'); // false
isDefinedType(data, 'unknown.email','null'); // false

// Return default value
isDefinedType(data, 'user.name', 'string', 'Bob'); // Alice
isDefinedType(data, 'user.name', 'number', 'Bob'); // Bob
```
