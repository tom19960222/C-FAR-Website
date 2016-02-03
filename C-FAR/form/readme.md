# 表單模組

## 名詞定義 (注意，這邊的欄位是後端儲存的，前端請看下面基本使用，有API範例)
---
### Form
一張表單，裡面有很多個問題，還有很多個回應，是整個表單模組資料關連的頂端。

內含欄位：

* title （表單標題）
* description （表單敘述）
* id （表單ID）

### Question
表單裡的問題，關聯到很多答案。（ Question.hasMany(Answer) ）

內含欄位：

* title （問題標題）
* description （問題敘述）
* questionType （問題類型）
* singleChoiceOptions （單選題選項）
* multipleChoiceOptions （多選題選項）
* dropdownOptions （下拉式選單選項）
* scoreMax （最高分數）
* scoreMin （最低分數）
* custom （自定HTML）
* order （問題排序）
* qid （問題ID）

### Answer
問題的答案，屬於Question和Response

內含欄位：

* textbox 
* textarea
* singleChoice
* multipleChoice
* dropdown
* score
* ansid（答案ID）

基本上就是哪一種類型對哪一個欄位這樣

### Response
表單的一次回應，就是使用者回答完整張表單的問題送到後端來，稱作一個Response

回應包含很多個答案 (`FormResponse.hasMany(QuestionAnswer);`)

內含欄位：

* resid (Response ID)



## 基本使用
---
### 取得一張表單（產生表單頁面，給人回答用）
GET /form/(表單ID)

回應：
`
{
  "title": "Test form",
  "description": "This is a this form",
  "id": 1,
  "Questions": [
    {
      "title": "Q01",
      "description": "This is Q01",
      "questionType": "textbox",
      "qid": 1
    },
    {
      "title": "Q02",
      "description": "This is Q02",
      "questionType": "textarea",
      "qid": 2
    },
    {
      "title": "Q03",
      "description": "This is Q03",
      "questionType": "singleChoice",
      "singleChoiceOptions": [
        "Opt01",
        "Opt02",
        "Opt03"
      ],
      "qid": 3
    },
    {
      "title": "Q04",
      "description": "This is Q04",
      "questionType": "multipleChoice",
      "multipleChoiceOptions": [
        "Opt01",
        "Opt02",
        "Opt03"
      ],
      "qid": 4
    },
    {
      "title": "Q05",
      "description": "This is Q05",
      "questionType": "dropdown",
      "dropdownOptions": [
        "Opt01",
        "Opt02",
        "Opt03"
      ],
      "qid": 5
    },
    {
      "title": "Q06",
      "description": "This is Q06",
      "questionType": "score",
      "scoreMax": 10,
      "scoreMin": 1,
      "qid": 6
    },
    {
      "title": "Custom HR",
      "description": null,
      "questionType": "custom",
      "custom": "<hr />",
      "qid": 7
    }
  ]
}
`
