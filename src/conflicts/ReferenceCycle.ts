import type Context from '@nodes/Context';
import type Reference from '@nodes/Reference';
import NodeLink from '@translation/NodeLink';
import type Locale from '@translation/Locale';
import Conflict from './Conflict';

export default class ReferenceCycle extends Conflict {
    readonly name: Reference;

    constructor(name: Reference) {
        super(true);

        this.name = name;
    }

    getConflictingNodes() {
        return {
            primary: {
                node: this.name,
                explanation: (translation: Locale, context: Context) =>
                    translation.conflict.ReferenceCycle.primary(
                        new NodeLink(
                            this.name,
                            translation,
                            context,
                            this.name.getName()
                        )
                    ),
            },
        };
    }
}
