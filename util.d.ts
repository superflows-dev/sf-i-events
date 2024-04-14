declare function createDiagonalPattern1(color: string): CanvasPattern | null;
declare function createDiagonalPattern2(color: string): CanvasPattern | null;
declare function createDiagonalPattern3(color: string): CanvasPattern | null;
declare function readCookie(key: string): string;
declare function callApi(url: string, data: string, authorization: any): Promise<unknown>;
declare function getRandomColor(): string;
declare function isInteger(value: string): boolean;
declare function clearListeners(old_element: HTMLElement): Node;
declare const exportFunctions: {
    clearListeners: typeof clearListeners;
    isInteger: typeof isInteger;
    callApi: typeof callApi;
    validateName: (name: string) => boolean;
    readCookie: typeof readCookie;
    timeSince: (date: number) => string;
    createDiagonalPattern1: typeof createDiagonalPattern1;
    createDiagonalPattern2: typeof createDiagonalPattern2;
    createDiagonalPattern3: typeof createDiagonalPattern3;
    getRandomColor: typeof getRandomColor;
};
export default exportFunctions;
//# sourceMappingURL=util.d.ts.map