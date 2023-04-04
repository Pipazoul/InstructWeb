import { get, writable } from 'svelte/store';
export const modal = writable(false);
export const loginModal = writable(false);
import PocketBase from 'pocketbase';
import {PUBLIC_POCKETBASE_URL} from '$env/static/public'

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const currentUser = writable(pb.authStore.model);
export const currentConversationTree = writable([]);

pb.authStore.onChange(() => {
    currentUser.set(pb.authStore.model);
});


export async function watchUserChange() {
    const getUser = await pb.collection("users").getOne(get(currentUser).id, {});
    currentUser.set(getUser);
    // subscribe to the user data
    pb.collection("users").subscribe('*', async ({action,  record}) => {
        if (action === "update") {
            currentUser.set(record);
        }
    });   
}

export async function watchConversationTreeChange() {
    const initialConversationTree = await pb.collection("conversationsTree").getFullList();

    currentConversationTree.set(initialConversationTree);
    // subscribe to the user data
    pb.collection("conversationsTree").subscribe('*', async ({action,  record}) => {
        if (action === "update") {
            currentConversationTree.set(get(currentConversationTree).map(conversationTree => {
                if (conversationTree.id === record.id) {
                    return record;
                }
                return conversationTree;
            }));
        }
        if (action === "create") {
            currentConversationTree.set([...get(currentConversationTree), record]);
        }
        if (action === "delete") {
            currentConversationTree.set(get(currentConversationTree).filter(conversationTree => conversationTree.id !== record.id));
        }
    });   
}