import mongoose from 'mongoose';
mongoose.connect('mongodb://47.104.7.40:27017/lk_data', { useNewUrlParser: true },(err,res)=>{
    if(!err){
        console.log(res)
    }
});

const studentSchema = mongoose.Schema({

    'reg_account':{type: String, required: true},
    'user_name':{type: String, required: true},
    'user_age':{type: String, required: true},
    'user_sex':{type: String, required: true},
    'area':{type: String, required: true},
    'phone':{type: String, required: true},
    'points':{type: String, required: true},
    'reg_time':{type: Date, default: Date.now},
    'last_login_time':{type: Date, default: Date.now}
});

const Student = mongoose.model('Student', studentSchema);
export default Student;