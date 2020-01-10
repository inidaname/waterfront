import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  houseAddress:String,
  leakageStatus: String,
	previous: String,
  current: String,
  unitConsume: Number,
  unitCost: Number,
  installationDate: String,
  fromDate: String,
  toTheDate:String,
  outstanding: Number,
  curCharge: Number,
  totalDue: Number,
  receiptNumber :String
},
{ timestamps: true });


export default mongoose.model('user', userSchema);
