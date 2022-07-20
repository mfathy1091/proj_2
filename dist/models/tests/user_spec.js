"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const hashing_1 = require("../../utils/hashing");
const store = new user_1.UserStore();
describe("User Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@gmail.com',
            password_digest: yield (0, hashing_1.hashPassword)('password123')
        });
        expect(result).toEqual({
            id: "1",
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@gmail.com',
            password_digest: '$2b$10$j6pmR7ohipx0MoKFbtNHV.T84ClqK.pIXQ2ofSii0aL0K6V75VTCW'
        });
    }));
    // it('index method should return a list of products', async () => {
    //     const result = await store.index();
    //     expect(result).toEqual([{
    //         id: "1",
    //         first_name: 'John',
    //         last_name: 'Doe',
    //         email: 'john@gmail.com',
    //         password: 'password123'
    //     }]);
    // })
    // it('show method should return the correct user', async () => {
    //     const result = await store.show("1");
    //     expect(result).toEqual({
    //         id: "1",
    //         first_name: 'John',
    //         last_name: 'Doe',
    //         email: 'john@gmail.com',
    //         password: 'password123'
    //     });
    // });
    // it('delete method should remove the user', async () => {
    //     store.delete("1");
    //     const result = await store.index()
    //     expect(result).toEqual([]);
    // });
});
