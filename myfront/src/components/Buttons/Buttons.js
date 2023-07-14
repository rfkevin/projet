import * as React from "react";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import EditIcon from '@mui/icons-material/Edit';

export const Buttons = ({ setShowForm, handleDelete, handleEdit }) => {
  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant="rounded"
        startIcon={<ControlPointIcon />}
        onClick={() => setShowForm(true)}
      ></Button>
      <Button
        variant="rounded"
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
      ></Button>
      <Button
        variant="rounded"
        startIcon={<EditIcon />}
        onClick={handleEdit}
      ></Button>
    </Stack>

  );
};
