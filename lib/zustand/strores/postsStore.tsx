import { createStore } from "zustand/vanilla";
import { getPosts, addPost as NewPost, SetPublish, EditPublish, DeletePublish } from "@/actions/posts-actions";

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
        description: string;
        content: string;
        published: boolean;
        authorId: number;
        createdAt: Date;
        updatedAt: Date | null;
    })[]
};

export type PostsActions = {
    getAllPosts: () => void,
    addPost: (data: {title:string; description:string; idCat: number, content: string, email: string}) => Promise<{success: boolean, error: undefined} | {success: undefined, error:string}>,
    setPostState: (id:number, state:boolean) => Promise<{success: boolean, error: undefined} | {success: undefined, error:string}>,
    editPost: (id:number, data:{title:string, description:string; content:string, idCat: number, email:string}) => Promise<{success: boolean, error: undefined} | {success: undefined, error:string}>,
    deletePost: (id:number) => Promise<{success: boolean, error: undefined} | {success: undefined, error:string}>
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
    addPost: async(data: {title:string; description:string; idCat: number, content: string, email: string}) => {
        const {getAllPosts} = get()
        try{
           const success = await NewPost(data)
           console.log(success)
           if(success.success){
            getAllPosts()
            return {success: true}
           }
           return {error: "No se pudo agregar un nuevo post, intente nuevamente"}
        }catch(error){
            console.log(error)
            return {error: "error 500"}
        }
    },
    setPostState:async(id:number, state:boolean) => {
        const {getAllPosts} = get()
        const response = await SetPublish(id, state)
        getAllPosts()
        return response
    },
    editPost:async(id:number, data:{title:string, description:string; content:string, idCat: number, email:string}) =>{
        const {getAllPosts} = get()
        const response = await EditPublish(id, data);
        getAllPosts();
        return response;
    },
    deletePost: async(id:number) => {
        const {getAllPosts} = get()
        const response = await DeletePublish(id)
        getAllPosts()
        return response
    }

}))};
