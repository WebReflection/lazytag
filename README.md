# lazytag

Lazy loading Custom Elements and their styles without even thinking about it.

```html
<script>
lazyTag({
  // an optional *Array* of custom elements to ignore
  // this could contain RegExp too
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
