import type { Token } from "./Token";
import Expression from "./Expression";
import type Row from "./Row";
import type Program from "./Program";
import Conflict from "./Conflict";
import type Type from "./Type";
import UnknownType from "./UnknownType";
import type Unparsable from "./Unparsable";
import { SemanticConflict } from "./SemanticConflict";
import Name from "./Name";
import TableType from "./TableType";
import type ColumnType from "./ColumnType";

export default class Select extends Expression {
    
    readonly table: Expression;
    readonly select: Token;
    readonly row: Row;
    readonly query: Expression | Unparsable;

    constructor(table: Expression, select: Token, row: Row, query: Expression | Unparsable) {
        super();

        this.table = table;
        this.select = select;
        this.row = row;
        this.query = query;

    }

    getChildren() { return [ this.table, this.select, this.row, this.query ]; }

    getConflicts(program: Program): Conflict[] { 
        
        const conflicts: Conflict[] = [];

        // The columns in a select must be names.
        this.row.cells.forEach(cell => {
            if(!(cell.expression instanceof Name))
                conflicts.push(new Conflict(cell, SemanticConflict.SELECT_COLUMNS_MUST_BE_NAMES))
        });

        // The columns named must be names in the table's type.
        const tableType = this.table.getType(program);
        if(tableType instanceof TableType) {
            this.row.cells.forEach(cell => {
                const cellName = cell.expression instanceof Name ? cell.expression : undefined; 
                if(!(cellName !== undefined && tableType.getColumnNamed(cellName.name.text) !== undefined))
                    conflicts.push(new Conflict(cell, SemanticConflict.UNKNOWN_TABLE_COLUMN))
            });
        }

        return conflicts;
    
    }

    getType(program: Program): Type {

        // Get the table type and find the rows corresponding the selected columns.
        const tableType = this.table.getType(program);
        if(!(tableType instanceof TableType)) return new UnknownType(this);

        // For each cell in the select row, find the corresponding column type in the table type.
        // If we can't find one, return unknown.
        const columnTypes = this.row.cells.map(cell => {
            const column = cell.expression instanceof Name ? tableType.getColumnNamed(cell.expression.name.text) : undefined; 
            return column === undefined ? undefined : column;
        });
        if(columnTypes.find(t => t === undefined)) return new UnknownType(this);

        return new TableType(columnTypes as ColumnType[]);

    }

}