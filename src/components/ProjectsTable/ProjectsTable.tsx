import { ChangeEvent, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
} from "@mui/material";

import { IProject } from "../../interfaces";
import {
  openProjectModal,
  selectProjects,
} from "../../store/slices/projectsSlice";
import { selectUsers } from "../../store/slices/usersSlice";

interface IOwnersMap {
  [ownerId: string]: string;
}

const ProjectsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { visibleProjects } = useSelector(selectProjects);
  const { users } = useSelector(selectUsers);
  const dispatch = useDispatch();

  const ownersMap: IOwnersMap = useMemo(() => {
    return users.reduce(
      (acc, user) => ({
        ...acc,
        [user.id]: user.name,
      }),
      {}
    );
  }, [users]);

  const handleEditProject = (project: IProject) => {
    dispatch(openProjectModal(project.id));
  };

  const renderProjectsRows = () => {
    console.log(page);
    const sliceInit = page * rowsPerPage;
    const sliceEnd = sliceInit + rowsPerPage;

    return visibleProjects.slice(sliceInit, sliceEnd).map((project) => (
      <TableRow key={project.id}>
        <TableCell>
          {project.id}{" "}
          <IconButton onClick={() => handleEditProject(project)}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell>{project.name} </TableCell>
        <TableCell>{project.description}</TableCell>
        <TableCell>
          {ownersMap[project.ownerId]} ({project.ownerId})
        </TableCell>
      </TableRow>
    ));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a projects table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Owner&nbsp;(id)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderProjectsRows()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={visibleProjects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ProjectsTable;
