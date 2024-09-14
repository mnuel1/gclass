import { create } from 'zustand'
import axios from 'axios'
type userAccountType = {
    id: number;
    name: string;
    business_name: string;
    tin1: string;
    tin2: string;
    tin3: string;
    contact_number: string;
    address: string;
    email: string;
}

type userAccountProps = {
    userAccountProfile: userAccountType
    error: boolean | null;
    loading: boolean;
    title:string;
    message: string;
    fetchData: (getID:string, token:string) => void;
    updatePassword: (token: string, id: string, password:string, newPassword: string, reEnterNewPassowrd: string) => void;
    insertData: (data: userAccountType, token: string) => void;
    closeError: () => void;
}

export const useAccountStore = create<userAccountProps>((set) => ({
    userAccountProfile: {
        id: 0,
        name: '',
        business_name: '',
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
    fetchData: async (getID, token) => {
        set({ loading: true, error: null, title: '', message: '' })
        try {
            const response = await axios.get(`https://resibo-react-1.onrender.com/user/get/${getID}`, {
                headers: {
                    'Authorization': token
                }
            })
            const data = response.data.userData
            const tinParts = data.tin.split('-');
            data.tinParts = tinParts;
            set({ loading: false, error: null, title: '', message: '', userAccountProfile: {
                id: data.id,
                name: data.name,
                business_name: data?.business_name || 'Not Provided',
                tin1: data.tinParts[0],
                tin2: data.tinParts[1],
                tin3: data.tinParts[2],
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
                const response = await axios.patch(`https://resibo-react-1.onrender.com/user/change/password`, { userID, currentPass, newPass }, {
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
        const formattedData = {
            userID: data.id,
            name: data.name,
            business_name: data.business_name,
            tin: `${data.tin1}-${data.tin2}-${data.tin3}`,
            contact_number: data.contact_number,
            address: data.address,
            email: data.email
        }
        try {
        
            const response = await axios.patch('https://resibo-react-1.onrender.com/user/edit', formattedData, {
                headers: {
                    'Authorization': token,
                }
            })
            set({ 
                loading: false, 
                error: true, 
                title: response.data.title, 
                message: response.data.msg,
                userAccountProfile: {
                    id: data.id,
                    name: data.name,
                    business_name: data.business_name,
                    tin1: data.tin1,
                    tin2: data.tin2,
                    tin3: data.tin3,
                    contact_number: data.contact_number,
                    address: data.address,
                    email: data.email
                }
            })
        } catch (error: any) {
            set({ loading: false, error: true, title: 'Error', message: error.response.data.msg })
        }
    },
    closeError: () => set({ error: false, title: '', message: '' })
}))