import basedto from '../../../common/dto/dto.js'
import joi from 'joi';

class logindto extends basedto {
    static schema = joi.object({
        email: joi.string()
            .email()
            .required()
            .messages({
                "string.email": "Invalid email",
                "any.required": "Email is required"
            }),

        password: joi.string()
            .min(6)
            .required()
            .messages({
                "string.min": "Password must be at least 6 characters",
                "any.required": "Password is required"
            })
    })
}

export default logindto;