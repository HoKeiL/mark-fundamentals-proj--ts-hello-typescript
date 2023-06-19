---
module: fundamentals

level: 0

methods:
  - team
  - pair
  - solo

tags:
  - wip
---

# Hello TypeScript

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>

> This is part of Academy's [technical curriculum for **The Mark**](https://github.com/WeAreAcademy/curriculum-mark). All parts of that curriculum, including this project, are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

This project is about introducing and motivating TypeScript.

## Learning Outcomes

- Run a JavaScript file with `node`
- Run a TypeScript file with `ts-node`
- Compile a TypeScript file with `tsc`

## Exercise 0: The quirks of JavaScript's dynamic and weak typing

> 🎯 **Success criterion:** you can run the project JavaScript code and see its weird quirky behaviour

JavaScript is semi-notorious for having weird quirky behaviour at the extremes of the language, [as illustrated in this famous 5 minute lightning talk](https://www.destroyallsoftware.com/talks/wat).

### Seeing strange behaviour in your terminal

There's an example of this in `src/javascript/index.js` - if you run this through your terminal, you'll see some slightly 'funky' output.

There are three different ways you can run that code (try all of them!).

From the root directory of the project, there are three command options:

- `node src/javascript/index.js`: Use `node` to run a JavaScript file. Which one? The one at `src/javascript/index.js`.
- `node src/javascript`: Use `node` to run a JavaScript file. Which one? The one at `src/javascript`. Oh, that's not a JavaScript file, it's a folder - but it does have an `index.js` file in the folder, so I'll run that! (This is known shorthand with `node` - if the path is to a folder rather than to a file, it will try to find an `index.js` inside that folder)
- `yarn start:js`: we have specified for you the `start:js` script in `package.json` to run `node src/javascript`

The output which we might expect or hope JavaScript would give to us would probably be:

```bash
7 plus 10 is... 17
Array addition: 1,2,3 + 4,5,6 is... 1,2,3,4,5,6
# or possibly 5, 7, 9
Rectangle area: 4 x 10 is... 40
```

but JavaScript gives us some different output. (Try it for yourself!)

### Interpreting the strange behaviour

_Most_ of this slightly strange behaviour is a consequence of JavaScript being a dynamic and weakly typed language:

1. It is [**dynamically typed**](https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_typing) because it does not need us to declare the types of variables and parameters before the code can be run
2. It is **weakly typed** because it will do a lot of implicit [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) for us

By contrast, Python is also dynamically typed, but is _more_ strongly typed than JavaScript - 'dynamic' and 'weak' do not mean the same thing when we describe languages and their typings.

(Python still performs _some_ implicit type coercion, but to a lesser degree than JavaScript.)

The vocabulary is not super-important right now (and it will become more meaningful with time), but [here is a good video overview of static vs dynamic and strong vs weak typing](https://en.hexlet.io/courses/intro_to_programming/lessons/types/theory_unit).

For example, here is the "thought process" that we might project onto the JavaScript engine (not because it actually 'thinks' like this, but as a way of reasoning about dynamic and weak typing):

#### Dynamic typing

In JavaScript, we can declare variables without saying what type they have to be.

```js
let myFirstNumber = 5;
// okay, cool, you're declaring a variable! what type will it hold?
// well, after declaring it, you've immediately assigned it to a number, so I guess this thing must be a number

myFirstNumber = "banana";
// oh, you want to re-assign that variable to a string?
// that's totally cool with me!
```

Dynamic typing can be helpful because it gives us a lot of freedom! (The alternative, static typing, involves more verbose code.)

But the freedom of dynamic typing can also be very dangerous, in leading to unintentional errors. In order to know what we can do with a variable, we need to know what type it has (for example, we can't call `.toUpperCase()` on a number, but we could on a string) - and it's harder for us to maintain that knowledge if it changes depending on where we are in our code!

#### Weak typing

In JavaScript, we can write code which JavaScript will take and - without us explicitly instructing it to - use type coercion on.

(There's a reference example on this `src/javascript/type-coercion.js` - you can run this with `node src/javascript/type-coercion.js`.)

Weaker typing can be helpful because it means fewer errors in runtime. (The alternative, stronger typing, throws an error. You can check this by running the Python code in `src/python/attempted-coercion.py`.)

But the flexibility of weak typing can also be very dangerous, in leading to unexpected behaviour. Stronger typing systems require us to explicitly denote where we're converting a value from one type to another (e.g. in `src/python/explicit-casting.py`), which leads to clearer code which is consequently easier to reason about and predict.

### Annoying typos

A common cause of errors (and frustration) in JavaScript is _really silly typos_. Your logic might all be correct, but you've mistyped something, and it causes a bug which is really hard to chase down. (It's very hard to spot typos in your own code!)

That's the cause of the following 'bug' in `src/javascript/index.js`:

```js
const rectangle = { width: 4, height: 10 };
const area = rectangle.width * rectangle.heihgt; // an easy typo to make!
console.log(
  `Rectangle area: ${rectangle.width} x ${rectangle.height} is... ${area}`
);
```

What we wanted was `const area = rectangle.width * rectangle.height` - and we made a silly typo of `rectangle.heihgt` instead of `rectangle.height`!

## Exercise 1: Catching errors with TypeScript

> 🎯 **Success criterion:** you can articulate some benefits of TypeScript

### Background to TypeScript

TypeScript irons out some of the quirks of JavaScript by keeping _all_ JavaScript syntax (but adding in some extra rules and syntax).

It has been built off JavaScript in a way such that:

- TypeScript code can use the existing JavaScript ecosystem of libraries
- TypeScript code can (ultimately) be run in JavaScript-friendly environments, like web browsers

(There are other languages which are entirely unrelated to JavaScript, which don't have JS quirks - but they can't access the JS ecosystem and environments in the way that TypeScript can.)

There is a good introduction on the TypeScript website: [TypeScript for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html).

### Trying to run our initial TypeScript code

Once you've read that, if you inspect the `index.ts` file, you'll see that it has (currently) the exact same code as our `index.js` file.

However (if we are viewing in VS Code), it also has four red squiggly underlines!

If you hover over each of these in VS Code, you'll see some helpful error messages:

1. `Type 'string' is not assignable to type 'number'.`
2. `Operator '+' cannot be applied to types 'number[]' and 'number[]'.`
3. `Property 'heihgt' does not exist on type '{ width: number; height: number; }'. Did you mean 'height'?`

In other words - TypeScript is anticipating each of the strange and annoying quirks that we saw before!

We've installed `node` - this runs JavaScript files. Note that it will run a file as though it were JavaScript regardless of the file extension - if you change the file extension on `src/javascript/index.js` to `.py` or `.ts` and run it using `node src/javascript/index.py` or `node src/javascript/index.ts` it would still run using JavaScript and give the same results (regardless of all the error highlighting on VS Code as the editor determines the language via the file extension). Remember to change the file extension back after experimenting. 

To run files via the terminal using TypeScript, we'll (for now) use a library called [`ts-node`](https://github.com/TypeStrong/ts-node).

Handily:

- running `yarn` will install `ts-node` (downloading it into `node-modules`), since `ts-node` is listed under our `devDependencies` in `package.json`
- we have a convenient `start:ts` script in our `package.json`

> ⚠️ Before, we found that we could run JavaScript files directly in the terminal with `node path/to/dir/file.js`, and we used our `package.json` scripts as a convenience helper. However, you will probably find that your `ts-node` script works when run via `yarn`, but not when typed directly into the terminal. This is fine, and expected - your `package.json` scripts looks up a locally installed `ts-node` inside `node_modules`, whereas `ts-node` directly in the terminal looks for a global installation. If you'd like to be able to run `ts-node` directly within the terminal, you could make a global installation with `yarn global add ts-node`.  This is NOT recommended.

So let's try to run this TypeScript file with `yarn start:ts`.

_It throws an error: TypeScript won't let you run this strange, quirky code._

> ⚠️ Unlike JavaScript, TypeScript is a _compiled language_ (it actually compiles down to JavaScript) - it has to be processed before it is run. Under-the-hood, `ts-node` is effectively compiling TypeScript down to JavaScript; then, if that is successful, going on to run the compiled JavaScript code. For now, though, you can think of it like 'running' the TypeScript code - we'll split out compilation later.

### Why can't we run this TypeScript code?

So this code - which we _could_ run in JavaScript, albeit with strange behaviour - we _can't_ run in TypeScript.

At first, this might seem like a _bad_ thing. After all, running code that behaves in strange and unpredictable ways is better than not being able to run code at all, right?

Well - not always (and probably _not_ in most cases which TypeScript catches).

**TypeScript's design goals**

At this point, you should read [TypeScript's Design Goals](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals).

In particular, note the following stated goals:

- "Statically identify constructs that are likely to be errors [which, in this context, means *mistakes* - things that don't behave as intended]."
- "Produce a language that is composable and easy to reason about."

_(Statically: before the code is actually run.)_

These are both pretty good things to have (hopefully in a relatively self-evident way).

**JavaScript's weaknesses**

JavaScript, unfortunately, does not particularly succeed at these goals.

For example:

- It didn't statically (before runtime) capture our silly typo of `rectangle.heihgt`.
- It's not easy to reason about the strange things happening in `src/javascript/type-coercion.js`

**TypeScript's static type-checker**

TypeScript adds some more restrictive rules to JavaScript. The TypeScript language checker is flagging three things in `index.ts` and not letting us run our code whilst they're there - they're likely errors (mistakes) and/or not easy to reason about.

Essentially, TypeScript is setting a higher-bar for JavaScript code - things that might be allowed in ordinary JavaScript code will instead be caught as TypeScript errors. It's basically a philosophy of "better to be stricter as we're writing code, so as to minimise errors in code that gets shipped".

> ⚠️ It is possible to _relax_ the rules of TypeScript and make it closer to JavaScript's permissiveness. However, we'll be running TypeScript on maximum strictness, for the fullest TypeScript experience.

Check out the TypeScript website: at the time of writing ([cached version](https://webcache.googleusercontent.com/search?q=cache:xKuO76lAzEgJ:https://www.typescriptlang.org/+&cd=1&hl=en&ct=clnk&gl=uk)), TypeScript says: "TypeScript saves you time catching errors and providing fixes **before you run code**" (emphasis added).

## Exercise 2: Fixing and running the TypeScript code

> 🎯 **Success criterion:** you can run the TypeScript code in `src/typescript/index.ts`

So, TypeScript is stopping us from running the code we have in `index.ts` (which would behave in strange and silly ways).

Let's fix each of those.

### Reassigning `numberOne`

_`Type 'string' is not assignable to type 'number'.`_

When we declared `numberOne` and made an initial assignment to `5`, TypeScript _inferred_ that the variable `numberOne` is be a number.

TypeScript uses this inferred type knowledge when it raises an error on the re-assignment of `numberOne` to `"7"` - a sort of "hey, you assigned this variable to a number before; you probably shouldn't be assigning it a string now".

We can fix that by replacing `"7"` with `7` - a reassignment of a number to a variable which is typed as a `number`, so the TypeScript type checker is happy.

```ts
numberOne = 7; // instead of "7"
```

### Using array concatenation

_`Operator '+' cannot be applied to types 'number[]' and 'number[]'.`_

In JavaScript, arrays can't be 'added' or 'joined' with the `+` operator in a way that we might expect - and TypeScript warns us about this.

If we were looking for `[1, 2, 3, 4, 5, 6]`, we should instead be using array concatenation:

```ts
const joinedArr = arrOne.concat(arrTwo);

// a more modern syntax below, but don't worry about it too much right now
// const joinedArr = [...arrOne, ...arrTwo]
```

### Using the correct property key

_`Property 'heihgt' does not exist on type '{ width: number; height: number; }'. Did you mean 'height'?`_

JavaScript looked on and cruelly laughed at us as we made a silly typo.

TypeScript is much more helpful, proactively warning us in cases of likely typos.

Let's fix this by reading the correct property name:

```ts
const area = rectangle.width * rectangle.height;
```

### Running the code

Now, when you run the code with `yarn start:ts`, the code will give much more sensible output than our original buggy and strange JavaScript!

## Exercise 3: Compiling our TypeScript code

> 🎯 **Success criterion:** you can run a compiled JavaScript file, `build/index.js`, from your original TypeScript

TypeScript is technically a _compiled language_ - it needs to be compiled before it is executed.

As it happens, it compiles down to normal JavaScript - that's how TypeScript code (ultimately) gets access to ordinary JavaScript environments.

### Compiling our TypeScript code

We will trigger a build of our TypeScript code using the following script (defined in our `package.json` - look for details if you're interested):

```bash
yarn compile
```

> ⚠️ The `compile` script simply runs `tsc`, a command given to us by a `typescript` installation. Similarly to `ts-node`, it currently looks up a local installation of `typescript` in your `node_modules`. If you'd like to be able to run `tsc` directly in your terminal, you'd need a global installation of `typescript`: `yarn global add typescript`.  We recommend you do NOT do this.

After you run this, you should see a `build` folder appear, with the following file, `index.js`, which is ordinary JavaScript.

> ⚠️ Our `.gitignore` lists the directory `build` - it is common practice to ignore any compiled JavaScript, and only track the TypeScript code in version control. `dist` is also listed - `build` and `dist` are the most common folders that developers use for compiling down TypeScript into JavaScript. This can be configured through your `tsconfig.json`, in the `outDir` option.

Since `build/index.js` is an ordinary JavaScript file, we can run it with node:

```bash
node build/index.js
```

And you'll see the output.

It will probably be helpful here to add a convenience script for this to `package.json`, e.g.:

```
"scripts": {
  // other scripts from before, then
  "start:build": "node build"
}
```

(Make sure you add a comma after your last previous script before adding a new one, and check that any final scripts don't have a trailing comma after them.)

If we use this process - write, then compile - we'll need to re-compile our code for it to take effect when we run it.

For example, if we assigned `numberTwo` to `100`, then our compiled code would still show its previous assignment of `10`, until we recompiled and re-ran:

```bash
yarn compile
yarn start:build
```

### Optional aside: target JS version

We wouldn't typically read the compiled code, but if you look at it, you'll see it looks (for the most part) very similar to the JavaScript code we have in `src/javascript/index.js`.

We could change this, if we wanted. [JavaScript has had multiple versions](https://www.w3schools.com/js/js_versions.asp), and we're currently compiling our TypeScript down to the 2015 version (also known as ES6).

But, we could compile into an older version (e.g. for legacy browser support - or just curiosity!).

Go into `tsconfig.json`, and change the `target` to `"es3"`:

```
{
  "compilerOptions": {
    // other options
    "target": "es3",
    //other options
    }
  },
  "include": ["src/**/*"]
}
```

Then, run `yarn compile` again. You'll see that the resultant compiled code (which overwrites whatever was in our `build` directory before) looks different - in particular:

- there's no `let` or `const` (since these didn't exist in ES3)
- there's no template string interpolation (since this didn't exist in ES3)

In practice, `"es6"` tends to be the most common compilation target.

### Reading the compiled code

Currently, the differences between our written TypeScript and compiled JavaScript are quite minor - the TypeScript compiler helped us catch some errors, but it hasn't fundamentally changed much about our code.

This is because we're currently _scratching the surface_ of TypeScript. Normal TypeScript code will have a lot of TypeScript-specific syntax, which then gets stripped out by the TypeScript compiler as it compiles it down to JavaScript.

We'll see this in future exercises!
