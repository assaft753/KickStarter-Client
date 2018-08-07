import { Project } from "./Project";


export class Projects implements IProjects {
    live: number;
    go: number;
    projects: Project[];
    constructor(projects: Project[] = [], live: number = 0, go: number = 0) {
        this.live = live;
        this.go = go;
        this.projects = projects;
    }

}

export interface IProjects {
    live: number;
    go: number;
    projects: Project[];
}