export interface ParseOptions {
    darkMode?: boolean;
    className?: string;
}
export declare class MicroCMSRichParser {
    private options;
    constructor(options?: ParseOptions);
    parse(htmlContent: string): string;
    private processElement;
    private processParagraph;
    private processBlockquote;
    private processHorizontalRule;
    private processLink;
    private generateCSS;
}
export declare function parseMicroCMSHTML(htmlContent: string, options?: ParseOptions): string;
export default MicroCMSRichParser;
//# sourceMappingURL=index.d.ts.map