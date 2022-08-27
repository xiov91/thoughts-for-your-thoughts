const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.export = router;