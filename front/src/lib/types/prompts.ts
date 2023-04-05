export interface Prompt {
    id: string;
    type: "user" | "assistant";
    prompt: string;
    created_at: string;
    updated_at: string;
}