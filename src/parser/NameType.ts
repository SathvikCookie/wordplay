import Conflict from "./Conflict";
import CustomType from "./CustomType";
import type Program from "./Program";
import { SemanticConflict } from "./SemanticConflict";
import type { Token } from "./Token";
import Type from "./Type";

export default class NameType extends Type {

    readonly type: Token;

    constructor(type: Token) {
        super();

        this.type = type;
    }

    getChildren() {
        return [ this.type ];
    }

    getConflicts(program: Program): Conflict[] { 
        
        const conflicts = [];

        const type = this.getType(program);
        // The name should be defined.
        if(type === undefined)
            conflicts.push(new Conflict(this, SemanticConflict.UNDEFINED_NAME));
        // The name should be a custom type.
        else if(!(type instanceof CustomType))
            conflicts.push(new Conflict(this, SemanticConflict.NOT_A_TYPE));

        return conflicts; 
    
    }

    isCompatible(type: Type): boolean {    
        return type instanceof NameType && this.type.text === type.type.text;
    } 

    getType(program: Program): Type | undefined {

        // The name should be defined.
        const definition = program.getBindingEnclosureOf(this)?.getDefinition(program, this, this.type.text);
        if(definition === undefined) return undefined;
        // The name should be a custom type.
        return definition.getType(program);

    }
    
}