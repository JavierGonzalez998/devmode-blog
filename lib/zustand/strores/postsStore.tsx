import { createStore } from "zustand/vanilla";
import { getPosts, addPost as NewPost, SetPublish } from "@/actions/posts-actions";

export type PostsState = {
    Posts:({
        categories: {
            id: number;
            name: string;
            description: string;
            slug: string;
        }[];
    } & {
        id: number;
        title: string;
        content: string;
        published: boolean;
        authorId: number;
        createdAt: Date;
        updatedAt: Date | null;
    })[]
};

export type PostsActions = {
    getAllPosts: () => void,
    addPost: (data: {title:string; idCat: number, content: string, email: string}) => Promise<{success: boolean, error: undefined} | {success: undefined, error:string}>,
    setPostState: (id:number, state:boolean) => Promise<{success: boolean, error: undefined} | {success: undefined, error:string}>
};

export type PostsStore = PostsState & PostsActions;

export const defaultInitState: PostsState = {
    Posts: []
};

export const createPostsStore = (
  initState: PostsState = defaultInitState,
) => {
  return createStore<PostsStore>()((set,get) => ({
    ...initState,
    getAllPosts:async() => {
        const posts = await getPosts();
        if(posts){
          set({Posts: posts})  
        }
    },
    addPost: async(data: {title:string; idCat: number, content: string, email: string}) => {
        const {getAllPosts} = get()
        try{
           const success = await NewPost(data)
           if(success.success){
            getAllPosts()
            return {success: true}
           }
           return {error: "No se pudo agregar un nuevo post, intente nuevamente"}
        }catch(error){
            return {error: "error 500"}
        }
    },
    setPostState:async(id:number, state:boolean) => {
        const {getAllPosts} = get()
        const response = await SetPublish(id, state)
        getAllPosts()
        return response

    }

}))};
