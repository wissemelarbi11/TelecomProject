
export class Site {

    constructor(
        public id: any,
        public idPhysique: number,
        public idLogique: number,
        public idArchive: number,
        public idTechnologie: number,
        public idRegion: number,
        public libelleSite: any,
        public miseEnSceneDate: Date,
        public surface: any,
        public nbCellule: number, 
        public secteur : any,
        public delegation: any,
    ) { }
}
