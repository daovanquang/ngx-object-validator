const {VALIDATE_TYPE} = require("./validate.type");

class Validate {
    constructor(
        type,
        equals, min, max,
        length, minLength, maxLength,
        regx,
        containStr
    ){

        this.type = type;
        this.equals = equals;
        this.min = min;
        this.max = max;
        this.equalsLength = length;
        this.minLength = minLength;
        this.maxLength = maxLength;
        this.regx = regx;
        this.containStr = containStr;
    }

    static Required() {
        return new Validate(VALIDATE_TYPE.REQUIRED);
    }

    static Blank() {
        return new Validate(VALIDATE_TYPE.BLANK);
    }

    static NotBlank() {
        return new Validate(VALIDATE_TYPE.NOT_BLANK);
    }

    static Empty() {
        return new Validate(VALIDATE_TYPE.EMPTY);
    }

    static NotEmpty() {
        return new Validate(VALIDATE_TYPE.NOT_EMPTY);
    }

    static Equals(value) {
        return new Validate(
            VALIDATE_TYPE.EQUALS,
            value
        );
    }

    static Min(value) {
        return new Validate(
            VALIDATE_TYPE.MIN,
            undefined, value
        );
    }

    static Max(value) {
        return new Validate(
            VALIDATE_TYPE.MAX,
            undefined, undefined, value
        );
    }

    static Length(value) {
        return new Validate(
            VALIDATE_TYPE.LENGTH,
            undefined, undefined, undefined,
            value
        );
    }

    static MinLength(value) {
        return new Validate(
            VALIDATE_TYPE.MIN_LENGTH,
            undefined, undefined, undefined,
            undefined, value
        );
    }

    static MaxLength(value) {
        return new Validate(
            VALIDATE_TYPE.MAX_LENGTH,
            undefined, undefined, undefined,
            undefined, undefined, value
        );
    }

    static Pattern(regx) {
        return new Validate(
            VALIDATE_TYPE.PATTERN,
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            regx
        );
    }

    static Contains(value) {
        return new Validate(
            VALIDATE_TYPE.CONTAINS,
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            undefined,
            value,
        );
    }
}


module.exports = {
    Validate
}