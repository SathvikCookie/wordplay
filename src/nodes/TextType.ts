import type { NativeTypeName } from '../native/NativeConstants';
import { TEXT_SYMBOL } from '@parser/Symbols';
import type Locale from '@translation/Locale';
import Language from './Language';
import NativeType from './NativeType';
import type { Replacement } from './Node';
import Token from './Token';
import TokenType from './TokenType';
import type TypeSet from './TypeSet';
import Emotion from '../lore/Emotion';
import { TEXT_DELIMITERS } from '../parser/Tokenizer';

/** Any string or a specific string, depending on whether the given token is an empty text literal. */
export default class TextType extends NativeType {
    readonly text: Token;
    readonly format?: Language;

    constructor(text: Token, format?: Language) {
        super();

        this.text = text;
        this.format = format;

        this.computeChildren();
    }

    static make(format?: Language) {
        return new TextType(new Token(TEXT_SYMBOL, TokenType.Text), format);
    }

    getGrammar() {
        return [
            { name: 'text', types: [Token] },
            { name: 'format', types: [Language, undefined] },
        ];
    }

    clone(replace?: Replacement) {
        return new TextType(
            this.replaceChild('text', this.text, replace),
            this.replaceChild('format', this.format, replace)
        ) as this;
    }

    computeConflicts() {}

    acceptsAll(types: TypeSet): boolean {
        // For this to accept the given type, it must accept all possible types.
        return types.list().every((type) => {
            // If the possible type is not text, it is not acceptable.
            if (!(type instanceof TextType)) return false;
            // If:
            // 1) this accepts any text, or its accepts specific text that matches the given type's text.
            // 2) this has no required format, or they have matching formats
            return (
                (this.getUnquotedText() === '' ||
                    this.getUnquotedText() === type.getUnquotedText()) &&
                (this.format === undefined ||
                    (type.format !== undefined &&
                        this.format.isEqualTo(type.format)))
            );
        });
    }

    isLiteral() {
        return this.getUnquotedText().length > 0;
    }

    /** Strip the delimiters from the token to get the text literal that defines this type. */
    getUnquotedText() {
        let text = this.text.getText();
        if (text.length === 0) return '';
        const first = text.charAt(0);
        if (first in TEXT_DELIMITERS) {
            const close = TEXT_DELIMITERS[first];
            text = text.substring(1);
            if (text.charAt(text.length - 1) === close)
                text = text.substring(0, text.length - 1);
        }
        return text;
    }

    getNativeTypeName(): NativeTypeName {
        return 'text';
    }

    getNodeLocale(translation: Locale) {
        return translation.node.TextType;
    }

    getGlyphs() {
        return {
            symbols: this.text.getDelimiters(),
            emotion: Emotion.Excited,
        };
    }
}
