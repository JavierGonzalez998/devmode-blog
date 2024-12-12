"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type PostsStore,
  createPostsStore,
} from "@/lib/zustand/strores/postsStore";

export type PostsStoreApi = ReturnType<typeof createPostsStore>;

export const PostsStoreContext = createContext<
  PostsStoreApi | undefined
>(undefined);

export interface PostsStoreProviderProps {
  children: ReactNode;
}

export const PostsStoreProvider = ({
  children,
}: PostsStoreProviderProps) => {
  const storeRef = useRef<PostsStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createPostsStore();
  }

  return (
    <PostsStoreContext.Provider value={storeRef.current}>
      {children}
    </PostsStoreContext.Provider>
  );
};

export const usePostsStore = <T,>(
  selector: (store: PostsStore) => T,
): T => {
  const sidebarStoreContext = useContext(PostsStoreContext);

  if (!sidebarStoreContext) {
    throw new Error(
      `usePostsStore must be used within PostsStoreProvider`,
    );
  }

  return useStore(sidebarStoreContext, selector);
};
