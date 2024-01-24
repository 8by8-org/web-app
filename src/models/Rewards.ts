export type Rewards = Array<{
  businessDescription:string;
  businessLink:string;
  businessType:string;
  locationDescription:"Online" | "In Person";
  locationType:"Online" | "In Person";
  logo:string;
  name:string;
  redemptionDescription:string;
  rewardAvailable:boolean;
  rewardConditions:string;
  rewardDescription:string;
  rewardEndDate:Date | undefined;
  rewardLink:string;
  rewardStartDate:Date;
  rewardType:"Online" | "In Person";
}>
