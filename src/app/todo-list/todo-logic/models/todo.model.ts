export class Todo {
    id: number;
    title: string;
    description: string;
    deleted: boolean;

    constructor(id: number, title: string, description: string, deleted:boolean) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.deleted = deleted;
      }
}
