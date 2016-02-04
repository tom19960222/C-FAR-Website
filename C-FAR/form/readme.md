# 表單模組

## 名詞定義 (注意，這邊的欄位是後端儲存的，前端請看下面基本使用，有API範例)

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

*注意，以下路徑開頭的 `/form` 可能會根據設定檔中路徑設定的不同而變動*

### 取得表單列表
**GET /form**

回應：
```JSON
[
  {
    "id": 1,
    "title": "Test form",
    "description": "This is a this form",
    "createdAt": "2016-02-03T19:44:15.000Z",
    "updatedAt": "2016-02-03T19:44:15.000Z",
    "deletedAt": null,
    "creatorUid": 1,
    "userUid": 1
  },
  {
    "id": 2,
    "title": "Test form",
    "description": "This is a this form",
    "createdAt": "2016-02-03T19:44:55.000Z",
    "updatedAt": "2016-02-03T19:44:55.000Z",
    "deletedAt": null,
    "creatorUid": 7,
    "userUid": 7
  }
]
```

### 取得一張表單（產生表單頁面，給人回答用）

**GET /form/(表單ID)**

回應：
```JSON
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
```

### 取得一個問題與其全部答案（一般在管理頁面使用）

**GET /form/question/(問題ID)**

回應：

```JSON
{
  "title": "Q01",
  "description": "This is Q01",
  "questionType": "textbox",
  "singleChoiceOptions": null,
  "multipleChoiceOptions": null,
  "dropdownOptions": null,
  "scoreMax": null,
  "scoreMin": null,
  "custom": null,
  "order": 0,
  "qid": 1,
  "createdAt": "2016-02-03T19:44:15.000Z",
  "updatedAt": "2016-02-03T19:44:15.000Z",
  "deletedAt": null,
  "FormId": 1,
  "Form": {
    "id": 1,
    "title": "Test form",
    "description": "This is a this form",
    "createdAt": "2016-02-03T19:44:15.000Z",
    "updatedAt": "2016-02-03T19:44:15.000Z",
    "deletedAt": null,
    "creatorUid": 1,
    "userUid": 1
  },
  "Answers": [
    {
      "textbox": "YEE",
      "textarea": null,
      "singleChoice": null,
      "multipleChoice": null,
      "dropdown": null,
      "score": null,
      "ansid": 1,
      "createdAt": "2016-02-03T19:44:15.000Z",
      "updatedAt": "2016-02-03T19:44:16.000Z",
      "deletedAt": null,
      "QuestionQid": 1,
      "FormResponseResid": 1
    }
  ]
}
```

### 取得一個回應與其全部答案（一般在向使用者展示資訊用）

**GET /form/response/(response ID)**

```JSON
{
  "resid": 1,
  "createdAt": "2016-02-03T19:44:15.000Z",
  "updatedAt": "2016-02-03T19:44:15.000Z",
  "deletedAt": null,
  "FormId": 1,
  "Form": {
    "id": 1,
    "title": "Test form",
    "description": "This is a this form",
    "createdAt": "2016-02-03T19:44:15.000Z",
    "updatedAt": "2016-02-03T19:44:15.000Z",
    "deletedAt": null,
    "creatorUid": 1,
    "userUid": 1
  },
  "Answers": [
    {
      "textbox": "YEE",
      "textarea": null,
      "singleChoice": null,
      "multipleChoice": null,
      "dropdown": null,
      "score": null,
      "ansid": 1,
      "createdAt": "2016-02-03T19:44:15.000Z",
      "updatedAt": "2016-02-03T19:44:16.000Z",
      "deletedAt": null,
      "QuestionQid": 1,
      "FormResponseResid": 1
    },
    {
      "textbox": null,
      "textarea": "YEEEE\nYEEEEEEEEEE",
      "singleChoice": null,
      "multipleChoice": null,
      "dropdown": null,
      "score": null,
      "ansid": 2,
      "createdAt": "2016-02-03T19:44:16.000Z",
      "updatedAt": "2016-02-03T19:44:16.000Z",
      "deletedAt": null,
      "QuestionQid": 2,
      "FormResponseResid": 1
    },
    {
      "textbox": null,
      "textarea": null,
      "singleChoice": 1,
      "multipleChoice": null,
      "dropdown": null,
      "score": null,
      "ansid": 3,
      "createdAt": "2016-02-03T19:44:16.000Z",
      "updatedAt": "2016-02-03T19:44:16.000Z",
      "deletedAt": null,
      "QuestionQid": 3,
      "FormResponseResid": 1
    },
    {
      "textbox": null,
      "textarea": null,
      "singleChoice": null,
      "multipleChoice": "[0,2]",
      "dropdown": null,
      "score": null,
      "ansid": 4,
      "createdAt": "2016-02-03T19:44:16.000Z",
      "updatedAt": "2016-02-03T19:44:16.000Z",
      "deletedAt": null,
      "QuestionQid": 4,
      "FormResponseResid": 1
    },
    {
      "textbox": null,
      "textarea": null,
      "singleChoice": null,
      "multipleChoice": null,
      "dropdown": 1,
      "score": null,
      "ansid": 5,
      "createdAt": "2016-02-03T19:44:16.000Z",
      "updatedAt": "2016-02-03T19:44:16.000Z",
      "deletedAt": null,
      "QuestionQid": 5,
      "FormResponseResid": 1
    },
    {
      "textbox": null,
      "textarea": null,
      "singleChoice": null,
      "multipleChoice": null,
      "dropdown": null,
      "score": 5,
      "ansid": 6,
      "createdAt": "2016-02-03T19:44:16.000Z",
      "updatedAt": "2016-02-03T19:44:16.000Z",
      "deletedAt": null,
      "QuestionQid": 6,
      "FormResponseResid": 1
    }
  ]
}
```

### 新增一張表單

**POST /form/add**

資料結構大概像這樣，questions那邊再加上各個類型需要的欄位即可，請參考下方範例

```JSON
{
    "title": "標題",
    "description": "描述",
    "questions": [
        {
            "title": "問題標題",
            "description": "描述",
            "questionType": "問題類型"
        }
    ]
}
```

範例：

```JSON
{  
    "title":"Test form",
    "description":"This is a test form.",
    "questions":[  
        {  
            "title":"Q01",
            "description":"This is Q01",
            "questionType":"textbox"
        },
        {  
            "title":"Q02",
            "description":"This is Q02",
            "questionType":"textarea"
        },
        {  
            "title":"Q03",
            "description":"This is Q03",
            "questionType":"singleChoice",
            "singleChoiceOptions":[  
                "Opt01",
                "Opt02",
                "Opt03"
            ]
        },
        {  
            "title":"Q04",
            "description":"This is Q04",
            "questionType":"multipleChoice",
            "multipleChoiceOptions":[  
                "Opt01",
                "Opt02",
                "Opt03"
            ]
        },
        {  
            "title":"Q05",
            "description":"This is Q05",
            "questionType":"dropdown",
            "dropdownOptions":[  
                "Opt01",
                "Opt02",
                "Opt03"
            ]
        },
        {  
            "title":"Q06",
            "description":"This is Q06",
            "questionType":"score",
            "scoreMax":10,
            "scoreMin":1
        },
        {  
            "title":"Custom HR",
            "questionType":"custom",
            "custom":"<hr />"
        }
    ]
}
```

回應：

* 新增成功：Status code: 200 `{"message":"Answers added."}`
* 缺少必要欄位（標題）：Status code: 400
* 還沒登入：Status code: 401

### 新增一個回應（使用者送出表單）

**POST /form/answer/(表單ID)**

資料： 照著該表單的問題順序將答案與問題ID放進JSON Object的answer欄位即可，遇到純顯示HTML作用的custom類型問題時，answer請填undefined即可，系統不會處理，**但是一定要填，不然會爆炸**。

範例： (使用的表單與"取得一張表單"該段落一樣)

```JSON
[  
    {  
        "answer":"YEE",
        "qid":29
    },
    {  
        "answer":"YEEEE\\nYEEEEEEEEEE",
        "qid":30
    },
    {  
        "answer":1,
        "qid":31
    },
    {  
        "answer":[  
            0,
            2
        ],
        "qid":32
    },
    {  
        "answer":1,
        "qid":33
    },
    {  
        "answer":5,
        "qid":34
    },
    {  
        "qid":35
    }
]
```

回應：

* 新增成功：Status code 200  `{"message":"Answers added."}'`



