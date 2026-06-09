const router = require('express').Router();
const { authentication } = require('../middlewares/auth.middleware');
const { getFlights, addFlight, updateFlight, deleteFlight } = require('../controller/flights.controller');

router.get('/', getFlights);
router.post('/', authentication, addFlight);
router.put('/:id',authentication, updateFlight);
router.delete('/:id',authentication, deleteFlight);

module.exports = router;