import { useMemo } from "react";
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
    return visibleProjects.map((project) => (
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a projects table">
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
  );
};

export default ProjectsTable;
