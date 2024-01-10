# `eslint-plugin-react-hooks-signals`

This ESLint plugin is a modified version of React's official [hooks plugin](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks). This provides a new rule called "exhaustive-deps-signals" that is intended to be used instead of React's "exhaustive-deps" if you use [@preact/signals-react](https://github.com/preactjs/signals/tree/main/packages/react) in your project.

You should still include React's eslint hooks plugin since it provides the "rules-of-hooks" eslint rule, but you should disable their version of "exhaustive-deps".

## Installation

```sh
# npm
npm install -D eslint-plugin-react-hooks-signals
# yarn
yarn add -D eslint-plugin-react-hooks-signals
```

## Example `.eslintrc.js`

```js
module.exports = {
  …,
  extends: [
    …,
    'plugin:react-hooks-signals/recommended',
  ]
  rules: {
    …,
    'react-hooks/exhaustive-deps': 'off',
  }
}
```

## Explanation

The official React lint rule "react-hooks/exhaustive-deps" doesn't play nicely with signals.

Consider this example:

```jsx
import { signal } from "@preact/signals-react";
const countSignal = signal(0);

export function Counter({ multiplier: number }) {
  useEffect(() => {
    localStorage.setItem(
      "countWithMultiplier",
      `${multiplier * countSignal.value}`
    );
  }, [multiple, countSignal.value]);

  return (
    <div>
      {multiplier * countSignal.value}
      <button onClick={() => countSignal.value++}>Add One</button>
    </div>
  );
}
```

The above will fail the "react-hooks/exhaustive-deps" check because `countSignal.value` in the list of useEffect dependencies is declared an error:

> Outer scope values like 'countSignal.value' aren't valid dependencies because mutating them doesn't re-render the component.

But with signals it _does_ re-render the component, so it should be a valid dependency!

This eslint plugin provides a rule that does two things different:

1. It knows that externally declared signals can re-render a component, so its values should be in the dependency array when used in an effect.
2. It understands that depending on a signal isn't enough, the signal's value needs to be depended on, since the signal container doesn't change when the signal's value update.

In addition to the above, it provides all the existing checks of React's eslint rule, so you should turn off React's "exhaustive-deps" rule to keep this rule from conflicting.

## Advanced Configuration

`exhaustive-deps-signals` can be configured to validate dependencies of custom Hooks with the `additionalHooks` option.
This option accepts a regex to match the names of custom Hooks that have dependencies.

```js
{
  "rules": {
    // ...
    "react-hooks-signals/exhaustive-deps-signals": ["warn", {
      "additionalHooks": "(useMyCustomHook|useMyOtherCustomHook)"
    }]
  }
}
```

The React Devs suggest to use this option **very sparingly, if at all**. Generally saying, they recommend most custom Hooks to not use the dependencies argument, and instead provide a higher-level API that is more focused around a specific use case.

## License

MIT

## Attribution

Modified by Jon Abrams, based on the existing code by Facebook.
