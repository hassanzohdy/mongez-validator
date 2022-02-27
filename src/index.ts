// validation translation text
export { default as enTranslation } from "./locales/en";
export { default as arTranslation } from "./locales/ar";

// validation rules
export { default as urlRule } from "./rules/url";
export { default as minRule } from "./rules/min";
export { default as maxRule } from "./rules/max";
export { default as emailRule } from "./rules/email";
export { default as lengthRule } from "./rules/length";
export { default as numberRule } from "./rules/number";
export { default as floatRule } from "./rules/float";
export { default as integerRule } from "./rules/integer";
export { default as patternRule } from "./rules/pattern";
export { default as requiredRule } from "./rules/required";
export { default as minLengthRule } from "./rules/min-length";
export { default as maxLengthRule } from "./rules/max-length";
export { default as matchElementRule } from "./rules/matchElement";

// all rules list in one array
export { default as rulesList } from "./rules-list";

// validator
export { default as Validator, validate } from "./validator";

// types
export * from "./types";
