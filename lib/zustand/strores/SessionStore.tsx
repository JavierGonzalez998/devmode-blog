import { createStore } from "zustand/vanilla";
import { Session } from "next-auth";
import { GetSession } from "@/actions/get-session";

export type SessionState = {
    session: Session | null
};

export type SessionActions = {
    getSession: () => void
};

export type SessionStore = SessionState & SessionActions;

export const defaultInitState: SessionState = {
  session: null
};

export const createSessionStore = (
  initState: SessionState = defaultInitState,
) => {
  return createStore<SessionStore>()((set) => ({
    ...initState,
    getSession: async() => {
        const session = await GetSession()
        set({session})
    }
}))};
