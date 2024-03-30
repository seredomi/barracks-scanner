type rankType = "PVT" | "PV2" | "PFC" | "SPC" | "CPL" | "SGT" | "SSG" | "SFC" | "MSG" | "1SG" | "SGM" | "CSM" | "WO1" | "CW2" | "CW3" | "CW4" | "CW5" | "2LT" | "1LT" | "CPT" | "MAJ" | "LTC" | "COL" | "BG" | "MG" | "LTG" | "GEN" | "GA" | "CIV" | "CTR";
type groupType = "Resident" | "Hotel Divarty" | "Rotational Unit" | "Chain of Command" | "Guest"; 

export class Person {
    id: string
    rank: rankType;
    last: string;
    first: string;
    room: string;
    group: groupType;
    // TODO: change to date type
    leaveDate: string;
    found: boolean;

    constructor(personObj: any) {
        this.id = personObj.id;
        this.rank = personObj.rank;
        this.last = personObj.last;
        this.first = personObj.first;
        this.room = personObj.room;
        this.group = personObj.group;
        this.leaveDate = personObj.leave_date;
        this.found = personObj.found;
    }
}

export const emptyPerson= new Person({
    id: "", rank: "", last: "", first: "", room: "", group: "", leave_date: "", found: false
})