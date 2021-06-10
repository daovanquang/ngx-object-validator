const ObjectUtils = require("./utils/object.utils");
const {VALIDATE_TYPE} = require("./models/validate.type");

const VALIDATOR_KEY = "validators";
const SEPERATOR = ".";

class ObjectValidator {

    static isUndefinedOrNull(val){
        return val===undefined || val===null;
    }

    static isBlank(val){
        return val===undefined || val===null || val==='' || val==="";
    }

    static isEmpty(val){
        return val===undefined || val===null || val==='' || val==="" || val.trim()==="";
    }

    static compare(fVal, sVal) {
        if(this.isUndefinedOrNull(fVal) && this.isUndefinedOrNull(sVal)){
            return 0;
        }

        if(!this.isUndefinedOrNull(fVal) && this.isUndefinedOrNull(sVal)){
            return 1;
        }

        if(this.isUndefinedOrNull(fVal) && !this.isUndefinedOrNull(sVal)){
            return -1;
        }

        return fVal===sVal ? 0 : fVal > sVal ? 1 : -1;
    }

    static compareLength(val, len){
        if(this.isUndefinedOrNull(val) && !len){
            return 0;
        }

        if(!this.isUndefinedOrNull(val) && !len){
            return 1;
        }

        if(this.isUndefinedOrNull(val) && len){
            return -1;
        }

        const valLen = val.toString().length;

        return valLen===len ? 0 : valLen > len ? 1 : -1;
    }

    static pattern(val, regx){
        if(this.isUndefinedOrNull(val)) return false;
        if(!regx) return true;

        const re = new RegExp(regx);
        return re.test(val);
    }

    static contains(val, contains){
        if(this.isUndefinedOrNull(val)) return false;
        return val.indexOf(contains)>0;
    }

    static checkValidator(val, validator){
        if(!validator) return true;

        switch (validator.validate.type) {
            case VALIDATE_TYPE.REQUIRED: {
                return !this.isUndefinedOrNull(val);
            }

            case VALIDATE_TYPE.BLANK: {
                return this.isBlank(val);
            }

            case VALIDATE_TYPE.NOT_BLANK: {
                return !this.isBlank(val);
            }

            case VALIDATE_TYPE.EMPTY: {
                return this.isEmpty(val);
            }

            case VALIDATE_TYPE.NOT_EMPTY: {
                return !this.isEmpty(val);
            }

            case VALIDATE_TYPE.MIN: {
                return this.compare(val, validator.validate.min)>=0;
            }

            case VALIDATE_TYPE.MAX: {
                return this.compare(val, validator.validate.max)<=0;
            }

            case VALIDATE_TYPE.EQUALS: {
                return this.compare(val, validator.validate.equals)===0;
            }

            case VALIDATE_TYPE.MIN_LENGTH: {
                return this.compareLength(val, validator.validate.minLength)>=0;
            }

            case VALIDATE_TYPE.MAX_LENGTH: {
                return this.compareLength(val, validator.validate.maxLength)<=0;
            }

            case VALIDATE_TYPE.LENGTH: {
                return this.compareLength(val, validator.validate.equalsLength)===0;
            }

            case VALIDATE_TYPE.PATTERN: {
                return this.pattern(val, validator.validate.regx);
            }

            case VALIDATE_TYPE.CONTAINS: {
                return this.pattern(val, validator.validate.containStr);
            }

            default: {
                return true;
            }
        }
    }

    static checkValidators(val, validators){
        if(!validators || validators.length===0) return true;

        for(let i=0; i<validators.length; i++) {
            const validator = validators[i];
            if(!validator) continue;

            const isValid = this.checkValidator(val, validator);
            validator.valid = isValid;
        }
    }

   static validate(obj, objValidator){
       const keys = ObjectUtils.getKeys(objValidator, VALIDATOR_KEY);
       if(!keys || keys.length===0) {
           return undefined;
       }

       //Validate
       if(objValidator.hasOwnProperty(VALIDATOR_KEY)) {
           this.checkValidators(obj, objValidator[VALIDATOR_KEY]);
       }

       //Keys
       for(let i=0; i<keys.length; i++) {
           const key = keys[i];
           if(!key || !obj.hasOwnProperty(key)){
               continue;
           }

           const childObj = obj[key];
           const childObjValidator = objValidator[key];

           if(childObj instanceof Object){
               this.validate(childObj, childObjValidator);
               continue;
           }

           this.checkValidators(childObj, childObjValidator.validators);
       }

       return objValidator;
   }

   static getMessageFromValidator(validator, prefix, message){
        if(!validator || validator.valid===undefined || validator.valid===null || validator.valid===true) {
            return message;
        }

        const type = validator.validate.type.toLowerCase();
        const key = prefix ? prefix.concat(SEPERATOR).concat(type) : type;

        message = message ? message : {};
        message[key] = validator.message;

       return message;
   }

   static getMessageFromValidators(validators, prefix, message){
        if(!validators || validators.length===0) {
            return message;
        }

       message = message ? message : {};

        for(let i=0; i<validators.length; i++) {
            const validator = validators[i];
            if(!validator) continue;

           message = this.getMessageFromValidator(validator, prefix, message);
        }

        return message;
   }

   static toMessage(objValidator, prefix, message){
       const allKey = ObjectUtils.getKeys(objValidator);
       if(!allKey || allKey.length===0) {
           return {};
       }

       message = message ? message : {};
       prefix = !prefix ? '' : prefix;


       //Validate
       if(objValidator.hasOwnProperty(VALIDATOR_KEY)) {
           const validators = objValidator[VALIDATOR_KEY];
           message = this.getMessageFromValidators(validators, prefix, message);
       }

       const keys = ObjectUtils.getKeys(objValidator, VALIDATOR_KEY);
       if(!keys || keys.length===0) {
           return message;
       }

       //Keys
       for(let i=0; i<keys.length; i++) {
           const key = keys[i];
           if (!key) {
               continue;
           }

           const childObjValidator = objValidator[key];

           const isValidatos = ObjectUtils.containsOnly(childObjValidator, VALIDATOR_KEY);
           if(isValidatos){
               message = this.getMessageFromValidators(childObjValidator.validators, prefix.concat(SEPERATOR).concat(key), message);
               continue;
           }

           prefix = key;
           this.toMessage(childObjValidator, prefix, message);
       }

       return message;
   }
}

module.exports = ObjectValidator;