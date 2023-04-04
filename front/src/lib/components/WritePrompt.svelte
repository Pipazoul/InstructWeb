<script lang="ts">
    import { pb, currentConversationTree } from "$lib/store";
    import type {PromptsRecord, ConversationsTreeRecord} from "$lib/types/pocketbase-types";
    import ConfirmModal from "./misc/ConfirmModal.svelte";
    import Notifications from "./misc/Notification.svelte";

    let message: string;
    let progress: number = 0;
    let progressColor: string = "progress-success";
    let openModal: boolean = false;
    let modalConfirmStatus: boolean = false;
    let notificationMsg: string = "";
    let notificationType: string = "success";
    let showNotification: boolean = false;

    export let writeToTree: boolean = false;
    export let treeNumber: number = 0;
    export let conversationTreeId: string = "";
    export let promptType = "user";


    const updateProgress = () => {
        progress = message.length;
        if (progress > 120) {
            progressColor = "progress-error";
        } else if (progress > 90) {
            progressColor = "progress-warning";
        } else {
            progressColor = "progress-success";
        }
    };

    const handleConfirm = async () => {
        if(writeToTree){
            console.log("write to tree");
            const data: PromptsRecord = {
                type: promptType,
                prompt: message,
            }
            const record = await pb.collection('prompts').create(data);
            const conversationTree = await pb.collection('conversationsTree').getOne(conversationTreeId);
            if(treeNumber === 1){
                conversationTree.tree_1 = [...conversationTree.tree_1, record.id];
            }
            else if(treeNumber === 2){
                conversationTree.tree_2 = [...conversationTree.tree_2, record.id];
            }
            else if(treeNumber === 3){
                conversationTree.tree_3 = [...conversationTree.tree_3, record.id];
            }
            else if(treeNumber === 4){
                conversationTree.tree_4 = [...conversationTree.tree_4, record.id];
            }
            await pb.collection('conversationsTree').update(conversationTreeId, conversationTree);
            message = "";
            notificationMsg = "Votre prompt a bien été envoyé";
            notificationType = "success";
            showNotification = true;
            console.log("confirm");

        }
        else{
            const data: PromptsRecord = {
            type: promptType,
            prompt: message,
            }
            const record = await pb.collection('prompts').create(data);


            // create a conversationTree and add the promptid in initPrompt
            const conversationTree: ConversationsTreeRecord = {
                initPrompt: record.id,
            }
            const conversation = await pb.collection('conversationsTree').create(conversationTree);

            message = "";
            notificationMsg = "Votre prompt a bien été envoyé";
            notificationType = "success";
            showNotification = true;
            console.log("confirm");
        }
        
    };
    
    const handleCancel = () => {
        console.log("cancel");
    };
</script>
<section class="w-full mt-4">
    <Notifications message={notificationMsg} type={notificationType} showNotification={showNotification} />
    <ConfirmModal bind:openModal={openModal} on:cancel={() => handleCancel()} on:confirm={() => handleConfirm()} />
    <textarea class="textarea textarea-primary w-full h-44" placeholder="Ecrire votre message ici" bind:value={message} on:input={updateProgress}></textarea>
    <progress class="progress {progressColor} w-full" value={progress} max="140"></progress>
    <button class="btn btn-primary w-full mt-4" on:click={() => openModal=true}>Envoyer</button>
</section>