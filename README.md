# Mongez Validator

A Data Validation System For Nodejs And Browser.

## Why?

Basically, this package provides a simple way to validate values regardless where it comes from, you pass the value, value props and validation rules and that's it.

## Installation

`yarn add @mongez/validator`

Or

`npm i @mongez/validator`

## Table of contents

- [Mongez Validator](#mongez-validator)
  - [Why?](#why)
  - [Installation](#installation)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
  - [validate function](#validate-function)
  - [Validation fails](#validation-fails)
  - [More validation rules](#more-validation-rules)
    - [Required Rule](#required-rule)
    - [Email Rule](#email-rule)
    - [Url Rule](#url-rule)
    - [Min Value Rule](#min-value-rule)
    - [Max Value Rule](#max-value-rule)
    - [Min Length Rule](#min-length-rule)
    - [Length Rule](#length-rule)
    - [Max Length Rule](#max-length-rule)
    - [Pattern Rule](#pattern-rule)
    - [Match Element Rule](#match-element-rule)
  - [Entire rules list](#entire-rules-list)
  - [Rules Ordering](#rules-ordering)
  - [Validation messages](#validation-messages)
  - [Overriding error messages](#overriding-error-messages)
  - [Multiple Errors per one validation](#multiple-errors-per-one-validation)
  - [Validation results](#validation-results)
  - [More shortcuts](#more-shortcuts)
  - [Validator Events](#validator-events)
  - [Resetting Validator](#resetting-validator)
  - [Destroying Validator](#destroying-validator)
  - [TODO](#todo)

## Usage

Let's see an example then illustrate what's happening here.

```ts
import { Validator, requiredRule } from '@mongez/validator';

const myValue = 'welcome';

const props = {
    required: true,
};

const rules = [requiredRule];

const validator = new Validator(myValue, props, rules);

validator.validate();

if (validator.passes()) {
    // do something, in this case it will pass as `myValue` has a value
}
```

Now let's take it piece by piece.

We import our `Validator` class that will validate our value.

Then we declared a dummy constant `myValue` for demonstration only.

After that we instantiated a new object of our `Validator` class, the constructor receives three arguments:

1. `value`: The value that will be validated.
2. `props`: The properties of that must be matched with the given value.
3. `rules`: An array of rules that go through the value and validate it against the provided props.
4. `errorMessagesOverrides`: optional, to declare the error message for each invalid rule, we'll go with it later.

Next, we called the `validate` method to run the rules against the given value.

Finally we check whether the given value is valid using `passes` method.

And that's it.

You may also set value, props and rules after creating new object.

```ts
import { Validator, requiredRule } from '@mongez/validator';

const myValue = 'welcome';

const props = {
    required: true,
};

const rules = [requiredRule];

const validator = new Validator();

validator.setValue(myValue).setProps(props).setRules(rules);

validator.validate();

if (validator.passes()) {
    // do something, in this case it will pass as `myValue` has a value
}
```

## validate function

Another way to use validator by using `validate` function directly.

```ts
import { validate, requiredRule } from '@mongez/validator';

const myValue = 'welcome';

const props = {
    required: true,
};

const rules = [RequiredValue];

const validator = validate(myValue, props, rules);

if (validator.passes()) {
    //
}
```

The function basically shortcuts the `validate()` method step, so it instantiate the validator object and directly call `validate` method.

## Validation fails

Our previous examples will always provide a valid check that `passes()` returns true, let's see an example with validation error.

```ts
import { validate, requiredRule } from '@mongez/validator';

const emptyValue = '';

const props = {
    required: true,
};

const rules = [requiredRule];

const validator = validate(emptyValue, props, rules);

if (validator.fails()) {
    //
    const error = validator.getError();

    console.log(error.errorMessage); // validation.required    
}
```

So `fails` method will tells you that validation has failed, to get more information about the validation error, `getError` will provide you with more details about the error.

`getError` returns an object of `RuleResponse`, an object for information about validation error.

```ts
type RuleResponse = {
  /**
   * Determine if the rule will trigger an error
   */
  hasError: boolean;
  /**
   * Set the error message that will be triggered if rule has any error
   */
  errorMessage: string;
  /**
   * The error type of the input, i.e minLength, required, email...
   */
  errorType: string;
}
```

In our last example, `error.errorMessage` returned `validation.required`, the question here is, why?

Well, basically the validation package depends on [Mongez Localization](https://github.com/hassanzohdy/mongez-localization) Using `trans` method.

So if you've appended `validation.required` key in translation list of `Mongez Localization` then, the translated error message will be returned instead.

## More validation rules

The package is shipped with about **10** most commonly used rules that you might need.

Let's see it one by one

### Required Rule

The `requiredRule` validates the given value that must not be **empty**.

- Required Prop: `required`
- Requires a value to validate: `false`
- Evaluate : value is empty `string` | `array` | `object` | `null` `undefined`
- Error Type: `required`
- Error Message: `validation.required`

Let's understand the previous criteria list to understand how rules work.

1. `Required Prop`: means the `required` prop must be in the `props` to make this rule starts.
2. `Requires a value to validate`: means whether the rule needs to be a non empty value to start or not, in the `required` rule it will be false, most of the other rules will be set to `true` so the rule won't work unless there is a value.
3. `Evaluate`: the rule evaluation criteria and how it evaluates the value, which tells you when the rule will **fail**.
4. `Error Type`: the `errorType` value in `RuleResponse` object.
5. `Error Message`: the `errorMessage` value in `RuleResponse` object, all rules shipped with Mongez Validator depends on `trans` function, so in the `required` rule `validation.required` will be translated if it has a matching translation string.

### Email Rule

The `emailRule` validates the given value to be **valid email** pattern.

- Required Prop: `email`
- Requires a value to validate: `true`
- Evaluate: value is not a valid email address
- Error Type: `email`
- Error Message: `validation.invalidEmailAddress`

An example of usage

```ts
import { validate, emailRule } from '@mongez/validator';

const value = 'some-invalid-mail';

const props = {
    email: true,
};

const rules = [emailRule];

console.log(validate(value, props, rules).fails()); // true

console.log(validate('hassanzohdy@gmail.com', props, rules).passes()); // true
```

### Url Rule

The `urlRule` validates the given value to be a **valid url** pattern.

- Required Prop: `url`
- Requires a value to validate: `true`
- Evaluate: value is a valid URL pattern.
- Error Type: `url`
- Error Message: `validation.url`

An example of usage

```ts
import { validate, urlRule } from '@mongez/validator';

const value = 'some-invalid-mail';

const props = {
    url: true,
};

const rules = [urlRule];

console.log(validate(value, props, rules).fails()); // true
console.log(validate('google.com', props, rules).passes()); // true
console.log(validate('https://google.com', props, rules).passes()); // true
console.log(validate('http://google.com', props, rules).passes()); // true
console.log(validate('https://www.google.com', props, rules).passes()); // true
console.log(validate('http://www.google.com', props, rules).passes()); // true
```

### Min Value Rule

The `minValue` validates the given value is equal to or more than the given `min` prop.

- Required Prop: `min`
- Requires a value to validate: `true`
- Evaluate: value is equal to or more than `min` prop.
- Error Type: `min`
- Error Message: `validation.min`

An example of usage

```ts
import { validate, minRule } from '@mongez/validator';

const value = 5;

const props = {
    min: 6,
};

const rules = [minRule];

console.log(validate(value, props, rules).fails()); // true
console.log(validate(6, props, rules).passes()); // true
console.log(validate(7, props, rules).passes()); // true
console.log(validate('6', props, rules).passes()); // true
console.log(validate('7', props, rules).passes()); // true
```

Please note that this rule validates numbers and strings as well as it cast the given value using `Number()` cast function.

### Max Value Rule

The `maxRule` validates the given value is **equal** to or **less** than the given `max` prop.

- Required Prop: `max`
- Requires a value to validate: `true`
- Evaluate: value is equal to or less than `max` prop.
- Error Type: `max`
- Error Message: `validation.max`

An example of usage

```ts
import { validate, maxRule } from '@mongez/validator';

const value = 7;

const props = {
    max: 6,
};

const rules = [maxRule];

console.log(validate(value, props, rules).fails()); // true
console.log(validate(6, props, rules).passes()); // true
console.log(validate(5, props, rules).passes()); // true
console.log(validate('6', props, rules).passes()); // true
console.log(validate('5', props, rules).passes()); // true
```

> Please note that this rule validates numbers and strings as well as it cast the given value using `Number()` cast function.

### Min Length Rule

The `minLengthRule` validates the given value  length is equal to or more than the given `minLength` prop.

- Required Prop: `minLength`
- Requires a value to validate: `true`
- Evaluate: Value is string and its length is equal to or more than `minLength` prop
- Error Type: `minLength`
- Error Message: `validation.minLength`

An example of usage

```ts
import { validate, minLengthRule } from '@mongez/validator';

const value = 'hello';

const props = {
    minLength: 4,
};

const rules = [minLengthRule];

console.log(validate(value, props, rules).passes()); // true
console.log(validate('tour', props, rules).passes()); // true
console.log(validate('two', props, rules).passes()); // false
```

### Length Rule

The `lengthRule` validates the given value  length is equal to the given `length` prop.

- Required Prop: `length`
- Requires a value to validate: `true`
- Evaluate: Value is string and its length is equal to `length` prop.
- Error Type: `length`
- Error Message: `validation.length`

An example of usage

```ts
import { validate, lengthRule } from '@mongez/validator';

const value = 'hello';

const props = {
    length: 4,
};

const rules = [lengthRule];

console.log(validate(value, props, rules).passes()); // false
console.log(validate('tour', props, rules).passes()); // true
console.log(validate('two', props, rules).passes()); // false
```

### Max Length Rule

The `maxLengthRule` validates the given value  length is equal to or less than the given `maxLength` prop.

- Required Prop: `maxLength`
- Requires a value to validate: `true`
- Evaluate: Value is string and its length is equal to or less than `maxLength` prop
- Error Type: `maxLength`
- Error Message: `validation.maxLength`

An example of usage

```ts
import { validate, maxLengthRule } from '@mongez/validator';

const value = 'hello';

const props = {
    maxLength: 4,
};

const rules = [maxLengthRule];

console.log(validate(value, props, rules).passes()); // false
console.log(validate('tour', props, rules).passes()); // true
console.log(validate('two', props, rules).passes()); // true
```

### Pattern Rule

The `patternRule` validates the given value pattern against the given `pattern` prop.

- Required Prop: `pattern`
- Requires a value to validate: `true`
- Evaluate: Value is string and its length is equal to or less than `pattern` prop
- Error Type: `pattern`
- Error Message: `validation.pattern`, you may also set `patternError` prop instead.

An example of usage

```ts
import { validate, patternRule } from '@mongez/validator';

const value = "01140144893";

const props = {
  pattern: /^01\d{9}$/
};

const rules = [patternRule];

console.log(validate(value, props, rules).passes()); // true
console.log(validate("0122555598", props, rules).passes()); // false
console.log(validate("something", props, rules).passes()); // false // errorMessage: This field is not matching the pattern
```

To set the error pattern, add `patternError` prop

```ts
import { validate, patternRule } from '@mongez/validator';

const value = "01140144893";

const props = {
  pattern: /^01\d{9}$/,
  patternError: 'Mobile Number must start with 01 followed by 9 digits,'
};

const rules = [patternRule];

console.log(validate(value, props, rules).passes()); // true
console.log(validate("0122555598", props, rules).passes()); // false
console.log(validate("something", props, rules).passes()); // false // errorMessage: Mobile Number must start with 01 followed by 9 digits,
```

### Match Element Rule

The `matchElementRule` validates the given value pattern against the value of another dom element using given `match` prop which holds `id` of the other element.

- Required Prop: `matchElement`
- Requires a value to validate: `true`
- Evaluate: Value is checked against the value of another dom element.
- Error Type: `matchElement`
- Error Message: `validation.matchElement`.

An example of usage

```ts
import { validate, matchElementRule } from '@mongez/validator';

const value = "123456789";

const props = {
  matchElement: 'password', // id of password input
};

const rules = [matchElementRule];

console.log(validate(value, props, rules).passes()); // true

// if not matched then the error message will be `This field is not matched with password`
```

> Please note that the `matchElement` prop contains the id of the other element to be matched with, the other element is expected to be `HTMLInputElement` element.

To change the matching element name, pass `matchText` to the props list, this is also auto translated using `trans`

```ts
import { validate, matchElementRule } from '@mongez/validator';

const value = "123456789";

const props = {
  matchElement: 'id_password', // id of password input
  matchText: 'Password',
};

const rules = [matchElementRule];

console.log(validate(value, props, rules).passes()); // true

// if not matched then the error message will be `This field is not matched with Password`
```

## Entire rules list

You may also get all rules list in one array by importing `rulesList`

```ts
import { rulesList } from '@mongez/validator';

// rulesList contains all available rules in the package.
```

## Rules Ordering

Please note that rules are operated in the order they are inserted in the rules are, so if the `minLengthRule` is set before `maxLengthRule` then it will be evaluated according to that order.

```ts

import { validate, minLengthRule, maxLengthRule } from '@mongez/validator';

const value = 'hello';

const props = {
    minLength: 4,
};

const rules = [minLengthRule, maxLengthRule];

validate(value, props, rules);

// is not the same as

const rules2 = [maxLengthRule, minLengthRule];

validate(value, props, rules);
```

## Validation messages

Mongez Validator is shipped with two locales of translations `en` for English Messages and `ar` for Arabic Messages.

Just import the translation list you need and add it to `Mongez localization`.

```ts
import { extend } from '@mongez/localization';
import { enTranslation } from '@mongez/validator';

extend('en', enTranslation);
```

Now translation messages will be returned directly, here is the current translation messages for English language.

```ts
const translation = {
  validation: {
    required: "This field is required",
    invalidEmailAddress: "Invalid Email Address",
    url: "Invalid Url Address",
    min: "Value can not be lower than %d",
    max: "Value can not be higher than %d",
    match: "This field is not matched with %s",
    length: "This field length must be %d characters",
    minLength: "This field should have at least %d characters",
    maxLength: "This field should have can not be more than %d characters",
    pattern: "This field is not matching the pattern",
  },
}
```

## Overriding error messages

As we mentioned earlier in this document, you may set the error messages that overrides the default error messages, by passing it as 4rth argument in `Validator` class or `validate` function by using `setMessagesOverrides` method.

`setMessagesOverrides(object: {errorType: errorMessage }): Validator`

```ts
import { Validator, minLengthRule, patternRule } from '@mongez/validator';

const value = "AS";

const props = {
    minLength: 3,
    pattern: /^[a-z]+$/,
};

const rules = [minLengthRule, patternRule];

const validator = new Validator(value, props, rules);

validator.setMessagesOverrides({
    minLength: 'Length must be at least 3 characters.',
    pattern: 'Value must be written in lower case.',
});

validator.validate();

console.log(validator.getErrorMessage()); // Length must be at least 3 characters.
```

## Multiple Errors per one validation

By default, Validator stops the loop over the passes rules for the first rule that returns Invalid evaluation, you may tell `Validator` to continue validating through all passed rules and return list of `RuleResponse[]` using `setErrorReturnMode`.

`setErrorReturnMode('all' | 'first'): Validator`

Default value: `first`.

> Please Note that this method can not be used with `validate` utility.

```ts
import { Validator, minLengthRule, patternRule } from '@mongez/validator';

const value = "AS";

const props = {
    minLength: 3,
    pattern: /^[a-z]+$/,
    patternError: 'Value must be written in lower case.',
};

const rules = [minLengthRule, patternRule];

const validator = new Validator(value, props, rules);

validator.setErrorReturnMode('all').validate();

console.log(validator.getErrors()); // returns an array of RuleResponse
```

## Validation results

Another good feature is to list the entire validation results for all rules, the `getValidationResults` method returns an array that contains all rules responses wether there are errors or not.

```ts
import { validate, minLengthRule, maxLengthRule } from '@mongez/validator';

const value = "welcome";

const props = {
    minLength: 3,
    maxLength: 5,
};

const rules = [minLengthRule, maxLengthRule];

const validator = validate(value, props, rules);

console.log(validator.getValidationResults()); // returns an array of RuleResponse[]
```

Output:

```json
[
  {
    "errorType": "minLength",
    "hasError": false,
    "errorMessage": "validation.minLength"
  },
  {
    "errorType": "maxLength",
    "hasError": true,
    "errorMessage": "validation.maxLength"
  }
]
```

## More shortcuts

You may also use other methods directly to get a value instead of returning an entire `RuleResponse` for example, such as:

- `Validator.getErrorMessage(): string` Get the error message of first invalid rule directly if error mode is set to `first`.
- `Validator.getErrorType(): string` Get the error type of first invalid rule directly if error mode is set to `first`.
- `Validator.getErrorsList(): object` Get list of errors as an object `{errorType: errorMessage}` if error mode is set to `all`.

## Validator Events

Each instance of `Validator` trigger punch of events during the validation process, which are:

- `validating`: Triggered before validation starts.
- `pass`: Triggered when all validation rules **pass**.
- `fail`: Triggered when any of validation rules **fail**.
- `done`: Triggered after validation ends wether succeeded or failed.

Example of usage.

```ts
import { Validator, minLengthRule, maxLengthRule } from '@mongez/validator';

const value = "welcome";

const props = {
    minLength: 3,
    maxLength: 5,
};

const rules = [minLengthRule, maxLengthRule];

const validator = new Validator(value, props, rules);

validator.on('pass', validator => {
    // everything is valid :)
}).on('fail', validator => {
    // validation didn't go as expected
}).on('done', validator => {
    // validation has just ended
});
```

> Please note that `done` event is triggered before `pass` and `fail` events.

## Resetting Validator

You may reuse one validator later, but you'd probably need to reset it before using it again using `reset` method.

## Destroying Validator

As a final method, you can destroy the validator as it resets validator values and clears its registered events.

```ts

import { Validator, minLengthRule, maxLengthRule } from '@mongez/validator';

const value = "welcome";

const props = {
    minLength: 3,
    maxLength: 5,
};

const rules = [minLengthRule, maxLengthRule];

const validator = new Validator(value, props, rules);

validator.on('pass', validator => {
    // everything is valid :)
}).on('fail', validator => {
    // validation didn't go as expected
}).on('done', validator => {
    // validation has just ended
});

validator.validate();

validator.destroy(); // clears events subscriptions and resets validator
```

## TODO

- Add configurations:
  - Set default error return mode
  - Enable / Disable Events
- Add enable/disable events methods.
- Add other rules for nodejs validation such as database validation i.e `unique` `exists` and so on.
- Add unit tests.
