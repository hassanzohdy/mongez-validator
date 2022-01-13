import { requiredRule, rulesList, validate } from './../src';

const validator = validate('Hello', {
    required: true,
    type: 'email',
    minLength: 31,
}, [requiredRule]);

const validator2 = validate(12, {
    required: true,
    minLength: 31,
}, [requiredRule]);

if (validator.passes()) {
    // all good
} else {
    validator.getError(); // get error message // minlength is 31
}