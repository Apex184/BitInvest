import  express, {Response, Request, NextFunction} from 'express'
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('I am a user');
});

export default router;
