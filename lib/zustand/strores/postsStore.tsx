import { createStore } from "zustand/vanilla";
import { getPosts } from "@/actions/posts-actions";

export type PostsState = {
    Posts:({
        categories: {
            id: number;
            name: string;
            description: string;
            slug: string;
        };
    } & {
        id: number;
        title: string;
        content: string;
        categoryId: number;
        published: boolean;
        authorId: number;
        createdAt: Date;
        updatedAt: Date | null;
    })[]
};

export type PostsActions = {
    getAllPosts: () => void
};

export type PostsStore = PostsState & PostsActions;

export const defaultInitState: PostsState = {
    Posts: []
};

export const createPostsStore = (
  initState: PostsState = defaultInitState,
) => {
  return createStore<PostsStore>()((set) => ({
    ...initState,
    getAllPosts:async() => {
        const posts = await getPosts();
        if(posts){
          set({Posts: posts})  
        }
    }

}))};
