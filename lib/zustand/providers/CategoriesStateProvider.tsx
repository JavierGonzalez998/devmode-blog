"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type CategoryStore,
  createCategoryStore,
} from "@/lib/zustand/strores/CategoriesStore";

export type CategoryStoreApi = ReturnType<typeof createCategoryStore>;

export const CategoryStoreContext = createContext<
  CategoryStoreApi | undefined
>(undefined);

export interface CategoryStoreProviderProps {
  children: ReactNode;
}

export const CategoryStoreProvider = ({
  children,
}: CategoryStoreProviderProps) => {
  const storeRef = useRef<CategoryStoreApi>(undefined);
  if (!storeRef.current) {
    storeRef.current = createCategoryStore();
  }

  return (
    <CategoryStoreContext.Provider value={storeRef.current}>
      {children}
    </CategoryStoreContext.Provider>
  );
};

export const useCategoryStore = <T,>(
  selector: (store: CategoryStore) => T,
): T => {
  const sidebarStoreContext = useContext(CategoryStoreContext);

  if (!sidebarStoreContext) {
    throw new Error(
      `useCategoryStore must be used within CategoryStoreProvider`,
    );
  }

  return useStore(sidebarStoreContext, selector);
};
