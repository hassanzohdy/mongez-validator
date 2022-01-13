import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "../types";

export default {
  rule: "maxLength",
  requiresValue: true,
  evaluate: function (value, props): RuleResponse {
    const maxLength = props.maxLength;

    return {
      errorType: "maxLength",
      hasError: String(value).length > maxLength,
      errorMessage: trans("validation.maxLength", maxLength),
    } as RuleResponse;
  },
} as Rule;
