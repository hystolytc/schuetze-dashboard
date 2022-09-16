const responseData = {
  "graph": {
    "elements": {
      "createdAt": {
        "props": {
          "type": "Date",
          "descr": "Created at",
          "defVal": "new Date()",
          "name": "name"
        }
      },
      "name": {
        "props": {
          "type": "String",
          "descr": "Dashboard name",
          "name": "name"
        }
      }
    }
  },
  "title": "List of dashboards",
  "data": [
    {
      "_id": "628dc621adff4647dfdc397b",
      "name": "Test-Dasboard",
      "createdAt": "2022-05-27T09:30:59.758Z",
    },
    {
      "_id": "62907039adff4647dfdc39aa",
      "name": "Test-Dasboard 2",
      "createdAt": "2022-05-27T09:30:59.758Z",
    }
  ]
}

export const getData = () => {
 return responseData
}

export const postData = (payload: Record<string, any>) => {
  console.log(payload)
}