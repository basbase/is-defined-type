var isDefinedType = require('../is-defined-type');
var test          = require('tape');

test(function (t) {
    var data = {
        user: {
            name:        'Alice',
            email:       null,
            active:      true,
            deleted:     false,
            credentials: {
                username: 'alice123',
                password: 'secret'
            },
            age:         25,
            aliases:     [
                'foo',
                'bar'
            ]
        }
    };

    // Not nested
    t.ok(isDefinedType(data)); // true
    t.ok(isDefinedType(true)); // true
    t.notOk(isDefinedType(undefined)); // false

    // Not nested with type check
    t.ok(isDefinedType(data, null, 'object')); // true
    t.notOk(isDefinedType(data, null, 'string')); // false

    // Type check: number
    t.ok(isDefinedType(1, null, 'number'));
    t.ok(isDefinedType(1.1, null, 'number'));
    t.notOk(isDefinedType({}, null, 'number'));
    t.notOk(isDefinedType('1', null, 'number'));
    t.notOk(isDefinedType('1.1', null, 'number'));
    t.notOk(isDefinedType(true, null, 'number'));
    t.notOk(isDefinedType(false, null, 'number'));
    t.notOk(isDefinedType('abc', null, 'number'));
    t.notOk(isDefinedType([], null, 'number'));
    t.notOk(isDefinedType(null, null, 'number'));
    t.notOk(isDefinedType(undefined, null, 'number'));

    // Type check: string
    t.notOk(isDefinedType(1, null, 'string'));
    t.notOk(isDefinedType(1.1, null, 'string'));
    t.notOk(isDefinedType({}, null, 'string'));
    t.ok(isDefinedType('1', null, 'string'));
    t.ok(isDefinedType('1.1', null, 'string'));
    t.notOk(isDefinedType(true, null, 'string'));
    t.notOk(isDefinedType(false, null, 'string'));
    t.ok(isDefinedType('abc', null, 'string'));
    t.notOk(isDefinedType([], null, 'string'));
    t.notOk(isDefinedType(null, null, 'string'));
    t.notOk(isDefinedType(undefined, null, 'string'));

    // Type check: array
    t.notOk(isDefinedType(1, null, 'array'));
    t.notOk(isDefinedType(1.1, null, 'array'));
    t.notOk(isDefinedType({}, null, 'array'));
    t.notOk(isDefinedType('1', null, 'array'));
    t.notOk(isDefinedType('1.1', null, 'array'));
    t.notOk(isDefinedType(true, null, 'array'));
    t.notOk(isDefinedType(false, null, 'array'));
    t.notOk(isDefinedType('abc', null, 'array'));
    t.ok(isDefinedType([], null, 'array'));
    t.notOk(isDefinedType(null, null, 'array'));
    t.notOk(isDefinedType(undefined, null, 'array'));

    // Type check: boolean
    t.notOk(isDefinedType(1, null, 'boolean'));
    t.notOk(isDefinedType(1.1, null, 'boolean'));
    t.notOk(isDefinedType({}, null, 'boolean'));
    t.notOk(isDefinedType('1', null, 'boolean'));
    t.notOk(isDefinedType('1.1', null, 'boolean'));
    t.ok(isDefinedType(true, null, 'boolean'));
    t.ok(isDefinedType(false, null, 'boolean'));
    t.notOk(isDefinedType('abc', null, 'boolean'));
    t.notOk(isDefinedType([], null, 'boolean'));
    t.notOk(isDefinedType(null, null, 'boolean'));
    t.notOk(isDefinedType(undefined, null, 'boolean'));

    // Type check: object
    t.notOk(isDefinedType(1, null, 'object'));
    t.notOk(isDefinedType(1.1, null, 'object'));
    t.ok(isDefinedType({}, null, 'object'));
    t.notOk(isDefinedType('1', null, 'object'));
    t.notOk(isDefinedType('1.1', null, 'object'));
    t.notOk(isDefinedType(true, null, 'object'));
    t.notOk(isDefinedType(false, null, 'object'));
    t.notOk(isDefinedType('abc', null, 'object'));
    t.notOk(isDefinedType([], null, 'object'));
    t.notOk(isDefinedType(null, null, 'object'));
    t.notOk(isDefinedType(undefined, null, 'object'));

    // Type check: null
    t.notOk(isDefinedType(1, null, 'null'));
    t.notOk(isDefinedType(1.1, null, 'null'));
    t.notOk(isDefinedType({}, null, 'null'));
    t.notOk(isDefinedType('1', null, 'null'));
    t.notOk(isDefinedType('1.1', null, 'null'));
    t.notOk(isDefinedType(true, null, 'null'));
    t.notOk(isDefinedType(false, null, 'null'));
    t.notOk(isDefinedType('abc', null, 'null'));
    t.notOk(isDefinedType([], null, 'null'));
    t.ok(isDefinedType(null, null, 'null'));
    t.notOk(isDefinedType(undefined, null, 'null'));

    // Nested
    t.ok(isDefinedType(data, 'user'));
    t.notOk(isDefinedType(data, 'notUser'));

    // Deeply nested
    t.notOk(isDefinedType(undefined, 'user.deleted.foo'));
    t.notOk(isDefinedType(data, 'user.deleted.foo'));
    t.notOk(isDefinedType(data, 'user.age.foo'));
    t.notOk(isDefinedType(data, 'user.email.foo'));
    t.ok(isDefinedType(data, 'user.name'));
    t.ok(isDefinedType(data, ['user', 'name']));
    t.ok(isDefinedType(data, 'user.credentials.username'));
    t.ok(isDefinedType(data, ['user', 'credentials', 'username']));
    t.notOk(isDefinedType(data, 'user.unknown.username'));
    t.notOk(isDefinedType(data, ['user', 'credentials', 'unknown']));

    // Deeply nested with type check
    t.ok(isDefinedType(data, 'user.aliases', 'array'));
    t.ok(isDefinedType(data, 'user.age', ['number', 'null']));
    t.ok(isDefinedType(data, 'user.email', 'null'));
    t.notOk(isDefinedType(data, 'user.email', 'object'));
    t.notOk(isDefinedType(data, 'unknown.email', 'null'));

    // Return value of checked variable
    t.equal(isDefinedType(data, 'user.name','value'), 'Alice');
    t.equal(isDefinedType(data, 'user.name',['string','value']), 'Alice');
    t.equal(isDefinedType(1, null, ['value']), 1);
    t.equal(isDefinedType(1, null, ['number','value']), 1);
    t.equal(isDefinedType(null, null, ['null','value']), null);

    // Return defaultValue
    t.equal(isDefinedType(data, 'user.name','value',undefined), 'Alice');
    t.equal(isDefinedType(data, 'user.name',false,undefined), true);
    t.equal(isDefinedType(data, 'user.name',false,'Bob'), 'Alice');
    t.equal(isDefinedType(data, 'user.name','string','Bob'), 'Alice');
    t.equal(isDefinedType(data, 'user.name','number','Bob'), 'Bob');
    t.equal(isDefinedType(data, 'user.name','number','Bob'), 'Bob');

    t.end();

});
