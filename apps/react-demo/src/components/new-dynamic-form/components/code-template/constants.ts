import { TreeSelectProps } from 'antd'
import { editor } from 'monaco-editor'
import monaco from 'monaco-editor'

const registerLanguage = (
  languages: monaco.languages.ILanguageExtensionPoint,
  fn?: () => void
) => {
  monaco.languages.register(languages)
  fn?.()
}

const golangTemplate = () => {
  monaco.languages.setMonarchTokensProvider('golangTemplate', {
    defaultToken: '',
    tokenPostfix: '.gotmpl',

    brackets: [
      { open: '{{', close: '}}', token: 'delimiter.curly' },
      { open: '(', close: ')', token: 'delimiter.parenthesis' },
      { open: '[', close: ']', token: 'delimiter.square' },
      { open: '{', close: '}', token: 'delimiter.brace' },
    ],

    keywords: [
      'if',
      'else',
      'range',
      'end',
      'with',
      'template',
      'define',
      'block',
      'and',
      'or',
      'not',
      'eq',
      'ne',
      'lt',
      'le',
      'gt',
      'ge',
    ],

    operators: [
      '=',
      '||',
      '&&',
      '!',
      '<',
      '>',
      '|',
      ':',
      '.',
      ',',
      '+',
      '-',
      '*',
      '/',
      '%',
      '^',
    ],

    symbols: /[=><!~?:&|+\-*\/\^%]+/,

    tokenizer: {
      root: [
        [/{{-?/, { token: 'delimiter.curly', next: '@templateExpression' }],
        [/[{}()[\]]/, '@brackets'],
        [/\/\*/, { token: 'comment', next: '@comment' }],
        [/\/\//, { token: 'comment', next: '@lineComment' }],
        [/./, 'text'],
      ],

      templateExpression: [
        [/-?}}/, { token: 'delimiter.curly', next: '@pop' }],
        { include: 'expression' },
      ],

      expression: [
        [/\s+/, 'white'],
        [/[{}()[\]]/, '@brackets'],
        [/\|/, 'operator'],
        [/(if|else|range|end|with|template|define|block)\b/, 'keyword.control'],
        [/(and|or|not)\b/, 'keyword.operator'],
        [/(eq|ne|lt|le|gt|ge)\b/, 'keyword.operator'],
        [/\.[\w.]+/, 'variable.property'], // New rule for {{.xxx.xxx}} format
        [/\$[\w]+/, 'variable.predefined'],
        [/[a-zA-Z_]\w*(?=\()/, 'function'],
        [/[a-zA-Z_]\w*/, 'variable'],
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
        [
          /'/,
          { token: 'string.quote', bracket: '@open', next: '@string_single' },
        ],
        [
          /`/,
          { token: 'string.quote', bracket: '@open', next: '@string_backtick' },
        ],
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/\d+/, 'number'],
        [/[;,.]/, 'delimiter'],
        [/[=+\-*/%^&|!<>]/, 'operator'],
      ],

      string: [
        [/[^"]+/, 'string'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
      ],

      string_single: [
        [/[^']+/, 'string'],
        [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
      ],

      string_backtick: [
        [/[^`]+/, 'string'],
        [/`/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
      ],

      comment: [
        [/[^/*]+/, 'comment'],
        [/\*\//, { token: 'comment', next: '@pop' }],
        [/./, 'comment'],
      ],

      lineComment: [
        [/[^//]+/, 'comment'],
        [/$/, { token: 'comment', next: '@pop' }],
      ],
    },
  })

  monaco.languages.setLanguageConfiguration('golangTemplate', {
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
      ['{{', '}}'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '{{', close: '}}' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: '`', close: '`' },
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '{{', close: '}}' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: '`', close: '`' },
    ],
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/'],
    },
  })
}

export const registerVariableCompletionProvider = (
  editor: editor.IStandaloneCodeEditor,
  referenceTreeData: TreeSelectProps['treeData'] = []
) => {
  registerLanguage({ id: 'golangTemplate' }, golangTemplate)
  return monaco.languages.registerCompletionItemProvider('golangTemplate', {
    provideCompletionItems: (model, position) => {
      if (model.uri.toString() === editor.getModel()?.uri.toString()) {
        const word = model.getWordUntilPosition(position)
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        }

        const flatTreeData = (data: TreeSelectProps['treeData']) => {
          const result: any[] = []
          const processNode = (node: any) => {
            if (node.children) {
              node.children.forEach((child: any) => {
                processNode(child)
              })
            } else {
              result.push(node)
            }
          }
          data?.forEach((node) => {
            processNode(node)
          })
          return result
        }

        const variables = flatTreeData(referenceTreeData)

        return {
          suggestions: variables.map((variable, index) => ({
            label: variable.title,
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: `{{${variable.value}}}`,
            range: range,
            sortText: index.toString().padStart(5, '0'),
            detail: variable.dataType,
            documentation: {
              value: `Variable from node: ${variable.title}\nData Type: ${variable.dataType}`,
              isTrusted: true,
            },
          })),
        }
      }
    },
  })
}
