class Apierror extends Error {
    constructor( statusCode,message){
        super(message)
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest (message= "bad request"){
        console.log(400,message);
        
    }
    static unauthorized (message = "unauthorized"){
        console.log(401,message);
        
    }

    static conflict (message = "conflict"){
        console.log(409,message);
        
    }
}

export default Apierror;