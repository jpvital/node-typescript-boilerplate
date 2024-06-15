/**
 * Some predefined delay values (in milliseconds).
 */
export enum Delays {
  Short = 500,
  Medium = 2000,
  Long = 5000,
}

/**
 * Returns a Promise<string> that resolves after a given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - A number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
function delayedHello(
  name: string,
  delay: number = Delays.Medium,
): Promise<string> {
  return new Promise((resolve: (value?: string) => void) =>
    setTimeout(() => resolve(`Hello, ${name}`), delay),
  );
}

function itemDeepCopy<T>(item: T): T {
  if (Boolean(item) === false || typeof item !== 'object') {
    return item;
  }

  // by checking if the item is an array we can then apply itemDeepCopy to each element
  if (Array.isArray(item)) {
    return item.map(element => itemDeepCopy(element)) as unknown as T;
  }

  const itemCopy = {} as T;
  for (const key in item) {
    // using recursion to handle nested objects and arrays
    itemCopy[key] = itemDeepCopy((item as T)[key]);
  }

  return itemCopy;
}

// using <T>, the function is type safe can be used with any type of array
export function arrayDeepCopy<T>(inputArray: T[]): T[] {
  return inputArray.map(item => itemDeepCopy(item));
}

// Please see the comment in the .eslintrc.json file about the suppressed rule!
// Below is an example of how to use ESLint errors suppression. You can read more
// at https://eslint.org/docs/latest/user-guide/configuring/rules#disabling-rules

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function greeter(name: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  // The name parameter should be of type string. Any is used only to trigger the rule.
  return await delayedHello(name, Delays.Long);
}
