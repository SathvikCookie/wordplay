import type Context from '@nodes/Context';
import type Expression from '@nodes/Expression';
import NodeLink from '@translation/NodeLink';
import type Locale from '@translation/Locale';
import Conflict from './Conflict';

export default class ExpectedUpdateBind extends Conflict {
    readonly cell: Expression;

    constructor(cell: Expression) {
        super(false);
        this.cell = cell;
    }

    getConflictingNodes() {
        return {
            primary: {
                node: this.cell,
                explanation: (translation: Locale, context: Context) =>
                    translation.conflict.ExpectedUpdateBind.primary(
                        new NodeLink(this.cell, translation, context)
                    ),
            },
        };
    }
}
