import mongoose from 'mongoose';
mongoose.connect('mongodb://47.104.7.40:27017/lk_data', { useNewUrlParser: true },(err,res)=>{
    if(!err){
        console.log(res);
    }
});

const userSchema = mongoose.Schema({
    
    user_name:{type:String,required:true},
    user_pwd:{type:String},
    real_name:{type:String},
    real_name:{type:String},
    icon_url:{type:String},
    sex:{type:String},
    phone:{type:String},
    e_mail:{type:String},
    join_time:{type:Date,default: Date.now},
    c_time: {type: Date, default: Date.now},
    l_time: {type: Date, default: Date.now},
    intro_self:{type:String}
});

const User = mongoose.model('User', userSchema);
export default  User;