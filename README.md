# Kagi FE Demo Project

The implementation of Task 1 is in **index.html**. The implementation of Task 2 is in **optimization.js**

[Live Preview](https://nicole5978.github.io/kagi-fe-demo/)

## Task 1 - Recipe Widget

### My Approach

The expand/collapse functionality is handled by calculating the `max-height` by the `line-height` and desired amount of lines, in this case 10.

Three cards are provided in this example to show the functionality in different scenarios.

The first card is a recipe with exactly 10 ingredients. The toggle is coded into this card, but does not show. This is because I use the following to determine whether there is an 11th `<li>` child of the list:

```css
.card-content:not(:has(ul.card-body li:nth-child(11), p.card-body))
  .expand-toggle {
  display: none;
}
```

The second card is a recipe with ingredients exceeding 10. The "Show More/Less" toggle is shown for this and the `max-height` limit is removed when the toggle is checked.

The third card has a paragraph filled with over 10 lines of text.

### Considerations

Conditionally showing/hiding the toggles can be problematic with my approach because the `:has` selector has [baseline availability starting from 2023](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) and may not work on older browsers. A workaround for this would be to add a data attribute, e.g. `data-expandable="true"` on the `.card-content` element in HTML and selectively show the toggles based on that.

The third card works similarly as the first two, but the minimum amount of lines in the body cannot be determined. It is challenging to determine the number of lines of text without JavaScript. Because of this, the toggle is always shown regardless of how many lines. A workaround for this would be to split the paragraph into `<span>` tags and determining the number of children within `.card-content`.

## Task 2 - JavaScript Optimization

### Optimization Journey

I first approached this task by implementing the function in a way that I know would work. This way I could understand the intended behavior and get a baseline performance measurement.

For benchmarking, I created the function `benchmark()` that evaluates an array of test cases in 500 iterations and averages the result. This uses the native Performance interface to get timestamps.

#### First Implementation

I began by splitting `others` into `peopleArr`, concatenating `name` to `peopleArr` and sorting `peopleArr`. After this, I found the index of `name` and use its `index + 1` to calculate the time waiting based on the number of judges.

```js
function court(name, judges, others) {
  const peopleArr = others.split(" ").concat(name).sort()

  const index = peopleArr.indexOf(name)

  // Calculate time by index position, # judges, and wait time
  return Math.ceil((index + 1) / judges) * 30
}
```

##### Test Results

    Benchmark Results:
    [Case 1]: "Jules", 3, "Adam Betty Frank Mike" [Average Time]: 0.0005999999046325683 ms
    [Case 2]: "Zane", 1, "Mark Hank Ana Vivian" [Average Time]: 0.0014000000953674316 ms
    [Case 3]: "Thom", 1, "Ed Philip Colin Jonny" [Average Time]: 0.0005999999046325683 ms
    [Case 4]: "Nicole", 3, "Jorge Zack Chris Timothy" [Average Time]: 0.0005999999046325683 ms
    [Case 5]: "Alice", 2, "Bob Charlie David Eve" [Average Time]: 0.00020000028610229491 ms
    [Case 6]: "Michael", 2, "Buster Tobias Lindsay Gob" [Average Time]: 0.0005999999046325683 ms

    Benchmark (total execution time): 2.22412109375 ms

#### Second Implementation

I recognized a few areas of improvement. In this implementation, I split `others` into `peopleArr`, then I directly compare the strings by looping through `peopleArr` and comparing the input `name` to `peopleArr[i]`. If `peopleArr[i] < name`, then the position of `name` increases. This showed observable improvements.

##### Test Results

    Benchmark Results:
    [Case 1]: "Jules", 3, "Adam Betty Frank Mike" [Average Time]: 0.0006000003814697265 ms
    [Case 2]: "Zane", 1, "Mark Hank Ana Vivian" [Average Time]: 0.00039999961853027344 ms
    [Case 3]: "Thom", 1, "Ed Philip Colin Jonny" [Average Time]: 0.00020000028610229491 ms
    [Case 4]: "Nicole", 3, "Jorge Zack Chris Timothy" [Average Time]: 0.00019999980926513672 ms
    [Case 5]: "Alice", 2, "Bob Charlie David Eve" [Average Time]: 0.00020000028610229491 ms
    [Case 6]: "Michael", 2, "Buster Tobias Lindsay Gob" [Average Time]: 0.00019999980926513672 ms

    Benchmark (total execution time): 1.06494140625 ms

### Considerations

With dataset of this size, I am satisfied with this approach. However, there are some considerations for this function in practice:

- Case sensitivity, especially since there is direct string comparison. I would cast the strings to uniform casing before comparison.
- Accented characters. I would use `String.prototype.localeCompare()` instead of `<`.
- Check for malformed data.
- If `peopleArr` was not limited to a length of 5, there could be significant performance degradation with large datasets. In this scenario, a reworking of my first approach to use a different search algorithm, like binary search on the sorted array, may be more performant than the linear complexity of my second approach.
