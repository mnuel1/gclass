import { create } from 'zustand'
import axios from 'axios';

type productsType = {
  id: number;
  sku: string;
  unit: string;
  product_name: string;
  price: number;
  vat_amount: number;
  vat_inclusive: number;
  status: string;
}

type useProductStateType = {
    products: productsType[] | null;
    error: boolean;
    title: string | null;
    comment: string | null;
    isLoading: boolean;
    fetchData: (token: string) => void;
    closeError: () => void;
    addProduct: (product: {
        id: number;
        sku: string;
        unit: string;
        product_name: string;
        price: number;
        vat_amount: number;
        vat_inclusive: number;
        status: string;
    }, token: string) => void;
    deleteProduct: (id: number, token: string, adminID: string) => void;
    updateProduct: (product: {
        id: number;
        sku: string;
        unit: string;
        product_name: string;
        price: number;
        vat_amount: number;
        vat_inclusive: number;
        status: string;
        adminID: number;
    }, token: string, ) => void;
}

export const useProductState = create<useProductStateType>((set) => ({
    products: [],
    error: false,
    title: null,
    comment: null,
    isLoading: false,
    fetchData: async (token) => {
        set({isLoading: true});
        try{
            const response = await axios.get('https://resibo-react-1.onrender.com/products/get/display', {
                headers: {
                    'Authorization': token
                }
            })
            const products = await response.data.products;
            set({isLoading: false, products});
        }
        catch(err: any){
          console.log(err)
          const errorTitle = err.response?.data?.title || 'Error';
          const errorMsg = err.response?.data?.message || 'An error occurred';

            set({isLoading: false, error: true, title: errorTitle, comment: errorMsg});
        }
    },
    closeError: () => set((state) => ({error: !state.error})),
    addProduct: async (product, token) => {
      set({isLoading: true})
      try{
        
        const productData = {
          sku: product.sku,
          unit: product.unit,
          product_name: product.product_name,
          price: product.price, 
          vat_amount: product.vat_amount,
          vat_inclusive: product.vat_inclusive,
          status: 'Active'
        }

        const response = await axios.post('https://resibo-react-1.onrender.com/product/add', productData, {
          headers: {
            'Authorization': token
          }
        })
        const addedProduct = product;
        set((state) => ({
          isLoading: false,
          products: [...state.products || [], addedProduct],
          
        }));
        set({isLoading: false, error: true, title: response.data.title, comment: response.data.msg})
      }catch(err: any){
        set({isLoading: false, error: true, title: err.response.data.title, comment: err.response.data.msg});
      }
    },
    deleteProduct: async(id, token, adminID) => {
      set({isLoading: true})
      try{
        const response = await axios.patch(`https://resibo-react-1.onrender.com/product/delete/${id}`, {adminID}, {
            headers: {
              'Authorization': token
            }
        })

        set((state) => ({
          isLoading: false,
          products: state.products?.map((product) => product.id === id ? {...product, status: 'Deactivated'} : product) || []
          ,
        }));
        
        set({isLoading: false, error: true, title: response.data.title, comment: response.data.msg})
      }catch(err: any){
        set({isLoading: false, error: true, title: err.response.data.title, comment: err.response.data.msg});
      }
    },
    updateProduct: async(product, token) => {
      set({isLoading: true})
      try{
        const productData = {
          id: product.id,
          sku: product.sku,
          unit: product.unit,
          product_name: product.product_name,
          price: product.price, // actual price vat inclusive <<-- suppose to be vat_inclusive
          vat_amount: product.vat_amount,
          vat_inclusive: product.vat_inclusive, // without vat amount change the name <<-- without vat (price) based on revisions
          status: product.status,
          adminID: product.adminID
        }
        const response = await axios.patch(`https://resibo-react-1.onrender.com/product/update`, productData, {
          headers: {
            'Authorization': token
          }
        })

        set((state) => ({
          isLoading: false,
          products: state.products?.map((item) => item.id === product.id ? product : item) || []
        }));
        set({isLoading: false, error: true, title: response.data.title, comment: response.data.msg})
      }catch(err: any){
        set({isLoading: false, error: true, title: err.response.data.title, comment: err.response.data.msg});
      }
    }
}))

type addProductModalType = {
    isModalVisible: boolean;
    updateModalState: () => void;
}

export const useAddProductModal = create<addProductModalType>((set) => ({
    isModalVisible: false,
    updateModalState: () => set((state) => ({isModalVisible: !state.isModalVisible}))
}))

type updateProductModalType = {
    isUpdateModalVisible: boolean;
    setUpdateModalState: () => void;
}

export const useUpdateProductModal = create<updateProductModalType>((set) => ({
    isUpdateModalVisible: false,
    setUpdateModalState: () => set((state) => ({isUpdateModalVisible: !state.isUpdateModalVisible}))
}))

type selectedProductType = {
    id: number;
    sku: string;
    unit: string;
    product_name: string;
    price: number;
    vat_amount: number;
    vat_inclusive: number;
    status: string;
}

type selectedProductModalType = {
  productInfo: selectedProductType;
  updateSelectedProductInfo: (value: selectedProductType) => void;
  removeSelectedProductInfo: () => void;
}

export const useSelectedProductModal = create<selectedProductModalType>((set) => ({
  productInfo: {
    id: 0,
    sku: '',
    unit: '',
    product_name: '',
    price: 0,
    vat_amount: 0,
    vat_inclusive: 0,
    status: ''
  },
  updateSelectedProductInfo: (value) => set({productInfo: value}),
  removeSelectedProductInfo: () => set({productInfo: {
    id: 0,
    sku: '',
    unit: '',
    product_name: '',
    price: 0,
    vat_amount: 0,
    vat_inclusive: 0,
    status: ''
  }})
}))