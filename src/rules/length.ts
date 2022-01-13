import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "../types";

export default {
  rule: "length",
  requiresValue: true,
  evaluate: function (value, props): RuleResponse {
    const length = props.length;
    return {
      hasError: String(value).length !== length,
      errorMessage: trans("validation.length", length),
      errorType: "length",
    } as RuleResponse;
  },
} as Rule;
