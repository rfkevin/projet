import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Buttons } from "../Buttons/Buttons.js";
//import styles from "./ProductList.css";
import { ProductForm } from "../../components/Form/ProductForm";
import { deleteProduct, getProduct, updateProduct} from "../../api/index";

const columns = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'type', headerName: 'Type', width: 120 },
  { field: 'price', headerName: 'Price', width: 200 },
  { field: "rating", headerName: "RATING", width: 130 },
  { field: "warranty_year", headerName: "WARRANTY", width: 130 },
  { field: "avalaible", headerName: "AVALAIBLE", width: 130 },
];

const ProductList = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const dataGridRef = React.useRef(null);
  const [rows, setRows] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct();
        const { data } = response;
        console.log(data);
        
        const dataWithIds = data.map((product) => ({
          ...product,
          id: product._id,
          name: product.name,
          type: product.type,
        }));
        console.log(dataWithIds);
        setRows(dataWithIds);
        
      } catch (error) {
        console.error("Error de Recuperation", error);
      }
    };

    fetchData();
  }, []);

const handleDelete = async () => {
    console.log(selectedRows);
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(updatedRows);
    for (const selectedRow of selectedRows) {
      console.log(selectedRow)
      await deleteProduct(selectedRow);
    }
};

const handleEdit = () => {
    console.log(selectedRows);
    setShowForm(true);
    const selectedRowData = rows.find((row) => row.id === selectedRows[0]);
    setEditFormData(selectedRowData);
  };

  const handleFormSubmit = async (formData) => {
    console.log(formData);
    // Call your edit API endpoint here with the formData
    await updateProduct(formData);
    setShowForm(false);
    setEditFormData(null);
    // Refetch the data or update the edited row in the rows state
  };

  return (
    <>
    <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onRowSelectionModelChange={(newSelection) =>
              setSelectedRows(newSelection)
            }
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            ref={dataGridRef}
          />
        <div>
          <Buttons
            setShowForm={setShowForm}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
        {showForm && (
          <ProductForm
            setShowForm={setShowForm}
            initialFormData={editFormData}
            handleSubmit={handleFormSubmit}
          />
        )}
        </div>
    </>
  );
};
export default ProductList;