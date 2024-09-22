import React from "react";
import { Table } from "react-bootstrap";

const TableComponent = ({ columnHeader, rows }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columnHeader.map((header, index) => (
            <th key={index}>{header.label}</th> // Display the label
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {columnHeader.map((header, colIndex) => (
              <td key={colIndex}>{row[header.value]}</td> // Dynamically access the row value
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;