import ProductModel from '../Product'
import AuthService from '../../services/Auth'

const authService = new AuthService();
const productModel = new ProductModel();

describe("Product model", () => {
    beforeAll(() => {
        productModel.create({name: 'Dell PC', price: 11.5})
    })

    it('Lists products', async () => {
        const products = await productModel.index();

        // expect(products).length
    })
})

