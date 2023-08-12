<!-- slide -->

# SQLabの練習

## ER図

![問題で想定するER図](https://sqlab.net/assets/er_diagrams/book_stores-90daba15f35f34857eff0f2ec5698d0969375b266148f0edcd7e11dd706beaeb.png 'ER図')

## テーブルスクレイプスクリプト

```javascript
var res = document.getElementsByTagName('tbody')[2].children
const data = []
for (const item of Object.values(res)) {
  const tds = item.children
  const target = {
    key: `(${tds[1].innerText}, ${tds[2].innerText}, ${tds[3].innerText}, ${tds[4].innerText}, ${tds[5].innerText}),`,
  }
  data.push(target)
}
```
