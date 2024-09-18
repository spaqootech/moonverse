const express = require('express');
const router = express.Router();
const astroModule = require('../../modules/astro/astroController');

/**
 * @route POST api/astro/astroStat
 * @description Astro nft
 * @access Public
 */
router.post('/astro', astroModule.Astro);

/**
 * @route POST api/astro/get
 * @description Get astros
 * @access Public
 */
router.post('/get', astroModule.Get);

/**
 * @route POST api/astro/popular
 * @description Get popular assets
 * @access Public
 */
router.post('/popular', astroModule.Popular);

/**
 * @route POST api/astro/find
 * @description Get astro
 * @access Public
 */
router.post('/find', astroModule.Find);

module.exports = router;