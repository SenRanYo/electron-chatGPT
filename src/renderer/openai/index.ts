import { db } from "../db"
import { defaultModel } from "./constants"
import { OpenAIApi, Configuration, ChatCompletionRequestMessage, ConfigurationParameters } from "openai"

export class OpenAI {
  config: Configuration
  openai!: OpenAIApi
  constructor(config: ConfigurationParameters) {
    this.config = new Configuration(config)
  }

  create() {
    this.openai = new OpenAIApi(this.config)
    return this.openai
  }
}

function openClient(apiKey: string) {
  const configuration = new Configuration({ apiKey })
  return new OpenAIApi(configuration)
}

export async function createChat(apiKey: string, messages: ChatCompletionRequestMessage[]): Promise<any> {
  const settings = await db.settings.get("general")
  const model = settings?.model ?? defaultModel

  const client = openClient(apiKey)
  return client.createChatCompletion({
    model,
    stream: false,
    messages
  })
}

export async function checkOpenAIKey(apiKey: string): Promise<any> {
  return createChat(apiKey, [
    {
      role: "user",
      content: "hello"
    }
  ])
}
