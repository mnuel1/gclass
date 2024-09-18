import { create } from 'zustand';
import { Member } from './memberType';


interface MemberState {
    member: Member[],
    assignedMember: Member[],
    getMember: (member : Member[]) => void
    getAssignedMember: (member : Member[]) => void
}

const useMemberStore = create<MemberState>((set) => ({
    member: [],
    assignedMember: [],

    getMember: (member) => {
        set(() => ({
            member: [...member],
        }))
    },

    getAssignedMember: (member) => {
        set(() => ({
            assignedMember: [...member],
        }))
    },
}))

export default useMemberStore