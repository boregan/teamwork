import React from "react";
import { Container } from "@mui/material";
import "../App.scss";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Stack } from "@mui/material";

export default function People({ people, homeworld }) {
  return (
    <>
      <Container>
        <Paper
          component={Stack}
          direction="column"
          justifyContent="center"
          sx={{ width: "100%", overflow: "auto" }}
        >
          <TableContainer sx={{ maxHeight: "90vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className="head">
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Height (cm)</TableCell>
                  <TableCell>Mass (kg)</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Edited</TableCell>
                  <TableCell>Homeworld</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {people.map((person, index) => (
                  <TableRow key={index}>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.height}</TableCell>
                    <TableCell>{person.mass}</TableCell>
                    <TableCell>{person.created}</TableCell>
                    <TableCell>{person.edited}</TableCell>
                    <TableCell>{homeworld[index]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}
