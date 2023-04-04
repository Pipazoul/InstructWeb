/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	ConversationsTree = "conversationsTree",
	Prompts = "prompts",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ConversationsTreeRecord = {
	initPrompt?: RecordIdString
	tree_1?: RecordIdString[]
	tree_2?: RecordIdString[]
	tree_3?: RecordIdString[]
	tree_4?: RecordIdString[]
}

export enum PromptsTypeOptions {
	"user" = "user",
	"assistant" = "assistant",
}
export type PromptsRecord = {
	type?: PromptsTypeOptions
	prompt?: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ConversationsTreeResponse<Texpand = unknown> = ConversationsTreeRecord & BaseSystemFields<Texpand>
export type PromptsResponse = PromptsRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	conversationsTree: ConversationsTreeRecord
	prompts: PromptsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	conversationsTree: ConversationsTreeResponse
	prompts: PromptsResponse
	users: UsersResponse
}