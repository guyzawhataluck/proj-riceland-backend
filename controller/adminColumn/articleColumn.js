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
    width: 60,
    cellRendererFramework: "iconDetail",
  },
  {
    headerName: "จัดการ",
    field: "delete",
    filter: true,
    width: 60,
    cellRendererFramework: "iconDelete",
  },
  {
    headerName: "",
    field: "publish",
    filter: true,
    width: 100,
    cellRendererFramework: "Dropdown",
  },
]
