const mongoose = require('mongoose');
const shopusersSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true,
  },
  shopId:{
     type: mongoose.Schema.Types.ObjectId,
        ref: 'shops',
  }
}, { timestamps: true });

const Shopuser = mongoose.model('Shopuser', shopusersSchema);
module.exports = Shopuser;
