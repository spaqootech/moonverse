const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const RequestLand = require('../../models/RequestLand');


// @route    POST api/requestland
// @desc     Create a sub
// @access   Private
router.post(
  '/',
  check('wallet', 'Wallet is required').notEmpty(),
  check('email', 'Email is required').notEmpty(),
  check('coinId', 'coinId is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log("req.body", req.body)

      const newRequestLand = new RequestLand({
        wallet: req.body.wallet,
        email: req.body.email,
        coinId: req.body.coinId,
        landAmount: req.body.landAmount,
        serverType: req.body.serverType
      });

      const requestLand = await newRequestLand.save();
      res.json(requestLand);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/requestland
// @desc     Get all requestland
// @access   Private
router.get('/', async (req, res) => {
  try {
    const requestLands = await RequestLand.find().sort({ date: -1 });
    res.json(requestLands);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/requestland/:id
// @desc     Get sub by ID
// @access   Private
// router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
//   try {
//     const requestLands = await RequestLand.findById(req.params.id);

//     if (!requestLands) {
//       return res.status(404).json({ msg: 'Not found' });
//     }

//     res.json(requestLands);
//   } catch (err) {
//     console.error(err.message);

//     res.status(500).send('Server Error');
//   }
// });

// // @route    DELETE api/requestland/:id
// // @desc     Delete a sub
// // @access   Private
// router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
//   try {
//     const requestLands = await RequestLand.findById(req.params.id);

//     if (!requestLands) {
//       return res.status(404).json({ msg: 'Not found' });
//     }

//     // Check user
//     if (requestLands.email.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }

//     await requestLands.remove();

//     res.json({ msg: 'Removed' });
//   } catch (err) {
//     console.error(err.message);

//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
