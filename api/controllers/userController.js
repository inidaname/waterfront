import User from '../models/usersModel';
import { genRandom } from '../utils/helpers';


export const createRecord = async (req, res) => {
  
  try {
    const receiptNumber = genRandom(10)
    const newRecord = await User.create({...req.body, receiptNumber });
  
    return res.status(201).json({ message: 'Created  successfully', data: newRecord });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        message: err.message
      }
    });
  }
};

export const updateRecord = async (req, res) => {
  let options = req.body;
  const updates = {};

  try {
    for (const option of Object.keys(options)) {
      updates[option] = options[option];
    }

    const record = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, contex: 'query' }
    )
      .select('-password')
      .lean()
      .exec();

    if (!record) {
      res.status(400).json({ message: 'Invalid Record' });
    }

    res.status(200).json({
      data: record,
      message: 'Updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: err.message
      }
    });
  }
};


export const getRecordByHouseNumber = async (req, res)=>{
 
  try {
    const { houseNumber } = req.params;

    const record = await User.find({ houseNumber});
    return res.status(201).json({ message: 'Created  successfully', data: record });
  } catch (error) {
    res.status(500).json({
      error: {
        message: err.message
      }
    });
  }

}


export const getAllRecord = async (_, res)=>{
 
  try {
    const record = await User.find({});
    return res.status(201).json({ message: 'All data', data: record });
  } catch (error) {
    res.status(500).json({
      error: {
        message: err.message
      }
    });
  }

}
