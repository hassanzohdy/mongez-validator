import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "../types";

export default {
  rule: "matchElement",
  requiresValue: false,
  evaluate: function (value: string, props): RuleResponse {
    const { matchElement: matchingInputId, matchText } = props;
    const matchingInput = document.getElementById(
      matchingInputId
    ) as HTMLInputElement;

    return {
      errorType: "matchElement",
      hasError: matchingInput && matchingInput.value !== String(value),
      errorMessage: trans("validation.matchElement", {
        field: trans(matchText || matchingInputId),
      }),
    } as RuleResponse;
  },
} as Rule;
