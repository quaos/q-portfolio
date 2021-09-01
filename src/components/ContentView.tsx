import { Marked } from "../deps/markdown.ts";
import { React } from "../deps/react.ts";
import { Transformer, TransformerContext, TransformerEvent } from "../deps/html_react_transformer.ts";

import { ExternalLink } from "./ExternalLink.tsx";
import { Icon } from "./Icon.tsx";
export interface ContentViewProps {
    title?: string;
    htmlContent?: string;
    markdownContent?: string;
    currentHostname?: string;
    Component?: string;
    elementId?: string;
    className?: string;
}

export const ContentView = ({
    title,
    htmlContent,
    markdownContent,
    currentHostname,
    Component = "article",
    elementId,
    className,
    children,
}: React.PropsWithChildren<ContentViewProps>) => {
    let [errors, setErrors] = React.useState<Error[]>([]);

    const HtmlRenderer = React.useMemo(() => {
        const _transformer = new Transformer({
            maxDepth: 20,
        });

        _transformer.on(TransformerEvent.Errors, (ctx: TransformerContext) => {
            ctx.errors.forEach(console.error);
            setErrors(ctx.errors);
        });
        _transformer.on(TransformerEvent.Element, (ctx: TransformerContext) => {
            if (ctx.component === "a") {
                let { href } = ctx.props;
                const targetUrl = new URL(href);
                const isExternal = (!currentHostname) || (targetUrl.host !== currentHostname);
                if (isExternal) {
                    ctx.component = ExternalLink;
                }
            }
        });

        return _transformer.getComponent(React);
    }, []);

    if ((!htmlContent)
        && (markdownContent)) {
        htmlContent = Marked.parse(markdownContent).content;
    }

    return (
        <Component id={elementId} className={`main-content ${className}`}>
            {(title) ? <h2>{title}</h2> : null}
            {((errors) && (errors.length >= 1))
                ? <div className="error">{errors.map((err: Error) => <p>{err.message || `${err}`}</p>)}</div>
                : null}
            {(htmlContent)
                ? <HtmlRenderer source={htmlContent} />
                : children}
            {/* {(htmlContent)
                ? <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                : children} */}
        </Component>
    )
};
