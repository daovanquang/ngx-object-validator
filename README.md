================ General Info ================

Fullname:   DAO VAN QUANG
Email:      daovanquang1997hy@gmail.com
Github:     https://github.com/daovanquang

=============== Technical Skills ==============

Backend: C/C#, Java/JSP-Servlet/Spring, Javascript/NodeJS
Fontend: HTML, Pug, CSS, Sass, Javascript, Typescript, Angular
Database: SQL Server, MySQL, Oracle, MariaDB, NOSQL

================ Other Skills ================

Clean code
Good thinking ability
Quick-learner, self-confidence and activeness

============== ABOUT PACKAGE =============
=================== Test ===================

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
            validators: [{
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
            }]
        },
        password : {
            validators: [{
            message: 'Password is required',
            validate: Validate.Required()
            },
            {
            message: 'Password min length is 10',
            validate: Validate.MinLength(10)
            }]
        },
        email: {
            validators: [{
                message: 'Invalid email struct',
                validate: Validate.Pattern('^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$')
            }]
        },
        profiles: {
            validators: [{
                message: 'Profiles is required',
                validate: Validate.Required(),
            }],
            fullname: {
                validators: [{
                    message: 'Full name must contains spacing',
                    validate: Validate.Contains(' ')
                }]
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
    const userMessage = ObjectValidator.toMessage(userValidated, undefined, undefined);
    console.log(JSON.stringify(userMessage));

================== Result ==================
    
    //struct map<key, value>

    {
        "username.not_blank": "Username is not blank",
        "username.min_length": "Username min length is 10",
        "password.min_length": "Password min length is 10",
        "email.pattern": "Invalid email struct",
        "profiles.age.required":"Age is required"
    }

-> <i>If it make you feel a fun, give me a coffee</i> <-