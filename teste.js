const array = [
  {date: '2022-02-14T12:22:09.115Z'},
  {date: '2022-02-14T12:17:36.983Z'},
  {date: '2022-02-14T11:58:52.404Z'},
  {date: '2022-02-14T11:51:58.896Z'},
  {date: '2022-02-14T10:49:16.710Z'},
]

console.log(array)

array.sort((a, b) => new Date(a.date) - new Date(b.date))

console.log(array)