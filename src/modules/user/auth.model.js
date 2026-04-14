// import mongoose from 'mongoose';
// import role from "../../common/constants/role.js"
// import bcrypt from 'bcryptjs'
// import apierror from '../../common/utils/api.error.js'
// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         minlength:8,
//         maxlength:25,
//         trim:true,
//         required:[true,"name is required"]
//     },
//     email:{
//         type:String,
//         trim:true,
//         maxlength:20,
//         unique:true,
//         lowercase:true,
//         required:[true,'email is required']
//     },
//     password:{
//         type:String,
//         trim:true,
//         required:[true,'password is required'],
//         select:false,
//         minlength:8,
//     },
//     role:{
//         type:String,
//         trim:true,
//         enum:[role.CUSTOMER,role.STUDENT,role.SELLER,role.TEACHER],
//         default:role.CUSTOMER,
//     },
//     isVerified:{
//         type:Boolean,
//         default:false,
        
//     },
//     verificationToken:{type:String,default:false},
//     refreshtoken:{type:String,default:false},
//     resetPasswordtoken:{type:String,default:false},
//     resetpasswordExpires:{type:String,default:false}
// },{timestamps:true})

// userSchema.pre('save',async (next) =>{
//     if(! this.isModified(password) ) return next();
//     this.password = await bcrypt.hash(this.password,12)
//     next()
// })

// userSchema.method.comparePassword = async function (clearTextPassword){
//     return bcrypt.compare(clearTextPassword.this.password)
// };
// export default mongoose.model("User", userSchema);



import mongoose from 'mongoose';
import role from "../../common/constants/role.js"
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:2,
        maxlength:25,
        trim:true,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        trim:true,
        maxlength:50,
        unique:true,
        lowercase:true,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required'],
        select:false,
        minlength:8,
    },
    role: {
  type: String,
  enum: ["customer", "student", "seller"],
  default: "customer"
},
    isVerified:{
        type:Boolean,
        default:false,
    },
    verificationToken: { type: String, default: null },
    verificationTokenExpires: { type: Date, default: null },
    refreshtoken:{ type:String, default:null },
    resetPasswordtoken:{ type:String, default:null },
    resetpasswordExpires:{ type:Date, default:null }
},{timestamps:true})

userSchema.pre('save', async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (clearTextPassword){
    return bcrypt.compare(clearTextPassword, this.password);
};

export default mongoose.model("User", userSchema);