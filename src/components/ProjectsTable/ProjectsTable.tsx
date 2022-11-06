import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectProjects } from "../../store/slices/projectsSlice";
import { selectUsers } from "../../store/slices/usersSlice";

interface IOwnersMap {
  [ownerId: string]: string;
}

const ProjectsTable = () => {
  const { projects } = useSelector(selectProjects);
  const { users } = useSelector(selectUsers);

  const ownersMap: IOwnersMap = useMemo(() => {
    return users.reduce(
      (acc, user) => ({
        ...acc,
        [user.id]: user.name,
      }),
      {}
    );
  }, [users]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Owner&nbsp;(id)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.slice(0, 20).map((project) => (
            <TableRow
              key={project.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>
                {ownersMap[project.ownerId]} ({project.ownerId})
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;
