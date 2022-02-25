import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "../types";

export default {
  rule: "minLength",
  requiresValue: true,
  evaluate: function (value, props): RuleResponse {
    const minLength = props.minLength;

    if (!Array.isArray(value)) {
      value = String(value);
    }

    return {
      errorType: "minLength",
      hasError: value.length < minLength,
      errorMessage: trans("validation.minLength", minLength),
    } as RuleResponse;
  },
} as Rule;
