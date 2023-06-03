declare function createDiagonalPattern1(color: string): CanvasPattern | null;
declare function createDiagonalPattern2(color: string): CanvasPattern | null;
declare function createDiagonalPattern3(color: string): CanvasPattern | null;
declare function readCookie(key: string): string;
declare function callApi(url: string, data: string, authorization: any): Promise<unknown>;
declare const exportFunctions: {
    callApi: typeof callApi;
    validateName: (name: string) => boolean;
    readCookie: typeof readCookie;
    timeSince: (date: number) => string;
    createDiagonalPattern1: typeof createDiagonalPattern1;
    createDiagonalPattern2: typeof createDiagonalPattern2;
    createDiagonalPattern3: typeof createDiagonalPattern3;
};
export default exportFunctions;
//# sourceMappingURL=util.d.ts.map