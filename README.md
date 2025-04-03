# Kagi FE Demo Project

[Live Preview](https://nicole5978.github.io/kagi-fe-demo/)

## Task 1

Create a recipe widget that conditionally shows "Show More/Less" toggle depending on whether the number of ingredients exceed 10. The toggle should expand and collapse the card without any JavaScript.

Provide two examples, one with an ingredient list, and one with text with 15 or more lines of text.

### My Approach

The expand/collapse functionality is handled by calculating the `max-height` by the `line-height` and desired amount of lines, in this case 10.

Three cards are provided in this example to show the functionality in different scenarios. 

The first card is a recipe with exactly 10 ingredients. The toggle is coded into this card, but does not show. This is because I use the follwoing to determine whether there is an 11th `<li>` child of the list:

```css
/* Handle showing labels by checking if there is an 11th child, exclude <p> from check */
.card-content:not(:has(ul.card-body li:nth-child(11), p.card-body)) .toggle-labels {
  display: none;
}
```

The second card is a recipe with ingredients exceeding 10. The "Show More/Less" toggle is shown for this and `max-height` is removed when the toggle is checked.

The third card has a paragraph filled with over 10 lines of text.

### Caveats

Conditionally showing/hiding the toggles can be problematic with my approach because the `:has` selector has [baseline availability starting from 2023](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) and may not work with older browsers.

The third card works similarly as the first two, but cannot do the same determination of the minimum amount of lines in the card. It is challenging to determine the number of lines of text without splitting up each line in tags without JavaScript. Because of this, the conditional check includes whether a child of the `.card-content` is a `<p>` tag and the toggle is always shown.
