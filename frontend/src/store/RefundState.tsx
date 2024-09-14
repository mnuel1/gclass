import { create } from 'zustand';
import axios from 'axios';
type customerType = {
    name: string;
    tin: string;
    tin1: string;
    tin2: string;
    tin3: string;
    contact_number: string;
    address: string;
    business_name: string | null;
    email: string;
}

type receiptType = {
    id: number;
    customerID: number; 
    tempCustomerID: number;
    salesInvoice: string;
    net_sales: number;
    vat_amount: number;
    vat_output: number;
    Customer: customerType,
    TempCustomer: null
    receiptItems: productsType[]
}

type productsType = {
    id: number;
    quantity: number;
    total_cost: number;
    Product: {
        id: number;
        product_name: string;
        price: number;
    }
    originalQuantity: number
    refunded: boolean
}

type refundState = {
    receipt: receiptType[] | null;
    products: productsType[] | null;
    error: boolean;
    title: string | null;
    message: string | null;
    loading: boolean;
    fetchData: (token: string) => void;
    closeError: () => void;
    selectedReceiptId: number | null;
    setSelectedReceiptId: (id: number) => void;
    incrementQuantity: (id: number) => void;
    decrementQuantity: (id: number) => void;

}

export const useRefundState = create<refundState>((set) => ({
    receipt: [],
    products: [],
    error: false,
    title: null,
    message: null,
    loading: false,
    fetchData: async(token) => {
        set({loading: true})
        try {
            const response = await axios.get('https://resibo-react-1.onrender.com/receipt/refund', {
                headers: {
                    Authorization: token
                }
            })            
            // console.log(response.data.refundData);
            
            set({receipt: response.data.refundData.receipts, products: response.data.refundData.receipts.receiptItems, loading: false})
        }catch(err: any){
            set({error: true, title: "Error", message: err.response.data.msg})
        }
    },
    incrementQuantity: (id) => set((state) => {
        const updatedReceipt = state.receipt?.find((receipt) => receipt.id === state.selectedReceiptId);
        if (updatedReceipt) {
            const updatedReceiptItems = updatedReceipt.receiptItems.map((item) =>
                item.id === id
                    ? { ...item,                         
                        quantity: Math.min(item.originalQuantity, item.quantity + 1),
                        total_cost: item.Product.price * Math.min(item.originalQuantity, item.quantity + 1),
                        refunded: true 
                    }
                    : item
            );
    
            return {
                receipt: state.receipt?.map((receipt) =>
                    receipt.id === state.selectedReceiptId ? { ...receipt, receiptItems: updatedReceiptItems } : receipt
                ),
            };
        }
    
        return state;
    }),
    decrementQuantity: (id) => set((state) => {
        const updatedReceipt = state.receipt?.find((receipt) => receipt.id === state.selectedReceiptId);
        if (updatedReceipt) {
            const net_sales = updatedReceipt.net_sales;
            const updatedReceiptItems = updatedReceipt.receiptItems.map((item) =>
                item.id === id ? 
                    { 
                        ...item, 
                        quantity: Math.max(-item.originalQuantity, item.quantity > 0 ? -(item.quantity - 1) : item.quantity - 1), 
                        total_cost: net_sales * Math.max(-item.originalQuantity, item.quantity > 0 ? -(item.quantity - 1) : item.quantity - 1),
                        refunded: true 
                    }
                : item
            );
        
            return {
                receipt: state.receipt?.map((receipt) =>
                    receipt.id === state.selectedReceiptId ? { ...receipt, receiptItems: updatedReceiptItems } : receipt
                ),
            };
        }
    
        return state;
    }),

    closeError: () => set({error: false, title: null, message: null}),
    selectedReceiptId: null,
    setSelectedReceiptId: (id) => set({ selectedReceiptId: id })
}))

export const useSelectedReceiptData = () => {
    const { receipt, selectedReceiptId } = useRefundState();
    
    const selectedReceiptData = receipt?.find((receipt) => receipt.id === selectedReceiptId) || null;    
    // console.log(selectedReceiptData);
    
    if (selectedReceiptData) {
        // Calculate total cost
        const totalCost = selectedReceiptData.receiptItems.reduce((acc, item) => acc + item.total_cost, 0);

        // Calculate VAT amount
        const vatAmount = totalCost / 1.12;

        // Calculate VAT output
        const vatOutput = totalCost - vatAmount;

        // Append calculated values to selectedReceiptData
        selectedReceiptData.net_sales = totalCost;
        selectedReceiptData.vat_amount = vatAmount;
        selectedReceiptData.vat_output = vatOutput;
    }
    return selectedReceiptData;
};