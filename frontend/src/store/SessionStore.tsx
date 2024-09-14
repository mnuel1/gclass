import axios from 'axios';
import { create } from 'zustand'

type sessionType = {
    token: string;
    username: string;
    setSession: (token: string, username: string) => void;
}

export const useSessionStore = create<sessionType>((set) => ({
    token: '',
    username: '',
    setSession: (token, username) => set({ token, username })
}))

type buyerInfoType = {
    buyer_name: string, 
    business_name: string,
    tin: string,
    contact: string, 
    address: string, 
    buyer_signature: string 
}

type selectedProductBuyType = {
    id: number;
    unit: string;
    product_name: string;
    quantity: number;
    price: number;
    total_amount: number;
}

type productTaxInfoType = {
    net_sales: string;
    vat_amount: string;
    vat_output: string;
    discount: number;
    salesInvoice: string
}

type createInvoiceType = {
    submitData: (token: string, buyerInfo: buyerInfoType, productSelect: selectedProductBuyType[], taxInfo: productTaxInfoType) => void;
    error: boolean;
    title: string | null;
    comment: string | null;
    isLoading: boolean;
    closeError: () => void;

}

export const useCreateInvoiceStore = create<createInvoiceType>((set) => ({

    error: false,
    title: null,
    comment: null,
    isLoading: false,
    submitData: async (token, buyerInfo, productSelect, taxInfo) => {
        set({isLoading: true});
        console.log(buyerInfo);
        
        try{
            const data = productSelect.map(item => ({
                id: item.id,
                quantity: item.quantity,
                total_amount: item.total_amount,

            }));
            
            const receipt = {
                net_sales: taxInfo.net_sales,
                vat_amount: taxInfo.vat_amount,
                vat_output: taxInfo.vat_output,
                discount: taxInfo.discount,              
                data            
                
            }                        
            const response = await axios.post('https://resibo-react-1.onrender.com/transaction/new/receipt', 
                {buyerInfo, receipt}, {
                headers: {
                    'Authorization': token
                }
            })
            set({isLoading: false, title: response.data.title, comment: response.data.msg});
        }
        catch(err: any){
            const errorTitle = err.response?.data?.title || 'Error';
            const errorMsg = err.response?.data?.message || 'An error occurred';
            set({isLoading: false, error: true, title: errorTitle, comment: errorMsg});
        }
    },
    closeError: () => set({error: false, title: null, comment: null})
}))