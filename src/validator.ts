import Is from "@mongez/supportive-is";
import { Random } from "@mongez/reinforcements";
import events, { EventSubscription } from "@mongez/events";
import {
  DynamicObject,
  Rule,
  RuleResponse,
  Validateable,
  ValidationErrorReturn,
  ValidationEvent,
  ValidationEventCallback,
  ValidationEventType,
} from "./types";

export default class Validator implements Validateable {
  protected isValid: boolean = true;
  protected errorMessage: string = "";
  protected errorType: string = "";
  protected validationEventNamespace: string = `validation.${Random.string()};`;
  protected errorReturnMode: ValidationErrorReturn = "first";
  protected errorsList: DynamicObject = {};
  protected validationResults: RuleResponse[] = [];
  protected errors: RuleResponse[] = [];
  protected error: RuleResponse = {
    errorMessage: "",
    errorType: "",
    hasError: false,
  };

  /**
   * Constructor
   *
   * @param {any} value
   * @param {DynamicObject} props
   * @param {Rule[]} rules
   */
  public constructor(
    public value: any = null,
    public props: DynamicObject = {},
    public rules: Rule[] = [],
    public errorMessagesOverrides: DynamicObject = {}
  ) {}

  /**
   * Set validation value
   *
   * @parma {any} value
   * @returns {Validateable}
   */
  public setValue(value: any): Validateable {
    this.value = value;

    return this;
  }

  /**
   * Set validation props
   *
   * @parma {DynamicObject} props
   * @returns {Validateable}
   */
  public setProps(props: DynamicObject): Validateable {
    this.props = props;

    return this;
  }

  /**
   * Set validation rules list
   *
   * @parma {Rule[]} rules
   * @returns {Validateable}
   */
  public setRules(rules: Rule[]): Validateable {
    this.rules = rules;

    return this;
  }

  /**
   * Set validation props
   *
   * @parma {DynamicObject} props
   * @returns {Validateable}
   */
  public setMessagesOverrides(
    errorMessagesOverrides: DynamicObject
  ): Validateable {
    this.errorMessagesOverrides = errorMessagesOverrides;

    return this;
  }

  /**
   * Set the validation error type
   *
   * @param   {ValidationErrorReturn} errorReturnType
   * @returns {Validateable}
   */
  public setErrorReturnMode(
    errorReturnType: ValidationErrorReturn
  ): Validateable {
    this.errorReturnMode = errorReturnType;
    return this;
  }

  /**
   * Determine if the validation process is valid
   *
   * @returns {boolean}
   */
  public passes(): boolean {
    return this.isValid === true;
  }

  /**
   * Determine if the validation process failed
   *
   * @returns {boolean}
   */
  public fails(): boolean {
    return this.isValid === false;
  }

  /**
   * Get Validation Error if error return mode is first
   *
   * @returns {string}
   */
  public getError(): RuleResponse {
    return this.error;
  }

  /**
   * Get Validation Error if error return mode is all
   *
   * @returns {string}
   */
  public getErrors(): RuleResponse[] {
    return this.errors;
  }

  /**
   * Get Validation Error message if error return mode is first
   *
   * @returns {string}
   */
  public getErrorMessage(): string {
    return this.error.errorMessage;
  }

  /**
   * Get Validation error type if error return mode is first
   *
   * @returns {string}
   */
  public getErrorType(): string {
    return this.error.errorType;
  }

  /**
   * if error return mode is all
   * Get Validation Errors list as the key will be the error type and its value will be the error message
   *
   * @returns {string}
   */
  public getErrorsList(): DynamicObject {
    return this.errorsList;
  }

  /**
   * Get the passed value to the validator
   *
   * @returns {any}
   */
  public getValue(): any {
    return this.value;
  }

  /**
   * Get the passed rules list to the validator
   *
   * @returns {Rule[]}
   */
  public getRulesList(): Rule[] {
    return this.rules;
  }

  /**
   * Get the passed props list to the validator
   *
   * @returns {Rule[]}
   */
  public getProps(): DynamicObject {
    return this.props;
  }

  /**
   * Get the passed rules list to the validator
   *
   * @returns {void}
   */
  public reset(): void {
    this.errorMessage = "";
    this.errorType = "";
    this.isValid = true;
    this.errorsList = {};
    this.errors = [];
    this.validationResults = [];
  }

  /**
   * Trigger the given event type
   *
   * @param   {string} eventType
   * @param   {any[]} args
   * @returns {void}
   */
  public trigger(eventType: ValidationEvent, ...args: any[]): void {
    events.trigger(this.validationEventNamespace + eventType, ...args);
  }

  /**
   * Add an event listener to the validation based on the eventType
   *
   * @param {ValidationEventType} eventName
   * @param {ValidationEventCallback} callback
   * @returns {EventSubscription}
   */
  public on(
    eventType: ValidationEventType,
    callback: ValidationEventCallback
  ): EventSubscription {
    return events.subscribe(
      this.validationEventNamespace + eventType,
      callback
    );
  }

  /**
   * Get validation event namespace
   *
   * @returns {string}
   */
  public getValidationEventNamespace(): string {
    return this.validationEventNamespace;
  }

  /**
   * Reset validation state and remove all events listeners
   *
   * @returns {void}
   */
  public destroy(): void {
    this.reset();
    this.destroyEvents();
  }

  /**
   * Destroy all events list for current validator
   *
   * @returns {void}
   */
  public destroyEvents(): void {
    events.unsubscribeNamespace(this.validationEventNamespace);
  }

  /**
   * Get validation results per rule
   *
   * @returns {RuleResponse[]}
   */
  public getValidationResults(): RuleResponse[] {
    return this.validationResults;
  }

  /**
   * Start validation process
   *
   * @returns {Validateable}
   */
  public validate(): Validateable {
    this.reset();

    this.trigger("validating", this);

    if (Is.empty(this.rules)) return this;

    for (let Rule of this.rules) {
      // Get rule options list
      // requiresValue: requires value before evaluating the rule
      // type: requires a certain type before evaluating the rule
      // evaluate: the  rule evaluation function
      const { requiresValue = true, type, rule, evaluate } = Rule;
      //  if the requires value is set to true and there is no value
      // then skip the rule
      if (requiresValue && !this.value) continue;

      // If the rule requires certain input type and
      // the input type is not the same, then skip the rule
      if (type && type !== this.props.type) continue;

      // if the rule is not listed in the input props, then skip the rule evaluation
      if (this.props[rule] === undefined && !type) continue;

      // Finally, evaluate the input against the rule
      const ruleResponse = evaluate(this.value, this.props);

      this.validationResults.push(ruleResponse);

      if (ruleResponse.hasError) {
        this.isValid = false;
        const errorMessage: string =
          this.errorMessagesOverrides[rule] || ruleResponse.errorMessage;

        if (this.errorReturnMode === "first") {
          this.error = ruleResponse;
          this.error.errorMessage = errorMessage;
          break;
        } else {
          this.errorsList[ruleResponse.errorType] = errorMessage;
          const error = ruleResponse;
          error.errorMessage = errorMessage;
          this.errors.push(error);
        }
      }
    }

    this.trigger("done", this);

    if (this.passes()) {
      this.trigger("pass", this);
    } else {
      this.trigger("fail", this);
    }

    return this;
  }
}

/**
 * A shorthand function to use validator
 */
export function validate(
  value: any,
  props: DynamicObject,
  rules: Rule[]
): Validateable {
  return new Validator(value, props, rules).validate();
}
