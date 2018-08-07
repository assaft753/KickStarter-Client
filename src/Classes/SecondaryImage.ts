
export class SecondaryImage implements ISecondaryImage {
    image_name: string;
    constructor(image_name: string) {
        this.image_name = image_name;
    }

}

export interface ISecondaryImage {
    image_name: string;
}