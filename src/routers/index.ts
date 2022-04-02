import { Router } from 'express';

import companyRouter from './company.router';

const router = Router();

router.use('/companies', companyRouter);

export default router;
