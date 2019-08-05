import mongoose from 'mongoose';
mongoose.connect('mongodb://47.104.7.40:27017/lk_data', { useNewUrlParser: true }, (err, res) => {
  if (!err) {
    console.log(res)
  }
});

const classificationSchema = mongoose.Schema({
  'main_title': { type: String, required: true },
  'main_total_count': { type: Number },
  'main_is_show': { type: String },
  'main_sort': { type: String },
  'sub_course': {
    type: [{
      'sub_title': { type: String, required: true },
      'sub_total_count': { type: Number, required: true },
      'sub_is_show': { type: String, required: true },
      'sub_sort': { type: String, required: true }
    }]
  }
});
const Classification = mongoose.model('Classification', classificationSchema);
export default Classification;