
export class Site {
    [x: string]: any;
   

    constructor(
        public id: any,
        public fournisseur: any,
        public idRegion: number,
        public libelleSite: any,
        public miseEnSceneDate: Date,
        public surface: any,
        public nbCellule: number,
        public secteur: any,
        public delegation: any,
        public nbAntenne: 2,
        public technologie: any,
        public hba: any,
        public x: any,
        public y: any,
        public support: any,
       
    ) { }
}
