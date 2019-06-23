# lazytag

Lazy loading Custom Elements and their styles without even thinking about it.

```html
<script>
// you can have many lazyTag invokes per page
lazyTag({
  // an optional *Array* of custom elements names or RegExp
  // to consider: any other custom element will be ignored
  only: [/^io-/],
  // an optional *Array* of custom elements to ignore
  // if `only` is used, this list is ignored
  ignore: ['third-parts', 'pre-loaded', /-heresy$/],
  // the optional JS path where component-name.js is
  js: './components/js',
  // the optional CSS path where component.name.css is
  css: './components/css'
});
</script>
<my-component>
  <my-sub-component>
  </my-sub-component>
</my-component>
```

The previous example would load automatically `./components/js/my-component.js`, `./components/js/my-sub-component.js`, but also `./components/css/my-component.css` and `./components/css/my-sub-component.css`.

[Live test](https://webreflection.github.io/lazytag/test/).
