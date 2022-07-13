import type AccessName from "../nodes/AccessName";
import type Alias from "../nodes/Alias";
import type BinaryOperation from "../nodes/BinaryOperation";
import type Bind from "../nodes/Bind";
import type Block from "../nodes/Block";
import type Borrow from "../nodes/Borrow";
import type Cell from "../nodes/Cell";
import type Column from "../nodes/Column";
import type Conditional from "../nodes/Conditional";
import type Conversion from "../nodes/Conversion";
import type CustomType from "../nodes/CustomType";
import type CustomTypeType from "../nodes/CustomTypeType";
import type Delete from "../nodes/Delete";
import type Docs from "../nodes/Docs";
import type Evaluate from "../nodes/Evaluate";
import type Expression from "../nodes/Expression";
import type Function from "../nodes/Function";
import type FunctionType from "../nodes/FunctionType";
import type Insert from "../nodes/Insert";
import type List from "../nodes/List";
import type ListAccess from "../nodes/ListAccess";
import type Name from "../nodes/Name";
import type NameType from "../nodes/NameType";
import type Row from "../nodes/Row";
import type Select from "../nodes/Select";
import type SetAccess from "../nodes/SetAccess";
import type SetOrMap from "../nodes/SetOrMap";
import type Share from "../nodes/Share";
import type Stream from "../nodes/Stream";
import type TableType from "../nodes/TableType";
import type Token from "../nodes/Token";
import type Type from "../nodes/Type";
import type TypeVariable from "../nodes/TypeVariable";
import type Unparsable from "../nodes/Unparsable";
import type Update from "../nodes/Update";

export default abstract class Conflict {
    readonly #minor: boolean;
    constructor(minor: boolean) { this.#minor = minor; }
    isMinor() { return this.#minor; }
    toString() { return this.constructor.name; }
}

export class UnparsableConflict extends Conflict {
    readonly unparsable: Unparsable;
    constructor(unparsable: Unparsable) {
        super(false);
        this.unparsable = unparsable;
    }
}

export class ExpectedLanguage extends Conflict {
    readonly alias: Alias;
    constructor(alias: Alias) {
        super(false);
        this.alias = alias;
    }
}

export class UnknownProperty extends Conflict {
    readonly access: AccessName;
    constructor(access: AccessName) {
        super(false);
        this.access = access;
    }
}

export class UnknownName extends Conflict {
    readonly name: Name;
    constructor(name: Name) {
        super(false);
        this.name = name;
    }
}

export class UnexpectedTypeVariable extends Conflict {
    readonly name: Name;
    constructor(name: Name) {
        super(false);
        this.name = name;
    }
}

export class IncompatibleOperatorType extends Conflict {
    readonly expr: Expression;
    readonly operator: Token;
    readonly expectedType: Type;
    constructor(expr: Expression, op: Token, expectedType: Type) {
        super(false);
        this.expr = expr;
        this.operator = op;
        this.expectedType = expectedType;
    }
}

export class IncompatibleUnits extends Conflict {
    readonly binary: BinaryOperation;
    constructor(binary: BinaryOperation) {
        super(false);
        this.binary = binary;
    }
}

export class LeftToRightOrderOfOperations extends Conflict {
    readonly binary: BinaryOperation;
    constructor(binary: BinaryOperation) {
        super(true);
        this.binary = binary;
    }
}

export class DuplicateAliases extends Conflict {
    readonly bind: Bind;
    constructor(bind: Bind) {
        super(false);
        this.bind = bind;
    }
}

export class DuplicateNames extends Conflict {
    readonly func: CustomType | Function;
    constructor(func: CustomType | Function) {
        super(false);
        this.func = func;
    }
}

export class DuplicateTypeVariables extends Conflict {
    readonly func: CustomType | Function;
    constructor(func: CustomType | Function) {
        super(false);
        this.func = func;
    }
}

export class RequiredAfterOptional extends Conflict {
    readonly func: Function | CustomType;
    constructor(func: Function | CustomType) {
        super(false);
        this.func = func;
    }
}

export class IncompatibleBind extends Conflict {
    readonly type: Type;
    readonly value: Expression;
    constructor(type: Type, value: Expression) {
        super(false);
        this.type = type;
        this.value = value;
    }
}

export class NotAFunction extends Conflict {
    readonly evaluate: Evaluate;
    constructor(evaluate: Evaluate) {
        super(false);
        this.evaluate = evaluate;
    }
}

export class NotInstantiable extends Conflict {
    readonly evaluate: Evaluate;
    constructor(evaluate: Evaluate) {
        super(false);
        this.evaluate = evaluate;
    }
}

export class IncompatibleInputs extends Conflict {
    readonly func: FunctionType | CustomTypeType;
    readonly evaluate: Evaluate;
    constructor(func: FunctionType | CustomTypeType, evaluate: Evaluate) {
        super(false);
        this.func = func;
        this.evaluate = evaluate;
    }
}


export class DuplicateBinds extends Conflict {
    readonly bind: Bind;
    readonly duplicates: (Expression | Bind | TypeVariable)[];
    constructor(bind: Bind, duplicates: (Expression | Bind | TypeVariable)[]) {
        super(false);
        this.bind = bind;
        this.duplicates = duplicates;
    }
}

export class UnusedBind extends Conflict {
    readonly bind: Bind;
    constructor(bind: Bind) {
        super(true);
        this.bind = bind;
    }
}

export class UnknownBorrow extends Conflict {
    readonly borrow: Borrow;
    constructor(borrow: Borrow) {
        super(false);
        this.borrow = borrow;
    }
}

export class DuplicateLanguages extends Conflict {
    readonly docs: Docs[];
    constructor(docs: Docs[]) {
        super(false);
        this.docs = docs;
    }
}

export class MisplacedConversion extends Conflict {
    readonly conversion: Conversion;
    constructor(conversion: Conversion) {
        super(false);
        this.conversion = conversion;
    }
}

export class UnknownConversion extends Conflict {
    readonly expr: Expression;
    readonly expectedType: Type;
    constructor(expr: Expression, expectedType: Type) {
        super(false);
        this.expr = expr;
        this.expectedType = expectedType;
    }
}

export class ExpectedBooleanCondition extends Conflict {
    readonly conditional: Conditional;
    constructor(conditional: Conditional) {
        super(false);
        this.conditional = conditional;
    }
}

export class ExpectedMatchingConditionalTypes extends Conflict {
    readonly conditional: Conditional;
    constructor(conditional: Conditional) {
        super(false);
        this.conditional = conditional;
    }
}

export class NotATable extends Conflict {
    readonly op: Insert | Select | Delete | Update;
    constructor(op: Insert | Select | Delete | Update) {
        super(false);
        this.op = op;
    }
}

export class NonBooleanQuery extends Conflict {
    readonly op: Select | Delete | Update;
    constructor(op: Select | Delete | Update) {
        super(false);
        this.op = op;
    }
}

export class MissingColumns extends Conflict {
    readonly insert: Insert;
    constructor(insert: Insert) {
        super(false);
        this.insert = insert;
    }
}

export class ExpectedUpdateBind extends Conflict {
    readonly cell: Cell;
    constructor(cell: Cell) {
        super(false);
        this.cell = cell;
    }
}

export class ExpectedInsertExpression extends Conflict {
    readonly cell: Bind;
    constructor(cell: Bind) {
        super(false);
        this.cell = cell;
    }
}

export class IncompatibleCellType extends Conflict {
    readonly type: TableType;
    readonly cell: Cell;
    constructor(type: TableType, cell: Cell) {
        super(false);
        this.type = type;
        this.cell = cell;
    }
}

export class ExpectedSelectName extends Conflict {
    readonly cell: Cell;
    constructor(cell: Cell) {
        super(false);
        this.cell = cell;
    }
}

export class UnknownColumn extends Conflict {
    readonly type: TableType;
    readonly cell: Cell;
    constructor(type: TableType, cell: Cell) {
        super(false);
        this.type = type;
        this.cell = cell;
    }
}

export class ExpectedColumnType extends Conflict {
    readonly column: Column;
    constructor(column: Column) {
        super(false);
        this.column = column;
    }
}

export class MissingCells extends Conflict {
    readonly row: Row;
    constructor(row: Row) {
        super(false);
        this.row = row;
    }
}

export class MisplacedShare extends Conflict {
    readonly share: Share;
    constructor(share: Share) {
        super(false);
        this.share = share;
    }
}

export class MissingShareLanguages extends Conflict {
    readonly share: Share;
    constructor(share: Share) {
        super(false);
        this.share = share;
    }
}

export class UnknownTypeName extends Conflict {
    readonly name: NameType;
    constructor(name: NameType) {
        super(false);
        this.name = name;
    }
}

export class IncompatibleKey extends Conflict {
    readonly access: SetAccess;
    constructor(access: SetAccess) {
        super(false);
        this.access = access;
    }
}

export class NotAStream extends Conflict {
    readonly stream: Stream;
    constructor(stream: Stream) {
        super(false);
        this.stream = stream;
    }
}

export class IncompatibleStreamValues extends Conflict {
    readonly stream: Stream;
    constructor(stream: Stream) {
        super(false);
        this.stream = stream;
    }
}

export class NotASetOrMap extends Conflict {
    readonly set: SetOrMap;
    constructor(set: SetOrMap) {
        super(false);
        this.set = set;
    }
}

export class IncompatibleValues extends Conflict {
    readonly structure: SetOrMap | List;
    constructor(set: SetOrMap | List) {
        super(false);
        this.structure = set;
    }
}

export class NotAListIndex extends Conflict {
    readonly access: ListAccess;
    constructor(access: ListAccess) {
        super(false);
        this.access = access;
    }
}

export class IgnoredExpression extends Conflict {
    readonly expr: Expression;
    constructor(expr: Expression) {
        super(false);
        this.expr = expr;
    }
}

export class ExpectedBindValue extends Conflict {
    readonly bind: Bind;
    constructor(bind: Bind) {
        super(false);
        this.bind = bind;
    }
}

export class ExpectedEndingExpression extends Conflict {
    readonly block: Block;
    constructor(block: Block) {
        super(false);
        this.block = block;
    }
}
