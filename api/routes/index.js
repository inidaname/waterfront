import express from 'express';

// require module
import { createRecord, updateRecord, getAllRecord, getRecordByHouseNumber } from '../controllers/userController';


const router = express.Router();

router.get('/', (_, res) => {
  res.status(200).json({
    message: 'Welcome'
  });
});


// User Route
router.post('/record', createRecord);
router.get('/record', getAllRecord)
router.get('/record/:houseNumber', getRecordByHouseNumber);
router.patch('/record/:id', updateRecord);


export default router;