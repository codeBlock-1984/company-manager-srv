import { Router } from 'express';

import { get, create, edit, remove } from '../controllers';

const router = Router();


router.get('/', get);

router.post('/', create);

router.put('/:id', edit);

router.delete('/:id', remove);

export default router;
