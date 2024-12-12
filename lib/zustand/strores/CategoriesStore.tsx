import { createStore } from "zustand/vanilla";
import { getCategories, addCategories, editCategories, deleteCategories } from "@/actions/categories-actions";
export type CategoryState = {
    categories: {
        id: number;
        name: string;
        description: string;
        slug: string;
    }[] | null
};

export type CategoryActions = {
    getCategories: () => void
    addCategories: (data: {title:string; description:string; slug:string}) => Promise<{success:boolean} | null>
    editCategories: (id:number, data:{title:string; description:string; slug:string}) => Promise<{success:boolean} | null>
    deleteCategories: (id: number) => Promise<{success:boolean} | null>
};

export type CategoryStore = CategoryState & CategoryActions;

export const defaultInitState: CategoryState = {
    categories: null
};

export const createCategoryStore = (
  initState: CategoryState = defaultInitState,
) => {
  return createStore<CategoryStore>()((set, get) => ({
    ...initState,
    getCategories: async() => {
        const categories = await getCategories()
        if(categories){
            set({categories})
        }
    },
    addCategories: async(data:{title:string; description:string; slug:string}) => {
        const{success} = await addCategories(data)
        if(success){
            const {getCategories} = get()
            getCategories()
            return {success}
        }
        return null
    } ,
    editCategories: async(id:number, data:{title:string; description:string; slug:string}) => {
        const{success} = await editCategories(id,data)
        if(success){
            const {getCategories} = get()
            getCategories()
            return {success}
        }
        return null
    },
    deleteCategories: async(id:number) => {
        const{success} = await deleteCategories(id)
        if(success){
            const {getCategories} = get()
            getCategories()
            return {success}
        }
        return null
    }       
}))};
