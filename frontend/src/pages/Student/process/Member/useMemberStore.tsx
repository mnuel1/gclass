import { create } from 'zustand';
import { Member } from './memberType';


interface MemberState {
    member: Member[],
    getMember: (member : Member[]) => void
}

const useMemberStore = create<MemberState>((set) => ({
    member: [],
   
    getMember: (member) => {
        set(() => ({
            member: [...member],
        }))
    },
   
}))

export default useMemberStore