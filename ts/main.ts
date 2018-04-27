document.onload = () => console.log( "Le document est prêt" );
let PromesseDocumentPret = new Promise( (resolve) => {
    if(document.readyState === "complete") {
        resolve();
    } else {
        document.onreadystatechange = () => document.readyState==="complete"?resolve():null;
    }
});
/***********************************************************************************************************************
 * Fonction qui renvoie le minimum de deux nombres
 */
function min(a: number, b: number) : number {
    return Math.min(a,b);
}
LogTests("Fonction qui renvoie le minimum de deux nombres", min, [
    {args: [17, 27], expectedResult: 17},
    {args: [17, 15], expectedResult: 15},
]);

/***********************************************************************************************************************
 * Fonction qui trie des nombres par ordre croissant
 */
function triCroissant(...L : number[]) : number[] {
    return [];
}
LogTests("Fonction qui trie des nombres par ordre croissant", triCroissant, [
    {args: [59, 51, 63, 95, 64, -38, -21, -6, 16, 44], expectedResult: [-38, -21, -6, 16, 44, 51, 59, 63, 64, 95]},
    {args: [23, 29, -12, -23, 40, -4, -40, -60, -98, -52], expectedResult: [-98, -60, -52, -40, -23, -12, -4, 23, 29, 40]},
    {args: [], expectedResult: []}
]);

/***********************************************************************************************************************
 * Fonction qui trie des nombres par ordre décroissant
 */
function triDécroissant(...L : number[]) : number[] {
    return [];
}
LogTests("Fonction qui trie des nombres par ordre décroissant", triDécroissant, [
    {args: [59, 51, 63, 95, 64, -38, -21, -6, 16, 44], expectedResult: [95, 64, 63, 59, 51, 44, 16, -6, -21, -38]},
    {args: [23, 29, -12, -23, 40, -4, -40, -60, -98, -52], expectedResult: [40, 29, 23, -4, -12, -23, -40, -52, -60, -98]},
    {args: [10], expectedResult: [10]},
    {args: [], expectedResult: []}
]);

/***********************************************************************************************************************
 * Fonction qui somme
 */
function Somme(...L : number[]) : number {
    return NaN;
}
LogTests("Fonction qui somme", Somme, [
    {args: [59, 51, 63, 95, 64, -38, -21, -6, 16, 44], expectedResult: 327},
    {args: [23, 29, -12, -23, 40, -4, -40, -60, -98, -52], expectedResult: -197},
    {args: [10], expectedResult: 10},
    {args: [], expectedResult: new Error("Impossible de sommer un tableau vide"), errorExpected: true}
]);


/***********************************************************************************************************************
 * Fonction qui fait la moyenne
 */
function Moyenne(...L  : number[]) : number {
    return NaN;
}
LogTests("Fonction qui fait la moyenne", Moyenne, [
    {args: [59, 51, 63, 95, 64, -38, -21, -6, 16, 44], expectedResult: 32.7},
    {args: [23, 29, -12, -23, 40, -4, -40, -60, -98, -52], expectedResult: -19.7},
    {args: [10], expectedResult: 10},
    {args: [], expectedResult: new Error("Impossible de faire la moyenne d'un tableau vide"), errorExpected: true}
]);

/***********************************************************************************************************************
 * Fonction qui renvoie les nombres strictement supérieurs à un certain seuil
 * et triés par ordre croissant
 */
function NombresSupérieursA(min: number, notes : number[]) : number[] {
    return [];
}
LogTests("Les nombres strictement supérieurs à un certain seuil", NombresSupérieursA, [
    {args: [10, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [16,44,51,59,63,64,95]},
    {args: [20, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [44,51,59,63,64,95]},
    {args: [50, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [51,59,63,64,95]},
    {args: [50, [23, 29, -12, -23, 40, -4, -40, -60, -98, -52]], expectedResult: []},
    {args: [10, []], expectedResult: []}
]);

/***********************************************************************************************************************
 * Fonction qui renvoie les nombres strictement compris entre une valeur minimale et une valeur maximale
 * et triés par ordre croissant
 */
function NombresComprisEntre(min: number, max: number, notes : number[]) : number[] {
    return [];
}
LogTests("Les nombres strictement compris entre une valeur minimale et maximale", NombresComprisEntre, [
    {args: [10, 20, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [16]},
    {args: [0, 100, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [16,44,51,59,63,64,95]},
    {args: [10, 20, [23, 29, -12, -23, 40, -4, -40, -60, -98, -52]], expectedResult: []},
    {args: [10, 20, []], expectedResult: []}
]);




/***********************************************************************************************************************
 * Codez une classe Monceau implémentant l'ensemble des fonctions demandées.
 */






















/***********************************************************************************************************************
 * Utilitaires
 */
function assertEqual<T>(a:T, b:T) : boolean {
    switch(typeof a) {
        case "object":
            return JSON.stringify(a) === JSON.stringify(b);
        default:
            return a === b;
    }
}

const template = `
<hr/>
<h2></h2>
<table>
    <caption></caption>
    <thead>
        <th>Inputs</th>
        <th>Output</th>
        <th>Expected output</th>
    </thead>
    <tbody></tbody>
</table>
`;

type Assertion = {args: any[], expectedResult: any, errorExpected? : boolean};
function LogTests(title: string, fct: (...A) => any, assertions : Assertion[]) : void {
    PromesseDocumentPret.then( () => LogTestsOK(title, fct, assertions) );
}
function LogTestsOK(title: string, fct: (...A) => any, assertions : Assertion[]) : void {
    let section = document.createElement( "section" ),
        nbCorrects = 0,
        exceptionTriggered : boolean;
    section.innerHTML = template;
    section.querySelector( "h2" ).textContent = title;
    let tbody = section.querySelector( "tbody" );
    for( let {args, expectedResult, errorExpected} of assertions ) {
        let tr  = document.createElement( "tr" );
        let res;
        try {
            res = fct.apply(null, args);
            exceptionTriggered = false;
        } catch(err) {
            res = err;
            exceptionTriggered = true;
        }
        let tdI = document.createElement( "td" ); tr.appendChild( tdI ); tdI.textContent = JSON.stringify( args );
        let tdO = document.createElement( "td" ); tr.appendChild( tdO ); tdO.textContent = JSON.stringify( res );
        let tdE = document.createElement( "td" ); tr.appendChild( tdE ); tdE.textContent = JSON.stringify( expectedResult );
        if( assertEqual(res, expectedResult) && (typeof errorExpected === "undefined" || exceptionTriggered === errorExpected) ) {
            tr.classList.add( "correct" );
            nbCorrects++;
        } else {
            tr.classList.add( "incorrect" );
        }
        tbody.appendChild( tr );
    }
    section.querySelector( "caption" ).textContent = `Recap: ${nbCorrects} / ${assertions.length}`;
    document.body.appendChild( section );
}
