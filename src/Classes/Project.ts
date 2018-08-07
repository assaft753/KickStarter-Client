import { SecondaryImage } from "./SecondaryImage";
import { Donator } from "./Donator";


export class Project implements IProject {

    id: number;
    user_id: number;
    project_name: string;
    idea: string;
    description: string;
    desire_amount: number;
    days: number;
    hours: number;
    created_date: number;
    donation: number;
    primary_image: string;
    days_to_go: string;
    secondary_images: SecondaryImage[];
    video: string;
    donators: Donator[];

    constructor(id: number,
        user_id: number,
        project_name: string,
        idea: string,
        description: string,
        desire_amount: number,
        days: number,
        hours: number,
        created_date: number,
        donation: number,
        primary_image: string,
        secondary_images: SecondaryImage[],
        video: string,
        donators: Donator[],
        days_to_go: string) {
        this.id = id;
        this.user_id = user_id;
        this.project_name = project_name;
        this.idea = idea;
        this.description = description;
        this.desire_amount = desire_amount;
        this.days = days;
        this.hours = hours;
        this.created_date = created_date;
        this.donation = donation;
        this.primary_image = primary_image;
        this.secondary_images = secondary_images;
        this.video = video;
        this.donators = donators;
        this.days_to_go = days_to_go;
    }

}

export interface IProject {
    id: number;
    user_id: number;
    project_name: string;
    idea: string;
    description: string;
    desire_amount: number;
    days: number;
    hours: number;
    created_date: number;
    donation: number;
    primary_image: string;
    secondary_images: SecondaryImage[];
    video: string;
    donators: Donator[];
    days_to_go: string;
}