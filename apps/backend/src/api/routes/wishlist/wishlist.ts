import {
  addToWishlistController,
  getUserWishlistController,
  removeFromWishlistController,
} from '@/api/controllers/wishlist/wishlist';
import { Router } from 'express';

const wishlistRouter = Router();

wishlistRouter.get('/', getUserWishlistController);

wishlistRouter.post('/:id', addToWishlistController);

wishlistRouter.delete('/:id', removeFromWishlistController);

export default wishlistRouter;
