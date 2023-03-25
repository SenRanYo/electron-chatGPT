import Dexie, { Table } from "dexie"

export interface Chat {
  id: string
  title: string
  tokens: number
  createdAt: Date | undefined
}

export interface Message {
  id: string
  chatId: string
  role: "ai" | "user"
  content: string
  createdAt: Date | undefined
}

export interface Prompt {
  id: string
  title: string
  content: string
  createdAt: Date | undefined
}

export interface Setting {
  id: "all"
  key?: string
  model?: string
}

export class DataBase extends Dexie {
  chats!: Table<Chat>
  messages!: Table<Message>
  prompts!: Table<Prompt>
  settings!: Table<Setting>

  constructor() {
    super("chatgpt")
    this.version(1).stores({
      chats: "id, createdAt",
      messages: "id, chatId, createdAt",
      prompts: "id, createdAt",
      settings: "id"
    })

    this.on("populate", async () => {
      db.settings.add({
        id: "all"
      })
    })
  }
}

export const db = new DataBase()
