import {StaticImageData} from "next/image";

export class Partner {
    static key = 0;

    partnerName:string;
    partnerLink:string;
    partnerImg:StaticImageData | null | string;
    partnerType:string;
    partnerLoc:string;
    partnerID:number;

    constructor(name:string, link:string, img:StaticImageData | null, type:string, location:string) {
        this.partnerName = name;
        this.partnerLink = link;
        this.partnerImg = img;
        this.partnerType = type;
        this.partnerLoc = location;
        this.partnerID = Partner.key++;
    }
}