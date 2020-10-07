/*@internal*/
namespace ts {
    /**
     * Transforms Emoji Syntax.
     */
    export function transformEmoji(context: TransformationContext) {
        const {
            factory,
        } = context;

        return chainBundle(context, transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }
            const visited = visitEachChild(node, visitor, context);
            addEmitHelpers(visited, context.readEmitHelpers());
            return visited;
        }

        function visitor(node: Node): VisitResult<Node> {
            if (!(node.transformFlags & TransformFlags.ContainsEmoji)) return node;

            switch (node.kind) {
                case SyntaxKind.NumericLiteral:
                    return visitNumericLiteral(node as NumericLiteral);
            }
            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a Braille numeric literal.
         *
         * @param node A string literal.
         */
        function visitNumericLiteral(node: NumericLiteral) {
            if (node.numericLiteralFlags & TokenFlags.BrailleSpecifier) {
                return setTextRange(factory.createNumericLiteral(node.text), node);
            }
            return node;
        }
    }
}
