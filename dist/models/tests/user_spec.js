"use strict";
// import UserStore from '../user'
// import { hashPassword } from '../../utils/hashing'
// const store = new UserStore()
// describe("User Model", () => {
//     it('should have an index method', () => {
//         expect(store.index).toBeDefined();
//     });
//     it('should have a show method', () => {
//         expect(store.show).toBeDefined();
//     });
//     it('should have a create method', () => {
//         expect(store.create).toBeDefined();
//     });
//     it('should have a update method', () => {
//         expect(store.update).toBeDefined();
//     });
//     it('should have a delete method', () => {
//         expect(store.delete).toBeDefined();
//     });
//     it('create method should add a user', async () => {
//         const result = await store.create({
//             first_name: 'John',
//             last_name: 'Doe',
//             email: 'john@gmail.com',
//             password_digest: await hashPassword('password123')
//         });
//         expect(result).toEqual({
//             id: "1",
//             first_name: 'John',
//             last_name: 'Doe',
//             email: 'john@gmail.com',
//             password_digest: '$2b$10$j6pmR7ohipx0MoKFbtNHV.T84ClqK.pIXQ2ofSii0aL0K6V75VTCW'
//         });
//     });
//     // it('index method should return a list of products', async () => {
//     //     const result = await store.index();
//     //     expect(result).toEqual([{
//     //         id: "1",
//     //         first_name: 'John',
//     //         last_name: 'Doe',
//     //         email: 'john@gmail.com',
//     //         password_digest: 'password123'
//     //     }]);
//     // })
//     // it('show method should return the correct user', async () => {
//     //     const result = await store.show("1");
//     //     expect(result).toEqual({
//     //         id: "1",
//     //         first_name: 'John',
//     //         last_name: 'Doe',
//     //         email: 'john@gmail.com',
//     //         password_digest: 'password123'
//     //     });
//     // });
//     // it('delete method should remove the user', async () => {
//     //     store.delete("1");
//     //     const result = await store.index()
//     //     expect(result).toEqual([]);
//     // });
// })
