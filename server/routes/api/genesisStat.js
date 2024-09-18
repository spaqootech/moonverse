const express = require('express');
const router = express.Router();
const genesisModule = require('../../modules/genesis/genesisController');

/**
 * @route POST api/genesis/genesis
 * @description Genesis nft
 * @access Public
 */
router.post('/genesis', genesisModule.Genesis);

/**
 * @route POST api/genesis/bid
 * @description Bid genesis nft
 * @access Public
 */
router.post('/get', genesisModule.Get);

/**
 * @route POST api/genesis/popular
 * @description Get popular assets
 * @access Public
 */
router.post('/popular', genesisModule.Popular);

/**
 * @route POST api/genesis/find
 * @description Get genesis
 * @access Public
 */
router.post('/find', genesisModule.Find);

module.exports = router;