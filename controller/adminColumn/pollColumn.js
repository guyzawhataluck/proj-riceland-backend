module.exports = [
  {
    headerName: "ลำดับ",
    field: "id",
    width: 80,
    filter: true,
    cellRendererFramework: "Number",
  },
  {
    headerName: "หัวข้อ",
    field: "title",
    width: 200,
    filter: true,
    cellRendererFramework: "String",
  },

  {
    headerName: "",
    field: "detail",
    filter: true,
    width: 80,
    cellRendererFramework: "iconDetail",
  },
  {
    headerName: "",
    field: "delete",
    filter: true,
    width: 80,
    cellRendererFramework: "iconDelete",
  },
  {
    headerName: "",
    field: "publish",
    filter: true,
    width: 80,
    cellRendererFramework: "Dropdown",
  },
  {
    headerName: "แสดงหน้าแรก",
    field: "displaypoll",
    filter: true,
    width: 100,
    cellRendererFramework: "radioButton",
  },
]
