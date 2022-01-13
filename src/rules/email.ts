import Is from "@mongez/supportive-is";
import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "./../types";

export default {
  type: "email",
  rule: "email",
  requiresValue: true,
  evaluate: function (value: string): RuleResponse {
    return {
      hasError: !Is.email(value),
      errorMessage: trans("validation.invalidEmailAddress"),
      errorType: "email",
    } as RuleResponse;
  },
} as Rule;
