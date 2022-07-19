"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var user_1 = require("./../../models/user");
var AuthMiddleware_1 = __importDefault(require("../../middlewares/AuthMiddleware"));
var UserController_1 = require("../../controllers/UserController");
var store = new user_1.UserStore();
var userRouter = express_1["default"].Router();
userRouter.get('/', AuthMiddleware_1["default"], UserController_1.index);
userRouter.post('/', AuthMiddleware_1["default"], UserController_1.create);
userRouter.post('/login', UserController_1.login);
// userRouter.get('/:productID', getProduct)
// userRouter.post('/', createProduct) 
// userRouter.put('/:productID', updateProduct) 
// userRouter.delete('/:productID', deleteProduct)
// const index = userRouter.get('/', async (req: Request, res: Response): Promise<void> => {
// });
exports["default"] = userRouter;
