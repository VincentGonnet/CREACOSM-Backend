import { Router } from 'express';
import startGame from '../controllers/game.controller';

const router = Router();

router.post('/start-game', startGame);

export default router;