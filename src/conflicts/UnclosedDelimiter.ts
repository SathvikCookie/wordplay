import Conflict from './Conflict';
import type Node from '@nodes/Node';
import type Token from '@nodes/Token';
import type Locale from '@translation/Locale';
import NodeLink from '@translation/NodeLink';
import type Context from '@nodes/Context';

export default class UnclosedDelimiter extends Conflict {
    readonly open: Token;
    readonly node: Node;
    readonly expected: Token;

    constructor(node: Node, open: Token, expected: Token) {
        super(true);

        this.open = open;
        this.node = node;
        this.expected = expected;
    }

    getConflictingNodes() {
        return {
            primary: {
                node: this.open,
                explanation: (translation: Locale, context: Context) =>
                    translation.conflict.UnclosedDelimiter.primary(
                        new NodeLink(
                            this.open,
                            translation,
                            context,
                            this.open.getText()
                        ),
                        new NodeLink(
                            this.expected,
                            translation,
                            context,
                            this.expected.getText()
                        )
                    ),
            },
        };
    }
}
