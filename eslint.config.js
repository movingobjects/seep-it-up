import { fileURLToPath } from 'node:url';
import path from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.vite/**',
      '**/*.min.js',
      '**/coverage/**',
    ],
  },
  js.configs.recommended,
  ...compat.plugins(
    'react',
    'react-hooks',
    'modules-newlines',
  ),
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      '@stylistic': stylistic,
      import: importPlugin,
    },
    languageOptions: {
      globals: {
        // Browser globals
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly',
        // Node.js globals
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: {
          extensions: [
            '.js',
            '.jsx',
            '.mjs',
          ],
        },
      },
      'import/internal-regex': '^@/',
    },
    rules: {
      // Vite/React specific
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Stylistic rules
      '@stylistic/array-bracket-newline': ['warn', { multiline: true }],
      '@stylistic/array-bracket-spacing': ['warn', 'never'],
      '@stylistic/array-element-newline': [
        'warn',
        {
          multiline: true,
          minItems: 3,
        },
      ],
      '@stylistic/arrow-parens': ['warn', 'always'],
      '@stylistic/arrow-spacing': [
        'warn',
        {
          before: true,
          after: true,
        },
      ],
      '@stylistic/block-spacing': ['warn', 'always'],
      '@stylistic/brace-style': ['warn', '1tbs'],
      '@stylistic/comma-dangle': ['warn', 'always-multiline'],
      '@stylistic/comma-spacing': [
        'warn',
        {
          before: false,
          after: true,
        },
      ],
      '@stylistic/comma-style': ['warn', 'last'],
      '@stylistic/computed-property-spacing': ['warn', 'never'],
      '@stylistic/curly-newline': ['warn', { minElements: 1 }],
      '@stylistic/dot-location': ['warn', 'property'],
      '@stylistic/eol-last': ['warn', 'never'],
      '@stylistic/function-call-argument-newline': ['warn', 'consistent'],
      '@stylistic/function-call-spacing': ['warn', 'never'],
      '@stylistic/function-paren-newline': ['warn', 'consistent'],
      '@stylistic/implicit-arrow-linebreak': ['warn', 'beside'],
      '@stylistic/indent-binary-ops': ['warn', 2],
      '@stylistic/indent': ['warn', 2],
      '@stylistic/jsx-quotes': ['warn', 'prefer-double'],
      '@stylistic/key-spacing': [
        'warn',
        {
          beforeColon: false,
          afterColon: true,
          mode: 'strict',
        },
      ],
      '@stylistic/keyword-spacing': [
        'warn',
        {
          before: true,
          after: true,
        },
      ],
      '@stylistic/linebreak-style': ['warn', 'unix'],
      '@stylistic/lines-between-class-members': [
        'warn',
        'always',
        { exceptAfterSingleLine: true },
      ],
      '@stylistic/new-parens': ['warn', 'always'],
      '@stylistic/newline-per-chained-call': ['warn'],
      '@stylistic/no-confusing-arrow': ['warn'],
      '@stylistic/no-extra-semi': ['warn'],
      '@stylistic/no-floating-decimal': ['warn'],
      '@stylistic/no-mixed-operators': ['warn'],
      '@stylistic/no-mixed-spaces-and-tabs': ['warn'],
      '@stylistic/no-multi-spaces': ['warn'],
      '@stylistic/no-multiple-empty-lines': [
        'warn',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0,
        },
      ],
      '@stylistic/no-tabs': ['warn'],
      '@stylistic/no-trailing-spaces': ['warn'],
      '@stylistic/no-whitespace-before-property': ['warn'],
      '@stylistic/nonblock-statement-body-position': ['warn', 'beside'],
      '@stylistic/object-curly-newline': [
        'warn',
        {
          ObjectExpression: {
            multiline: true,
            minProperties: 2,
          },
          ObjectPattern: {
            multiline: true,
            minProperties: 2,
          },
          ImportDeclaration: {
            multiline: true,
            minProperties: 2,
          },
          ExportDeclaration: {
            multiline: true,
            minProperties: 2,
          },
        },
      ],
      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/object-property-newline': ['warn', { allowAllPropertiesOnSameLine: false }],
      '@stylistic/one-var-declaration-per-line': ['warn', 'initializations'],
      '@stylistic/operator-linebreak': [
        'warn',
        'after',
        {
          overrides: {
            '?': 'before',
            ':': 'before',
          },
        },
      ],
      '@stylistic/padded-blocks': ['warn', 'never'],
      '@stylistic/quote-props': ['warn', 'as-needed'],
      '@stylistic/quotes': [
        'warn',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: 'always',
        },
      ],
      '@stylistic/rest-spread-spacing': ['warn', 'never'],
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/semi-spacing': [
        'warn',
        {
          before: false,
          after: true,
        },
      ],
      '@stylistic/semi-style': ['warn', 'last'],
      '@stylistic/space-before-blocks': ['warn', 'always'],
      '@stylistic/space-before-function-paren': ['warn', 'never'],
      '@stylistic/space-in-parens': ['warn', 'never'],
      '@stylistic/space-infix-ops': ['warn', { int32Hint: false }],
      '@stylistic/space-unary-ops': [
        'warn',
        {
          words: true,
          nonwords: false,
        },
      ],
      '@stylistic/template-curly-spacing': ['warn', 'never'],
      '@stylistic/template-tag-spacing': ['warn', 'never'],
      '@stylistic/type-annotation-spacing': ['warn'],
      '@stylistic/type-generic-spacing': ['warn'],
      '@stylistic/type-named-tuple-spacing': ['warn'],
      '@stylistic/wrap-regex': ['warn'],

      // General JS rules
      'consistent-return': 'warn',
      'no-unreachable': 'warn',
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'none',
          ignoreRestSiblings: true,
        },
      ],

      // Import rules
      'import/no-anonymous-default-export': ['off'],
      'import/order': [
        'warn',
        {
          'newlines-between': 'never',
          groups: [
            'builtin',
            'external',
            'internal',
            [
              'parent',
              'sibling',
              'index',
            ],
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
            {
              pattern: '@components/**',
              group: 'internal',
            },
            {
              pattern: '@styles/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          distinctGroup: false,
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'modules-newlines/import-declaration-newline': 'warn',
      'modules-newlines/export-declaration-newline': 'warn',
      'sort-imports': [
        'warn',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          allowSeparatedGroups: true,
        },
      ],

      // React Hooks rules
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      // React rules
      'react/boolean-prop-naming': [
        'off',
        {
          propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
          rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          message: '',
        },
      ],
      'react/button-has-type': [
        'warn',
        {
          button: true,
          submit: true,
          reset: false,
        },
      ],
      'react/default-props-match-prop-types': ['warn', { allowRequiredDefaults: false }],
      'react/destructuring-assignment': ['warn', 'always'],
      'react/forbid-component-props': ['off', { forbid: [] }],
      'react/forbid-elements': ['off', { forbid: [] }],
      'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
      'react/forward-ref-uses-ref': 'off',
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: ['function-declaration', 'function-expression'],
          unnamedComponents: 'function-expression',
        },
      ],
      'react/hook-use-state': 'off',
      'react/iframe-missing-sandbox': 'off',
      'react/jsx-boolean-value': ['warn', 'always'],
      'react/jsx-child-element-spacing': 'off',
      'react/jsx-closing-bracket-location': ['warn', 'after-props'],
      'react/jsx-closing-tag-location': 'warn',
      'react/jsx-curly-brace-presence': [
        'warn',
        {
          props: 'never',
          children: 'never',
        },
      ],
      'react/jsx-curly-newline': [
        'warn',
        {
          multiline: 'consistent',
          singleline: 'consistent',
        },
      ],
      'react/jsx-curly-spacing': [
        'warn',
        'never',
        { allowMultiline: true },
      ],
      'react/jsx-equals-spacing': ['warn', 'never'],
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
      'react/jsx-first-prop-new-line': ['warn', 'multiline-multiprop'],
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-handler-names': [
        'warn',
        {
          eventHandlerPrefix: 'on',
          eventHandlerPropPrefix: 'on',
        },
      ],
      'react/jsx-indent-props': ['warn', 2],
      'react/jsx-indent': ['warn', 2],
      'react/jsx-key': 'warn',
      'react/jsx-max-depth': 'off',
      'react/jsx-max-props-per-line': [
        'warn',
        {
          maximum: 1,
          when: 'multiline',
        },
      ],
      'react/jsx-newline': 'off',
      'react/jsx-no-bind': [
        'warn',
        {
          ignoreRefs: true,
          allowArrowFunctions: true,
          allowFunctions: false,
          allowBind: false,
          ignoreDOMComponents: true,
        },
      ],
      'react/jsx-no-comment-textnodes': 'warn',
      'react/jsx-no-constructed-context-values': 'warn',
      'react/jsx-no-duplicate-props': ['warn', { ignoreCase: true }],
      'react/jsx-no-leaked-render': 'off',
      'react/jsx-no-literals': ['off', { noStrings: true }],
      'react/jsx-no-script-url': [
        'warn',
        [
          {
            name: 'Link',
            props: ['to'],
          },
        ],
      ],
      'react/jsx-no-target-blank': ['warn', { enforceDynamicLinks: 'always' }],
      'react/jsx-no-undef': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-one-expression-per-line': ['warn', { allow: 'single-child' }],
      'react/jsx-pascal-case': [
        'warn',
        {
          allowAllCaps: true,
          ignore: [],
        },
      ],
      'react/jsx-props-no-multi-spaces': 'warn',
      'react/jsx-props-no-spread-multi': 'off',
      'react/jsx-props-no-spreading': [
        'warn',
        {
          html: 'enforce',
          custom: 'enforce',
          explicitSpread: 'ignore',
          exceptions: [],
        },
      ],
      'react/jsx-sort-default-props': ['off', { ignoreCase: true }],
      'react/jsx-sort-prop-types': 'off',
      'react/jsx-sort-props': [
        'warn',
        {
          ignoreCase: true,
          callbacksLast: true,
          shorthandFirst: false,
          shorthandLast: false,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      'react/jsx-space-before-closing': ['off', 'always'],
      'react/jsx-tag-spacing': [
        'warn',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never',
        },
      ],
      'react/jsx-uses-react': ['off'], // Not needed in React 19
      'react/jsx-uses-vars': 'warn',
      'react/jsx-wrap-multilines': [
        'warn',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
        },
      ],
      'react/no-access-state-in-setstate': 'warn',
      'react/no-adjacent-inline-elements': 'off',
      'react/no-array-index-key': 'warn',
      'react/no-arrow-function-lifecycle': 'warn',
      'react/no-children-prop': 'warn',
      'react/no-danger-with-children': 'warn',
      'react/no-danger': 'warn',
      'react/no-deprecated': ['warn'],
      'react/no-did-mount-set-state': 'off',
      'react/no-did-update-set-state': 'warn',
      'react/no-direct-mutation-state': 'off',
      'react/no-find-dom-node': 'warn',
      'react/no-invalid-html-attribute': 'warn',
      'react/no-is-mounted': 'warn',
      'react/no-multi-comp': 'off',
      'react/no-namespace': 'warn',
      'react/no-object-type-as-default-prop': 'off',
      'react/no-redundant-should-component-update': 'warn',
      'react/no-render-return-value': 'warn',
      'react/no-set-state': 'off',
      'react/no-string-refs': 'warn',
      'react/no-this-in-sfc': 'warn',
      'react/no-typos': 'warn',
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': 'warn',
      'react/no-unsafe': 'off',
      'react/no-unstable-nested-components': 'warn',
      'react/no-unused-class-component-methods': 'warn',
      'react/no-unused-prop-types': [
        'warn',
        {
          customValidators: [],
          skipShapeProps: true,
        },
      ],
      'react/no-unused-state': 'warn',
      'react/no-will-update-set-state': 'warn',
      'react/prefer-es6-class': ['warn', 'always'],
      'react/prefer-exact-props': 'warn',
      'react/prefer-read-only-props': 'warn',
      'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }],
      'react/prop-types': [
        'warn',
        {
          ignore: [],
          customValidators: [],
          skipUndeclared: false,
        },
      ],
      'react/react-in-jsx-scope': 'off', // Not needed in React 19
      'react/require-default-props': ['off', { forbidDefaultForRequired: true }],
      'react/require-optimization': ['off', { allowDecorators: [] }],
      'react/require-render-return': 'warn',
      'react/self-closing-comp': 'warn',
      'react/sort-comp': [
        'warn',
        {
          order: [
            'static-variables',
            'static-methods',
            'instance-variables',
            'lifecycle',
            '/^handle.+$/',
            '/^on.+$/',
            'getters',
            'setters',
            '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
            'instance-methods',
            'everything-else',
            'rendering',
          ],
          groups: {
            lifecycle: [
              'displayName',
              'propTypes',
              'contextTypes',
              'childContextTypes',
              'mixins',
              'statics',
              'defaultProps',
              'constructor',
              'getDefaultProps',
              'getInitialState',
              'state',
              'getChildContext',
              'getDerivedStateFromProps',
              'componentWillMount',
              'UNSAFE_componentWillMount',
              'componentDidMount',
              'componentWillReceiveProps',
              'UNSAFE_componentWillReceiveProps',
              'shouldComponentUpdate',
              'componentWillUpdate',
              'UNSAFE_componentWillUpdate',
              'getSnapshotBeforeUpdate',
              'componentDidUpdate',
              'componentDidCatch',
              'componentWillUnmount',
            ],
            rendering: ['/^render.+$/', 'render'],
          },
        },
      ],
      'react/sort-default-props': ['off', { ignoreCase: false }],
      'react/sort-prop-types': [
        'off',
        {
          ignoreCase: true,
          callbacksLast: false,
          requiredFirst: false,
          sortShapeProp: true,
        },
      ],
      'react/state-in-constructor': ['warn', 'always'],
      'react/static-property-placement': ['warn', 'property assignment'],
      'react/style-prop-object': 'warn',
      'react/void-dom-elements-no-children': 'warn',
    },
  },
];