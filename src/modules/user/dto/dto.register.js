import basedto from '../../../common/dto/dto.js'
import joi from 'joi';
import role from '../../../common/constants/role.js';

class registerdto extends basedto {
    static schema = joi.object({
        name: joi.string().trim().min(2).max(50).required(),    
        email: joi.string().email().lowercase().required(),
        password: joi.string().min(8).required(),
        role: joi.string().valid(role.CUSTOMER,role.SELLER,role.STUDENT,role.TEACHER)
        .default(role.CUSTOMER)
    })
}

export default registerdto;