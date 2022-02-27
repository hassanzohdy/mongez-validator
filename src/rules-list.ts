import min from "./rules/min";
import max from "./rules/max";
import url from "./rules/url";
import { Rule } from "./types";
import email from "./rules/email";
import float from "./rules/float";
import number from "./rules/number";
import length from "./rules/length";
import integer from "./rules/integer";
import pattern from "./rules/pattern";
import required from "./rules/required";
import minLength from "./rules/min-length";
import maxLength from "./rules/max-length";
import matchElement from "./rules/matchElement";

const rulesList: Rule[] = [
  min,
  max,
  url,
  email,
  float,
  length,
  number,
  integer,
  pattern,
  required,
  minLength,
  maxLength,
  matchElement,
];

export default rulesList;
