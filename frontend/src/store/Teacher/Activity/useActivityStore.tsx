import { create } from 'zustand';
import { Activities } from '../../../types/activityType';


interface ActivityState {
    activity: Activities,
    getActivity: (activity : Activities) => void
}

const useActivityStore = create<ActivityState>((set) => ({
    activity: {},

    getActivity: (activity) => {
        set(() => ({
            activity: {...activity},
        }))
    },
}))

export default useActivityStore