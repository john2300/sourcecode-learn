import mongoose from 'mongoose';
mongoose.connect('mongodb://47.104.7.40:27017/lk_data', { useNewUrlParser: true }, (err, res) => {
  if (!err) {
    console.log(res)
  }
});

const courseSchema = mongoose.Schema({
  course_name:{type:String,required:true},
  course_title:{type:String,required:true},
  course_sub_title:{type:String,required:true},
  course_teacher:{type:String,required:true},
  course_serialize_status:{type:String,required:true},
  main_category:{type:String,required:true},
  sub_category:{type:String,required:true},
  course_intro:{type:String,required:true},
  course_tag:{type:String,required:true},
  course_page:{type:String,required:true},

  course_manager:[{
    c_title:{type:String,required:true},
    c_video:{type:String,required:true},
    c_intro:{type:String,required:true},
    c_time:{type:String,required:true}
  }]
})

const Course = mongoose.model('Course',courseSchema);
export default Course;