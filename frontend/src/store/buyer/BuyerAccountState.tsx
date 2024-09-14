import { create } from 'zustand'
import axios from 'axios'
type buyerAccountType = {
    id: number;
    name: string;
    business_name: string;
    tin: string;
    tin1: string;
    tin2: string;
    tin3: string;
    contact_number: string;
    address: string;
    email: string;
}

type insertDataType = {
    userID: number;
    name: string;
    business_name: string;
    contact_number: string;
    address: string;
    email: string;
}

type sampletype = {
    id:number;
    name: string;
    business_name: string;
    tin: string;
    contact_number: string;
    address: string;
    email: string;
}

type buyerAccountState = {
    buyerAccountProfile: buyerAccountType
    error: boolean | null;
    loading: boolean;
    title:string;
    message: string;
    fetchData: (getID:string, token:string) => void;
    updatePassword: (token: string, id: string, password:string, newPassword: string, reEnterNewPassowrd: string) => void;
    insertData: (data: insertDataType, token: string) => void;
    setBuyerInfo: (data: buyerAccountType) => void;
    closeError: () => void;
}

export const useBuyerAccountState = create<buyerAccountState>((set) => ({
    buyerAccountProfile: {
        id: 0,
        name: '',
        business_name: '',
        tin: '',
        tin1: '',
        tin2: '',
        tin3: '',
        contact_number: '',
        address: '',
        email: ''
    },
    error: null,
    loading: false,
    title: '',
    message: '',
    setBuyerInfo: (data) => {
        const { tin1, tin2, tin3, ...rest } = data;
        const combinedTin = `${(tin1 && tin2 && tin3) ? `${tin1}-${tin2}-${tin3}` : "Not Provided"}`
        set({ buyerAccountProfile: { ...rest, tin: combinedTin, tin1: tin1, tin2: tin2, tin3: tin3, } });
    },
    fetchData: async (getID, token) => {
        set({ loading: true, error: null, title: '', message: '' })
        try {
            const response = await axios.get(`https://resibo-react-1.onrender.com/customer/get/data/${getID}`, {
                headers: {
                    'Authorization': token
                }
            })
            
            
            const data:sampletype = response.data.userData
            const tinParts = data.tin.split('-')
            set({ loading: false, error: null, title: '', message: '', buyerAccountProfile: {
                id: data.id,
                name: data.name,
                business_name: data?.business_name || 'Not Provided',
                tin: data?.tin,
                tin1: tinParts[0],
                tin2: tinParts[1],
                tin3: tinParts[2],
                contact_number: data.contact_number,
                address: data.address,
                email: data.email
            
            }  })
        } catch (error:any) {
            set({ loading: false, error: true, title: 'Error', message: error.response.data.msg })
        }
    },
    updatePassword: async (token, id, password, newPassword, reEnterNewPassword) => {
        set({ loading: true, error: null, title: '', message: '' })
        const userID = id;
        const currentPass = password;
        const newPass = newPassword;
        const reEnterNewPass = reEnterNewPassword; // Corrected variable name
        try {
            if (currentPass === '' || newPass === '' || reEnterNewPass === '') {
                set({ loading: false, error: true, title: 'Error', message: 'Please fill up all fields' })
            } else if (newPass !== reEnterNewPass) {
                set({ loading: false, error: true, title: 'Error', message: 'Passwords do not match' })
            } else if (currentPass === newPass) {
                set({ loading: false, error: true, title: 'Error', message: 'New password cannot be the same as the old password' })
            } else {
                const response = await axios.patch(`https://resibo-react-1.onrender.com/customer/change/password`, { userID, currentPass, newPass }, {
                    headers: {
                        'Authorization': token
                    }
                })
                set({ loading: false, error: true, title: response.data.title, message: response.data.msg }) 
            }
        } catch (error: any) {
            set({ loading: false, error: true, title: 'Error', message: error.response.data.msg })
        }
    },
    insertData: async(data, token) => {
        set({ loading: true, error: null, title: '', message: '' })
        try {
            const response = await axios.patch('https://resibo-react-1.onrender.com/customer/edit', data, {
                headers: {
                    'Authorization': token
                }
            })
            set({ loading: false, error: true, title: response.data.title, message: response.data.msg })
        } catch (error: any) {
            set({ loading: false, error: true, title: 'Error', message: error.response.data.msg })
        }
    },
    closeError: () => set({ error: false, title: '', message: '' })
}))