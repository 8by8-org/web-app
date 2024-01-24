import { UserType } from "./UserType";

export type User = {
  name:string;
  avatar:'1' | '2' | '3' | '4';
  type:UserType;
  registeredVoter:boolean;
  notifyElectionReminders:boolean;
  startedChallenge:boolean;
  playerReward:string;
  playerState:string;
}