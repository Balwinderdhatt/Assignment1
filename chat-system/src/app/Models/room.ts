export class Room{
  id: number;
  name: string;
  groupId: number;
  constructor(id: number, name:string, groupId:number){
    this.id = id;
    this.name = name;
    this.groupId = groupId;
  }
}