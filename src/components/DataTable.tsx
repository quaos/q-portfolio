import { React } from "../deps/react.ts";

import { useStyles } from "../context/styles.tsx";

export interface DataTableConfigProps<T> {
    columns: ColumnType<T>[];
    withHeader?: boolean;
    header?: PartConfigProps<T>;
    body?: PartConfigProps<T>;
    footer?: PartConfigProps<T>;
    elementId?: string;
    className?: string;
}

export interface DataTableRenderContext<T> {
    data: T[];
}

export interface DataTableProps<T>
    extends DataTableConfigProps<T>, DataTableRenderContext<T> {}

export enum PartType {
    Header = "HEADER",
    Body = "BODY",
    Footer = "FOOTER"
}

export interface ColumnConfigProps<T> {
    name: string;
    title?: string;
    source?: string | CellSourceFunction<T>;
    renderer?: CellRendererFunction<T>;
    headerRenderer?: CellRendererFunction<T>;
    footerRenderer?: CellRendererFunction<T>;
}
export type ColumnType<T> = string | ColumnConfigProps<T>;

export interface CellSourceFunction<T> {
    (rowData: T, context: CellRenderContext<T>, config: CellConfigProps<T>): any;
}

export interface CellRendererFunction<T> {
    (
        cell: any,
        context: CellRenderContext<T>,
        config: CellConfigProps<T>,
    ): React.ReactNode;
}

export function DataTable<T>({
    data,
    columns,
    withHeader = true,
    header,
    body,
    footer,
    elementId,
    className,
}: DataTableProps<T>) {
    const { styles } = useStyles();

    const tableProps = {
        id: elementId,
        className: className ?? "table table-responsive",
        style: styles.DataTable,
    };

    let headerProps = (withHeader || header)
        ? (header || useDefaultHeaderProps(columns))
        : undefined;
    let bodyProps = body;
    let footerProps = footer;
    
    return (
        <table {...tableProps} >
        {(headerProps) && (
            <Part
                {...headerProps} 
                partType={PartType.Header}
                columns={columns}
                tableData={data}
                Component="thead"
                CellComponent="th" />
        )}
            <Part
                {...bodyProps} 
                partType={PartType.Body}
                columns={columns}
                tableData={data}
                Component="tbody"
                CellComponent="td" />
        {(footerProps) && (
            <Part
                {...footerProps}
                partType={PartType.Footer}
                columns={columns}
                tableData={data}
                Component="tfoot"
                CellComponent="td" />
        )}
        </table>
    )
}

export interface PartConfigProps<T> {
    numRows?: number;
    elementId?: string;
    className?: string;
}

export interface PartRenderContext<T> {
    partType: PartType;
    columns: ColumnType<T>[];
    tableData: T[];
}

export interface PartProps<T>
    extends PartConfigProps<T>, PartRenderContext<T> {
}

export function Part<T>({
    partType,
    columns,
    numRows = 1,
    tableData,
    Component = "thead",
    CellComponent = "th",
    elementId,
    className,
}: React.Props<PartProps<T>>) {
    const { styles } = useStyles();

    const partProps = {
        id: elementId,
        className,
        style: styles.DataTablePart,
    };

    let isHeaderOrFooter = false;
    switch (partType) {
        case PartType.Header:
            isHeaderOrFooter = true;
            partProps.className = partProps.className ?? "table-part table-header container";
            break;
        case PartType.Footer:
            isHeaderOrFooter = true;
            partProps.className = partProps.className ?? "table-part table-footer container";
            break;
        case PartType.Body:
            partProps.className = partProps.className ?? "table-part table-body container";
            break;
        default:
            break;
    }

    if (isHeaderOrFooter) {
        return (
            <Component {...partProps} >
            {[ ...Array(numRows) ].map((_row, rowIdx) => (
                <Row
                    key={`row_${rowIdx}`}
                    partType={partType}
                    rowData={undefined}
                    rowIdx={rowIdx}
                    columns={columns}
                    tableData={tableData}
                    CellComponent={CellComponent} />
            ))}
            </Component>
        );
    }

    return (
        <Component {...partProps} >
        {(tableData) && tableData.map((rowData: T, rowIdx: number) => (
            <Row
                key={`row_${rowIdx}`}
                partType={partType}
                rowData={rowData}
                rowIdx={rowIdx}
                columns={columns}
                tableData={tableData}
                CellComponent={CellComponent} />
        ))}
        </Component>
    )
}

export interface RowConfigProps<T> {
    Component?: string;
    CellComponent?: string;
    className?: string;
};

export interface RowRenderContext<T> extends PartRenderContext<T> {
    rowData: T;
    rowIdx: number;
}

export interface RowProps<T> extends RowConfigProps<T>, RowRenderContext<T> {}

export function Row<T>({
    rowData,
    rowIdx,
    partType,
    columns,
    tableData,
    Component = "tr",
    CellComponent,
    className,
}: React.Props<RowProps<T>>) {
    const rowCtx = {
        rowData,
        rowIdx,
        partType,
        columns,
        tableData,
    };
    const rowConfig = {
        Component,
        CellComponent,
        className,
    };
    const rowProps = {
        className: className ?? "table-row row",
    };

    return (
        <tr {...rowProps} >
        {columns.map((column: any, colIdx: number) => {
            const cellCtx = {
                ...rowCtx,
                cellData: undefined,
                colIdx,
                column,
            };
            const cellConfig = {
                Component: CellComponent,
            };

            const sourceImpl = ((column.source) && (typeof column.source === "function"))
                ? column.source
                : useDefaultDataCellSource();
            const cellData = sourceImpl(rowData, cellCtx, cellConfig);

            return (
                <Cell 
                    key={`cell_${rowIdx}_${colIdx}`}
                    cellData={cellData}
                    colIdx={colIdx}
                    column={column}
                    rowData={rowData}
                    rowIdx={rowIdx}
                    partType={partType}
                    columns={columns}
                    tableData={tableData}
                    Component={CellComponent} />
            )
        })}
        </tr>
    )
}

export interface CellConfigProps<T> {
    Component?: string;
    className?: string;
}

export interface CellRenderContext<T> extends RowRenderContext<T> {
    cellData: any;
    colIdx: number;
    column: ColumnType<T>;
}

export interface CellProps<T> extends CellConfigProps<T>, CellRenderContext<T> {}

export function Cell<T>({
    cellData,
    colIdx,
    column,
    rowData,
    rowIdx,
    partType,
    columns,
    tableData,
    Component = "td",
    className,
}: React.Props<CellProps<T>>) {
    const cellCtx = {
        cellData,
        colIdx,
        column,
        rowData,
        rowIdx,
        partType,
        columns,
        tableData,
    };
    const cellConfig = {
        Component,
    };
    const cellProps = {
        className: className ?? "table-cell",
    };

    if (column) {
        let renderer: CellRendererFunction<T> | undefined;
        switch (partType) {
            case PartType.Header:
                renderer = column.headerRenderer;
                break;
            case PartType.Footer:
                renderer = column.footerRenderer;
                break;
            default:
                renderer = column.renderer;
                break;
        }
        if (renderer) {
            return renderer(cellData, cellCtx, cellConfig);
        }
    }

    let valueStr = ((typeof cellData !== "undefined") && (cellData !== null))
        ? `${cellData}` : "";
            
    return (
        <Component {...cellProps}>{valueStr}</Component>
    )
}

function useDefaultHeaderProps<T>(columns: (ColumnType<T | undefined>)[]) {
    return {
        columns,
        source: useDefaultHeaderCellSource<T>(),
        Component: "thead",
        CellComponent: "th",
    }
}

function useDefaultHeaderCellSource<T>() {
    return (
        _rowData: T,
        ctx: CellRenderContext<T>,
        _config: CellConfigProps<T>,
    ) => {
        if (typeof ctx.column === "string") {
            return ctx.column;
        }

        return ctx.column.title ?? ctx.column.name
    }
}

function useDefaultDataCellSource<T>() {
    return (
        rowData: T,
        ctx: CellRenderContext<T>,
        _config: CellConfigProps<T>,
    ) => {
        if ((!rowData) || (!ctx.column)) {
            return undefined;
        }

        if (typeof ctx.column === "string") {
            return (ctx.column in rowData)
                ? (rowData as any)[ctx.column] : undefined; 
        }

        if (typeof ctx.column.source === "string") {
            return (ctx.column.source in rowData)
                ? (rowData as any)[ctx.column.source] : undefined;
        }

        return (ctx.column.name in rowData)
            ? (rowData as any)[ctx.column.name] : undefined
    }
}
