const { Router } = require('express');
const CalculateService = require('../services/CalculateService');
const ShowQuantityService = require('../services/ShowQuantityService');

const calcRouter = Router();
const calculateService = new CalculateService();
const showQuantityService = new ShowQuantityService();

calcRouter.post('/calculo', calculateService.execute);
calcRouter.get('/calculo', showQuantityService.execute)

module.exports = calcRouter;