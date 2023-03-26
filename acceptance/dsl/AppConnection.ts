import {UserDriver} from "./UserDriver";

export interface AppConnection {
  createUserDriver(): UserDriver
  stop(): Promise<void>
}
