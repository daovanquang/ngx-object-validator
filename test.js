const {Validate} = require("./models/validate");
const ObjectValidator = require("./index");

const user = {
    username: '',
    password: '',
    email: 'daovanquang@',
    profiles: {
        fullname: "DAO VAN QUANG",
        job: "Software Developer",
        country: "Vietnam",
        age: undefined
    }
}

const userValidator = {
    username: {
        validators: [
            {
                message: 'Username is required',
                validate: Validate.Required()
            },
            {
                message: 'Username is not blank',
                validate: Validate.NotBlank()
            },
            {
                message: 'Username min length is 10',
                validate: Validate.MinLength(10)
            }
        ]
    },
    password : {
        validators: [
            {
                message: 'Password is required',
                validate: Validate.Required()
            },
            {
                message: 'Password min length is 10',
                validate: Validate.MinLength(10)
            }
        ]
    },
    email: {
        validators: [
            {
                message: 'Invalid email struct',
                validate: Validate.Pattern('^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$')
            }
        ]
    },
    profiles: {
        validators: [
            {
                message: 'Profiles is required',
                validate: Validate.Required(),
            }
        ],
        fullname: {
            validators: [
                {
                    message: 'Full name must contains spacing',
                    validate: Validate.Contains(' ')
                }
            ]
        },

        age: {
            validators: [
                {
                    message: 'Age is required',
                    validate: Validate.Required()
                }
            ]
        }
    }
}

const userValidated = ObjectValidator.validate(user, userValidator);
// console.log(JSON.stringify(userValidated));

const userMessage = ObjectValidator.toMessage(userValidated, undefined, undefined);
console.log(JSON.stringify(userMessage));