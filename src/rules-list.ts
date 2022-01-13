import min from "./rules/min";
import max from "./rules/max";
import url from "./rules/url";
import email from "./rules/email";
import { Rule } from "./types";
import length from "./rules/length";
import pattern from "./rules/pattern";
import required from "./rules/required";
import minLength from "./rules/min-length";
import maxLength from "./rules/max-length";
import matchElement from "./rules/matchElement";

const rulesList: Rule[] = [
  required,
  email,
  url,
  minLength,
  length,
  maxLength,
  min,
  max,
  matchElement,
  pattern,
];

export default rulesList;
