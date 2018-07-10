

export class Tag {
    public tagName: string;
    public createdDate?: string; // used for querying pouchdb with .alldocs start and endkey --> no use to get docs without the tags when filtering on tag

   
    constructor(tagName: string, createdDate?: string) {
        this.tagName = tagName;
        if(createdDate)
        {
            this.createdDate = createdDate;
        }
    }

    public getTagName() {
        return this.tagName;
    } 

    public getCreatedDate(): string {
        return this.createdDate;
    }

} 