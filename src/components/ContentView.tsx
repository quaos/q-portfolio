import { Marked } from "../deps/markdown.ts";
import React, { DynamicComponent, useMemo, useState } from "../deps/react.ts";
import {
  Transformer,
  TransformerContext,
  TransformerEvent,
} from "../deps/html_react_transformer.ts";

import { ExternalLink } from "./ExternalLink.tsx";
import { Icon } from "./Icon.tsx";
export interface ContentViewProps {
  className?: string;
  Component?: DynamicComponent;
  currentHostname?: string;
  htmlContent?: string;
  id?: string;
  markdownContent?: string;
  title?: string;
}

export const ContentView = ({
  children,
  className,
  Component = "article",
  currentHostname,
  htmlContent,
  id,
  markdownContent,
  title,
}: React.PropsWithChildren<ContentViewProps>) => {
  const [errors, setErrors] = useState<Error[]>([]);

  const collectError = (err: Error) => {
    setErrors([...errors, err]);
  };

  const HtmlRenderer = useMemo(() => {
    const transformer = new Transformer({
      maxDepth: 20,
    });

    // transformer.on(TransformerEvent.Error, (ctx: TransformerContext) => {
    //   ctx.errors.forEach(console.error);
    //   setErrors(ctx.errors);
    // });
    transformer.on(TransformerEvent.Element, (ctx: TransformerContext) => {
      if (ctx.component === "a") {
        const { href } = ctx.props as React.AnchorHTMLAttributes<
          HTMLAnchorElement
        >;
        const targetUrl = new URL(href || "#");
        const isExternal = (!currentHostname) ||
          (targetUrl.host !== currentHostname);
        if (isExternal) {
          ctx.component = ExternalLink;
        }
      }
    });

    return transformer.getComponent(React);
  }, []);

  const renderedHtmlContent = useMemo(() =>
    htmlContent || (
      markdownContent ? Marked.parse(markdownContent).content : undefined
    ), [htmlContent, markdownContent]);

  return (
    <Component id={id} className={`main-content ${className}`}>
      {(title) ? <h2>{title}</h2> : null}
      {((errors) && (errors.length >= 1))
        ? (
          <div className="error">
            {errors.map((err: Error) => <p>{err.message || `${err}`}</p>)}
          </div>
        )
        : null}
      {renderedHtmlContent
        ? <HtmlRenderer source={renderedHtmlContent} onError={collectError} />
        : children}
      {
        /* {(htmlContent)
                ? <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                : children} */
      }
    </Component>
  );
};
