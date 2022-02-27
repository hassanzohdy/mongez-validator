import Is from "@mongez/supportive-is";
import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "./../types";

export default {
  type: "number",
  rule: "number",
  requiresValue: true,
  evaluate: function (value: string): RuleResponse {
    return {
      hasError: !Is.numeric(value),
      errorMessage: trans("validation.number"),
      errorType: "number",
    } as RuleResponse;
  },
} as Rule;
