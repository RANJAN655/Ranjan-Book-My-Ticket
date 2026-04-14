import Apierror from '../utils/api.error.js';

const vlidate = (DtoClass) => {
    return (req,res,next) => {
        const {errors,value} = DtoClass.validate(req.body)
        if(errors){
            throw Apierror.badRequest(errors.join("; "))
        }
        req.body = value;
        next()
    }
}

export default vlidate;